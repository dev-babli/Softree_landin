"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Users,
  BarChart3,
  Headphones,
  TrendingUp,
} from "lucide-react"

type FloatingCardData = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  position: string // tailwind absolute classes
}

const FLOATING_CARDS: FloatingCardData[] = [
  {
    icon: Headphones,
    title: "Ongoing Support",
    body: "Reliable support when you need it, every time.",
    position: "left-[3%] top-[6%]",
  },
  {
    icon: TrendingUp,
    title: "Performance & Optimization",
    body: "We analyze, refine, and optimize for better outcomes.",
    position: "right-[3%] top-[6%]",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    body: "Your extended team, aligned with your goals and working as one.",
    position: "left-[3%] bottom-[10%]",
  },
  {
    icon: BarChart3,
    title: "Scalable Engagement",
    body: "Flexible models that scale with your needs—up or down.",
    position: "right-[3%] bottom-[10%]",
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

function FloatingFeatureCard({
  icon: Icon,
  title,
  body,
  position,
  delay,
  reduce,
}: FloatingCardData & { delay: number; reduce: boolean }) {
  return (
    <motion.div
      className={[
        "absolute z-20 w-[170px] xl:w-[200px] p-4",
        "rounded-2xl border border-white/[0.12]",
        "bg-white/[0.05] backdrop-blur-md",
        "shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        "hover:border-[#ff8a5a]/40 hover:bg-white/[0.07]",
        "transition-colors duration-300",
        position,
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: 6 + delay * 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="flex flex-col gap-2"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff8a5a]/24 to-[#ff7a8a]/14 border border-white/10">
          <Icon className="h-3.5 w-3.5 text-[#ff9a8a]" aria-hidden />
        </span>
        <h4 className="text-[0.85rem] font-semibold text-white leading-tight">
          {title}
        </h4>
        <p className="text-[0.7rem] leading-relaxed text-white/60">{body}</p>
      </motion.div>
    </motion.div>
  )
}

function OrbitGraphic({ reduce }: { reduce: boolean }) {
  // 6 nodes around the ring at 0°, 60°, 120°, 180°, 240°, 300°
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180)
    const r = 165
    const cx = 200 + r * Math.cos(angle)
    const cy = 200 + r * Math.sin(angle)
    return { cx, cy }
  })

  return (
    <div
      className="relative flex items-center justify-center"
      aria-hidden
      style={{ width: "min(360px, 52%)", aspectRatio: "1 / 1" }}
    >
      {/* Soft glow behind ring */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_60%)] blur-2xl" />

      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <linearGradient id="ltdRing" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#ff8a5a" />
            <stop offset="35%" stopColor="#ff7a8a" />
            <stop offset="70%" stopColor="#c070e8" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id="ltdNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="ltdGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* outer dashed faint ring */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* main gradient ring */}
        <circle
          cx="200"
          cy="200"
          r="165"
          fill="none"
          stroke="url(#ltdRing)"
          strokeWidth="1.5"
          opacity="0.95"
        />

        {/* glow ring (blurred copy) */}
        <circle
          cx="200"
          cy="200"
          r="165"
          fill="none"
          stroke="url(#ltdRing)"
          strokeWidth="3"
          opacity="0.45"
          filter="url(#ltdGlow)"
        />

        {/* nodes — plain SVG + CSS keyframes (avoids framer-motion HMR
            "r is not animatable" errors when state persists across reloads) */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="10" fill="url(#ltdNode)" opacity="0.6" />
            <circle
              cx={n.cx}
              cy={n.cy}
              r="3.2"
              fill="#ffffff"
              className={reduce ? "ltd-node-static" : "ltd-node-pulse"}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animationDuration: `${2.4 + i * 0.2}s`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          </g>
        ))}
      </motion.svg>

      {/* Center text */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a5a]/30 to-[#a070ff]/30 border border-white/15">
          <Users className="h-4 w-4 text-[#ff7a8a]" aria-hidden />
        </span>
        <h3 className="text-[0.95rem] xl:text-[1.05rem] font-bold text-white leading-[1.18]">
          Your Growth,
          <br />
          Our Commitment.
        </h3>
        <p className="mt-1.5 text-[0.7rem] xl:text-[0.75rem] text-white/60 leading-relaxed max-w-[18ch]">
          A partnership that scales with your vision.
        </p>
      </div>
    </div>
  )
}

export function LongTermDeliveryVisual({ className = "" }: { className?: string }) {
  const reduce = !!useReducedMotion()

  return (
    <motion.section
      aria-label="Long-term delivery partnership visual"
      className={[
        "relative w-full overflow-hidden",
        "rounded-[24px] border border-white/[0.10]",
        // Tuned to sit inside Phase 04 violet tone (#0c0814) per Image 1
        "bg-[rgba(34,24,50,0.62)] backdrop-blur-[18px]",
        "shadow-[0_36px_110px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
        "min-h-[460px] xl:min-h-[540px]",
        "aspect-[16/11]",
        className,
      ].join(" ")}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {/* Inner glows — coral-pink + violet rim per Image 1 */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(560px 400px at 50% 52%, rgba(255,122,138,0.22), transparent 65%), radial-gradient(520px 420px at 92% 96%, rgba(255,138,90,0.22), transparent 70%), radial-gradient(620px 480px at 70% 100%, rgba(168,96,232,0.22), transparent 75%), radial-gradient(420px 320px at 12% 12%, rgba(255,255,255,0.04), transparent 70%)",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Floating cards */}
      {FLOATING_CARDS.map((c, i) => (
        <FloatingFeatureCard key={c.title} {...c} delay={0.15 + i * 0.1} reduce={reduce} />
      ))}

      {/* Center orbit */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <OrbitGraphic reduce={reduce} />
      </div>

      {/* Bottom labels */}
      <div className="absolute bottom-4 left-5 right-5 z-30 flex items-baseline justify-between">
        <span className="text-[1rem] font-black text-[#ff7a1a]">04</span>
        <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/55">
          Long-Term Delivery Partner
        </span>
      </div>

      {/* Pulse keyframes for the orbit nodes (replaces framer-motion to avoid
          SVG-r-attribute interpolation bugs on HMR). Global because the actual
          <circle> elements are rendered inside the OrbitGraphic child component
          and styled-jsx scopes per render tree. */}
      <style jsx global>{`
        .ltd-node-pulse {
          animation-name: ltd-node-pulse-kf;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
        }
        .ltd-node-static {
          opacity: 0.6;
        }
        @keyframes ltd-node-pulse-kf {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ltd-node-pulse { animation: none; opacity: 0.6; }
        }
      `}</style>
    </motion.section>
  )
}

export default LongTermDeliveryVisual
