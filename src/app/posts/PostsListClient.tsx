'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { type PostLocale, resolvePostLocale, withPostLocale } from '@/lib/postLocale'
import { type ResourceProvider, getProviderPreconnectOrigins } from '@/lib/resourcePreconnect'
import { hasHttpScheme } from '@/lib/url'

type PostsPageView = 'posts' | 'resources'

export type PostListEntry = {
  slug: string
  title: string
  type: string
  project: string
  label: string
}

export type ResourceTagEntry = {
  key: string
  label: string
}

export type ResourceListEntry = {
  id: string
  type: 'video'
  provider?: ResourceProvider
  title: string
  summary: string
  author: string
  duration: string
  tags: ResourceTagEntry[]
  embedUrl?: string
  sourceUrl?: string
}

export type PostsLabels = {
  title: string
  viewPosts: string
  viewResources: string
  language: string
  english: string
  chinese: string
  filterByTag: string
  allTags: string
  resourceTypeVideo: string
  author: string
  duration: string
  emptyResources: string
}

type PostsListClientProps = {
  postsEn: PostListEntry[]
  postsZh: PostListEntry[]
  resourcesEn: ResourceListEntry[]
  resourcesZh: ResourceListEntry[]
  labelsEn: PostsLabels
  labelsZh: PostsLabels
}

