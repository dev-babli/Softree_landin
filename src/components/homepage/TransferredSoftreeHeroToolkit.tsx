"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AnimatedRadialCarousel from "@/components/homepage-light/AnimatedRadialCarousel"
import { EASE } from "@/lib/motion"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────── Assets ──────────────────────────── */
const ASSET_BG = "/Hero/hero_BG.png"
const ASSET_SUBJECT = "/Hero/hero_subject_wide.png"
const ASSET_REF = "/Hero/reference.png"

const CARD_SIZE = "w-[clamp(240px,22vw,380px)] aspect-[0.8]"

/* ────────────────── Hero Subject Alignment Controls ──────────────────
 * Tweak these four values to position and size the VR subject image.
 *   - SUBJECT_LEFT   : horizontal offset (negative = nudge left)
 *   - SUBJECT_BOTTOM : vertical offset from bottom (higher % = subject higher)
 *   - SUBJECT_WIDTH  : container width (>100% = overflow horizontally)
 *   - SUBJECT_HEIGHT : container height (>100% = zoom-in effect)
 * ──────────────────────────────────────────────────────────────────── */
const SUBJECT_LEFT = "-3%"
const SUBJECT_BOTTOM = "0%"
const SUBJECT_WIDTH = "104vw"
const SUBJECT_HEIGHT = "1115%"

/* Cinematic easings — tuned for buttery continuous motion.
 * Aliased from the shared @/lib/motion system so the whole site
 * speaks the same motion language. */
