export type Locale = 'fr' | 'en';
export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return value === 'fr' || value === 'en';
}

export function pick(locale: Locale, fr?: string | null, en?: string | null) {
  return locale === 'fr' ? fr || en || '' : en || fr || '';
}

export const dictionary = {
  fr: {
    shop: 'Boutique',
    products: 'Produits',
    meet: "L'artiste",
    contact: 'Contact',
    cart: 'Panier',
    checkout: 'Commande',
    categories: 'Catégories',
    featured: 'Pièces en avant',
    viewDetails: 'Voir la pièce',
    addToCart: 'Ajouter au panier',
    total: 'Total',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    cod: 'Paiement à la livraison',
    tunisiaOnly: 'Livraison en Tunisie uniquement',
    orderRequestReceived: 'Votre demande de commande a bien été reçue. Nous allons vérifier les détails et confirmer votre commande prochainement. Le paiement se fera à la livraison.',
    pending: 'En attente de confirmation'
  },
  en: {
    shop: 'Shop',
    products: 'Products',
    meet: 'Meet the Artist',
    contact: 'Contact',
    cart: 'Cart',
    checkout: 'Checkout',
    categories: 'Categories',
    featured: 'Featured pieces',
    viewDetails: 'View details',
    addToCart: 'Add to cart',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    cod: 'Cash on delivery',
    tunisiaOnly: 'Tunisia-only delivery',
    orderRequestReceived: 'Your order request has been received. We will review the details and confirm your order soon. Payment will be made on delivery.',
    pending: 'Pending confirmation'
  }
} as const;
