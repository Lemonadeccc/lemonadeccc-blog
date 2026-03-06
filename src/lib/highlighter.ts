import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const highlighterPromise = createHighlighterCore({
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
  ],
  engine: createJavaScriptRegexEngine(),
})

export function getHighlighter() {
  return highlighterPromise
}
