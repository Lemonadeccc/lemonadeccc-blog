import fs from 'node:fs/promises'
import path from 'node:path'
import type { PostLocale } from './postLocale'
import { type ResourceProvider, getProviderByHostname, isResourceProvider } from './resourcePreconnect'
import { hasHttpScheme } from './url'

const RESOURCES_ROOT_DIR = path.join(process.cwd(), 'content', 'resources')
const RESOURCES_INDEX_FILE_PATH = path.join(RESOURCES_ROOT_DIR, 'resources.json')

const FALLBACK_AUTHOR = {
  en: 'Unknown Author',
  zh: '未知作者',
} as const

const FALLBACK_DURATION = '--'

type LocalizedField = {
  en?: unknown
  zh?: unknown
}

type ResourceIndexEntry = {
  id: string
  file: string
}

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

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const toStringValue = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const isSafeResourceUrl = (value: string) => hasHttpScheme(value) || value.startsWith('/')

const toTagKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const normalizeEncodedPathSegment = (value: string) => {
  try {
    return encodeURIComponent(decodeURIComponent(value))
  } catch {
    return encodeURIComponent(value)
  }
}

const isYouTubeShortHost = (hostname: string) => hostname === 'youtu.be' || hostname.endsWith('.youtu.be')

const toSourceUrlFromEmbed = (embedUrl: string, provider?: ResourceProvider) => {
  let parsed: URL
  try {
    parsed = hasHttpScheme(embedUrl) ? new URL(embedUrl) : new URL(embedUrl, 'https://example.com')
  } catch {
    return undefined
  }

  const host = parsed.hostname.toLowerCase()
  const segments = parsed.pathname.split('/').filter(Boolean)
  const inferredProvider = provider ?? getProviderByHostname(host)

  if (inferredProvider === 'youtube') {
    const watchId = parsed.searchParams.get('v')
    if (watchId) return `https://www.youtube.com/watch?v=${encodeURIComponent(watchId)}`

    if (segments[0] === 'embed' && segments[1]) {
      return `https://www.youtube.com/watch?v=${normalizeEncodedPathSegment(segments[1])}`
    }

    if (segments[0] === 'shorts' && segments[1]) {
      return `https://www.youtube.com/shorts/${normalizeEncodedPathSegment(segments[1])}`
    }

    const shortId = segments[0]
    if (isYouTubeShortHost(host) && shortId) {
      return `https://youtu.be/${normalizeEncodedPathSegment(shortId)}`
    }
  }

  if (inferredProvider === 'vimeo') {
    const vimeoId = segments[0] === 'video' ? segments[1] : segments[0]
    if (vimeoId) return `https://vimeo.com/${normalizeEncodedPathSegment(vimeoId)}`
  }

  if (inferredProvider === 'bilibili') {
    const bvid = parsed.searchParams.get('bvid')
    if (bvid) return `https://www.bilibili.com/video/${encodeURIComponent(bvid)}`

    const aid = parsed.searchParams.get('aid')
    if (aid) return `https://www.bilibili.com/video/av${encodeURIComponent(aid)}`

    const videoIndex = segments.findIndex((segment) => segment === 'video')
    if (videoIndex >= 0 && segments[videoIndex + 1]) {
      return `https://www.bilibili.com/video/${normalizeEncodedPathSegment(segments[videoIndex + 1])}`
    }
  }

  return undefined
}

const isWithinResourcesRoot = (candidatePath: string) => {
  const root = path.resolve(RESOURCES_ROOT_DIR)
  const candidate = path.resolve(candidatePath)
  return candidate === root || candidate.startsWith(`${root}${path.sep}`)
}

const readJsonFile = async (filePath: string): Promise<unknown | null> => {
  try {
    const source = await fs.readFile(filePath, 'utf8')
    return JSON.parse(source) as unknown
  } catch {
    return null
  }
}

const resolveLocalizedField = (value: unknown, locale: PostLocale, fallback: string) => {
  if (!isRecord(value)) return fallback

  const localized = toStringValue(value[locale])
  if (localized) return localized

  const english = toStringValue(value.en)
  if (english) return english

  const chinese = toStringValue(value.zh)
  if (chinese) return chinese

  return fallback
}

