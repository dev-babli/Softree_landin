"use client"

import { motion } from "framer-motion"
import { Zap, ShieldCheck, Infinity as InfinityIcon, Check } from "lucide-react"

/* ====================================================================
 *  WHY CHOOSE US — replica of the Webflow "why-choose-us" block
 *
 *  Layout:
 *    · Tag pill: circle + "Why choose us"
 *    · Split heading:  "Engineered"  ←——→  "for excellence"
 *    · Central animated AI orb (CSS replacement for the source <video>)
 *    · Three floating feature cards positioned around the orb:
 *         _1 (left)    _2 (right)    _3 (bottom-center)
 *    · Each card: eyebrow tag · gradient icon · title · sub · check list
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Card = {
  id: "_1" | "_2" | "_3"
  eyebrow: string
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  sub: string
  bullets: string[]
}

const CARDS: Card[] = [
  {
    id: "_1",
    eyebrow: "Dedicated engineering",
    Icon: Zap,
    title: "Rapid Delivery",
    sub: "Cross-timezone pods shipping production-grade code every sprint.",
    bullets: ["UK, Middle East & Asia coverage", "Weekly deployable increments"],
  },
  {
    id: "_2",
    eyebrow: "Enterprise security",
    Icon: ShieldCheck,
    title: "AI-First Architecture",
    sub: "Agentic AI systems that parse, decide, and act across your stack.",
    bullets: ["Domain-trained AI agents", "Enterprise data governance"],
  },
  {
    id: "_3",
    eyebrow: "Cloud architecture",
    Icon: InfinityIcon,
    title: "Infinite Scalability",
    sub: "Microsoft platforms and cloud-native apps built for real traffic.",
    bullets: ["Azure & M365 expertise", "High-availability by default"],
  },
]

/* ──────────────────────────────────────────────────────────────────── */
/* Animated AI orb — replaces the source <video> with pure CSS         */
/* ──────────────────────────────────────────────────────────────────── */

