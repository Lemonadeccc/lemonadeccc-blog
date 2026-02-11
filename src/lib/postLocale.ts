export const POST_LOCALES = ['en', 'zh'] as const

export type PostLocale = (typeof POST_LOCALES)[number]

export const DEFAULT_POST_LOCALE: PostLocale = 'en'

export const resolvePostLocale = (value: string | null | undefined): PostLocale => {
  return value === 'zh' ? 'zh' : DEFAULT_POST_LOCALE
}

export const getPostDateLocale = (locale: PostLocale) => {
  return locale === 'zh' ? 'zh-CN' : 'en-US'
}

export const withPostLocale = (pathname: string, locale: PostLocale) => {
  if (locale === DEFAULT_POST_LOCALE) return pathname

  const hasQuery = pathname.includes('?')
  return `${pathname}${hasQuery ? '&' : '?'}lang=${locale}`
}
