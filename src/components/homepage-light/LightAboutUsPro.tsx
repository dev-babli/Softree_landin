"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function LightAboutUsPro() {
  const sectionRef = useRef<HTMLElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const videoInnerRef = useRef<HTMLVideoElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Top section reveal
      gsap.from(topRef.current?.querySelectorAll("[data-reveal]") ?? [], {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: topRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Stats section reveal
      gsap.from(statsRef.current?.querySelectorAll("[data-stat-reveal]") ?? [], {
        y: 80,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Counter animation
      const counters = statsRef.current?.querySelectorAll("[data-counter]")
      counters?.forEach((counter) => {
        const target = counter.getAttribute("data-counter")
        if (target) {
          gsap.from(counter, {
            textContent: "0",
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              counter.textContent = Math.ceil(Number(this.targets()[0].textContent)).toString()
            },
          })
        }
      })

      // Video scroll expansion
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { width: "39%", height: "25vh", y: "-19.375rem" },
          {
            width: "100%",
            height: "60vh",
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top 80%",
              end: "center center",
              scrub: 1,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      {/* Top Section */}
      <div ref={topRef} className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Stats */}
          <div data-reveal className="relative">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
              <Image
                src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/690f9e158664fc7bd2753513_Subtitle-Icon.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-[#1852FF]">About Us</span>
            </div>

            {/* Award Count */}
            <div className="relative">
              <span className="text-[140px] font-bold leading-none tracking-tighter text-[#0a0a1a] md:text-[180px]">
                40<span className="text-[#1852FF]">+</span>
              </span>

              {/* Arrows */}
              <div className="absolute -right-4 top-4 md:-right-8 md:top-8">
                <div className="relative">
                  {/* Worldwide arrow */}
                  <div className="absolute -left-16 -top-8 flex items-center gap-2">
                    <span className="text-xs font-medium text-[#0a0a1a]/70">Worldwide</span>
                    <Image
                      src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f33702cc97b2f28589225_Award-Arrow-One.png"
                      alt=""
                      width={60}
                      height={30}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  {/* Awards Won arrow */}
                  <div className="absolute -bottom-8 -right-8 flex items-center gap-2">
                    <Image
                      src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f33700369e38aee50c1d5_Award-Arrow-Two.png"
                      alt=""
                      width={60}
                      height={30}
                      className="h-8 w-auto object-contain"
                    />
                    <span className="text-xs font-medium text-[#0a0a1a]/70">Awards Won</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div data-reveal className="flex flex-col justify-center lg:border-l lg:border-[#0a0a1a]/10 lg:pl-16">
            <h3 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-[#0a0a1a] md:text-3xl lg:text-4xl">
              Our team of designers, developers, and thinkers driven by{" "}
              <span className="text-[#1852FF]">one purpose — to craft digital experiences.</span>
            </h3>
            <p className="mb-8 text-base leading-relaxed text-[#0a0a1a]/70">
              We combine strategy, creativity, and technology to help brands grow in the modern
              digital landscape. Every project we take on is fueled by curiosity, guided by precision.
            </p>
            <Link
              href="/about-us"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#1852FF] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#0a3acc]"
            >
              <span>More About Us</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="h-px bg-[#0a0a1a]/10" />
      </div>

      {/* Bottom Section - Stats with Video */}
      <div ref={statsRef} className="relative mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left - Image & Stats */}
          <div data-stat-reveal className="relative">
            {/* Stat Image */}
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f399a64049d0423783289_About-Stat-Image.jpg"
                alt="Team working"
                fill
                className="object-cover"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* 95% */}
              <div className="rounded-2xl bg-[#f8f9fc] p-6">
                <div className="mb-2 flex items-baseline">
                  <span data-counter="95" className="text-5xl font-bold text-[#1852FF] md:text-6xl">
                    95
                  </span>
                  <span className="text-5xl font-bold text-[#1852FF] md:text-6xl">%</span>
                </div>
                <p className="text-sm text-[#0a0a1a]/70">Clients Satisfied and Repeating</p>
              </div>

              {/* 125+ */}
              <div className="rounded-2xl bg-[#f8f9fc] p-6">
                <div className="mb-2 flex items-baseline">
                  <span data-counter="125" className="text-5xl font-bold text-[#0a0a1a] md:text-6xl">
                    125
                  </span>
                  <span className="text-5xl font-bold text-[#FF5812] md:text-6xl">+</span>
                </div>
                <p className="text-sm text-[#0a0a1a]/70">Projects Completed In 24 Countries</p>
              </div>
            </div>
          </div>

          {/* Right - Video */}
          <div data-stat-reveal className="relative">
            <div
              ref={videoRef}
              className="relative overflow-hidden rounded-2xl"
              style={{ width: "39%", height: "25vh" }}
            >
              <video
                ref={videoInnerRef}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                poster="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c%2F691ce85f982bdec6d59a627e_About-Video_poster.0000000.jpg"
              >
                <source
                  src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c%2F691ce85f982bdec6d59a627e_About-Video_mp4.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c%2F691ce85f982bdec6d59a627e_About-Video_webm.webm"
                  type="video/webm"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Blur overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
    </section>
  )
}
