'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/session';
import { verifyPasswordHash } from '@/lib/password';

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!expectedEmail || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
    redirect('/admin/login?error=missing-config');
  }

  const emailMatches = email === expectedEmail;
  const passwordMatches = verifyPasswordHash(password, process.env.ADMIN_PASSWORD_HASH);

  if (!emailMatches || !passwordMatches) {
    redirect('/admin/login?error=invalid');
  }

  const token = await createAdminSessionToken(email);
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  redirect('/admin');
}

export async function logoutAdmin() {
  cookies().delete(ADMIN_SESSION_COOKIE);
  redirect('/admin/login');
}
