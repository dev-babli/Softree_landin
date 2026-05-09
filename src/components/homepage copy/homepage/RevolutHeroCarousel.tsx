"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────── Asset URLs ──────────────────────────── */
const SKY_BG_1 =
  "https://assets.revolut.com/published-assets-v3/4bcf4f81-c0b1-4bde-82f5-0b4cd2ddd2ef/2f242895-e89a-44d3-9f8a-fb78b32d80c5.png"
const WOMAN_CUTOUT =
  "https://assets.revolut.com/published-assets-v3/c1d9d317-7303-4f79-8756-937632237bb5/2442a1d3-8d03-44b9-a046-db33242f100a.png"
const LEFT_CARD_IMG =
  "https://assets.revolut.com/published-assets-v3/d6d0bfe6-bc41-44db-8dde-dd3665b3c359/00544e46-b5db-4906-b0ed-87b558057f3f.png"
const RIGHT_CARD_IMG =
  "https://assets.revolut.com/published-assets-v3/af2fd3c8-cfef-40f0-a673-4a2c9fa85d69/aab65826-2d49-49f9-803b-061c5c68b842.png"

export function RevolutHeroCarousel() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const q = gsap.utils.selector(containerRef)
      
      const whiteMask = q(".white-reveal-panel")
      const heroTitle = q(".hero-title")
      const heroSub = q(".hero-sub")
      const heroParagraph = q(".hero-p")
      const heroButton = q(".hero-btn")
      const centerVisual = q(".center-visual")
      const skyBg = q(".sky-background")
      const salaryHeading = q(".salary-h2")
      const salaryParagraph = q(".salary-p")
      const salaryButton = q(".salary-btn")
      const leftCard = q(".left-card")
      const rightCard = q(".right-card")
      const dots = q(".carousel-dots")

      // The mask starts as the same size/position as the frame.
      gsap.set(whiteMask, {
        width: "clamp(190px, 18vw, 300px)",
        height: "clamp(306px, 29vw, 483px)", // 0.62 aspect ratio equivalent
        bottom: "8%", // Align with where the frame sits
        left: "50%",
        xPercent: -50,
        borderRadius: "32px",
        opacity: 0, 
      })

      // Timeline configuration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 0.85,
          scrub: 0.35,
          pin: q(".sticky-stage")[0],
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // The "Burst" label
      tl.add("burst", 0)

      // Mask expands outward from the frame to cover the screen!
      // This creates a white area OUTSIDE the frame, while the frame's inside remains fully transparent,
      // letting the original sky background show through flawlessly.
      tl.fromTo(q(".mask-expander"),
        { boxShadow: "0 0 0 0vw #ffffff" },
        { boxShadow: "0 0 0 100vw #ffffff", duration: 0.65, ease: "power3.out" },
        "burst"
      )
      
      // Frame border subtlety
      tl.to(q(".woman-frame"), { borderColor: "rgba(255,255,255,0.1)", duration: 0.65 }, "burst")

      // Hero title exits almost immediately with mask
      tl.to(heroTitle, {
        opacity: 0,
        y: -40,
        duration: 0.45,
        ease: "power4.out"
      }, "burst+=0.03")

      tl.to(heroParagraph, {
        opacity: 0,
        y: -30,
        duration: 0.40,
        ease: "power4.out"
      }, "burst+=0.08")

      tl.to(heroButton, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: "power4.out"
      }, "burst+=0.10")

      // Center card minimizes a bit to fit into 3-card setup
      tl.fromTo(centerVisual, 
        { scale: 1.35, y: -40 },
        { scale: 0.88, y: 0, duration: 0.58, ease: "power3.out" }, 
        "burst+=0.08"
      )

      // INSIDE the frame, the woman pic has a Parallax Zoom
      // Copied exact animation intensity from V2 (1.75 -> 1.0) without touching layout!
      tl.fromTo(q(".woman-image"), 
        { scale: 1.75, y: 0, left: "50%", xPercent: -50 },
        { scale: 1.0, y: 0, left: "50%", xPercent: -50, duration: 0.6, ease: "power3.out" },
        "burst"
      )

      // Sky moves globally (do NOT fade to 0 so it stays visible through the mask hole)
      tl.to(skyBg, {
        scale: 1.08,
        y: -60,
        duration: 0.65,
        ease: "power3.out"
      }, "burst")

      // Salary heading starts before hero is fully gone
      tl.fromTo(salaryHeading,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power4.out" },
        "burst+=0.28"
      )

      tl.fromTo(salaryParagraph,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.40, ease: "power4.out" },
        "burst+=0.34"
      )

      tl.fromTo(salaryButton,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power4.out" },
        "burst+=0.40"
      )

      // Side cards emerge LAST, but still inside the same burst
      tl.fromTo(leftCard,
        { opacity: 0, xPercent: -35, scale: 0.92, y: 0 },
        { opacity: 1, xPercent: -105, scale: 0.9, y: 0, duration: 0.34, ease: "power3.out" },
        "burst+=0.48"
      )

      tl.fromTo(rightCard,
        { opacity: 0, xPercent: 35, scale: 0.92, y: 0 },
        { opacity: 1, xPercent: 105, scale: 0.9, y: 0, duration: 0.34, ease: "power3.out" },
        "burst+=0.48"
      )

      tl.fromTo(dots,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, 
        "burst+=0.58"
      )

    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="outer-section relative h-[150vh] bg-black">
      <div className="sticky-stage sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Sky Background */}
        <div className="sky-background absolute inset-0 z-0 bg-[#5a9bcf]">
          <img src={SKY_BG_1} alt="" className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 object-cover" />
        </div>

        {/* Hero Content */}
        <div className="hero-copy absolute inset-0 z-10 flex items-center pl-[6vw]">
          <div className="max-w-[420px]">
            <h1 className="hero-title text-[clamp(48px,5vw,86px)] font-black leading-[0.95] tracking-[-0.03em] text-white">
              Banking &amp; Beyond
            </h1>
            <div className="hero-sub mt-5">
              <p className="hero-p text-[clamp(15px,1.3vw,20px)] font-semibold leading-snug text-white">
                This is your bank, redefined. Get powerful daily banking and global freedom. Sign up for free in a tap.
              </p>
              <button className="hero-btn mt-7 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-black">
                Download the app
              </button>
            </div>
          </div>
        </div>

        {/* Visual Cluster (Woman, Frame, Side Cards) */}
        <div className="visual-cluster absolute inset-x-0 bottom-[-8%] z-40 pointer-events-none flex items-end justify-center pb-0">
          
          {/* Center Visual (z-[1] so it sits behind side cards if they overlap) */}
          <div className="center-visual relative flex h-[clamp(306px,29vw,483px)] w-[clamp(190px,18vw,300px)] justify-center origin-bottom z-[1]">
            
            {/* 1. Unclipped Mask Layer - The box-shadow explodes outward to turn the rest of the screen white! */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="mask-expander absolute inset-0 rounded-[32px] pointer-events-none" />
            </div>

            {/* 2. Clipped Content Layer - Clips the inner visuals perfectly within the card borders */}
            <div className="content-layer absolute inset-0 rounded-[32px] overflow-hidden z-[2]">
              {/* The Woman (zooms out to fit the card during transition) */}
              <img 
                src={WOMAN_CUTOUT} 
                alt="Woman Cutout" 
                className="woman-image absolute bottom-0 left-1/2 w-[125%] max-w-none h-auto object-contain origin-bottom" 
              />
            </div>

            {/* 3. The Visual Frame (Just a border cutout) */}
            <div className="woman-frame absolute inset-0 z-[4] rounded-[32px] border border-white/30 bg-transparent pointer-events-none" />
            
            {/* 4. The Card UI (Personal £6,012) - Fades in or just sits at the bottom */}
            <div className="absolute inset-x-0 bottom-[12%] z-[5] flex flex-col items-center pointer-events-none">
              <p className="text-white/80 text-[10px] sm:text-xs font-medium mb-1">Personal</p>
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">£6,012</h3>
              <div className="bg-white px-3 sm:px-4 py-1.5 rounded-full text-zinc-900 text-[10px] sm:text-xs font-bold shadow-sm pointer-events-auto">
                Accounts
              </div>
            </div>
            
          </div>

          {/* Left Side Card */}
          <div className="left-card absolute aspect-[0.66] w-[clamp(190px,18vw,300px)] overflow-hidden rounded-[28px] max-md:hidden z-[2]">
            <img src={LEFT_CARD_IMG} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>

          {/* Right Side Card */}
          <div className="right-card absolute aspect-[0.66] w-[clamp(190px,18vw,300px)] overflow-hidden rounded-[28px] max-md:hidden z-[2]">
            <img src={RIGHT_CARD_IMG} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          
        </div>

        {/* Salary Content (Inside the sticky stage, z-50 to sit on top of the white mask) */}
        <div className="salary-copy absolute inset-x-0 top-[10vh] z-50 mx-auto flex flex-col items-center text-center">
          <h2 className="salary-h2 text-[clamp(32px,4.2vw,64px)] font-black leading-[1.05] tracking-[-0.03em] text-zinc-950">
            Your salary, reimagined
          </h2>
          <p className="salary-p mt-4 max-w-xl text-[clamp(14px,1.15vw,18px)] font-medium text-zinc-500">
            Spend smartly, send quickly, sort your salary automatically, and watch your savings grow — all with a Revolut bank account.
          </p>
          <button className="salary-btn mt-6 rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white">
            Move your salary
          </button>
        </div>

        {/* Dots */}
        <div className="carousel-dots absolute bottom-[5vh] left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 pointer-events-none">
          <span className="h-[6px] w-[6px] rounded-full bg-zinc-300" />
          <span className="h-[7px] w-7 rounded-full bg-zinc-900" />
          <span className="h-[6px] w-[6px] rounded-full bg-zinc-300" />
        </div>

      </div>
    </section>
  )
}
