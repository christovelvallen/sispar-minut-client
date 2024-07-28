import '@/styles/globals.css';

import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { fontSans } from '@/lib/fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'SI Pariwisata MINUT',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
