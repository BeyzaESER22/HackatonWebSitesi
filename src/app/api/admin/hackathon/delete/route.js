import { NextResponse } from 'next/server';
import {
  isAdminRequestAuthenticated,
  unauthorizedJson,
  verifyAdminPassword
} from '@/lib/admin-auth';
import { readStore, writeStore } from '@/lib/store';

export const runtime = 'nodejs';

/**
 * Admin soft-delete endpoint for hackathon applications.
 *
 * 2-step verification:
 *   1) Admin session cookie must be valid (verified by isAdminRequestAuthenticated).
 *   2) Caller must re-supply the admin password AND type the applicant's email
 *      to confirm — both are checked server-side.
 *
 * Soft delete strategy:
 *   - We do NOT remove the record from KV list / blob backup / fs append log.
 *   - We do NOT touch the dedupe / unique-key reservations
 *     (so the same applicant cannot bypass duplicate protection by being
 *     deleted then resubmitted).
 *   - We write the full record set back via writeStore() with the target
 *     record annotated with deletedAt / deletedBy / deleteReason.
 *   - readStore() merges legacy → list → backup with first-write-wins
 *     dedup by id, and writeStore() targets the legacy key, so the soft-
 *     deleted version always wins on subsequent reads.
 *
 * This means the form POST flow at /api/hackathon stays untouched. All
 * existing protections (rate-limit, spam filter, dedupe, unique key,
 * KV+blob backup) keep working exactly as before.
 */
export async function POST(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const emailConfirmation =
    typeof body.emailConfirmation === 'string' ? body.emailConfirmation.trim().toLowerCase() : '';

  if (!id) {
    return NextResponse.json({ message: 'Silinecek başvuru kimliği gerekli.' }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json(
      { message: 'İkinci adım için admin şifresini tekrar girmen gerekiyor.' },
      { status: 400 }
    );
  }

  if (!emailConfirmation) {
    return NextResponse.json(
      { message: 'Başvuranın e-posta adresini onay için yazman gerekiyor.' },
      { status: 400 }
    );
  }

  // Step 2 part A: re-verify the admin password.
  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { message: 'Admin şifresi hatalı. Silme iptal edildi.' },
      { status: 401 }
    );
  }

  let items;
  try {
    items = await readStore('hackathon-applications.json');
  } catch (err) {
    console.error('Hackathon delete read error:', err);
    return NextResponse.json(
      { message: 'Başvuru verisi okunamadı.', error: String(err.message || err) },
      { status: 500 }
    );
  }

  const target = items.find((item) => item && item.id === id);
  if (!target) {
    return NextResponse.json({ message: 'Başvuru bulunamadı.' }, { status: 404 });
  }

  if (target.deletedAt) {
    return NextResponse.json(
      { message: 'Bu başvuru zaten silinmiş.', alreadyDeleted: true },
      { status: 409 }
    );
  }

  // Step 2 part B: typed email must match the record (case-insensitive).
  const recordEmail = (target.email || '').trim().toLowerCase();
  if (!recordEmail || recordEmail !== emailConfirmation) {
    return NextResponse.json(
      { message: 'Yazdığın e-posta başvurudaki e-postayla eşleşmiyor. Silme iptal edildi.' },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();

  const updatedItems = items.map((item) => {
    if (!item || item.id !== id) return item;
    return {
      ...item,
      deletedAt: now,
      deletedBy: 'admin',
      deleteReason: typeof body.reason === 'string' ? body.reason.slice(0, 500) : null,
      status: 'deleted'
    };
  });

  try {
    await writeStore('hackathon-applications.json', updatedItems);
  } catch (err) {
    console.error('Hackathon delete write error:', err);
    return NextResponse.json(
      { message: 'Silme kaydedilemedi.', error: String(err.message || err) },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    id,
    deletedAt: now
  });
}
