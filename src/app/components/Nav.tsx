'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Nav = () => {
  const pathname = usePathname()
  const isDark = pathname === '/thinking'

  return (
    <div className={`${isDark} ? 'bg-text' : ''`}>
      <div className="app-container flex justify-between p-2.5 text-[48px] leading-none relative overflow-hidden border-0">
        <div className="font-medium p-2.5">
          <Link href="/" className={`${isDark ? 'text-bg' : ''} text-[48px] leading-none hover-wipe`}>
          </Link>
        </div>

        <div className="flex gap-2.5 max-md:gap-0">
          <div className="p-2.5 max-md:p-[5px]">
            <Link href="/portfolio" className={`${isDark ? 'text-bg' : ''} text-[48px] leading-none hover-wipe`}>
              PORTFOLIO
            </Link>
          </div>

          <div className="p-2.5 max-md:px-[5px]">
            <Link href="/thinking" className={`${isDark ? 'text-bg' : ''} text-[48px] leading-none hover-wipe`}>
              POSTS
            </Link>
          </div>

          <div className="p-2.5 max-md:px-[5px]">
            <Link
              href="https://x.com/Lemonadecccc"
              target="_blank"
              rel="noreferrer noopener"
              className={`${isDark ? 'text-bg' : ''} text-[48px] leading-none hover-wipe`}
            >
              CONTACT
            </Link>
          </div>
        </div>

        <motion.div
          key={pathname} // restart on route change
          className="absolute left-0 bottom-0 h-px w-full bg-white origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>
    </div>
  )
}

export default Nav
