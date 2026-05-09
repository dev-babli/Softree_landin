/**
 * Softree motion system — shared tokens for every animation in the project.
 *
 * Philosophy (synthesized from Emil Kowalski + GSAP best practices):
 *   • UI animations stay under ~300ms; cinematic reveals 600–1400ms
 *   • Use ease-out for entrances (instant feedback)
 *   • Use ease-in-out for on-screen movement
 *   • Never use ease-in for UI (feels sluggish)
 *   • Spring physics for "alive" feel; duration-based for predictable choreography
 *   • Animate only `transform` + `opacity` — nothing else hits the GPU clean
 *
 * Usage:
 *   import { EASE, DUR, SPRING, STAGGER, REVEAL } from "@/lib/motion"
 *
 *   gsap.to(el, { y: 0, opacity: 1, duration: DUR.section, ease: EASE.silk })
 *
 *   <motion.div
 *     initial={REVEAL.up.initial}
 *     animate={REVEAL.up.animate}
 *     transition={{ duration: DUR.card, ease: EASE.out }}
 *   />
 */

/* ─────────────────────────────────────────────────────────────────
   Easing curves (string form for GSAP, tuple form for framer-motion)
   ───────────────────────────────────────────────────────────────── */
export const EASE = {
  /** Strong ease-out — default for entrances and hover states */
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  /** Strong ease-in-out — for on-screen movement, morphs */
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  /** iOS sheet / drawer curve */
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
  /** expo.out — luxurious cinematic arrivals */
  silk: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** sine — continuous loops, no start/stop feel */
  smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
  /** sharp gravity — collapse / implode */
  implode: "cubic-bezier(0.7, 0, 0.84, 0)",
} as const

/** Same curves expressed as tuples for framer-motion */
export const EASE_T = {
  out: [0.23, 1, 0.32, 1] as const,
  inOut: [0.77, 0, 0.175, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,
  silk: [0.16, 1, 0.3, 1] as const,
  smooth: [0.65, 0, 0.35, 1] as const,
  implode: [0.7, 0, 0.84, 0] as const,
} as const

/* ─────────────────────────────────────────────────────────────────
   Duration scale (seconds)
   Mapped to perceived weight: lighter = faster, heavier = longer.
   ───────────────────────────────────────────────────────────────── */
export const DUR = {
  /** Button press / tactile feedback */
  press: 0.16,
  /** Tooltips, small popovers */
  tip: 0.18,
  /** Dropdowns, selects, color shifts */
  popover: 0.22,
  /** Card hover lift, state changes */
  card: 0.32,
  /** Modals, drawers, accordions */
  panel: 0.48,
  /** Section reveal on scroll */
  section: 0.9,
  /** Hero / display reveals */
  cinematic: 1.4,
} as const

/* ─────────────────────────────────────────────────────────────────
   Spring configurations (framer-motion `transition`)
   ───────────────────────────────────────────────────────────────── */
export const SPRING = {
  /** Quick, responsive UI elements (toggles, hovers, popovers) */
  ui: { type: "spring" as const, stiffness: 360, damping: 32, mass: 0.6 },
  /** Cards, panels, content blocks */
  card: { type: "spring" as const, stiffness: 200, damping: 28, mass: 0.8 },
  /** Drag interactions, drawers */
  drag: { type: "spring" as const, stiffness: 100, damping: 20, mass: 1.0 },
  /** Subtle bounce — overshoots slightly for "alive" feel */
  bouncy: { type: "spring" as const, stiffness: 280, damping: 18, mass: 0.9 },
} as const

/* ─────────────────────────────────────────────────────────────────
   Stagger timing (in seconds for GSAP, framer-motion uses same number)
   Keep stagger short — total sequence under 1s or users lose patience.
   ───────────────────────────────────────────────────────────────── */
export const STAGGER = {
  /** Tight cascade — letters in a heading, dense lists */
  tight: 0.025,
  /** Default cascade — words, list items, cards */
  default: 0.06,
  /** Loose cascade — section blocks, hero elements */
  loose: 0.12,
  /** Cinematic — major reveal moments */
  cinematic: 0.18,
} as const

/* ─────────────────────────────────────────────────────────────────
   Pre-built reveal variants for framer-motion `initial`/`animate`
   ───────────────────────────────────────────────────────────────── */
export const REVEAL = {
  /** Fade up — default for cards, paragraphs, section blocks */
  up: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  /** Fade up large — for hero headlines, hero CTAs */
  upLarge: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  /** Fade in — for items where motion would distract */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  /** Scale in (never from 0 — starts at 0.95 like Emil prescribes) */
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  /** Slide from left — sidebars, side rails */
  fromLeft: {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
  },
  /** Slide from right — counterpart to fromLeft */
  fromRight: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
  },
  /** Blur up — premium reveal for display headings */
  blurUp: {
    initial: { opacity: 0, y: 32, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
} as const

/* ─────────────────────────────────────────────────────────────────
   Common viewport config for `whileInView`
   margin "-10%" = trigger 10% before reaching the viewport edge
   once: true = animate once, then leave alone (saves perf, common case)
   ───────────────────────────────────────────────────────────────── */
export const VIEWPORT = {
  default: { once: true, margin: "-10%" } as const,
  /** Trigger sooner — for above-the-fold or dense layouts */
  early: { once: true, margin: "-5%" } as const,
  /** Trigger later — for lazy-feel reveals */
  late: { once: true, margin: "-20%" } as const,
} as const

/* ─────────────────────────────────────────────────────────────────
   GSAP defaults — drop these into a timeline's `defaults` config
   ───────────────────────────────────────────────────────────────── */
export const GSAP_DEFAULTS = {
  duration: DUR.section,
  ease: EASE.silk,
} as const

/* ─────────────────────────────────────────────────────────────────
   Reduced-motion check (call inside useEffect/useGSAP)
   ───────────────────────────────────────────────────────────────── */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
