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
    if (!id) return NextResponse.json({ message: 'ID gerekli.' }, { status: 400 });

    // Step 1: Archive before deletion (MANDATORY)
    // If this fails, the error will be caught by the outer catch block and deletion will NOT proceed.
    const items = await readStore('hackathon-applications.json');
    const recordToArchive = items.find(item => item.id === id);
    
    if (recordToArchive) {
      await appendToStore('deleted-hackathon-applications.json', {
        ...recordToArchive,
        deletedAt: new Date().toISOString(),
        deletedBy: 'admin',
        archiveStatus: 'verified'
      });
    } else {
      // If record is not found in main store, we can't archive it safely
      return NextResponse.json({ message: 'Arşivlenecek kayıt bulunamadı, silme iptal edildi.' }, { status: 404 });
    }

    // Step 2: Proceed with actual removal only after archive is successful
    const eventId = String(SITE.eventDateISO || SITE.eventDates || 'hackfest26');
    const uniqueKey = email ? `${eventId}:${email.trim().toLowerCase()}` : null;

    await removeFromStore('hackathon-applications.json', id, {
      uniqueKey: uniqueKey || undefined,
      dedupeKey: clientSubmissionId || undefined
    });

    return NextResponse.json({ ok: true, message: 'Başvuru silindi ve arşivlendi.' });
  } catch (err) {
    console.error('Delete API Error:', err);
    return NextResponse.json({ 
      message: 'Silme işlemi başarısız.', 
      error: err.message,
      details: String(err)
    }, { status: 500 });
  }
}
