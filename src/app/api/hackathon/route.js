import { NextResponse } from 'next/server';
import { HackathonApplicationSchema } from '@/lib/validations';
import { appendToStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  const parsed = HackathonApplicationSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = {};
    parsed.error.issues.forEach(issue => {
      const path = issue.path[0];
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    });
    return NextResponse.json({ message: 'Geçersiz form verisi.', fieldErrors }, { status: 400 });
  }

  const record = {
    id: generateId('hack'),
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    await appendToStore('hackathon-applications.json', record);
  } catch (err) {
    console.error('Hackathon store error:', err);
    return NextResponse.json({ message: 'Veri kaydedilemedi.' }, { status: 500 });
  }

  // TODO production: send confirmation email via Resend, push to DB
  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to submit an application.' }, { status: 405 });
}
