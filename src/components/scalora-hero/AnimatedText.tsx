"use client"

import { motion, type Variants } from "framer-motion"
import { useMemo } from "react"

/* ====================================================================
 *  AnimatedText — staggered word/letter reveal
 *  Replicates `gsap_split_word` mask-and-rise pattern
 * ==================================================================== */

type Mode = "word" | "letter"

interface AnimatedTextProps {
  text: string
  mode?: Mode
  /** seconds */
  delay?: number
  /** seconds */
  stagger?: number
  /** seconds */
  duration?: number
  className?: string
  /** Element wrapping the entire phrase. */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

const childVariants = (duration: number): Variants => ({
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration, ease: EASE },
  },
})

export default function AnimatedText({
  text,
  mode = "word",
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
  className = "",
  as = "span",
}: AnimatedTextProps) {
  const Wrapper = motion[as] as typeof motion.span

  const tokens = useMemo(() => {
    if (mode === "word") return text.split(/(\s+)/)
    // letter mode preserves spaces
    return Array.from(text)
  }, [text, mode])

  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants(stagger, delay)}
      aria-label={text}
    >
      {tokens.map((token, i) => {
        // Preserve whitespace tokens without animation
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>
        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className="relative inline-block will-change-transform"
              variants={childVariants(duration)}
            >
              {token}
            </motion.span>
          </span>
        )
      })}
    </Wrapper>
  )
}
