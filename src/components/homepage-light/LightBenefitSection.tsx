"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const benefits = [
  {
    icon: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b26c5f0f2220fc1d432ed6_It%20Consultations%20Illustration.png",
    title: "Strategic Intelligence",
    description: "Gain clearer insights for faster, smarter decisions.",
    variant: "light" as const,
  },
  {
    icon: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b26c5f0f2220fc1d432ed2_license-key%204.png",
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance built-in.",
    variant: "dark" as const,
  },
  {
    icon: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b26c5f0f2220fc1d432ed4_blockchain.png",
    title: "Blockchain Ready",
    description: "Immutable ledgers for transparent operations.",
    variant: "light" as const,
  },
  {
    icon: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b26c5f0f2220fc1d432ed0_chat-bot.png",
    title: "AI Assistants",
    description: "24/7 intelligent support at your fingertips.",
    variant: "dark" as const,
  },
  {
    icon: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b26c5f0f2220fc1d432ece_virtual-reality-vr.png",
    title: "Immersive Analytics",
    description: "Visualize data in stunning 3D environments.",
    variant: "light" as const,
  },
  {
    icon: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b26c5f0f2220fc1d432ecc_game-console.png",
    title: "Gamified Growth",
    description: "Drive engagement with reward-driven UX.",
    variant: "dark" as const,
  },
]

function SplitHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <h2 className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="gsap-split-word inline-block"
          aria-hidden="true"
        >
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="gsap-split-letter-mask inline-block overflow-hidden"
              aria-hidden="true"
            >
              <span
                className="gsap-split-letter inline-block"
                data-letter
                aria-hidden="true"
              >
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
        <span
          key={wi}
          className="gsap-split-word-sub inline-block"
          aria-hidden="true"
        >
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="gsap-split-letter-sub inline-block"
              data-letter-sub
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </p>
  )
}

export default function LightBenefitSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Heading split-letter animation
        const headingLetters = gsap.utils.toArray<HTMLElement>(
          ".gsap-split-letter"
        )
        gsap.from(headingLetters, {
          yPercent: 120,
          rotateX: -90,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: ".benefit-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        // Subtitle split-letter animation
        const subLetters = gsap.utils.toArray<HTMLElement>(
          ".gsap-split-letter-sub"
        )
        gsap.from(subLetters, {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.015,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".benefit-subtitle",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        // Benefit cards stagger reveal
        const cards = gsap.utils.toArray<HTMLElement>(".benefit-card")
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".benefit-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        // Caption tag reveal
        gsap.from(".benefit-caption", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".benefit-caption",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="benefit-section relative w-full bg-white py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          {/* Caption Tag */}
          <div className="benefit-caption mb-4 inline-flex items-center rounded-full border border-[#0a0a1a]/10 bg-[#f8f9fc] px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0a0a1a]/70">
              Benefit
            </span>
          </div>

          {/* Heading with split-letter animation */}
          <div className="benefit-heading">
            <SplitHeading
              text="Why Trade With Us"
              className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl"
            />
          </div>

          {/* Subtitle with split-letter animation */}
          <div className="benefit-subtitle mx-auto mt-4 max-w-2xl">
            <SplitText
              text="Empowering traders across the globe with data-driven insights and institutional-grade AI technology."
              className="text-base leading-relaxed text-[#0a0a1a]/60 md:text-lg"
            />
          </div>
        </div>

        {/* Benefit Cards Grid */}
        <div className="benefit-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`benefit-card group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                benefit.variant === "dark"
                  ? "border-[#0a0a1a]/10 bg-[#0a0a1a] text-white"
                  : "border-[#0a0a1a]/8 bg-[#f8f9fc] text-[#0a0a1a]"
              }`}
            >
              {/* Stroke background effect */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  benefit.variant === "dark"
                    ? "bg-[#1a1a2e]"
                    : "bg-white"
                }`}
              />

              <div className="relative flex flex-col items-start p-6 md:p-8">
                {/* Icon */}
                <div className="mb-4 h-16 w-16 overflow-hidden rounded-xl">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3
                    className={`mb-2 text-lg font-semibold md:text-xl ${
                      benefit.variant === "dark"
                        ? "text-white"
                        : "text-[#0a0a1a]"
                    }`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      benefit.variant === "dark"
                        ? "text-white/60"
                        : "text-[#0a0a1a]/60"
                    }`}
                  >
                    {benefit.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <a
                  href="#"
                  className={`relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${
                    benefit.variant === "dark"
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-[#0a0a1a]/5 hover:bg-[#0a0a1a]/10"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      benefit.variant === "dark"
                        ? "text-white"
                        : "text-[#0a0a1a]"
                    }`}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
