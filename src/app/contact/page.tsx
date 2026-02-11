import Image from 'next/image'

type ContactItem = {
  label: string
  value: string
  href: string
}

type FriendLink = {
  name: string
  avatar: string
  github: string
  description: string
}

const contactItems: ContactItem[] = [
  {
    label: 'GitHub',
    value: '@Lemonadeccc',
    href: 'https://github.com/Lemonadeccc',
  },
  {
    label: 'Email',
    value: 'zwjhb12@163.com',
    href: 'mailto:zwjhb12@163.com',
  },
  {
    label: 'X',
    value: '@Lemonadecccc',
    href: 'https://x.com/Lemonadecccc',
  },
]

const friendSeeds = [
  { name: 'Mango Orbit', github: 'https://github.com/mango-orbit-example' },
  { name: 'Pixel Harbor', github: 'https://github.com/pixel-harbor-dev' },
  { name: 'Nova Script', github: 'https://github.com/nova-script-lab' },
  { name: 'Echo Forge', github: 'https://github.com/echo-forge-studio' },
  { name: 'Cobalt River', github: 'https://github.com/cobalt-river-code' },
  { name: 'Amber Pulse', github: 'https://github.com/amber-pulse-works' },
  { name: 'Luna Grid', github: 'https://github.com/luna-grid-tools' },
  { name: 'Vertex Maple', github: 'https://github.com/vertex-maple' },
  { name: 'Prism Drift', github: 'https://github.com/prism-drift' },
  { name: 'Iron Nest', github: 'https://github.com/iron-nest-dev' },
  { name: 'Delta Pine', github: 'https://github.com/delta-pine-labs' },
  { name: 'Nebula Tape', github: 'https://github.com/nebula-tape' },
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
  avatar: avatarPool[index % avatarPool.length],
  description: 'Example friend link (fake)',
}))

export default function ContactPage() {
  return (
    <section className="w-full flex-1 bg-bg text-text min-h-0 lg:h-full lg:overflow-hidden">
      <div className="app-container h-full px-10 py-5 md:py-8 lg:py-6">
        <div className="flex h-full min-h-0 flex-col">
          <div className="shrink-0">
            <h1 className="text-[30px] md:text-[36px] uppercase tracking-[0.08em] font-medium mb-3">Contact</h1>
            <p className="max-w-[72ch] text-[16px] md:text-[20px] leading-[1.6] text-text-secondary">
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
              <div className="friend-links-scroll flex flex-col gap-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
                {friendLinks.map((friend) => (
                  <a
                    key={friend.github}
                    href={friend.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-4 border border-white/30 bg-transparent p-4 transition-colors duration-300 hover:bg-white/5"
                  >
                    <Image
                      src={friend.avatar}
                      alt={`${friend.name} avatar`}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full border border-white/40 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[20px] leading-none uppercase">{friend.name}</p>
                      <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-text-secondary">
                        {friend.description}
                      </p>
                      <p className="mt-3 text-[14px]">
                        <span className="hover-wipe">View GitHub</span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
