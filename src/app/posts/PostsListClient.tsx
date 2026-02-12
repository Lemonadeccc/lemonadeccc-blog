'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { type PostLocale, withPostLocale } from '@/lib/postLocale'

export type PostListEntry = {
  slug: string
  title: string
  type: string
  project: string
  label: string
}

type PostsListClientProps = {
  locale: PostLocale
  title: string
  languageLabel: string
  englishLabel: string
  chineseLabel: string
  posts: PostListEntry[]
}

export default function PostsListClient({
  locale,
  title,
  languageLabel,
  englishLabel,
  chineseLabel,
  posts,
}: PostsListClientProps) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const postRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const lineTransition = { duration: 2, ease: [0.33, 1, 0.68, 1] as const }

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const list = listRef.current
    const rows = postRefs.current.filter((row): row is HTMLAnchorElement => row !== null)

    if (!list || rows.length === 0) return

    const POSITIONS = {
      BOTTOM: 0,
      MIDDLE: -80,
      TOP: -160,
    } as const

    const rowPosition = new WeakMap<HTMLAnchorElement, number>()

    const lastMousePosition = { x: 0, y: 0 }
    let activeRow: HTMLAnchorElement | null = null
    let ticking = false

    const updateRows = () => {
      if (activeRow) {
        const rect = activeRow.getBoundingClientRect()
        const isStillOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom

        if (!isStillOver) {
          const wrapper = activeRow.querySelector<HTMLElement>('.post-wrapper')
          const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2

          if (wrapper) {
            const nextPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM
            rowPosition.set(activeRow, nextPosition)
            gsap.to(wrapper, {
              y: nextPosition,
              duration: 0.4,
              ease: 'power2.out',
            })
          }

          activeRow = null
        }
      }

      rows.forEach((row) => {
        if (row === activeRow) return

        const rect = row.getBoundingClientRect()
        const isMouseOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom

        if (!isMouseOver) return

        const wrapper = row.querySelector<HTMLElement>('.post-wrapper')
        if (wrapper) {
          rowPosition.set(row, POSITIONS.MIDDLE)
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
          })
        }

        activeRow = row
      })

      ticking = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastMousePosition.x = event.clientX
      lastMousePosition.y = event.clientY
    }

    const handleScroll = () => {
      if (ticking) return
      requestAnimationFrame(updateRows)
      ticking = true
    }

    document.addEventListener('mousemove', handleMouseMove)

    const scrollRoot = document.getElementById('page-scroll-root')
    const scrollTarget: Document | HTMLElement = scrollRoot ?? document
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })

    const cleanupListeners: Array<() => void> = []

    rows.forEach((row) => {
      rowPosition.set(row, POSITIONS.TOP)

      const wrapper = row.querySelector<HTMLElement>('.post-wrapper')
      if (!wrapper) return

      const handleEnter = (event: MouseEvent) => {
        activeRow = row

        const rect = row.getBoundingClientRect()
        const enterFromTop = event.clientY < rect.top + rect.height / 2
        const currentPosition = rowPosition.get(row) ?? POSITIONS.TOP

        if (enterFromTop || currentPosition === POSITIONS.BOTTOM) {
          rowPosition.set(row, POSITIONS.MIDDLE)
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      }

      const handleLeave = (event: MouseEvent) => {
        activeRow = null

        const rect = row.getBoundingClientRect()
        const leavingFromTop = event.clientY < rect.top + rect.height / 2
        const nextPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM

        rowPosition.set(row, nextPosition)
        gsap.to(wrapper, {
          y: nextPosition,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      row.addEventListener('mouseenter', handleEnter)
      row.addEventListener('mouseleave', handleLeave)

      cleanupListeners.push(() => {
        row.removeEventListener('mouseenter', handleEnter)
        row.removeEventListener('mouseleave', handleLeave)
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      scrollTarget.removeEventListener('scroll', handleScroll)
      cleanupListeners.forEach((cleanup) => cleanup())
    }
  }, [posts.length])

  return (
    <section className="w-full flex-1 bg-bg py-5 text-text md:py-10">
      <div className="app-container px-4 sm:px-8 md:px-10">
        <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between md:gap-4">
          <h1 className="text-[30px] md:text-[36px] uppercase tracking-[0.08em] font-medium">{title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.08em] text-text-secondary md:text-[13px]">
            <span>{languageLabel}</span>
            <Link
              href={withPostLocale('/posts', 'en')}
              className={`border px-2 py-1 transition-colors ${locale === 'en' ? 'border-white text-white' : 'border-white/35 text-text-secondary hover:border-white hover:text-white'
                }`}
            >
              {englishLabel}
            </Link>
            <Link
              href={withPostLocale('/posts', 'zh')}
              className={`border px-2 py-1 transition-colors ${locale === 'zh' ? 'border-white text-white' : 'border-white/35 text-text-secondary hover:border-white hover:text-white'
                }`}
            >
              {chineseLabel}
            </Link>
          </div>
        </div>
      </div>

      <div ref={listRef} className="app-container w-full">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={withPostLocale(`/posts/${post.slug}`, locale)}
            ref={(element) => {
              postRefs.current[index] = element
            }}
            data-cursor-fast
            className="group relative block h-20 overflow-hidden select-none"
          >
            {index === 0 && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={lineTransition}
              />
            )}

            <motion.div
              className="pointer-events-none absolute left-0 bottom-0 z-10 h-px w-full bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={lineTransition}
            />

            <div className="post-wrapper relative h-[240px] will-change-transform -translate-y-[160px]">
              <div className="flex h-20 items-center justify-between gap-3 bg-bg px-3 sm:px-4 md:gap-5 md:px-6">
                <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.title}
                </h2>
                <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.type}
                </h2>
              </div>

              <div className="flex h-20 items-center justify-between gap-3 bg-white px-3 text-black sm:px-4 md:gap-5 md:px-6">
                <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.project}
                </h2>
                <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.label}
                </h2>
              </div>

              <div className="flex h-20 items-center justify-between gap-3 bg-bg px-3 sm:px-4 md:gap-5 md:px-6">
                <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.title}
                </h2>
                <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.type}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
