"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * useReveal — light scroll-driven entrance for a group of children
 * Selects elements matching `selector` inside the returned ref and
 * animates them from (y:24, opacity:0) to (y:0, opacity:1) with stagger.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  selector: string,
  opts: {
    y?: number
    stagger?: number
    duration?: number
    start?: string
    once?: boolean
  } = {}
) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === "undefined") return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = el.querySelectorAll<HTMLElement>(selector)
      if (!targets.length) return
      const tween = gsap.from(targets, {
        y: opts.y ?? 24,
        opacity: 0,
        duration: opts.duration ?? 0.9,
        ease: "power3.out",
        stagger: opts.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? "top 82%",
          once: opts.once ?? true,
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [selector, opts.y, opts.stagger, opts.duration, opts.start, opts.once])

  return ref
}

/**
 * useCounter — animate a numeric element from 0 to target when scrolled into view.
 * Renders a text-node ref the caller should mount via ref={ref}.
 */
export function useCounter(
  target: number,
  opts: { duration?: number; decimals?: number; suffix?: string; prefix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { v: 0 }
      const tween = gsap.to(obj, {
        v: target,
        duration: opts.duration ?? 1.8,
        ease: "power2.out",
        onUpdate: () => {
          const n = opts.decimals ? obj.v.toFixed(opts.decimals) : Math.round(obj.v).toString()
          el.textContent = `${opts.prefix ?? ""}${n}${opts.suffix ?? ""}`
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [target, opts.duration, opts.decimals, opts.prefix, opts.suffix])
  return ref
}
