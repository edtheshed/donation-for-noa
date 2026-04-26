import type { Metadata } from 'next';
import { Cormorant_Garamond, Lora } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const lora = Lora({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blood Donation Registry',
  description: 'Register your blood donation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lora.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
