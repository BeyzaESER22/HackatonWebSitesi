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

  try {
    const { id, email, clientSubmissionId } = await request.json();
    if (!id) return NextResponse.json({ message: 'ID gerekli.' }, { status: 400 });

    // Step 1: Archive before deletion (Soft-delete backup)
    const items = await readStore('hackathon-applications.json');
    const recordToArchive = items.find(item => item.id === id);
    
    if (recordToArchive) {
      await appendToStore('deleted-hackathon-applications.json', {
        ...recordToArchive,
        deletedAt: new Date().toISOString(),
        deletedBy: 'admin'
      });
    }

    // Step 2: Proceed with actual removal of unique constraints and data
    const eventId = String(SITE.eventDateISO || SITE.eventDates || 'hackfest26');
    const uniqueKey = email ? `${eventId}:${email.trim().toLowerCase()}` : null;

    await removeFromStore('hackathon-applications.json', id, {
      uniqueKey,
      dedupeKey: clientSubmissionId
    });

    return NextResponse.json({ ok: true, message: 'Başvuru silindi ve arşivlendi.' });
  } catch (err) {
    return NextResponse.json({ message: 'Silme işlemi başarısız.', error: err.message }, { status: 500 });
  }
}
