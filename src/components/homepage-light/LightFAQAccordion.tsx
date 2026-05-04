"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, ArrowUpRight } from "lucide-react"

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

export default function LightFAQAccordion() {
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

    tl.from(faqsRef.current?.querySelectorAll("[data-faq-item]") ?? [], {
      y: 80,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.4")
  }, { scope: sectionRef })

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
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

        {/* FAQ Accordion */}
        <div ref={faqsRef} className="flex h-[500px] gap-2 md:gap-3">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex
            const isCollapsed = activeIndex !== -1 && !isActive

            return (
              <div
                key={faq.id}
                data-faq-item
                onClick={() => handleClick(index)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive
                    ? "flex-[3] bg-[#0a0a1a]"
                    : isCollapsed
                      ? "flex-[0.5] bg-[#f5f7fb]"
                      : "flex-1 bg-[#f5f7fb] hover:bg-[#eef4ff]"
                }`}
              >
                {/* Background Shape for Active */}
                {isActive && (
                  <div className="absolute inset-0 opacity-100 transition-opacity duration-500">
                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#1852FF]/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#1852FF]/5 blur-3xl" />
                  </div>
                )}

                {/* Content */}
                <div className="relative h-full p-5 md:p-6">
                  {/* Top - Serial & Icon */}
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${
                        isActive ? "text-white/60" : "text-[#111827]"
                      }`}
                    >
                      {faq.serial}
                    </span>
                    <div className="relative h-6 w-6">
                      <Plus
                        className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${
                          isActive
                            ? "rotate-90 scale-0 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                        } ${isActive ? "text-white" : "text-[#111827]"}`}
                      />
                      <Minus
                        className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${
                          isActive
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-0 opacity-0"
                        } text-white`}
                      />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex h-[calc(100%-3rem)] flex-col justify-between">
                    {/* Question */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ${
                        isActive ? "max-h-[200px] opacity-100" : "max-h-[120px] opacity-100"
                      }`}
                    >
                      <h3
                        className={`text-lg font-semibold leading-snug transition-colors duration-500 md:text-xl ${
                          isActive ? "text-white" : "text-[#0a0a1a]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Answer - Only visible when active */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ${
                        isActive ? "max-w-full opacity-100" : "max-w-0 opacity-0"
                      }`}
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
