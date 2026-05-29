import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/session';

export async function getAdminSession() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export async function requireAdmin() {
  let session = null;
  try {
    session = await getAdminSession();
  } catch {
    redirect('/admin/login?error=missing-config');
  }
  if (!session) redirect('/admin/login');
  return session;
}
