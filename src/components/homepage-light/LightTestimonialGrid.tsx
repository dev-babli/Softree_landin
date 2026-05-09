"use client"

import { motion } from "framer-motion"
import { Star, TrendingUp, Clock, Sparkles } from "lucide-react"

/* ====================================================================
 *  LIGHT — TESTIMONIAL GRID
 *  "Real Results. Real Client Success."
 *
 *  Layout:
 *   ┌──────────────┬───────────┬───────────┐
 *   │              │  198%     │  Emma     │
 *   │   100K+      │  Revenue  │  Rodriguez│
 *   │   Lucas      ├───────────┼───────────┤
 *   │   Dubois     │  Michael  │  68hr     │
 *   │              │  Grant    │  Weekly   │
 *   └──────────────┴───────────┴───────────┘
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Gradient headings ─────────────────────────────────────────────── */

function GradientClient() {
  // C(white) l(#E2E2CF) i(#91D991) e(#5ADDB4) n(#2FCFE4) t(#1498EB)
  const letters = [
    { ch: "C", color: "#111111" },
    { ch: "l", color: "#1F1F2E" },
    { ch: "i", color: "#1A8F3D" },
    { ch: "e", color: "#0E9C7E" },
    { ch: "n", color: "#0C7EA8" },
    { ch: "t", color: "#1852FF" },
  ]
  return (
    <>
      {letters.map((l, i) => (
        <span key={i} style={{ color: l.color }}>
          {l.ch}
        </span>
      ))}
    </>
  )
}

function GradientSuccess() {
  // Deep blue cascade through "Success."
  const letters = [
    { ch: "S", color: "#1852FF" },
    { ch: "u", color: "#1547EE" },
    { ch: "c", color: "#1342DE" },
    { ch: "c", color: "#1342DE" },
    { ch: "e", color: "#1342DE" },
    { ch: "s", color: "#1342DE" },
    { ch: "s", color: "#1342DE" },
    { ch: ".", color: "#103CCE" },
  ]
  return (
    <>
      {letters.map((l, i) => (
        <span key={i} style={{ color: l.color }}>
          {l.ch}
        </span>
      ))}
    </>
  )
}

/* ── Card shells ───────────────────────────────────────────────────── */

const cardShell =
  "relative overflow-hidden rounded-2xl border border-[#111]/[0.08] bg-white"
const cardShadow =
  "inset 0 1px 0 rgba(255,255,255,1), 0 1px 0 rgba(17,17,17,0.04), 0 20px 50px -28px rgba(17,17,17,0.18)"

/* ── Client row (avatar + name + rating) ───────────────────────────── */

