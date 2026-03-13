import type { Metadata } from 'next'
import Hero from './components/Hero'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    type: 'website',
  },
}

export default function Home() {
  return (
    <section className="flex h-full min-h-0 flex-1 flex-col overflow-visible md:overflow-hidden">
      <Hero />
    </section>
  )
}
