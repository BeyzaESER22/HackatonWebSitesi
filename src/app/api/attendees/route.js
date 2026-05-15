import { NextResponse } from 'next/server';
import { AttendeeRegistrationSchema } from '@/lib/validations';
import { appendToStore } from '@/lib/store';
import { generateId, sanitize } from '@/lib/helpers';
import { enforceSubmissionRateLimit } from '@/lib/rate-limit';
import { isSpamSubmission } from '@/lib/spam';
import { SITE, REGISTRATIONS_OPEN } from '@/lib/constants';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!REGISTRATIONS_OPEN) {
    return NextResponse.json({ message: 'Kayıtlar kapatılmıştır.' }, { status: 403 });
  }

  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 }); }

  if (isSpamSubmission(body)) {
    return NextResponse.json({ ok: true, filtered: true }, { status: 202 });
  }

  const sanitizedBody = {};
  for (const key in body) {
    const value = body[key];
    if (typeof value === 'string') {
      sanitizedBody[key] = sanitize(value);
    } else if (Array.isArray(value)) {
      sanitizedBody[key] = value.map((item) => typeof item === 'string' ? sanitize(item) : item);
    } else {
      sanitizedBody[key] = value;
    }
  }

  const parsed = AttendeeRegistrationSchema.safeParse(sanitizedBody);
  if (!parsed.success) {
    const fieldErrors = {};
    parsed.error.issues.forEach(issue => {
      const path = issue.path[0];
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    });
    return NextResponse.json({ message: 'Geçersiz form verisi.', fieldErrors }, { status: 400 });
  }

  const rateLimit = await enforceSubmissionRateLimit(request, { email: parsed.data.email });
  if (!rateLimit.ok) {
    return NextResponse.json(
      { message: rateLimit.message },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfter || 60)
        }
      }
    );
  }

  const record = {
    id: generateId('att'),
    ...parsed.data,
    registeredAt: new Date().toISOString()
  };

  try {
    const eventId = String(SITE.eventDateISO || SITE.eventDates || 'hackfest26');
    const emailKey = `${eventId}:visitor:${parsed.data.email.trim().toLowerCase()}`;
    const result = await appendToStore('attendees.json', record, { uniqueKey: emailKey });
    const stored = result.record || record;
    const status = result.duplicate ? 200 : 201;
    const message = result.duplicate
      ? 'Bu e-posta adresiyle ziyaretçi kaydı zaten bulunuyor.'
      : 'Ziyaretçi kaydın alındı.';

    return NextResponse.json(
      {
        ok: true,
        id: stored.id,
        duplicate: Boolean(result.duplicate),
        message
      },
      { status }
    );
  } catch (err) {
    console.error('Attendees store error:', err);
    return NextResponse.json(
      { message: 'Veri kaydedilemedi.', error: String(err.message || err) },
      { status: 500 }
    );
  }
}
