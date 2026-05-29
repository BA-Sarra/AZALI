'use client';

import { useState, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';

export function NewsletterSignup({ locale, source = 'footer' }: { locale: Locale; source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, locale, source })
    });
    if (!response.ok) {
      setStatus('error');
      return;
    }
    setEmail('');
    setStatus('success');
  }

  return (
    <form className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={submit}>
      <input
        className="input bg-parchment"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={locale === 'fr' ? 'Votre email' : 'Your email'}
        aria-label={locale === 'fr' ? 'Votre email' : 'Your email'}
        required
      />
      <button className="btn-primary whitespace-nowrap" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? (locale === 'fr' ? '...' : '...') : locale === 'fr' ? 'Prévenir' : 'Notify me'}
      </button>
      {status === 'success' && <p className="text-xs leading-5 text-azaliIndigo sm:self-center">{locale === 'fr' ? 'Inscription reçue.' : 'You are on the list.'}</p>}
      {status === 'error' && <p className="text-xs leading-5 text-garnet sm:self-center">{locale === 'fr' ? 'Email invalide.' : 'Invalid email.'}</p>}
    </form>
  );
}
