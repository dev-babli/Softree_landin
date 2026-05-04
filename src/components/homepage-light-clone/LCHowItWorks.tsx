"use client"

/**
 * LCHowItWorks — light clone of optimus/landing/how-it-works-section.
 * Re-themed: cream canvas, ink text, flame/sunshine accent in SVG vizes.
 * GSAP/Framer Motion logic preserved exactly.
 */

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState, useMemo } from "react"
import { color } from "./tokens"

const steps = [
  { number: "01", title: "Connect Your Tools", description: "Integrate with your existing stack in minutes. We support 200+ data sources, APIs, and enterprise platforms out of the box." },
  { number: "02", title: "Build Your Workflow", description: "Design powerful automations with our visual builder or write code directly. Validate, transform, and deliver — all orchestrated." },
  { number: "03", title: "Ship to Production", description: "Deploy globally with zero configuration. Your solution goes live across 12 regions in under 30 seconds." },
]

const STROKE_BASE = "rgba(20,20,19,0.08)"
const TEXT_DIM = "rgba(20,20,19,0.45)"
const TEXT_DIMMER = "rgba(20,20,19,0.25)"

function ConnectAnimation() {
  const nodes = useMemo(() => [
    { x: 80, y: 70, label: "CRM", delay: 0 },
    { x: 420, y: 55, label: "ERP", delay: 0.15 },
    { x: 65, y: 280, label: "DB", delay: 0.3 },
    { x: 435, y: 290, label: "API", delay: 0.45 },
    { x: 170, y: 40, label: "S3", delay: 0.1 },
    { x: 340, y: 310, label: "Auth", delay: 0.35 },
  ], [])
  const hub = { x: 250, y: 175 }

  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" fill="none">
      {[...Array(10)].map((_, i) => (<line key={`h${i}`} x1={0} x2={500} y1={i * 35} y2={i * 35} stroke={color.ink} strokeOpacity={0.04} />))}
      {[...Array(11)].map((_, i) => (<line key={`v${i}`} x1={i * 50} x2={i * 50} y1={0} y2={350} stroke={color.ink} strokeOpacity={0.04} />))}
      {nodes.map((n, i) => (
        <motion.line key={`l${i}`} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="url(#lc-lineGrad)" strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: n.delay + 0.3 }} />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={`p${i}`} r={2.5} fill={color.flame}
          initial={{ cx: n.x, cy: n.y, opacity: 0 }} animate={{ cx: [n.x, hub.x], cy: [n.y, hub.y], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: n.delay + 1, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }} />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={`n${i}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: n.delay }}>
          <rect x={n.x - 26} y={n.y - 14} width={52} height={28} rx={4} fill={color.lifted} stroke={STROKE_BASE} strokeWidth={0.8} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={color.slate} fontSize={11} fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
        <circle cx={hub.x} cy={hub.y} r={32} fill="rgba(251,100,36,0.10)" stroke={color.flame} strokeOpacity={0.4} strokeWidth={1} />
        <motion.circle cx={hub.x} cy={hub.y} r={32} fill="none" stroke={color.sunshine} strokeOpacity={0.3} strokeWidth={1}
          initial={{ r: 32 }} animate={{ r: 50, opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        <circle cx={hub.x} cy={hub.y} r={5} fill={color.flame} />
        <text x={hub.x} y={hub.y + 52} textAnchor="middle" fill={TEXT_DIMMER} fontSize={9} fontFamily="monospace">SOFTREE CORE</text>
      </motion.g>
      <defs>
        <linearGradient id="lc-lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color.flame} stopOpacity={0.5} />
          <stop offset="100%" stopColor={color.sunshine} stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function BuildAnimation() {
  const stages = useMemo(() => [
    { label: "Validate", x: 60, color: color.flame },
    { label: "Transform", x: 190, color: color.sunshine },
    { label: "Enrich", x: 320, color: color.mistral },
    { label: "Deliver", x: 440, color: color.gold },
  ], [])
  const y = 175
  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" fill="none">
      {[...Array(8)].map((_, i) => (<line key={`g${i}`} x1={0} x2={500} y1={i * 50} y2={i * 50} stroke={color.ink} strokeOpacity={0.03} />))}
      <motion.line x1={60} y1={y} x2={440} y2={y} stroke={STROKE_BASE} strokeWidth={2} strokeDasharray="6 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
      {stages.slice(0, -1).map((s, i) => {
        const nx = stages[i + 1].x
        const mx = (s.x + nx) / 2
        return (<motion.g key={`a${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.2 }}>
          <polygon points={`${mx - 5},${y - 4} ${mx + 5},${y} ${mx - 5},${y + 4}`} fill={TEXT_DIM} />
        </motion.g>)
      })}
      {stages.map((s, i) => (
        <motion.g key={s.label} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: i * 0.2 }}>
          <circle cx={s.x} cy={y} r={28} fill={s.color} fillOpacity={0.10} />
          <motion.circle cx={s.x} cy={y} r={24} fill={color.lifted} stroke={s.color} strokeWidth={1.2} strokeOpacity={0.6}
            animate={{ strokeOpacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
          <circle cx={s.x} cy={y} r={4} fill={s.color} />
          <text x={s.x} y={y + 44} textAnchor="middle" fill={color.slate} fontSize={11} fontFamily="monospace">{s.label}</text>
          <text x={s.x} y={y - 36} textAnchor="middle" fill={TEXT_DIMMER} fontSize={9} fontFamily="monospace">{`0${i + 1}`}</text>
        </motion.g>
      ))}
      {[0, 1, 2].map((i) => (
        <motion.rect key={`pkt${i}`} width={6} height={6} rx={1} fill={color.flame} fillOpacity={0.9}
          initial={{ x: 50, y: y - 3, opacity: 0 }} animate={{ x: [50, 180, 310, 445], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, delay: 1.5 + i * 1, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }} />
      ))}
    </svg>
  )
}

