"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { ArrowUpRight, Award, Clock } from "lucide-react"
import VisionHero from "@/components/vision/VisionHero"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function VisionPage() {
  return (
    <main className="bg-white">
      <VisionNavbar />
      <VisionHero />
      <VisionMarquee />
    </main>
  )
}

function VisionNavbar() {
  return (
    <nav className="fixed left-1/2 top-6 z-50 flex w-[min(96%,1200px)] -translate-x-1/2 items-center justify-between rounded-full bg-white/90 px-4 py-2 shadow-[0_8px_30px_rgba(24,82,255,0.12)] backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 px-4 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#1852FF] to-[#0a3acc]">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-[#0a0a0a]">Arooth</span>
      </Link>

      <ul className="hidden items-center gap-1 rounded-full bg-[#eef4ff] px-2 py-1 md:flex">
        {[
          { label: "Home", active: true, href: "/vision" },
          { label: "About Us", href: "/about-us" },
          { label: "Services", href: "/services" },
          { label: "Works", href: "/showcase" },
          { label: "Contact", href: "/contact" },
        ].map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${item.active ? "bg-white text-[#1852FF] shadow-sm" : "text-[#1a1a1a] hover:text-[#1852FF]"
                }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/services"
        className="group flex items-center gap-2 rounded-full bg-[#1852FF] py-2 pl-5 pr-2 text-sm font-medium text-white transition-colors hover:bg-[#0a3acc]"
      >
        <span>View All Services</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#1852FF] transition-transform group-hover:rotate-45">
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </Link>
    </nav>
  )
}

function VisionMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
    })

    gsap.from(aboutRef.current?.querySelectorAll("[data-reveal]") ?? [], {
      opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: aboutRef.current, start: "top 80%" },
    })

    gsap.from(statsRef.current?.querySelectorAll("[data-stat]") ?? [], {
      opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Marquee */}
      <div className="overflow-hidden border-y border-[#1a1a1a]/10 py-10 md:py-16">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[...Array(2)].map((_, repeat) => (
            <div key={repeat} className="flex shrink-0 items-center gap-12 pr-12">
              {[
                { italic: "Modern", normal: "DESIGN" },
                { italic: "*", normal: "" },
                { italic: "Real", normal: "RESULTS" },
                { italic: "*", normal: "" },
                { italic: "Bold", normal: "IDEAS" },
                { italic: "*", normal: "" },
                { italic: "Real", normal: "IMPACT" },
                { italic: "*", normal: "" },
              ].map((item, i) => (
                <span key={`${repeat}-${i}`} className="flex shrink-0 items-baseline gap-3 font-bold uppercase tracking-tight" style={{ fontSize: "clamp(48px, 8vw, 140px)" }}>
                  {item.italic && <span className="italic text-[#1852FF]">{item.italic}</span>}
                  {item.normal && <span className="text-[#0a0a1a]">{item.normal}</span>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div ref={aboutRef} className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-20 md:grid-cols-2 md:px-12 md:py-32">
        <div data-reveal className="relative">
          <div className="relative inline-block">
            <span className="block font-bold leading-none tracking-tight text-[#0a0a0a]" style={{ fontSize: "clamp(140px, 22vw, 320px)" }}>
              40<span className="text-[#1852FF]">+</span>
            </span>
            <div className="absolute -right-4 top-8 rotate-6 rounded-full border border-[#1852FF]/20 bg-white px-5 py-3 shadow-[0_8px_30px_rgba(24,82,255,0.15)] md:-right-8 md:top-16">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#1852FF]" />
                <span className="text-sm font-semibold tracking-wide text-[#0a0a0a]">Awards Won</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#0a0a0a]/60">International Recognition · 2018 — 2026</p>
        </div>

        <div data-reveal className="flex flex-col justify-center">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#0a0a0a]/10 bg-[#f5f7fb] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#0a0a0a]/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1852FF]" />
            About Us
          </span>
          <h3 className="font-bold leading-[1.1] tracking-tight text-[#0a0a0a]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Our team of designers, developers, and strategists are <span className="italic text-[#1852FF]">driven by one purpose</span> — turning bold ideas into measurable results.
          </h3>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#0a0a0a]/70">
            From small startups to enterprise brands, we partner with companies who care about craft, ambition, and the long game. Every pixel, every line of code, every campaign exists to move your vision forward.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-3 md:px-12 md:pb-32">
        <div data-stat className="rounded-3xl border border-[#0a0a0a]/10 bg-gradient-to-br from-[#eef4ff] to-white p-8 md:p-10">
          <span className="block font-bold leading-none tracking-tight text-[#1852FF]" style={{ fontSize: "clamp(72px, 8vw, 128px)" }}>95%</span>
          <p className="mt-4 text-lg font-semibold text-[#0a0a0a]">Clients Satisfied</p>
          <p className="mt-2 text-sm text-[#0a0a0a]/60">Based on post-project NPS surveys across 200+ engagements.</p>
        </div>

        <div data-stat className="rounded-3xl border border-[#0a0a0a]/10 bg-[#0a0a0a] p-8 text-white md:p-10">
          <span className="block font-bold leading-none tracking-tight" style={{ fontSize: "clamp(72px, 8vw, 128px)" }}>125<span className="text-[#FF5812]">+</span></span>
          <p className="mt-4 text-lg font-semibold">Projects Completed</p>
          <p className="mt-2 text-sm text-white/60">Spanning fintech, SaaS, healthcare, and consumer brands.</p>
        </div>

        <div data-stat className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFE5D6] via-[#FFCBAA] to-[#FF5812] p-8 md:p-10">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/70">
              <Clock className="h-4 w-4" />
              <span>On Time, Every Time</span>
            </div>
            <div className="relative mx-auto my-6 grid h-32 w-32 place-items-center rounded-full bg-white shadow-[0_30px_60px_-20px_rgba(255,88,18,0.4)] md:h-40 md:w-40">
              <div className="absolute inset-3 rounded-full border-4 border-[#0a0a0a]" />
              <div className="absolute inset-6 rounded-full border-2 border-[#0a0a0a]/30" />
              <div className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-full rounded-full bg-[#0a0a0a]" />
              <div className="absolute left-1/2 top-1/2 h-1 w-8 -translate-y-1/2 rounded-full bg-[#FF5812]" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0a]" />
              <span className="absolute -top-3 left-3 h-5 w-5 rotate-[-30deg] rounded-full bg-[#0a0a0a]" />
              <span className="absolute -top-3 right-3 h-5 w-5 rotate-[30deg] rounded-full bg-[#0a0a0a]" />
            </div>
            <p className="text-sm font-medium text-[#0a0a0a]">On-time delivery is non-negotiable. Every sprint, every milestone.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
