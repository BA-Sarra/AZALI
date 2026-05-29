import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const body = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'AZALI', template: '%s | AZALI' },
  description: 'Premium handmade leather goods in Tunisia.',
  openGraph: {
    title: 'AZALI',
    description: 'Premium handmade leather goods in Tunisia.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get('x-azali-locale') || 'fr';
  return (
    <html lang={locale}>
      <body className={`${display.variable} ${body.variable} font-body antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
