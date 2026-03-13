import { siteConfig, withSiteUrl } from './site'

export const DEFAULT_SOCIAL_IMAGE_PATH = '/opengraph-image'
export const DEFAULT_TWITTER_IMAGE_PATH = '/twitter-image'

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const

export const SOCIAL_IMAGE_CONTENT_TYPE = 'image/png'
export const DEFAULT_SOCIAL_IMAGE_ALT = `${siteConfig.name} social preview`

export const getDefaultSocialImageUrl = () => withSiteUrl(DEFAULT_SOCIAL_IMAGE_PATH)
export const getDefaultTwitterImageUrl = () => withSiteUrl(DEFAULT_TWITTER_IMAGE_PATH)
