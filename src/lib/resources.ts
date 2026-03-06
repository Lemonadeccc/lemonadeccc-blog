import type { PostLocale } from './postLocale'
import type { ResourceProvider } from './resourcePreconnect'
import postsData from '@/generated/posts-data.json'

type ResourceTag = {
  key: string
  label: string
}

export type ResourceListItem = {
  id: string
  type: 'video'
  provider?: ResourceProvider
  title: string
  summary: string
  author: string
  duration: string
  tags: ResourceTag[]
  embedUrl?: string
  sourceUrl?: string
}

type ResourcesDataJson = {
  resourcesEn: ResourceListItem[]
  resourcesZh: ResourceListItem[]
}

const data = postsData as unknown as ResourcesDataJson

export const getAllResources = async (locale: PostLocale): Promise<ResourceListItem[]> => {
  return locale === 'zh' ? data.resourcesZh : data.resourcesEn
}
