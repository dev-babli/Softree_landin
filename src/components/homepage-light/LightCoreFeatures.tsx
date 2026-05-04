"use client"

import { useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const features = [
  {
    id: 1,
    num: "/01",
    title: "Smart Capital Allocation",
    description:
      "Optimize your portfolio with automated risk management. Corex helps you manage position sizes and leverage to protect your capital while maximizing profit potential.",
    image:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206c8_Frame%202147226537.png",
    light:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206ca_light.png",
  },
  {
    id: 2,
    num: "/02",
    title: "Real-Time Signal Alerts",
    description:
      "Never miss a market move. Our AI identifies high-probability setups and sends instant notifications directly to your dashboard so you can act immediately.",
    image:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206cc_Group%20(1).png",
    light:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206ca_light.png",
  },
  {
    id: 3,
    num: "/03",
    title: "Deep Market Analysis",
    description:
      "Access comprehensive data reports and technical insights. We transform complex market noise into clear, actionable strategies for both beginners and pro traders.",
    image:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206ce_element%20(1).png",
    light:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271891fcd45632a3206ca_light.png",
  },
]

function SplitHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <h2 className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="gsap-cf-word inline-block" aria-hidden="true">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="gsap-cf-letter-mask inline-block overflow-hidden"
              aria-hidden="true"
            >
              <span className="gsap-cf-letter inline-block" aria-hidden="true">
                {char}
              </span>
            </span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h2>
  )
}

function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <p className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="gsap-cf-word-sub inline-block" aria-hidden="true">
          {word.split("").map((char, ci) => (
            <span key={ci} className="gsap-cf-letter-sub inline-block" aria-hidden="true">
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </p>
  )
}

export default function LightCoreFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return
      setActiveIndex(index)

      const cards = gsap.utils.toArray<HTMLElement>(".cf-card")
      cards.forEach((card, i) => {
        const diff = i - index
        const isActive = i === index

        gsap.to(card, {
          x: isActive ? 0 : diff < 0 ? -180 : 180,
          scale: isActive ? 1 : 0.82,
          rotateZ: isActive ? 0 : diff < 0 ? -6 : 6,
          filter: isActive ? "blur(0px)" : "blur(4px)",
          opacity: isActive ? 1 : 0.35,
          zIndex: isActive ? 10 : 5 - Math.abs(diff),
          duration: 0.7,
          ease: "power3.out",
        })
      })
    },
    [activeIndex]
  )

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Caption reveal
        gsap.from(".cf-caption", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cf-caption",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })

        // Heading split-letter animation
        const headingLetters = gsap.utils.toArray<HTMLElement>(".gsap-cf-letter")
        gsap.from(headingLetters, {
          yPercent: 120,
          rotateX: -90,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: ".cf-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        // Subtitle split-letter animation
        const subLetters = gsap.utils.toArray<HTMLElement>(".gsap-cf-letter-sub")
        gsap.from(subLetters, {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.015,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".cf-subtitle",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        // Cards container reveal
        gsap.from(".cf-cards-wrapper", {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cf-cards-wrapper",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        // Earth reveal and rotation
        gsap.from(".cf-earth-wrapper", {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cf-earth-wrapper",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        gsap.to(".cf-earth-img", {
          rotateZ: 360,
          duration: 60,
          repeat: -1,
          ease: "none",
        })
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="core-features-section relative w-full overflow-hidden bg-white py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          {/* Caption Tag */}
          <div className="cf-caption mb-4 inline-flex items-center rounded-full border border-[#0a0a1a]/10 bg-[#f8f9fc] px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0a0a1a]/70">
              Core Features
            </span>
          </div>

          {/* Heading */}
          <div className="cf-heading">
            <SplitHeading
              text="Master the Market with Corex"
              className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl"
            />
          </div>

          {/* Subtitle */}
          <div className="cf-subtitle mx-auto mt-4 max-w-2xl">
            <SplitText
              text="Empowering traders across the globe with data-driven insights and institutional-grade AI technology."
              className="text-base leading-relaxed text-[#0a0a1a]/60 md:text-lg"
            />
          </div>
        </div>

        {/* Cards Carousel */}
        <div className="cf-cards-wrapper relative mx-auto mb-12 flex h-[480px] items-center justify-center md:h-[520px]">
          {features.map((feature, index) => {
            const isActive = index === activeIndex
            const diff = index - activeIndex

            return (
              <div
                key={feature.id}
                className="cf-card absolute w-[320px] cursor-pointer overflow-hidden rounded-2xl border border-[#0a0a1a]/8 bg-[#f8f9fc] shadow-sm transition-shadow duration-300 hover:shadow-lg sm:w-[380px] md:w-[420px]"
                style={{
                  transform: isActive
                    ? "translateX(0) scale(1) rotateZ(0deg)"
                    : `translateX(${diff < 0 ? "-180px" : "180px"}) scale(0.82) rotateZ(${diff < 0 ? "-6" : "6"}deg)`,
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                  opacity: isActive ? 1 : 0.35,
                  zIndex: isActive ? 10 : 5 - Math.abs(diff),
                }}
                onClick={() => goToSlide(index)}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#f8f9fc] to-white" />

                <div className="relative p-6 md:p-8">
                  {/* Title Row */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 text-xs font-medium text-[#0a0a1a]/40">
                        {feature.num}
                      </div>
                      <h3 className="text-lg font-bold text-[#0a0a1a] md:text-xl">
                        {feature.title}
                      </h3>
                    </div>
                    <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                      <Image
                        src={feature.light}
                        alt=""
                        fill
                        className="object-contain opacity-30"
                        sizes="96px"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px w-full bg-[#0a0a1a]/10" />

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#0a0a1a]/60 md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Dots */}
        <div className="cf-nav-dots mb-16 flex items-center justify-center gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative h-3 w-3 rounded-full transition-all duration-300"
              aria-label={`Go to feature ${index + 1}`}
            >
              <span
                className={`absolute inset-0 rounded-full transition-all duration-300 ${index === activeIndex
                  ? "bg-[#0a0a1a]"
                  : "bg-[#0a0a1a]/20 group-hover:bg-[#0a0a1a]/40"
                  }`}
              />
              {index === activeIndex && (
                <span className="absolute inset-0 rounded-full bg-[#0a0a1a] ring-4 ring-[#0a0a1a]/10" />
              )}
            </button>
          ))}
        </div>

        {/* Earth Element */}
        <div className="cf-earth-wrapper relative mx-auto flex items-center justify-center">
          <div className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
            {/* Earth Image */}
            <Image
              src="https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b271b658018bac4d6873ce_Earth.png"
              alt="Earth"
              fill
              className="cf-earth-img object-contain"
              sizes="320px"
            />

            {/* Glow Layers */}
            <div className="absolute inset-0 rounded-full bg-[#1852FF]/5 blur-3xl" />
            <div className="absolute -inset-4 rounded-full bg-[#1852FF]/3 blur-2xl" />

            {/* Mask Lights */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-radial-gradient from-transparent via-transparent to-white/60" />
          </div>

          {/* Orbital Ring */}
          <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full border border-[#0a0a1a]/5 md:h-[360px] md:w-[360px] lg:h-[440px] lg:w-[440px]" />
          <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full border border-[#0a0a1a]/3 md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px]" />
        </div>
      </div>
    </section>
  )
}
