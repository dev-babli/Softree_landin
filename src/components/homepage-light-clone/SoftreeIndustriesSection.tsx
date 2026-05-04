"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const INDUSTRIES = [
  {
    label: "AI & Machine Learning",
    link: "/services/ai",
    image: "/whysoftree/ai.webp",
    textLight: true
  },
  {
    label: "Data Engineering",
    link: "/services/data",
    image: "/whysoftree/data.webp",
    textLight: true
  },
  {
    label: "Web Development",
    link: "/services/web-development",
    image: "/whysoftree/web dev.webp",
    textLight: true
  },
  {
    label: "Web Platforms",
    link: "/services/web-platforms",
    image: "/whysoftree/web.webp",
    textLight: true
  },
  {
    label: "Microsoft Ecosystem",
    link: "/services/microsoft",
    image: "/whysoftree/microsoft.webp",
    textLight: true
  },
  {
    label: "Enterprise Architecture",
    link: "/services/enterprise",
    image: "/whysoftree/image.png",
    textLight: true
  }
]

export function SoftreeIndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) {
      setScrollProgress(0)
    } else {
      setScrollProgress(scrollLeft / maxScroll)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // initial calculation
      window.addEventListener('resize', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [])

  // Auto-sliding logic
  useEffect(() => {
    if (isHovered) return // Pause auto-scroll on hover

    const autoSlide = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        const maxScroll = scrollWidth - clientWidth
        
        if (maxScroll <= 0) return

        // If at the end, snap back to start
        if (scrollLeft >= maxScroll - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          // Scroll by one actual card width + gap (20px)
          const firstChild = containerRef.current.children[0] as HTMLElement
          const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 560
          containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" })
        }
      }
    }, 3500)

    return () => clearInterval(autoSlide)
  }, [isHovered])

  const scrollLeftNav = () => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement
      const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 560
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" })
    }
  }

  const scrollRightNav = () => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement
      const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 560
      containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full bg-white text-black pt-16 md:pt-36 pb-12 md:pb-20 z-10 font-sans">
      <div className="relative z-10 mx-auto w-full max-w-[1920px] overflow-hidden">

        {/* Header container */}
        <div className="flex w-full items-end justify-between pb-10 px-4 xl:px-10 max-w-[1240px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-[40px] font-medium max-w-[280px] sm:max-w-[550px] text-neutral-900 tracking-tight leading-tight"
          >
            Powering progress across industries
          </motion.h2>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollLeftNav}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollRightNav}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Carousel Area */}
        <div className="mb-10 flex flex-grow justify-center lg:mb-12 w-full relative max-w-[1240px] mx-auto px-4 xl:px-10">
          <div 
            className="w-full relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => {
              // slight delay before resuming auto-scroll on mobile
              setTimeout(() => setIsHovered(false), 2000)
            }}
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
                  {/* Increased sizes significantly for a more squarish, impactful presence */}
                  <div className="group/card relative inline-flex h-[320px] w-[320px] rounded-lg md:h-[480px] md:w-[480px] lg:h-[540px] lg:w-[540px] cursor-pointer transition-transform duration-500 ease-in-out">
                    <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-100">

                      <img
                        alt={industry.label}
                        className="h-full w-full rounded-lg object-cover p-0 transition-transform duration-500 ease-in-out group-hover/card:scale-110"
                        src={industry.image}
                        draggable={false}
                      />

                      {/* Gradient overlay for cards that use white text, applied at the TOP to improve text legibility */}
                      {industry.textLight && (
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-lg bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                      )}

                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                      <div className="pt-0">
                        <p className={`text-[22px] lg:text-2xl font-medium ${industry.textLight ? 'text-white' : 'text-neutral-900'} drop-shadow-sm`}>
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

        {/* Bottom Interactive Tracker */}
        <div className="flex justify-center w-full px-4">
          <div className="w-full max-w-[320px] h-1 bg-neutral-200 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 w-[60px] bg-gradient-to-r from-[#ff715b] to-[#5a6bfd] rounded-full"
              style={{
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
