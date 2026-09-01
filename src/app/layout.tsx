import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import { ParticleField } from '@/components/3d/ParticleField';
import { CustomCursor } from '@/components/ui/CustomCursor';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#070114',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Tarun Singh — Founder, Developer & Digital Marketing Student | TK Web Solutions',
  description: 'Meet Tarun Singh: founder of TK Web Solutions, web and Android app developer, and BBA Digital Marketing student at Manipal University Jaipur. Creator of LUNA. Based in Bharatpur, Rajasthan.',
  keywords: [
    'Tarun Singh',
    'Tarun Singh developer',
    'Tarun Singh Bharatpur',
    'Tarun Singh TK Web Solutions',
    'Tarun Singh digital marketing',
    'Tarun Singh Manipal University Jaipur',
    'Tarun Singh startup',
    'Tarun Singh web developer',
    'TK Web Solutions founder',
    'LUNA app Tarun Singh',
    '3D Web Developer',
    'AI ML Developer Rajasthan',
  ],
  authors: [{ name: 'Tarun Singh', url: 'https://tkwebsolutions.in/tarun-singh.html' }],
  creator: 'Tarun Singh',
  publisher: 'TK Web Solutions',
  metadataBase: new URL('https://tkwebsolutions.in/'),
  openGraph: {
    title: 'Tarun Singh — Founder, Developer & Product Builder',
    description: 'Founder of TK Web Solutions • BBA Digital Marketing at Manipal University Jaipur • Creator of LUNA.',
    url: 'https://tkwebsolutions.in/tarun-singh.html',
    siteName: 'Tarun Singh',
    images: [
      {
        url: 'https://tkwebsolutions.in/image/founder.jpg',
        width: 1200,
        height: 630,
        alt: 'Tarun Singh — Founder & Lead Developer at TK Web Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarun Singh — Founder, Developer & Product Builder',
    description: 'Founder of TK Web Solutions • BBA Digital Marketing at Manipal University Jaipur • Creator of LUNA.',
    images: ['https://tkwebsolutions.in/image/founder.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Comprehensive Google AI / Search Schema Graph from tarun-singh.html
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://tkwebsolutions.in/#tarunsingh',
        name: 'Tarun Singh',
        givenName: 'Tarun',
        familyName: 'Singh',
        jobTitle: 'Founder & Developer',
        description: 'Tarun Singh is a developer, digital marketing student, and the founder of TK Web Solutions. He is currently pursuing BBA in Digital Marketing at Manipal University Jaipur and builds websites, Android applications, and digital products including LUNA.',
        url: 'https://tkwebsolutions.in/tarun-singh.html',
        image: 'https://tkwebsolutions.in/image/founder.jpg',
        telephone: '+919079368240',
        email: 'tkwebsolution1301@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bharatpur',
          addressRegion: 'Rajasthan',
          postalCode: '321001',
          addressCountry: 'IN',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'TK Web Solutions',
          url: 'https://tkwebsolutions.in/',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Manipal University Jaipur',
          sameAs: 'https://jaipur.manipal.edu/',
        },
        knowsAbout: [
          'Web Development',
          'Android App Development',
          'Flutter 3.19+',
          'Artificial Intelligence (AI)',
          'Machine Learning (LM/ML)',
          'Digital Marketing',
          'Search Engine Optimization',
          'UI/UX Design',
          '3D WebGL & Three.js',
          'Product Development',
        ],
        sameAs: [
          'https://tkwebsolutions.in/',
          'https://tkwebsolutions.in/tarun-singh.html',
          'https://github.com/Tarunsinghgunesh',
          'https://www.instagram.com/tkwebsolutions_official',
          'https://t.me/TKwebsolutions_bot',
          'https://about.me/tarunk13',
          'https://www.facebook.com/profile.php?id=61586888301761',
        ],
      },
      {
        '@type': 'Organization',
        '@id': 'https://tkwebsolutions.in/#organization',
        name: 'TK Web Solutions',
        url: 'https://tkwebsolutions.in/',
        founder: {
          '@id': 'https://tkwebsolutions.in/#tarunsingh',
        },
        foundingDate: '2023',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bharatpur',
          addressRegion: 'Rajasthan',
          postalCode: '321001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 27.2152,
          longitude: 77.4841,
        },
        telephone: '+919079368240',
        email: 'tkwebsolution1301@gmail.com',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Luna - Companion & Period Sanctuary',
        operatingSystem: 'Android',
        applicationCategory: 'HealthApplication',
        author: {
          '@id': 'https://tkwebsolutions.in/#tarunsingh',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        downloadUrl: 'https://luna-website-flame.vercel.app/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who is Tarun Singh?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tarun Singh is a developer, digital marketing student, and the founder of TK Web Solutions. He is currently pursuing BBA Digital Marketing at Manipal University Jaipur and builds websites, mobile applications, and digital products from Bharatpur, Rajasthan.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does Tarun Singh do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tarun Singh specializes in website development, Android and Flutter application development, search engine optimization (SEO), digital marketing strategy, and building independent software products.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is TK Web Solutions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TK Web Solutions is an independent digital studio founded by Tarun Singh that designs and builds high-performance websites, Android apps, and digital systems for businesses, coaching institutes, and schools across India.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Tarun Singh studying and which university does he attend?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tarun Singh is currently pursuing a Bachelor of Business Administration (BBA) in Digital Marketing at Manipal University Jaipur.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is LUNA and is it free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LUNA is a privacy-first menstrual sanctuary and companion Android application developed by Tarun Singh. It is 100% free with no subscriptions or paywalls.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is Tarun Singh based?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tarun Singh is based in Bharatpur, Rajasthan, India.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#070114] text-slate-100 min-h-screen relative antialiased selection:bg-pink-500 selection:text-white">
        <CustomCursor />
        <ParticleField />
        {children}
      </body>
    </html>
  );
}
