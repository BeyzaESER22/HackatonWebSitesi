import { NextResponse } from 'next/server';
import { HackathonApplicationSchema } from '@/lib/validations';
import { appendToStore } from '@/lib/store';
import { generateId, safeFilename, sanitize } from '@/lib/helpers';
import { enforceSubmissionRateLimit } from '@/lib/rate-limit';
import { isSpamSubmission } from '@/lib/spam';
import { uploadFile } from '@/lib/storage';
import { SITE, UPLOAD_LIMITS } from '@/lib/constants';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  let documentFile = null;
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const text = (key) => {
        const value = formData.get(key);
        return typeof value === 'string' ? value.trim() : '';
      };

      body = {
        fullName: text('fullName'),
        university: text('university'),
        department: text('department'),
        grade: text('grade'),
        email: text('email'),
        phone: text('phone'),
        teamStatus: text('teamStatus'),
        teamSize: text('teamSize'),
        teammatesApplied: text('teammatesApplied'),
        source: text('source'),
        parkingNeeded: text('parkingNeeded'),
        licensePlate: text('licensePlate').toUpperCase(),
        kvkkNoticeAccepted: text('kvkkNoticeAccepted') === 'true',
        explicitConsentAccepted: text('explicitConsentAccepted') === 'true',
        dataRetentionAccepted: text('dataRetentionAccepted') === 'true',
        clientSubmissionId: text('clientSubmissionId'),
        website: text('website')
      };

      const uploadedDocument = formData.get('studentDocument');
      if (uploadedDocument && typeof uploadedDocument !== 'string') {
        documentFile = uploadedDocument;
      }
    } else {
      body = await request.json();
    }
  } catch {
    return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  // 1. Honeypot & Basic Spam Check
  if (isSpamSubmission(body)) {
    // Return 202 to the bot so it thinks it succeeded
    return NextResponse.json({ ok: true, filtered: true }, { status: 202 });
  }

  // 2. Technical Sanitization (XSS Prevention)
  const sanitizedBody = {};
  for (const key in body) {
    if (typeof body[key] === 'string') {
      sanitizedBody[key] = sanitize(body[key]);
    } else {
      sanitizedBody[key] = body[key];
    }
  }

  // 3. Validation
  const parsed = HackathonApplicationSchema.safeParse(sanitizedBody);
  if (!parsed.success) {
    const fieldErrors = {};
    parsed.error.issues.forEach(issue => {
      const path = issue.path[0];
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    });
    return NextResponse.json({ message: 'Geçersiz form verisi.', fieldErrors }, { status: 400 });
  }

  if (!documentFile) {
    return NextResponse.json(
      {
        message: 'Öğrenci veya mezuniyet belgesi zorunludur.',
        fieldErrors: { studentDocument: 'PDF formatında öğrenci veya mezuniyet belgesi yükleyiniz.' }
      },
      { status: 400 }
    );
  }

  const documentLimit = UPLOAD_LIMITS.hackathonDocument;
  const isPdfMime = documentLimit.types.includes(documentFile.type);
  const isPdfName = /\.pdf$/i.test(documentFile.name || '');

  if (!isPdfMime && !isPdfName) {
    return NextResponse.json(
      {
        message: 'Belge yalnızca PDF formatında yüklenebilir.',
        fieldErrors: { studentDocument: 'Lütfen PDF formatında bir belge yükleyiniz.' }
      },
      { status: 400 }
    );
  }

  if (documentFile.size <= 0 || documentFile.size > documentLimit.maxBytes) {
    return NextResponse.json(
      {
        message: 'Belge boyutu geçersiz.',
        fieldErrors: { studentDocument: 'Belge en fazla 10 MB olabilir.' }
      },
      { status: 400 }
    );
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

  const id = generateId('hack');
  let documentUrl = null;

  try {
    const fileName = safeFilename(`${id}-${documentFile.name || 'ogrenci-belgesi.pdf'}`);
    documentUrl = await uploadFile(
      Buffer.from(await documentFile.arrayBuffer()),
      `hackathon/documents/${fileName}`,
      documentFile.type || 'application/pdf'
    );
  } catch (err) {
    console.error('Hackathon document upload error:', err);
    return NextResponse.json(
      { message: 'Belge yüklenemedi.', error: String(err.message || err) },
      { status: 500 }
    );
  }

  const record = {
    id,
    ...parsed.data,
    document: {
      url: documentUrl,
      fileName: documentFile.name || 'ogrenci-belgesi.pdf',
      size: documentFile.size,
      type: documentFile.type || 'application/pdf',
      uploadedAt: new Date().toISOString()
    },
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    const eventId = String(SITE.eventDateISO || SITE.eventDates || 'hackfest26');
    const emailKey = `${eventId}:${parsed.data.email.trim().toLowerCase()}`;

    const result = await appendToStore(
      'hackathon-applications.json',
      record,
      {
        dedupeKey: parsed.data.clientSubmissionId,
        uniqueKey: emailKey
      }
    );

    const stored = result.record || record;
    const status = result.persisted === 'backup' ? 202 : (result.duplicate ? 200 : 201);
    const message =
      result.reason === 'unique'
        ? 'Bu e-posta adresiyle bu etkinlik için zaten bir başvuru bulunuyor.'
        : result.reason === 'idempotency'
          ? 'Aynı başvurunun tekrar gönderimini algıladık.'
          : result.persisted === 'backup'
            ? 'Başvurun yedek katmanda korumaya alındı.'
            : 'Başvurun kaydedildi.';

    return NextResponse.json(
      {
        ok: true,
        id: stored.id,
        duplicate: Boolean(result.duplicate),
        persistence: result.persisted || 'primary',
        reason: result.reason || 'created',
        message
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
