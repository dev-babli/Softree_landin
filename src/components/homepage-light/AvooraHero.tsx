"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

/* ====================================================================
 *  AVOORA HERO — 1:1 replica of the Webflow .section.hero-1 block
 *
 *  Structure (top → bottom):
 *    1) Header row:
 *         "Avoora®"  · tagline · ━━━━━━━━━━━ · "Studio"
 *         Right side: profile mini-card (avatar · name/role · LET'S TALK)
 *    2) Video stage (full-bleed <video>) with:
 *         · 5-avatar stack (top-left)
 *         · Centered H2: "We Build Digital Service with [cycling word]"
 *         · Bottom-left: profile card + "24+ Years of Creative Excellence"
 *         · Right side: vertical social icons (IG / LI / FB / X)
 *         · Bottom row: 5 service cards with stacked shadow depth
 *         · Dark gradient overlay for legibility
 *    3) Brand marquee (infinite scrolling logos)
 * ==================================================================== */

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const ACCENT = "#FF6B00"

const ASSETS = {
  avatars: [
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d47_Hero%20Client%201.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d45_Hero%20Client%202.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4b_Hero%20Client%203.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4d_Hero%20Client%204.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d49_Hero%20Client%205.webp",
  ],
  video: {
    mp4: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4",
    webm: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_webm.webm",
    poster:
      "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg",
  },
  services: [
    { n: "01", label: "AI & Automation", href: "/services/ai-intelligence", img: "/whysoftree/ai.webp" },
    { n: "02", label: "Web Development", href: "/services/digital-workspace/web-app-development", img: "/whysoftree/web dev.webp" },
    { n: "03", label: "Microsoft Solutions", href: "/services/business-applications/power-apps", img: "/whysoftree/Micorosft.webp" },
    { n: "04", label: "Data & Analytics", href: "/services/data-analytics/power-bi", img: "/whysoftree/data.webp" },
    { n: "05", label: "Digital Workspace", href: "/services/digital-workspace/sharepoint", img: "/whysoftree/web.webp" },
  ],
}

/* ── Cycling word (h-cycle) ───────────────────────────────────────── */

const CYCLING_WORDS = [
  "Agentic AI",
  "Web Apps",
  "Power Platform",
  "Data Analytics",
  "Cloud Solutions",
]

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % CYCLING_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  const word = CYCLING_WORDS[idx]
  return (
    <span
      className="relative inline-block whitespace-nowrap align-baseline"
      style={{ minWidth: "clamp(280px, 30vw, 420px)" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.4em", filter: "blur(8px)" }}
              transition={{ duration: 0.5, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      {/* Animated underline (h-line) */}
      <motion.span
        aria-hidden
        className="absolute left-0 block h-[2px] rounded-full bg-current"
        style={{ bottom: -5, transformOrigin: "0% 50%" }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        key={`line-${word}`}
      />
    </span>
  )
}

/* ── Custom social icons (from Webflow source) ────────────────────── */

const LinkedinIcon = () => (
  <svg viewBox="0 0 23 23" fill="currentColor" className="h-[18px] w-[18px]">
    <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
    <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
    <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
  </svg>
)
const XIcon = () => (
  <svg viewBox="0 0 23 23" fill="currentColor" className="h-[18px] w-[18px]">
    <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
  </svg>
)

/* ── Orange arrow (LET'S TALK icon) ───────────────────────────────── */
const ArrowIcon = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
    <path
      d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z"
      fill={ACCENT}
    />
  </svg>
)

/* ── LET'S TALK button (rollup text + arrow reveal) ────────────────── */
function LetsTalkButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/contact"
      className="group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#0a0a0a] pl-5 pr-1.5 py-1.5 text-white"
      style={{ paddingTop: compact ? 4 : 6, paddingBottom: compact ? 4 : 6 }}
    >
      <span className="relative block h-[14px] overflow-hidden">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:-translate-y-full">
          LET&rsquo;S TALK
        </span>
        <span className="absolute inset-x-0 top-full block text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:-translate-y-full">
          LET&rsquo;S TALK
        </span>
      </span>
      <span className="relative grid h-[26px] w-[26px] place-items-center overflow-hidden rounded-full bg-white">
        <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:translate-x-[250%]">
          <ArrowIcon />
        </span>
        <span className="absolute inset-0 grid -translate-x-[250%] place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:translate-x-0">
          <ArrowIcon />
        </span>
      </span>
    </a>
  )
}

/* ── Service card with stacked shadow depth ────────────────────────── */

function ServiceCard({ n, label, href, img, index }: { n: string; label: string; href: string; img: string; index: number }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="service-card group/srv relative flex flex-col"
      style={{ willChange: "transform" }}
    >
      <div className="relative">
        {/* Stacked shadow cards behind — 5 layers */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="shadow-layer absolute inset-0 rounded-2xl border border-gray-900/10 bg-gray-900/5 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{
                transform: `translateY(${(i + 1) * 8}px) scale(${1 - (i + 1) * 0.035})`,
                opacity: 1 - (i + 1) * 0.15,
                zIndex: -i - 1,
              }}
            />
          ))}
        </div>
        {/* Main image */}
        <div
          className="main-image relative z-10 aspect-4/5 w-full overflow-hidden rounded-2xl border border-gray-900/10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/srv:-translate-y-1"
          style={{ animationDelay: `${index * 80}ms`, willChange: "transform" }}
        >
          <Image
            src={img}
            alt={label}
            width={400}
            height={500}
            className="h-full w-full object-cover duration-900 transition-transform ease-[cubic-bezier(.22,1,.36,1)] group-hover/srv:scale-[1.05]"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
      <div className="relative z-10 mt-4 flex items-center gap-3">
        <span className="text-[10.5px] font-medium text-gray-900/55">({n})</span>
        <span className="overflow-hidden">
          <span className="block text-[13px] font-medium text-gray-900 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/srv:-translate-y-full">
            {label}
          </span>
        </span>
      </div>
    </a>
  )
}

