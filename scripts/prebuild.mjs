/**
 * Prebuild script — reads all posts and resources from the filesystem,
 * compiles Markdown to HTML (with shiki syntax highlighting), and writes
 * everything to src/generated/posts-data.json so the Next.js app never
 * needs node:fs or eval() at runtime (required for Cloudflare Workers).
 *
 * Run: node scripts/prebuild.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'

const require = createRequire(import.meta.url)
const matter = require('gray-matter')

const ROOT = process.cwd()
const POSTS_DIR = path.join(ROOT, 'content', 'posts')
const RESOURCES_DIR = path.join(ROOT, 'content', 'resources')
const OUT_FILE = path.join(ROOT, 'src', 'generated', 'posts-data.json')

// ── helpers ──────────────────────────────────────────────

const isMarkdown = (name) => /\.(md|mdx)$/i.test(name)
const toSlug = (name) => name.replace(/\.(md|mdx)$/i, '')

const str = (v, fallback = '') =>
  typeof v === 'string' && v.trim() ? v.trim() : fallback

const optStr = (v) =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined

const toDate = (v, fallback = '1970-01-01') => {
  if (v instanceof Date && !Number.isNaN(v.getTime()))
    return v.toISOString().slice(0, 10)
  if (typeof v === 'string' && v.trim()) {
    const p = Date.parse(v.trim())
    if (!Number.isNaN(p)) return new Date(p).toISOString().slice(0, 10)
    return v.trim()
  }
  return fallback
}

const sortByDateDesc = (a, b) => {
  const at = Number.isNaN(Date.parse(a.date)) ? 0 : Date.parse(a.date)
  const bt = Number.isNaN(Date.parse(b.date)) ? 0 : Date.parse(b.date)
  return bt - at
}

// ── rehype plugins for link / image handling ─────────────

/** Adds target="_blank" rel="noopener noreferrer" to external links */
function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return
      const href = node.properties?.href
      if (typeof href === 'string' && /^https?:\/\/|^\/\//.test(href)) {
        node.properties.target = '_blank'
        node.properties.rel = 'noopener noreferrer'
      }
    })
  }
}

/** Adds loading="lazy" decoding="async" to images */
function rehypeLazyImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return
      node.properties.loading = 'lazy'
      node.properties.decoding = 'async'
    })
  }
}

function visit(tree, type, fn) {
  if (!tree || !tree.children) return
  for (const child of tree.children) {
    if (child.type === type) fn(child)
    if (child.children) visit(child, type, fn)
  }
}

// ── markdown → html pipeline ─────────────────────────────

