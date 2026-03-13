export const LIGHT_FAVICON_HREF = '/favicon-light.png'
export const DARK_FAVICON_HREF = '/favicon-dark.png'
export const FAVICON_TYPE = 'image/png'

export const FAVICON_LINKS = [
  { id: 'site-favicon', rel: 'icon' },
  { id: 'site-favicon-shortcut', rel: 'shortcut icon' },
] as const

export const getFaviconHref = (theme?: string | null) => {
  return theme === 'dark' ? DARK_FAVICON_HREF : LIGHT_FAVICON_HREF
}

export function syncFaviconLinks(doc: Document, href: string) {
  for (const { id, rel } of FAVICON_LINKS) {
    let link = doc.getElementById(id) as HTMLLinkElement | null

    if (!link) {
      link = doc.createElement('link')
      link.id = id
      link.rel = rel
      doc.head.appendChild(link)
    }

    link.type = FAVICON_TYPE
    link.href = href
  }
}

export const createFaviconBootScript = (storageKey: string) => {
  return `(() => {
    try {
      const storedTheme = localStorage.getItem(${JSON.stringify(storageKey)})
      const href = storedTheme === 'dark' ? ${JSON.stringify(DARK_FAVICON_HREF)} : ${JSON.stringify(LIGHT_FAVICON_HREF)}
      const links = ${JSON.stringify(FAVICON_LINKS)}

      for (const { id, rel } of links) {
        let link = document.getElementById(id)
        if (!link) {
          link = document.createElement('link')
          link.id = id
          link.rel = rel
          document.head.appendChild(link)
        }

        link.type = ${JSON.stringify(FAVICON_TYPE)}
        link.href = href
      }
    } catch (_) {}
  })()`
}
