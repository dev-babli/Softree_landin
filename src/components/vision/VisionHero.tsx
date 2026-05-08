"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Assets
const letters = {
  v: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a0dce81b6c2e6d25a7_V.svg",
  i: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a090ec532a71755ced_I-1.svg",
  s: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a01adbcc362b61bb48_S.svg",
  n: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a05c4b8bbb901ff9ce_N.svg",
}
const bannerBg = "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/69393d89707a466887665505_Banner-Image.jpg"

export default function VisionHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const pillBgRef = useRef<HTMLDivElement>(null)
  const vRef = useRef<HTMLDivElement>(null)
  const i1Ref = useRef<HTMLDivElement>(null)
  const sRef = useRef<HTMLDivElement>(null)
  const i2Ref = useRef<HTMLDivElement>(null)
  const nRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Set the initial background position explicitly so GSAP can animate from a known state
    gsap.set(pillBgRef.current, { backgroundPosition: "50% center" })

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=260%",
        pin: stickyRef.current,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // ── Phase 1 (0 → 0.7): pill expands to viewport ──
    tl.to(pillRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      borderWidth: 0,
      duration: 0.7,
    }, 0)

    // Letters parallax out alongside expansion
    tl.to(vRef.current, { xPercent: -180, opacity: 0, duration: 0.5 }, 0)
    tl.to(i1Ref.current, { xPercent: -300, opacity: 0, duration: 0.5 }, 0.05)
    tl.to(sRef.current, { xPercent: -200, opacity: 0, duration: 0.5 }, 0.1)
    tl.to(i2Ref.current, { xPercent: -150, opacity: 0, duration: 0.5 }, 0.15)
    tl.to(nRef.current, { xPercent: 200, opacity: 0, duration: 0.5 }, 0)
    tl.to(bottomBarRef.current, { opacity: 0, y: 30, duration: 0.4 }, 0)

    // Fade out grid + vertical lines as the banner image takes over the viewport
    tl.to(gridRef.current, { opacity: 0, duration: 0.5 }, 0.3)
    tl.to(linesRef.current, { opacity: 0, duration: 0.5 }, 0.3)

    // ── Phase 2 (0.7 → 1.0): content reveals ──
    tl.fromTo(revealRef.current,
      { opacity: 0, y: 60, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3, ease: "power2.out" },
      0.7
    )

    // ── Phase 3 (0.9 → 1.7): banner image SHIFTS LEFT after expansion ──
    // Runs after the pill is fully open. 50% → 15% on backgroundPosition X
    // anchors the helmet subject toward the LEFT of the viewport (matching
    // the reference layout — helmet on left, headline + CTA on right).
    tl.to(pillBgRef.current, {
      backgroundPosition: "15% center",
      duration: 0.8,
      ease: "power2.inOut",
    }, 0.9)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: "400vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "linear-gradient(180deg, #eef4ff 0%, #d4e2fa 35%, #b4cdf5 70%, #9cc0f2 100%)" }}
      >
        {/* Grid pattern — subtle, only visible during letter phase, fades when image takes over */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        {/* Vertical lines — fade out as the banner image reveals */}
        <div ref={linesRef} className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[88%] -translate-x-1/2">
          <div className="absolute inset-y-0 left-1/4 w-px bg-white/30" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
          <div className="absolute inset-y-0 left-3/4 w-px bg-white/30" />
        </div>

        {/* Letters row */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="flex w-full max-w-[1500px] items-center justify-center gap-1 md:gap-2">
            <div ref={vRef} className="relative shrink-0 h-[120px] md:h-[180px] lg:h-60" style={{ width: "clamp(80px, 14vw, 210px)" }}>
              <Image src={letters.v} alt="V" fill className="object-contain" priority />
            </div>
            <div ref={i1Ref} className="relative shrink-0 h-[120px] md:h-[180px] lg:h-60" style={{ width: "clamp(28px, 4.5vw, 67px)" }}>
              <Image src={letters.i} alt="I" fill className="object-contain" priority />
            </div>
            <div ref={sRef} className="relative shrink-0 h-[120px] md:h-[180px] lg:h-60" style={{ width: "clamp(75px, 13vw, 197px)" }}>
              <Image src={letters.s} alt="S" fill className="object-contain" priority />
            </div>
            <div ref={i2Ref} className="relative shrink-0 h-[120px] md:h-[180px] lg:h-60" style={{ width: "clamp(28px, 4.5vw, 67px)" }}>
              <Image src={letters.i} alt="I" fill className="object-contain" priority />
            </div>

            {/* Expanding pill */}
            <div
              ref={pillRef}
              className="relative shrink-0 overflow-hidden"
              style={{ width: "28%", height: "27vh", borderRadius: "9999px", borderWidth: "8px", borderStyle: "solid", borderColor: "#1852FF" }}
            >
              <div
                ref={pillBgRef}
                className="absolute"
                style={{
                  width: "100vw",
                  height: "100vh",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundImage: `url(${bannerBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            <div ref={nRef} className="relative shrink-0 h-[120px] md:h-[180px] lg:h-60" style={{ width: "clamp(75px, 13vw, 197px)" }}>
              <Image src={letters.n} alt="N" fill className="object-contain" priority />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div ref={bottomBarRef} className="absolute inset-x-0 bottom-0 z-20 px-6 pb-12 md:px-12 md:pb-16">
          <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-6 md:flex-row">
            <p className="max-w-md text-center text-sm leading-relaxed text-[#1a1a1a] md:text-left md:text-base">
              At Arooth, we blend creativity with strategy to build digital experiences that move brands forward. From crafting standout websites.
            </p>
            <Link href="/contact" className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#E8F4FF] px-6 py-3 font-medium text-[#0a0a0a] transition-colors hover:bg-white">
              <span>Get Started Now</span>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1852FF] text-white">
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>

        {/* Content reveal */}
        <div ref={revealRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center md:items-end md:justify-center md:pr-16 lg:pr-24 md:text-left" style={{ opacity: 0 }}>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
              Crafting Modern <span className="italic text-[#1852FF]">Vision</span> For the Ambitious Brands
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base text-[#0a0a0a]/70 md:text-lg md:mx-0">
              We blend creativity with strategy to build digital experiences that move brands forward. From crafting standout websites to delivering performance-driven campaigns.
            </p>
            <Link href="/contact" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-medium text-[#0a0a0a] transition-colors hover:bg-[#1852FF] hover:text-white shadow-[0_4px_20px_rgba(24,82,255,0.15)]">
              <span>Get Started Now</span>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1852FF] text-white transition-colors group-hover:bg-white group-hover:text-[#1852FF]">
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
