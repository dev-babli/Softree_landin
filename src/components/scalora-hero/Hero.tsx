"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkle } from "lucide-react"
import AnimatedText from "./AnimatedText"
import RotatingWord from "./RotatingWord"
import IsometricCards from "./IsometricCards"

/* ====================================================================
 *  Scalora Hero — terracotta dark theme, 3D isometric card stack
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 10%, #4a1d0d 0%, #2a0f06 45%, #1a0a04 100%)",
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

      <div className="container relative z-10 mx-auto px-6 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-24 lg:px-10">
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
            <IsometricCards />
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
        {/* invisible sizing ghost */}
        <span className="invisible block whitespace-pre">{children}</span>
        {/* default text */}
        <span className="absolute inset-0 block translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* hover text */}
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </Link>
  )
}
