"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type Tone = "dark-to-light" | "light-to-dark" | "light" | "dark"

/**
 * FlowSeam
 * - A scroll-revealed seam that visually stitches consecutive sections together.
 * - Variants:
 *    - dark-to-light: dark gradient that fades into the next light section
 *    - light-to-dark: light cream that fades into a dark section
 *    - light / dark: hairline rule with brand spark
 */
export function FlowSeam({
  tone = "dark-to-light",
  label,
  caption,
}: {
  tone?: Tone
  label?: string
  caption?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false })

  const isFromDark = tone === "dark-to-light" || tone === "dark"
  const isToDark = tone === "light-to-dark" || tone === "dark"

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      aria-hidden
      style={{
        background: isFromDark
          ? "linear-gradient(180deg,#0a0a1a 0%,#0a0a1a 40%,#F8F9FC 100%)"
          : isToDark
            ? "linear-gradient(180deg,#F8F9FC 0%,#F8F9FC 40%,#0a0a1a 100%)"
            : "linear-gradient(180deg,#F8F9FC 0%,#FFFFFF 100%)",
      }}
    >
      {/* spark line */}
      <div className="relative mx-auto max-w-[1240px] px-4 py-12 lg:px-10 lg:py-20">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="h-px flex-1 bg-gradient-to-r from-[#FF5812]/0 via-[#FF5812] to-[#1852FF]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: isFromDark ? "rgba(255,255,255,0.55)" : "rgba(15,15,15,0.55)" }}
          >
            {label ?? "Continue"}
          </span>
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="grid size-7 place-items-center rounded-full bg-[#FF5812] text-white shadow-[0_8px_24px_rgba(255,88,18,0.45)]"
          >
            <svg viewBox="0 0 12 12" className="size-3" fill="none">
              <path d="M3 3v6M3 9h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
        {caption ? (
          <motion.p
            initial={{ y: 18, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mt-5 max-w-md text-[13px] leading-relaxed"
            style={{ color: isFromDark ? "rgba(255,255,255,0.65)" : "rgba(15,15,15,0.65)" }}
          >
            {caption}
          </motion.p>
        ) : null}
      </div>
    </div>
  )
}

export default FlowSeam