function ShipAnimation() {
  const regions = useMemo(() => [
    { x: 120, y: 100, label: "EU-WEST" },
    { x: 380, y: 90, label: "US-EAST" },
    { x: 250, y: 260, label: "AP-SOUTH" },
    { x: 90, y: 220, label: "EU-NORTH" },
    { x: 410, y: 240, label: "US-WEST" },
    { x: 250, y: 100, label: "ME-CENT" },
  ], [])
  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" fill="none">
      <motion.ellipse cx={250} cy={175} rx={160} ry={110} stroke={STROKE_BASE} strokeWidth={1} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} />
      <motion.ellipse cx={250} cy={175} rx={110} ry={110} stroke={STROKE_BASE} strokeWidth={0.8} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.1 }} />
      <motion.ellipse cx={250} cy={175} rx={50} ry={110} stroke={STROKE_BASE} strokeWidth={0.8} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
      <line x1={90} x2={410} y1={175} y2={175} stroke={STROKE_BASE} strokeWidth={0.8} />
      {regions.map((r, i) => (
        <motion.g key={r.label} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.5 + i * 0.15 }}>
          <motion.circle cx={r.x} cy={r.y} r={8} fill="none" stroke={color.flame} strokeWidth={1} animate={{ r: [8, 22], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
          <circle cx={r.x} cy={r.y} r={5} fill={color.flame} fillOpacity={0.9} />
          <circle cx={r.x} cy={r.y} r={2} fill={color.lifted} fillOpacity={0.95} />
          <text x={r.x} y={r.y + 20} textAnchor="middle" fill={TEXT_DIM} fontSize={8} fontFamily="monospace" letterSpacing="0.05em">{r.label}</text>
        </motion.g>
      ))}
      {[[0, 1], [1, 4], [0, 3], [2, 4], [5, 2]].map(([a, b], i) => (
        <motion.path key={`arc${i}`}
          d={`M${regions[a].x},${regions[a].y} Q250,${Math.min(regions[a].y, regions[b].y) - 30} ${regions[b].x},${regions[b].y}`}
          stroke={color.flame} strokeOpacity={0.25} strokeWidth={0.8} fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1 + i * 0.2 }} />
      ))}
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
        <rect x={175} y={295} width={150} height={28} rx={4} fill="rgba(251,100,36,0.08)" stroke={color.flame} strokeOpacity={0.30} strokeWidth={0.8} />
        <motion.circle cx={192} cy={309} r={3} fill="#34d399" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <text x={205} y={313} fill={color.slate} fontSize={10} fontFamily="monospace">6 regions live</text>
      </motion.g>
    </svg>
  )
}

const animations = [ConnectAnimation, BuildAnimation, ShipAnimation]

