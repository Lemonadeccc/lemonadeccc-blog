import { siteConfig } from '@/lib/site'
import {
  socialImageAlt,
  socialImageContentType,
  socialImageSize,
  createSocialImage,
} from '@/lib/socialImageTemplate'

export const alt = socialImageAlt
export const size = socialImageSize
export const contentType = socialImageContentType

export default function TwitterImage() {
  return createSocialImage({
    eyebrow: 'Share Preview',
    title: siteConfig.name,
    description: siteConfig.description,
  })
}
