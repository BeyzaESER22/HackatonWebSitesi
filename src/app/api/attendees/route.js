import { NextResponse } from 'next/server';
import { AttendeeRegistrationSchema } from '@/lib/validations';
import { appendToStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 }); }

  const parsed = AttendeeRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = {};
    parsed.error.issues.forEach(issue => {
      const path = issue.path[0];
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    });
    return NextResponse.json({ message: 'Geçersiz form verisi.', fieldErrors }, { status: 400 });
  }

  const record = {
    id: generateId('att'),
    ...parsed.data,
    registeredAt: new Date().toISOString()
  };

  try {
    await appendToStore('attendees.json', record);
  } catch (err) {
    console.error('Attendees store error:', err);
    return NextResponse.json({ message: 'Veri kaydedilemedi.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}
