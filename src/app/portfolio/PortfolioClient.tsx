'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

type PortfolioItem = {
  left: string
  right: string
  image: string
  href: string
}

const items: PortfolioItem[] = [
  {
    left: 'condev',
    right: 'ui',
    image: '/portfolio/img1.jpg',
    href: 'https://ui.condevtools.com/',
  },
  {
    left: 'condev',
    right: 'monitor',
    image: '/portfolio/img2.jpg',
    href: 'https://monitor.condevtools.com/',
  },
  {
    left: 'lemonadeccc',
    right: 'blog',
    image: '/portfolio/img3.jpg',
    href: 'https://github.com/Lemonadeccc/lemonadeccc-blog',
  },
  {
    left: 'GEN 3D',
    right: 'ASSETS',
    image: '/portfolio/img4.jpg',
    href: 'https://gen-3-d-assests-web.vercel.app/',
  },
  {
    left: 'ai',
    right: 'vault',
    image: '/portfolio/img5.jpg',
    href: 'https://aivault-ten.vercel.app/',
  },
]

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const randomWord = (length: number) => {
  let output = ''
  for (let i = 0; i < length; i++) {
    output += characters[Math.floor(Math.random() * characters.length)]
  }
  return output
}

export default function PortfolioClient() {
  const [displayWords, setDisplayWords] = useState<[string, string][]>(
    items.map((item) => [item.left, item.right]),
  )
  const animating = useRef<Set<number>>(new Set())
  const lineTransition = { duration: 2, ease: [0.33, 1, 0.68, 1] as const }

  const handleMouseEnter = (index: number) => {
    if (animating.current.has(index)) return

    animating.current.add(index)
    const original = items[index]
    let shuffles = 0
    const maxShuffles = 10
    const intervalDuration = 50

    const timer = window.setInterval(() => {
      if (shuffles >= maxShuffles) {
        window.clearInterval(timer)
        setDisplayWords((prev) =>
          prev.map((pair, i) => (i === index ? [original.left, original.right] : pair)),
        )
        animating.current.delete(index)
        return
      }

      setDisplayWords((prev) =>
        prev.map((pair, i) =>
          i === index
            ? [randomWord(original.left.length), randomWord(original.right.length)]
            : pair,
        ),
      )
      shuffles += 1
    }, intervalDuration)
  }

  return (
    <section className="w-full flex-1 min-h-0 bg-bg text-text lg:h-full lg:overflow-hidden">
      <div className="app-container h-full py-5 md:py-8 lg:py-6">
        <div className="flex h-full min-h-0 flex-col">
          <div className="shrink-0 px-4 sm:px-8 md:px-10">
            <h1 className="text-[30px] md:text-[36px] uppercase tracking-[0.08em] font-medium mb-8 md:mb-10 lg:mb-6">
              Featured Work
            </h1>
          </div>

          <div className="portfolio-scroll w-full lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
            {items.map((item, index) => (
              <a
                key={`${item.left}-${item.right}`}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="project-link group relative flex items-center justify-center gap-1.5 px-2 pt-3 pb-4 text-[24px] leading-[1.1] transition-[gap] duration-300 ease-in-out sm:gap-2.5 sm:text-[30px] md:px-0 md:pt-2 md:pb-3 md:text-[80px] md:leading-[1.1] md:hover:gap-5"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {index === 0 && (
                  <motion.div
                    className="absolute left-0 top-0 h-px w-full bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={lineTransition}
                  />
                )}
                <motion.div
                  className="absolute left-0 bottom-0 h-px w-full bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={lineTransition}
                />
                <span className="portfolio-wipe portfolio-wipe-left min-w-0 flex-[2.5] truncate text-right pb-[0.04em] md:overflow-visible md:text-clip">
                  {displayWords[index][0]}
                </span>
                <div className="relative h-[44px] w-[70px] sm:h-[56px] sm:w-[90px] md:h-[80px] md:w-[125px] min-w-0 overflow-hidden bg-white [flex:0] transition-[flex] duration-1000 ease-[cubic-bezier(0.165,0.84,0.44,1)] md:group-hover:[flex:0.5]">
                  <Image
                    src={item.image}
                    alt={`${item.left} ${item.right}`}
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <span className="portfolio-wipe portfolio-wipe-right min-w-0 flex-[2.5] truncate pb-[0.04em] md:overflow-visible md:text-clip">
                  {displayWords[index][1]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
