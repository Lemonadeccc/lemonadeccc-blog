# OpenNext Starter

Language: **English** | [中文](README.zh.md)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### SEO/GEO URL

Set the public site URL so metadata, RSS, sitemap, robots, and `llms.txt` all point to the correct domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

This project is currently deployed with **Nixpacks** (see `nixpacks.toml`).

You can also try deploying the application to **Cloudflare** with OpenNext:

```bash
npm run deploy
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Project Customization Guide

This section explains how to customize portfolio, posts, resources, and contact/friend links.

### 1. Update Portfolio Items

Edit: `src/app/portfolio/PortfolioClient.tsx`

- Update the `items` array.
- Each item has:
  - `left`: left-side title text
  - `right`: right-side title text
  - `image`: image path under `public/` (for example `/portfolio/img1.jpg`)
  - `href`: external link to open on click

If you add new images, place them in `public/portfolio/` (or another folder under `public/`) and reference with `/...` paths.

### 2. Update Posts

Posts are stored in:

- English: `content/posts/en/*.mdx`
- Chinese: `content/posts/zh/*.mdx`

To add a post:

1. Create a new file with the same slug in each locale if you want bilingual pages.
2. Keep required frontmatter fields:

```md
---
title: Your Post Title
type: Article
project: Your Project Name
date: 2026-02-21
summary: A short summary
image: /posts/img1.jpg
---
```

Notes:

- `image` is optional but recommended for social metadata.
- The post URL is `/posts/<slug>`.
- Chinese locale is selected with `?lang=zh` (for example `/posts/<slug>?lang=zh`).

### 3. Update Resources (Videos)

Resources use an index + per-video JSON files:

- Index file: `content/resources/resources.json`
- Video files: `content/resources/videos/*.json`

Add one video by:

1. Create a new JSON file under `content/resources/videos/`.
2. Add an entry to `resources.json` -> `order` with `id` and `file`.

Example video JSON:

```json
{
  "id": "my-video-id",
  "type": "video",
  "title": {
    "en": "English title",
    "zh": "中文标题"
  },
  "summary": {
    "en": "English summary",
    "zh": "中文简介"
  },
  "author": "Channel Name",
  "duration": "00:08:38",
  "tags": ["AI", "Design"],
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID"
}
```

Notes:

- Keep `embedUrl` as embeddable URL (for YouTube, use `/embed/VIDEO_ID`).
- Keep `resources.json` order in the display order you want.

### 4. Convert Posts/Resources with Skills

If you manually wrote content in one language, you can use local skills to convert it.

For posts:

- Chinese -> English: `mdx-zh-to-en-post`
- English -> Chinese: `mdx-en-to-zh-post`

For resources:

- English -> Chinese video metadata: `resources-video-en-to-zh`
- Current repo does not yet include a built-in `zh -> en` resource skill.

Example prompts in Codex:

- `Please use mdx-zh-to-en-post to translate content/posts/zh/<slug>.mdx into English.`
- `Please use mdx-en-to-zh-post to translate content/posts/en/<slug>.mdx into Chinese.`
- `Please use resources-video-en-to-zh to fill zh fields for content/resources/videos/<file>.json.`

### 5. Update Contact Info and Friend Links

Edit: `src/app/contact/page.tsx`

- `contactItems`: your own contact methods (GitHub, X, etc.)
  - Fields: `label`, `value`, `href`
- `friendSeeds`: friend links data
  - Fields: `name`, `github`, `website` (optional), `description`
- `avatarPool`: avatar image pool used by friend cards

If you want fully custom avatar per friend, you can replace the current pool-mapping logic with explicit avatar paths in each friend item.

### 6. Quick Local Check

After editing content:

```bash
npm run dev
```

Then verify:

- `/portfolio` for portfolio links/images
- `/posts` and `/posts?lang=zh` for post lists
- `/posts?view=resources` for resource cards
- `/contact` for contact info and friend links

---

Language: **English** | [中文](README.zh.md)
