'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { THEME_STORAGE_KEY } from './themeConstants'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey={THEME_STORAGE_KEY}
    >
      {children}
    </NextThemesProvider>
  )
}
