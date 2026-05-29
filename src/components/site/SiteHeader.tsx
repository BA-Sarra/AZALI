'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { dictionary } from '@/lib/i18n';
import { cartHref, contactHref, ethicsHref, meetHref, productsHref } from '@/lib/routes';
import { Logo } from './Logo';
import { CartLink } from '@/components/cart/CartLink';

function isActive(pathname: string, href: string, extra: string[] = []) {
  return pathname === href || pathname.startsWith(`${href}/`) || extra.some((prefix) => pathname.startsWith(prefix));
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = dictionary[locale];
  const [open, setOpen] = useState(false);
  const altLocale = locale === 'fr' ? 'en' : 'fr';
  const links = [
    { href: productsHref(locale), label: t.products, extra: locale === 'fr' ? ['/fr/categorie/', '/fr/produit/'] : ['/en/category/', '/en/product/'] },
    { href: ethicsHref(locale), label: locale === 'fr' ? 'Éthique' : 'Leather Ethics', extra: [] },
    { href: meetHref(locale), label: locale === 'fr' ? "L'artiste" : 'The Artist', extra: [] },
    { href: contactHref(locale), label: t.contact, extra: [] }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-umber/10 bg-parchment/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4 md:px-10">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber/70 md:flex">
          {links.map((link) => (
            <Link key={link.href} className={`nav-link ${isActive(pathname, link.href, link.extra) ? 'nav-link-active' : ''}`} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <Link href={altLocale === 'fr' ? '/fr' : '/en'} className="nav-link px-1 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber/70 hover:text-garnet">
            {altLocale.toUpperCase()}
          </Link>
          <CartLink locale={locale} />
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <CartLink locale={locale} />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-sand/70 text-umber transition hover:border-garnet hover:text-garnet"
          >
            <Menu size={20} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <button type="button" aria-label="Close menu backdrop" onClick={() => setOpen(false)} className={`absolute inset-0 bg-umber/35 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 h-[100dvh] w-[82vw] max-w-sm bg-parchment px-7 py-7 shadow-soft transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between gap-4">
            <Logo locale={locale} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-10 w-10 items-center justify-center rounded border border-sand/70 text-umber transition hover:border-garnet hover:text-garnet">
              <X size={20} strokeWidth={1.7} />
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-7 font-display text-[1.65rem] leading-tight text-espresso">
            {links.map((link) => (
              <Link key={`drawer-${link.href}`} onClick={() => setOpen(false)} className={`transition hover:text-garnet ${isActive(pathname, link.href, link.extra) ? 'text-garnet' : ''}`} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link onClick={() => setOpen(false)} className={`transition hover:text-garnet ${isActive(pathname, cartHref(locale)) ? 'text-garnet' : ''}`} href={cartHref(locale)}>
              {locale === 'fr' ? 'Panier' : 'Cart'}
            </Link>
          </nav>
          <div className="mt-12 border-t border-sand/70 pt-7">
            <Link href={altLocale === 'fr' ? '/fr' : '/en'} onClick={() => setOpen(false)} className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-azaliIndigo transition hover:text-garnet">
              {locale === 'fr' ? 'Switch to English' : 'Passer en français'}
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
