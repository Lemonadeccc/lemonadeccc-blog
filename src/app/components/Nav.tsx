'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useAnimationControls } from 'motion/react'
import { useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'

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
        className="app-container relative flex items-center gap-2 overflow-hidden border-0 px-4 py-3 sm:px-6 sm:py-4 md:items-end md:justify-between md:p-2.5"
      >
        <div className="shrink-0 leading-none md:p-2.5">
          <Link
            href="/"
            className={`nav-logo-link inline-flex transition-opacity ${isHomeActive ? 'opacity-100' : 'opacity-[0.55]'}`}
            aria-current={isHomeActive ? 'page' : undefined}
            aria-label="Lemonadeccc home"
          >
            <span className="sr-only">Lemonadeccc</span>
            <span
              className="nav-logo-mark h-[34px] w-[34px] sm:h-[38px] sm:w-[38px] md:h-[48px] md:w-[48px]"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 md:w-auto md:flex-none md:justify-end md:gap-2.5">
          <div className="grid min-w-0 flex-1 auto-rows-fr grid-cols-3 items-center gap-1 sm:gap-2 md:flex md:w-auto md:flex-none md:items-center md:justify-between md:gap-2.5">
            <Link
              href="/portfolio"
              className={`inline-flex h-10 items-center justify-center self-stretch px-1 text-center text-[17px] leading-none tracking-[0.01em] transition-opacity md:h-auto md:self-auto md:p-2.5 md:text-[48px] md:tracking-normal ${isPortfolioActive ? 'opacity-100' : 'opacity-[0.55]'}`}
              aria-current={isPortfolioActive ? 'page' : undefined}
            >
              <span className="hover-wipe inline-block">PORTFOLIO</span>
            </Link>

            <Link
              href="/posts"
              className={`inline-flex h-10 items-center justify-center self-stretch px-1 text-center text-[17px] leading-none tracking-[0.01em] transition-opacity md:h-auto md:self-auto md:p-2.5 md:text-[48px] md:tracking-normal ${isPostsActive ? 'opacity-100' : 'opacity-[0.55]'}`}
              aria-current={isPostsActive ? 'page' : undefined}
            >
              <span className="hover-wipe inline-block">POSTS</span>
            </Link>

            <Link
              href="/contact"
              className={`inline-flex h-10 items-center justify-center self-stretch px-1 text-center text-[17px] leading-none tracking-[0.01em] transition-opacity md:h-auto md:self-auto md:p-2.5 md:text-[48px] md:tracking-normal ${isContactActive ? 'opacity-100' : 'opacity-[0.55]'}`}
              aria-current={isContactActive ? 'page' : undefined}
            >
              <span className="hover-wipe inline-block">CONTACT</span>
            </Link>
          </div>

          <div className="inline-flex shrink-0 items-center justify-center md:hidden">
            <ThemeToggle />
          </div>

          <div className="hidden items-center justify-center md:inline-flex md:p-2.5">
            <ThemeToggle />
          </div>
        </div>

        <motion.div
          className="absolute left-0 bottom-0 h-px w-full bg-text origin-left"
          initial={{ scaleX: 0 }}
          animate={lineControls}
        />
      </div>
    </div>
  )
}

export default Nav
