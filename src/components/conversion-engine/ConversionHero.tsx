"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Calendar, ShieldCheck } from "lucide-react"

const TRUST = [
  { label: "Avg engagement", value: "$284k+" },
  { label: "Pipeline lift", value: "3.4×" },
  { label: "Time-to-pilot", value: "21 days" },
  { label: "Client retention", value: "98%" },
]

const ROTATING = ["AI agents.", "operations.", "portals.", "data stacks.", "growth."]

function AnimatedNumber({
  to,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  to: number
  prefix?: string
  suffix?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-30%" })
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => Math.round(v))
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const u = display.on("change", (v) => setShown(v))
    return u
  }, [display])

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => spring.set(to), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, spring, to, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}

export function ConversionHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [rotIndex, setRotIndex] = useState(0)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const sx = useSpring(mouseX, { stiffness: 90, damping: 20 })
  const sy = useSpring(mouseY, { stiffness: 90, damping: 20 })
  const orbX = useTransform(sx, (v) => v * 100)
  const orbY = useTransform(sy, (v) => v * 100)

  useEffect(() => {
    const id = setInterval(() => setRotIndex((i) => (i + 1) % ROTATING.length), 2400)
    return () => clearInterval(id)
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width)
    mouseY.set((e.clientY - r.top) / r.height)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative w-full overflow-hidden bg-[#0a0a1a] text-white"
    >
      {/* Mouse-follow ambient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-40 z-0 opacity-70"
        style={{
          background: useTransform(
            [orbX, orbY],
            ([x, y]) =>
              `radial-gradient(800px circle at ${x}% ${y}%, rgba(24,82,255,0.18), transparent 55%), radial-gradient(600px circle at ${100 - (x as number)}% ${100 - (y as number)}%, rgba(255,88,18,0.14), transparent 60%)`
          ),
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-12 px-4 py-24 lg:grid-cols-[1.18fr_1fr] lg:gap-16 lg:px-10 lg:py-32">
        {/* LEFT — Headline + CTAs */}
        <div className="flex flex-col">
          {/* Eyebrow chip */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-[#FF5812]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Free 30-min strategy call
            </span>
          </motion.div>

          {/* Headline with rotating word */}
          <h1 className="text-[clamp(40px,6vw,80px)] font-medium leading-[0.96] tracking-[-0.055em]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Ship enterprise-grade
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="block"
              >
                <span
                  className="relative inline-flex min-w-[1ch] items-baseline"
                  style={{ minWidth: 280 }}
                >
                  <motion.span
                    key={rotIndex}
                    initial={{ y: 22, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -22, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-gradient-to-r from-[#FF5812] via-[#FF8E53] to-[#1852FF] bg-clip-text text-transparent"
                  >
                    {ROTATING[rotIndex]}
                  </motion.span>
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="block text-white/70"
              >
                Built by Softree.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
            className="mt-7 max-w-[540px] text-[16px] leading-[1.55] text-white/65"
          >
            We replace fragmented tools with single, polished software your teams actually adopt — secure
            workflows, AI automation, and Microsoft-native delivery shipped in weeks, not quarters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#book"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-[#0a0a1a] shadow-[0_18px_44px_rgba(255,255,255,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Calendar className="size-4" />
              <span>Book a 30-min strategy call</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="#proof"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 text-[14px] font-medium text-white/85 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.08]"
            >
              <span>See client outcomes</span>
              <span className="text-[12px] opacity-60">→</span>
            </Link>
          </motion.div>

          {/* Trust microcopy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/55"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#1852FF]" />
              No-obligation discovery
            </span>
            <span>•</span>
            <span>Reply within 24h</span>
            <span>•</span>
            <span>NDA on request</span>
          </motion.div>
        </div>

        {/* RIGHT — Booking preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="relative"
        >
          <div
            className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(160deg,rgba(30,40,60,0.92),rgba(20,30,50,0.95))] p-7 shadow-[0_40px_90px_rgba(0,0,0,0.5)] backdrop-blur-md"
            style={{ borderTopColor: "rgba(255,255,255,0.4)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-[#FF5812] text-white">
                  <Calendar className="size-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold tracking-[-0.02em]">Strategy Session</p>
                  <p className="text-[11px] text-white/55">30 min · Free · Senior team only</p>
                </div>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                Live
              </span>
            </div>

            {/* Days */}
            <div className="mt-7 grid grid-cols-7 gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => {
                const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]
                const date = 14 + i
                const isActive = i === 2
                return (
                  <button
                    key={day}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-[11px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "border-[#FF5812] bg-[#FF5812] text-white"
                        : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="opacity-70">{day}</span>
                    <span className="text-[15px] font-semibold tabular-nums">{date}</span>
                  </button>
                )
              })}
            </div>

            {/* Time slots */}
            <div className="mt-5 grid grid-cols-3 gap-1.5">
              {["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-lg border py-2 text-[12px] font-medium transition-colors duration-200 ${
                    i === 2
                      ? "border-white/40 bg-white text-[#0a0a1a]"
                      : "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Confirm */}
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#1852FF] py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_rgba(24,82,255,0.45)] transition-transform duration-300 hover:-translate-y-0.5">
              Confirm Wed · 13:00 GMT
              <ArrowUpRight className="size-4" />
            </button>

            {/* Footnote */}
            <p className="mt-3 text-center text-[10.5px] text-white/45">
              Senior strategist + tech lead · Outcome roadmap delivered after the call
            </p>
          </div>

          {/* Floating success notification */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-5 -left-3 rounded-2xl border border-white/15 bg-[#0a0a1a]/90 px-4 py-3 shadow-[0_22px_50px_rgba(0,0,0,0.6)] backdrop-blur-md md:-left-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
              Just booked
            </p>
            <p className="mt-1 text-[13px] font-semibold tracking-[-0.02em]">
              Marcus · Director · Series B fintech
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] border-t border-white/10 px-4 py-5 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TRUST.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.08 }}
              className="flex flex-col gap-1"
            >
              <span className="text-[24px] font-semibold tracking-[-0.04em] text-white">
                {t.value === "$284k+" ? (
                  <>
                    <AnimatedNumber to={284} prefix="$" suffix="k+" delay={0.5 + i * 0.1} />
                  </>
                ) : t.value === "98%" ? (
                  <AnimatedNumber to={98} suffix="%" delay={0.5 + i * 0.1} />
                ) : (
                  t.value
                )}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConversionHero
