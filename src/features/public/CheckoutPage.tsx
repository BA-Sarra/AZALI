'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { formatTnd } from '@/lib/currency';
import { successHref, termsHref } from '@/lib/routes';
import { useCart } from '@/components/cart/CartProvider';

export function CheckoutPage({ locale, shippingFee }: { locale: Locale; shippingFee: number }) {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const total = subtotal + shippingFee;

  async function submit(formData: FormData) {
    setLoading(true); setError('');
    const payload = {
      locale,
      customer: {
        firstName: String(formData.get('firstName') || ''),
        lastName: String(formData.get('lastName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        secondPhone: String(formData.get('secondPhone') || '')
      },
      address: {
        addressLine: String(formData.get('addressLine') || ''),
        city: String(formData.get('city') || ''),
        governorate: String(formData.get('governorate') || ''),
        postalCode: String(formData.get('postalCode') || '')
      },
      notes: String(formData.get('notes') || ''),
      termsAccepted: formData.get('termsAccepted') === 'on',
      items: items.map((item) => ({ productId: item.productId, colorId: item.colorId, quantity: item.quantity, customizations: item.customizations }))
    };
    const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || 'Could not create order.'); return; }
    clearCart();
    router.push(successHref(locale, data.orderNumber));
  }

  return (
    <section className="page-wrap page-pad">
      <h1 className="font-display text-3xl md:text-4xl">{locale === 'fr' ? 'Commande' : 'Checkout'}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-bark/75">{locale === 'fr' ? 'Paiement à la livraison. Des frais de livraison fixes de 8 TND sont ajoutés à chaque commande. Livraison disponible en Tunisie uniquement.' : 'Cash on delivery. A fixed 8 TND delivery fee is added to every order. Delivery is available in Tunisia only.'}</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <form action={submit} className="card grid gap-4 p-5 md:grid-cols-2">
          <div><label className="label">{locale === 'fr' ? 'Prénom' : 'First name'}</label><input className="input" name="firstName" required /></div>
          <div><label className="label">{locale === 'fr' ? 'Nom' : 'Last name'}</label><input className="input" name="lastName" required /></div>
          <div><label className="label">Email</label><input className="input" name="email" type="email" required /></div>
          <div><label className="label">{locale === 'fr' ? 'Téléphone' : 'Phone'}</label><input className="input" name="phone" required /></div>
          <div><label className="label">{locale === 'fr' ? 'Téléphone 2 optionnel' : 'Optional second phone'}</label><input className="input" name="secondPhone" /></div>
          <div><label className="label">{locale === 'fr' ? 'Gouvernorat' : 'Governorate'}</label><input className="input" name="governorate" required /></div>
          <div className="md:col-span-2"><label className="label">{locale === 'fr' ? 'Adresse' : 'Address'}</label><input className="input" name="addressLine" required /></div>
          <div><label className="label">{locale === 'fr' ? 'Ville' : 'City'}</label><input className="input" name="city" required /></div>
          <div><label className="label">{locale === 'fr' ? 'Code postal' : 'Postal code'}</label><input className="input" name="postalCode" /></div>
          <div className="md:col-span-2"><label className="label">{locale === 'fr' ? 'Notes' : 'Notes'}</label><textarea className="textarea-azali" name="notes" /></div>
          <label className="md:col-span-2 flex items-start gap-3 text-sm leading-6"><input className="checkbox-azali mt-1" name="termsAccepted" type="checkbox" required /><span>{locale === 'fr' ? 'J’accepte les conditions de commande AZALI.' : 'I accept AZALI order terms.'} <a href={termsHref(locale)} className="text-garnet underline underline-offset-4">{locale === 'fr' ? 'Lire' : 'Read'}</a></span></label>
          {error && <p className="md:col-span-2 rounded bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <button disabled={loading || items.length === 0} className="btn-primary md:col-span-2">{loading ? (locale === 'fr' ? 'Envoi...' : 'Sending...') : (locale === 'fr' ? 'Envoyer la demande' : 'Send order request')}</button>
        </form>
        <aside className="card h-fit p-5"><h2 className="font-display text-2xl">{locale === 'fr' ? 'Résumé' : 'Summary'}</h2><div className="mt-5 space-y-3 text-sm">{items.map((item) => <div key={item.productId + item.colorId} className="flex justify-between gap-3"><span>{locale === 'fr' ? item.nameFr : item.nameEn} × {item.quantity}</span><span>{formatTnd(item.unitPrice * item.quantity)}</span></div>)}<div className="flex justify-between border-t border-espresso/10 pt-3"><span>{locale === 'fr' ? 'Sous-total' : 'Subtotal'}</span><span>{formatTnd(subtotal)}</span></div><div className="flex justify-between"><span>{locale === 'fr' ? 'Livraison' : 'Shipping'}</span><span>{formatTnd(shippingFee)}</span></div><div className="flex justify-between border-t border-espresso/10 pt-4 text-base font-semibold"><span>Total</span><span>{formatTnd(total)}</span></div></div></aside>
      </div>
    </section>
  );
}
