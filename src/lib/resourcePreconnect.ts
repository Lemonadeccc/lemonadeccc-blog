type ProviderPreconnectRule = {
  provider: ResourceProvider
  hosts: readonly string[]
  preconnectOrigins: readonly string[]
}

export type ResourceProvider = 'youtube' | 'vimeo' | 'bilibili'

const YOUTUBE_PRECONNECT_ORIGINS = [
  'https://www.youtube.com',
  'https://www.google.com',
  'https://www.gstatic.com',
  'https://i.ytimg.com',
] as const

const VIMEO_PRECONNECT_ORIGINS = [
  'https://player.vimeo.com',
  'https://f.vimeocdn.com',
  'https://i.vimeocdn.com',
] as const

const BILIBILI_PRECONNECT_ORIGINS = [
  'https://player.bilibili.com',
  'https://www.bilibili.com',
  'https://i0.hdslb.com',
] as const

const PROVIDER_PRECONNECT_RULES: readonly ProviderPreconnectRule[] = [
  {
    provider: 'youtube',
    hosts: ['youtu.be', 'youtube.com', 'youtube-nocookie.com'],
    preconnectOrigins: YOUTUBE_PRECONNECT_ORIGINS,
  },
  {
    provider: 'vimeo',
    hosts: ['vimeo.com', 'vimeocdn.com'],
    preconnectOrigins: VIMEO_PRECONNECT_ORIGINS,
  },
  {
    provider: 'bilibili',
    hosts: ['bilibili.com', 'bilivideo.com'],
    preconnectOrigins: BILIBILI_PRECONNECT_ORIGINS,
  },
]

const matchesHost = (hostname: string, pattern: string) => {
  return hostname === pattern || hostname.endsWith(`.${pattern}`)
}

export const isResourceProvider = (value: string): value is ResourceProvider => {
  return PROVIDER_PRECONNECT_RULES.some((rule) => rule.provider === value)
}

const getRuleByProvider = (provider: string) => {
  if (!isResourceProvider(provider)) return undefined
  return PROVIDER_PRECONNECT_RULES.find((rule) => rule.provider === provider)
}

const getRuleByHostname = (hostname: string) => {
  const normalizedHost = hostname.trim().toLowerCase()
  if (!normalizedHost) return undefined

  return PROVIDER_PRECONNECT_RULES.find((rule) =>
    rule.hosts.some((pattern) => matchesHost(normalizedHost, pattern)),
  )
}

export const getProviderByHostname = (hostname: string): ResourceProvider | undefined => {
  return getRuleByHostname(hostname)?.provider
}

export const getProviderPreconnectOrigins = ({
  provider,
  hostname,
}: {
  provider?: string
  hostname?: string
}): readonly string[] => {
  const normalizedProvider = provider?.trim().toLowerCase()
  const ruleByProvider = normalizedProvider ? getRuleByProvider(normalizedProvider) : undefined
  if (ruleByProvider) return ruleByProvider.preconnectOrigins

  const ruleByHostname = hostname ? getRuleByHostname(hostname) : undefined
  return ruleByHostname?.preconnectOrigins ?? []
}
