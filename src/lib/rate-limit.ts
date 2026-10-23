const DEFAULT_LIMIT = Number(process.env.CODEX_RATE_LIMIT ?? 300);
const WINDOW_MS = 60_000;

interface Bucket {
  count: number;
  reset: number;
}

const buckets = new Map<string, Bucket>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export function checkRateLimit(request: Request, limit = DEFAULT_LIMIT): {
  allowed: boolean;
  headers: Record<string, string>;
} {
  const now = Date.now();
  const ip = getClientIp(request);
  let bucket = buckets.get(ip);
  if (!bucket || bucket.reset <= now) {
    bucket = { count: 0, reset: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);
  const resetSeconds = Math.max(1, Math.ceil((bucket.reset - now) / 1000));
  const allowed = bucket.count <= limit;
  const headers: Record<string, string> = {
    'RateLimit-Limit': String(limit),
    'RateLimit-Remaining': String(allowed ? remaining : 0),
    'RateLimit-Reset': String(resetSeconds),
  };
  if (!allowed) {
    headers['Retry-After'] = String(resetSeconds);
  }
  return { allowed, headers };
}
