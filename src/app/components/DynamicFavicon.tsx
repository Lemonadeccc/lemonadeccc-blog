'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { getFaviconHref, syncFaviconLinks } from '@/lib/favicon'

export default function DynamicFavicon() {
  const { theme } = useTheme()

  useEffect(() => {
    syncFaviconLinks(document, getFaviconHref(theme))
  }, [theme])

  return null
}
