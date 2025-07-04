import type { Metadata } from 'next';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { METADATA, ROUTES } from '@/app/(constants)';

import '@/assets/styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    default: METADATA.NAME,
    template: `%s - ${METADATA.NAME}`,
  },
  metadataBase: new URL(METADATA.URL),
  description: METADATA.DESCRIPTION,
  applicationName: METADATA.NAME,
  keywords: METADATA.KEYWORDS,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: METADATA.NAME,
    description: METADATA.DESCRIPTION,
    siteName: METADATA.NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.NAME,
    description: METADATA.DESCRIPTION,
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: ROUTES.ROOT,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable} layout-fixed`}
      lang="ru"
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
