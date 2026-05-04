"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

const TABS = ["OVERVIEW", "DISPLAY", "CAMERA", "BATTERY"]


export default function RealmeStyleShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      })

      // Container entrance
      tl.from(root.querySelector("[data-card-container]"), {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      }, 0)

      // Header elements
      tl.from(root.querySelector("[data-logo]"), {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 0.2)

      tl.from(root.querySelectorAll("[data-tab]"), {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }, 0.25)

      tl.from(root.querySelector("[data-header-icons]"), {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 0.2)

      // Left content
      tl.from(root.querySelector("[data-brand]"), {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0.35)

      tl.from(root.querySelector("[data-title]"), {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0.4)

      tl.from(root.querySelector("[data-desc]"), {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0.45)

      tl.from(root.querySelector("[data-buttons]"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, 0.5)

      tl.from(root.querySelector("[data-thumbs]"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, 0.55)

      // Center image
      tl.from(root.querySelector("[data-center]"), {
        scale: 0.92,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      }, 0.3)

      // Right cards
      tl.from(root.querySelectorAll("[data-spec-card]"), {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, 0.4)

      // Parallax on center image
      if (centerRef.current) {
        gsap.to(centerRef.current, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        })
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <section ref={ref} className="w-full">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Main Product Card */}
        <div
          data-card-container
          className="relative overflow-hidden"
          style={{
            background: "#FAFAFA",
            borderRadius: 24,
            boxShadow: "0 32px 64px rgba(0,0,0,0.12), 0 16px 32px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-4">
            {/* Logo */}
            <div data-logo className="flex items-center gap-2">
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1a1a1a",
                  letterSpacing: "-0.5px",
                }}
              >
                realme
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                  background: "#1a1a1a",
                  padding: "2px 5px",
                  borderRadius: 4,
                  letterSpacing: "0.5px",
                }}
              >
                5G
              </span>
            </div>

            {/* Tabs */}
            <div className="hidden md:flex items-center gap-1">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  data-tab
                  onClick={() => setActiveTab(i)}
                  className="transition-all duration-300"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                    border: "1.5px solid transparent",
                    background: activeTab === i ? "#1a1a1a" : "transparent",
                    color: activeTab === i ? "#fff" : "#888",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Icons */}
            <div data-header-icons className="flex items-center gap-2">
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#f0f0f0",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-3 px-5 pb-5 md:grid-cols-[220px_1fr_155px] md:gap-3 md:px-8 md:pb-8">
            {/* LEFT COLUMN */}
            <div className="flex flex-col justify-between">
              <div>
                <div
                  data-brand
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#888",
                    marginBottom: 4,
                  }}
                >
                  Softree
                </div>

                <h1
                  data-title
                  style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-1.5px",
                    color: "#1a1a1a",
                    marginBottom: 12,
                  }}
                >
                  Realme
                  <br />
                  X50
                </h1>

                <p
                  data-desc
                  style={{
                    fontSize: 11,
                    lineHeight: 1.5,
                    color: "#888",
                    maxWidth: 180,
                    marginBottom: 16,
                  }}
                >
                  Realme X50 is powered by 2.4 GHz Octa-core processor and it comes
                  with 8GB of RAM. The Realme X50 packs 128GB of internal storage
                  that cannot be expanded.
                </p>

                <div data-buttons className="flex items-center gap-2">
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: 20,
                      background: "#1a1a1a",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    BUY NOW{" "}
                    <span style={{ fontSize: 12 }}>&#8594;</span>
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: 20,
                      background: "transparent",
                      color: "#1a1a1a",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      border: "1.5px solid #1a1a1a",
                      cursor: "pointer",
                    }}
                  >
                    EXPLORE
                  </button>
                </div>
              </div>

              <div data-thumbs className="flex items-center gap-2 mt-6">
                <div
                  style={{
                    width: 52,
                    height: 36,
                    borderRadius: 6,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "2px solid #1a1a1a",
                  }}
                />
                <div
                  style={{
                    width: 52,
                    height: 36,
                    borderRadius: 6,
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#1a1a1a",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 10,
                    color: "#fff",
                    marginLeft: 2,
                  }}
                >
                  +
                </div>
              </div>
            </div>

            {/* CENTER IMAGE */}
            <div
              data-center
              className="relative overflow-hidden"
              style={{
                borderRadius: 16,
                aspectRatio: "4/3.2",
                background:
                  "linear-gradient(180deg, #a8b8d8 0%, #c5d0e8 30%, #d8e0f0 60%, #e8eef8 100%)",
              }}
            >
              <div ref={centerRef} className="absolute inset-0">
                {/* Sky gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #8898c8 0%, #a8b8d8 40%, #c8d4e8 70%, #e0e8f5 100%)",
                  }}
                />

                {/* Cloud/mist layers */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 80% 40% at 50% 80%, rgba(255,255,255,0.6) 0%, transparent 50%)`,
                  }}
                />

                {/* Ice crystal SVG - sharp angular crystalline peaks */}
                <svg
                  viewBox="0 0 400 300"
                  className="absolute bottom-0 left-0 right-0 w-full"
                  style={{ height: "80%" }}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="crystal1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e0ecff" />
                      <stop offset="40%" stopColor="#c0d4f0" />
                      <stop offset="100%" stopColor="#90a8d0" />
                    </linearGradient>
                    <linearGradient id="crystal2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0f5ff" />
                      <stop offset="40%" stopColor="#d0e0f5" />
                      <stop offset="100%" stopColor="#a8c0e0" />
                    </linearGradient>
                    <linearGradient id="crystal3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d8e4f8" />
                      <stop offset="60%" stopColor="#b8cce8" />
                      <stop offset="100%" stopColor="#98b0d0" />
                    </linearGradient>
                  </defs>

                  {/* Distant crystal ridge */}
                  <path
                    d="M0 300 L0 140 L20 120 L40 145 L60 100 L85 130 L110 90 L140 125 L170 80 L200 110 L230 75 L260 105 L290 70 L320 100 L350 85 L380 110 L400 95 L400 300 Z"
                    fill="#c8d8ec"
                    opacity="0.35"
                  />

                  {/* Mid crystal formations */}
                  <path
                    d="M0 300 L0 180 L30 150 L55 175 L80 130 L110 160 L140 110 L170 145 L200 100 L235 140 L270 95 L300 135 L340 105 L370 140 L400 115 L400 300 Z"
                    fill="url(#crystal3)"
                    opacity="0.55"
                  />

                  {/* Front sharp crystal peaks - main dramatic shapes */}
                  <path
                    d="M0 300 L0 220 L25 190 L50 210 L80 160 L110 185 L150 130 L180 155 L210 115 L240 140 L270 100 L300 130 L340 170 L370 195 L400 210 L400 300 Z"
                    fill="url(#crystal2)"
                    opacity="0.75"
                  />

                  {/* Primary crystal spires - sharpest forms */}
                  <path
                    d="M40 300 L65 140 L75 165 L90 300 Z"
                    fill="#d0e0f5"
                    opacity="0.6"
                  />
                  <path
                    d="M140 300 L170 110 L185 135 L195 160 L200 300 Z"
                    fill="#c8d8ec"
                    opacity="0.7"
                  />
                  <path
                    d="M250 300 L280 95 L295 120 L305 145 L310 300 Z"
                    fill="#b8cce8"
                    opacity="0.65"
                  />
                  <path
                    d="M330 300 L355 150 L370 180 L380 300 Z"
                    fill="#d0e0f5"
                    opacity="0.5"
                  />

                  {/* Secondary facets/crystal faces */}
                  <path
                    d="M170 110 L185 135 L160 145 Z"
                    fill="#e8f0ff"
                    opacity="0.8"
                  />
                  <path
                    d="M280 95 L295 120 L270 130 Z"
                    fill="#e0ecff"
                    opacity="0.75"
                  />
                  <path
                    d="M65 140 L75 165 L55 170 Z"
                    fill="#f0f5ff"
                    opacity="0.7"
                  />
                </svg>

                {/* Crystal/ice highlight */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 30% 25% at 55% 45%, rgba(255,255,255,0.5) 0%, transparent 60%)`,
                  }}
                />

                {/* Fog/mist at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: "30%",
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(232,240,255,0.7) 50%, rgba(240,248,255,0.9) 100%)",
                  }}
                />
              </div>

              {/* Left arrow */}
              <div
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.85)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>

              {/* Right arrow */}
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>

            {/* RIGHT COLUMN - Spec Cards */}
            <div className="flex flex-col gap-3">
              {/* 64MP Camera Card - landscape with phone product image */}
              <div
                data-spec-card
                className="relative overflow-hidden"
                style={{
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #3d5aa8 0%, #5a4a9a 50%, #7a4a88 100%)",
                  aspectRatio: "16/10",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                {/* Phone/camera product visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 160 100"
                    className="h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                      </linearGradient>
                    </defs>
                    {/* Phone body */}
                    <rect x="45" y="10" width="70" height="80" rx="10" fill="url(#phoneGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    {/* Screen */}
                    <rect x="50" y="18" width="60" height="60" rx="4" fill="rgba(255,255,255,0.1)" />
                    {/* Camera module */}
                    <rect x="55" y="25" width="28" height="28" rx="6" fill="rgba(255,255,255,0.2)" />
                    <circle cx="62" cy="35" r="5" fill="rgba(255,255,255,0.6)" />
                    <circle cx="75" cy="35" r="5" fill="rgba(255,255,255,0.4)" />
                    <circle cx="62" cy="48" r="5" fill="rgba(255,255,255,0.4)" />
                    <circle cx="75" cy="48" r="5" fill="rgba(255,255,255,0.2)" />
                    {/* Flash */}
                    <circle cx="90" cy="28" r="3" fill="rgba(255,255,255,0.8)" />
                    {/* Lens flare */}
                    <ellipse cx="90" cy="60" rx="15" ry="8" fill="rgba(255,255,255,0.1)" />
                  </svg>
                </div>

                {/* Label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    right: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.5px",
                      lineHeight: 1.2,
                    }}
                  >
                    64MP
                  </div>
                </div>
              </div>

              {/* 256GB Storage Card - landscape with chip visual */}
              <div
                data-spec-card
                className="relative overflow-hidden"
                style={{
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #4a4a8a 0%, #6a4a88 50%, #8a4a80 100%)",
                  aspectRatio: "16/10",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                {/* Chip/storage product visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 160 100"
                    className="h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                      </linearGradient>
                    </defs>
                    {/* Chip body */}
                    <rect x="50" y="20" width="60" height="60" rx="4" fill="url(#chipGrad)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                    {/* Inner circuit */}
                    <rect x="60" y="30" width="40" height="40" rx="2" fill="rgba(255,255,255,0.08)" />
                    {/* Circuit lines */}
                    <path d="M60 40 L45 40 M60 50 L40 50 M60 60 L45 60 M100 40 L115 40 M100 50 L120 50 M100 60 L115 60 M70 30 L70 15 M80 30 L80 12 M90 30 L90 15 M70 70 L70 85 M80 70 L80 88 M90 70 L90 85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    {/* Center die */}
                    <rect x="68" y="38" width="24" height="24" rx="2" fill="rgba(255,255,255,0.15)" />
                    {/* Gold contact points */}
                    <circle cx="55" cy="35" r="2" fill="rgba(255,215,0,0.5)" />
                    <circle cx="55" cy="50" r="2" fill="rgba(255,215,0,0.5)" />
                    <circle cx="55" cy="65" r="2" fill="rgba(255,215,0,0.5)" />
                    <circle cx="105" cy="35" r="2" fill="rgba(255,215,0,0.5)" />
                    <circle cx="105" cy="50" r="2" fill="rgba(255,215,0,0.5)" />
                    <circle cx="105" cy="65" r="2" fill="rgba(255,215,0,0.5)" />
                  </svg>
                </div>

                {/* Label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    right: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.5px",
                      lineHeight: 1.2,
                    }}
                  >
                    256GB
                  </div>
                </div>
              </div>

              {/* 30W DART CHARGE - light landscape card */}
              <div
                data-spec-card
                className="relative flex flex-col items-center justify-center overflow-hidden"
                style={{
                  borderRadius: 12,
                  background: "linear-gradient(180deg, #f8f8fa 0%, #f0f0f4 100%)",
                  aspectRatio: "16/11",
                  cursor: "pointer",
                  padding: "12px",
                }}
              >
                {/* Lightning icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginBottom: 6 }}
                >
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="#1a1a1a"
                    opacity="0.8"
                  />
                </svg>

                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1a1a1a",
                    letterSpacing: "0.3px",
                    lineHeight: 1.3,
                    textAlign: "center",
                  }}
                >
                  30W DART<br />CHARGE
                </div>

                <div
                  style={{
                    fontSize: 8,
                    color: "#888",
                    marginTop: 4,
                    lineHeight: 1.4,
                    textAlign: "center",
                  }}
                >
                  70% Charge in 30 Minutes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
