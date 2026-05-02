import { NextResponse } from 'next/server';
import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { readStore, removeFromStore, appendToStore, writeStore } from '@/lib/store';

export const runtime = 'nodejs';

/** GET — list all project submissions for admin. */
export async function GET(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  const items = await readStore('projects.json');
  const submissions = [...items].sort(
    (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
  );

  return NextResponse.json({ ok: true, submissions });
}

/** PATCH — approve/reject project. */
export async function PATCH(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 }); }

  const { id, status } = body;
  if (!id || !['approved', 'pending', 'rejected'].includes(status)) {
    return NextResponse.json({ message: 'Geçersiz parametreler.' }, { status: 400 });
  }

  try {
    const items = await readStore('projects.json');
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) return NextResponse.json({ message: 'Kayıt bulunamadı.' }, { status: 404 });

    items[idx].status = status;
    items[idx].updatedAt = new Date().toISOString();

    await writeStore('projects.json', items);
    return NextResponse.json({ ok: true, project: items[idx] });
  } catch (err) {
    console.error('Project PATCH error:', err);
    return NextResponse.json({ message: 'Güncelleme başarısız.', error: String(err) }, { status: 500 });
  }
}

/** DELETE — remove project permanently. */
export async function DELETE(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 }); }

  try {
    const { id } = body;
    if (!id) return NextResponse.json({ message: 'ID gerekli.' }, { status: 400 });

    const items = await readStore('projects.json');
    const record = items.find(item => item.id === id);
    
    if (record) {
      // Archive
      await appendToStore('deleted-projects.json', {
        ...record,
        deletedAt: new Date().toISOString()
      }, { skipDedupe: true });

      // Remove
      await removeFromStore('projects.json', id);
    }

    return NextResponse.json({ ok: true, message: 'Proje silindi ve arşivlendi.' });
  } catch (err) {
    console.error('Project DELETE error:', err);
    return NextResponse.json({ message: 'Silme işlemi başarısız.', error: String(err) }, { status: 500 });
  }
}
