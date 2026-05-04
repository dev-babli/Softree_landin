"use client"

/**
 * LCStackForge — interactive gooey-blob section for the Light homepage.
 *
 * Concept:
 *   "Forge your Softree stack" — 6 draggable capability blobs (AI, Web, M365,
 *   Data, Cloud, Ops) orbit a central fusion well. Users drag blobs into the
 *   well; hits snap and "lock in", misses spring back to origin. Inside the
 *   well, the gooey SVG filter visually merges blobs into a single flame
 *   organism. A live readout and CTA morph as the stack changes.
 *
 * Tech (inspired by skiper64.tsx):
 *   - SVG gooey filter (feGaussianBlur + feColorMatrix) on a wrapping <g>
 *     so all blobs inside the well merge visually
 *   - framer-motion <motion.div drag /> with dragSnapToOrigin
 *   - pointer-up hit test against the well's bounding box
 *   - spring idle breathing via animate loop
 *   - double-click an in-well blob to eject it
 *
 * Placement: between LCVerticalCodePath and LCMidCTA (discover -> play -> CTA)
 */

import { useCallback, useMemo, useRef, useState } from "react"
import { motion, type PanInfo } from "framer-motion"
import {
  Brain,
  Code2,
  Database,
  Cloud,
  Workflow,
  Layers,
  ArrowRight,
  RotateCcw,
} from "lucide-react"
import { color } from "./tokens"

type Capability = {
  id: string
  label: string
  short: string
  tone: "flame" | "sunshine"
  icon: React.ReactNode
  /** angle around the well (degrees, 0 = right, clockwise) */
  angle: number
}

const CAPABILITIES: Capability[] = [
  { id: "ai", label: "AI & Agents", short: "AI", tone: "flame", icon: <Brain className="h-5 w-5" />, angle: -150 },
  { id: "web", label: "Modern Web", short: "Web", tone: "sunshine", icon: <Code2 className="h-5 w-5" />, angle: -90 },
  { id: "m365", label: "Microsoft 365", short: "M365", tone: "flame", icon: <Layers className="h-5 w-5" />, angle: -30 },
  { id: "data", label: "Data & Insight", short: "Data", tone: "sunshine", icon: <Database className="h-5 w-5" />, angle: 30 },
  { id: "cloud", label: "Cloud Platform", short: "Cloud", tone: "flame", icon: <Cloud className="h-5 w-5" />, angle: 90 },
  { id: "ops", label: "DevOps & Ship", short: "Ops", tone: "sunshine", icon: <Workflow className="h-5 w-5" />, angle: 150 },
]

/** radial offset for the blob ring (px) */
const RING_RADIUS = 240
/** hit radius for the central well (px) */
const WELL_RADIUS = 120

function hitWell(wellRect: DOMRect, pointerX: number, pointerY: number) {
  const cx = wellRect.left + wellRect.width / 2
  const cy = wellRect.top + wellRect.height / 2
  const dx = pointerX - cx
  const dy = pointerY - cy
  return Math.hypot(dx, dy) <= WELL_RADIUS
}

/** Single draggable blob with spring-return + in-well lock behavior. */
function Blob({
  cap,
  locked,
  wellRef,
  onLock,
  onRelease,
}: {
  cap: Capability
  locked: boolean
  wellRef: React.RefObject<HTMLDivElement | null>
  onLock: (id: string) => void
  onRelease: (id: string) => void
}) {
  const rad = (cap.angle * Math.PI) / 180
  const originX = Math.cos(rad) * RING_RADIUS
  const originY = Math.sin(rad) * RING_RADIUS
  const tone = cap.tone === "flame" ? color.flame : color.sunshine
  const toneShadow = cap.tone === "flame" ? "rgba(251,100,36,0.45)" : "rgba(255,161,16,0.45)"

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const wellEl = wellRef.current
    if (!wellEl) return
    const rect = wellEl.getBoundingClientRect()
    if (hitWell(rect, info.point.x, info.point.y)) {
      onLock(cap.id)
    }
  }

  return (
    <motion.div
      className="lc-sf-blob absolute left-1/2 top-1/2 flex select-none items-center justify-center rounded-full"
      style={{
        width: 96,
        height: 96,
        marginLeft: -48,
        marginTop: -48,
        background: tone,
        boxShadow: `0 12px 36px -8px ${toneShadow}, inset 0 2px 4px rgba(255,255,255,0.45)`,
        color: color.ink,
        cursor: locked ? "default" : "grab",
        zIndex: locked ? 2 : 3,
      }}
      drag={!locked}
      dragElastic={0.35}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.15, cursor: "grabbing", zIndex: 4 }}
      animate={
        locked
          ? { x: 0, y: 0, scale: 0.78, opacity: 0.95 }
          : { x: originX, y: originY, scale: [1, 1.06, 1], opacity: 1 }
      }
      transition={
        locked
          ? { type: "spring", stiffness: 260, damping: 24 }
          : {
            x: { type: "spring", stiffness: 260, damping: 24 },
            y: { type: "spring", stiffness: 260, damping: 24 },
            scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          }
      }
      initial={{ x: originX, y: originY, scale: 1, opacity: 1 }}
      onDoubleClick={() => locked && onRelease(cap.id)}
      aria-label={cap.label}
      role="button"
      title={locked ? `${cap.label} — double-click to eject` : `Drag ${cap.label} into the well`}
    >
      <div className="flex flex-col items-center gap-1 pointer-events-none">
        <span style={{ color: color.ink }}>{cap.icon}</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: color.ink }}>
          {cap.short}
        </span>
      </div>
    </motion.div>
  )
}

