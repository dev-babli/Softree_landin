"use client"

import { useState, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import CurvedLoop from "./CurvedLoop"

gsap.registerPlugin(useGSAP)

const products = [
  {
    id: 1,
    title: "Frontend Engineering",
    description: "Hardware-accelerated web applications built for speed.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif",
    theme: "light",
  },
  {
    id: 2,
    title: "Enterprise Architecture",
    description: "Scalable microservices and robust serverless foundations.",
    image: "https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif",
    video: "https://osmo.b-cdn.net/website/page-transition-course/page-transition-course-thumb-720x450.mp4",
    theme: "electric",
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Custom LLM solutions and autonomous agents.",
    image: "https://osmo.b-cdn.net/website/bandwidth/button-pack-product-card-2160x2808.avif",
    theme: "dark",
  },
  {
    id: 4,
    title: "Design Systems",
    description: "Pixel-perfect UI/UX with consistent brand tokens.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-easings.avif",
    theme: "neutral",
  },
  {
    id: 5,
    title: "Performance Audits",
    description: "Deep-dive analysis for millisecond load times.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-icons.avif",
    theme: "black",
  },
  {
    id: 6,
    title: "Continuous Delivery",
    description: "Automated CI/CD pipelines for zero-downtime deployments.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif",
    theme: "purple",
  },
]

const navItems = [
  { label: "Frontend", index: 0 },
  { label: "Architecture", index: 1 },
  { label: "AI & ML", index: 2 },
  { label: "Design", index: 3 },
  { label: "Performance", index: 4 },
  { label: "DevOps", index: 5 },
]

const themeStyles: Record<string, string> = {
  light: "bg-white text-[#0a0a1a]",
  electric: "bg-[#1852FF] text-white",
  dark: "bg-[#1a1a2e] text-white",
  neutral: "bg-[#e8e8ec] text-[#0a0a1a]",
  black: "bg-[#0a0a1a] text-white",
  purple: "bg-[#6b46c1] text-white",
}

const tagStyles: Record<string, { bg: string; text: string }> = {
  light: { bg: "bg-black/5", text: "text-[#0a0a1a]" },
  electric: { bg: "bg-white/20", text: "text-white" },
  dark: { bg: "bg-white/10", text: "text-white" },
  neutral: { bg: "bg-[#0a0a1a]/10", text: "text-[#0a0a1a]" },
  black: { bg: "bg-white/10", text: "text-white" },
  purple: { bg: "bg-white/20", text: "text-white" },
}

export default function LightProductSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  
  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return
      setIsAnimating(true)

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const diff = i - index
        // Fan out by 15 degrees each, around a bottom center origin
        const angle = diff * 15
        const isActive = i === index
        const isAdjacent = Math.abs(diff) <= 1
        
        gsap.to(card, {
          rotateZ: angle,
          y: Math.abs(diff) * 20, // push down the outer cards slightly
          scale: isActive ? 1 : 0.9,
          opacity: isActive ? 1 : isAdjacent ? 0.6 : 0,
          zIndex: isActive ? 10 : 5 - Math.abs(diff),
          duration: 0.8,
          ease: "power3.out",
        })
      })

      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 800)
    },
    [activeIndex, isAnimating]
  )

  useGSAP(() => {
    // Initial setup
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const diff = i - activeIndex
      const angle = diff * 15
      const isActive = i === activeIndex
      const isAdjacent = Math.abs(diff) <= 1

      gsap.set(card, {
        rotateZ: angle,
        y: Math.abs(diff) * 20,
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : isAdjacent ? 0.6 : 0,
        zIndex: isActive ? 10 : 5 - Math.abs(diff),
        transformOrigin: "center 200%", // The pivot point is far below the card
      })
    })
  }, { scope: sliderRef })

  const SoftreeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 md:h-10 md:w-10 text-current">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <div className="bg-white">
      {/* PRODUCT SLIDER SECTION */}
      <section className="relative w-full overflow-hidden py-24 md:py-32">
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 z-10">
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#0a0a1a] md:text-5xl lg:text-6xl">
              An elite toolkit for creative enterprises
            </h2>
            <div className="flex items-end">
              <p className="text-xl text-[#0a0a1a]/60">
                Access comprehensive engineering solutions with a single partnership:
              </p>
            </div>
          </div>

          <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-20">
            {/* Nav */}
            <div className="flex flex-wrap gap-3 lg:w-56 lg:flex-col lg:justify-center z-20">
              {navItems.map((item) => (
                <button
                  key={item.index}
                  onClick={() => goToSlide(item.index)}
                  className={`group relative overflow-hidden rounded-full border px-6 py-3 text-left text-sm font-medium transition-all duration-300 ${
                    item.index === activeIndex
                      ? "border-[#0a0a1a] bg-[#0a0a1a] text-white shadow-lg"
                      : "border-[#0a0a1a]/15 bg-white text-[#0a0a1a] hover:border-[#0a0a1a]/40 hover:bg-[#0a0a1a]/5"
                  }`}
                >
                  <span className="relative z-10 block truncate">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Slider Area */}
            <div className="relative flex-1" ref={sliderRef}>
              
              {/* Curved Text Background */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] pointer-events-none opacity-[0.15]">
                <CurvedLoop 
                  marqueeText="Softree Enterprise Engineering • High-Performance Web Applications • " 
                  curveAmount={400} 
                  speed={1.5}
                  interactive={false}
                  className="fill-[#0a0a1a] text-[4rem]"
                />
              </div>

              {/* Cards Container */}
              <div className="relative mx-auto h-[480px] w-full max-w-[340px] md:h-[580px] md:max-w-[420px] perspective-[1200px] z-10 mt-10 lg:mt-0">
                {products.map((product, index) => {
                  const theme = themeStyles[product.theme]
                  const tags = tagStyles[product.theme]

                  return (
                    <div
                      key={product.id}
                      ref={(el) => {
                        if (el) cardsRef.current[index] = el
                      }}
                      className="absolute left-0 top-0 w-full h-full cursor-grab active:cursor-grabbing will-change-transform"
                    >
                      <div className={`relative flex h-full flex-col overflow-hidden rounded-3xl ${theme} border border-black/5 shadow-2xl transition-shadow`}>
                        <div className="relative h-[200px] w-full overflow-hidden md:h-[260px] shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                          {product.video && (
                            <video
                              muted
                              loop
                              playsInline
                              autoPlay
                              className="absolute inset-0 h-full w-full object-cover"
                              src={product.video}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply" />
                        </div>

                        <div className="flex flex-1 flex-col p-6 md:p-8 justify-between">
                          <div>
                            <div className="mb-5 flex gap-2">
                              <span className={`rounded-full ${tags.bg} px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tags.text}`}>
                                Part of the
                              </span>
                              <span className={`rounded-full ${tags.bg} px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tags.text}`}>
                                Ecosystem
                              </span>
                            </div>
                            <div className="mb-4 flex items-start gap-3">
                              <div className="mt-1 shrink-0">
                                <SoftreeIcon />
                              </div>
                              <h3 className="text-2xl font-bold leading-tight md:text-3xl">
                                {product.title}
                              </h3>
                            </div>
                            <p className={`text-base leading-relaxed ${product.theme === "neutral" ? "text-[#0a0a1a]/70" : "opacity-90"}`}>
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-6">
                            <button
                              className={`group relative overflow-hidden rounded-full border px-6 py-2.5 text-sm font-semibold transition-all ${
                                product.theme === "light" || product.theme === "neutral"
                                  ? "border-[#0a0a1a]/20 bg-transparent text-[#0a0a1a] hover:bg-[#0a0a1a] hover:text-white"
                                  : "border-white/30 bg-transparent text-white hover:bg-white hover:text-[#0a0a1a]"
                              }`}
                            >
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="relative w-full border-t border-[#0a0a1a]/5 bg-[#f8f8fa] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            
            <div className="relative">
              <div className="sticky top-32 overflow-hidden rounded-[2rem] bg-white shadow-xl">
                <Image 
                  src="https://osmo.b-cdn.net/website/bandwidth/osmo-micrographic-2.avif" 
                  alt="Softree Graph" 
                  width={600} 
                  height={800} 
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-serif italic text-3xl text-[#1852FF] md:text-4xl">Why Softree?</span>
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="text-[#1852FF] rotate-12">
                    <path d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921 27.0609 26.6775 27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 19.1711 28.2358 14.7619 25.6477C5.77699 20.3802 0.852119 10.8502 0.0231477 0.612125C-0.616531 15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold leading-tight tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl lg:leading-[1.1]">
                  Level up your enterprise with an elite engineering team dedicated to building high-performance solutions.
                </h3>
              </div>

              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1 xl:gap-12">
                <div className="flex flex-col gap-3">
                  <h4 className="text-xl font-semibold text-[#0a0a1a]">Accelerate Development</h4>
                  <p className="text-[#0a0a1a]/70 leading-relaxed text-lg">
                    Our architecture saves you months of engineering overhead. We ship production-ready enterprise solutions that scale from day one, so you can focus on your core business.
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <h4 className="text-xl font-semibold text-[#0a0a1a]">Uncompromised Quality</h4>
                  <p className="text-[#0a0a1a]/70 leading-relaxed text-lg">
                    We don't do templates. Every platform is a bespoke, hardware-accelerated digital experience designed for maximum performance, accessibility, and conversion.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-xl font-semibold text-[#0a0a1a]">A Partnership for Growth</h4>
                  <p className="text-[#0a0a1a]/70 leading-relaxed text-lg">
                    We don't just hand over code. We partner with you to continuously evolve your digital presence, integrating new capabilities and ensuring you stay ahead of the curve.
                  </p>
                </div>
              </div>
              
              {/* Trusted By Marquee Placeholder */}
              <div className="mt-20 pt-16 border-t border-[#0a0a1a]/10">
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-[#0a0a1a]/20" />
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0a0a1a] shadow-sm border border-[#0a0a1a]/5">
                      Trusted by Industry Giants
                    </span>
                    <div className="h-[1px] w-12 bg-[#0a0a1a]/20" />
                  </div>
                  
                  {/* CSS Marquee */}
                  <div className="relative flex w-full overflow-hidden">
                    <div className="flex w-max animate-marquee items-center gap-16 md:gap-24">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="text-2xl font-bold tracking-tighter text-[#0a0a1a]/20 shrink-0">
                          ENTERPRISE {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="flex w-max animate-marquee items-center gap-16 md:gap-24 absolute top-0" style={{ animationDelay: '-15s' }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i+6} className="text-2xl font-bold tracking-tighter text-[#0a0a1a]/20 shrink-0">
                          ENTERPRISE {i + 7}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
