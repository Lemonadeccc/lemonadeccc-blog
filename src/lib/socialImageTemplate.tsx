import { ImageResponse } from 'next/og'
import { siteConfig } from './site'
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
} from './socialImage'

type SocialImageOptions = {
  eyebrow: string
  title: string
  description: string
}

export const socialImageAlt = DEFAULT_SOCIAL_IMAGE_ALT
export const socialImageSize = SOCIAL_IMAGE_SIZE
export const socialImageContentType = SOCIAL_IMAGE_CONTENT_TYPE

export function createSocialImage({
  eyebrow,
  title,
  description,
}: SocialImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at 18% 18%, rgba(0, 43, 255, 0.50), transparent 28%), radial-gradient(circle at 84% 20%, rgba(239, 68, 68, 0.32), transparent 22%), linear-gradient(135deg, #03122a 0%, #081c44 55%, #170c28 100%)',
          color: '#f5f7ff',
          padding: '56px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '28px',
            border: '1px solid rgba(245, 247, 255, 0.16)',
            opacity: 0.7,
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '24px',
            background: 'rgba(2, 10, 24, 0.36)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #002bff 0%, #e11d48 100%)',
                  color: '#ffffff',
                  fontSize: '54px',
                  fontWeight: 800,
                  letterSpacing: '-0.05em',
                }}
              >
                L
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    color: 'rgba(165, 186, 255, 0.92)',
                  }}
                >
                  {eyebrow}
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {siteConfig.name}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '18px',
                color: 'rgba(245, 247, 255, 0.68)',
              }}
            >
              {siteConfig.displayDomain}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              maxWidth: '920px',
            }}
          >
            <div
              style={{
                fontSize: '78px',
                lineHeight: 1.04,
                fontWeight: 800,
                letterSpacing: '-0.05em',
                textWrap: 'balance',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.35,
                color: 'rgba(245, 247, 255, 0.82)',
                maxWidth: '840px',
              }}
            >
              {description}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...SOCIAL_IMAGE_SIZE,
    }
  )
}
