import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import Nav from '@/app/components/Nav'
import ThemeProvider from '@/app/components/ThemeProvider'
import DynamicFavicon from '@/app/components/DynamicFavicon'
import { THEME_STORAGE_KEY } from '@/app/components/themeConstants'
import {
  createFaviconBootScript,
  FAVICON_LINKS,
  FAVICON_TYPE,
  LIGHT_FAVICON_HREF,
} from '@/lib/favicon'
import { getSiteUrl, siteConfig, withSiteUrl } from '@/lib/site'

const PageTransition = dynamic(() => import('@/app/components/PageTransition'))
const CustomCursor = dynamic(() => import('@/app/components/CustomCursor'))

const siteUrl = getSiteUrl()
const faviconBootScript = createFaviconBootScript(THEME_STORAGE_KEY)

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
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.creatorHandle,
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {FAVICON_LINKS.map(({ id, rel }) => (
          <link key={id} id={id} rel={rel} type={FAVICON_TYPE} href={LIGHT_FAVICON_HREF} />
        ))}
        <script dangerouslySetInnerHTML={{ __html: faviconBootScript.replaceAll('</script>', '<\\/script>') }} />
        <link rel="preconnect" href="https://imgbed.lemonadec.cc" />
        <link rel="dns-prefetch" href="https://imgbed.lemonadec.cc" />
      </head>
      <body>
        <ThemeProvider>
          <DynamicFavicon />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replaceAll('</script>', '<\\/script>') }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replaceAll('</script>', '<\\/script>') }}
          />
          <CustomCursor />
          <div className="flex h-dvh min-h-dvh flex-col overflow-hidden">
            <Nav />
            <div id="page-scroll-root" className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              <PageTransition>
                <main className="flex min-h-full flex-col">
                  {children}
                </main>
              </PageTransition>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