export function LCHowItWorks() {
  const [active, setActive] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % steps.length), 6000)
    return () => clearInterval(id)
  }, [])

  const ActiveViz = animations[active]

  return (
    <section id="how-it-works" ref={ref} className="flex w-full justify-center px-4 py-24 md:px-6 lg:py-32" style={{ background: color.canvas }}>
      <div className="w-full max-w-[1240px]">
        <div className="flex items-center gap-2 self-start px-2 py-1 w-fit mb-8" style={{ border: `1px solid ${color.ink}` }}>
          <div className="size-[5.82px]" style={{ background: color.ink }} />
          <span className="font-mono text-sm leading-normal tracking-[-0.28px]" style={{ color: color.ink }}>PROCESS</span>
        </div>

        <motion.h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: color.ink }}
          initial={{ opacity: 0, y: 16 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          Three steps.
          <br />
          <span style={{ color: color.slate }}>Infinite possibilities.</span>
        </motion.h2>

        <a className="flex w-fit items-center justify-center px-2 py-1.5 transition-colors mb-16 lg:mb-20"
          href="/contact" style={{ background: color.ink, color: color.lifted }}>
          <span className="font-mono text-sm leading-normal tracking-[-0.28px]">START A PROJECT</span>
        </a>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-[480px] shrink-0">
            {steps.map((step, i) => {
              const isActive = active === i
              return (
                <motion.button key={step.number} type="button" onClick={() => setActive(i)}
                  className="group relative w-full text-left -mt-px p-5 lg:p-6 transition-all duration-500 overflow-hidden"
                  style={{
                    border: `1px solid ${color.dustTaupe}`,
                    background: isActive ? color.lifted : "transparent",
                  }}
                >
                  {isActive && (
                    <motion.div layoutId="lc-activeGlass" className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${color.cream} 0%, ${color.gold} 50%, transparent 100%)`, opacity: 0.35 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <div className="relative z-10 flex items-start gap-5">
                    <span className="font-mono text-2xl transition-colors duration-500" style={{ color: isActive ? color.flame : color.dustTaupe }}>
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-medium mb-2 transition-all duration-300 group-hover:translate-x-1"
                        style={{ color: isActive ? color.ink : color.slate }}>
                        {step.title}
                      </h3>
                      <p className="text-sm lg:text-base leading-relaxed transition-colors duration-500" style={{ color: isActive ? color.slate : TEXT_DIM }}>
                        {step.description}
                      </p>
                      {isActive && (
                        <div className="mt-4 h-px overflow-hidden" style={{ background: color.dustTaupe }}>
                          <motion.div className="h-full" style={{ background: `linear-gradient(90deg, ${color.flame}, ${color.sunshine})` }}
                            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} key={`progress-${active}`} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
            <div className="-mt-px px-5 py-3 flex items-center gap-3" style={{ border: `1px solid ${color.dustTaupe}` }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs" style={{ color: color.slate }}>Step {active + 1} of {steps.length}</span>
            </div>
          </div>

          <div className="w-full lg:flex-1 lg:-ml-px -mt-px lg:mt-0 min-h-[350px] lg:min-h-[460px] relative overflow-hidden"
            style={{ background: color.lifted, border: `1px solid ${color.dustTaupe}` }}>
            <div className="absolute top-3 left-3 w-3 h-3" style={{ borderLeft: `1px solid ${color.dustTaupe}`, borderTop: `1px solid ${color.dustTaupe}` }} />
            <div className="absolute top-3 right-3 w-3 h-3" style={{ borderRight: `1px solid ${color.dustTaupe}`, borderTop: `1px solid ${color.dustTaupe}` }} />
            <div className="absolute bottom-3 left-3 w-3 h-3" style={{ borderLeft: `1px solid ${color.dustTaupe}`, borderBottom: `1px solid ${color.dustTaupe}` }} />
            <div className="absolute bottom-3 right-3 w-3 h-3" style={{ borderRight: `1px solid ${color.dustTaupe}`, borderBottom: `1px solid ${color.dustTaupe}` }} />

            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${color.dustTaupe}` }}>
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full" style={{ background: color.dustTaupe }} />
                <div className="size-2.5 rounded-full" style={{ background: color.dustTaupe }} />
                <div className="size-2.5 rounded-full" style={{ background: color.dustTaupe }} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: color.slate }}>{steps[active].title}</span>
            </div>

            <div className="absolute inset-0 top-[41px] p-4">
              <AnimatePresence mode="wait">
                <motion.div key={active} className="w-full h-full" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.5 }}>
                  <ActiveViz />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCHowItWorks
