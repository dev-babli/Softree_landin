"use client"

import { useState } from "react"

/* ====================================================================
 *  LIGHT INTEGRATION ORBIT — "Effortless Security Across All Platforms"
 *  Light theme: white canvas, navy ink, electric blue accent.
 * ==================================================================== */

const ICONS = [
  { ring: 3, angle: 90 },
  { ring: 2, angle: 20 },
  { ring: 1, angle: 200 },
  { ring: 2, angle: 290 },
]

const RING_RADII_PCT = [22, 32, 41, 49]

const GLYPHS = [
  <path key="g1" d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke="#0a0a1a" strokeWidth="1.6" fill="none" strokeLinejoin="round" />,
  <g key="g2" stroke="#0a0a1a" strokeWidth="1.6" fill="none" strokeLinecap="round">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </g>,
  <g key="g3" stroke="#0a0a1a" strokeWidth="1.6" fill="none">
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2.4" fill="#0a0a1a" />
  </g>,
  <path key="g4" d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" stroke="#0a0a1a" strokeWidth="1.5" fill="none" strokeLinejoin="round" />,
]

export default function LightIntegrationOrbit() {
  const [hover, setHover] = useState(false)

  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      {/* Soft top-right blue wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[20%] h-[60%] w-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,82,255,0.10) 0%, rgba(24,82,255,0.04) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-20 sm:pt-24 md:pt-28">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
            <span className="text-sm font-medium text-[#1852FF]">Integration</span>
          </div>

          <h2 className="max-w-[820px] text-[clamp(32px,5.2vw,60px)] font-bold leading-[1.08] tracking-tight text-[#0a0a1a]">
            Effortless Security
            <br className="hidden sm:block" />
            <span className="sm:ml-2"> Across </span>
            <span className="text-[#1852FF]">All Platforms</span>
          </h2>

          <p className="mt-5 max-w-[520px] text-[14px] leading-[1.6] text-[#0a0a1a]/70 sm:text-[15px]">
            Tracle works everone effortless integration for security.
          </p>
        </div>

        {/* ── Orbital Graphic ── */}
        <div
          className="relative mx-auto mt-14 flex aspect-square w-full max-w-[820px] items-center justify-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: `lio-spin 60s linear infinite`,
              animationPlayState: hover ? "paused" : "running",
            }}
          >
            {/* Concentric rings */}
            {RING_RADII_PCT.map((r, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-[#0a0a1a]/8"
                style={{
                  width: `${r * 2}%`,
                  height: `${r * 2}%`,
                  borderColor: "rgba(10,10,26,0.08)",
                  boxShadow: "inset 0 0 60px rgba(24,82,255,0.04)",
                }}
              />
            ))}

            {/* Orbiting satellites */}
            {ICONS.map((ic, i) => {
              const radius = RING_RADII_PCT[ic.ring]
              const rad = (ic.angle * Math.PI) / 180
              const x = 50 + radius * Math.cos(rad)
              const y = 50 + radius * Math.sin(rad)
              return (
                <div
                  key={i}
                  className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#0a0a1a]/10 bg-white sm:h-[60px] sm:w-[60px]"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 8px 24px rgba(10,10,26,0.08), 0 2px 6px rgba(10,10,26,0.04)",
                    animation: `lio-counter 60s linear infinite`,
                    animationPlayState: hover ? "paused" : "running",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                    {GLYPHS[i]}
                  </svg>
                </div>
              )
            })}
          </div>

          {/* Central blue glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: "55%",
              height: "55%",
              background:
                "radial-gradient(circle, rgba(24,82,255,0.28) 0%, rgba(92,157,255,0.18) 30%, transparent 65%)",
              filter: hover ? "blur(45px)" : "blur(35px)",
              opacity: hover ? 1 : 0.85,
              transition: "filter 600ms ease, opacity 600ms ease",
            }}
          />

          {/* Central isometric stack — blue gradient diamonds */}
          <div className="relative" style={{ width: "26%", height: "26%" }}>
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
              style={{ filter: "drop-shadow(0 20px 40px rgba(24,82,255,0.30))" }}
            >
              <defs>
                <linearGradient id="lio-plane-1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C8E0FF" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#1852FF" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="lio-plane-2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E0EFFF" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#5C9DFF" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="lio-plane-3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#1852FF" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="lio-plane-4" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C2DDFF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#1852FF" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="lio-plane-5" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E0EFFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#5C9DFF" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {[150, 130, 110, 90, 70].map((cy, idx) => (
                <polygon
                  key={idx}
                  points={`100,${cy - 30} 170,${cy} 100,${cy + 30} 30,${cy}`}
                  fill={`url(#lio-plane-${idx + 1})`}
                  stroke="rgba(10,10,26,0.10)"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes lio-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes lio-counter {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}
