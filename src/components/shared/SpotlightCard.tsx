"use client"

import { motion, useMotionValue, useMotionTemplate } from "framer-motion"
import { useRef, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────────
 *  SpotlightCard
 *  ──────────────
 *  Card that gets a soft, cursor-following spotlight glow inside its
 *  borders. Adds depth and "alive" feel without breaking layout.
 *
 *  Usage:
 *    <SpotlightCard color="#FF6B00" className="rounded-3xl border ...">
 *      ...content...
 *    </SpotlightCard>
 *
 *  Wraps your existing card content — your border/bg/padding stays.
 *  The spotlight is a `pointer-events-none` overlay so it never
 *  interferes with clicks or hovers on inner elements.
 * ───────────────────────────────────────────────────────────────────── */

interface SpotlightCardProps {
  children: ReactNode
  /** Spotlight glow color — default uses Softree orange */
  color?: string
  /** Spotlight intensity 0-1 — default 0.45 */
  intensity?: number
  /** Spotlight radius in px — default 320 */
  radius?: number
  className?: string
}

export function SpotlightCard({
  children,
  color = "rgba(255, 107, 0, 0.55)",
  intensity = 0.45,
  radius = 320,
  className,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background,
          opacity: intensity,
          willChange: "background",
        }}
      />
    </motion.div>
  )
}
