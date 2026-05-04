"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * FlowOrchestrator
 * - Lenis-driven smooth scroll for the entire page (Awwwards quality flow)
 * - Tracks current section index and scroll progress
 * - Exposes a custom event "ultimate-flow:section" when active section changes
 *
 * It expects each section in `children` to be wrapped with [data-flow-section]
 * with `data-flow-label` and `data-flow-tone` attributes used by the HUD.
 */
type FlowEventDetail = {
  index: number
  total: number
  label: string
  tone: string
  progress: number
}

export function FlowOrchestrator({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let lenisInstance: { destroy: () => void } | null = null
    let raf = 0
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!reduceMotion) {
      // Lazy import so it only ships on this page
      import("lenis").then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          touchMultiplier: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        lenisInstance = lenis as unknown as { destroy: () => void }

        const tick = (time: number) => {
          ;(lenis as unknown as { raf: (t: number) => void }).raf(time)
          raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      })
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (lenisInstance) lenisInstance.destroy()
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = containerRef.current
    if (!root) return

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-flow-section]")
    )
    if (sections.length === 0) return

    let currentIndex = -1

    const emit = (index: number) => {
      const el = sections[index]
      if (!el) return
      const detail: FlowEventDetail = {
        index,
        total: sections.length,
        label: el.dataset.flowLabel ?? `Section ${index + 1}`,
        tone: el.dataset.flowTone ?? "dark",
        progress: (index + 1) / sections.length,
      }
      window.dispatchEvent(new CustomEvent<FlowEventDetail>("ultimate-flow:section", { detail }))
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement)
            if (idx !== -1 && idx !== currentIndex) {
              currentIndex = idx
              emit(idx)
            }
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    sections.forEach((el) => io.observe(el))
    // initial emit
    requestAnimationFrame(() => emit(0))

    return () => io.disconnect()
  }, [mounted])

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  )
}

export default FlowOrchestrator
