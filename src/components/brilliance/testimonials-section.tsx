"use client"

import { useState, useEffect } from "react"
import type React from "react"
import BorderGlow from "@/components/ui/BorderGlow"

// Badge component for consistency
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs liquid-glass">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      quote:
        "In just a few minutes, we transformed our data into actionable insights. The process was seamless and incredibly efficient!",
      name: "Jamie Marshall",
      company: "Co-founder, Exponent",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2011_35_19%20AM-z4zSRLsbOQDp7MJS1t8EXmGNB6Al9Z.png",
    },
    {
      quote:
        "Softree has revolutionized how we handle custom contracts. The automation saves us hours every week and eliminates errors completely.",
      name: "Sarah Chen",
      company: "VP Operations, TechFlow",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2010_54_18%20AM-nbiecp92QNdTudmCrHr97uekrIPzCP.png",
    },
    {
      quote:
        "The billing automation is a game-changer. What used to take our team days now happens automatically with perfect accuracy.",
      name: "Marcus Rodriguez",
      company: "Finance Director, InnovateCorp",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2011_01_05%20AM-TBOe92trRxKn4G5So1m9D2h7LRH4PG.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 300)
    }, 12000) // increased from 6000ms to 12000ms for longer testimonial display

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNavigationClick = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTestimonial(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  return (
    <div className="w-full border-b wf-border flex flex-col justify-center items-center wf-surface">
      {/* Header Section */}

      {/* Testimonial Content */}
      <div className="self-stretch px-4 md:px-12 overflow-hidden flex justify-center items-center bg-background border border-b border-l-0 border-r-0 border-t-0">
        <div className="w-full max-w-[1280px] xl:max-w-[1440px] py-16 md:py-24 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:flex-1 justify-start items-start gap-8 md:gap-16 flex flex-col md:flex-row">
            <img
              className="w-48 h-50 md:w-48 md:h-50 rounded-lg object-cover transition-all duration-700 ease-in-out"
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transform: isTransitioning ? "scale(0.95)" : "scale(1)",
                transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
              }}
              src={testimonials[activeTestimonial].image || "/placeholder.svg"}
              alt={testimonials[activeTestimonial].name}
            />
            <div className="flex-1 px-6 py-6 shadow-[0px_0px_0px_0.75px_rgba(50,45,43,0.12)] overflow-hidden flex flex-col justify-start items-start gap-6 shadow-none pb-0 pt-0">
              <div
                className="self-stretch justify-start flex flex-col wf-text-primary text-2xl md:text-[32px] font-medium leading-10 md:leading-[42px] font-sans h-[200px] md:h-[210px] overflow-hidden line-clamp-5 transition-all duration-700 ease-in-out tracking-tight"
                style={{
                  filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  transition: "filter 0.7s ease-in-out",
                }}
              >
                "{testimonials[activeTestimonial].quote}"
              </div>
              <div
                className="self-stretch flex flex-col justify-start items-start gap-1 transition-all duration-700 ease-in-out"
                style={{
                  filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  transition: "filter 0.7s ease-in-out",
                }}
              >
                <div className="self-stretch justify-center flex flex-col wf-text-primary text-lg font-medium leading-[26px] font-sans">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="self-stretch justify-center flex flex-col wf-text-muted text-lg font-medium leading-[26px] font-sans">
                  {testimonials[activeTestimonial].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end items-end gap-[14px]">
            <BorderGlow borderRadius={50} backgroundColor="white" glowColor="25 100 50">
              <button
                onClick={() => handleNavigationClick((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] justify-center items-center gap-2 flex hover:bg-gray-50 transition-all duration-150 ease-out active:scale-95 cursor-pointer"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="#46413E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </BorderGlow>
            <BorderGlow borderRadius={50} backgroundColor="white" glowColor="25 100 50">
              <button
                onClick={() => handleNavigationClick((activeTestimonial + 1) % testimonials.length)}
                className="w-10 h-10 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] justify-center items-center gap-2 flex hover:bg-gray-50 transition-all duration-150 ease-out active:scale-95 cursor-pointer"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="#46413E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </BorderGlow>
          </div>
        </div>
      </div>
    </div>
  )
}
