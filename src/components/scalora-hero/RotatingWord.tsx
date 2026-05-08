"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

/* ====================================================================
 *  RotatingWord — cycles a list of words with a vertical slide
 *  Replicates the "Build. / Scale. / Operate." sequence
 * ==================================================================== */

interface RotatingWordProps {
  words: string[]
  /** ms between cycles */
  interval?: number
  className?: string
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function RotatingWord({
  words,
  interval = 2400,
  className = "",
}: RotatingWordProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span
      className={`relative inline-block overflow-hidden align-bottom ${className}`}
      aria-live="polite"
    >
      {/* Sizing ghost — keeps width based on the longest word */}
      <span className="invisible whitespace-pre" aria-hidden>
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="absolute inset-0 inline-block whitespace-pre will-change-transform"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
