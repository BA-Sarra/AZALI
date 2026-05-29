import { scryptSync, timingSafeEqual } from 'node:crypto';

export function verifyPasswordHash(password: string, storedHash?: string | null) {
  if (!storedHash) return false;
  const parts = storedHash.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, nValue, rValue, pValue, salt, expectedHex] = parts;
  const N = Number(nValue);
  const r = Number(rValue);
  const p = Number(pValue);
  if (!N || !r || !p || !salt || !expectedHex) return false;

  const expected = Buffer.from(expectedHex, 'hex');
  const actual = scryptSync(password, salt, expected.length, { N, r, p });
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}