function AIOrb() {
  return (
    <div
      aria-hidden
      className="relative grid place-items-center"
      style={{ width: "min(78vw, 560px)", aspectRatio: "1 / 1" }}
    >
      {/* outermost glow halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(108,66,245,0.55) 0%, rgba(24,82,255,0.30) 35%, rgba(24,82,255,0.10) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* mid bloom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "12%",
          background:
            "radial-gradient(circle at 40% 35%, rgba(180,150,255,0.85) 0%, rgba(108,66,245,0.55) 30%, rgba(24,40,120,0.45) 60%, transparent 80%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* core sphere */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: "62%",
          height: "62%",
          background:
            "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #C8B5FF 14%, #6C42F5 38%, #1E2380 70%, #08092A 100%)",
          boxShadow:
            "inset 0 0 60px rgba(255,255,255,0.25), inset -30px -40px 80px rgba(0,0,0,0.45), 0 0 60px rgba(108,66,245,0.45)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* orbiting highlight */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 25%, rgba(255,255,255,0.55) 0%, transparent 30%)",
            mixBlendMode: "screen",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {/* surface noise filaments */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(180,150,255,0.4) 60deg, rgba(255,255,255,0) 120deg, rgba(108,66,245,0.4) 200deg, rgba(255,255,255,0) 280deg, rgba(255,255,255,0.6) 340deg, rgba(255,255,255,0) 360deg)",
            mixBlendMode: "screen",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      {/* outer ring shimmer */}
      <motion.span
        aria-hidden
        className="absolute rounded-full border border-white/10"
        style={{ inset: "8%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────── */
/* Feature card                                                        */
/* ──────────────────────────────────────────────────────────────────── */

function WhyCard({
  card,
  index,
  className = "",
}: {
  card: Card
  index: number
  className?: string
}) {
  const { eyebrow, Icon, title, sub, bullets } = card
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.75, ease: EASE, delay: index * 0.08 }}
      className={`relative w-full max-w-[340px] rounded-3xl border border-white/10 bg-[#13142a]/85 p-5 backdrop-blur-2xl ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px -28px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02)",
      }}
    >
      {/* Eyebrow tag */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-[#6C42F5]"
          style={{ boxShadow: "0 0 6px rgba(108,66,245,0.9)" }}
        />
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/65">
          {eyebrow}
        </span>
      </div>

      {/* Top: icon block with gradient */}
      <div className="relative mt-5 flex items-start justify-between">
        <div
          className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(145deg, rgba(108,66,245,0.45) 0%, rgba(24,82,255,0.25) 60%, rgba(20,22,55,0.85) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 30px -16px rgba(108,66,245,0.5)",
          }}
        >
          <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
        </div>
        {/* corner watermark — stylized soft geometry, mirrors bg-logo-navbar */}
        <div
          aria-hidden
          className="pointer-events-none h-14 w-14 opacity-[0.18]"
          style={{
            background:
              "conic-gradient(from 121deg at 50% 50%, rgba(108,66,245,0.6), rgba(24,82,255,0.2), transparent 70%)",
            borderRadius: "50%",
            filter: "blur(8px)",
            transform: "rotate(121.32deg)",
          }}
        />
      </div>

      {/* Middle: title + sub */}
      <div className="mt-6">
        <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-white sm:text-[19px]">
          {title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-white/60">{sub}</p>
      </div>

      {/* Bottom: bullets */}
      <ul className="mt-5 flex flex-col gap-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white"
            >
              <Check className="h-3 w-3 text-[#0a0a1a]" strokeWidth={3} />
            </span>
            <span className="text-[13px] font-medium text-white/75">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────────────── */
/* Main section                                                        */
/* ──────────────────────────────────────────────────────────────────── */

export default function LightWhyChooseUs() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#08081a]">
      {/* ── Background layers ─────────────────────────────────────── */}
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
      {/* purple bloom top */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10"
        style={{
          left: "50%",
          top: "-10%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(108,66,245,0.32) 0%, rgba(108,66,245,0.10) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* hairlines */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-white/10"
      />
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-px bg-white/10"
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-24 md:px-10 md:py-32 lg:py-40">
        {/* ── Header: tag + split heading ─────────────────────────── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-[#6C42F5]"
              style={{ boxShadow: "0 0 8px rgba(108,66,245,0.9)" }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Why choose us
            </span>
          </div>

          {/* Split heading — two halves with gap */}
          <h2
            className="mt-8 flex flex-wrap items-baseline justify-center gap-x-[0.4em] gap-y-2 font-semibold text-white"
            style={{
              fontSize: "clamp(40px, 7.5vw, 110px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
            }}
          >
            <motion.span
              initial={{ x: "-6vw", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              Engineered
            </motion.span>
            <motion.span
              initial={{ x: "6vw", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
              className="italic text-white/85"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              for partnership
            </motion.span>
          </h2>
        </motion.div>

        {/* ── Stage: orb + cards ──────────────────────────────────── */}
        <div className="relative mt-16 lg:mt-24">
          {/* Orb — centered behind cards */}
          <div className="relative z-0 mx-auto flex justify-center">
            <AIOrb />
          </div>

          {/* Cards — flow on mobile, absolute around orb on desktop */}
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-0 lg:block">
            {/* Mobile / tablet — show all cards in flow */}
            <div className="contents lg:hidden">
              {CARDS.map((c, i) => (
                <WhyCard key={c.id} card={c} index={i} className="mx-auto" />
              ))}
            </div>

            {/* Desktop — absolute-positioned around the orb */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <div className="pointer-events-auto absolute left-0 top-[8%]">
                <WhyCard card={CARDS[0]} index={0} />
              </div>
              <div className="pointer-events-auto absolute right-0 top-[8%]">
                <WhyCard card={CARDS[1]} index={1} />
              </div>
              <div className="pointer-events-auto absolute bottom-[-4%] left-1/2 -translate-x-1/2">
                <WhyCard card={CARDS[2]} index={2} />
              </div>
            </div>
          </div>

          {/* Spacer to keep desktop card-3 inside the section */}
          <div className="hidden h-[160px] lg:block" />
        </div>
      </div>
    </section>
  )
}