async function createProcessor() {
  // Dynamic import for shiki (ESM)
  const { createHighlighterCore } = await import('shiki/core')
  const { createJavaScriptRegexEngine } = await import('shiki/engine/javascript')
  const rehypeShikiFromHighlighter = (await import('@shikijs/rehype/core')).default

  const highlighter = await createHighlighterCore({
    themes: [import('shiki/themes/github-dark.mjs')],
    langs: [
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/jsx.mjs'),
      import('shiki/langs/tsx.mjs'),
      import('shiki/langs/shellscript.mjs'),
      import('shiki/langs/go.mjs'),
      import('shiki/langs/rust.mjs'),
      import('shiki/langs/ssh-config.mjs'),
      import('shiki/langs/yaml.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/html.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/markdown.mjs'),
      import('shiki/langs/python.mjs'),
      import('shiki/langs/docker.mjs'),
      import('shiki/langs/toml.mjs'),
      import('shiki/langs/ini.mjs'),
      import('shiki/langs/nginx.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })

  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'append' })
    .use(rehypeShikiFromHighlighter, highlighter, { theme: 'github-dark' })
    .use(rehypeExternalLinks)
    .use(rehypeLazyImages)
    .use(rehypeStringify, { allowDangerousHtml: true })
}

// ── posts ────────────────────────────────────────────────

async function readPostsForLocale(locale, processor) {
  const dir = path.join(POSTS_DIR, locale)
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }

  const posts = []
  for (const entry of entries) {
    if (!entry.isFile() || !isMarkdown(entry.name)) continue
    const slug = toSlug(entry.name)
    const source = await fs.readFile(path.join(dir, entry.name), 'utf8')
    const { data, content } = matter(source)

    // Compile markdown → HTML
    const htmlContent = String(await processor.process(content))

    const title = str(data.title, slug)
    posts.push({
      slug,
      title,
      type: str(data.type, 'Article'),
      project: str(data.project, title),
      date: toDate(data.date),
      updated: data.updated != null ? toDate(data.updated) : undefined,
      summary: str(data.summary),
      image: optStr(data.image),
      content,
      htmlContent,
    })
  }

  return posts.sort(sortByDateDesc)
}

// ── resources ────────────────────────────────────────────

const hasHttp = (v) => typeof v === 'string' && /^https?:\/\//.test(v)
const isSafeUrl = (v) => hasHttp(v) || (typeof v === 'string' && v.startsWith('/'))
const toTagKey = (v) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const FALLBACK_AUTHOR = { en: 'Unknown Author', zh: '未知作者' }

const PROVIDER_MAP = {
  youtube: true, vimeo: true, bilibili: true,
}

function resolveLocalized(val, locale, fallback = '') {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) return fallback
  const localized = str(val[locale])
  if (localized) return localized
  return str(val.en) || str(val.zh) || fallback
}

function normalizeTag(val, locale, idx) {
  if (typeof val === 'string') {
    const label = val.trim()
    if (!label) return null
    return { key: toTagKey(label) || `tag-${idx + 1}`, label }
  }
  if (typeof val !== 'object' || val === null) return null
  const label = resolveLocalized(val.label, locale)
  if (!label) return null
  const rawKey = str(val.key)
  return { key: toTagKey(rawKey) || toTagKey(label) || `tag-${idx + 1}`, label }
}

function toSourceUrl(embedUrl, provider) {
  let parsed
  try {
    parsed = hasHttp(embedUrl) ? new URL(embedUrl) : new URL(embedUrl, 'https://example.com')
  } catch { return undefined }
  const host = parsed.hostname.toLowerCase()
  const segments = parsed.pathname.split('/').filter(Boolean)
  const p = provider || Object.keys(PROVIDER_MAP).find((k) => host.includes(k))

  if (p === 'youtube') {
    const v = parsed.searchParams.get('v')
    if (v) return `https://www.youtube.com/watch?v=${encodeURIComponent(v)}`
    if (segments[0] === 'embed' && segments[1]) return `https://www.youtube.com/watch?v=${segments[1]}`
    if (segments[0] === 'shorts' && segments[1]) return `https://www.youtube.com/shorts/${segments[1]}`
    if ((host === 'youtu.be' || host.endsWith('.youtu.be')) && segments[0]) return `https://youtu.be/${segments[0]}`
  }
  if (p === 'vimeo') {
    const id = segments[0] === 'video' ? segments[1] : segments[0]
    if (id) return `https://vimeo.com/${id}`
  }
  if (p === 'bilibili') {
    const bvid = parsed.searchParams.get('bvid')
    if (bvid) return `https://www.bilibili.com/video/${encodeURIComponent(bvid)}`
    const aid = parsed.searchParams.get('aid')
    if (aid) return `https://www.bilibili.com/video/av${encodeURIComponent(aid)}`
    const vi = segments.findIndex((s) => s === 'video')
    if (vi >= 0 && segments[vi + 1]) return `https://www.bilibili.com/video/${segments[vi + 1]}`
  }
  return undefined
}

