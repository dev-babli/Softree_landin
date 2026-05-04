"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type FlowEventDetail = {
  index: number
  total: number
  label: string
  tone: string
  progress: number
}

/**
 * FlowHud
 * - Floating top-right indicator that mirrors the active flow section
 * - Awwwards-style minimal pill with animated counter and underline
 */
export function FlowHud() {
  const [state, setState] = useState<FlowEventDetail>({
    index: 0,
    total: 4,
    label: "Hero",
    tone: "dark",
    progress: 0.25,
  })

  useEffect(() => {
    const handler = (event: Event) => {
      const e = event as CustomEvent<FlowEventDetail>
      setState(e.detail)
    }
    window.addEventListener("ultimate-flow:section", handler as EventListener)
    return () => window.removeEventListener("ultimate-flow:section", handler as EventListener)
  }, [])

  const isLight = state.tone === "light"
  const padded = String(state.index + 1).padStart(2, "0")
  const total = String(state.total).padStart(2, "0")

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] hidden md:flex flex-col items-end gap-2">
      <div
        className={`pointer-events-auto flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-md transition-colors duration-500 ${
          isLight
            ? "border-black/10 bg-white/70 text-[#0f0f0f] shadow-[0_8px_24px_rgba(15,15,15,0.06)]"
            : "border-white/15 bg-[#0a0a1a]/70 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        }`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-60">
          Section
        </span>
        <span className="font-mono text-[12px] tabular-nums">
          <span className="font-semibold">{padded}</span>
          <span className="opacity-50">/{total}</span>
        </span>
        <span className={`h-3 w-px ${isLight ? "bg-black/15" : "bg-white/20"}`} />
        <div className="relative h-4 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={state.label}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[12px] font-medium tracking-[-0.02em]"
            >
              {state.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`pointer-events-auto h-[2px] w-[180px] overflow-hidden rounded-full ${
          isLight ? "bg-black/10" : "bg-white/15"
        }`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#FF5812] via-[#1852FF] to-[#00A3FF]"
          initial={false}
          animate={{ width: `${state.progress * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default FlowHud
