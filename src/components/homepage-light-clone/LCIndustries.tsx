"use client"

/**
 * LCIndustries — light clone of SoftreeIndustriesSection.
 * Re-themed: cream canvas, ink text, flame/sunshine progress accent.
 */

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { color } from "./tokens"

const INDUSTRIES = [
  { label: "AI & Machine Learning", link: "/services/ai", image: "/whysoftree/ai.webp", textLight: true },
  { label: "Data Engineering", link: "/services/data", image: "/whysoftree/data.webp", textLight: true },
  { label: "Web Development", link: "/services/web-development", image: "/whysoftree/web dev.webp", textLight: true },
  { label: "Web Platforms", link: "/services/web-platforms", image: "/whysoftree/web.webp", textLight: true },
  { label: "Microsoft Ecosystem", link: "/services/microsoft", image: "/whysoftree/microsoft.webp", textLight: true },
  { label: "Enterprise Architecture", link: "/services/enterprise", image: "/whysoftree/image.png", textLight: true },
]

export function LCIndustries() {
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
    const c = containerRef.current
    if (!c) return
    c.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => {
      c.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isHovered) return
    const auto = setInterval(() => {
      if (!containerRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return
      if (scrollLeft >= maxScroll - 10) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        const first = containerRef.current.children[0] as HTMLElement
        const cardWidth = first ? first.offsetWidth + 20 : 560
        containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" })
      }
    }, 3500)
    return () => clearInterval(auto)
  }, [isHovered])

  const nudge = (dir: 1 | -1) => {
    if (!containerRef.current) return
    const first = containerRef.current.children[0] as HTMLElement
    const cardWidth = first ? first.offsetWidth + 20 : 560
    containerRef.current.scrollBy({ left: dir * cardWidth, behavior: "smooth" })
  }

  return (
    <section className="relative w-full pt-16 md:pt-36 pb-12 md:pb-20 z-10" style={{ background: color.canvas, color: color.ink }}>
      <div className="relative z-10 mx-auto w-full max-w-[1920px] overflow-hidden">
        <div className="flex w-full items-end justify-between pb-10 px-4 xl:px-10 max-w-[1240px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-[40px] font-medium max-w-[280px] sm:max-w-[550px] tracking-tight leading-tight"
            style={{ color: color.ink }}
          >
            Powering progress across industries
          </motion.h2>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => nudge(-1)} className="p-2 transition-colors" style={{ color: color.slate }} aria-label="Scroll left">
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button onClick={() => nudge(1)} className="p-2 transition-colors" style={{ color: color.slate }} aria-label="Scroll right">
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mb-10 flex flex-grow justify-center lg:mb-12 w-full relative max-w-[1240px] mx-auto px-4 xl:px-10">
          <div
            className="w-full relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
          >
            <div
              ref={containerRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {INDUSTRIES.map((industry, index) => (
                <motion.a
                  key={industry.label}
                  aria-label={industry.label}
                  href={industry.link}
                  className="inline-block focus:outline-none flex-none snap-center md:snap-start"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="group/card relative inline-flex h-[320px] w-[320px] rounded-lg md:h-[480px] md:w-[480px] lg:h-[540px] lg:w-[540px] cursor-pointer transition-transform duration-500 ease-in-out">
                    <div className="relative h-full w-full overflow-hidden rounded-lg" style={{ background: color.ghostCream }}>
                      <img alt={industry.label} className="h-full w-full rounded-lg object-cover p-0 transition-transform duration-500 ease-in-out group-hover/card:scale-110" src={industry.image} draggable={false} />
                      {industry.textLight && (
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
                      )}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                      <div className="pt-0">
                        <p className={`text-[22px] lg:text-2xl font-medium drop-shadow-sm ${industry.textLight ? "text-white" : ""}`} style={industry.textLight ? undefined : { color: color.ink }}>
                          {industry.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full px-4">
          <div className="w-full max-w-[320px] h-1 rounded-full relative overflow-hidden" style={{ background: color.dustTaupe }}>
            <motion.div
              className="absolute top-0 bottom-0 w-[60px] rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color.flame}, ${color.sunshine})`,
                left: `calc(${scrollProgress * 100}% - ${scrollProgress * 60}px)`
              }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCIndustries
