"use client"

import { useState, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const products = [
  {
    id: 1,
    title: "The Vault",
    description: "Our ever-growing dashboard packed with ready-to-go components.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif",
    theme: "light",
    href: "#",
  },
  {
    id: 2,
    title: "Page Transition Course",
    description: "Learn how to create page transitions that take your websites to the next level.",
    image: "https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif",
    video: "https://osmo.b-cdn.net/website/page-transition-course/page-transition-course-thumb-720x450.mp4",
    theme: "electric",
    href: "#",
  },
  {
    id: 3,
    title: "Buttons",
    description: "Coming soon, 100 fully accessible buttons made together with Eduard Bodak.",
    image: "https://osmo.b-cdn.net/website/bandwidth/button-pack-product-card-2160x2808.avif",
    theme: "dark",
    href: "#",
  },
  {
    id: 4,
    title: "Easings",
    description: "Ready-to-paste easings for CSS and GSAP inside the Osmo Vault.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-easings.avif",
    theme: "neutral",
    href: null,
  },
  {
    id: 5,
    title: "Icons",
    description: "A uniform library of clean, scalable SVG icons you can copy or download in seconds.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-icons.avif",
    theme: "black",
    href: "#",
  },
  {
    id: 6,
    title: "Community",
    description: "Connect with the people who love building great websites as much as you do.",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif",
    theme: "purple",
    href: "#",
  },
]

const navItems = [
  { label: "The Vault", index: 0 },
  { label: "Page Transition Course", index: 1 },
  { label: "Buttons", index: 2 },
  { label: "Easings", index: 3 },
  { label: "Icons", index: 4 },
  { label: "Community", index: 5 },
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
  light: { bg: "bg-white/20", text: "text-[#0a0a1a]" },
  electric: { bg: "bg-white/20", text: "text-white" },
  dark: { bg: "bg-white/10", text: "text-white" },
  neutral: { bg: "bg-[#0a0a1a]/10", text: "text-[#0a0a1a]" },
  black: { bg: "bg-white/10", text: "text-white" },
  purple: { bg: "bg-white/20", text: "text-white" },
}

export default function LightProductSlider() {
  const [activeIndex, setActiveIndex] = useState(4)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return
      setIsAnimating(true)

      const total = products.length
      const angleStep = 20
      const baseOffset = -((total - 1) * angleStep) / 2

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const diff = i - index
        const angle = baseOffset + diff * angleStep
        const isActive = i === index
        const isAdjacent = Math.abs(diff) <= 1

        gsap.to(card, {
          rotateZ: angle,
          scale: isActive ? 1 : 0.85,
          opacity: isAdjacent || isActive ? 1 : 0.4,
          zIndex: isActive ? 10 : 5 - Math.abs(diff),
          duration: 0.7,
          ease: "power2.out",
        })
      })

      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 700)
    },
    [activeIndex, isAnimating]
  )

  useGSAP(
    () => {
      const total = products.length
      const angleStep = 20
      const baseOffset = -((total - 1) * angleStep) / 2

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const diff = i - activeIndex
        const angle = baseOffset + diff * angleStep
        const isActive = i === activeIndex
        const isAdjacent = Math.abs(diff) <= 1

        gsap.set(card, {
          rotateZ: angle,
          scale: isActive ? 1 : 0.85,
          opacity: isAdjacent || isActive ? 1 : 0.4,
          zIndex: isActive ? 10 : 5 - Math.abs(diff),
        })
      })

      // Scroll reveal
      gsap.from(sectionRef.current?.querySelectorAll("[data-reveal]") ?? [], {
        y: 50,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: sectionRef }
  )

  const OsmoIcon = () => (
    <svg viewBox="0 0 187 187" fill="none" className="h-10 w-10 md:h-12 md:w-12">
      <path
        d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z"
        fill="currentColor"
      />
    </svg>
  )

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-20 md:py-32">
      {/* SVG Circle Deco */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 800 800" className="h-[800px] w-[800px]">
          <circle cx="400" cy="400" r="350" stroke="#0a0a1a" strokeWidth="1" fill="none" />
          <circle cx="400" cy="400" r="280" stroke="#0a0a1a" strokeWidth="1" fill="none" />
          <circle cx="400" cy="400" r="210" stroke="#0a0a1a" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Title Row */}
        <div data-reveal className="mb-12 grid grid-cols-1 gap-4 md:mb-16 md:grid-cols-2 md:gap-8">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
            A growing toolkit for creative developers
          </h2>
          <div className="flex items-end">
            <p className="text-lg text-[#0a0a1a]/60 md:text-xl">
              Access everything with a single membership:
            </p>
          </div>
        </div>

        {/* Slider Area */}
        <div className="relative flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Nav Buttons */}
          <div data-reveal className="flex flex-wrap gap-2 lg:w-48 lg:flex-col">
            {navItems.map((item) => (
              <button
                key={item.index}
                onClick={() => goToSlide(item.index)}
                className={`rounded-full border px-4 py-2 text-left text-sm transition-all duration-300 ${
                  item.index === activeIndex
                    ? "border-[#1852FF] bg-[#1852FF] text-white"
                    : "border-[#0a0a1a]/15 bg-white text-[#0a0a1a] hover:border-[#1852FF]/50"
                }`}
              >
                <span className="block truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Cards Slider */}
          <div className="relative flex-1">
            <div
              ref={sliderRef}
              className="relative mx-auto h-[480px] w-full max-w-[360px] md:h-[520px] md:max-w-[400px]"
              style={{ perspective: "1200px" }}
            >
              {products.map((product, index) => {
                const theme = themeStyles[product.theme]
                const tags = tagStyles[product.theme]
                const isActive = index === activeIndex
                const CardWrapper = product.href ? "a" : "div"
                const wrapperProps = product.href
                  ? { href: product.href, className: "block" }
                  : { className: "block" }

                return (
                  <div
                    key={product.id}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el
                    }}
                    className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 md:w-[320px]"
                    style={{ transformOrigin: "center center" }}
                  >
                    <CardWrapper {...wrapperProps}>
                      <div
                        className={`relative overflow-hidden rounded-2xl ${theme} transition-shadow duration-500 ${
                          isActive ? "shadow-2xl" : "shadow-lg"
                        }`}
                      >
                        {/* Background Image */}
                        <div className="relative h-[180px] overflow-hidden md:h-[200px]">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-5 md:p-6">
                          {/* Tags */}
                          <div className="mb-4 flex gap-2">
                            <span
                              className={`rounded-full ${tags.bg} px-3 py-1 text-xs font-medium ${tags.text}`}
                            >
                              Part of the
                            </span>
                            <span
                              className={`rounded-full ${tags.bg} px-3 py-1 text-xs font-medium ${tags.text}`}
                            >
                              Membership
                            </span>
                          </div>

                          {/* Icon & Title */}
                          <div className="mb-3 flex items-start gap-3">
                            <OsmoIcon />
                            <h3 className="text-xl font-bold leading-tight md:text-2xl">
                              {product.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p
                            className={`mb-5 text-sm leading-relaxed ${
                              product.theme === "neutral"
                                ? "text-[#0a0a1a]/60"
                                : "opacity-80"
                            }`}
                          >
                            {product.description}
                          </p>

                          {/* CTA */}
                          {product.href && (
                            <button
                              className={`group relative overflow-hidden rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                                product.theme === "light" || product.theme === "neutral"
                                  ? "border-[#0a0a1a]/20 text-[#0a0a1a] hover:bg-[#0a0a1a] hover:text-white"
                                  : "border-white/30 text-white hover:bg-white hover:text-[#0a0a1a]"
                              }`}
                            >
                              <span className="relative z-10">Discover</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </CardWrapper>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
