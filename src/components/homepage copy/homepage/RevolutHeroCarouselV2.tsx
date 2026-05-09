"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────── Asset URLs ──────────────────────────── */
const ASSET_SKY =
  "https://assets.revolut.com/published-assets-v3/4bcf4f81-c0b1-4bde-82f5-0b4cd2ddd2ef/2f242895-e89a-44d3-9f8a-fb78b32d80c5.png"
const ASSET_WOMAN =
  "https://assets.revolut.com/published-assets-v3/c1d9d317-7303-4f79-8756-937632237bb5/2442a1d3-8d03-44b9-a046-db33242f100a.png"
const ASSET_LEFT_CARD =
  "https://assets.revolut.com/published-assets-v3/d6d0bfe6-bc41-44db-8dde-dd3665b3c359/00544e46-b5db-4906-b0ed-87b558057f3f.png"
const ASSET_RIGHT_CARD =
  "https://assets.revolut.com/published-assets-v3/af2fd3c8-cfef-40f0-a673-4a2c9fa85d69/aab65826-2d49-49f9-803b-061c5c68b842.png"

export function RevolutHeroCarouselV2() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const q = gsap.utils.selector(containerRef)
      
      // 0. Initial Entrance Animation (ON LOAD, NOT SCROLL)
      gsap.fromTo(
        q(".hero-title"),
        { opacity: 0, y: 60, filter: "blur(12px)", scale: 0.97 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.6, ease: "expo.out" }
      )
      gsap.fromTo(
        q(".hero-p"),
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "expo.out", delay: 0.2 }
      )
      gsap.fromTo(
        q(".hero-btn"),
        { opacity: 0, y: 30, filter: "blur(6px)", scale: 0.95 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "expo.out", delay: 0.35 }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200",
          scrub: 0.8,
          pin: true,
        }
      })

      tl.add("burst", 0)

      // 1. White flood — GPU-only: scale a full-screen overlay from 0→1
      // replaces the old boxShadow spread which triggered repaints every frame
      tl.fromTo(q(".flood-overlay"),
        { scale: 0 },
        { scale: 1, duration: 0.8, ease: "expo.out" },
        "burst"
      )

      // 1b. Card internals materialize
      tl.to(q(".card-inner-bg"), { opacity: 1, duration: 0.55, ease: "sine.inOut" }, "burst")
      tl.to(q(".frame-border"), { opacity: 1, duration: 0.55, ease: "sine.inOut" }, "burst")
      tl.to(q(".card-ui"), { opacity: 1, duration: 0.5, ease: "sine.inOut" }, "burst+=0.06")

      // 2. Scale down — the cinematic zoom-out
      tl.fromTo(q(".mask-wrapper"),
        { scale: 2.0 },
        { scale: 1.0, duration: 0.8, ease: "expo.out" },
        "burst"
      )
      tl.fromTo(q(".center-card"),
        { scale: 2.0 },
        { scale: 1.0, duration: 0.8, ease: "expo.out" },
        "burst"
      )
      tl.fromTo(q(".global-woman"),
        { scale: 2.0 },
        { scale: 1.0, duration: 0.8, ease: "expo.out" },
        "burst"
      )

      // 3. Hero text dissolve — transform + opacity only (no filter:blur during scrub)
      tl.fromTo(q(".hero-title"), { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: -25, scale: 0.97, duration: 0.4, ease: "expo.in" }, "burst")
      tl.fromTo(q(".hero-p"),    { opacity: 1, y: 0 },           { opacity: 0, y: -20,             duration: 0.35, ease: "expo.in" }, "burst+=0.03")
      tl.fromTo(q(".hero-btn"),  { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: -15, scale: 0.96, duration: 0.3,  ease: "expo.in" }, "burst+=0.05")

      // 4. Salary text entrance — transform + opacity only
      tl.fromTo(q(".salary-text-cluster"),
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0,  scale: 1,    duration: 0.55, ease: "expo.out" },
        "burst+=0.15"
      )

      // 5. Side cards — smooth slide
      tl.fromTo(q(".left-card"),
        { xPercent: 0, opacity: 0, scale: 0.93 },
        { xPercent: -105, opacity: 1, scale: 1.0, duration: 0.6, ease: "expo.out" },
        "burst+=0.08"
      )
      tl.fromTo(q(".right-card"),
        { xPercent: 0, opacity: 0, scale: 0.93 },
        { xPercent: 105, opacity: 1, scale: 1.0, duration: 0.6, ease: "expo.out" },
        "burst+=0.08"
      )
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative h-screen bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center">
        
        {/* ================= 1. GLOBAL LAYER (Underneath everything) ================= */}
        {/* The Sky sits still. The Woman is unclipped, centered slightly right, and massive. */}
        <div className="absolute inset-0 z-0 bg-[#5a9bcf]">
          <img src={ASSET_SKY} alt="Global Sky" className="absolute w-full h-full object-cover origin-bottom" />
          {/* We place the global woman EXACTLY at bottom-[-5vh] to match the center-card perfectly */}
          <div className="absolute inset-x-0 bottom-[2%] flex justify-center pointer-events-none">
             <img src={ASSET_WOMAN} alt="Global Woman" className="global-woman w-auto h-[75vh] max-w-[800px] object-contain object-bottom origin-bottom ml-[5vw]" />
          </div>
        </div>

        {/* ================= 2. WHITE FLOOD + MASK LAYER ================= */}
        {/*
          flood-overlay: full-screen white div that scales from 0→1 during scroll.
          GPU-composited (transform only) — replaces the old box-shadow spread
          which triggered a repaint every scroll frame.
          z-[9] sits between sky (z-0) and hero text (z-20).
        */}
        <div
          className="flood-overlay absolute inset-0 z-[9] bg-white pointer-events-none"
          style={{ transformOrigin: "50% 100%", willChange: "transform" }}
        />
        <div className="absolute inset-x-0 bottom-[2%] z-10 flex items-end justify-center pointer-events-none">
          <div className="mask-wrapper absolute w-[clamp(190px,18vw,300px)] aspect-[0.85] origin-bottom z-[1]">
            <div className="mask-expander absolute inset-0 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* ================= 3. HERO TEXT (Left-aligned) ================= */}
        <div className="hero-text-cluster absolute inset-0 z-20 flex flex-col justify-center pl-[12vw] pointer-events-none">
          <div className="max-w-[900px] text-left pointer-events-auto pb-[15vh]">
            <h1 className="hero-title text-white text-[clamp(48px,5vw,80px)] font-black leading-[0.95] tracking-[-0.03em] whitespace-nowrap">
              Banking &amp; Beyond
            </h1>
            <p className="hero-p text-white text-[clamp(15px,1.1vw,18px)] mt-6 font-medium leading-snug max-w-[450px] whitespace-normal">
              This is your bank, redefined. Get powerful daily banking and global freedom. Sign up for free in a tap.
            </p>
            <button className="hero-btn mt-8 rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold text-white shadow-xl hover:bg-black">
              Download the app
            </button>
          </div>
        </div>

        {/* ================= 4. SALARY TEXT (Fades In) ================= */}
        <div className="salary-text-cluster absolute inset-0 z-20 flex flex-col items-center pt-[15vh] pointer-events-none opacity-0">
          <div className="max-w-2xl text-center pointer-events-auto">
            <h2 className="text-zinc-900 text-[clamp(36px,4vw,64px)] font-black leading-none">Your salary, reimagined</h2>
            <p className="text-zinc-500 text-[clamp(16px,1.2vw,20px)] mt-4 max-w-md mx-auto">
              Spend smartly, send quickly, sort your salary automatically...
            </p>
          </div>
        </div>

        {/* ================= 5. VISUAL CLUSTER (The Carousel & Frame) ================= */}
        <div className="absolute inset-x-0 bottom-[2%] z-30 flex items-end justify-center pointer-events-none">
          
          {/* Left Card */}
          <div className="left-card absolute w-[clamp(190px,18vw,300px)] aspect-[0.85] rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]">
            <img src={ASSET_LEFT_CARD} alt="Left Card" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Right Card */}
          <div className="right-card absolute w-[clamp(190px,18vw,300px)] aspect-[0.85] rounded-2xl overflow-hidden scale-[0.9] opacity-0 z-[2]">
            <img src={ASSET_RIGHT_CARD} alt="Right Card" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Center Card (The Frame!) */}
          <div className="center-card relative w-[clamp(190px,18vw,300px)] aspect-[0.85] origin-bottom z-[3]">
            
            {/* The clipped duplicate background - fades in on scroll to trap the woman inside the card */}
            <div className="card-inner-bg absolute inset-0 rounded-2xl overflow-hidden bg-[#5a9bcf] opacity-0 isolate transform-gpu">
              <img src={ASSET_SKY} alt="Card Sky" className="absolute w-[100vw] max-w-none h-[100vh] object-cover" style={{ left: '50%', transform: 'translateX(-50%)', bottom: 0 }} />
              {/* Duplicate woman, placed perfectly at bottom-0 so origin-bottom scaling has NO offset math errors! */}
              <div className="absolute inset-x-0 bottom-0 w-[100vw]" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <img src={ASSET_WOMAN} alt="Card Woman" className="w-auto h-[75vh] max-w-[800px] object-contain object-bottom origin-bottom ml-[5vw]" />
                </div>
              </div>
            </div>

            {/* The CSS Border Frame - fades in to prevent cutting through the text initially */}
            <div className="frame-border absolute inset-0 z-[4] rounded-2xl border-[6px] border-white/60 bg-transparent pointer-events-none opacity-0" />

            {/* The Card UI (Personal £6,012) - fades in */}
            <div className="card-ui absolute inset-x-0 bottom-[12%] z-[4] flex flex-col items-center opacity-0 pointer-events-none">
              <p className="text-white/80 text-[10px] sm:text-xs font-medium mb-1">Personal</p>
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">£6,012</h3>
              <div className="bg-white px-3 sm:px-4 py-1.5 rounded-full text-zinc-900 text-[10px] sm:text-xs font-bold shadow-sm pointer-events-auto">
                Accounts
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
