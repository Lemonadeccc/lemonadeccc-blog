'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

type BackToPostsButtonProps = {
  postsHref: string
  backToPostsLabel: string
  backToTopLabel: string
}

const transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
}

const baseClassName =
  'back-to-posts-btn inline-flex items-center justify-center px-3 py-2 text-[14px] uppercase tracking-[0.08em] text-white md:px-4 md:text-[16px]'

export default function BackToPostsButton({
  postsHref,
  backToPostsLabel,
  backToTopLabel,
}: BackToPostsButtonProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [showFloating, setShowFloating] = useState(false)
  const buttonClassName = `${baseClassName} back-action group min-w-0 flex-1 md:min-w-[180px] md:flex-none`

  const handleBackToTop = useCallback(() => {
    const scrollRoot = document.getElementById('page-scroll-root')
    if (scrollRoot) {
      scrollRoot.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor) return

    const scrollRoot = document.getElementById('page-scroll-root')
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting)
      },
      {
        root: scrollRoot,
        threshold: 0,
        rootMargin: '-10px 0px 0px 0px',
      }
    )

    observer.observe(anchor)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={anchorRef} className="h-px w-full" aria-hidden />

      <AnimatePresence>
        {showFloating && (
          <motion.div
            className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex gap-2 md:inset-x-auto md:right-[max(1rem,calc((100vw-1100px)/4))] md:bottom-auto md:top-[calc(var(--nav-height,0px)+((100vh-var(--nav-height,0px))/2))] md:-translate-y-1/2 md:flex-col md:gap-3"
            initial={{ opacity: 0, x: -42 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 26 }}
            transition={transition}
          >
            <Link href={postsHref} className={`${buttonClassName} pointer-events-auto`} data-cursor-fast>
              <span className="hover-wipe">{backToPostsLabel}</span>
            </Link>
            <button
              type="button"
              onClick={handleBackToTop}
              className={`${buttonClassName} pointer-events-auto`}
              data-cursor-fast
            >
              <span className="hover-wipe">{backToTopLabel}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
