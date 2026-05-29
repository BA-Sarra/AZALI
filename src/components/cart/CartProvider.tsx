'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartCustomization = {
  groupId: string;
  groupLabelFr: string;
  groupLabelEn: string;
  inputType: string;
  optionId?: string;
  optionIds?: string[];
  optionLabelFr?: string;
  optionLabelEn?: string;
  textValue?: string;
  booleanValue?: boolean;
  priceDelta?: number;
};

export type CartItem = {
  productId: string;
  productSlug: string;
  nameFr: string;
  nameEn: string;
  imageUrl?: string;
  colorId?: string;
  colorLabelFr?: string;
  colorLabelEn?: string;
  unitPrice: number;
  quantity: number;
  customizations: CartCustomization[];
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'azali-cart-v1';

export function cartItemKey(item: Pick<CartItem, 'productId' | 'colorId' | 'customizations'>) {
  return JSON.stringify({
    productId: item.productId,
    colorId: item.colorId || null,
    customizations: item.customizations.map((customization) => ({
      groupId: customization.groupId,
      optionId: customization.optionId || null,
      optionIds: customization.optionIds || [],
      textValue: customization.textValue || null,
      booleanValue: customization.booleanValue ?? null
    }))
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem(item) {
      setItems((current) => {
        const key = cartItemKey(item);
        const index = current.findIndex((existing) => cartItemKey(existing) === key);
        if (index === -1) return [...current, item];
        return current.map((existing, i) => i === index ? { ...existing, quantity: existing.quantity + item.quantity } : existing);
      });
    },
    removeItem(key) {
      setItems((current) => current.filter((item) => cartItemKey(item) !== key));
    },
    updateQuantity(key, quantity) {
      setItems((current) => current.map((item) => cartItemKey(item) === key ? { ...item, quantity: Math.max(1, quantity) } : item));
    },
    clearCart() { setItems([]); },
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
