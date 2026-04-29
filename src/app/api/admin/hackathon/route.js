import { NextResponse } from 'next/server';
import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { readStore } from '@/lib/store';

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
