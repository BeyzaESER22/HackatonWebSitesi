import { NextResponse } from 'next/server';
import { HackathonApplicationSchema } from '@/lib/validations';
import { appendToStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';
import { enforceSubmissionRateLimit } from '@/lib/rate-limit';
import { isSpamSubmission } from '@/lib/spam';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  if (isSpamSubmission(body)) {
    return NextResponse.json({ ok: true, filtered: true }, { status: 202 });
  }

  const parsed = HackathonApplicationSchema.safeParse(body);
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
    id: generateId('hack'),
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    const result = await appendToStore(
      'hackathon-applications.json',
      record,
      { dedupeKey: parsed.data.clientSubmissionId }
    );

    const stored = result.record || record;
    const status = result.persisted === 'backup' ? 202 : (result.duplicate ? 200 : 201);

    return NextResponse.json(
      {
        ok: true,
        id: stored.id,
        duplicate: Boolean(result.duplicate),
        persistence: result.persisted || 'primary'
      },
      { status }
    );
  } catch (err) {
    console.error('Hackathon store error:', err);
    return NextResponse.json(
      { message: 'Veri kaydedilemedi.', error: String(err.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to submit an application.' }, { status: 405 });
}
