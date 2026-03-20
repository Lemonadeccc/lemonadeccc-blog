import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HomeBackgroundVideo } from "@/components/layout/HomeBackgroundVideo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://lemonadec.cc";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lemonadeccc",
    template: "%s | Lemonadeccc",
  },
  description:
    "A collection of the best resources for learning development from the Internet, hand-picked and created by Lemonadeccc. Learning and sharing articles about AI and development.",
  keywords: ["AI", "development", "programming", "blog", "resources", "frontend", "Next.js"],
  authors: [{ name: "Lemonadeccc", url: SITE_URL }],
  creator: "Lemonadeccc",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Lemonadeccc",
    title: "Lemonadeccc",
    description:
      "Learning and sharing articles about AI and development.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemonadeccc",
    description: "Learning and sharing articles about AI and development.",
    creator: "@lemonadeccc",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "Lemonadeccc RSS Feed" },
        { url: "/zh/rss.xml", title: "Lemonadeccc RSS Feed (zh-CN)" },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Lemonadeccc",
      url: SITE_URL,
      sameAs: [`${SITE_URL}/rss.xml`, `${SITE_URL}/zh/rss.xml`],
      description:
        "Learning and sharing articles about AI and development.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Lemonadeccc",
      description:
        "A collection of the best resources for learning development from the Internet, hand-picked and created by Lemonadeccc.",
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: ["en", "zh-CN"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative bg-bg-primary text-white antialiased">
        <HomeBackgroundVideo />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
