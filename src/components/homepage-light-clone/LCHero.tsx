"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lottie from "lottie-react"
import websiteLottieData from "../../../public/whysoftree/4-3.json"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ASSET_BG = "/hero/hero_BG.png"
const ASSET_SUBJECT = "/hero/hero_subject_wide.png"
const ASSET_REF = "/hero/reference.png"
const ASSET_AI_GIF = "/gif_assetsforservices/1-1.gif"

const CARD_SIZE = "w-[clamp(240px,22vw,380px)] aspect-[0.8]"

export function LCHero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const q = gsap.utils.selector(containerRef)

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

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      tl.addLabel("burst", 0)

      tl.fromTo(q(".mask-expander"),
        { boxShadow: "0 0 0 0vw #F3F0EE" },
        { boxShadow: "0 0 0 150vw #F3F0EE", duration: 1 },
        "burst"
      )

      tl.to(q(".card-inner-bg"), { opacity: 1, duration: 0.6 }, "burst")
      tl.to(q(".card-ui"), { opacity: 1, duration: 0.5 }, "burst+=0.1")

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

      tl.to(q(".hero-title"), { opacity: 0, y: -30, scale: 0.97, duration: 0.5 }, "burst")
      tl.to(q(".hero-p"), { opacity: 0, y: -20, duration: 0.4 }, "burst+=0.02")
      tl.to(q(".hero-btn"), { opacity: 0, y: -15, scale: 0.96, duration: 0.35 }, "burst+=0.04")
      tl.set(q(".hero-text-cluster"), { autoAlpha: 0, pointerEvents: "none" }, "burst+=0.55")

      tl.fromTo(q(".salary-text-cluster"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "burst+=0.25"
      )

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
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative h-screen w-full shrink-0 bg-[#F3F0EE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center">

        {/* ================= 1. GLOBAL LAYER ================= */}
        <div className="absolute inset-0 z-0 bg-[#1a2533]">
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

        {/* ================= 3. HERO TEXT (Left-aligned) ================= */}
        <div className="hero-text-cluster absolute inset-0 z-20 flex flex-col justify-center pl-[12vw] pointer-events-none">
          <div className="max-w-[900px] text-left pointer-events-auto pb-[15vh]">
            <h1
              className="hero-title text-[#141413] text-[clamp(48px,5vw,80px)] font-black leading-[0.95] tracking-[-0.03em]"
              style={{ willChange: "transform, opacity" }}
            >
              Build. Ship.
              <br />
              <span className="text-[#696969]">Scale.</span>
            </h1>
            <p
              className="hero-p text-[#696969] text-[clamp(15px,1.1vw,18px)] mt-5 font-medium leading-relaxed max-w-[400px]"
              style={{ willChange: "transform, opacity" }}
            >
              Enterprise AI &amp; Microsoft solutions that move as fast as you do.
            </p>
            <Link
              href="/services"
              className="hero-btn inline-block mt-7 rounded-full bg-[#141413] px-7 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#262627] transition-colors"
              style={{ willChange: "transform, opacity" }}
            >
              Explore services →
            </Link>
            <Link
              href="/case-studies"
              className="hero-btn inline-block mt-7 ml-4 rounded-full border border-[#141413]/20 px-7 py-3.5 text-sm font-bold text-[#141413] hover:bg-[#141413]/5 transition-colors"
              style={{ willChange: "transform, opacity" }}
            >
              See our work →
            </Link>
          </div>
        </div>

        {/* ================= 4. SALARY TEXT (Fades In — DARK text on light bg) ================= */}
        <div
          className="salary-text-cluster absolute inset-0 z-20 flex flex-col items-center pt-[15vh] pointer-events-none opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-2xl text-center pointer-events-auto">
            <h2 className="text-[#141413] text-[clamp(36px,4vw,64px)] font-black leading-none">
              Three pillars. One team.
            </h2>
            <p className="text-[#696969] text-[clamp(14px,1.1vw,18px)] mt-4 max-w-sm mx-auto">
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
            <div className="absolute inset-0" style={{ transform: "scale(1.8)", transformOrigin: "center center" }}>
              <Lottie animationData={websiteLottieData} loop className="w-full h-full" />
            </div>
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
            <Image src={ASSET_AI_GIF} alt="AI Agent" fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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
            <div className="card-inner-bg absolute inset-0 rounded-xl overflow-hidden bg-[#1a2533] opacity-0" style={{ willChange: "opacity" }}>
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

export default LCHero
