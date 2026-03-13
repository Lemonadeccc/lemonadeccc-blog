'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'

type PortfolioItem = {
  left: string
  right: string
  project: string
  label: string
  image: string
  href: string
}

const items: PortfolioItem[] = [
  {
    left: 'pr-agent',
    right: 'vibe coding 4h',
    project: 'AI Code Review',
    label: '03/10/2026',
    image: '/portfolio/img6.png',
    href: 'https://pr-agent.condevtools.com/',
  },
  {
    left: 'condev-ui',
    right: 'UI Components',
    project: 'UI Components',
    label: '01/06/2026',
    image: '/portfolio/img1.jpg',
    href: 'https://ui.condevtools.com/',
  },
  {
    left: 'condev-monitor',
    right: 'Monitoring System',
    project: 'Infra Monitoring',
    label: '12/30/2025',
    image: '/portfolio/img2.jpg',
    href: 'https://monitor.condevtools.com/',
  },
  {
    left: 'lemonadeccc-blog',
    right: 'Blog',
    project: 'Blog',
    label: '02/12/2026',
    image: '/portfolio/img3.jpg',
    href: 'https://github.com/Lemonadeccc/lemonadeccc-blog',
  },
  {
    left: 'GEN 3D ASSETS',
    right: 'Generate Platform',
    project: '3D Generation With AI',
    label: '08/30/2025',
    image: '/portfolio/img4.jpg',
    href: 'https://gen-3-d-assests-web.vercel.app/',
  },
  {
    left: 'ai-vault',
    right: 'NONE',
    project: 'AI Vault',
    label: '09/30/2025',
    image: '/portfolio/img5.jpg',
    href: 'https://aivault-ten.vercel.app/',
  },
]

