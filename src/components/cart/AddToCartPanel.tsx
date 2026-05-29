'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCart, type CartCustomization } from './CartProvider';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { formatTnd } from '@/lib/currency';

type Option = { id: string; labelFr: string; labelEn: string; value: string; colorHex?: string | null; priceDelta: number };
type Group = { id: string; slug?: string; labelFr: string; labelEn: string; helpTextFr?: string | null; helpTextEn?: string | null; inputType: string; isRequired: boolean; options: Option[] };
type Color = { id: string; labelFr: string; labelEn: string; colorHex?: string | null; priceDelta: number };
type Product = { id: string; slug: string; nameFr: string; nameEn: string; basePrice: number; imageUrl?: string; colors: Color[]; customizationGroups: Group[] };

function selectedHasValue(value: any, inputType: string) {
  if (inputType === 'MULTI_SELECT') return Array.isArray(value) && value.length > 0;
  return value !== undefined && value !== null && value !== '';
}

export function AddToCartPanel({ product, locale }: { product: Product; locale: Locale }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [colorId, setColorId] = useState(product.colors[0]?.id || '');
  const [values, setValues] = useState<Record<string, any>>({});
  const [message, setMessage] = useState('');

  const selectedColor = product.colors.find((color) => color.id === colorId);
  const customizations: CartCustomization[] = useMemo(() => {
    return product.customizationGroups.flatMap((group) => {
      const raw = values[group.id];
      if (group.inputType === 'MULTI_SELECT' && Array.isArray(raw)) {
        return raw.map((optionId: string) => {
          const option = group.options.find((item) => item.id === optionId);
          return option ? { groupId: group.id, groupLabelFr: group.labelFr, groupLabelEn: group.labelEn, inputType: group.inputType, optionId, optionLabelFr: option.labelFr, optionLabelEn: option.labelEn, priceDelta: option.priceDelta } : null;
        }).filter(Boolean) as CartCustomization[];
      }
      if (['SINGLE_SELECT', 'COLOR_SELECT', 'IMAGE_SWATCH'].includes(group.inputType) && raw) {
        const option = group.options.find((item) => item.id === raw);
        return option ? [{ groupId: group.id, groupLabelFr: group.labelFr, groupLabelEn: group.labelEn, inputType: group.inputType, optionId: option.id, optionLabelFr: option.labelFr, optionLabelEn: option.labelEn, priceDelta: option.priceDelta }] : [];
      }
      if ((group.inputType === 'TEXT' || group.inputType === 'TEXTAREA') && raw) return [{ groupId: group.id, groupLabelFr: group.labelFr, groupLabelEn: group.labelEn, inputType: group.inputType, textValue: String(raw), priceDelta: 0 }];
      if (group.inputType === 'BOOLEAN' && raw) return [{ groupId: group.id, groupLabelFr: group.labelFr, groupLabelEn: group.labelEn, inputType: group.inputType, booleanValue: true, priceDelta: 0 }];
      return [];
    });
  }, [product.customizationGroups, values]);

  const unitPrice = useMemo(() => product.basePrice + (selectedColor?.priceDelta || 0) + customizations.reduce((sum, item) => sum + (item.priceDelta || 0), 0), [product.basePrice, selectedColor, customizations]);
  const visibleGroups = product.customizationGroups.filter((group) => group.slug !== 'leather-color');

  function handleSelect(group: Group, optionId: string) {
    setValues({ ...values, [group.id]: optionId });
  }

  function handleMultiSelect(group: Group, optionId: string) {
    const arr = new Set(values[group.id] || []);
    arr.has(optionId) ? arr.delete(optionId) : arr.add(optionId);
    setValues({ ...values, [group.id]: Array.from(arr) });
  }

  function handleAdd() {
    const missing = visibleGroups.find((group) => group.isRequired && !selectedHasValue(values[group.id], group.inputType));
    if (missing) {
      setMessage(locale === 'fr' ? `Veuillez choisir: ${missing.labelFr}` : `Please choose: ${missing.labelEn}`);
      return;
    }
    addItem({
      productId: product.id,
      productSlug: product.slug,
      nameFr: product.nameFr,
      nameEn: product.nameEn,
      imageUrl: product.imageUrl,
      colorId: selectedColor?.id,
      colorLabelFr: selectedColor?.labelFr,
      colorLabelEn: selectedColor?.labelEn,
      unitPrice,
      quantity,
      customizations
    });
    setMessage(locale === 'fr' ? 'Ajouté au panier.' : 'Added to cart.');
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="label">{locale === 'fr' ? 'Prix' : 'Price'}</p>
        <p className="mt-1 font-display text-[1.85rem] text-garnet md:text-[2.05rem]">{locale === 'fr' ? 'À partir de' : 'From'} {formatTnd(unitPrice)}</p>
      </div>

      {product.colors.length > 0 && (
        <div>
          <label className="label">{locale === 'fr' ? 'Couleur' : 'Color'}</label>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((color) => (
              <button key={color.id} type="button" onClick={() => setColorId(color.id)} className={`rounded-full border px-4 py-2 text-[0.76rem] font-semibold transition ${colorId === color.id ? 'border-garnet bg-garnet text-parchment' : 'border-sand/80 bg-white/60 text-umber hover:border-garnet hover:text-garnet'}`}>
                <span className="mr-2 inline-block h-3 w-3 rounded-full border border-umber/15 align-middle" style={{ background: color.colorHex || '#896038' }} />
                {pick(locale, color.labelFr, color.labelEn)}
              </button>
            ))}
          </div>
          <p className="mt-3 max-w-md text-xs italic leading-5 text-azaliIndigo/80">
            {locale === 'fr' ? 'Pièce issue d’une chute de cuir. Quand cette couleur disparaît, elle ne revient pas forcément.' : 'Made from a leather drop. Once this color is gone, it may not come back.'}
          </p>
        </div>
      )}

      {visibleGroups.map((group) => (
        <div key={group.id}>
          <div className="mb-3 flex items-center justify-between gap-4">
            <label className="label mb-0">{pick(locale, group.labelFr, group.labelEn)} {group.isRequired ? '*' : ''}</label>
            {group.slug?.startsWith('notebook-combo') && (
              <details className="group relative">
                <summary className="custom-summary inline-flex cursor-pointer items-center gap-2 rounded border border-garnet/60 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.19em] text-garnet transition hover:bg-garnet hover:text-parchment">
                  <Plus size={12} /> {locale === 'fr' ? 'Savoir plus' : 'Know more'}
                </summary>
                <div className="absolute right-0 z-10 mt-2 w-[280px] rounded border border-sand/80 bg-parchment p-4 text-xs leading-6 text-umber/75 shadow-soft">
                  {locale === 'fr' ? 'S signifie petit carnet, M signifie carnet moyen. Assassi reste compact; Fannen accueille plus de carnets et plus d’idées.' : 'S means small notebook, M means medium notebook. Assassi stays compact; Fannen holds more notebooks and more ideas.'}
                </div>
              </details>
            )}
          </div>
          {group.helpTextFr && !group.slug?.startsWith('notebook-combo') && <p className="mb-3 text-xs leading-5 text-bark/65">{pick(locale, group.helpTextFr, group.helpTextEn)}</p>}

          {['SINGLE_SELECT', 'COLOR_SELECT', 'IMAGE_SWATCH'].includes(group.inputType) && (
            <div className={group.slug?.startsWith('notebook-combo') ? 'grid gap-2' : 'flex flex-wrap gap-2'}>
              {group.options.map((option) => {
                const active = values[group.id] === option.id;
                return (
                  <button key={option.id} type="button" onClick={() => handleSelect(group, option.id)} className={`${group.slug?.startsWith('notebook-combo') ? 'w-full text-left' : ''} rounded border px-3.5 py-2 text-[0.78rem] transition ${active ? 'border-garnet bg-garnet text-parchment' : 'border-sand/80 bg-white/60 text-umber hover:border-garnet hover:text-garnet'}`}>
                    {option.colorHex && <span className="mr-2 inline-block h-3 w-3 rounded-full border border-umber/15 align-middle" style={{ background: option.colorHex }} />}
                    {pick(locale, option.labelFr, option.labelEn)} {option.priceDelta ? `+${formatTnd(option.priceDelta)}` : ''}
                  </button>
                );
              })}
            </div>
          )}

          {group.inputType === 'MULTI_SELECT' && (
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const arr = values[group.id] || [];
                const active = arr.includes(option.id);
                return <button key={option.id} type="button" onClick={() => handleMultiSelect(group, option.id)} className={`rounded border px-3.5 py-2 text-[0.78rem] transition ${active ? 'border-garnet bg-garnet text-parchment' : 'border-sand/80 bg-white/60 text-umber hover:border-garnet hover:text-garnet'}`}>{pick(locale, option.labelFr, option.labelEn)}</button>;
              })}
            </div>
          )}
          {group.inputType === 'TEXT' && <input className="input" maxLength={80} value={values[group.id] || ''} onChange={(e) => setValues({ ...values, [group.id]: e.target.value })} />}
          {group.inputType === 'TEXTAREA' && (
            <>
              {group.helpTextFr && <p className="mb-2 text-xs leading-5 text-bark/65">{pick(locale, group.helpTextFr, group.helpTextEn)}</p>}
              <textarea className="textarea-azali" placeholder={locale === 'fr' ? 'Charm frontal, charms latéraux, initiales ou notes...' : 'Front charm, side charms, initials, or notes...'} maxLength={500} value={values[group.id] || ''} onChange={(e) => setValues({ ...values, [group.id]: e.target.value })} />
            </>
          )}
          {group.inputType === 'BOOLEAN' && <button type="button" onClick={() => setValues({ ...values, [group.id]: !values[group.id] })} className={`rounded border px-3.5 py-2 text-[0.78rem] transition ${values[group.id] ? 'border-garnet bg-garnet text-parchment' : 'border-sand/80 bg-white/60 text-umber hover:border-garnet hover:text-garnet'}`}>{values[group.id] ? (locale === 'fr' ? 'Oui' : 'Yes') : (locale === 'fr' ? 'Non' : 'No')}</button>}
        </div>
      ))}

      <p className="text-xs leading-5 text-umber/65">
        {locale === 'fr' ? 'Fabriqué sur commande en 3 à 7 jours. Expédié depuis Tunis. Paiement à la livraison.' : 'Made to order in 3-7 days. Ships from Tunis. Cash on delivery.'}
      </p>

      <div>
        <p className="label">{locale === 'fr' ? 'Quantité' : 'Quantity'}</p>
        <div className="inline-flex overflow-hidden rounded border border-sand/80 bg-white/60">
          <button type="button" className="min-w-12 px-4 py-2 text-garnet transition hover:bg-garnet hover:text-parchment" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
          <span className="min-w-12 border-x border-sand/70 py-2 text-center text-sm font-semibold text-umber">{quantity}</span>
          <button type="button" className="min-w-12 px-4 py-2 text-garnet transition hover:bg-garnet hover:text-parchment" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      <button type="button" onClick={handleAdd} className="btn-primary w-full">{locale === 'fr' ? 'Ajouter au panier' : 'Add to cart'}</button>
      {message && <p className="text-sm text-garnet">{message}</p>}
    </div>
  );
}