/* ── Main section ─────────────────────────────────────────────────── */

export default function AvooraHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoStageRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Header animations
      const headerSpans = headerRef.current?.querySelectorAll("h1 > span")
      const taglineEl = headerRef.current?.querySelector(".tagline")
      const profileCardEl = headerRef.current?.querySelector(".profile-card")

      if (headerSpans) {
        tl.from(
          headerSpans,
          {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power4.out",
          },
          0
        )
      }

      if (taglineEl) {
        tl.from(
          taglineEl,
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.4"
        )
      }

      if (profileCardEl) {
        tl.from(
          profileCardEl,
          { x: 50, opacity: 0, duration: 0.9 },
          "-=0.3"
        )
      }

      // Video stage entrance
      if (videoStageRef.current) {
        tl.from(
          videoStageRef.current,
          { scale: 0.95, opacity: 0, duration: 1.2, ease: "power4.out" },
          "-=0.2"
        )
      }

      const avatarSpans = videoStageRef.current?.querySelectorAll(".avatar-stack > span")
      if (avatarSpans) {
        tl.from(
          avatarSpans,
          {
            y: -30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "back.out(1.2)",
          },
          "-=0.6"
        )
      }

      const heroTitleEl = videoStageRef.current?.querySelector(".hero-title")
      if (heroTitleEl) {
        tl.from(
          heroTitleEl,
          { y: 40, opacity: 0, duration: 0.9 },
          "-=0.4"
        )
      }

      const bottomProfileEl = videoStageRef.current?.querySelector(".bottom-profile")
      if (bottomProfileEl) {
        tl.from(
          bottomProfileEl,
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.2"
        )
      }

      const socialIcons = videoStageRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        tl.from(
          socialIcons,
          {
            x: 30,
            opacity: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
      }


      // Marquee entrance
      tl.from(
        marqueeRef.current,
        { y: 40, opacity: 0, duration: 0.7 },
        "-=0.2"
      )

      // Hover effects for service cards in marquee
      const serviceCardsForHover = marqueeRef.current?.querySelectorAll(".service-card")
      serviceCardsForHover?.forEach((card) => {
        const cardEl = card as HTMLElement

        cardEl.addEventListener("mouseenter", () => {
          gsap.to(cardEl.querySelector(".main-image"), {
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out",
          })
          gsap.to(cardEl.querySelectorAll(".shadow-layer"), {
            translateY: (i: number) => (i + 1) * 12,
            scale: (i: number) => 1 - (i + 1) * 0.04,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
          })
        })

        cardEl.addEventListener("mouseleave", () => {
          gsap.to(cardEl.querySelector(".main-image"), {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          })
          gsap.to(cardEl.querySelectorAll(".shadow-layer"), {
            translateY: (i: number) => (i + 1) * 8,
            scale: (i: number) => 1 - (i + 1) * 0.035,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
          })
        })
      })

      // Parallax — desktop only, respects reduced-motion (heavy on mobile + battery)
      const mm = gsap.matchMedia()
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const videoEl = videoStageRef.current?.querySelector("video")
        if (!videoEl) return
        gsap.fromTo(
          videoEl,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: videoStageRef.current!,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        )
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: containerRef }
  )
  return (
    <section ref={containerRef} className="relative isolate w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 pb-12 md:pb-16 sm:px-5 sm:pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12 xl:pt-14">
        {/* ═══════════════════════════════════════════════════════════
             1) TOP HEADER ROW
               Left: Softree® · tagline · ━━━━━ · Technologies
               Right: CTA button
        ══════════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex-1 max-w-4xl">
            <div className="tagline flex items-center gap-4 mb-6">
              <span className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                Enterprise Software &amp; AI Solutions
              </span>
            </div>
            
            <h1 className="font-semibold leading-[0.9] tracking-[-0.04em] text-gray-900" style={{ fontSize: "clamp(48px, 8vw, 110px)" }}>
              <span>Softree</span>
              <span className="ml-2 font-medium text-gray-400" style={{ fontSize: "clamp(24px, 4vw, 50px)", verticalAlign: "super" }}>®</span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Technologies</span>
            </h1>
          </div>

          {/* Right — Description & CTA */}
          <div className="profile-card flex shrink-0 flex-col items-start gap-6 lg:w-[320px] lg:pb-3">
            <p className="text-[14px] leading-[1.6] text-gray-600 font-medium">
              Enterprise AI, Microsoft platforms, and cloud-native apps — scoped, scaled, and shipped.
            </p>
            <div className="flex items-center gap-4 w-full">
              <LetsTalkButton />
              <span className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
             2) VIDEO STAGE — full-bleed with overlays
        ══════════════════════════════════════════════════════════ */}
        <div ref={videoStageRef} className="relative mt-8 sm:mt-10 overflow-hidden rounded-[20px] bg-black md:mt-14 md:rounded-[28px] lg:rounded-[36px]">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={ASSETS.video.poster}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ backgroundImage: `url(${ASSETS.video.poster})`, backgroundSize: "cover" }}
          >
            <source src={ASSETS.video.mp4} type="video/mp4" />
            <source src={ASSETS.video.webm} type="video/webm" />
          </video>

          {/* Dark overlay for legibility */}
          <div
            aria-hidden
            className="absolute inset-0 z-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.80) 100%)",
            }}
          />

          {/* Content wrapper */}
          <div className="relative z-10 flex min-h-[45vh] flex-col justify-between p-4 sm:p-6 md:min-h-[50vh] md:p-8 lg:min-h-[60vh] lg:p-10 xl:p-14">
            {/* ─── TOP ROW: avatars (left) ─── */}
            <div className="avatar-stack flex items-start justify-between">
              <div className="flex -space-x-3">
                {ASSETS.avatars.map((src, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="block h-11 w-11 overflow-hidden rounded-full border-2 border-white/90 ring-1 ring-black/10 sm:h-14 sm:w-14"
                    style={{ zIndex: 5 - i }}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ─── CENTER: H2 with cycling word ─── */}
            <div className="my-8 sm:my-10 lg:my-16 flex flex-col items-center justify-center text-center">
              <h2
                className="hero-title max-w-[900px] sm:max-w-[1100px] font-medium text-white"
                style={{
                  fontSize: "clamp(24px, 4vw, 56px) sm:clamp(28px, 4.8vw, 68px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                We Build Digital Solutions with{" "}
                <span className="inline-block">
                  <CyclingWord />
                </span>
              </h2>

              {/* Added Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a href="/contact" className="rounded-full bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#e66000] hover:scale-105">
                  Start Your Project
                </a>
                <a href="/services" className="rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  Explore Solutions
                </a>
              </div>
            </div>

            {/* ─── BOTTOM TIER: tagline (left) · social (right) ─── */}
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between md:gap-6">
              {/* Bottom tagline */}
              <div className="bottom-profile flex flex-col gap-1.5 text-left text-white">
                <div className="text-[13px] sm:text-[14px] font-medium">Softree Technologies</div>
                <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                  AI · Web · Microsoft · Cloud
                </div>
                <div className="mt-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/75">
                  Shipping production-grade software since 2020
                </div>
              </div>

              {/* Social icons — vertical right side on desktop */}
              <div className="hidden flex-col items-center gap-2.5 sm:gap-3 sm:flex sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 md:right-6 lg:right-8 xl:right-10">
                {[LinkedinIcon, XIcon].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="social-icon grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>


          </div>
        </div>



        {/* ═══════════════════════════════════════════════════════════
             3) CAPABILITIES MARQUEE
        ══════════════════════════════════════════════════════════ */}
        <div ref={marqueeRef} className="relative mt-8 overflow-hidden py-5 sm:mt-10 sm:py-6 md:mt-12">
          {/* Edge fades */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-20 md:w-24"
            style={{ background: "linear-gradient(90deg, #fff 0%, transparent 100%)" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-20 md:w-24"
            style={{ background: "linear-gradient(270deg, #fff 0%, transparent 100%)" }}
          />

          <motion.div
            className="flex min-w-max items-center gap-4 sm:gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-4 sm:gap-6">
                {ASSETS.services.map((s, i) => (
                  <div key={`${setIdx}-${s.n}`} className="w-[180px] sm:w-[220px] lg:w-[260px] flex-shrink-0">
                    <ServiceCard {...s} index={i} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
