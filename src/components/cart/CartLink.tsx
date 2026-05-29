'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';
import { cartHref } from '@/lib/routes';
import type { Locale } from '@/lib/i18n';

export function CartLink({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const { itemCount } = useCart();
  return (
    <Link href={cartHref(locale)} className="group relative inline-flex items-center gap-2 px-1 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-umber/70 transition hover:text-garnet">
      <ShoppingBag size={compact ? 18 : 16} strokeWidth={1.7} />
      {!compact && <span>{locale === 'fr' ? 'Panier' : 'Cart'}</span>}
      {itemCount > 0 && <span className="ml-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-garnet px-1 text-[0.65rem] tracking-normal text-parchment">{itemCount}</span>}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-garnet transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
