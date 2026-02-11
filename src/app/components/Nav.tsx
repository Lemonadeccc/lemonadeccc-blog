'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()
  const isDark = pathname === '/thinking'

  return (
    <div className={`${isDark} ? 'bg-text' : ''`}>
      <div className="app-container flex  justify-between p-2.5">
        <div className="font-medium p-2.5">
          <Link href="/" className={isDark ? 'text-bg' : ''}>
            Lemonade
          </Link>
        </div>

        <div className="flex gap-2.5 max-md:gap-0">
          <div className="p-2.5 max-md:p-[5px]">
            <Link href="/portfolio" className={isDark ? 'text-bg' : ''}>
              portfolio
            </Link>
          </div>

          <div className="p-2.5 max-md:px-[5px]">
            <Link href="/thinking" className={isDark ? 'text-bg' : ''}>
              thinking
            </Link>
          </div>

          <div className="p-2.5 max-md:px-[5px]">
            <Link href="/contact" className={isDark ? 'text-bg' : ''}>
              contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
