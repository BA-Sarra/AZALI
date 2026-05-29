export const ADMIN_SESSION_COOKIE = 'azali_admin_session';

type AdminSessionPayload = {
  email: string;
  exp: number;
};

const encoder = new TextEncoder();

function base64UrlEncode(input: string | Uint8Array) {
  const bytes = typeof input === 'string' ? encoder.encode(input) : input;
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function hmacSha256(value: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be set and at least 32 characters long.');
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function createAdminSessionToken(email: string) {
  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7
  };
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256(body);
  return `${body}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expectedSignature = await hmacSha256(body);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as AdminSessionPayload;
    const allowedEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    if (!payload.email || !payload.exp) return null;
    if (payload.exp < Date.now()) return null;
    if (allowedEmail && payload.email.toLowerCase() !== allowedEmail) return null;
    return payload;
  } catch {
    return null;
  }
}
