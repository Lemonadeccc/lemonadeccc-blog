'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const sizeClass = 'h-9 w-9 md:h-[38px] md:w-[38px]'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className={sizeClass} />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`${sizeClass} inline-flex shrink-0 items-center justify-center appearance-none rounded-none border-2 border-text/55 bg-transparent p-0 transition-colors duration-500 ease-out hover:border-[var(--theme-accent)] focus-visible:border-[var(--theme-accent)] focus-visible:outline-none`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <span
        className={`h-3.5 w-3.5 border border-text/55 transition-colors duration-500 ease-out ${isDark ? 'bg-text' : 'bg-transparent'}`}
        aria-hidden="true"
      />
    </button>
  )
}
