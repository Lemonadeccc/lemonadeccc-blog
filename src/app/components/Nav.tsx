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
      <div ref={navRef} className="app-container flex justify-between p-2.5 text-[48px] leading-none relative overflow-hidden border-0">
        <div className="font-medium p-2.5">
          <Link href="/" className="text-[48px] leading-none hover-wipe">
            Lemonadeccc
          </Link>
        </div>

        <div className="flex gap-2.5 max-md:gap-0">
          <div className="p-2.5 max-md:p-[5px]">
            <Link href="/portfolio" className="text-[48px] leading-none hover-wipe">
              PORTFOLIO
            </Link>
          </div>

          <div className="p-2.5 max-md:px-[5px]">
            <Link href="/posts" className="text-[48px] leading-none hover-wipe">
              POSTS
            </Link>
          </div>

          <div className="p-2.5 max-md:px-[5px]">
            <Link href="/contact" className="text-[48px] leading-none hover-wipe">
              CONTACT
            </Link>
          </div>
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