function ClientRow({
  name,
  role,
  initial,
  gradientFrom,
  gradientTo,
}: {
  name: string
  role: string
  initial: string
  gradientFrom: string
  gradientTo: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white"
          style={{
            background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          {initial}
        </div>
        <div>
          <div className="text-[13.5px] font-semibold tracking-tight text-[#111]">
            {name}
          </div>
          <div className="text-[11.5px] text-[#111]/55">{role}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10.5px] font-medium text-[#111]/65">4.9</span>
        <Star
          className="h-3 w-3 fill-[#1852FF] text-[#1852FF]"
          strokeWidth={0}
        />
        <span className="text-[10.5px] font-medium text-[#111]/65">Rating</span>
      </div>
    </div>
  )
}

/* ── Individual testimonial boxes ──────────────────────────────────── */

function BigStatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`${cardShell} flex h-full flex-col justify-between p-7`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,82,255,0.10) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div className="relative">
        <div
          className="text-[clamp(56px,7vw,88px)] font-semibold leading-[0.95] tracking-[-0.04em]"
          style={{
            background: "linear-gradient(135deg, #111111 0%, #1852FF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          100K+
        </div>
        <p className="mt-3 max-w-[280px] text-[15px] leading-[1.5] text-[#111]/65">
          Helping Businesses Automate and Streamline with AI
        </p>
      </div>

      <div className="relative mt-8">
        <ClientRow
          name="Lucas Dubois"
          role="Marketer"
          initial="L"
          gradientFrom="#ff8a5b"
          gradientTo="#c73d1a"
        />
        <div className="mt-4 rounded-lg border border-[#111]/[0.06] bg-[#f6f6f6] p-4">
          <p className="text-[13px] leading-[1.55] text-[#111]/65">
            Easy to use, incredibly powerful, and made to scale — helping teams
            move quicker and perform at their best.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({
  value,
  label,
  sub,
  icon,
  delay = 0,
}: {
  value: string
  label: string
  sub: string
  icon: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={`${cardShell} flex h-full flex-col justify-between p-6`}
      style={{ boxShadow: cardShadow }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,82,255,0.10) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      <div className="relative flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(145deg, rgba(24,82,255,0.12), rgba(24,82,255,0.04))",
            border: "1px solid rgba(24,82,255,0.22)",
          }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div
            className="text-[34px] font-semibold leading-[0.95] tracking-[-0.03em]"
            style={{
              background:
                "linear-gradient(135deg, #111111 0%, #1852FF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {value}
          </div>
          <div className="mt-1 text-[13px] font-medium text-[#111]/70">
            {label}
          </div>
        </div>
      </div>
      <p className="relative mt-5 text-[12.5px] text-[#111]/55">{sub}</p>
    </motion.div>
  )
}

function QuoteCard({
  name,
  role,
  initial,
  gradientFrom,
  gradientTo,
  quote,
  delay = 0,
}: {
  name: string
  role: string
  initial: string
  gradientFrom: string
  gradientTo: string
  quote: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={`${cardShell} flex h-full flex-col justify-between p-6`}
      style={{ boxShadow: cardShadow }}
    >
      <ClientRow
        name={name}
        role={role}
        initial={initial}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
      />
      <p className="mt-5 text-[13px] leading-[1.55] text-[#111]/65">{quote}</p>
    </motion.div>
  )
}

/* ── Main ──────────────────────────────────────────────────────────── */

export default function LightTestimonialGrid() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#f6f6f6] py-24 sm:py-32 md:py-36">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(24,82,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span
            className="mb-5 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-tight text-[#1852FF]"
            style={{
              background: "rgba(24,82,255,0.08)",
              border: "1px solid rgba(24,82,255,0.22)",
            }}
          >
            Testimonial
          </span>
          <h2 className="max-w-[820px] text-[clamp(32px,5vw,54px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#111]">
            Real Results. Real <GradientClient /> <GradientSuccess />
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-[1.6] text-[#111]/55">
            Authentic experiences from the people we serve.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Big left card — spans both rows on md+ */}
          <div className="md:row-span-2">
            <BigStatCard />
          </div>

          {/* Top-middle — 198% stat */}
          <StatCard
            value="198%"
            label="Revenue Increase"
            sub="Automated Inventory Updates"
            icon={
              <TrendingUp className="h-5 w-5 text-[#1852FF]" strokeWidth={2} />
            }
            delay={0.1}
          />

          {/* Top-right — Emma quote */}
          <QuoteCard
            name="Emma Rodriguez"
            role="Marketer"
            initial="E"
            gradientFrom="#f9a8d4"
            gradientTo="#be185d"
            quote="User-friendly, powerful, and built for growth. Every feature feels designed to help teams move faster and get better results."
            delay={0.2}
          />

          {/* Bottom-middle — Michael quote */}
          <QuoteCard
            name="Michael Grant"
            role="Marketer"
            initial="M"
            gradientFrom="#86efac"
            gradientTo="#15803d"
            quote="User-friendly, powerful, and built for growth. Every feature feels designed to help teams move faster and get better results."
            delay={0.3}
          />

          {/* Bottom-right — 68hr stat */}
          <StatCard
            value="68hr"
            label="Weekly Saved"
            sub="Automated Data Entry"
            icon={
              <Clock className="h-5 w-5 text-[#1852FF]" strokeWidth={2} />
            }
            delay={0.4}
          />
        </div>

        {/* Subtle sparkle accent */}
        <div className="pointer-events-none absolute right-10 top-16 opacity-50">
          <Sparkles className="h-5 w-5 text-[#1852FF]" />
        </div>
      </div>
    </section>
  )
}
