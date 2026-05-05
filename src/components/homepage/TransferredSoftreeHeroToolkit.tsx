"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import StaggeredReveal from "@/components/homepage-light/StaggeredReveal"
import AnimatedRadialCarousel from "@/components/homepage-light/AnimatedRadialCarousel"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────── Assets ──────────────────────────── */
const ASSET_BG = "/Hero/hero_BG.png"
const ASSET_SUBJECT = "/Hero/hero_subject_wide.png"
const ASSET_REF = "/Hero/reference.png"

const CARD_SIZE = "w-[clamp(240px,22vw,380px)] aspect-[0.8]"

/* Cinematic easings (based on Emil Kowalski / Ionic curves) */
const EASE_OUT_STRONG = "cubic-bezier(0.23, 1, 0.32, 1)"
const EASE_IN_OUT_STRONG = "cubic-bezier(0.77, 0, 0.175, 1)"

/**
 * TransferredSoftreeHeroToolkit — CINEMATIC VERSION
 *
 * Story beats (on scroll, pinned section):
 *   1. Hero holds (BG, VR subject, "Build. Ship. Scale.", framed center card).
 *   2. Hero text dissolves upward. BG + subject crossfade to white.
 *   3. Mask expander floods light outward.
 *   4. Center card INHALES (scales up slightly) → COLLAPSES into a pulse of light.
 *   5. Radial white pulse expands outward from the card's position (portal opens).
 *   6. Carousel ring MANIFESTS from the pulse: scale 0.85→1, blur 20→0, opacity 0→1.
 *   7. Cards LIGHT UP in stagger (angle-sorted from top). First card = the hero card.
 *   8. Title "AI Scale ✦ Built to Last" reveals. Description pills fade in.
 *   9. Ring begins slow continuous rotation (120s/rev, linear).
 */
