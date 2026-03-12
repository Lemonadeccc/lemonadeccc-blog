'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const sizeClass = 'h-6 w-6 sm:h-7 sm:w-7 md:h-[38px] md:w-[38px]'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className={sizeClass} />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`${sizeClass} shrink-0 appearance-none rounded-none border-2 border-text/55 bg-transparent p-0 transition-colors duration-500 ease-out hover:border-[var(--theme-accent)] focus-visible:border-[var(--theme-accent)] focus-visible:outline-none`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    />
  )
}