/** SVG gooey filter definition. Id is local to avoid collisions. */
function GooeyDefs() {
  return (
    <svg aria-hidden className="absolute h-0 w-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="lc-sf-gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  )
}

export function LCStackForge() {
  const wellRef = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState<Set<string>>(new Set())
  const [hinted, setHinted] = useState(true)

  const lock = useCallback((id: string) => {
    setHinted(false)
    setLocked(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const release = useCallback((id: string) => {
    setLocked(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const reset = () => setLocked(new Set())

  const stackLabel = useMemo(() => {
    if (locked.size === 0) return "Drag blobs into the well"
    return CAPABILITIES.filter(c => locked.has(c.id)).map(c => c.short).join("  +  ")
  }, [locked])

  const ctaLabel = locked.size === 0
    ? "Pick your first capability"
    : locked.size === CAPABILITIES.length
      ? "Forge the full Softree stack"
      : `Forge my ${locked.size}-capability stack`

  return (
    <section className="relative w-full overflow-hidden" style={{ background: color.canvas, color: color.ink }}>
      <GooeyDefs />

      <div className="relative mx-auto w-full max-w-[1240px] px-4 py-20 md:py-28 lg:px-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: color.lifted, borderColor: color.dustTaupe }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color.flame }} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: color.slate }}>
                Interactive · Shape Your Stack
              </span>
            </div>
            <h2 className="text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: color.ink }}>
              Forge your Softree stack.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed md:text-lg" style={{ color: color.slate }}>
              Drag our capabilities into the fusion well. Watch them merge. We&rsquo;ll
              shape a delivery around whatever you combine — double-click to eject
              anything you change your mind about.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{ background: color.lifted, borderColor: color.dustTaupe, color: color.ink }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Stage */}
        <div className="relative mx-auto aspect-square w-full max-w-[720px]">
          {/* decorative ring */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: RING_RADIUS * 2,
              height: RING_RADIUS * 2,
              marginLeft: -RING_RADIUS,
              marginTop: -RING_RADIUS,
              borderStyle: "dashed",
              borderColor: color.dustTaupe,
              opacity: 0.7,
            }}
            aria-hidden
          />

          {/* subtle radial glow behind well */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 480,
              height: 480,
              marginLeft: -240,
              marginTop: -240,
              background: "radial-gradient(closest-side, rgba(251,100,36,0.14), transparent 72%)",
            }}
            aria-hidden
          />

          {/* gooey-filtered surface: well + all locked blobs */}
          <div className="absolute inset-0" style={{ filter: "url(#lc-sf-gooey)" }}>
            {/* Well */}
            <div
              ref={wellRef}
              className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full"
              style={{
                width: WELL_RADIUS * 2,
                height: WELL_RADIUS * 2,
                marginLeft: -WELL_RADIUS,
                marginTop: -WELL_RADIUS,
                background: `radial-gradient(closest-side, ${color.flame}, ${color.sunshine})`,
                boxShadow: `0 20px 60px -20px rgba(251,100,36,0.55), inset 0 4px 18px rgba(255,255,255,0.35)`,
                zIndex: 1,
              }}
              aria-label="Fusion well"
            />

            {/* Locked blobs render centered so the gooey filter merges them with the well */}
            {CAPABILITIES.map(cap =>
              locked.has(cap.id) ? (
                <Blob
                  key={`locked-${cap.id}`}
                  cap={cap}
                  locked
                  wellRef={wellRef}
                  onLock={lock}
                  onRelease={release}
                />
              ) : null
            )}
          </div>

          {/* unlocked blobs sit OUTSIDE the gooey filter so their icons/text stay sharp */}
          {CAPABILITIES.map(cap =>
            !locked.has(cap.id) ? (
              <Blob
                key={`free-${cap.id}`}
                cap={cap}
                locked={false}
                wellRef={wellRef}
                onLock={lock}
                onRelease={release}
              />
            ) : null
          )}

          {/* well center label */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ zIndex: 5 }}
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.88)" }}>
              {locked.size > 0 ? "Your stack" : "Fusion well"}
            </span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: "#fff" }}>
              {locked.size} <span className="text-sm font-normal opacity-75">/ {CAPABILITIES.length}</span>
            </span>
          </div>

          {/* first-use hint */}
          {hinted && (
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm" style={{ background: color.lifted, borderColor: color.dustTaupe, color: color.slate }}>
                Drag a blob →
              </span>
            </div>
          )}
        </div>

        {/* Readout + CTA */}
        <div className="mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: color.slate }}>
              Stack readout
            </div>
            <div className="mt-2 text-xl font-medium md:text-2xl" style={{ color: color.ink }}>
              {stackLabel}
            </div>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-base font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60"
            style={{
              background: locked.size === 0 ? color.lifted : `linear-gradient(135deg, ${color.flame}, ${color.sunshine})`,
              color: locked.size === 0 ? color.slate : "#fff",
              border: locked.size === 0 ? `1px solid ${color.dustTaupe}` : "1px solid transparent",
              boxShadow: locked.size === 0 ? "none" : "0 14px 40px -12px rgba(251,100,36,0.45)",
              pointerEvents: locked.size === 0 ? "none" : "auto",
            }}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default LCStackForge