function normalizeResource(raw, locale, idx, fallbackId) {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null
  const title = resolveLocalized(raw.title, locale, `Resource ${idx + 1}`)
  const summary = resolveLocalized(raw.summary, locale)
  const author = str(raw.author) || FALLBACK_AUTHOR[locale]
  const duration = str(raw.duration) || '--'
  const id = str(raw.id) || fallbackId || `resource-${idx + 1}`
  const providerCandidate = str(raw.provider).toLowerCase()
  const provider = PROVIDER_MAP[providerCandidate] ? providerCandidate : undefined
  const embedUrlCandidate = str(raw.embedUrl)
  const embedUrl = embedUrlCandidate && isSafeUrl(embedUrlCandidate) ? embedUrlCandidate : undefined
  const sourceUrlCandidate = str(raw.sourceUrl)
  const sourceUrl =
    (sourceUrlCandidate && isSafeUrl(sourceUrlCandidate) ? sourceUrlCandidate : undefined) ??
    (embedUrl ? toSourceUrl(embedUrl, provider) : undefined)
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((t, i) => normalizeTag(t, locale, i)).filter(Boolean)
    : []

  return { id, type: 'video', provider, title, summary, author, duration, tags, embedUrl, sourceUrl }
}

async function readResourcesForLocale(locale) {
  let indexRaw
  try {
    indexRaw = JSON.parse(await fs.readFile(path.join(RESOURCES_DIR, 'resources.json'), 'utf8'))
  } catch { return [] }
  if (!indexRaw?.order || !Array.isArray(indexRaw.order)) return []

  const resources = []
  for (let i = 0; i < indexRaw.order.length; i++) {
    const entry = indexRaw.order[i]
    if (!entry?.file) continue
    const filePath = path.resolve(RESOURCES_DIR, entry.file)
    if (!filePath.startsWith(path.resolve(RESOURCES_DIR))) continue
    let raw
    try {
      raw = JSON.parse(await fs.readFile(filePath, 'utf8'))
    } catch { continue }
    const item = normalizeResource(raw, locale, i, entry.id)
    if (item) resources.push(item)
  }
  return resources
}

// ── main ─────────────────────────────────────────────────

async function main() {
  console.log('  Initializing shiki highlighter...')
  const processor = await createProcessor()

  console.log('  Compiling posts...')
  const postsEn = await readPostsForLocale('en', processor)
  const postsZh = await readPostsForLocale('zh', processor)
  const resourcesEn = await readResourcesForLocale('en')
  const resourcesZh = await readResourcesForLocale('zh')

  // Collect unique slugs across all locales
  const slugSet = new Set()
  postsEn.forEach((p) => slugSet.add(p.slug))
  postsZh.forEach((p) => slugSet.add(p.slug))
  const slugs = Array.from(slugSet).sort()

  // Build slug → PostDetail maps (with raw content + compiled HTML)
  const postDetailsEn = {}
  const postDetailsZh = {}
  for (const post of postsEn) postDetailsEn[post.slug] = post
  for (const post of postsZh) postDetailsZh[post.slug] = post

  // List items (without content/htmlContent) for PostListItem usage
  const strip = (post) => {
    const { content, htmlContent, ...rest } = post
    return rest
  }

  const data = {
    postsEn: postsEn.map(strip),
    postsZh: postsZh.map(strip),
    resourcesEn,
    resourcesZh,
    slugs,
    postDetailsEn,
    postDetailsZh,
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true })
  await fs.writeFile(OUT_FILE, JSON.stringify(data))

  const sizeKB = (Buffer.byteLength(JSON.stringify(data)) / 1024).toFixed(1)
  console.log(`✓ Generated ${OUT_FILE} (${sizeKB} KB)`)
  console.log(`  ${postsEn.length} EN posts, ${postsZh.length} ZH posts, ${slugs.length} slugs`)
  console.log(`  ${resourcesEn.length} EN resources, ${resourcesZh.length} ZH resources`)
}

main().catch((err) => {
  console.error('Prebuild failed:', err)
  process.exit(1)
})
