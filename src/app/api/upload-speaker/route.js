import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { UPLOAD_LIMITS } from '@/lib/constants';
import { safeFilename, slugify } from '@/lib/helpers';

export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'speakers');

/**
 * POST /api/upload-speaker
 *
 * Headers:
 *   x-admin-secret: <ADMIN_UPLOAD_SECRET>
 *
 * Form-data:
 *   speakerId: string  (file slug; e.g. "eda-yilmaz")
 *   file:      File    (jpeg / png / webp, ≤ 2 MB)
 *
 * Yanıtta dönen `photoUrl` doğrudan src/data/speakers.js içine yapıştırılabilir.
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

  // Persist
  const speakerId = slugify(speakerIdRaw);
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const filename = safeFilename(`${speakerId}.${ext}`);
  const targetPath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(targetPath, buffer);
  } catch (err) {
    console.error('Speaker upload write error:', err);
    return NextResponse.json({ message: 'Dosya yazılamadı.' }, { status: 500 });
  }

  const publicUrl = `/uploads/speakers/${filename}`;
  return NextResponse.json(
    {
      ok: true,
      speakerId,
      photoUrl: publicUrl,
      hint: `src/data/speakers.js içinde "${speakerId}" ID'li konuşmacının photoUrl alanını "${publicUrl}" olarak güncelleyin.`
    },
    { status: 201 }
  );
}
