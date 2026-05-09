"use client"

import { motion } from "framer-motion"
import { createElement } from "react"

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"

interface StaggeredRevealProps {
  text: string
  className?: string
  splitBy?: "word" | "line"
  delay?: number
  stagger?: number
  duration?: number
  as?: Tag
}

export default function StaggeredReveal({
  text,
  className = "",
  splitBy = "word",
  delay = 0,
  stagger = 0.06,
  duration = 1.1,
  as = "span",
}: StaggeredRevealProps) {
  const parts = splitBy === "word" ? text.split(" ") : text.split("\n")

  const children = parts.map((p, i) => (
    <span
      key={`${p}-${i}`}
      className="inline-block overflow-hidden align-bottom"
      style={{ paddingBottom: "0.05em", marginBottom: "-0.05em" }}
    >
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration,
          delay: delay + i * stagger,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {p}
        {splitBy === "word" && i < parts.length - 1 ? " " : null}
      </motion.span>
    </span>
  ))

  return createElement(as, { className: `inline-flex flex-wrap ${className}` }, children)
}
