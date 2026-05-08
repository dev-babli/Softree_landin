"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkle } from "lucide-react"
import AnimatedText from "./AnimatedText"
import RotatingWord from "./RotatingWord"
import IsometricCardsv1 from "./IsometricCardsv1"

/* ====================================================================
 *  Scalora Hero v1 — terracotta dark theme + 3D isometric card stack
 *
 *  Composition:
 *    • Caption pill        — fade/lift on mount
 *    • H1 (3 lines)        — staggered letter rise via <AnimatedText/>
 *    • Rotating word       — slides through Build. → Scale. → Operate.
 *    • Description         — staggered word rise
 *    • Dual-text CTA       — group-hover slides text up & out
 *    • IsometricCardsv1    — perspective-tilted column stack
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Herov1() {
  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(130% 90% at 75% 5%, #5c2410 0%, #311208 40%, #180703 100%)",
      }}
    >
      {/* Ambient grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,180,140,0.7) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Soft top-right warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[15%] h-[55%] w-[55%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,140,90,0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 pb-20 pt-24 sm:px-8 sm:pt-28 md:pb-28 md:pt-32 lg:px-10 lg:pt-36">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
          {/* ── Left: copy ────────────────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Caption pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md"
            >
              <Sparkle className="h-3.5 w-3.5 text-orange-300" strokeWidth={2.2} />
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[12px] font-medium tracking-tight text-white/75">
                All in one ecosystem for your business
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="mt-7 font-semibold tracking-[-0.035em] text-white">
              <span className="block text-[clamp(40px,6.4vw,80px)] leading-[0.98]">
                <AnimatedText
                  text="The platform"
                  mode="letter"
                  stagger={0.02}
                  duration={0.7}
                />
              </span>
              <span className="mt-1 block text-[clamp(40px,6.4vw,80px)] leading-[0.98]">
                <AnimatedText
                  text="that helps you"
                  mode="letter"
                  stagger={0.02}
                  delay={0.15}
                  duration={0.7}
                />
              </span>
              <span className="mt-1 block text-[clamp(40px,6.4vw,80px)] leading-[0.98] text-orange-300">
                <RotatingWord
                  words={["Build.", "Scale.", "Operate."]}
                  interval={2400}
                />
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[520px] text-[15.5px] leading-[1.6] text-white/65">
              <AnimatedText
                text="Scalora is a business platform designed to help teams manage marketing, operations, and growth from one workspace."
                mode="word"
                stagger={0.025}
                delay={0.4}
                duration={0.6}
              />
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
              className="mt-9"
            >
              <CtaButton href="/contact">Get started free</CtaButton>
            </motion.div>
          </div>

          {/* ── Right: 3D card stack ──────────────────────────────────── */}
          <div className="relative">
            <IsometricCardsv1 />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA: dual-text slide on hover ───────────────────────────────── */

function CtaButton({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-12 items-center overflow-hidden rounded-full bg-white px-7 text-[14px] font-semibold tracking-tight text-[#1a0a04] shadow-[0_10px_30px_-10px_rgba(255,120,71,0.6)] transition-shadow duration-500 hover:shadow-[0_14px_40px_-10px_rgba(255,120,71,0.85)]"
    >
      <span className="relative block h-5 overflow-hidden">
        {/* Invisible sizing ghost — keeps button width stable */}
        <span className="invisible block whitespace-pre">{children}</span>
        {/* Default layer */}
        <span className="absolute inset-0 block translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Hover layer (slides up from below) */}
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </Link>
  )
}