export function TransferredSoftreeHeroToolkit() {
  const containerRef = useRef<HTMLElement>(null)
  const [carouselActive, setCarouselActive] = useState(false)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const q = gsap.utils.selector(containerRef)

      /* ── Entrance (on mount) ── */
      gsap.fromTo(
        q(".hero-title"),
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "expo.out" }
      )
      gsap.fromTo(
        q(".hero-p"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.15 }
      )
      gsap.fromTo(
        q(".hero-btn"),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "expo.out", delay: 0.3 }
      )

      /* ── Scroll-driven scene (paused timeline played/reversed by scroll dir) ── */
      const tl = gsap.timeline({ paused: true })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=1 top",
        end: "+=80%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => tl.play(),
        onEnterBack: () => tl.reverse(),
        onUpdate: (self) => {
          if (self.direction === 1 && tl.progress() < 0.01 && !tl.isActive()) tl.play()
          else if (self.direction === -1 && tl.progress() > 0.99 && !tl.isActive()) tl.reverse()
        },
      })

      tl.addLabel("burst", 0)

      /* ── ACT 1: Hero dissolves ── (0.0s – 0.5s) */
      tl.to(q(".hero-title"), { opacity: 0, y: -30, scale: 0.97, duration: 0.4, ease: "power3.inOut" }, "burst")
      tl.to(q(".hero-p"), { opacity: 0, y: -20, duration: 0.35, ease: "power3.inOut" }, "burst+=0.03")
      tl.to(q(".hero-btn"), { opacity: 0, y: -15, scale: 0.96, duration: 0.3, ease: "power3.inOut" }, "burst+=0.06")
      tl.set(q(".hero-text-cluster"), { autoAlpha: 0, pointerEvents: "none" }, "burst+=0.45")

      /* ── ACT 2: World fades to light ── (0.1s – 0.8s) */
      tl.to(q(".global-bg"), { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "burst+=0.15")
      tl.to(q(".global-subject"), { opacity: 0, scale: 1.05, duration: 0.7, ease: "power2.inOut" }, "burst+=0.15")

      /* ── ACT 3: Mask expander floods outward ── (0.2s – 0.9s) */
      tl.fromTo(q(".mask-expander"),
        { boxShadow: "0 0 0 0vw #f6f6f6" },
        { boxShadow: "0 0 0 150vw #f6f6f6", duration: 0.7, ease: "power3.out" },
        "burst+=0.2"
      )

      /* ── ACT 4: Hero card INHALES then COLLAPSES into pulse ── (0.35s – 1.0s) */
      /* Inhale — slight scale-up to signal "something is about to happen" */
      tl.to(q(".center-card"),
        { scale: 1.06, duration: 0.28, ease: "power2.out" },
        "burst+=0.35"
      )
      /* Collapse — card implodes with blur, becoming a pulse of light */
      tl.to(q(".center-card"),
        { scale: 0.25, opacity: 0, filter: "blur(10px)", duration: 0.45, ease: EASE_IN_OUT_STRONG },
        "burst+=0.6"
      )

      /* ── ACT 5: PULSE — radial glow expands outward from card position ── (0.7s – 1.3s) */
      tl.fromTo(q(".portal-pulse"),
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1.4, duration: 0.45, ease: "power2.out" },
        "burst+=0.7"
      )
      tl.to(q(".portal-pulse"),
        { opacity: 0, scale: 2.2, duration: 0.5, ease: "power2.in" },
        "burst+=1.1"
      )

      /* ── ACT 6: Carousel wrapper MANIFESTS from pulse ── (0.9s – 1.7s) */
      tl.fromTo(q(".toolkit-carousel"),
        { opacity: 0, scale: 0.85, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.75, ease: EASE_OUT_STRONG },
        "burst+=0.9"
      )

      /* ── ACT 7: Activate cards (stagger fade-in + rotation) ── (1.3s) */
      /* Use GSAP Call to trigger React state once */
      tl.call(() => setCarouselActive(true), undefined, "burst+=1.3")

      /* ── ACT 8: Title + description reveal ── (1.5s – 2.1s) */
      tl.fromTo(q(".toolkit-headline"),
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: EASE_OUT_STRONG },
        "burst+=1.5"
      )
      tl.fromTo(q(".toolkit-description"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT_STRONG },
        "burst+=1.7"
      )

      /* ── Reverse handling: deactivate carousel when timeline fully reverses ── */
      tl.eventCallback("onReverseComplete", () => setCarouselActive(false))
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative h-screen w-full shrink-0 overflow-hidden bg-[#f6f6f6]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden">

        {/* ═══════════════ 1. GLOBAL BG + SUBJECT ═══════════════ */}
        <div className="global-bg absolute inset-0 z-0 bg-[#1a2a3a]">
          <Image
            src={ASSET_BG}
            alt="Office background"
            fill
            priority
            className="origin-bottom object-cover"
            style={{ objectPosition: "20% 100%" }}
          />
          <div
            className="global-subject pointer-events-none absolute bottom-0 block"
            style={{ left: "0%", width: "102vw", height: "100%" }}
          >
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

        {/* Subtle dot grid on light bg — adds premium texture after mask burst */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ═══════════════ 2. MASK EXPANDER (light burst) ═══════════════ */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center">
          <div
            className={`mask-wrapper absolute ${CARD_SIZE} origin-bottom z-[1]`}
            style={{ willChange: "transform" }}
          >
            <div className="mask-expander pointer-events-none absolute inset-0 rounded-2xl" />
          </div>
        </div>

        {/* ═══════════════ 3. PORTAL PULSE (emerges from card position) ═══════════════ */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center">
          <div className={`relative ${CARD_SIZE} origin-bottom`}>
            <div
              className="portal-pulse absolute inset-0 rounded-full opacity-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(108,66,245,0.4) 30%, rgba(24,82,255,0.15) 55%, transparent 75%)",
                filter: "blur(20px)",
                willChange: "transform, opacity",
              }}
            />
          </div>
        </div>

        {/* ═══════════════ 4. CENTER CARD (hero frame — collapses into pulse) ═══════════════ */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] flex items-end justify-center">
          <div
            className={`center-card relative ${CARD_SIZE} origin-bottom`}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl bg-[#1a2a3a]">
              <Image
                src={ASSET_REF}
                alt="Softree VR Expert"
                fill
                priority
                className="object-cover"
              />
              {/* Subtle gradient on card for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Frame border */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{
                border: "4px solid white",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.1), 0 0 80px rgba(108,66,245,0.08)",
              }}
            />
            {/* Label */}
            <div className="absolute inset-x-0 bottom-0 z-[2] rounded-b-xl bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Microsoft
              </p>
              <p className="mt-1.5 text-base font-bold leading-tight text-white">
                Enterprise solutions
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════ 5. HERO TEXT (unchanged) ═══════════════ */}
        <div className="hero-text-cluster pointer-events-none absolute inset-0 z-30 flex flex-col justify-center pb-[20vh] pl-[8vw] pr-[4vw] pt-[12vh]">
          <div className="pointer-events-auto max-w-[640px] text-left">
            <h1
              className="hero-title whitespace-nowrap text-[clamp(44px,5.8vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
              style={{ willChange: "transform, opacity" }}
            >
              Build. Ship. Scale.
            </h1>
            <p
              className="hero-p mt-6 max-w-[380px] text-[15px] font-normal leading-[1.55] text-white/80"
              style={{ willChange: "transform, opacity" }}
            >
              Simplify your enterprise tech. Our senior engineers ship production-grade AI, web, and Microsoft solutions — fast.
            </p>
            <Link
              href="/services"
              className="hero-btn mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3.5 text-[14px] font-semibold text-white shadow-xl transition-colors hover:bg-zinc-800"
              style={{ willChange: "transform, opacity" }}
            >
              Get Started Free
            </Link>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=14)" }} aria-hidden />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=32)" }} aria-hidden />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=47)" }} aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-white">2.3M+</span>
                <span className="mt-1 text-[11px] leading-[1.4] text-white/60">
                  Trusted by millions across 140 countries
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ 6. TOOLKIT CONTENT (reveals after burst) ═══════════════ */}
        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-start px-4 pt-[5vh]">

          {/* Headline — AI Scale ✦ Built to Last */}
          <div
            className="toolkit-headline z-10 mb-3 flex w-full flex-wrap items-center justify-center gap-3 opacity-0 sm:gap-5 md:gap-7"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <StaggeredReveal
              text="AI Scale"
              className="text-[44px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-medium tracking-[-0.04em] text-[#111111] leading-none"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="shrink-0 text-[#6C42F5]"
            >
              <svg width="90" height="90" viewBox="0 0 24 24" fill="none" className="h-[40px] w-[40px] sm:h-[58px] sm:w-[58px] md:h-[76px] md:w-[76px]">
                <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" fill="currentColor" />
              </svg>
            </motion.div>
            <StaggeredReveal
              text="Built to Last"
              className="text-[44px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-medium tracking-[-0.04em] text-[#111111] leading-none"
            />
          </div>

          {/* Description with pills */}
          <div
            className="toolkit-description pointer-events-auto z-10 mx-auto mb-4 max-w-3xl text-center opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-[14px] font-normal leading-[1.9] tracking-tight text-[#111111] sm:text-[16px] md:text-[18px]">
              Platform packed with{" "}
              <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-[#eaeaea] px-3 py-0.5 text-[#111111]">
                <span className="text-[14px] font-medium tracking-tight">AI Agents</span>
              </span>
              {" "}&{" "}
              <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-[#eaeaea] px-3 py-0.5 text-[#111111]">
                <span className="text-[14px] font-medium tracking-tight">Next.js</span>
              </span>
              {" "}resources,{" "}
              <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-[#eaeaea] px-3 py-0.5 text-[#111111]">
                <span className="text-[14px] font-medium tracking-tight">enterprise</span>
              </span>
              {" "}components, and{" "}
              <span className="mx-1 inline-flex -translate-y-[2px] items-center justify-center rounded-md bg-[#eaeaea] px-3 py-0.5 text-[#111111]">
                <span className="text-[14px] font-medium tracking-tight">high-end</span>
              </span>
              {" "}UX.
            </p>
          </div>

          {/* Carousel */}
          <div
            className="toolkit-carousel pointer-events-auto flex w-full items-center justify-center opacity-0"
            style={{
              willChange: "transform, opacity, filter",
              transform: "scale(0.75)",
              transformOrigin: "top center",
            }}
          >
            <AnimatedRadialCarousel active={carouselActive} />
          </div>

        </div>

      </div>
    </section>
  )
}

export default TransferredSoftreeHeroToolkit
