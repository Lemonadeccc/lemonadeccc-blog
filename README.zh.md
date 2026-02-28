# OpenNext Starter

语言： [English](README.md) | **中文**

这是一个基于 [Next.js](https://nextjs.org) 的项目，使用 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) 初始化。

## 开始使用

文档请参考：https://opennext.js.org/cloudflare

## 本地开发

运行 Next.js 开发服务器：

```bash
npm run dev
# 或者使用你自己的包管理器命令
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 查看效果。

你可以通过修改 `src/app/page.tsx` 开始编辑页面，保存后会自动热更新。

### SEO/GEO URL

设置站点公网 URL，这样 metadata、RSS、sitemap、robots 和 `llms.txt` 都会指向正确域名：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Preview

在本地使用 Cloudflare runtime 预览：

```bash
npm run preview
# 或者使用你自己的包管理器命令
```

## 部署

当前项目线上使用 **Nixpacks** 部署（见 `nixpacks.toml`）。

你也可以尝试用 OpenNext 部署到 **Cloudflare**：

```bash
npm run deploy
# 或者使用你自己的包管理器命令
```

## 了解更多

你可以通过以下资源了解 Next.js：

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

也可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js)。

---

## 项目内容修改指南

下面是你最关心的几部分：如何改 portfolio、posts、resources、contact 里的联系方式和友链。

### 1. 修改 Portfolio

编辑文件：`src/app/portfolio/PortfolioClient.tsx`

- 修改 `items` 数组即可。
- 每个条目字段说明：
  - `left`：左侧标题文字
  - `right`：右侧标题文字
  - `image`：`public/` 下图片路径（例如 `/portfolio/img1.jpg`）
  - `href`：点击后跳转的链接

如果你新增图片，放到 `public/portfolio/`（或 `public` 下任意目录）并使用 `/...` 路径引用。

### 2. 修改 Posts（文章）

文章目录：

- 英文：`content/posts/en/*.mdx`
- 中文：`content/posts/zh/*.mdx`

新增文章建议：

1. 如果做双语，`en` 和 `zh` 使用同一个 slug 文件名。
2. 保留 frontmatter 关键字段：

```md
---
title: 文章标题
type: Article
project: 项目名
date: 2026-02-21
summary: 简短摘要
image: /posts/img1.jpg
---
```

说明：

- `image` 可选，但建议保留，便于 SEO/社交分享图。
- 文章访问路径是 `/posts/<slug>`。
- 中文通过 `?lang=zh` 切换（例如 `/posts/<slug>?lang=zh`）。

### 3. 修改 Resources（视频资源）

资源使用“索引 + 单视频 JSON”结构：

- 索引文件：`content/resources/resources.json`
- 视频文件：`content/resources/videos/*.json`

新增一个视频的步骤：

1. 在 `content/resources/videos/` 新建一个 JSON 文件。
2. 在 `resources.json` 的 `order` 里新增一条 `{ id, file }`。

视频 JSON 示例：

```json
{
  "id": "my-video-id",
  "type": "video",
  "provider": "youtube",
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

说明：

- `embedUrl` 需要可嵌入地址（YouTube 建议用 `/embed/VIDEO_ID`）。
- `resources.json` 中 `order` 的顺序就是页面展示顺序。
- `provider` 是可选字段，但建议填写。

当前支持的 `provider`：

- `youtube`
- `vimeo`
- `bilibili`

`provider` 的作用逻辑：

1. Resources 视图会做路由预取和网络预连接（preconnect）预热。
2. 如果填写了 `provider`，会优先使用该平台的预连接域名映射。
3. 如果未填写或值不合法，会回退为根据 `embedUrl` 域名自动识别。

平台映射配置文件：

- `src/lib/resourcePreconnect.ts`

后续如果接入新平台，只需在该文件增加 provider 规则，并在资源 JSON 中填写对应 `provider` 值。

### 4. 通过 Skill 做中英文转换

如果你手动写了某个语言版本，可以通过本地 skill 让大模型转换。

Post 转换：

- 中文 -> 英文：`mdx-zh-to-en-post`
- 英文 -> 中文：`mdx-en-to-zh-post`

Resource 转换：

- 英文 -> 中文（视频元信息）：`resources-video-en-to-zh`
- 当前仓库暂未内置 `zh -> en` 的 resource skill。

在 Codex 中可用示例：

- `请使用 mdx-zh-to-en-post 把 content/posts/zh/<slug>.mdx 翻译成英文。`
- `请使用 mdx-en-to-zh-post 把 content/posts/en/<slug>.mdx 翻译成中文。`
- `请使用 resources-video-en-to-zh 为 content/resources/videos/<file>.json 填充 zh 字段。`

### 5. 修改 Contact 联系方式与友链

编辑文件：`src/app/contact/page.tsx`

- `contactItems`：你自己的联系方式（GitHub、X 等）
  - 字段：`label`、`value`、`href`
- `friendSeeds`：友链数据
  - 字段：`name`、`github`、`website`（可选）、`description`
- `avatarPool`：友链头像图池

如果你想每个友链使用固定头像，可以把当前“图池轮询”改成每个 friend 直接配置 `avatar`。

### 6. 本地检查

内容修改后运行：

```bash
npm run dev
```

重点检查：

- `/portfolio`：作品标题、链接、图片
- `/posts` 与 `/posts?lang=zh`：文章列表与双语切换
- `/posts?view=resources`：资源卡片与标签筛选
- `/contact`：联系方式与友链展示

---

语言： [English](README.md) | **中文**