export default function PortfolioClient() {
  const listRef = useRef<HTMLDivElement | null>(null)
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const previewRef = useRef<HTMLDivElement | null>(null)
  const lineTransition = { duration: 2, ease: [0.33, 1, 0.68, 1] as const }

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const list = listRef.current
    const previewPanel = previewRef.current
    const rows = rowRefs.current.filter((r): r is HTMLAnchorElement => r !== null)

    if (!list || !previewPanel || rows.length === 0) return

    const ROW_HEIGHT = 80
    const POSITIONS = { BOTTOM: 0, MIDDLE: -ROW_HEIGHT, TOP: -ROW_HEIGHT * 2 } as const
    const rowPosition = new WeakMap<HTMLAnchorElement, number>()
    const lastMouse = { x: 0, y: 0 }
    let activeRow: HTMLAnchorElement | null = null
    let ticking = false
    let mouseTimeout: ReturnType<typeof setTimeout> | null = null
    let previewStack = 0

    const animateWrapperTo = (row: HTMLAnchorElement, wrapper: HTMLElement, next: number) => {
      if ((rowPosition.get(row) ?? POSITIONS.TOP) === next) return
      rowPosition.set(row, next)
      gsap.killTweensOf(wrapper)
      gsap.to(wrapper, { y: next, duration: 0.4, ease: 'power2.out' })
    }

    const removePreviewImage = (img: HTMLImageElement) => {
      if (img.dataset.exiting === 'true') return
      img.dataset.exiting = 'true'
      gsap.killTweensOf(img)
      gsap.to(img, {
        scale: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => { img.remove() },
      })
    }

    const cleanupPreviewImages = () => {
      previewPanel.querySelectorAll('img').forEach((img) => {
        removePreviewImage(img as HTMLImageElement)
      })
    }

    const animatePreview = () => {
      const rect = list.getBoundingClientRect()
      const outside =
        lastMouse.x < rect.left ||
        lastMouse.x > rect.right ||
        lastMouse.y < rect.top ||
        lastMouse.y > rect.bottom
      if (outside) cleanupPreviewImages()
    }

    const showPreviewImage = (index: number) => {
      const img = document.createElement('img')
      img.src = items[index].image
      img.alt = `${items[index].left} ${items[index].right}`
      img.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;scale:0;will-change:transform;z-index:${++previewStack}`
      previewPanel.appendChild(img)
      gsap.killTweensOf(img)
      gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' })
    }

    const cleanups: Array<() => void> = []

    rows.forEach((row, index) => {
      rowPosition.set(row, POSITIONS.TOP)
      const wrapper = row.querySelector<HTMLElement>('.portfolio-wrapper')
      if (!wrapper) return

      const handleEnter = () => {
        activeRow = row
        animateWrapperTo(row, wrapper, POSITIONS.MIDDLE)

        showPreviewImage(index)

        if (mouseTimeout) clearTimeout(mouseTimeout)
        mouseTimeout = setTimeout(() => {
          const imgs = previewPanel.querySelectorAll('img')
          if (imgs.length > 1) {
            const last = imgs[imgs.length - 1]
            imgs.forEach((img) => {
              if (img !== last) {
                removePreviewImage(img as HTMLImageElement)
              }
            })
          }
        }, 2000)
      }

      const handleLeave = (e: MouseEvent) => {
        activeRow = null
        const rect = row.getBoundingClientRect()
        const leavingFromTop = e.clientY < rect.top + rect.height / 2
        const next = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM
        animateWrapperTo(row, wrapper, next)
      }

      row.addEventListener('mouseenter', handleEnter)
      row.addEventListener('mouseleave', handleLeave)
      cleanups.push(() => {
        row.removeEventListener('mouseenter', handleEnter)
        row.removeEventListener('mouseleave', handleLeave)
      })
    })

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = e.clientX
      lastMouse.y = e.clientY
      animatePreview()
    }

    const handleScroll = () => {
      if (ticking) return
      requestAnimationFrame(() => {
        const activeRect = activeRow?.getBoundingClientRect()

        if (activeRow && activeRect) {
          const stillOver =
            lastMouse.x >= activeRect.left &&
            lastMouse.x <= activeRect.right &&
            lastMouse.y >= activeRect.top &&
            lastMouse.y <= activeRect.bottom

          if (!stillOver) {
            const wrapper = activeRow.querySelector<HTMLElement>('.portfolio-wrapper')
            const leavingFromTop = lastMouse.y < activeRect.top + activeRect.height / 2
            const next = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM
            if (wrapper) animateWrapperTo(activeRow, wrapper, next)
            activeRow = null
          }
        }

        animatePreview()
        ticking = false
      })
      ticking = true
    }

    document.addEventListener('mousemove', handleMouseMove)
    const scrollRoot = document.getElementById('page-scroll-root') ?? document
    scrollRoot.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      scrollRoot.removeEventListener('scroll', handleScroll)
      cleanups.forEach((fn) => fn())
      if (mouseTimeout) clearTimeout(mouseTimeout)
      cleanupPreviewImages()
    }
  }, [])

  return (
    <section className="w-full flex-1 bg-bg py-5 text-text md:py-10">
      {/* Fixed image preview panel — desktop only */}
      <div
        ref={previewRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] pointer-events-none z-40 hidden md:block"
        aria-hidden="true"
      />

      <div className="app-container px-4 sm:px-8 md:px-10">
        <h1 className="mb-5 text-[17px] font-medium uppercase tracking-[0.06em] sm:text-[22px] md:mb-10 md:text-[36px]">
          Featured Work
        </h1>
      </div>

      <div ref={listRef} className="app-container w-full">
        {items.map((item, index) => (
          <a
            key={`${item.left}-${item.right}`}
            ref={(el) => { rowRefs.current[index] = el }}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative block overflow-hidden select-none md:h-20"
          >
            {index === 0 && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-text origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={lineTransition}
              />
            )}
            <motion.div
              className="pointer-events-none absolute left-0 bottom-0 z-10 h-px w-full bg-text origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={lineTransition}
            />

            {/* ── Desktop: 3-row wrapper (hover animation) ── */}
            <div className="portfolio-wrapper relative h-60 will-change-transform -translate-y-40 hidden md:block">
              {/* Top row (light bg) — visible by default */}
              <div
                className="flex h-20 items-center justify-between gap-3 bg-bg px-3 sm:px-4 md:gap-5 md:px-6"
                aria-hidden="true"
              >
                <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {item.left}
                </h2>
                <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {item.right}
                </h2>
              </div>

              {/* Middle row (dark/inverse) — shown on hover */}
              <div className="flex h-20 items-center justify-between gap-3 bg-surface-inverse px-3 text-text-inverse sm:px-4 md:gap-5 md:px-6">
                <span className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {item.project}
                </span>
                <span className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {item.label}
                </span>
              </div>

              {/* Bottom row (light bg) — aria-hidden duplicate */}
              <div
                className="flex h-20 items-center justify-between gap-3 bg-bg px-3 sm:px-4 md:gap-5 md:px-6"
                aria-hidden="true"
              >
                <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {item.left}
                </h2>
                <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {item.right}
                </h2>
              </div>
            </div>

            {/* ── Mobile: flat single row with inline thumbnail ── */}
            <div className="flex min-h-[104px] items-center gap-3 px-4 py-3 sm:px-8 md:hidden">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-surface-inverse">
                <Image
                  src={item.image}
                  alt={`${item.left} ${item.right}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="flex min-h-14 min-w-0 flex-1 flex-col justify-center">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 flex-1 text-[16px] uppercase tracking-[-0.02em] leading-tight">
                    {item.left}
                  </span>
                  <span className="shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.08em] text-text-secondary">
                    {item.label}
                  </span>
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.08em] text-text-secondary">
                  <span className="block leading-tight">
                    {item.project}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.08em] text-text-secondary">
                  <span className="leading-tight">
                    {item.right}
                  </span>
                  <span className="opacity-60">View Project</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
