import { NextResponse } from 'next/server';
import { UPLOAD_LIMITS } from '@/lib/constants';
import { safeFilename, slugify } from '@/lib/helpers';
import { uploadFile, STORAGE_BACKEND } from '@/lib/storage';

export const runtime = 'nodejs';

/**
 * POST /api/upload-speaker
 *
 * Headers:  x-admin-secret: <ADMIN_UPLOAD_SECRET>
 * Form-data: speakerId (string), file (image)
 *
 * Yanıt: { ok, photoUrl, ... } — photoUrl src/data/speakers.js içine yapıştırılır.
 */
export async function POST(request) {
  // Auth
  const provided = request.headers.get('x-admin-secret') || '';
  const expected = process.env.ADMIN_UPLOAD_SECRET || '';
  if (!expected) {
    return NextResponse.json({ message: 'ADMIN_UPLOAD_SECRET tanımlı değil.' }, { status: 500 });
  }
  if (provided !== expected) {
    return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
  }

  let formData;
  try { formData = await request.formData(); }
  catch { return NextResponse.json({ message: 'Form verisi okunamadı.' }, { status: 400 }); }

  const speakerIdRaw = formData.get('speakerId');
  const file = formData.get('file');

  if (typeof speakerIdRaw !== 'string' || !speakerIdRaw.trim()) {
    return NextResponse.json({ message: 'speakerId zorunludur.' }, { status: 400 });
  }
  if (!file || typeof file === 'string') {
    return NextResponse.json({ message: 'file zorunludur.' }, { status: 400 });
  }

  const limit = UPLOAD_LIMITS.speakerImage;
  if (!limit.types.includes(file.type)) {
    return NextResponse.json({ message: `Geçersiz dosya tipi (${file.type}). İzinli: ${limit.types.join(', ')}.` }, { status: 400 });
  }
  if (file.size > limit.maxBytes) {
    return NextResponse.json({ message: `Dosya çok büyük. Max ${(limit.maxBytes / 1024 / 1024).toFixed(0)}MB.` }, { status: 400 });
  }

  const speakerId = slugify(speakerIdRaw);
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const pathname = `speakers/${safeFilename(`${speakerId}.${ext}`)}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const photoUrl = await uploadFile(buffer, pathname, file.type);

    return NextResponse.json(
      {
        ok: true,
        speakerId,
        photoUrl,
        backend: STORAGE_BACKEND,
        hint: `src/data/speakers.js içinde "${speakerId}" ID'li konuşmacının photoUrl alanını "${photoUrl}" olarak güncelleyin.`
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Speaker upload error:', err);
    return NextResponse.json({ message: 'Dosya yüklenemedi.', error: String(err.message || err) }, { status: 500 });
  }
}
