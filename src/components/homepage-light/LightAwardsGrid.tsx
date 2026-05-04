"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const awards = [
  {
    id: 1,
    name: "Site Of the Day",
    info: "Product Design",
    logo: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f70a4d79ee987e421eb6f_Award-Logo-1.svg",
  },
  {
    id: 2,
    name: "Digital Excellence",
    info: "Product Design",
    logo: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f70a5faea2e596666c01d_Award-Logo-2.svg",
  },
  {
    id: 3,
    name: "Creative Agency",
    info: "Product Design",
    logo: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f70a491a4ccc771a374f2_Award-Logo-3.svg",
  },
  {
    id: 4,
    name: "Innovative Design",
    info: "Product Design",
    logo: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f70a4ba2a084159b55c22_Award-Logo-4.svg",
  },
  {
    id: 5,
    name: "Top Branding",
    info: "Product Design",
    logo: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f70a47e51e2d0471e6f72_Award-Logo-5.svg",
  },
  {
    id: 6,
    name: "Web Innovation",
    info: "Product Design",
    logo: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f70a46eb2ff136b8bb324_Award-Logo-6.svg",
  },
]

export default function LightAwardsGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll("[data-award-card]")
    if (!cards) return

    // Set initial state
    gsap.set(cards, {
      y: "20vh",
      opacity: 0,
      scale: 0.95,
    })

    // Create scroll-driven animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 1,
      },
    })

    // Animate cards in sequence
    cards.forEach((card, index) => {
      tl.to(
        card,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        index * 0.1
      )
    })

    // Continuous subtle parallax on scroll
    gsap.to(cards, {
      y: (i) => -20 - i * 5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
      {/* Top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-[#0a0a1a]/10" />

      <div ref={containerRef} className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {awards.map((award) => (
            <div
              key={award.id}
              data-award-card
              className="group relative overflow-hidden rounded-2xl border border-[#0a0a1a]/10 bg-[#f8f9fc] p-6 transition-all duration-500 hover:border-[#1852FF]/30 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(24,82,255,0.15)] md:p-8"
              style={{ height: "22rem" }}
            >
              {/* Background glow on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#1852FF]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between">
                {/* Top - Award Info */}
                <div>
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#0a0a1a] md:text-3xl">
                    {award.name}
                  </h3>
                  <p className="text-sm font-medium text-[#0a0a1a]/60">
                    {award.info}
                  </p>
                </div>

                {/* Bottom - Logo */}
                <div className="flex justify-end">
                  <div className="relative h-16 w-16 transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
                    <Image
                      src={award.logo}
                      alt={award.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0a0a1a]/10" />
    </section>
  )
}
