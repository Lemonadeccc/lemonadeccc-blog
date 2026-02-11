import { createTranslator } from 'next-intl'
import type { PostLocale } from './postLocale'

const postMessages = {
  en: {
    posts: {
      title: 'Posts',
      language: 'Language',
      english: 'EN',
      chinese: '中文',
    },
    postDetail: {
      postNotFound: 'Post Not Found',
      backToPosts: 'Back To Posts',
      backToTop: 'Back To Top',
    },
  },
  zh: {
    posts: {
      title: '文章',
      language: '语言',
      english: 'EN',
      chinese: '中文',
    },
    postDetail: {
      postNotFound: '文章未找到',
      backToPosts: '返回文章列表',
      backToTop: '返回顶部',
    },
  },
} as const

export const getPostMessages = (locale: PostLocale) => postMessages[locale]

export const getPostTranslator = (locale: PostLocale) => {
  return createTranslator({
    locale,
    messages: getPostMessages(locale),
  })
}
