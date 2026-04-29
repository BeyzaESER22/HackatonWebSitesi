import crypto from 'crypto';

const KV_AVAILABLE =
  !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
  !!process.env.KV_URL;

let kvClient = null;
const memoryCounters = new Map();

async function getKv() {
  if (!KV_AVAILABLE) return null;
  if (kvClient) return kvClient;
  const mod = await import('@vercel/kv');
  kvClient = mod.kv;
  return kvClient;
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function hashValue(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 24);
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-vercel-forwarded-for') ||
    'unknown'
  );
}

async function incrementInMemory(key, windowSeconds) {
  const current = memoryCounters.get(key);
  const now = nowSeconds();

  if (!current || current.expiresAt <= now) {
    memoryCounters.set(key, { count: 1, expiresAt: now + windowSeconds });
    return { count: 1, retryAfter: windowSeconds };
  }

  current.count += 1;
  memoryCounters.set(key, current);
  return { count: current.count, retryAfter: Math.max(1, current.expiresAt - now) };
}

async function incrementKey(key, windowSeconds) {
  if (!KV_AVAILABLE) {
    return incrementInMemory(key, windowSeconds);
  }

  const kv = await getKv();
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, windowSeconds);
    return { count, retryAfter: windowSeconds };
  }

  const ttl = await kv.ttl(key).catch(() => windowSeconds);
  return {
    count,
    retryAfter: ttl > 0 ? ttl : windowSeconds
  };
}

export async function enforceSubmissionRateLimit(request, { email }) {
  const ip = getClientIp(request);
  const normalizedEmail = String(email || '').trim().toLowerCase();

  const checks = [
    {
      key: `rl:hackathon:ip:${hashValue(ip)}`,
      limit: 12,
      windowSeconds: 15 * 60,
      message: 'Kısa sürede çok fazla başvuru denemesi yapıldı. Lütfen biraz sonra tekrar dene.'
    }
  ];

  if (normalizedEmail) {
    checks.push({
      key: `rl:hackathon:email:${hashValue(normalizedEmail)}`,
      limit: 4,
      windowSeconds: 60 * 60,
      message: 'Bu e-posta adresiyle kısa sürede çok fazla başvuru denemesi yapıldı. Lütfen biraz sonra tekrar dene.'
    });
  }

  for (const check of checks) {
    const result = await incrementKey(check.key, check.windowSeconds);
    if (result.count > check.limit) {
      return {
        ok: false,
        retryAfter: result.retryAfter,
        message: check.message
      };
    }
  }

  return { ok: true };
}