const normalizeResourceTag = (value: unknown, locale: PostLocale, index: number): ResourceTag | null => {
  if (typeof value === 'string') {
    const label = value.trim()
    if (!label) return null
    const key = toTagKey(label) || `tag-${index + 1}`
    return { key, label }
  }

  if (!isRecord(value)) return null

  const label = resolveLocalizedField(value.label as LocalizedField, locale, '')
  if (!label) return null

  const rawKey = toStringValue(value.key)
  const key = toTagKey(rawKey) || toTagKey(label) || `tag-${index + 1}`

  return { key, label }
}

const normalizeResource = (
  value: unknown,
  locale: PostLocale,
  index: number,
  fallbackId: string,
): ResourceListItem | null => {
  if (!isRecord(value)) return null

  const title = resolveLocalizedField(value.title as LocalizedField, locale, `Resource ${index + 1}`)
  const summary = resolveLocalizedField(value.summary as LocalizedField, locale, '')
  const author = toStringValue(value.author) || FALLBACK_AUTHOR[locale]
  const duration = toStringValue(value.duration) || FALLBACK_DURATION

  const id = toStringValue(value.id) || fallbackId || `resource-${index + 1}`
  const providerCandidate = toStringValue(value.provider).toLowerCase()
  const provider = isResourceProvider(providerCandidate) ? providerCandidate : undefined
  const embedUrlCandidate = toStringValue(value.embedUrl)
  const embedUrl = embedUrlCandidate && isSafeResourceUrl(embedUrlCandidate) ? embedUrlCandidate : undefined
  const sourceUrlCandidate = toStringValue(value.sourceUrl)
  const sourceUrl =
    (sourceUrlCandidate && isSafeResourceUrl(sourceUrlCandidate) ? sourceUrlCandidate : undefined) ??
    (embedUrl ? toSourceUrlFromEmbed(embedUrl, provider) : undefined)

  const tags = Array.isArray(value.tags)
    ? value.tags
      .map((tag, tagIndex) => normalizeResourceTag(tag, locale, tagIndex))
      .filter((tag): tag is ResourceTag => tag !== null)
    : []

  return {
    id,
    type: 'video',
    provider,
    title,
    summary,
    author,
    duration,
    tags,
    embedUrl,
    sourceUrl,
  }
}

const normalizeIndexEntry = (value: unknown, index: number): ResourceIndexEntry | null => {
  if (!isRecord(value)) return null

  const id = toStringValue(value.id) || `resource-${index + 1}`
  const file = toStringValue(value.file)
  if (!file) return null

  const absoluteFilePath = path.resolve(RESOURCES_ROOT_DIR, file)
  if (!isWithinResourcesRoot(absoluteFilePath)) return null

  if (!absoluteFilePath.toLowerCase().endsWith('.json')) return null

  return { id, file }
}

const readResourceIndex = async (): Promise<ResourceIndexEntry[]> => {
  const parsed = await readJsonFile(RESOURCES_INDEX_FILE_PATH)
  if (!isRecord(parsed)) return []

  if (!Array.isArray(parsed.order)) return []

  return parsed.order
    .map((entry, index) => normalizeIndexEntry(entry, index))
    .filter((entry): entry is ResourceIndexEntry => entry !== null)
}

export const getAllResources = async (locale: PostLocale): Promise<ResourceListItem[]> => {
  const indexEntries = await readResourceIndex()
  if (indexEntries.length === 0) return []

  const resources: ResourceListItem[] = []

  for (let i = 0; i < indexEntries.length; i++) {
    const entry = indexEntries[i]
    const filePath = path.resolve(RESOURCES_ROOT_DIR, entry.file)
    const rawResource = await readJsonFile(filePath)
    const normalized = normalizeResource(rawResource, locale, i, entry.id)
    if (!normalized) continue
    resources.push(normalized)
  }

  return resources
}
