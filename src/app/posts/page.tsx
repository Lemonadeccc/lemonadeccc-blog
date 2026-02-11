'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

type PostItem = {
  name: string
  type: string
  project: string
  label: string
  image: string
}

const posts: PostItem[] = [
  {
    name: 'GSAP Motion  Timing',
    type: 'Article',
    project: 'GSAP Motion Timing ',
    label: '2023-08-01',
    image: '/posts/img1.jpg',
  },
  {
    name: 'Frontend Notes',
    type: 'Thinking',
    project: 'Tailwind v4 Tokens',
    label: '2023-08-01',
    image: '/posts/img2.jpg',
  },
]

export default function PostsPage() {
  const listRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const postRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineTransition = { duration: 2, ease: [0.33, 1, 0.68, 1] as const }

  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    const rows = postRefs.current.filter((row): row is HTMLDivElement => row !== null)

    if (!list || !preview || rows.length === 0) return

    const POSITIONS = {
      BOTTOM: 0,
      MIDDLE: -80,
      TOP: -160,
    } as const

    const rowPosition = new WeakMap<HTMLDivElement, number>()

    let lastMousePosition = { x: 0, y: 0 }
    let activeRow: HTMLDivElement | null = null
    let ticking = false
    let mouseTimeout: number | undefined

    const hidePreviewImages = (keepLastImage: boolean) => {
      const images = Array.from(preview.querySelectorAll('img'))
      if (images.length === 0) return

      const keepImage = keepLastImage ? images[images.length - 1] : null

      images.forEach((img) => {
        if (keepImage && img === keepImage) return
        gsap.to(img, {
          scale: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            img.remove()
          },
        })
      })
    }

    const animatePreview = () => {
      const listRect = list.getBoundingClientRect()
      const isOutsideList =
        lastMousePosition.x < listRect.left ||
        lastMousePosition.x > listRect.right ||
        lastMousePosition.y < listRect.top ||
        lastMousePosition.y > listRect.bottom

      if (isOutsideList) hidePreviewImages(false)
    }

    const updateRows = () => {
      animatePreview()

      if (activeRow) {
        const rect = activeRow.getBoundingClientRect()
        const isStillOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom

        if (!isStillOver) {
          const wrapper = activeRow.querySelector<HTMLElement>('.post-wrapper')
          const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2

          if (wrapper) {
            const nextPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM
            rowPosition.set(activeRow, nextPosition)
            gsap.to(wrapper, {
              y: nextPosition,
              duration: 0.4,
              ease: 'power2.out',
            })
          }
          activeRow = null
        }
      }

      rows.forEach((row) => {
        if (row === activeRow) return
        const rect = row.getBoundingClientRect()
        const isMouseOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom

        if (isMouseOver) {
          const wrapper = row.querySelector<HTMLElement>('.post-wrapper')
          if (wrapper) {
            rowPosition.set(row, POSITIONS.MIDDLE)
            gsap.to(wrapper, {
              y: POSITIONS.MIDDLE,
              duration: 0.4,
              ease: 'power2.out',
            })
          }
          activeRow = row
        }
      })

      ticking = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastMousePosition.x = event.clientX
      lastMousePosition.y = event.clientY

      if (mouseTimeout) window.clearTimeout(mouseTimeout)

      const listRect = list.getBoundingClientRect()
      const isInsideList =
        lastMousePosition.x >= listRect.left &&
        lastMousePosition.x <= listRect.right &&
        lastMousePosition.y >= listRect.top &&
        lastMousePosition.y <= listRect.bottom

      if (isInsideList) {
        mouseTimeout = window.setTimeout(() => {
          hidePreviewImages(true)
        }, 2000)
      }

      animatePreview()
    }

    const handleScroll = () => {
      if (ticking) return
      requestAnimationFrame(updateRows)
      ticking = true
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('scroll', handleScroll, { passive: true })

    const cleanupListeners: Array<() => void> = []

    rows.forEach((row, index) => {
      rowPosition.set(row, POSITIONS.TOP)
      const wrapper = row.querySelector<HTMLElement>('.post-wrapper')
      if (!wrapper) return

      const handleEnter = (event: MouseEvent) => {
        activeRow = row

        const rect = row.getBoundingClientRect()
        const enterFromTop = event.clientY < rect.top + rect.height / 2
        const currentPosition = rowPosition.get(row) ?? POSITIONS.TOP

        if (enterFromTop || currentPosition === POSITIONS.BOTTOM) {
          rowPosition.set(row, POSITIONS.MIDDLE)
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: 'power2.out',
          })
        }

        const img = document.createElement('img')
        img.src = row.dataset.image ?? ''
        img.alt = row.dataset.title ?? 'Post preview image'
        img.style.position = 'absolute'
        img.style.top = '0'
        img.style.left = '0'
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.objectFit = 'cover'
        img.style.transform = 'scale(0)'
        img.style.zIndex = `${Date.now()}`

        preview.appendChild(img)

        gsap.to(img, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const handleLeave = (event: MouseEvent) => {
        activeRow = null

        const rect = row.getBoundingClientRect()
        const leavingFromTop = event.clientY < rect.top + rect.height / 2
        const nextPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM

        rowPosition.set(row, nextPosition)
        gsap.to(wrapper, {
          y: nextPosition,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      row.addEventListener('mouseenter', handleEnter)
      row.addEventListener('mouseleave', handleLeave)

      cleanupListeners.push(() => {
        row.removeEventListener('mouseenter', handleEnter)
        row.removeEventListener('mouseleave', handleLeave)
      })
    })

    return () => {
      if (mouseTimeout) window.clearTimeout(mouseTimeout)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('scroll', handleScroll)
      cleanupListeners.forEach((cleanup) => cleanup())
      preview.querySelectorAll('img').forEach((img) => img.remove())
    }
  }, [])

  return (
    <section className="w-full flex-1 py-5 md:py-10 bg-bg text-text">
      <div className="app-container px-10">
        <h1 className="text-[30px] md:text-[36px] uppercase tracking-[0.08em] font-medium mb-8 md:mb-10">
          Thinking & Posts
        </h1>
      </div>

      <div ref={listRef} className="app-container w-full">
        {posts.map((post, index) => (
          <div
            key={`${post.name}-${post.project}`}
            ref={(element) => {
              postRefs.current[index] = element
            }}
            data-image={post.image}
            data-title={post.name}
            className="relative h-20 overflow-hidden select-none"
          >
            {index === 0 && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={lineTransition}
              />
            )}
            <motion.div
              className="pointer-events-none absolute left-0 bottom-0 z-10 h-px w-full bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={lineTransition}
            />

            <div className="post-wrapper relative h-[240px] will-change-transform -translate-y-[160px]">
              <div className="flex h-20 items-center justify-between gap-4 bg-bg px-4 md:px-6">
                <h2 className="text-[22px] md:text-[54px]  uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.name}
                </h2>
                <h2 className="text-[18px] md:text-[54px]  uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.type}
                </h2>
              </div>
              <div className="flex h-20 items-center justify-between gap-4 bg-white px-4 md:px-6 text-black">
                <h2 className="text-[22px] md:text-[54px]  uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.project}
                </h2>
                <h2 className="text-[18px] md:text-[54px]  uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.label}
                </h2>
              </div>
              <div className="flex h-20 items-center justify-between gap-4 bg-bg px-4 md:px-6">
                <h2 className="text-[22px] md:text-[54px]  uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.name}
                </h2>
                <h2 className="text-[18px] md:text-[54px]  uppercase tracking-[-0.02em] leading-[0.9]">
                  {post.type}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed bottom-4 right-4 z-40 hidden h-[30vh] w-[32vw] min-h-[180px] min-w-[220px] max-w-[460px] overflow-hidden border border-white/30 bg-black/85"
      />
    </section>
  )
}
