# 📋 实施计划：Blog Overhaul

## 任务类型
- [x] 全栈 (前端 + 内容 + SEO)

## 增强后的需求

**目标**：对 lemnoadeccc-blog 进行全面改造，包含以下五个模块：
1. GMUNK → Lemonade 替换（识别可改/不可改的地方）
2. 移动端适配
3. SEO/GEO + RSS feed（中英双语）
4. 首页改造（去掉视频，灰色背景 + 白色文字）
5. 代码审查 + 删除无用静态资源

---

## 模块一：GMUNK → Lemonade 替换分析

### ✅ 已经替换完成（无需操作）
- `lib/site-copy.ts` — 所有文字已是 LEMONADE/Lemonade
- `app/work/page.tsx` — "Lemonade Grid." 已改好
- `content/work/*.mdx` — 内容中已使用 LEMONADE
- `components/pages/WorkDetailPageView.tsx` — 已是 LEMONADE

### ⚠️ 可以直接改的地方
| 文件 | 问题 | 操作 |
|------|------|------|
| `lib/data.ts:294-386` | `representation` 数组包含 GMUNK 的真实代理信息（Tool, Partizan, ATRBUTE, RW Media + 真实电话/联系人） | 替换为 Lemonade 自己的联系信息，或整体删除该 section |
| `lib/work-items.ts` | 包含大量 GMUNK 历史项目（Tron Legacy, BOX, Oblivion, Billie Eilish 等），这些是 GMUNK 的作品 | 替换为 Lemonade 自己的项目，或清空保留结构 |
| `lib/data.ts:19-115` | `recentProjects` / `featuredProjects` 中有 GMUNK 项目（nasa-europa-clipper, billie-eilish 等） | 同上，替换为真实 Lemonade 项目 |

### ❌ 不能直接改的地方（需谨慎）
| 文件 | 原因 |
|------|------|
| `content/work/rivian-borealis-art-basel.mdx` credits 部分 | 包含真实合作方信息（ATRBUTE, Aaron Barr 等），这是真实项目记录，不应随意修改 |
| `content/work/future-of-space-galapagos.mdx` | 同上，真实项目内容 |
| `content/work/the-history-of-bitcoin.mdx` | 同上 |

**结论**：`representation` section 和 `work-items.ts` 中的 GMUNK 历史项目需要用户确认是否保留/替换。本计划中将 `representation` 数组清空（保留结构），`work-items.ts` 中只保留 Lemonade 自己的三个项目。

---

## 模块二：首页改造（去掉视频）

**文件**：`components/sections/HeroSection.tsx`

**当前状态**：
- 背景色 `#333333` + `<DeferredVimeo videoId="916142886" />`
- 渐变遮罩 `bg-gradient-to-t from-black/60`
- 底部左右两列文字（eyebrow + title / byline + role）

**目标状态**：
- 删除 `<DeferredVimeo>` 组件
- 保留灰色背景 `#333333`（或改为 `#1a1a1a`）
- 删除渐变遮罩（或保留轻微遮罩）
- 在合适位置（居中或左对齐）添加白色文字：

```
A collection of the best resources for learning development
from the Internet, handle-picked and created by

Lemonadeccc

Learning and sharing some articles about AI, development. If you like my project or ideas, you can subscribe to my

RSS feed
or
RSS feed (zh-CN)
```

**实施步骤**：
1. 修改 `HeroSection.tsx`：删除 DeferredVimeo，改为纯文字布局
2. RSS feed 链接指向 `/rss.xml` 和 `/zh/rss.xml`
3. 移动端：单列布局，文字居中

---

## 模块三：移动端适配

**当前问题**：
- `HeroSection.tsx:23` — `grid-cols-2` 无响应式，移动端两列挤压
- `HeroSection.tsx:29` — `text-7xl` 在移动端过大
- `app/work/page.tsx:18` — `px-4 sm:px-10 lg:px-[93px]` 已有响应式，OK
- `Navbar.tsx` — 已有移动端/桌面端分支，OK

**需要修复的文件**：
| 文件 | 问题 | 修复方案 |
|------|------|----------|
| `components/sections/HeroSection.tsx` | `grid-cols-2` → `grid-cols-1 md:grid-cols-2`；`text-7xl` → `text-4xl md:text-7xl` | 添加响应式前缀 |
| `components/sections/ProjectsGrid.tsx` | 需检查 | 检查后修复 |
| `components/work/WorkGrid.tsx` | 需检查 | 检查后修复 |

