'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'

const CURSOR_SIZE = 24
const HALF_SIZE = CURSOR_SIZE / 2

const SLOW_PERIOD = 1600 // ms for a full breath cycle
const FAST_PERIOD = 750  // ms when hovering interactive targets

// breathing curve values: center 0.84, amplitude 0.16 => range ~[0.68, 1.0]
const BREATH_BASE = 0.84
const BREATH_AMP = 0.16

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)
  const [isInteractive, setIsInteractive] = useState(false)
  const phase = useRef(0) // continuous phase so animation never restarts

  const spring = { stiffness: 320, damping: 20, mass: 0.4 }
  const smoothX = useSpring(x, spring)
  const smoothY = useSpring(y, spring)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - HALF_SIZE)
      y.set(e.clientY - HALF_SIZE)

      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, input, select, textarea, [role="button"], [role="link"], [data-cursor-fast]') != null
      setIsInteractive(Boolean(interactive))
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  useAnimationFrame((_, delta) => {
    const period = isInteractive ? FAST_PERIOD : SLOW_PERIOD
    const deltaPhase = (delta / period) * Math.PI * 2
    phase.current += deltaPhase
    const breath = BREATH_BASE + BREATH_AMP * Math.sin(phase.current)
    scale.set(breath)
  })

  if (!mounted) return null

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x: smoothX, y: smoothY, scale }}
    >
      <div
        className="rounded-full bg-red-500"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          boxShadow: '0 0 12px rgba(255,0,0,0.35)',
        }}
      />
    </motion.div>
  )
}

export default CustomCursor
