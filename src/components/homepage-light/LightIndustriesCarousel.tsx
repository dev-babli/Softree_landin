"use client"

/**
 * LightIndustriesCarousel — Auto-sliding horizontal carousel for /light page.
 *
 * Adapted from SoftreeIndustriesSection with light-theme tokens.
 * Touch-friendly, auto-advances every 3.5s, pauses on hover.
 */

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { color, shadow } from "./tokens"

const INDUSTRIES = [
  { label: "AI & Machine Learning", link: "/services/ai", image: "/whysoftree/ai.webp" },
  { label: "Data Engineering", link: "/services/data", image: "/whysoftree/data.webp" },
  { label: "Web Development", link: "/services/web-development", image: "/whysoftree/web dev.webp" },
  { label: "Web Platforms", link: "/services/web-platforms", image: "/whysoftree/web.webp" },
  { label: "Microsoft Ecosystem", link: "/services/microsoft", image: "/whysoftree/microsoft.webp" },
  { label: "Enterprise Architecture", link: "/services/enterprise", image: "/whysoftree/image.png" },
]

export default function LightIndustriesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    const maxScroll = scrollWidth - clientWidth
    setScrollProgress(maxScroll <= 0 ? 0 : scrollLeft / maxScroll)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // Auto-slide
  useEffect(() => {
    if (isHovered) return
    const autoSlide = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        const maxScroll = scrollWidth - clientWidth
        if (maxScroll <= 0) return
        if (scrollLeft >= maxScroll - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          const firstChild = containerRef.current.children[0] as HTMLElement
          const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 560
          containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" })
        }
      }
    }, 3500)
    return () => clearInterval(autoSlide)
  }, [isHovered])

  const scrollNav = (dir: -1 | 1) => {
    if (!containerRef.current) return
    const firstChild = containerRef.current.children[0] as HTMLElement
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 560
    containerRef.current.scrollBy({ left: dir * cardWidth, behavior: "smooth" })
  }

  return (
    <section className="relative w-full py-20 md:py-24 lg:py-28" style={{ background: color.canvas }}>
      <div className="relative mx-auto w-full max-w-[1920px]">
        {/* Header */}
        <div className="mx-auto mb-10 flex w-full max-w-[1320px] items-end justify-between px-4 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-[550px] text-3xl font-medium leading-[1.05] tracking-tight md:text-[40px]"
            style={{ color: color.ink }}
          >
            Powering progress across industries
          </motion.h2>

          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => scrollNav(-1)} className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-black/[0.02]" style={{ borderColor: color.dustTaupe, color: color.ink }} aria-label="Scroll left">
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button onClick={() => scrollNav(1)} className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-black/[0.02]" style={{ borderColor: color.dustTaupe, color: color.ink }} aria-label="Scroll right">
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mx-auto w-full max-w-[1320px] px-4 lg:px-10">
          <div
            className="w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
          >
            <div
              ref={containerRef}
              className="no-scrollbar flex w-full snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {INDUSTRIES.map((industry, index) => (
                <motion.a
                  key={industry.label}
                  href={industry.link}
                  aria-label={industry.label}
                  className="inline-block flex-none snap-center md:snap-start"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="group/card relative inline-flex h-[320px] w-[320px] cursor-pointer overflow-hidden rounded-lg transition-transform duration-500 ease-in-out md:h-[480px] md:w-[480px] lg:h-[540px] lg:w-[540px]"
                    style={{ boxShadow: shadow.golden }}>
                    <div className="relative h-full w-full overflow-hidden rounded-lg" style={{ background: color.lifted }}>
                      <img
                        alt={industry.label}
                        className="h-full w-full rounded-lg object-cover p-0 transition-transform duration-500 ease-in-out group-hover/card:scale-110"
                        src={industry.image}
                        draggable={false}
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-linear-to-b from-black/50 via-black/15 to-transparent" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8">
                      <p className="text-[22px] font-medium text-white drop-shadow-sm lg:text-2xl">{industry.label}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-10 flex w-full max-w-[1320px] justify-center px-4 lg:px-10">
          <div className="relative h-1 w-full max-w-[320px] overflow-hidden rounded-full" style={{ background: color.dustTaupe }}>
            <motion.div
              className="absolute top-0 bottom-0 w-[60px] rounded-full"
              style={{
                left: `calc(${scrollProgress * 100}% - ${scrollProgress * 60}px)`,
                background: `linear-gradient(90deg, ${color.flame}, ${color.sunshine})`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
