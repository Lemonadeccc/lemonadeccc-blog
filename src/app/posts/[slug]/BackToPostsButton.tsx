'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
}

const baseClassName =
  'back-to-posts-btn inline-flex items-center justify-center px-4 py-2 text-[16px] uppercase tracking-[0.08em] text-white'

export default function BackToPostsButton() {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [showFloating, setShowFloating] = useState(false)
  const buttonClassName = `${baseClassName} back-action group min-w-[180px]`

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
      <div ref={anchorRef} className="mb-8 h-px w-full" aria-hidden />

      <AnimatePresence>
        {showFloating && (
          <motion.div
            className="pointer-events-none fixed right-[max(1rem,calc((100vw-1100px)/4))] bottom-6 z-40 flex flex-col gap-3 md:bottom-auto md:top-[calc(var(--nav-height,0px)+((100vh-var(--nav-height,0px))/2))] md:-translate-y-1/2"
            initial={{ opacity: 0, x: -42 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 26 }}
            transition={transition}
          >
            <Link href="/posts" className={`${buttonClassName} pointer-events-auto`} data-cursor-fast>
              <span className="hover-wipe">Back To Posts</span>
            </Link>
            <button
              type="button"
              onClick={handleBackToTop}
              className={`${buttonClassName} pointer-events-auto`}
              data-cursor-fast
            >
              <span className="hover-wipe">Back To Top</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
