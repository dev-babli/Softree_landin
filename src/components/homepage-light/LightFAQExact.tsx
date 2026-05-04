"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Grainient from "./Grainient"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const faqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What services does Arooth offer?",
    answer: "Arooth provides end-to-end digital solutions, including web design, development, branding, digital marketing, UI/UX strategy, and SEO optimization — all tailored to help your business grow online.",
  },
  {
    id: 2,
    serial: "Question 02",
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while comprehensive branding and development projects can span 8-12 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you work with clients worldwide?",
    answer: "Absolutely! We collaborate with clients globally. Our remote-first approach and flexible communication tools ensure seamless project management regardless of timezone differences.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How can we get started with Arooth?",
    answer: "Getting started is simple. Reach out through our contact form or schedule a discovery call. We'll discuss your goals, assess your needs, and propose a tailored strategy to bring your vision to life.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How much do your services cost?",
    answer: "We offer flexible pricing based on project requirements. After understanding your needs, we provide transparent, detailed quotes with no hidden fees. Our packages are designed to deliver exceptional value for businesses of all sizes.",
  },
]

const grainientColors = [
  { from: "#f0f4ff", via: "#e8f0ff", to: "#f5f7fb", accent: "#1852FF" },
  { from: "#f5f0ff", via: "#efe8ff", to: "#f7f5fb", accent: "#7c3aed" },
  { from: "#f0fff4", via: "#e8fff0", to: "#f5fbf7", accent: "#10b981" },
  { from: "#fff0f5", via: "#ffe8f0", to: "#fbf5f7", accent: "#ec4899" },
  { from: "#fff5f0", via: "#fff0e8", to: "#fbf7f5", accent: "#f59e0b" },
]

const activeGrainientPalette = [
  { c1: "#E8F0FF", c2: "#1852FF", c3: "#020510" },
  { c1: "#F0E8FF", c2: "#7C3AED", c3: "#0A0210" },
  { c1: "#E8FFF0", c2: "#10B981", c3: "#021008" },
  { c1: "#FFE8F0", c2: "#EC4899", c3: "#100208" },
  { c1: "#FFF0E8", c2: "#F59E0B", c3: "#100802" },
]

export default function LightFAQExact() {
  const [activeIndex, setActiveIndex] = useState(4)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
      },
    })

    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(faqsRef.current, {
      y: 80,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
  }, { scope: sectionRef })

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
      {/* SVG Grain Filter Definition */}
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="faq-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="mono"
            />
            <feBlend in="SourceGraphic" in2="mono" mode="multiply" />
          </filter>
          <filter id="faq-grain-dark" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="mono"
            />
            <feBlend in="SourceGraphic" in2="mono" mode="soft-light" />
          </filter>
        </defs>
      </svg>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section Title */}
        <div ref={titleRef} className="mb-12 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <Image
              src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/690f9e158664fc7bd2753513_Subtitle-Icon.svg"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-[#1852FF]">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-5xl lg:text-6xl">
            Frequently Asked{" "}
            <span className="text-[#1852FF]">Questions.</span>
          </h2>
        </div>

        {/* FAQ Horizontal Accordion */}
        <div ref={faqsRef} className="flex h-[600px] gap-2">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex
            const isCollapsed = activeIndex !== -1 && !isActive

            return (
              <div
                key={faq.id}
                onClick={() => handleClick(index)}
                className={`group/card relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive
                  ? "bg-[#0a0a1a]"
                  : ""
                  }`}
                style={{
                  width: isActive ? "37%" : isCollapsed ? "15%" : "15%",
                  height: "600px",
                }}
              >
                {/* Grainient Background for Inactive Cards */}
                {!isActive && (
                  <>
                    {/* Base Gradient */}
                    <div
                      className="absolute inset-0 transition-all duration-500 group-hover/card:opacity-90"
                      style={{
                        background: `linear-gradient(135deg, ${grainientColors[index].from} 0%, ${grainientColors[index].via} 50%, ${grainientColors[index].to} 100%)`,
                      }}
                    />
                    {/* Accent Glow */}
                    <div
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover/card:opacity-40 group-hover/card:scale-125"
                      style={{ backgroundColor: grainientColors[index].accent }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover/card:opacity-30"
                      style={{ backgroundColor: grainientColors[index].accent }}
                    />
                    {/* Grain Overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    {/* Subtle Border Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                      style={{
                        boxShadow: `inset 0 0 0 1px ${grainientColors[index].accent}20, 0 0 30px ${grainientColors[index].accent}10`,
                      }}
                    />
                  </>
                )}

                {/* Grainient Background for Active Card */}
                {isActive && (
                  <div className="absolute inset-0">
                    <Grainient
                      color1={activeGrainientPalette[index].c1}
                      color2={activeGrainientPalette[index].c2}
                      color3={activeGrainientPalette[index].c3}
                      timeSpeed={0.15}
                      grainAmount={0.08}
                      grainScale={2.5}
                      grainAnimated={false}
                      warpStrength={0.6}
                      warpFrequency={4.0}
                      warpSpeed={1.5}
                      warpAmplitude={60.0}
                      rotationAmount={350.0}
                      noiseScale={1.8}
                      contrast={1.35}
                      saturation={1.15}
                      blendSoftness={0.08}
                      zoom={0.85}
                    />
                    {/* Subtle vignette overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                  </div>
                )}

                {/* Content */}
                <div className="relative flex h-full flex-col p-5 md:p-6">
                  {/* Top - Serial & Icon */}
                  <div className="mb-auto flex items-start justify-between">
                    <span
                      className={`text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${isActive ? "text-white/60" : "text-[#111827]"
                        }`}
                    >
                      {faq.serial}
                    </span>
                    <div className="relative h-6 w-6">
                      {/* Plus Icon */}
                      <Image
                        src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6918c248f9814be60b14699f_FAQ-Plus.svg"
                        alt="Plus"
                        width={24}
                        height={24}
                        className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${isActive
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100"
                          } ${isActive ? "invert" : ""}`}
                      />
                      {/* Minus Icon */}
                      <Image
                        src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6918c248c089ceee5ca1daae_FAQ-Minus.svg"
                        alt="Minus"
                        width={24}
                        height={24}
                        className={`absolute inset-0 h-6 w-6 invert transition-all duration-500 ${isActive
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                          }`}
                      />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="mt-auto">
                    {/* Question */}
                    <div className="mb-4">
                      <h3
                        className={`text-lg font-semibold leading-snug transition-colors duration-500 md:text-xl ${isActive ? "text-white" : "text-[#0a0a1a]"
                          }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Answer - Only visible when active */}
                    <div
                      className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        width: isActive ? "100%" : "0%",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="pt-4">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                          Question Answer:
                        </h4>
                        <div className="mb-4 h-px w-16 bg-white/20" />
                        <p className="mb-6 text-sm leading-relaxed text-white/80 md:text-base">
                          {faq.answer}
                        </p>
                        <Link
                          href="/about-us"
                          className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0a0a1a] transition-all hover:bg-[#1852FF] hover:text-white"
                        >
                          <span>More About Us</span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1852FF] text-white transition-all group-hover:bg-white group-hover:text-[#1852FF]">
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
