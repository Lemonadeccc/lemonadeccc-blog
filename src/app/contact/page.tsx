import Image from 'next/image'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

type ContactItem = {
  label: string
  value: string
  href: string
}

type FriendLink = {
  name: string
  avatar: string
  github: string
  website?: string
  description: string
}

const contactItems: ContactItem[] = [
  {
    label: 'GitHub',
    value: '@Lemonadeccc',
    href: 'https://github.com/Lemonadeccc',
  },
  {
    label: 'X',
    value: '@Lemonadecccc',
    href: 'https://x.com/Lemonadecccc',
  },
]

const friendSeeds = [
  {
    name: 'MapleCity1314',
    github: 'https://github.com/MapleCity1314',
    website: 'https://icstudio.top/',
    description: 'Web3 Full-stack Architect specialized in Frontend Infrastructure and Agent Ecosystem.',
  },
] as const

const avatarPool = [
  '/posts/img1.jpg',
  '/posts/img2.jpg',
  '/portfolio/img1.jpg',
  '/portfolio/img2.jpg',
  '/portfolio/img3.jpg',
  '/portfolio/img4.jpg',
  '/portfolio/img5.jpg',
] as const

const friendLinks: FriendLink[] = friendSeeds.map((seed, index) => ({
  name: seed.name,
  github: seed.github,
  website: seed.website,
  avatar: avatarPool[index % avatarPool.length],
  description: seed.description,
}))

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${siteConfig.authorName} via GitHub or X.`,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Contact ${siteConfig.authorName} via GitHub or X.`,
    url: '/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <section className="w-full flex-1 bg-bg text-text min-h-0 lg:h-full lg:overflow-hidden">
      <div className="app-container h-full px-10 py-5 md:py-8 lg:py-6">
        <div className="flex h-full min-h-0 flex-col">
          <div className="shrink-0">
            <h1 className="text-[30px] md:text-[36px] uppercase tracking-[0.08em] font-medium mb-3">Contact</h1>
            <p className="w-full text-[16px] md:text-[20px] leading-[1.6] text-text-secondary md:whitespace-nowrap">
              Reach me through the channels below. Every link opens in a new tab.
            </p>
          </div>

          <div className="mt-8 grid gap-10 lg:mt-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1fr]">
            <section className="border-t border-white">
              <h2 className="py-5 text-[16px] uppercase tracking-[0.08em] text-text-secondary">Contacts</h2>
              <div className="border-b border-white/30">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-5 border-t border-white/30 py-4 md:py-5"
                  >
                    <span className="text-[13px] md:text-[14px] uppercase tracking-[0.08em] text-text-secondary">
                      {item.label}
                    </span>
                    <span className="hover-wipe text-[22px] md:text-[46px] uppercase leading-[0.95] text-right">
                      {item.value}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="border-t border-white lg:min-h-0 lg:flex lg:flex-col">
              <h2 className="py-5 text-[16px] uppercase tracking-[0.08em] text-text-secondary lg:shrink-0">Friend Links</h2>
              <p className="mb-4 w-full text-[13px] leading-[1.6] text-text-secondary md:text-[14px] md:whitespace-nowrap lg:shrink-0">
                People and developers I follow. Click any card to open the GitHub profile in a new tab.
              </p>
              <div className="friend-links-scroll flex flex-col gap-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
                {friendLinks.map((friend) => (
                  <article
                    key={friend.github}
                    className="group flex items-center gap-4 border border-white/30 bg-transparent p-4 transition-colors duration-300 hover:bg-white/5"
                  >
                    <Image
                      src={friend.avatar}
                      alt={`${friend.name} avatar`}
                      width={64}
                      height={64}
                      suppressHydrationWarning
                      className="h-16 w-16 rounded-full border border-white/40 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[20px] leading-none uppercase">{friend.name}</p>
                      <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-text-secondary">
                        {friend.description}
                      </p>
                      <p className="mt-3 flex items-center gap-3 text-[14px]">
                        <a
                          href={friend.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hover-wipe"
                        >
                          View GitHub
                        </a>
                        {friend.website && (
                          <a
                            href={friend.website}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover-wipe"
                          >
                            View Website
                          </a>
                        )}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
