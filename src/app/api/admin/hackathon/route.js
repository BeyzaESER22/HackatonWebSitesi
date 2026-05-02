import { NextResponse } from 'next/server';
import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { readStore, removeFromStore } from '@/lib/store';
import { SITE } from '@/lib/constants';

export const runtime = 'nodejs';

export async function GET(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  const items = await readStore('hackathon-applications.json');
  const submissions = [...items].sort(
    (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
  );

  return NextResponse.json({ ok: true, submissions });
}

export async function DELETE(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  try {
    const { id, email, clientSubmissionId } = body;
    console.log('[DELETE] Started for ID:', id);

    if (!id) {
      console.log('[DELETE] Error: Missing ID');
      return NextResponse.json({ message: 'ID gerekli.' }, { status: 400 });
    }

    // Step 1: Archive before deletion (MANDATORY)
    console.log('[DELETE] Step 1: Archiving...');
    let recordToArchive;
    try {
      const items = await readStore('hackathon-applications.json');
      console.log('[DELETE] ReadStore count:', items.length);
      recordToArchive = items.find(item => item.id === id);
    } catch (readErr) {
      console.error('[DELETE] ReadStore failed:', readErr);
      throw new Error('Mevcut kayıtlar okunamadı: ' + readErr.message);
    }
    
    if (recordToArchive) {
      try {
        await appendToStore('deleted-hackathon-applications.json', {
          ...recordToArchive,
          deletedAt: new Date().toISOString(),
          deletedBy: 'admin',
          archiveStatus: 'verified'
        });
        console.log('[DELETE] Archive success');
      } catch (appErr) {
        console.error('[DELETE] AppendToStore (archive) failed:', appErr);
        throw new Error('Arşivleme başarısız oldu, silme işlemi güvenlik nedeniyle durduruldu: ' + appErr.message);
      }
    } else {
      console.log('[DELETE] Error: Record not found for archiving');
      return NextResponse.json({ message: 'Arşivlenecek kayıt bulunamadı (ID eşleşmedi), silme iptal edildi.' }, { status: 404 });
    }

    // Step 2: Proceed with actual removal only after archive is successful
    console.log('[DELETE] Step 2: Removing from store...');
    const eventId = String(SITE.eventDateISO || SITE.eventDates || 'hackfest26');
    const uniqueKey = email ? `${eventId}:${email.trim().toLowerCase()}` : null;

    try {
      await removeFromStore('hackathon-applications.json', id, {
        uniqueKey: uniqueKey || undefined,
        dedupeKey: clientSubmissionId || undefined
      });
      console.log('[DELETE] Removal success');
    } catch (remErr) {
      console.error('[DELETE] RemoveFromStore failed:', remErr);
      throw new Error('Kayıt silinemedi: ' + remErr.message);
    }

    return NextResponse.json({ ok: true, message: 'Başvuru silindi ve arşivlendi.' });
  } catch (err) {
    console.error('[DELETE] Fatal Error:', err);
    return NextResponse.json({ 
      message: 'Silme işlemi başarısız.', 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}
