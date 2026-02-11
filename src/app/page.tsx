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
    <section className="flex-1 flex flex-col">
      <Hero />
    </section>
  )
}
