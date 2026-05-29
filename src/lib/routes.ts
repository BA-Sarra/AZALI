import type { Locale } from './i18n';

export function homeHref(locale: Locale) { return `/${locale}`; }
export function productsHref(locale: Locale) { return locale === 'fr' ? '/fr/produits' : '/en/products'; }
export function categoryHref(locale: Locale, slug: string) { return locale === 'fr' ? `/fr/categorie/${slug}` : `/en/category/${slug}`; }
export function productHref(locale: Locale, slug: string) { return locale === 'fr' ? `/fr/produit/${slug}` : `/en/product/${slug}`; }
export function meetHref(locale: Locale) { return locale === 'fr' ? '/fr/rencontrer-l-artiste' : '/en/meet-the-artist'; }
export function contactHref(locale: Locale) { return `/${locale}/contact`; }
export function cartHref(locale: Locale) { return locale === 'fr' ? '/fr/panier' : '/en/cart'; }
export function checkoutHref(locale: Locale) { return locale === 'fr' ? '/fr/commande' : '/en/checkout'; }
export function successHref(locale: Locale, orderNumber: string) { return locale === 'fr' ? `/fr/commande-recue/${orderNumber}` : `/en/order-success/${orderNumber}`; }
export function faqHref(locale: Locale) { return `/${locale}/faq`; }
export function deliveryHref(locale: Locale) { return locale === 'fr' ? '/fr/livraison-et-paiement' : '/en/delivery-and-payment'; }
export function careHref(locale: Locale) { return locale === 'fr' ? '/fr/entretien-du-cuir' : '/en/leather-care'; }
export function returnsHref(locale: Locale) { return locale === 'fr' ? '/fr/retours-et-echanges' : '/en/returns-and-exchanges'; }
export function privacyHref(locale: Locale) { return locale === 'fr' ? '/fr/confidentialite' : '/en/privacy'; }
export function termsHref(locale: Locale) { return locale === 'fr' ? '/fr/conditions' : '/en/terms'; }

export function ethicsHref(locale: Locale) { return locale === 'fr' ? '/fr/ethique-du-cuir' : '/en/leather-ethics'; }
