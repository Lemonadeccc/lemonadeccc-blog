import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import Nav from '@/app/components/Nav'
import { getSiteUrl, siteConfig, withSiteUrl } from '@/lib/site'

const PageTransition = dynamic(() => import('@/app/components/PageTransition'))
const CustomCursor = dynamic(() => import('@/app/components/CustomCursor'))

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.authorName, url: siteConfig.authorUrl }],
  creator: siteConfig.authorName,
  publisher: siteConfig.authorName,
  keywords: [
    'frontend development',
    'web animation',
    'gsap',
    'react',
    'nextjs blog',
    'ai',
    'deployment',
  ],
  alternates: {
    types: {
      'application/rss+xml': [
        { url: withSiteUrl('/rss.xml'), title: `${siteConfig.name} Posts (EN)` },
        { url: withSiteUrl('/rss-zh.xml'), title: `${siteConfig.name} 文章 (ZH)` },
      ],
    },
  },
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteUrl,
    locale: 'en_US',
    images: [
      {
        url: withSiteUrl('/posts/img1.jpg'),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} cover`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.creatorHandle,
    images: [withSiteUrl('/posts/img1.jpg')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/icons/icon-192.png',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteUrl,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Person',
    name: siteConfig.authorName,
    url: siteConfig.authorUrl,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.authorName,
  url: siteConfig.authorUrl,
  sameAs: [siteConfig.authorUrl, 'https://x.com/Lemonadecccc'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://imgbed.lemonadec.cc" />
        <link rel="dns-prefetch" href="https://imgbed.lemonadec.cc" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replaceAll('</script>', '<\\/script>') }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replaceAll('</script>', '<\\/script>') }}
        />
        <CustomCursor />
        <div className="h-screen flex flex-col overflow-hidden">
          <Nav />
          <div id="page-scroll-root" className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <PageTransition>
              <main className="flex min-h-full flex-col">
                {children}
              </main>
            </PageTransition>
          </div>
        </div>
      </body>
    </html>
  )
}
