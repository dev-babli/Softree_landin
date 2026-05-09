"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { type ReactNode } from "react"
import { DUR, EASE_T, REVEAL, STAGGER, VIEWPORT } from "@/lib/motion"

/* ────────────────────────────────────────────────────────────────────
 *  Softree reveal primitives
 *  ───────────────────────────
 *  Drop these around any block of content to get consistent, premium,
 *  scroll-triggered reveals across the entire site.
 *
 *  Used everywhere — never hand-roll initial/animate/transition again.
 *
 *  USAGE
 *  ─────
 *    // Single block, fade-up on enter
 *    <Reveal>...</Reveal>
 *
 *    // Choose a variant
 *    <Reveal variant="blurUp">...</Reveal>
 *
 *    // Stagger a list of children
 *    <RevealStack stagger="default">
 *      {items.map(i => <RevealItem key={i.id}>...</RevealItem>)}
 *    </RevealStack>
 *
 *    // Stagger words in a heading
 *    <RevealText text="Engineered for excellence" as="h2" className="..." />
 * ──────────────────────────────────────────────────────────────────── */

type RevealVariant = keyof typeof REVEAL
type StaggerSpeed = keyof typeof STAGGER

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  /** Delay in seconds before this element animates */
  delay?: number
  /** Duration override — defaults to DUR.section */
  duration?: number
  /** When to trigger (early/default/late) — see VIEWPORT in motion.ts */
  viewport?: keyof typeof VIEWPORT
  className?: string
  as?: "div" | "section" | "article" | "header" | "footer"
}

/** Single block reveal — wraps any content in a scroll-triggered animation */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = DUR.section,
  viewport = "default",
  className,
  as = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion()
  const Component = motion[as]

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      className={className}
      initial={REVEAL[variant].initial}
      whileInView={REVEAL[variant].animate}
      viewport={VIEWPORT[viewport]}
      transition={{ duration, ease: EASE_T.silk, delay }}
    >
      {children}
    </Component>
  )
}

/* ────────────────────────────────────────────────────────────────────
 *  Staggered list — parent triggers viewport, children cascade in
 * ──────────────────────────────────────────────────────────────────── */

interface RevealStackProps {
  children: ReactNode
  stagger?: StaggerSpeed
  delay?: number
  viewport?: keyof typeof VIEWPORT
  className?: string
  as?: "div" | "ul" | "ol" | "section"
}

const containerVariants = (staggerSeconds: number, delay: number): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerSeconds,
      delayChildren: delay,
    },
  },
})

export function RevealStack({
  children,
  stagger = "default",
  delay = 0,
  viewport = "default",
  className,
  as = "div",
}: RevealStackProps) {
  const prefersReduced = useReducedMotion()
  const Component = motion[as]

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      className={className}
      variants={containerVariants(STAGGER[stagger], delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT[viewport]}
    >
      {children}
    </Component>
  )
}

/* ────────────────────────────────────────────────────────────────────
 *  Stagger child — sits inside <RevealStack>
 * ──────────────────────────────────────────────────────────────────── */

const itemVariants: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  upLarge: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  fromLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  fromRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  blurUp: {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
}

interface RevealItemProps {
  children: ReactNode
  variant?: RevealVariant
  duration?: number
  className?: string
  as?: "div" | "li" | "section" | "article"
}

export function RevealItem({
  children,
  variant = "up",
  duration = DUR.card,
  className,
  as = "div",
}: RevealItemProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={itemVariants[variant]}
      transition={{ duration, ease: EASE_T.silk }}
    >
      {children}
    </Component>
  )
}

/* ────────────────────────────────────────────────────────────────────
 *  Word-by-word text reveal — for hero headlines and display copy
 *  Splits a string by space, animates each word with a tight stagger.
 * ──────────────────────────────────────────────────────────────────── */

interface RevealTextProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  variant?: "blurUp" | "up"
  stagger?: StaggerSpeed
  delay?: number
  duration?: number
  className?: string
  /**
   * If `true`, the text reveals as soon as it mounts (no scroll trigger).
   * Use this for hero/above-the-fold headlines.
   */
  immediate?: boolean
}

const wordVariant: Record<"up" | "blurUp", Variants> = {
  up: {
    hidden: { opacity: 0, y: "0.6em" },
    visible: { opacity: 1, y: 0 },
  },
  blurUp: {
    hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
}

export function RevealText({
  text,
  as = "h2",
  variant = "blurUp",
  stagger = "default",
  delay = 0,
  duration = DUR.section,
  className,
  immediate = false,
}: RevealTextProps) {
  const prefersReduced = useReducedMotion()
  const Component = motion[as]

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>
  }

  const words = text.split(" ")
  const trigger = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: VIEWPORT.default }

  return (
    <Component
      className={className}
      {...trigger}
      transition={{
        staggerChildren: STAGGER[stagger],
        delayChildren: delay,
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={wordVariant[variant]}
          transition={{ duration, ease: EASE_T.silk }}
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}
