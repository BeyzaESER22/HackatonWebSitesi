import crypto from 'crypto';
import { NextResponse } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'hf_admin_session';
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function sign(value) {
  return crypto
    .createHmac('sha256', getSessionSecret())
    .update(value)
    .digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function verifyAdminPassword(password) {
  if (!isAdminAuthConfigured()) return false;
  return safeEqual(password, process.env.ADMIN_PASSWORD);
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}.${crypto.randomBytes(16).toString('hex')}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token) {
  if (!token || !isAdminAuthConfigured()) return false;

  const [encodedPayload, signature] = String(token).split('.');
  if (!encodedPayload || !signature) return false;

  let payload;
  try {
    payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
  } catch {
    return false;
  }

  if (!safeEqual(signature, sign(payload))) return false;

  const [expiresAt] = payload.split('.');
  const expiresAtMs = Number(expiresAt);

  if (!Number.isFinite(expiresAtMs) || expiresAtMs < Date.now()) {
    return false;
  }

  return true;
}

export function getAdminSessionCookieOptions() {
  return {
    name: ADMIN_SESSION_COOKIE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS
  };
}

export function isAdminRequestAuthenticated(request) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value || '';
  return verifyAdminSessionToken(token);
}

export function isAdminCookieStoreAuthenticated(cookieStore) {
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value || '';
  return verifyAdminSessionToken(token);
}

export function setAdminSessionCookie(response) {
  const token = createAdminSessionToken();
  const { name, ...options } = getAdminSessionCookieOptions();
  response.cookies.set(name, token, options);
  return response;
}

export function clearAdminSessionCookie(response) {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
  return response;
}

export function unauthorizedJson(message = 'Yetkisiz erişim.') {
  return NextResponse.json({ message }, { status: 401 });
}
