"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Calendar, ShieldCheck, Award, Headphones } from "lucide-react"

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Free, no-pressure discovery",
    body: "If we’re not the right fit, you still leave with a clear outcome roadmap.",
  },
  {
    icon: Award,
    title: "Senior-only delivery",
    body: "Your engagement is led by senior strategists and engineers — never juniors.",
  },
  {
    icon: Headphones,
    title: "Reply within 24 hours",
    body: "A real human reads every brief. No bots, no chase emails, no forms.",
  },
]

export function ConversionCTAStack() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <section
      ref={ref}
      id="book"
      className="relative w-full overflow-hidden bg-[#F4F5F7] py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,88,18,0.12),transparent_30%),radial-gradient(circle_at_82%_82%,rgba(24,82,255,0.14),transparent_32%)]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 lg:px-10">
        {/* Hero strip */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Big inkblock CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[32px] bg-[#0a0a1a] p-8 text-white sm:p-12 lg:p-14"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#FF5812]/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-[#1852FF]/30 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md">
                <span className="size-1.5 animate-pulse rounded-full bg-[#FF5812]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                  Now booking April 2026
                </span>
              </div>
              <h2 className="mt-7 text-[clamp(36px,5.4vw,72px)] font-medium leading-[0.95] tracking-[-0.05em]">
                Stop losing months to vendors who can’t ship.
              </h2>
              <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55] text-white/70">
                Book a 30-minute strategy call. Bring the messy whiteboard. Leave with a roadmap
                you can actually run, whether you choose Softree or not.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="#funnel"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-[#0a0a1a] shadow-[0_18px_44px_rgba(255,255,255,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Calendar className="size-4" />
                  Book a strategy call
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 text-[14px] font-medium text-white/85 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.08]"
                >
                  Read case studies
                  <span className="text-[12px] opacity-60">→</span>
                </Link>
              </div>

              {/* Microcopy ribbon */}
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[12px] text-white/55">
                <span className="font-mono uppercase tracking-[0.16em] text-white/40">
                  Trusted by
                </span>
                {["Series-B Fintech", "Healthcare Ops", "Enterprise IT", "Microsoft 365 Teams"].map(
                  (t) => (
                    <span key={t}>{t}</span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Pricing teaser card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-black/5 bg-white p-8 shadow-[0_24px_60px_rgba(15,15,15,0.06)]"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0a0a1a] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Pilot engagement
              </span>
              <h3 className="mt-6 text-[clamp(28px,3vw,40px)] font-medium leading-[1] tracking-[-0.04em] text-[#0a0a1a]">
                From $24k.
                <br />
                <span className="text-[#0a0a1a]/55">Live in 3 weeks.</span>
              </h3>
              <p className="mt-5 text-[14px] leading-[1.55] text-[#0a0a1a]/70">
                Most engagements start with a fixed-scope pilot. You see real software, real
                outcomes, and a clean exit if it’s not working.
              </p>

              <ul className="mt-6 grid gap-2.5 text-[13px] text-[#0a0a1a]/80">
                {[
                  "Senior strategist + tech lead",
                  "Working pilot in 3 weeks",
                  "Outcome scope written and signed",
                  "Cancel anytime — no lock-in",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-[#FF5812]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="#funnel"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#0a0a1a] px-5 py-3.5 text-[13px] font-semibold tracking-[-0.01em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a 60-second brief
              <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        {/* Guarantees */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {GUARANTEES.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_rgba(15,15,15,0.04)]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#0a0a1a] text-white">
                <g.icon className="size-4" />
              </span>
              <div>
                <p className="text-[14px] font-semibold tracking-[-0.02em] text-[#0a0a1a]">
                  {g.title}
                </p>
                <p className="mt-1 text-[13px] leading-[1.5] text-[#0a0a1a]/65">{g.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConversionCTAStack
