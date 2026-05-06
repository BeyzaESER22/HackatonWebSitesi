import { NextResponse } from 'next/server';
import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { removeFromStore } from '@/lib/store';

export const runtime = 'nodejs';

export async function DELETE(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Geçersiz veri.' }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ message: 'ID gerekli.' }, { status: 400 });
  }

  try {
    await removeFromStore('attendees.json', body.id);
    return NextResponse.json({ ok: true, message: 'Kayıt silindi.' });
  } catch (err) {
    console.error('DELETE /api/admin/attendees error:', err);
    return NextResponse.json(
      { message: 'Sunucu hatası: silinemedi.', error: String(err.message || err) },
      { status: 500 }
    );
  }
}
