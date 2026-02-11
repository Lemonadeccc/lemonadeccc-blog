import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Featured work and experiments by ${siteConfig.authorName}.`,
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: `Portfolio | ${siteConfig.name}`,
    description: `Featured work and experiments by ${siteConfig.authorName}.`,
    url: '/portfolio',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
