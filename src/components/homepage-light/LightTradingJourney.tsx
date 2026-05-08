"use client"

import { useEffect, useRef, useState } from "react"

/* ====================================================================
 *  LIGHT TRADING JOURNEY — "Effortless Trading Journey" timeline
 *  Light theme: white canvas, navy ink, electric blue curve & nodes.
 * ==================================================================== */

const STEPS = [
  {
    title: "Step 1 – Sign Up & Connect",
    desc: "Create your account in minutes and get instant access to the platform.",
    x: 480,
    y: 235,
  },
  {
    title: "Step 2 – Get AI Insights",
    desc: "Receive smart alerts, signals, and analysis tailored for you.",
    x: 720,
    y: 545,
  },
  {
    title: "Step 3 – Start Trading",
    desc: "Execute trades seamlessly and track your portfolio real-time.",
    x: 1110,
    y: 740,
  },
]

const PATH_D =
  "M 380 110 C 540 240, 380 460, 720 545 C 920 600, 1140 700, 1340 845"

export default function LightTradingJourney() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative isolate w-full overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 pt-20 sm:pt-24 md:pt-28">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
            <span className="text-sm font-medium text-[#1852FF]">Simple & Clear</span>
          </div>
          <h2 className="text-[clamp(30px,5vw,56px)] font-bold leading-[1.08] tracking-tight text-[#0a0a1a]">
            Effortless Trading Journey
          </h2>
          <p className="mt-4 max-w-[460px] text-[14px] leading-[1.6] text-[#0a0a1a]/70 sm:text-[15px]">
            Quickly start with guided steps from sign-up to trading.
          </p>
        </div>

        {/* ── Desktop ── */}
        <div className="relative mt-12 hidden md:block" style={{ aspectRatio: "1440 / 880" }}>
          <svg
            viewBox="0 0 1440 880"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="ltj-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5C9DFF" stopOpacity="0" />
                <stop offset="35%" stopColor="#5C9DFF" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#1852FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#1852FF" stopOpacity="0" />
              </linearGradient>
              <filter id="ltj-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
              <radialGradient id="ltj-node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="22%" stopColor="#C8E0FF" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#1852FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1852FF" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path
              d={PATH_D}
              stroke="url(#ltj-stroke)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              filter="url(#ltj-glow)"
              opacity="0.65"
              className={visible ? "ltj-path-draw" : "ltj-path-hidden"}
            />
            <path
              d={PATH_D}
              stroke="url(#ltj-stroke)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className={visible ? "ltj-path-draw" : "ltj-path-hidden"}
            />

            {STEPS.map((s, i) => (
              <g
                key={i}
                className={visible ? "ltj-node-in" : "ltj-node-hidden"}
                style={{ animationDelay: `${0.6 + i * 0.55}s`, transformOrigin: `${s.x}px ${s.y}px` }}
              >
                <circle
                  cx={s.x}
                  cy={s.y}
                  r="60"
                  fill="url(#ltj-node-glow)"
                  className="ltj-pulse"
                  style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                />
                <circle cx={s.x} cy={s.y} r="6" fill="#1852FF" />
                <circle cx={s.x} cy={s.y} r="2.5" fill="#ffffff" />
                <line
                  x1={s.x}
                  y1={s.y + 8}
                  x2={s.x}
                  y2={s.y + 70}
                  stroke="rgba(10,10,26,0.18)"
                  strokeWidth="1"
                />
              </g>
            ))}
          </svg>

          {STEPS.map((s, i) => {
            const leftPct = (s.x / 1440) * 100
            const topPct = (s.y / 880) * 100
            return (
              <div
                key={i}
                className={`absolute ${visible ? "ltj-text-in" : "ltj-text-hidden"}`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: "translate(20px, -10px)",
                  width: 240,
                  animationDelay: `${0.85 + i * 0.55}s`,
                }}
              >
                <h3 className="text-[16px] font-semibold leading-[1.3] text-[#0a0a1a]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.55] text-[#0a0a1a]/65">
                  {s.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* ── Mobile ── */}
        <div className="relative mt-12 md:hidden">
          <div
            aria-hidden
            className="absolute left-[18px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, #1852FF 15%, #5C9DFF 85%, transparent 100%)",
              boxShadow: "0 0 12px rgba(24,82,255,0.35)",
            }}
          />
          <div className="flex flex-col gap-10">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-5 ${visible ? "ltj-text-in" : "ltj-text-hidden"}`}
                style={{ animationDelay: `${0.3 + i * 0.4}s` }}
              >
                <div className="relative mt-1 h-9 w-9 flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-full ltj-pulse"
                    style={{
                      background:
                        "radial-gradient(circle, #ffffff 0%, #C8E0FF 35%, transparent 70%)",
                    }}
                  />
                  <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1852FF]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold leading-[1.3] text-[#0a0a1a]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-[#0a0a1a]/65">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 md:h-16" />
      </div>

      <style jsx>{`
        :global(.ltj-path-hidden) {
          stroke-dasharray: 2200;
          stroke-dashoffset: 2200;
        }
        :global(.ltj-path-draw) {
          stroke-dasharray: 2200;
          stroke-dashoffset: 2200;
          animation: ltj-draw 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes ltj-draw {
          to { stroke-dashoffset: 0; }
        }

        :global(.ltj-node-hidden) {
          opacity: 0;
          transform: scale(0.4);
        }
        :global(.ltj-node-in) {
          opacity: 0;
          transform: scale(0.4);
          animation: ltj-node-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes ltj-node-in {
          0%   { opacity: 0; transform: scale(0.2); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        :global(.ltj-text-hidden) {
          opacity: 0;
          transform: translateY(12px);
        }
        :global(.ltj-text-in) {
          opacity: 0;
          transform: translateY(12px);
          animation: ltj-text-in 0.7s ease-out forwards;
        }
        @keyframes ltj-text-in {
          to { opacity: 1; transform: translateY(0); }
        }

        :global(.ltj-pulse) {
          animation: ltj-breathe 3.6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes ltj-breathe {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.ltj-path-draw),
          :global(.ltj-node-in),
          :global(.ltj-text-in),
          :global(.ltj-pulse) {
            animation: none !important;
          }
          :global(.ltj-path-hidden),
          :global(.ltj-node-hidden),
          :global(.ltj-text-hidden) {
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