---

## 模块四：SEO/GEO + RSS

### 4.1 完善 metadata（`app/layout.tsx`）
当前只有 title + description，需要添加：
- `openGraph`
- `twitter` card
- `metadataBase`
- `alternates.canonical`
- `robots`

### 4.2 创建 sitemap（`app/sitemap.ts`）
```typescript
// 包含：/, /archive, /info, /contact, /work, /work/[slug], /zh/...
```

### 4.3 创建 robots.txt（`app/robots.ts`）
```typescript
// Allow all, sitemap 指向
```

### 4.4 创建 RSS feed

**英文 RSS**：`app/rss.xml/route.ts`
- 遍历 `content/posts/en/*.mdx` 生成 RSS 2.0 XML
- 包含 title, description, link, pubDate, guid

**中文 RSS**：`app/zh/rss.xml/route.ts`
- 遍历 `content/posts/zh/*.mdx` 生成 RSS 2.0 XML

### 4.5 GEO（AI 搜索引擎优化）
- 在 `app/layout.tsx` 添加结构化数据（JSON-LD）：`Person` schema
- 描述 Lemonadeccc 的身份、专长、内容主题

---

## 模块五：代码审查 + 静态资源清理

### 可删除的静态资源
| 文件 | 原因 |
|------|------|
| `public/portfolio/bkg.mp4` | 视频文件，首页不再使用视频 |
| `public/file.svg` | Next.js 默认资源，未使用 |
| `public/globe.svg` | Next.js 默认资源，未使用 |
| `public/next.svg` | Next.js 默认资源，未使用 |
| `public/vercel.svg` | Next.js 默认资源，未使用 |
| `public/window.svg` | Next.js 默认资源，未使用 |
| `public/portfolio/img6.jpeg` | 与 `img6.png` 重复，保留 png |

### 代码审查要点
- `components/ui/DeferredVimeo.tsx` — 首页不再使用，检查其他地方是否引用（work detail 页面仍用）
- `lib/data.ts` 中 `representation` 数组 — 清空或替换
- `app/collect/page.tsx` — git status 显示已删除，确认无残留引用
- `components/work/detail/GmunkDetailMedia.tsx` / `GmunkDetailText.tsx` — 已删除，确认无残留引用

---

## 实施步骤（有序）

1. **首页改造** — 修改 `HeroSection.tsx`，删除视频，添加文字+RSS链接
2. **移动端适配** — 修复 HeroSection 响应式，检查其他页面
3. **RSS feed** — 创建 `app/rss.xml/route.ts` + `app/zh/rss.xml/route.ts`
4. **SEO** — 完善 `app/layout.tsx` metadata，创建 `sitemap.ts` + `robots.ts`，添加 JSON-LD
5. **GMUNK 清理** — 清空 `representation` 数组，清理 `work-items.ts` 中的 GMUNK 项目
6. **静态资源清理** — 删除无用文件
7. **代码审查** — 检查残留引用，修复 lint 问题

---

## 关键文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `components/sections/HeroSection.tsx` | 修改 | 删除视频，添加文字，修复移动端 |
| `app/layout.tsx` | 修改 | 完善 SEO metadata + JSON-LD |
| `app/rss.xml/route.ts` | 新建 | 英文 RSS feed |
| `app/zh/rss.xml/route.ts` | 新建 | 中文 RSS feed |
| `app/sitemap.ts` | 新建 | 站点地图 |
| `app/robots.ts` | 新建 | robots.txt |
| `lib/data.ts:294-386` | 修改 | 清空 representation 数组 |
| `lib/work-items.ts` | 修改 | 清理 GMUNK 项目 |
| `public/portfolio/bkg.mp4` | 删除 | 无用视频 |
| `public/*.svg` (5个默认) | 删除 | Next.js 默认资源 |

---

## 风险与缓解

| 风险 | 缓解措施 |
|------|----------|
| `DeferredVimeo` 在 work detail 页面仍被使用 | 只删除 HeroSection 中的引用，不删除组件本身 |
| `representation` 数据被其他组件引用 | 清空数组而非删除导出，保持类型兼容 |
| RSS feed 中 MDX frontmatter 格式不一致 | 读取 posts 时做防御性解析 |
| 删除 `img6.jpeg` 可能有引用 | grep 确认无引用后再删除 |

---

## SESSION_ID（供 /ccg:execute 使用）
- CODEX_SESSION: N/A（本计划由 Claude 直接分析生成）
- GEMINI_SESSION: N/A
