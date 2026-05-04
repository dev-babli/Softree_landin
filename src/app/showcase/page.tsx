"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import RealmeStyleShowcase from "@/components/homepage-light/RealmeStyleShowcase"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ShowcasePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Tagline reveal
      if (taglineRef.current) {
        const chars = taglineRef.current.querySelectorAll("[data-char]")
        gsap.from(chars, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 85%",
            once: true,
          },
        })
      }

      // Scroll indicator bounce
      gsap.to("[data-scroll-indicator]", {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      })
    })
    return () => mm.revert()
  }, { scope: heroRef })

  const tagline = "SOMETHING USABLE"
  const usableStart = tagline.indexOf("USABLE")

  return (
    <main
      ref={heroRef}
      className="relative min-h-screen w-full"
      style={{
        background: "linear-gradient(180deg, #d4c8e8 0%, #e8e0f0 30%, #f0e8f5 60%, #f5f0f8 100%)",
      }}
    >
      {/* Ambient background orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-20 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,205,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(180,160,220,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Main showcase component */}
      <div className="relative z-10 px-4 pt-8 md:px-8 md:pt-16">
        <RealmeStyleShowcase />
      </div>

      {/* Tagline section */}
      <div
        ref={taglineRef}
        className="relative z-10 mt-16 flex justify-center pb-20 md:mt-24 md:pb-32"
      >
        <h2
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1a1a1a",
          }}
        >
          {tagline.split("").map((char, i) => (
            <span
              key={i}
              data-char
              style={{
                display: "inline-block",
                color: i >= usableStart ? "#f5c518" : "#1a1a1a",
                textShadow: i >= usableStart ? "0 2px 10px rgba(245,197,24,0.4)" : "none",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </div>

      {/* Scroll indicator */}
      <div
        data-scroll-indicator
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ color: "#666", fontSize: 12, letterSpacing: "0.1em" }}
        >
          <span>SCROLL</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </main>
  )
}
