import { NextResponse } from 'next/server';
import {
  isAdminAuthConfigured,
  setAdminSessionCookie,
  verifyAdminPassword
} from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { message: 'Admin girişi için environment variable\'lar eksik.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ message: 'Şifre hatalı.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  return setAdminSessionCookie(response);
}
