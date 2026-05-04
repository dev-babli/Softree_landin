"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const services = [
  {
    id: "brand-identity",
    number: "01",
    title: "Brand Identity",
    icon: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/691641f7b629ac13e415de88_Service-Icon-1.svg",
    image: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691b6f774ec996a8e2c70ec8_Service-Image-1.jpg",
    tags: ["Logo Design", "Guidelines", "Color Strategy", "Art Direction", "Brand Strategy"],
    href: "/services/brand-identity",
  },
  {
    id: "ui-ux-strategy",
    number: "02",
    title: "UI/UX Strategy",
    icon: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/691641a937391a2dcba6a9c3_Service-Icon-2.svg",
    image: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691b6f78b7687e089bcefb63_Service-Image-2.jpg",
    tags: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"],
    href: "/services/ui-ux-strategy",
  },
  {
    id: "digital-marketing",
    number: "03",
    title: "Digital Marketing",
    icon: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/69164127ea8f130e2697098b_Service-Icon-3.svg",
    image: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691b6f788a0e5a2c37a0f8c3_Service-Image-3.jpg",
    tags: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics", "Paid Campaigns"],
    href: "/services/digital-marketing",
  },
  {
    id: "product-design",
    number: "04",
    title: "Product Design",
    icon: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/69163fa6ee54de7d1f0fe267_Service-Icon-4.svg",
    image: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691b6f78afdb6c6634ed7aea_Service-Image-4.jpg",
    tags: ["Web Applications", "Mobile Apps", "SaaS Products", "E-commerce", "Dashboard Design"],
    href: "/services/product-design",
  },
]

export default function LightServicesTabs() {
  const [activeIndex, setActiveIndex] = useState(3)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

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

    tl.from(cardRef.current, {
      y: 80,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <Image
              src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/690f9e158664fc7bd2753513_Subtitle-Icon.svg"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-[#1852FF]">Our Services</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-5xl lg:text-6xl">
            Creativity Meets{" "}
            <span className="text-[#1852FF]">Functionality.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={cardRef} className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          {/* Left Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#eef4ff] to-white p-6 md:p-8">
            {/* Serial Number */}
            <div className="mb-6 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {services.map((service) => (
                  <div key={service.id} className="w-full shrink-0">
                    <span className="text-6xl font-bold text-[#1852FF]/20 md:text-7xl">
                      {service.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Icon */}
            <div className="mb-6 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {services.map((service) => (
                  <div key={service.id} className="w-full shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View Details Button */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {services.map((service) => (
                  <div key={service.id} className="w-full shrink-0">
                    <Link
                      href={service.href}
                      className="group inline-flex items-center gap-3 rounded-full bg-[#1852FF] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#0a3acc]"
                    >
                      <span>View Details</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Tabs */}
          <div className="flex flex-col gap-0">
            {services.map((service, index) => {
              const isActive = index === activeIndex
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className="group cursor-pointer"
                >
                  <div className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1">
                        {/* Service Name */}
                        <div className="mb-3 flex items-center gap-3">
                          <div
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                              isActive ? "bg-[#1852FF]" : "w-0 bg-[#1852FF]"
                            }`}
                            style={{ width: isActive ? "10px" : "0px" }}
                          />
                          <h3
                            className={`text-xl font-semibold transition-colors duration-300 md:text-2xl ${
                              isActive ? "text-[#1852FF]" : "text-[#111827]"
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>

                        {/* Tags */}
                        <div
                          className="overflow-hidden transition-all duration-500 ease-out"
                          style={{ height: isActive ? "auto" : "0px" }}
                        >
                          <div className="flex flex-wrap gap-2 pb-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-3 py-1 text-xs font-medium text-[#1852FF]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Image */}
                      <div
                        className="relative overflow-hidden rounded-xl transition-all duration-500 ease-out"
                        style={{
                          width: "100%",
                          height: isActive ? "148px" : "80px",
                          maxWidth: isActive ? "280px" : "160px",
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < services.length - 1 && (
                    <div className="h-px bg-[#0a0a1a]/10" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
