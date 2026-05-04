"use client"

import { memo, useEffect, useRef, useState } from "react"
import { Code2, FileCode2, Layers3, Route, Sparkles } from "lucide-react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

type CardTone = "lab" | "html" | "css" | "js"

type CodeCard = {
  id: CardTone
  label: string
  pill: string
  title: string
  desc: string
  icon: React.ReactNode
  glowColor: string
  accentClass: string
  lines: string[]
}

const CODE_CARDS: CodeCard[] = [
  {
    id: "lab",
    label: "Prototype Lab",
    pill: "LIVE CANVAS",
    title: "Build, test, and ship front-end systems from one moving surface.",
    desc: "A scroll-led development lane where product UI, code, and motion timing stay visible as one production flow.",
    icon: <Sparkles className="h-5 w-5" />,
    glowColor: "#fb6424",
    accentClass: "text-[#fb6424]",
    lines: [
      "const surface = createCanvas({",
      '  intent: "prototype-to-prod",',
      "  feedback: realtime,",
      "  motion: scrollLinked",
      "})",
    ],
  },
  {
    id: "html",
    label: "Structure",
    pill: "SEMANTIC HTML",
    title: "The interface starts with clean, inspectable markup.",
    desc: "Each visual block is structured as accessible content first, then enhanced with animation and scroll state.",
    icon: <FileCode2 className="h-5 w-5" />,
    glowColor: "#ffa110",
    accentClass: "text-[#ffa110]",
    lines: [
      '<main data-scroll-stage="code-path">',
      "  <section aria-label=\"Build timeline\">",
      '    <CodeCard state="active" />',
      "  </section>",
      "</main>",
    ],
  },
  {
    id: "css",
    label: "Skin",
    pill: "RESPONSIVE CSS",
    title: "Glass, border light, and layout constraints keep the scene stable.",
    desc: "The cards use fixed responsive dimensions, inner refraction borders, and animated surfaces that do not shift layout.",
    icon: <Layers3 className="h-5 w-5" />,
    glowColor: "#ffd900",
    accentClass: "text-[#ffd900]",
    lines: [
      ".code-card {",
      "  contain: layout paint;",
      "  border: 1px solid rgb(255 255 255 / .1);",
      "  transform: translateZ(0);",
      "}",
    ],
  },
  {
    id: "js",
    label: "Motion",
    pill: "SCROLL SYNC",
    title: "The vertical SVG route draws as the cards come alive.",
    desc: "Scroll progress drives the path while each card keeps its own hover physics, canvas loop, and code reveal.",
    icon: <Code2 className="h-5 w-5" />,
    glowColor: "#fa520f",
    accentClass: "text-[#fa520f]",
    lines: [
      "const { scrollYProgress } = useScroll({",
      "  target: sectionRef,",
      '  offset: ["start center", "end center"]',
      "})",
      "pathLength.set(scrollYProgress)",
    ],
  },
]

