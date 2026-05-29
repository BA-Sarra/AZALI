'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { checkoutHref, productHref, productsHref } from '@/lib/routes';
import { formatTnd } from '@/lib/currency';
import { useCart, cartItemKey } from '@/components/cart/CartProvider';

export function CartPage({ locale, shippingFee }: { locale: Locale; shippingFee: number }) {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[760px] px-6 py-20 md:py-24">
        <p className="origin-label">AZALI</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl">{locale === 'fr' ? 'Panier' : 'Cart'}</h1>
        <div className="card mt-8 p-6">
          <p className="text-sm text-umber/70">{locale === 'fr' ? 'Votre panier est vide.' : 'Your cart is empty.'}</p>
          <Link href={productsHref(locale)} className="btn-primary mt-6 inline-flex">{locale === 'fr' ? 'Découvrir les produits' : 'Browse products'}</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-wrap page-pad">
      <p className="origin-label">AZALI</p>
      <h1 className="mt-4 font-display text-3xl md:text-4xl">{locale === 'fr' ? 'Panier' : 'Cart'}</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => {
            const key = cartItemKey(item);
            return (
              <div key={key} className="card grid gap-4 p-4 md:grid-cols-[92px_1fr_auto]">
                <div className="relative aspect-square overflow-hidden rounded bg-sand/40"><Image src={item.imageUrl || '/placeholders/product.svg'} alt={pick(locale, item.nameFr, item.nameEn)} fill className="object-cover" /></div>
                <div>
                  <Link href={productHref(locale, item.productSlug)} className="font-display text-xl leading-tight hover:text-garnet">{pick(locale, item.nameFr, item.nameEn)}</Link>
                  <p className="mt-2 text-sm text-bark/70">{pick(locale, item.colorLabelFr, item.colorLabelEn)}</p>
                  {item.customizations.map((c, index) => <p key={index} className="text-xs leading-5 text-bark/60">{pick(locale, c.groupLabelFr, c.groupLabelEn)}: {pick(locale, c.optionLabelFr, c.optionLabelEn) || c.textValue || (c.booleanValue ? 'Yes' : '')}</p>)}
                  <button onClick={() => removeItem(key)} className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-garnet underline-offset-4 hover:underline">{locale === 'fr' ? 'Retirer' : 'Remove'}</button>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center rounded border border-sand/70 bg-parchment/60">
                    <button type="button" className="px-3 py-2 text-garnet transition hover:bg-garnet hover:text-parchment" onClick={() => updateQuantity(key, Math.max(1, item.quantity - 1))}>−</button>
                    <span className="min-w-9 text-center text-sm font-semibold text-umber">{item.quantity}</span>
                    <button type="button" className="px-3 py-2 text-garnet transition hover:bg-garnet hover:text-parchment" onClick={() => updateQuantity(key, item.quantity + 1)}>+</button>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-garnet">{formatTnd(item.unitPrice * item.quantity)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <aside className="card h-fit p-5">
          <h2 className="font-display text-2xl">{locale === 'fr' ? 'Résumé' : 'Summary'}</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span>{locale === 'fr' ? 'Sous-total' : 'Subtotal'}</span><span>{formatTnd(subtotal)}</span></div>
            <div className="flex justify-between"><span>{locale === 'fr' ? 'Livraison' : 'Delivery'}</span><span>{formatTnd(shippingFee)}</span></div>
            <div className="flex justify-between border-t border-espresso/10 pt-4 text-base font-semibold"><span>Total</span><span>{formatTnd(subtotal + shippingFee)}</span></div>
          </div>
          <Link href={checkoutHref(locale)} className="btn-primary mt-6 flex justify-center">{locale === 'fr' ? 'Commander' : 'Checkout'}</Link>
          <p className="mt-4 text-xs leading-5 text-bark/60">{locale === 'fr' ? 'Paiement à la livraison. Livraison en Tunisie uniquement.' : 'Cash on delivery. Delivery in Tunisia only.'}</p>
        </aside>
      </div>
    </section>
  );
}
