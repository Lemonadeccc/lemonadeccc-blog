---
name: resources-video-en-to-zh
description: Use when video entries under content/resources/videos need English metadata translated to Chinese while preserving JSON schema and links, based on files listed in content/resources/resources.json.
---

# Resources Video EN to ZH

## Workflow

1. Read `content/resources/resources.json` and iterate `order` in file order.
2. Open each referenced `content/resources/<order[].file>` JSON.
3. Translate language fields from English to Chinese:
- `title.en` -> `title.zh`
- `summary.en` -> `summary.zh`
- If a tag uses object format with `label.en`, add/update `label.zh`
4. Preserve non-language fields and identifiers:
- Keep `id`, `type`, `author`, `duration`, `embedUrl` unchanged.
- Keep tag `key` unchanged.
- Keep string-style tags as-is unless user explicitly asks to localize tags.
5. If `title`/`summary` is not localized-object format, normalize to:
```json
{
  "en": "<existing english text>",
  "zh": "<translated chinese text>"
}
```
6. Write valid JSON with 2-space indentation and trailing newline.

## Translation Rules

1. Keep meaning accurate and concise; avoid over-literal phrasing.
2. Keep product names, channel names, and proper nouns in original form when appropriate.
3. Do not translate URLs, IDs, timestamps, or duration formats.
4. Keep summary style short (typically one sentence).

## Validation

Run:

```bash
python3 skills/public/resources-video-en-to-zh/scripts/verify_translation.py \
  --index content/resources/resources.json \
  --root content/resources
```

Fix any `[ERROR]` lines before finishing.

## Output Checklist

1. Every file in `resources.json` exists and is valid JSON.
2. Each resource has non-empty `title.en`, `title.zh`, `summary.en`, `summary.zh`.
3. No path traversal in `order[].file` entries.
4. Resource order file remains unchanged unless user requests reorder.
