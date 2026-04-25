"use client"

import { useEffect, useRef, useState } from "react"
import { Layers3, PhoneCall, ShieldCheck } from "lucide-react"

type ShowcaseItem = {
  id: number
  title: string
  subtitle: string
  Icon: typeof ShieldCheck
  accent: string
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 1,
    title: "Security-first design",
    subtitle: "Audit-ready simulation workflows",
    Icon: ShieldCheck,
    accent: "#6ED96B",
  },
  {
    id: 2,
    title: "AI-powered call simulation",
    subtitle: "Nuanced conversation practice",
    Icon: PhoneCall,
    accent: "#7AE26F",
  },
  {
    id: 3,
    title: "Training and QA together",
    subtitle: "One loop from coaching to review",
    Icon: Layers3,
    accent: "#67D471",
  },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function wrap01(value: number) {
  const wrapped = value % 1
  return wrapped < 0 ? wrapped + 1 : wrapped
}

function easeInOut(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

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
    <span className="relative inline-flex items-center overflow-y-clip align-baseline">
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
          {items.map((digit, index) => (
            <span
              key={index}
              className="flex h-[1em] items-center justify-center font-[550] leading-[1]"
            >
              {digit}
            </span>
          ))}
        </div>
      </div>
      <span className="opacity-0">{final}</span>
    </span>
  )
}

