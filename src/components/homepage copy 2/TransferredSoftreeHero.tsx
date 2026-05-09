"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────── Assets ──────────────────────────── */
const ASSET_BG = "/Hero/hero_BG.png"
const ASSET_SUBJECT = "/Hero/hero_subject_wide.png"
const ASSET_REF = "/Hero/reference.png"

/* Uniform card size */
const CARD_SIZE = "w-[clamp(240px,22vw,380px)] aspect-[0.8]"

export function TransferredSoftreeHero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const q = gsap.utils.selector(containerRef)

      /* ── 0. Entrance animations (on load, NOT scroll) ── */
      /* Keep blur only here — these run ONCE, not per-frame during scrub */
      gsap.fromTo(
        q(".hero-title"),
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: "expo.out" }
      )
      gsap.fromTo(
        q(".hero-p"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", delay: 0.2 }
      )
      gsap.fromTo(
        q(".hero-btn"),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.35 }
      )

      /* ── 1. Auto-play timeline via ScrollTrigger direction ── */
      /* Timeline is paused; ScrollTrigger pins the hero and plays the timeline
       * forward/reverse at its own pace (~2.2s) on scroll direction changes.
       * `start: "top+=1 top"` requires 1px of user scroll to activate —
       * prevents onEnter from firing on init (when viewport is at page top). */
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=1 top",
        end: "+=60%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        /* First scroll down → play forward */
        onEnter: () => tl.play(),
        /* Scrolling back up into pinned zone from below → reverse */
        onEnterBack: () => tl.reverse(),
        /* While pinned, if user keeps scrolling direction, keep playing
         * in that direction (lets them replay after a reverse). */
        onUpdate: (self) => {
          if (self.direction === 1 && tl.progress() < 0.01 && !tl.isActive()) {
            tl.play()
          } else if (self.direction === -1 && tl.progress() > 0.99 && !tl.isActive()) {
            tl.reverse()
          }
        },
      })

      tl.addLabel("burst", 0)

      /* ── Mask expansion (rectangular, from card borders) ── */
      tl.fromTo(q(".mask-expander"),
        { boxShadow: "0 0 0 0vw #fafaf9" },
        { boxShadow: "0 0 0 150vw #fafaf9", duration: 1 },
        "burst"
      )

      /* ── Card internals fade in ── */
      tl.to(q(".card-inner-bg"), { opacity: 1, duration: 0.6 }, "burst")
      tl.to(q(".card-ui"), { opacity: 1, duration: 0.5 }, "burst+=0.1")

      /* ── Frame + center card scale down ── */
      /* gsap-performance: only transform + opacity, all force3D via will-change CSS */
      tl.fromTo(q(".mask-wrapper"),
        { scale: 1.2 },
        { scale: 1.0, duration: 1 },
        "burst"
      )
      tl.fromTo(q(".center-card"),
        { scale: 1.2 },
        { scale: 1.0, duration: 1 },
        "burst"
      )

      /* ── Hero text dissolve (GPU-only: opacity + y + scale) ── */
      /* gsap-performance: NO filter:blur — it causes repaint per frame */
      tl.to(q(".hero-title"), { opacity: 0, y: -30, scale: 0.97, duration: 0.5 }, "burst")
      tl.to(q(".hero-p"), { opacity: 0, y: -20, duration: 0.4 }, "burst+=0.02")
      tl.to(q(".hero-btn"), { opacity: 0, y: -15, scale: 0.96, duration: 0.35 }, "burst+=0.04")
      tl.set(q(".hero-text-cluster"), { autoAlpha: 0, pointerEvents: "none" }, "burst+=0.55")

      /* ── Salary text reveal ── */
      tl.fromTo(q(".salary-text-cluster"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "burst+=0.25"
      )

      /* ── Side cards slide out ── */
      tl.fromTo(q(".left-card"),
        { xPercent: 0, opacity: 0, scale: 0.93 },
        { xPercent: -110, opacity: 1, scale: 1.0, duration: 0.7 },
        "burst+=0.15"
      )
      tl.fromTo(q(".right-card"),
        { xPercent: 0, opacity: 0, scale: 0.93 },
        { xPercent: 110, opacity: 1, scale: 1.0, duration: 0.7 },
        "burst+=0.15"
      )
    },
    { scope: containerRef }  // gsap-react: scope limits selectors to this component
  )

  return (
    <section ref={containerRef} className="relative h-screen w-full shrink-0 bg-[#fafaf9]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center">

        {/* ================= 1. GLOBAL LAYER ================= */}
        <div className="absolute inset-0 z-0 bg-[#1a2a3a]">
          <Image
            src={ASSET_BG}
            alt="Office background"
            fill
            priority
            className="object-cover origin-bottom"
            style={{ objectPosition: "20% 100%" }}
          />
          <div className="global-subject absolute bottom-0 pointer-events-none block" style={{ left: "0%", width: "102vw", height: "100%" }}>
            <Image
              src={ASSET_SUBJECT}
              alt="Softree VR Expert"
              fill
              priority
              className="object-contain object-bottom"
              draggable={false}
            />
          </div>
        </div>

        {/* ================= 2. THE EXPANDING MASK LAYER ================= */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none">
          <div
            className={`mask-wrapper absolute ${CARD_SIZE} origin-bottom z-[1]`}
            style={{ willChange: "transform" }}
          >
            <div className="mask-expander absolute inset-0 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* ================= 3. HERO TEXT (Single left column — Revolut style) ================= */}
        <div className="hero-text-cluster absolute inset-0 z-20 flex flex-col justify-center pt-[12vh] pb-[20vh] pl-[8vw] pr-[4vw] pointer-events-none">
          <div className="max-w-[640px] text-left pointer-events-auto">

            {/* Headline */}
            <h1
              className="hero-title text-white text-[clamp(36px,5.8vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] sm:whitespace-nowrap"
              style={{ willChange: "transform, opacity" }}
            >
              Build. Ship. Scale.
            </h1>

            {/* Description */}
            <p
              className="hero-p mt-6 max-w-[380px] text-white/80 text-[15px] leading-[1.55] font-normal"
              style={{ willChange: "transform, opacity" }}
            >
              Simplify your enterprise tech. Our senior engineers ship production-grade AI, web, and Microsoft solutions — fast.
            </p>

            {/* CTA */}
            <Link
              href="/services"
              className="hero-btn mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3.5 text-[14px] font-semibold text-white shadow-xl transition-colors hover:bg-zinc-800"
              style={{ willChange: "transform, opacity" }}
            >
              Get Started Free
            </Link>

            {/* 2.3M+ stat row */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span
                  className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=14)" }}
                  aria-hidden
                />
                <span
                  className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=32)" }}
                  aria-hidden
                />
                <span
                  className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=47)" }}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[26px] font-semibold tracking-[-0.02em] leading-none">2.3M+</span>
                <span className="mt-1 text-white/60 text-[11px] leading-[1.4]">
                  Trusted by 140+ enterprises worldwide
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= 4. SALARY TEXT (Fades In — DARK text on light bg) ================= */}
        <div
          className="salary-text-cluster absolute inset-0 z-20 flex flex-col items-center pt-[15vh] pointer-events-none opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-2xl text-center pointer-events-auto">
            <h2 className="text-zinc-900 text-[clamp(36px,4vw,64px)] font-black leading-none">
              Three pillars. One team.
            </h2>
            <p className="text-zinc-500 text-[clamp(14px,1.1vw,18px)] mt-4 max-w-sm mx-auto">
              Websites. AI Agents. Microsoft Solutions.
            </p>
          </div>
        </div>

        {/* ================= 5. VISUAL CLUSTER (The Carousel & Frame) ================= */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-center pointer-events-none">

          {/* Left Card — Websites (glassmorphic) */}
          <div
            className={`left-card absolute ${CARD_SIZE} rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]`}
            style={{
              background: "linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(20,30,50,0.95) 100%)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderTopColor: "rgba(255,255,255,0.4)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)",
              willChange: "transform, opacity",
            }}
          >
            <Image src="/whysoftree/ChatGPT Image May 3, 2026, 07_39_35 PM.png" alt="Websites & Apps" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
              <p className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Web &amp; Apps</p>
              <p className="text-white text-base font-bold leading-tight mt-1.5">Websites that convert</p>
              <Link href="/services/digital-workspace/web-app-development" className="mt-3 self-start inline-flex items-center gap-1.5 bg-white/90 text-zinc-900 text-xs font-bold px-4 py-2 rounded-full transition-all hover:bg-white pointer-events-auto shadow-sm">
                View work <span className="text-[10px]">→</span>
              </Link>
            </div>
          </div>

          {/* Right Card — AI (glassmorphic) */}
          <div
            className={`right-card absolute ${CARD_SIZE} rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]`}
            style={{
              background: "linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(20,30,50,0.95) 100%)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderTopColor: "rgba(255,255,255,0.4)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)",
              willChange: "transform, opacity",
            }}
          >
            <Image src="/whysoftree/ai.webp" alt="AI Agent" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col">
              <p className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">AI Agents</p>
              <p className="text-white text-base font-bold leading-tight mt-1.5">Agents that never stop</p>
              <Link href="/services/ai-intelligence/agentic-ai" className="mt-3 self-start inline-flex items-center gap-1.5 bg-white/90 text-zinc-900 text-xs font-bold px-4 py-2 rounded-full transition-all hover:bg-white pointer-events-auto shadow-sm">
                Meet agents <span className="text-[10px]">→</span>
              </Link>
            </div>
          </div>

          {/* Center Card (The Frame!) */}
          <div
            className={`center-card relative ${CARD_SIZE} origin-bottom z-[3]`}
            style={{ willChange: "transform" }}
          >

            {/* Card inner — reference.png */}
            <div className="card-inner-bg absolute inset-0 rounded-xl overflow-hidden bg-[#1a2a3a] opacity-0" style={{ willChange: "opacity" }}>
              <Image
                src={ASSET_REF}
                alt="Softree VR Expert"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Border Frame — visible from the start */}
            <div
              className="frame-border absolute inset-0 z-[4] rounded-xl pointer-events-none"
              style={{ border: "4px solid white", boxShadow: "0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1)" }}
            />

            {/* Card UI */}
            <div className="card-ui absolute inset-x-0 bottom-0 z-[4] opacity-0 pointer-events-none" style={{ willChange: "opacity" }}>
              <div className="bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-b-xl p-5 flex flex-col">
                <p className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Microsoft</p>
                <p className="text-white text-base font-bold leading-tight mt-1.5">Enterprise solutions</p>
                <Link href="/services/business-applications" className="mt-3 self-start inline-flex items-center gap-1.5 bg-white/90 text-zinc-900 text-xs font-bold px-4 py-2 rounded-full transition-all hover:bg-white pointer-events-auto shadow-sm">
                  Learn more <span className="text-[10px]">→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default TransferredSoftreeHero