export default function PostsListClient({
  postsEn,
  postsZh,
  resourcesEn,
  resourcesZh,
  labelsEn,
  labelsZh,
}: PostsListClientProps) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const postRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const lineTransition = { duration: 2, ease: [0.33, 1, 0.68, 1] as const }
  const [activeTagKey, setActiveTagKey] = useState('all')
  const [optimisticView, setOptimisticView] = useState<PostsPageView | null>(null)

  const locale: PostLocale = resolvePostLocale(searchParams.get('lang'))
  const urlView: PostsPageView = searchParams.get('view') === 'resources' ? 'resources' : 'posts'
  const posts = locale === 'zh' ? postsZh : postsEn
  const resources = locale === 'zh' ? resourcesZh : resourcesEn
  const labels = locale === 'zh' ? labelsZh : labelsEn

  const [hasVisitedResources, setHasVisitedResources] = useState(urlView === 'resources')

  const currentView: PostsPageView = optimisticView ?? urlView
  const isPostsView = currentView === 'posts'
  const isResourcesView = currentView === 'resources'
  const shouldRenderResourcesPanel = hasVisitedResources || isResourcesView
  const postsViewHref = withPostLocale('/posts', locale)
  const resourcesViewHref = withPostLocale('/posts?view=resources', locale)
  const localeSwitchBasePath = isPostsView ? '/posts' : '/posts?view=resources'
  const englishHref = withPostLocale(localeSwitchBasePath, 'en')
  const chineseHref = withPostLocale(localeSwitchBasePath, 'zh')
  const pageTitle = labels.title
  const languageLabel = labels.language
  const authorLabel = labels.author

  const tagOptions = useMemo(() => {
    const seen = new Set<string>()
    const options: ResourceTagEntry[] = []

    resources.forEach((resource) => {
      resource.tags.forEach((tag) => {
        if (seen.has(tag.key)) return
        seen.add(tag.key)
        options.push(tag)
      })
    })

    return options
  }, [resources])

  const filteredResources = useMemo(() => {
    if (activeTagKey === 'all') return resources
    return resources.filter((resource) => resource.tags.some((tag) => tag.key === activeTagKey))
  }, [activeTagKey, resources])

  useEffect(() => {
    if (!isPostsView) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const list = listRef.current
    const rows = postRefs.current.filter((row): row is HTMLAnchorElement => row !== null)

    if (!list || rows.length === 0) return

    const POSITIONS = {
      BOTTOM: 0,
      MIDDLE: -80,
      TOP: -160,
    } as const

    const rowPosition = new WeakMap<HTMLAnchorElement, number>()

    const lastMousePosition = { x: 0, y: 0 }
    let activeRow: HTMLAnchorElement | null = null
    let ticking = false

    const updateRows = () => {
      // Phase 1: Batch all DOM reads to avoid layout thrashing
      const activeRect = activeRow ? activeRow.getBoundingClientRect() : null
      const rowRects: (DOMRect | null)[] = rows.map((row) =>
        row === activeRow ? null : row.getBoundingClientRect(),
      )

      // Phase 2: Process logic and batch all writes
      if (activeRow && activeRect) {
        const isStillOver =
          lastMousePosition.x >= activeRect.left &&
          lastMousePosition.x <= activeRect.right &&
          lastMousePosition.y >= activeRect.top &&
          lastMousePosition.y <= activeRect.bottom

        if (!isStillOver) {
          const wrapper = activeRow.querySelector<HTMLElement>('.post-wrapper')
          const leavingFromTop = lastMousePosition.y < activeRect.top + activeRect.height / 2

          if (wrapper) {
            const nextPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM
            rowPosition.set(activeRow, nextPosition)
            gsap.to(wrapper, {
              y: nextPosition,
              duration: 0.4,
              ease: 'power2.out',
            })
          }

          activeRow = null
        }
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const rect = rowRects[i]
        if (row === activeRow || !rect) continue

        const isMouseOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom

        if (!isMouseOver) continue

        const wrapper = row.querySelector<HTMLElement>('.post-wrapper')
        if (wrapper) {
          rowPosition.set(row, POSITIONS.MIDDLE)
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
          })
        }

        activeRow = row
        break
      }

      ticking = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastMousePosition.x = event.clientX
      lastMousePosition.y = event.clientY
    }

    const handleScroll = () => {
      if (ticking) return
      requestAnimationFrame(updateRows)
      ticking = true
    }

    document.addEventListener('mousemove', handleMouseMove)

    const scrollRoot = document.getElementById('page-scroll-root')
    const scrollTarget: Document | HTMLElement = scrollRoot ?? document
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })

    const cleanupListeners: Array<() => void> = []

    rows.forEach((row) => {
      rowPosition.set(row, POSITIONS.TOP)

      const wrapper = row.querySelector<HTMLElement>('.post-wrapper')
      if (!wrapper) return

      const handleEnter = (event: MouseEvent) => {
        activeRow = row

        const rect = row.getBoundingClientRect()
        const enterFromTop = event.clientY < rect.top + rect.height / 2
        const currentPosition = rowPosition.get(row) ?? POSITIONS.TOP

        if (enterFromTop || currentPosition === POSITIONS.BOTTOM) {
          rowPosition.set(row, POSITIONS.MIDDLE)
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      }

      const handleLeave = (event: MouseEvent) => {
        activeRow = null

        const rect = row.getBoundingClientRect()
        const leavingFromTop = event.clientY < rect.top + rect.height / 2
        const nextPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM

        rowPosition.set(row, nextPosition)
        gsap.to(wrapper, {
          y: nextPosition,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      row.addEventListener('mouseenter', handleEnter)
      row.addEventListener('mouseleave', handleLeave)

      cleanupListeners.push(() => {
        row.removeEventListener('mouseenter', handleEnter)
        row.removeEventListener('mouseleave', handleLeave)
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      scrollTarget.removeEventListener('scroll', handleScroll)
      cleanupListeners.forEach((cleanup) => cleanup())
    }
  }, [isPostsView, posts.length])

  useEffect(() => {
    if (optimisticView === urlView) setOptimisticView(null)
    if (urlView === 'resources') setHasVisitedResources(true)
  }, [urlView, optimisticView])

  useEffect(() => {
    if (isResourcesView) setHasVisitedResources(true)
  }, [isResourcesView])

  useEffect(() => {
    setActiveTagKey('all')
  }, [isPostsView, locale])

  useEffect(() => {
    if (!isPostsView) return

    const network = navigator as Navigator & {
      connection?: {
        saveData?: boolean
        effectiveType?: string
      }
    }
    const connection = network.connection
    const effectiveType = connection?.effectiveType?.toLowerCase() ?? ''
    const isSlowNetwork = effectiveType === 'slow-2g' || effectiveType === '2g'
    const is3g = effectiveType === '3g'
    const prefersReducedData = window.matchMedia?.('(prefers-reduced-data: reduce)').matches ?? false
    const shouldSkipWarmup = Boolean(connection?.saveData) || prefersReducedData || isSlowNetwork

    if (shouldSkipWarmup) return

    router.prefetch(resourcesViewHref)

    // Keep warmup links for the document lifetime to preserve session-level hinting.
    // data-preload-key de-dupes nodes across reruns and StrictMode re-invocations.
    const ensureHeadLink = (key: string, rel: string, href: string, as?: string) => {
      const normalizedKey = encodeURIComponent(key)
      if (document.head.querySelector(`link[data-preload-key="${normalizedKey}"]`)) return

      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      link.setAttribute('data-preload-key', normalizedKey)
      if (as) link.as = as
      if (hasHttpScheme(href)) link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }

    const seenOrigins = new Set<string>()
    const seenEmbeds = new Set<string>()
    const prefetchDocumentLimit = is3g ? 1 : 3

    resources.forEach((resource) => {
      if (!resource.embedUrl) return

      let parsed: URL
      try {
        parsed = hasHttpScheme(resource.embedUrl)
          ? new URL(resource.embedUrl)
          : new URL(resource.embedUrl, window.location.origin)
      } catch {
        return
      }

      const candidateOrigins = new Set<string>([
        parsed.origin,
        ...getProviderPreconnectOrigins({
          provider: resource.provider,
          hostname: parsed.hostname,
        }),
      ])
      candidateOrigins.forEach((origin) => {
        if (!hasHttpScheme(origin)) return
        if (seenOrigins.has(origin)) return
        seenOrigins.add(origin)
        ensureHeadLink(`dns-${origin}`, 'dns-prefetch', origin)
        ensureHeadLink(`preconnect-${origin}`, 'preconnect', origin)
      })

      if (hasVisitedResources && seenEmbeds.size < prefetchDocumentLimit) {
        const embedUrl = parsed.toString()
        if (!seenEmbeds.has(embedUrl)) {
          seenEmbeds.add(embedUrl)
          ensureHeadLink(`prefetch-${embedUrl}`, 'prefetch', embedUrl, 'document')
        }
      }
    })
  }, [isPostsView, hasVisitedResources, resources, resourcesViewHref, router])

  return (
    <section className="w-full flex-1 bg-bg py-5 text-text md:py-10">
      <div className="app-container px-4 sm:px-8 md:px-10">
        <div className="mb-4 flex items-center justify-between gap-2 md:mb-6 md:gap-4">
          <h1 className="sr-only">{pageTitle}</h1>
          <div className="flex min-w-0 items-center gap-2 whitespace-nowrap sm:gap-3 md:gap-4">
            <Link
              href={postsViewHref}
              onClick={() => setOptimisticView('posts')}
              className={`hover-wipe inline-flex items-center justify-center text-[17px] font-medium uppercase tracking-[0.06em] transition-opacity sm:text-[22px] md:text-[36px] ${isPostsView ? 'opacity-100' : 'opacity-[0.55]'}`}
            >
              {labels.viewPosts}
            </Link>
            <Link
              href={resourcesViewHref}
              onClick={() => setOptimisticView('resources')}
              className={`hover-wipe inline-flex items-center justify-center text-[17px] font-medium uppercase tracking-[0.06em] transition-opacity sm:text-[22px] md:text-[36px] ${isResourcesView ? 'opacity-100' : 'opacity-[0.55]'}`}
            >
              {labels.viewResources}
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-[0.06em] text-text-secondary sm:gap-2 sm:text-[11px] md:text-[13px]">
            <span>{languageLabel}</span>
            <Link
              href={englishHref}
              className={`border px-2 py-1 transition-colors ${locale === 'en' ? 'border-text text-text' : 'border-[var(--theme-border)] text-text-secondary hover:border-text hover:text-text'}`}
            >
              {labels.english}
            </Link>
            <Link
              href={chineseHref}
              className={`border px-2 py-1 transition-colors ${locale === 'zh' ? 'border-text text-text' : 'border-[var(--theme-border)] text-text-secondary hover:border-text hover:text-text'}`}
            >
              {labels.chinese}
            </Link>
          </div>
        </div>
      </div >

      <div ref={listRef} className={`app-container w-full ${isPostsView ? '' : 'hidden'}`}>
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={withPostLocale(`/posts/${post.slug}`, locale)}
            ref={(element) => {
              postRefs.current[index] = element
            }}
            data-cursor-fast
            className="group relative block overflow-hidden select-none md:h-20"
          >
            {index === 0 && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-text origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={lineTransition}
              />
            )}

            <motion.div
              className="pointer-events-none absolute left-0 bottom-0 z-10 h-px w-full bg-text origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={lineTransition}
            />

            <div className="hidden md:block">
              <div className="post-wrapper relative h-60 will-change-transform -translate-y-40">
                <div className="flex h-20 items-center justify-between gap-3 bg-bg px-3 sm:px-4 md:gap-5 md:px-6" aria-hidden="true">
                  <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                    {post.title}
                  </h2>
                  <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                    {post.type}
                  </h2>
                </div>

                <div className="flex h-20 items-center justify-between gap-3 bg-surface-inverse px-3 text-text-inverse sm:px-4 md:gap-5 md:px-6">
                  <span className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                    {post.project}
                  </span>
                  <span className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                    {post.label}
                  </span>
                </div>

                <div className="flex h-20 items-center justify-between gap-3 bg-bg px-3 sm:px-4 md:gap-5 md:px-6" aria-hidden="true">
                  <h2 className="min-w-0 flex-1 truncate text-[16px] sm:text-[22px] md:text-[clamp(28px,4.5vw,54px)] uppercase tracking-[-0.02em] leading-[0.9]">
                    {post.title}
                  </h2>
                  <h2 className="ml-2 shrink-0 whitespace-nowrap text-right text-[12px] sm:text-[18px] md:text-[clamp(16px,3.2vw,42px)] uppercase tracking-[-0.02em] leading-[0.9]">
                    {post.type}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex min-h-[96px] items-center px-4 py-3 sm:px-8 md:hidden">
              <div className="flex min-h-12 min-w-0 flex-1 flex-col justify-center">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="min-w-0 flex-1 text-[16px] leading-tight uppercase tracking-[-0.02em]">
                    {post.title}
                  </h2>
                  <span className="shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.08em] text-text-secondary">
                    {post.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.08em] text-text-secondary">
                  <span className="min-w-0 flex-1 leading-tight">{post.project}</span>
                  <span className="shrink-0">{post.label}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {
        shouldRenderResourcesPanel && (
          <div className={`app-container px-4 sm:px-8 md:px-10 ${isResourcesView ? '' : 'hidden'}`}>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.08em] text-text-secondary md:text-[13px]">
              <span>{labels.filterByTag}</span>
              <button
                type="button"
                onClick={() => setActiveTagKey('all')}
                className={`border px-2 py-1 transition-colors ${activeTagKey === 'all' ? 'border-text text-text' : 'border-[var(--theme-border)] text-text-secondary hover:border-text hover:text-text'}`}
              >
                {labels.allTags}
              </button>
              {tagOptions.map((tag) => (
                <button
                  key={tag.key}
                  type="button"
                  onClick={() => setActiveTagKey(tag.key)}
                  className={`border px-2 py-1 transition-colors ${activeTagKey === tag.key ? 'border-text text-text' : 'border-[var(--theme-border)] text-text-secondary hover:border-text hover:text-text'}`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {filteredResources.length === 0 ? (
              <p className="border border-[var(--theme-border)] px-4 py-5 text-[14px] text-text-secondary">{labels.emptyResources}</p>
            ) : (
              <div className="grid gap-4 pb-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredResources.map((resource) => (
                  <article key={resource.id} className="mx-auto w-full max-w-[680px] overflow-hidden border border-[var(--theme-border)] bg-bg md:max-w-none">
                    <div className="aspect-video w-full bg-[var(--theme-code-bg)]">
                      {resource.embedUrl ? (
                        <iframe
                          className="h-full w-full border-0 cursor-auto"
                          src={resource.embedUrl}
                          title={resource.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[12px] uppercase tracking-[0.08em] text-text-secondary">
                          {labels.resourceTypeVideo}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2.5 p-3.5 sm:p-4 md:space-y-3 md:p-5">
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.08em] sm:text-[11px]">
                        <span className="border border-text px-2 py-1 text-text">{labels.resourceTypeVideo}</span>
                        {resource.tags.map((tag) => (
                          <span key={`${resource.id}-${tag.key}`} className="border border-[var(--theme-border)] px-2 py-1 text-text-secondary">
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {resource.sourceUrl ? (
                        <h2 className="text-[16px] leading-tight sm:truncate sm:text-[18px]">
                          <a
                            href={resource.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover-wipe transition-opacity opacity-[0.72] hover:opacity-100 focus-visible:opacity-100"
                            title={resource.title}
                          >
                            {resource.title}
                          </a>
                        </h2>
                      ) : (
                        <h2 className="text-[16px] leading-tight sm:truncate sm:text-[18px]" title={resource.title}>
                          {resource.title}
                        </h2>
                      )}

                      <div className="flex flex-col items-start gap-1.5 text-[11px] uppercase tracking-[0.08em] text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[12px]">
                        <span className="min-w-0 flex-1 truncate" title={`${authorLabel}: ${resource.author}`}>
                          {authorLabel}: {resource.author}
                        </span>
                        <span className="shrink-0">{labels.duration}: {resource.duration}</span>
                      </div>

                      {resource.summary && (
                        <p className="text-[13px] leading-[1.65] text-text-secondary sm:truncate sm:text-[14px]" title={resource.summary}>
                          {resource.summary}
                        </p>
                      )}
                    </div>
                  </article >
                ))
                }
              </div >
            )
            }
          </div >
        )}
    </section >
  )
}
