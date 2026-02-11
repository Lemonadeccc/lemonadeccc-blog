---
name: mdx-zh-to-en-post
description: Translate MDX blog posts in this repository from Chinese to English. Use when the source file is under content/posts/zh and the target file must be written to content/posts/en with the same slug, preserving MDX structure, frontmatter keys, code blocks, links, and local asset paths.
---

# MDX ZH to EN Post

## Workflow

1. Read the source file from `content/posts/zh/<slug>.mdx` or `content/posts/zh/<slug>.md`.
2. Write the translated file to `content/posts/en/<slug>.mdx` or `content/posts/en/<slug>.md` using the same slug.
3. Translate natural-language content to English:
- Frontmatter text fields such as `title`, `type`, `project`, `summary`
- Headings, paragraphs, list items, table text, blockquotes, callouts
4. Preserve non-language structure exactly:
- Keep frontmatter keys and ordering stable
- Keep `date` and file paths unchanged
- Keep code fences and inline code unchanged
- Keep URLs and local asset paths unchanged
- Keep MDX/JSX tags and attributes valid

## Output Rules

1. Keep the target filename equal to the source slug.
2. Keep frontmatter keys present: `title`, `type`, `project`, `date`, `summary`.
3. Keep markdown heading depth and code-block count aligned with source.
4. Keep local links such as `/posts/...`, `/portfolio/...`, `/videos/...`, `/audio/...` unchanged unless the source itself is broken.

## Validation

Run:

```bash
python skills/public/mdx-zh-to-en-post/scripts/verify_translation.py \
  --source content/posts/zh/<slug>.mdx \
  --target content/posts/en/<slug>.mdx
```

Fix any reported errors before finishing.

## Style Guide

Use `references/translation-style.md` for tone and wording constraints.
