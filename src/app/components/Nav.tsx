'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'

const NAV_LINE_DURATION = 2
const NAV_LINE_EASE = [0.33, 1, 0.68, 1] as const
const PAGE_TRANSITION_DURATION = 1

const Nav = () => {
  const pathname = usePathname()
  const isHomeActive = pathname === '/'
  const isPortfolioActive = pathname === '/portfolio' || pathname.startsWith('/portfolio/')
  const isPostsActive = pathname === '/posts' || pathname.startsWith('/posts/')
  const isContactActive = pathname === '/contact' || pathname.startsWith('/contact/')
  const navRef = useRef<HTMLDivElement | null>(null)
  const hasAnimatedRef = useRef(false)
  const lineControls = useAnimationControls()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const applyNavHeight = () => {
      document.documentElement.style.setProperty('--nav-height', `${nav.getBoundingClientRect().height}px`)
    }

    applyNavHeight()

    const resizeObserver = new ResizeObserver(applyNavHeight)
    resizeObserver.observe(nav)
    window.addEventListener('resize', applyNavHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', applyNavHeight)
    }
  }, [])

  useEffect(() => {
    const delay = hasAnimatedRef.current ? PAGE_TRANSITION_DURATION : 0
    hasAnimatedRef.current = true

    lineControls.stop()
    lineControls.set({ scaleX: 0 })
    void lineControls.start({
      scaleX: 1,
      transition: { duration: NAV_LINE_DURATION, ease: NAV_LINE_EASE, delay },
    })
  }, [pathname, lineControls])

  return (
    <div>
      <div
        ref={navRef}
        className="app-container relative overflow-hidden border-0 px-4 py-3 sm:px-6 sm:py-4 md:flex md:items-end md:justify-between md:p-2.5"
      >
        <div className="font-medium leading-none md:p-2.5">
          <Link
            href="/"
            className={`hover-wipe text-[30px] leading-none transition-opacity sm:text-[34px] md:text-[48px] ${isHomeActive ? 'opacity-100' : 'opacity-[0.55]'}`}
            aria-current={isHomeActive ? 'page' : undefined}
          >
            Lemonadeccc
          </Link>
        </div>

        <div className="mt-3 grid w-full grid-cols-3 gap-1 sm:gap-2 md:mt-0 md:flex md:w-auto md:items-center md:justify-between md:gap-2.5">
          <Link
            href="/portfolio"
            className={`hover-wipe inline-flex min-h-[32px] items-center justify-center px-1 py-1 text-center text-[13px] leading-none transition-opacity sm:text-[16px] md:min-h-0 md:p-2.5 md:text-[48px] ${isPortfolioActive ? 'opacity-100' : 'opacity-[0.55]'}`}
            aria-current={isPortfolioActive ? 'page' : undefined}
          >
            PORTFOLIO
          </Link>

          <Link
            href="/posts"
            className={`hover-wipe inline-flex min-h-[32px] items-center justify-center px-1 py-1 text-center text-[13px] leading-none transition-opacity sm:text-[16px] md:min-h-0 md:p-2.5 md:text-[48px] ${isPostsActive ? 'opacity-100' : 'opacity-[0.55]'}`}
            aria-current={isPostsActive ? 'page' : undefined}
          >
            POSTS
          </Link>

          <Link
            href="/contact"
            className={`hover-wipe inline-flex min-h-[32px] items-center justify-center px-1 py-1 text-center text-[13px] leading-none transition-opacity sm:text-[16px] md:min-h-0 md:p-2.5 md:text-[48px] ${isContactActive ? 'opacity-100' : 'opacity-[0.55]'}`}
            aria-current={isContactActive ? 'page' : undefined}
          >
            CONTACT
          </Link>
        </div>

        <motion.div
          className="absolute left-0 bottom-0 h-px w-full bg-white origin-left"
          initial={{ scaleX: 0 }}
          animate={lineControls}
        />
      </div>
    </div>
  )
}

export default Nav
