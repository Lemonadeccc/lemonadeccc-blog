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

export default function PortfolioPage() {
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
    <section className="w-full flex-1 py-5 md:py-10">
      <div className="app-container  px-10">
        <h1 className="text-[30px] md:text-[36px] uppercase tracking-[0.08em] font-medium mb-8 md:mb-10">
          Featured Work
        </h1>
      </div>

      <div className="app-container w-full">
        {items.map((item, index) => (
          <a
            key={`${item.left}-${item.right}`}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="project-link group relative flex items-center justify-center gap-2.5 pt-3 pb-4 md:pt-2 md:pb-3 text-[36px] md:text-[80px] leading-[1.12] md:leading-[1.1] transition-[gap] duration-300 ease-in-out hover:gap-5"
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
            <span className="portfolio-wipe portfolio-wipe-left flex-[2.5] text-right pb-[0.04em]">
              {displayWords[index][0]}
            </span>
            <div className="relative h-[68px] w-[105px] md:h-[80px] md:w-[125px] min-w-0 overflow-hidden bg-white [flex:0] transition-[flex] duration-1000 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:[flex:0.5]">
              <Image
                src={item.image}
                alt={`${item.left} ${item.right}`}
                fill
                sizes="(max-width: 768px) 30vw, 20vw"
                className="object-cover"
              />
            </div>
            <span className="portfolio-wipe portfolio-wipe-right flex-[2.5] pb-[0.04em]">
              {displayWords[index][1]}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
