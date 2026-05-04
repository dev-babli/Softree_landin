"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Word wrapper — use inside SplitWords ── */
export function W({
  children,
  style,
}: {
  children: string
  style?: React.CSSProperties
}) {
  return (
    <span
      data-sw
      className="inline-block"
      style={{
        marginRight: "0.28em",
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* ── Container — auto-animates [data-sw] children on scroll ── */
export function SplitWords({
  children,
  className = "",
  style,
  as: Tag = "div",
  stagger = 0.05,
  y = 30,
  duration = 0.85,
  ease = "power3.out",
  scrollStart = "top 88%",
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span"
  stagger?: number
  y?: number
  duration?: number
  ease?: string
  scrollStart?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = el.querySelectorAll<HTMLElement>("[data-sw]")
      if (words.length) {
        gsap.set(words, { willChange: "transform,opacity" })
        gsap.from(words, {
          y,
          opacity: 0,
          duration,
          stagger,
          ease,
          scrollTrigger: { trigger: el, start: scrollStart, once: true },
          onComplete: () => gsap.set(words, { willChange: "auto" }),
        })
      }
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <div ref={ref} className={className} style={style}>
      <Tag>{children}</Tag>
    </div>
  )
}
