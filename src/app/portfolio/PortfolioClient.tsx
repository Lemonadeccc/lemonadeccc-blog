'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'motion/react'

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
    left: 'pr',
    right: 'agent',
    image: '/portfolio/img6.png',
    href: 'https://pr-agent.condevtools.com/',
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
  const animating = useRef<Set<number>>(new Set())
  const textRefs = useRef<Map<number, { left: HTMLSpanElement | null; right: HTMLSpanElement | null }>>(new Map())
  const lineTransition = { duration: 2, ease: [0.33, 1, 0.68, 1] as const }

  const handleMouseEnter = (index: number) => {
    if (animating.current.has(index)) return
    animating.current.add(index)

    const original = items[index]
    const entry = textRefs.current.get(index)
    const leftEl = entry?.left
    const rightEl = entry?.right
    if (!leftEl || !rightEl) { animating.current.delete(index); return }

    // Lock widths and clip overflow to prevent layout shift during scramble
    leftEl.style.width = `${leftEl.offsetWidth}px`
    leftEl.style.overflow = 'hidden'
    rightEl.style.width = `${rightEl.offsetWidth}px`
    rightEl.style.overflow = 'hidden'

    let shuffles = 0
    const maxShuffles = 10

    const step = () => {
      if (shuffles >= maxShuffles) {
        leftEl.textContent = original.left
        rightEl.textContent = original.right
        leftEl.style.width = ''
        leftEl.style.overflow = ''
        rightEl.style.width = ''
        rightEl.style.overflow = ''
        animating.current.delete(index)
        return
      }

      leftEl.textContent = randomWord(original.left.length)
      rightEl.textContent = randomWord(original.right.length)
      shuffles++
      setTimeout(step, 50)
    }

    step()
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
                className="project-link group relative flex items-center justify-center gap-1.5 px-2 pt-3 pb-4 text-[24px] leading-[1.1] sm:gap-2.5 sm:text-[30px] md:px-0 md:pt-2 md:pb-3 md:text-[80px] md:leading-[1.1] md:hover:gap-5"
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => handleMouseEnter(index)}
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
                <span
                  ref={(el) => {
                    const entry = textRefs.current.get(index) ?? { left: null, right: null }
                    entry.left = el
                    textRefs.current.set(index, entry)
                  }}
                  className="portfolio-wipe portfolio-wipe-left min-w-0 flex-[2.5] truncate text-right pb-[0.04em] md:overflow-visible md:text-clip"
                >
                  {item.left}
                </span>
                <div className="relative h-11 w-[70px] sm:h-14 sm:w-[90px] md:h-20 md:w-[125px] min-w-0 overflow-hidden bg-white flex-0 transition-[flex] duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-active:flex-[0.5] md:group-hover:flex-[0.5]">
                  <Image
                    src={item.image}
                    alt={`${item.left} ${item.right}`}
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <span
                  ref={(el) => {
                    const entry = textRefs.current.get(index) ?? { left: null, right: null }
                    entry.right = el
                    textRefs.current.set(index, entry)
                  }}
                  className="portfolio-wipe portfolio-wipe-right min-w-0 flex-[2.5] truncate pb-[0.04em] md:overflow-visible md:text-clip"
                >
                  {item.right}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
