"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// ─── Rolling digit ────────────────────────────────────────────────────────────
function RollingDigit({
  final,
  between,
  dir = "from-below",
  delay = 0,
  triggered,
}: {
  final: string
  between: string[]
  dir?: "from-below" | "from-above"
  delay?: number
  triggered: boolean
}) {
  const n = between.length + 1
  const pct = (n - 1) * 100

  const startY = dir === "from-below" ? `${pct}%` : "0%"
  const endY = dir === "from-below" ? "0%" : `-${pct}%`

  const items = [...between, final]

  return (
    <span
      className="rolling-number relative inline-flex items-center overflow-y-clip"
      style={{ verticalAlign: "baseline" }}
    >
      <div className="absolute inset-0 flex items-center">
        <div
          className={`absolute inset-0 flex will-change-transform ${
            dir === "from-below" ? "flex-col-reverse" : "flex-col"
          }`}
          style={{
            transform: triggered ? `translateY(${endY})` : `translateY(${startY})`,
            transition: triggered
              ? `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
              : "none",
          }}
        >
          {items.map((d, i) => (
            <span
              key={i}
              className="flex h-[1em] items-center justify-center font-[550] leading-[1]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <span className="opacity-0">{final}</span>
    </span>
  )
}

function WaveformCanvas() {
  const bars = Array.from({ length: 48 })
  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center pt-8">
      <svg
        viewBox="0 0 1200 400"
        className="h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#819c63" stopOpacity="0" />
            <stop offset="20%" stopColor="#819c63" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4bc449" stopOpacity="1" />
            <stop offset="80%" stopColor="#819c63" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#819c63" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="url(#waveGradient)">
          {bars.map((_, i) => {
            const xCenter = 25 * i + 12.5;
            const dur = 1 + Math.random() * 1.5;
            const delay = Math.random() * -2;
            const maxH = 40 + Math.sin(i * 0.4) * 120 + Math.random() * 80;
            return (
              <rect
                key={i}
                x={Math.max(0, xCenter - 4)}
                y={200 - maxH / 2}
                width="8"
                height={maxH}
                rx="4"
                className="origin-center animate-[wave_infinite_ease-in-out]"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animationDuration: `${dur}s`,
                  animationDelay: `${delay}s`,
                  animationName: i % 2 === 0 ? "wave-pulse" : "wave-pulse-alt"
                }}
              />
            )
          })}
        </g>
      </svg>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(0.7); opacity: 0.6; }
          50% { transform: scaleY(1.3); opacity: 1; }
        }
        @keyframes wave-pulse-alt {
          0%, 100% { transform: scaleY(1.2); opacity: 1; }
          50% { transform: scaleY(0.6); opacity: 0.5; }
        }
      `}} />
    </div>
  )
}

export default function ReflexRoleplaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#f2f1e8] relative overflow-hidden pt-16 md:pt-36 w-full"
    >
      <div className="absolute top-0 left-0 w-full max-w-[1280px] mx-auto px-6">
        <svg
          className="h-6 w-12 text-white lg:ml-5"
          viewBox="0 0 48 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H48V12C48 18.6274 42.6274 24 36 24H12C5.37258 24 0 18.6274 0 12V0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
      
      <div className="mx-auto w-full max-w-[1280px] px-6 text-center">
        <h2 className="text-[clamp(42px,6vw,68px)] font-medium leading-[1.05] tracking-tight text-[#0d1a0d] max-w-[847px] mx-auto">
          <span className="inline-block relative">Roleplay</span>
          <span className="pl-[0.05em] inline-flex items-center align-middle mx-1.5 pb-2">
            <div className="bg-[#3f4728] relative size-[0.7em] overflow-hidden rounded-full sm:size-[0.625em] -mr-1 z-10 border-2 border-[#f2f1e8]">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=132&h=132&fit=crop"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="bg-[#1a3020] flex items-center gap-1.5 rounded-full pr-3 pl-4 md:pr-[0.9375rem] md:pl-5 py-1.5 relative z-0">
              <div
                className="rolling-stat whitespace-nowrap leading-[1] font-[550] tracking-[0em] text-white"
                style={{ fontSize: "clamp(1rem, 1.125vw, 1.125rem)" }}
              >
                <RollingDigit
                  final="8"
                  between={["3", "9", "6"]}
                  dir="from-below"
                  delay={0}
                  triggered={triggered}
                />
                <RollingDigit
                  final="3"
                  between={["4", "9", "1"]}
                  dir="from-above"
                  delay={80}
                  triggered={triggered}
                />
                <span className="-mb-[0.1em] inline-flex items-center overflow-y-clip pb-[0.1em] ml-0.5">
                  %
                </span>
              </div>
              
              <div className="flex items-center gap-px ml-1 border-l border-[#2e4734] pl-2 -py-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative size-[6px] md:size-[8px] rounded-full mx-px"
                    style={{ backgroundColor: "#5cb85c" }}
                  >
                    {i === 4 && (
                      <div className="absolute inset-x-[1px] inset-y-[1px] md:inset-[2px] rounded-full bg-[#1a3020]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </span>{" "}
          <span className="inline-block relative">and QA</span>
          <span className="block mt-1">that's real-world ready</span>
        </h2>
        
        <div className="relative mx-auto mt-12 aspect-[1290/530] w-full max-w-[1290px] md:mt-26 overflow-visible pointer-events-none">
          <div className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200">
            <div className="h-full w-full">
              {/* Animated waveform mimicking the .riv audio file */}
              <WaveformCanvas />
            </div>
          </div>
          
          {/* Faded overlay gradient to anchor the waveform in space */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f2f1e8] via-transparent to-transparent pointer-events-none opacity-90 h-full w-full"></div>
        </div>
      </div>
    </section>
  )
}
