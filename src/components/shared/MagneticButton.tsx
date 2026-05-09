"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { useRef, type ReactNode, type MouseEvent } from "react"
import Link from "next/link"

/* ─────────────────────────────────────────────────────────────────────
 *  MagneticButton
 *  ───────────────
 *  Cursor pull-toward effect — the button physically shifts ~8px
 *  toward the mouse when hovered, with spring physics so it never
 *  feels mechanical. Releases smoothly when the cursor leaves.
 *
 *  Usage:
 *    <MagneticButton href="/contact" intensity="default">
 *      Initiate Project
 *    </MagneticButton>
 *
 *    <MagneticButton onClick={...}>Submit</MagneticButton>
 *
 *  Use sparingly — magnetic effects are decoration. Reserve for
 *  primary CTAs, hero buttons, conversion points.
 * ───────────────────────────────────────────────────────────────────── */

type MagneticIntensity = "subtle" | "default" | "strong"

const MAGNET_RANGE: Record<MagneticIntensity, number> = {
  subtle: 4,
  default: 8,
  strong: 14,
}

interface BaseProps {
  children: ReactNode
  intensity?: MagneticIntensity
  className?: string
}

interface AsLinkProps extends BaseProps {
  href: string
  onClick?: never
  type?: never
}

interface AsButtonProps extends BaseProps {
  href?: never
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

type MagneticButtonProps = AsLinkProps | AsButtonProps

export function MagneticButton({
  children,
  intensity = "default",
  className = "",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 })
  const ySpring = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 })

  const range = MAGNET_RANGE[intensity]
  const xMove = useTransform(xSpring, [-1, 1], [-range, range])
  const yMove = useTransform(ySpring, [-1, 1], [-range, range])

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    x.set(Math.max(-1, Math.min(1, dx)))
    y.set(Math.max(-1, Math.min(1, dy)))
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: xMove, y: yMove }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={className}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      className={className}
    >
      {inner}
    </button>
  )
}