function OrbitalPill({
  item,
  transform,
  opacity,
  zIndex,
}: {
  item: ShowcaseItem
  transform: string
  opacity: number
  zIndex: number
}) {
  const Icon = item.Icon

  return (
    <div
      className="absolute left-0 top-0 will-change-transform"
      style={{ transform, opacity, zIndex }}
    >
      <div className="flex min-w-[186px] max-w-[238px] items-start gap-2.5 rounded-[10px] border border-[#e9e7df] bg-white px-2.5 py-2 shadow-[0_12px_28px_-18px_rgba(28,38,20,0.28)] sm:min-w-[210px] sm:px-3">
        <div
          className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-[5px]"
          style={{ backgroundColor: item.accent }}
        >
          <Icon className="h-3.5 w-3.5 text-[#123112]" strokeWidth={2.2} />
        </div>

        <div className="min-w-0 text-left">
          <div className="truncate text-[10px] font-medium leading-[1.15] text-[#11170d] sm:text-[10.5px]">
            {item.title}
          </div>
          <div className="mt-0.5 truncate text-[9px] leading-[1.1] text-[#7a8172] sm:text-[9.5px]">
            {item.subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrbitCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = canvasRef.current
    if (!node) return

    const update = () => {
      setSize({
        width: node.offsetWidth,
        height: node.offsetHeight,
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    let start = 0
    const duration = 6200

    const tick = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      setProgress((elapsed % duration) / duration)
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const width = size.width || 1290
  const height = size.height || 582
  const centerX = width / 2
  const centerY = height * 0.93
  const arcRadii = [width * 0.145, width * 0.175, width * 0.205, width * 0.232]

  const pills = SHOWCASE_ITEMS.map((item, index) => {
    const raw = wrap01(progress + index / SHOWCASE_ITEMS.length)
    const travel = easeInOut(raw)
    const angle = 167 - 154 * travel
    const radians = (angle * Math.PI) / 180
    const radius = arcRadii[index + 1]
    const x = centerX + radius * Math.cos(radians)
    const y = centerY - radius * Math.sin(radians)
    const tangentRotation = clamp(90 - angle, -52, 52)
    const entry = smoothstep(0.02, 0.12, raw)
    const exit = 1 - smoothstep(0.78, 0.92, raw)
    const opacity = entry * exit
    const scale = 0.88 + Math.sin(radians) * 0.18

    return {
      item,
      opacity,
      zIndex: Math.round(scale * 100),
      transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${tangentRotation}deg) scale(${scale})`,
    }
  }).filter((pill) => pill.opacity > 0.02)
    .sort((a, b) => a.zIndex - b.zIndex)

  return (
    <div ref={canvasRef} className="relative h-full w-full overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="orbit-fade" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#b7b39f" stopOpacity="0" />
            <stop offset="17%" stopColor="#b7b39f" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#b7b39f" stopOpacity="0.58" />
            <stop offset="83%" stopColor="#b7b39f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#b7b39f" stopOpacity="0" />
          </linearGradient>
        </defs>

        {arcRadii.map((radius, index) => (
          <path
            key={radius}
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
            fill="none"
            stroke="url(#orbit-fade)"
            strokeWidth={index === 1 ? 1.15 : 1}
            strokeLinecap="round"
            strokeDasharray={index % 2 === 0 ? "2.4 8.8" : "3.2 10"}
            opacity={0.7 - index * 0.08}
          />
        ))}

        <path
          d={[
            `M ${centerX - width * 0.15} ${height * 0.88}`,
            `L ${centerX - width * 0.105} ${height * 0.48}`,
            `L ${centerX - width * 0.022} ${height * 0.31}`,
            `L ${centerX + width * 0.02} ${height * 0.22}`,
            `L ${centerX + width * 0.105} ${height * 0.47}`,
            `L ${centerX + width * 0.15} ${height * 0.88}`,
            "Z",
          ].join(" ")}
          fill="#ddd9cb"
          opacity="0.82"
        />
        <path
          d={[
            `M ${centerX - width * 0.095} ${height * 0.83}`,
            `L ${centerX - width * 0.055} ${height * 0.55}`,
            `L ${centerX + width * 0.002} ${height * 0.41}`,
            `L ${centerX + width * 0.055} ${height * 0.55}`,
            `L ${centerX + width * 0.094} ${height * 0.83}`,
            "Z",
          ].join(" ")}
          fill="#ebe8de"
          opacity="0.96"
        />
      </svg>

      <div className="absolute inset-0">
        {pills.map((pill) => (
          <OrbitalPill
            key={pill.item.id}
            item={pill.item}
            transform={pill.transform}
            opacity={pill.opacity}
            zIndex={pill.zIndex}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#f2f1e8] via-[#f2f1e8]/80 to-transparent" />
    </div>
  )
}

export default function ReflexRoleplaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f2f1e8] pb-24 pt-16 md:pb-32 md:pt-36"
    >
      <div className="absolute left-0 top-0 mx-auto w-full max-w-[1280px] px-6">
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
        <h2 className="mx-auto max-w-[847px] text-[clamp(42px,6vw,68px)] font-medium leading-[1.05] tracking-tight text-[#0d1a0d]">
          <span className="inline-block">Roleplay</span>
          <span className="mx-1.5 inline-flex items-center align-middle pb-2 pl-[0.05em]">
            <div className="relative z-10 -mr-1 size-[0.7em] overflow-hidden rounded-full border-2 border-[#f2f1e8] bg-[#3f4728] sm:size-[0.625em]">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=132&h=132&fit=crop"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-0 flex items-center gap-1.5 rounded-full bg-[#1a3020] py-1.5 pl-4 pr-3 md:pl-5 md:pr-[0.9375rem]">
              <div
                className="whitespace-nowrap font-[550] leading-[1] tracking-[0em] text-white"
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
                <span className="ml-0.5 inline-flex items-center overflow-y-clip pb-[0.1em]">
                  %
                </span>
              </div>

              <div className="ml-1 flex items-center gap-px border-l border-[#2e4734] pl-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="relative mx-px size-[6px] rounded-full md:size-[8px]"
                    style={{ backgroundColor: "#5cb85c" }}
                  >
                    {index === 4 ? (
                      <div className="absolute inset-[1px] rounded-full bg-[#1a3020] md:inset-[2px]" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </span>{" "}
          <span className="inline-block">and QA</span>
          <span className="mt-1 block">that&apos;s real-world ready</span>
        </h2>

        <div className="relative mx-auto mt-12 aspect-[1290/582] w-full max-w-[1290px] md:mt-26">
          <OrbitCanvas />
        </div>
      </div>
    </section>
  )
}