const EASE_SMOOTH = EASE.smooth     // sine-like, continuous (no start/stop feel)
const EASE_EXPO_OUT = EASE.silk      // luxurious decelerated arrival
const EASE_IMPLODE = EASE.implode    // sharp gravity-like pull-in
const EASE_GENTLE = "cubic-bezier(0.4, 0, 0.2, 1)" // material crossfade

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
      /* Visible-immediately entrance — refines into focus instead of
       * materializing from nothing. Better LCP, no "empty hero" perceived gap. */
      gsap.fromTo(
        q(".hero-title"),
        { opacity: 0.3, y: 12, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "expo.out" }
      )
      gsap.fromTo(
        q(".hero-scarcity"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.1 }
      )
      gsap.fromTo(
        q(".hero-p"),
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 0.15 }
      )
      gsap.fromTo(
        q(".hero-btn"),
        { opacity: 0, y: 12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out", delay: 0.3 }
      )

      /* ── Scroll-driven scene — auto-play with velocity-aware completion.
       *    Goal: preserve the cinematic auto-play rhythm (timeline plays at
       *    its own ~3.3s pace), but guarantee the animation always completes
       *    before the pin releases — even on rapid scrolls.
       *
       *    Strategy: monitor scroll progress through the pin range. If the
       *    user has scrolled further than the timeline has played, pull the
       *    timeline forward to keep up (never backward — slow scrollers
       *    still see normal pacing). On reverse, mirror it. ── */
      const tl = gsap.timeline({ paused: true })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=1 top",
        end: "+=130%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => tl.play(),
        onEnterBack: () => tl.reverse(),
        onUpdate: (self) => {
          /* Keep timeline progress at least as far along as scroll progress
           * when scrolling forward (forces completion on fast scrolls), and
           * at most as far back as scroll progress when scrolling back. */
          const scrollP = self.progress
          const tlP = tl.progress()
          if (self.direction === 1 && scrollP > tlP) {
            tl.progress(scrollP)
          } else if (self.direction === -1 && scrollP < tlP) {
            tl.progress(scrollP)
          }
        },
        onLeave: () => {
          if (tl.progress() < 1) tl.progress(1)
        },
        onLeaveBack: () => {
          if (tl.progress() > 0) tl.progress(0)
        },
      })

      tl.addLabel("burst", 0)

      /* ═══════════════════════════════════════════════════════════════════
       * All beats overlap heavily for continuous, buttery motion.
       * No dead time — every new beat begins while the previous is resolving.
       * ═══════════════════════════════════════════════════════════════════ */

      /* ── ACT 1: Hero text dissolves (0.0s → 0.75s) ── */
      tl.to(q(".hero-title"), { opacity: 0, y: -40, filter: "blur(8px)", duration: 0.7, ease: EASE_SMOOTH }, "burst")
      tl.to(q(".hero-p"), { opacity: 0, y: -28, filter: "blur(5px)", duration: 0.65, ease: EASE_SMOOTH }, "burst+=0.05")
      tl.to(q(".hero-btn"), { opacity: 0, y: -20, scale: 0.96, duration: 0.55, ease: EASE_SMOOTH }, "burst+=0.1")
      tl.set(q(".hero-text-cluster"), { autoAlpha: 0, pointerEvents: "none" }, "burst+=0.75")

      /* ── ACT 2: World crossfade (0.1s → 1.15s) ──
       * Global BG/subject fade out slowly while card inner image fades in.
       * Only one VR subject visible at a time. */
      tl.to(q(".global-bg"), { opacity: 0, duration: 1.05, ease: EASE_GENTLE }, "burst+=0.1")
      tl.to(q(".global-subject"), { opacity: 0, duration: 1.05, ease: EASE_GENTLE }, "burst+=0.1")
      tl.fromTo(q(".card-inner-bg"),
        { opacity: 0 },
        { opacity: 1, duration: 1.05, ease: EASE_GENTLE },
        "burst+=0.1"
      )

      /* ── ACT 3: Mask flood (0.2s → 1.3s) — luxurious expansion ── */
      tl.fromTo(q(".mask-expander"),
        { boxShadow: "0 0 0 0vw #f6f6f6" },
        { boxShadow: "0 0 0 170vw #f6f6f6", duration: 1.1, ease: EASE_EXPO_OUT },
        "burst+=0.2"
      )

      /* ── ACT 4: Card INHALE → IMPLODE (0.9s → 1.85s) ──
       * One continuous breath: grows for anticipation, then collapses smoothly.
       * EASE_SMOOTH on inhale + EASE_IMPLODE on collapse = no start/stop feel. */
      tl.to(q(".center-card"),
        { scale: 1.08, duration: 0.45, ease: EASE_SMOOTH },
        "burst+=0.9"
      )
      tl.to(q(".center-card"),
        { scale: 0.15, opacity: 0, filter: "blur(16px)", y: -30, duration: 0.6, ease: EASE_IMPLODE },
        "burst+=1.3"
      )

      /* ── ACT 5: Two-layer pulse (1.25s → 2.3s) ──
       * Bright inner flash (fast) + soft outer bloom (slow, reaches further). */
      tl.fromTo(q(".portal-pulse"),
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1.6, duration: 0.5, ease: EASE_EXPO_OUT },
        "burst+=1.25"
      )
      tl.to(q(".portal-pulse"),
        { opacity: 0, scale: 2.6, duration: 0.75, ease: EASE_SMOOTH },
        "burst+=1.55"
      )

      /* ── ACT 6: Carousel manifests (1.4s → 2.5s) ──
       * Starts BEFORE the pulse fully fades — overlapping reveal.
       * Uses blur-to-sharp + scale for "portal crystallising" feel. */
      tl.fromTo(q(".toolkit-carousel"),
        { opacity: 0, scale: 0.86, filter: "blur(24px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: EASE_EXPO_OUT },
        "burst+=1.4"
      )

      /* ── ACT 7: Activate card stagger (1.85s) —
       * Dummy tween fires state forward + reverse cleanly. */
      tl.to({}, {
        duration: 0.01,
        onStart: () => setCarouselActive(true),
        onReverseComplete: () => setCarouselActive(false),
      }, "burst+=1.85")

      /* ── ACT 8: Description reveal (1.9s → 2.9s) ──
       * Starts WHILE carousel is still manifesting — overlapping storytelling. */
      tl.fromTo(q(".toolkit-description"),
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: EASE_EXPO_OUT },
        "burst+=1.9"
      )
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative min-h-dvh w-full shrink-0 overflow-hidden bg-[#f6f6f6]">
      <div className="sticky top-0 flex min-h-dvh w-full flex-col items-center overflow-hidden">

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
            className="global-subject pointer-events-none absolute block"
            style={{
              left: SUBJECT_LEFT,
              bottom: SUBJECT_BOTTOM,
              width: SUBJECT_WIDTH,
              height: SUBJECT_HEIGHT,
            }}
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
          className="pointer-events-none absolute inset-0 z-1 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ═══════════════ 2. MASK EXPANDER (light burst) ═══════════════ */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center">
          <div
            className={`mask-wrapper absolute ${CARD_SIZE} origin-bottom z-1`}
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-35 flex items-end justify-center">
          <div
            className={`center-card relative ${CARD_SIZE} origin-bottom`}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <div
              className="card-inner-bg absolute inset-0 overflow-hidden rounded-xl bg-[#1a2a3a] opacity-0"
              style={{ willChange: "opacity" }}
            >
              <Image
                src={ASSET_REF}
                alt="Softree VR Expert"
                fill
                priority
                className="object-cover"
              />
              {/* Subtle gradient on card for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
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
            {/* Label — fades in with the inner image so the card reads as empty frame first */}
            <div
              className="card-inner-bg absolute inset-x-0 bottom-0 z-2 rounded-b-xl bg-linear-to-t from-black/80 via-black/20 to-transparent p-5 opacity-0"
              style={{ willChange: "opacity" }}
            >
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
        <div className="hero-text-cluster pointer-events-none absolute inset-0 z-30 flex flex-col justify-center pb-[20vh] pl-[6vw] pr-[4vw] pt-[12vh] sm:pl-[8vw]">
          <div className="pointer-events-auto max-w-[640px] text-left">
            <h1
              className="hero-title text-[clamp(44px,5.8vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:whitespace-nowrap"
              style={{ willChange: "transform, opacity" }}
            >
              Build. Ship. Scale.
            </h1>
            <div
              className="hero-scarcity mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
              style={{ willChange: "transform, opacity" }}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              Available for 2 new projects · Q2 2026
            </div>
            <p
              className="hero-p mt-5 max-w-[380px] text-[15px] font-normal leading-[1.55] text-white/80"
              style={{ willChange: "transform, opacity" }}
            >
              Simplify your enterprise tech. Our senior engineers ship production-grade AI, web, and Microsoft solutions — fast.
            </p>
            <Link
              href="/contact"
              className="hero-btn group/cta mt-8 inline-flex items-center gap-3 rounded-full bg-zinc-950 pl-7 pr-2 py-2 text-[14px] font-semibold text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-px hover:bg-zinc-800 hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="relative block h-[18px] overflow-hidden">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cta:-translate-y-full">
                  Book a 15-min call
                </span>
                <span className="absolute inset-x-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cta:-translate-y-full">
                  Book a 15-min call
                </span>
              </span>
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="absolute inset-0 m-auto text-zinc-950 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cta:translate-x-[200%]"
                >
                  <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="absolute inset-0 m-auto -translate-x-[200%] text-zinc-950 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cta:translate-x-0"
                >
                  <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:scale-110" style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=14)" }} aria-hidden />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:scale-110" style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=32)" }} aria-hidden />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:scale-110" style={{ backgroundImage: "url(https://i.pravatar.cc/64?img=47)" }} aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-white">2.3M+</span>
                <span className="mt-1 text-[11px] leading-[1.4] text-white/60">
                  Trusted by millions across 140 countries
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ 6. TOOLKIT CONTENT (reveals after burst) ═══════════════ */}
        {/* Osmo-layout: carousel arc at top, description anchored to bottom */}
        <div className="pointer-events-none absolute inset-0 z-40">

          {/* ── Cards arc — flows from the top naturally ── */}
          <div
            className="toolkit-carousel pointer-events-auto w-full opacity-0"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <AnimatedRadialCarousel active={carouselActive} />
          </div>

          {/* ── Osmo-style description — absolutely anchored below the arc ── */}
          <div
            className="toolkit-description pointer-events-auto absolute inset-x-0 bottom-[8vh] px-4 text-center opacity-0 md:px-8"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="mx-auto max-w-[680px] text-[clamp(18px,2.4vw,32px)] font-medium leading-[1.3] tracking-[-0.025em] text-[#111111]">
              Softree is a global delivery partner delivering{" "}
              <span className="text-[#6C42F5]">AI solutions</span>,{" "}
              Microsoft platforms, SaaS products, and scalable{" "}
              <span className="text-[#1852FF]">web applications</span>{" "}
              for growing businesses and enterprises.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TransferredSoftreeHeroToolkit