function drawLab(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const lanes = 5
  ctx.lineWidth = 1
  for (let i = 0; i < lanes; i++) {
    const y = h * (0.18 + i * 0.16)
    ctx.beginPath()
    ctx.moveTo(w * 0.08, y)
    ctx.bezierCurveTo(w * 0.28, y - 24, w * 0.5, y + 24, w * 0.72, y)
    ctx.bezierCurveTo(w * 0.84, y - 12, w * 0.9, y + 10, w * 0.96, y)
    ctx.strokeStyle = `rgba(251, 100, 36, ${0.12 + i * 0.025})`
    ctx.stroke()

    const p = (t * 0.006 + i * 0.17) % 1
    const x = w * (0.08 + p * 0.88)
    const pulse = (Math.sin(t * 0.05 + i) + 1) / 2
    ctx.beginPath()
    ctx.arc(x, y + Math.sin(p * Math.PI * 4) * 18, 2.5 + pulse * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(251, 100, 36, ${0.45 + pulse * 0.35})`
    ctx.fill()
  }
}

function drawHtml(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const blocks = 7
  for (let i = 0; i < blocks; i++) {
    const x = w * (0.14 + (i % 3) * 0.24)
    const y = h * (0.18 + Math.floor(i / 3) * 0.24)
    const drift = Math.sin(t * 0.025 + i) * 6
    ctx.strokeStyle = `rgba(255, 161, 16, ${0.15 + (i % 3) * 0.05})`
    ctx.fillStyle = `rgba(255, 161, 16, ${0.035 + (i % 2) * 0.02})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(x + drift, y - drift, w * 0.16, h * 0.12, 10)
    ctx.fill()
    ctx.stroke()
  }

  ctx.font = `${Math.max(18, w * 0.07)}px monospace`
  ctx.fillStyle = "rgba(255, 161, 16, 0.26)"
  ctx.fillText("</>", w * 0.66 + Math.sin(t * 0.03) * 8, h * 0.68)
}

function drawCss(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cols = 9
  for (let i = 0; i < cols; i++) {
    const x = w * 0.12 + i * (w * 0.085)
    const height = h * (0.18 + ((Math.sin(t * 0.045 + i * 0.7) + 1) / 2) * 0.28)
    ctx.fillStyle = `rgba(255, 217, 0, ${0.14 + i * 0.012})`
    ctx.fillRect(x, h * 0.76 - height, w * 0.045, height)
  }

  ctx.beginPath()
  ctx.setLineDash([6, 8])
  ctx.strokeStyle = "rgba(255, 217, 0, 0.18)"
  ctx.lineWidth = 1
  ctx.moveTo(w * 0.08, h * 0.32)
  for (let x = w * 0.08; x <= w * 0.94; x += 16) {
    ctx.lineTo(x, h * 0.32 + Math.sin(x * 0.025 + t * 0.04) * 24)
  }
  ctx.stroke()
  ctx.setLineDash([])
}

function drawJs(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2
  const cy = h / 2
  for (let ring = 0; ring < 4; ring++) {
    const r = Math.min(w, h) * (0.14 + ring * 0.075)
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(250, 82, 15, ${0.08 + ring * 0.035})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  for (let i = 0; i < 8; i++) {
    const angle = t * 0.012 + i * ((Math.PI * 2) / 8)
    const r = Math.min(w, h) * (0.23 + (i % 2) * 0.08)
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    ctx.beginPath()
    ctx.arc(x, y, 2.4, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(250, 82, 15, 0.58)"
    ctx.fill()
  }
}

function useCanvas(
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let t = 0
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const tick = () => {
      t += 1
      ctx.clearRect(0, 0, width, height)
      if (width > 0 && height > 0) drawFn(ctx, width, height, t)
      raf = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    tick()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [drawFn])

  return canvasRef
}

const DRAWERS: Record<CardTone, (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void> = {
  lab: drawLab,
  html: drawHtml,
  css: drawCss,
  js: drawJs,
}

const AnimatedCardShell = memo(function AnimatedCardShell({
  card,
  active,
  index,
}: {
  card: CodeCard
  active: boolean
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useCanvas(DRAWERS[card.id])
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4])
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4])
  const spotlight = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) =>
      `radial-gradient(720px circle at ${((mx as number) + 0.5) * 100}% ${
        ((my as number) + 0.5) * 100
      }%, ${card.glowColor}24, transparent 62%)`
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 56, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.45, once: false }}
      transition={{ type: "spring", stiffness: 92, damping: 20, delay: index * 0.03 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative min-h-[560px] overflow-hidden rounded-[16px] border border-[#D1CDC7] bg-[#FCFBFA] shadow-[0_30px_70px_-38px_rgba(0,0,0,0.9)]"
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45 mix-blend-screen transition-opacity duration-700 group-hover:opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 border border-[#D1CDC7] [mask-image:linear-gradient(to_bottom,white,transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F3F0EE] via-[#F3F0EE]/92 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[560px] flex-col justify-between p-5 sm:p-7" style={{ transform: "translateZ(36px)" }}>
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-full border border-[#D1CDC7] bg-[#FCFBFA] px-4 py-1.5 backdrop-blur-xl">
            <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.28em] ${card.accentClass}`}>
              {card.pill}
            </span>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#D1CDC7] bg-[#FCFBFA] backdrop-blur-xl transition-transform duration-500 group-hover:scale-110 ${card.accentClass}`}>
            {card.icon}
          </div>
        </div>

        <div className="mt-auto">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.24em] text-[#696969]/80">
            {card.label}
          </span>
          <h3 className="max-w-[560px] text-2xl font-black leading-tight text-[#141413] sm:text-3xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            {card.title}
          </h3>
          <p className="mt-4 max-w-[520px] text-sm leading-7 text-[#696969] sm:text-[15px]">
            {card.desc}
          </p>

          <div className="mt-7 overflow-hidden rounded-[12px] border border-[#D1CDC7] bg-[#F3F0EE]/90 p-4 shadow-[inset_0_1px_0_rgba(20,20,19,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2 border-b border-[#D1CDC7] pb-3">
              <span className="h-2 w-2 rounded-full bg-[#fb6424]" />
              <span className="h-2 w-2 rounded-full bg-[#ffa110]" />
              <span className="h-2 w-2 rounded-full bg-[#ffd900]" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A39C92]">
                {card.id}.motion
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-[12px] leading-6 text-[#141413]/90 sm:text-[13px]">
              {card.lines.map((line, lineIndex) => (
                <AnimatedCodeLine
                  key={`${card.id}-${lineIndex}`}
                  active={active}
                  line={line}
                  lineIndex={lineIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
})

function AnimatedCodeLine({
  active,
  line,
  lineIndex,
}: {
  active: boolean
  line: string
  lineIndex: number
}) {
  return (
    <div className="whitespace-pre">
      {line.split("").map((char, charIndex) => (
        <span
          key={`${lineIndex}-${charIndex}-${char}`}
          className={`inline-block transition-[opacity,transform,filter] duration-500 ease-out ${
            active ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-[2px]"
          }`}
          style={{ transitionDelay: `${lineIndex * 90 + charIndex * 12}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}

function VerticalRouteGraphic({
  progress,
  activeIndex,
}: {
  progress: ReturnType<typeof useSpring>
  activeIndex: number
}) {
  const stations = [
    { y: 88, label: "00" },
    { y: 256, label: "01" },
    { y: 428, label: "02" },
    { y: 606, label: "03" },
  ]

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-[16px] border border-[#D1CDC7] bg-[#FCFBFA]/90 p-5 shadow-[inset_0_1px_0_rgba(20,20,19,0.08)] backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-[#D1CDC7] bg-white/[0.04] text-[#fb6424]">
          <Route className="h-4 w-4" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#696969]/80">Scroll Route</p>
          <p className="text-sm font-semibold text-[#141413]/85">Vertical signal path</p>
        </div>
      </div>

      <svg aria-hidden="true" viewBox="0 0 220 720" className="h-[calc(100%-72px)] w-full">
        <defs>
          <linearGradient id="softreeVerticalPath" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fb6424" />
            <stop offset="38%" stopColor="#ffa110" />
            <stop offset="68%" stopColor="#ffd900" />
            <stop offset="100%" stopColor="#fa520f" />
          </linearGradient>
          <filter id="routeSoftLight" x="-30%" y="-10%" width="160%" height="120%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <path
          d="M110 18 C52 74 170 120 112 178 C52 236 168 278 110 338 C52 398 170 444 112 502 C54 560 168 606 110 690"
          fill="none"
          stroke="rgba(20,20,19,0.10)"
          strokeLinecap="round"
          strokeWidth="22"
        />
        <motion.path
          d="M110 18 C52 74 170 120 112 178 C52 236 168 278 110 338 C52 398 170 444 112 502 C54 560 168 606 110 690"
          fill="none"
          stroke="url(#softreeVerticalPath)"
          strokeLinecap="round"
          strokeWidth="16"
          strokeDasharray="1 0"
          style={{ pathLength: progress }}
          filter="url(#routeSoftLight)"
          opacity="0.45"
        />
        <motion.path
          d="M110 18 C52 74 170 120 112 178 C52 236 168 278 110 338 C52 398 170 444 112 502 C54 560 168 606 110 690"
          fill="none"
          stroke="url(#softreeVerticalPath)"
          strokeLinecap="round"
          strokeWidth="6"
          strokeDasharray="1 0"
          style={{ pathLength: progress }}
        />

        {stations.map((station, index) => {
          const isActive = activeIndex >= index
          return (
            <g key={station.label}>
              <circle cx="110" cy={station.y} r="20" fill="#0d1015" stroke="rgba(20,20,19,0.12)" />
              <motion.circle
                cx="110"
                cy={station.y}
                r="10"
                animate={{
                  scale: isActive ? [1, 1.18, 1] : 1,
                  opacity: isActive ? 1 : 0.32,
                }}
                transition={{ duration: 1.6, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                fill={isActive ? "#fb6424" : "rgba(20,20,19,0.22)"}
              />
              <text
                x="150"
                y={station.y + 4}
                fill={isActive ? "rgba(20,20,19,0.80)" : "rgba(20,20,19,0.28)"}
                fontFamily="monospace"
                fontSize="12"
                letterSpacing="2"
              >
                {station.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function LCVerticalCodePath() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 35%"],
  })
  const rawProgress = useTransform(scrollYProgress, [0.04, 0.96], [0, 1])
  const smoothProgress = useSpring(rawProgress, { stiffness: 80, damping: 24, mass: 0.4 })

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(CODE_CARDS.length - 1, Math.max(0, Math.floor(value * CODE_CARDS.length)))
    setActiveIndex(nextIndex)
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F3F0EE] px-4 py-24 text-[#141413] sm:px-6 md:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,19,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(20,20,19,0.028)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#080a0d_0%,rgba(8,10,13,0)_16%,rgba(8,10,13,0)_84%,#080a0d_100%)]" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(300px,420px)_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100dvh-8rem)]">
          <div className="mb-6">
            <span className="mb-4 inline-flex rounded-full border border-[#D1CDC7] bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#696969]">
              Front-End Build System
            </span>
            <h2 className="max-w-[12ch] text-4xl font-black leading-none text-[#141413] sm:text-5xl" style={{ fontFamily: "Outfit, sans-serif" }}>
              Scroll through the code path.
            </h2>
            <p className="mt-5 max-w-[34ch] text-sm leading-7 text-[#696969]">
              A vertical SVG route draws with the page while each code card animates its own canvas, spotlight, and typed content.
            </p>
          </div>
          <VerticalRouteGraphic progress={smoothProgress} activeIndex={activeIndex} />
        </aside>

        <div className="flex flex-col gap-10 lg:gap-24 lg:py-[18vh]">
          {CODE_CARDS.map((card, index) => (
            <AnimatedCardShell
              key={card.id}
              card={card}
              index={index}
              active={activeIndex >= index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LCVerticalCodePath

