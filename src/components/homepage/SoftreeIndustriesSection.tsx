"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const INDUSTRIES = [
  { 
    label: "Financial Services", 
    link: "/solutions/financial-services", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/30ec75e875e50726980c6a68a63b315b8503f1f7-840x840.jpg?auto=format&fit=max&q=90&w=420",
    textLight: true 
  },
  { 
    label: "Public Sector", 
    link: "/solutions/public-sector", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/c422cea71d363bc9dbe8f93a7114f696ebcd04a3-840x840.png?auto=format&fit=max&q=90&w=420",
    textLight: false 
  },
  { 
    label: "Energy", 
    link: "/solutions/energy-and-utilities", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/ef4c547b886577f369e62da9e8864992578bfd6a-841x840.jpg?auto=format&fit=max&q=90&w=421",
    textLight: true 
  },
  { 
    label: "Technology", 
    link: "/solutions/technology", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/b5264330c568955041d465542469ebfdeb196547-840x840.jpg?auto=format&fit=max&q=90&w=420",
    textLight: true 
  },
  { 
    label: "Healthcare", 
    link: "/solutions/healthcare-and-life-sciences", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/871cc9ed4e63113205ab55e2a6cb207d8d32a2aa-840x840.jpg?auto=format&fit=max&q=90&w=420",
    textLight: false 
  },
  { 
    label: "Manufacturing", 
    link: "/solutions/manufacturing", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/6ae6fc28f20cc442e8853d60392c50227a430992-840x840.jpg?auto=format&fit=max&q=90&w=420",
    textLight: true 
  },
  { 
    label: "Telecommunications", 
    link: "/solutions/telecommunications", 
    image: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/d27ed0826c77f9b4bdfab940945576e74ddf3756-840x840.png?auto=format&fit=max&q=90&w=420",
    textLight: false 
  }
]

export function SoftreeIndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
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

  const scrollLeftNav = () => {
    if (containerRef.current) {
      const cardWidth = 420 + 20 // card + gap
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" })
    }
  }

  const scrollRightNav = () => {
    if (containerRef.current) {
      const cardWidth = 420 + 20 // card + gap
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
        <div className="mb-10 flex flex-grow justify-center lg:mb-12 w-full relative">
          <div className="w-full relative">
            <div 
              ref={containerRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar w-full xl:justify-start 2xl:justify-center"
              style={{
                 // Dynamically calculate padding to align perfectly with the max-w-[1240px] container but bleed out to the right edge
                 paddingLeft: 'max(1rem, calc((100vw - 1240px) / 2 + 2.5rem))',
                 paddingRight: 'max(1rem, calc((100vw - 1240px) / 2 + 2.5rem))'
              }}
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
                  <div className="group/card relative inline-flex h-[289px] w-[289px] rounded-2xl md:h-[399px] md:w-[399px] lg:h-[420px] lg:w-[420px] cursor-pointer transition-transform duration-500 ease-in-out">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
                      
                      <img 
                        alt={industry.label} 
                        className="h-full w-full rounded-2xl object-cover p-0 transition-transform duration-500 ease-in-out group-hover/card:scale-110" 
                        src={industry.image} 
                        draggable={false}
                      />
                      
                      {/* Gradient overlay for cards that use white text, applied at the TOP to improve text legibility */}
                      {industry.textLight && (
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
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
