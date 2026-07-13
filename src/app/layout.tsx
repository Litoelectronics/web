import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar';
import { StickyCallButton } from '@/components/StickyCallButton';

export const metadata = {
  metadataBase: new URL('https://litoelectronics.com'),
  title: {
    default: 'Lito Electronics | DStv, CCTV, TV Mounting & Starlink Installations in Nairobi',
    template: '%s | Lito Electronics',
  },
  description:
    'Lito Electronics provides professional DStv, CCTV, TV mounting, and Starlink installation services in Nairobi, Kiambu, and Thika with fast, accredited support.',
  keywords: [
    'DStv installer near me',
    'DStv agent near me',
    'TV mounting Nairobi',
    'CCTV installation Nairobi',
    'Starlink installer Nairobi',
    'satellite installation Nairobi',
    'home entertainment installation Kenya',
  ],
  alternates: {
    canonical: 'https://litoelectronics.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/images/favicon.png',
    shortcut: '/images/favicon.png',
  },
  manifest: '/images/favicon.png',
  openGraph: {
    title: 'Lito Electronics | DStv, CCTV, TV Mounting & Starlink Installations in Nairobi',
    description:
      'Professional installation services for DStv, CCTV, TV mounting, and Starlink across Nairobi, Kiambu, and Thika.',
    type: 'website',
    url: 'https://litoelectronics.com',
    siteName: 'Lito Electronics',
    locale: 'en_US',
    images: [
      {
        url: '/images/featured image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lito Electronics installation services in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lito Electronics | DStv, CCTV, TV Mounting & Starlink Installations',
    description: 'Professional installation services across Nairobi, Kiambu, and Thika.',
    images: ['/images/featured image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Lito Electronics',
    url: 'https://litoelectronics.com',
    telephone: '+254725065190',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Nairobi',
      addressCountry: 'KE',
    },
    areaServed: ['Nairobi', 'Kiambu', 'Thika'],
    description:
      'Professional DStv, CCTV, TV mounting, and Starlink installation services in Nairobi, Kiambu, and Thika.',
    sameAs: ['https://www.facebook.com', 'https://www.instagram.com'],
    priceRange: '$$',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body id="top" className="bg-slate-100 text-slate-900 antialiased">
        <Navbar />
        {children}
        <StickyCallButton />
      </body>
    </html>
  );
}
