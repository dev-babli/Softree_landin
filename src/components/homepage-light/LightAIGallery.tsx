"use client"

import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SplitWords, W } from "./SplitWords"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const DARK = {
  background: "#09031B",
  backgroundMid: "#14022A",
  backgroundHigh: "#1F0B3A",
  surface: "rgba(19, 10, 41, 0.38)",
  text: "#F1E0F3",
  textMuted: "rgba(241, 224, 243, 0.72)",
  textFaint: "rgba(241, 224, 243, 0.45)",
  accentPrimary: "#D60FDE",
  accentSecondary: "#9F0DD9",
  accentCyan: "#29B5F2",
  borderWeak: "rgba(255, 255, 255, 0.12)",
  borderStrong: "rgba(255, 255, 255, 0.2)",
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

const ORBIT_ICONS = [
  { type: "spark", cx: 0.16, cy: 0.18 },
  { type: "pen", cx: 0.34, cy: 0.08 },
  { type: "wand", cx: 0.53, cy: 0.14 },
  { type: "layers", cx: 0.7, cy: 0.05 },
  { type: "star", cx: 0.86, cy: 0.2 },
]

const CARDS = [
  { src: "/images/ai/ai-agent.jpg", alt: "Backlit silhouette in neon alley", width: 210, aspect: "3 / 4", offsetY: -14 },
  { src: "/images/ai/analytics.jpg", alt: "Cyberpunk portrait among neon tubes", width: 240, aspect: "3 / 4", offsetY: 12 },
  { src: "/images/artificial-intelligence-concept.jpg", alt: "Futuristic workstation with curved monitors", width: 280, aspect: "11 / 10", offsetY: -6 },
  { src: "/images/digital.jpg", alt: "VR visor glowing in cyan", width: 220, aspect: "4 / 3", offsetY: 20, peek: true },
]

type OrbitIconType = (typeof ORBIT_ICONS)[number]["type"]

function OrbitIcon({ type }: { type: OrbitIconType }) {
  switch (type) {
    case "spark":
      return (
        <path
          d="M12 3.5 10.2 9a1.4 1.4 0 0 1-.9.9L4.5 12l4.8 2.1a1.4 1.4 0 0 1 .9.9L12 21l1.8-6.1a1.4 1.4 0 0 1 .9-.9L19.5 12l-4.8-2.1a1.4 1.4 0 0 1-.9-.9Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.4}
        />
      )
    case "pen":
      return (
        <path
          d="M16.2 3.8a2.2 2.2 0 0 1 3 3L7.8 18.2 4 20l1.8-3.8Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.4}
        />
      )
    case "wand":
      return (
        <path
          d="m4.5 19.5 7-7M17 5l2-2m-5 1 1-4m2 8 4-1m-8 2 1 4m-7-7 4-1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.4}
        />
      )
    case "layers":
      return (
        <path
          d="m12 4.5 7.2 3.6L12 11.7 4.8 8.1ZM4.8 13l7.2 3.6 7.2-3.6M4.8 17.9l7.2 3.6 7.2-3.6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.4}
        />
      )
    case "star":
    default:
      return (
        <path
          d="m12 4.2 1.8 3.7 4.1.6-3 3 0.7 4.2-3.6-1.9-3.6 1.9 0.7-4.2-3-3 4.1-.6Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.4}
        />
      )
  }
}

export default function LightAIGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const loginRef = useRef<HTMLAnchorElement>(null)
  const orbitRef = useRef<SVGSVGElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const ratingRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (navRef.current) {
          gsap.from(navRef.current, {
            y: -24,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          })
        }

        if (loginRef.current) {
          gsap.from(loginRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.1,
          })
        }

        const orbitPaths = orbitRef.current?.querySelectorAll<SVGPathElement>("[data-orbit-path]")
        if (orbitPaths?.length) {
          orbitPaths.forEach((path, index) => {
            const length = path.getTotalLength()
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 1.8,
                ease: "power2.out",
                delay: 0.2 + index * 0.1,
              },
            )
          })
        }

        const orbitIcons = orbitRef.current?.querySelectorAll<SVGElement>("[data-orbit-icon]")
        if (orbitIcons?.length) {
          gsap.from(orbitIcons, {
            scale: 0.4,
            opacity: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "back.out(1.6)",
            delay: 0.25,
          })
        }

        if (headlineRef.current) {
          const eyebrow = headlineRef.current.querySelector<HTMLElement>("[data-eyebrow]")
          if (eyebrow) {
            gsap.from(eyebrow, {
              y: 28,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.15,
            })
          }

          const subItems = headlineRef.current.querySelectorAll<HTMLElement>("[data-sub-anim]")
          if (subItems.length) {
            gsap.from(subItems, {
              y: 24,
              opacity: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.4,
            })
          }
        }

        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            scale: 0.92,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.65,
          })
        }

        if (ratingRef.current) {
          gsap.from(ratingRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.85,
          })
        }

        const cardEls = cardsRef.current?.querySelectorAll<HTMLElement>("[data-gallery-card]")
        if (cardEls?.length) {
          gsap.from(cardEls, {
            y: 160,
            opacity: 0,
            rotateX: 18,
            rotateY: (index) => (index - 1.5) * 18,
            duration: 1.4,
            stagger: 0.12,
            ease: "power4.out",
            delay: 0.35,
          })

          cardEls.forEach((card, index) => {
            const direction = index < 1 ? -1 : index > 2 ? 1 : 0
            gsap.to(card, {
              y: `+=${direction * 24}`,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            })
          })
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:
          `radial-gradient(48% 46% at 50% 6%, ${DARK.accentSecondary}33 0%, ${DARK.backgroundHigh}00 70%),` +
          `radial-gradient(32% 38% at 78% 74%, ${DARK.accentCyan}22 0%, ${DARK.background}00 68%),` +
          `linear-gradient(180deg, ${DARK.backgroundMid} 0%, ${DARK.background} 85%)`,
        color: DARK.text,
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            top: "28%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "78%",
            height: "64%",
            background: `radial-gradient(circle at center, ${DARK.accentSecondary}22 0%, transparent 68%)`,
            filter: "blur(72px)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "70%",
            left: "16%",
            width: "36%",
            height: "42%",
            background: `radial-gradient(circle at center, ${DARK.accentPrimary}26 0%, transparent 75%)`,
            filter: "blur(64px)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24">
        <div className="relative flex justify-center">
          <div
            ref={navRef}
            className="flex items-center gap-2 rounded-full border px-2 py-1.5 text-sm font-medium backdrop-blur"
            style={{
              borderColor: DARK.borderWeak,
              background: DARK.surface,
              boxShadow: `0 12px 40px rgba(0,0,0,0.35)`
            }}
          >
            <span
              className="mr-1 inline-flex select-none items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase"
              style={{
                background: `linear-gradient(90deg, ${DARK.accentSecondary}, ${DARK.accentPrimary})`,
                boxShadow: `0 0 18px ${DARK.accentPrimary}55`,
                letterSpacing: "0.16em",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
              Ignite
            </span>
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-1 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            ref={loginRef}
            href="#login"
            className="absolute right-0 top-0 hidden -translate-y-3 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold text-white/80 backdrop-blur md:flex"
            style={{ borderColor: DARK.borderWeak, background: DARK.surface }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2.2-7 5v1h14v-1c0-2.8-3-5-7-5Z" />
            </svg>
            Log in
          </a>
        </div>

        <div className="relative mt-20 md:mt-24">
          <svg
            ref={orbitRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 hidden h-[340px] w-full md:block"
            viewBox="0 0 1200 340"
          >
            <path
              data-orbit-path
              d="M60 280Q600-40 1140 280"
              fill="none"
              stroke={DARK.borderWeak}
              strokeWidth={1.4}
            />
            <path
              data-orbit-path
              d="M120 260Q600-10 1080 260"
              fill="none"
              stroke={DARK.borderWeak}
              strokeWidth={1.2}
              strokeDasharray="10 12"
            />
            <path
              data-orbit-path
              d="M200 240Q600 20 1000 240"
              fill="none"
              stroke={DARK.borderWeak}
              strokeWidth={1}
              strokeDasharray="6 10"
            />

            {ORBIT_ICONS.map((icon, index) => (
              <g
                key={icon.type + index}
                data-orbit-icon
                transform={`translate(${1200 * icon.cx}, ${340 * icon.cy})`}
              >
                <circle
                  r={20}
                  fill={`${DARK.backgroundHigh}B0`}
                  stroke={DARK.borderStrong}
                  strokeWidth={1}
                />
                <g transform="translate(-10 -10)" style={{ color: DARK.text }}>
                  <OrbitIcon type={icon.type} />
                </g>
              </g>
            ))}
          </svg>

          <div ref={headlineRef} className="relative z-10 mx-auto max-w-[760px] text-center">
            <div
              data-eyebrow
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase"
              style={{
                background: `${DARK.backgroundHigh}90`,
                border: `1px solid ${DARK.borderWeak}`,
                letterSpacing: "0.22em",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: DARK.accentPrimary }} />
              AI Creative Suite
            </div>

            <SplitWords
              as="h2"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 800,
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                textWrap: "balance",
                color: DARK.text,
                textShadow: `0 0 24px ${DARK.accentSecondary}30`,
                marginTop: "1.5rem",
              }}
              stagger={0.05}
              y={36}
              scrollStart="top 85%"
            >
              <W>Create</W> <W>Powerful</W> <W>AI</W>{" "}
              <W
                style={{
                  backgroundImage: `linear-gradient(92deg, ${DARK.accentSecondary} 0%, ${DARK.accentPrimary} 45%, ${DARK.accentCyan} 90%)`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Art
              </W>
              <br />
              <W>&amp;</W> <W>Images</W> <W>in</W> <W>seconds</W>
            </SplitWords>

            <p
              data-sub-anim
              className="mx-auto mt-6 max-w-[520px] text-base font-medium"
              style={{ color: DARK.textMuted, lineHeight: 1.55 }}
            >
              Generate cinematic visuals, glossy portraits, and immersive worlds from a single prompt. Sculpt the mood, lighting, and camera in seconds.
            </p>

            <button
              ref={ctaRef}
              data-sub-anim
              className="group relative mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white"
              style={{
                background: `${DARK.backgroundHigh}A0`,
                border: `1px solid ${DARK.borderStrong}`,
                boxShadow: `0 0 0 1px ${DARK.borderWeak}, 0 24px 60px rgba(0,0,0,0.45), 0 0 36px ${DARK.accentPrimary}44`,
              }}
            >
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${DARK.accentSecondary}, ${DARK.accentPrimary})`,
                  boxShadow: `0 0 18px ${DARK.accentPrimary}55`,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3.5 10.4 8.6a1 1 0 0 1-.6.6L4.5 10.5l5.3 1.3a1 1 0 0 1 .6.6L12 17l1.6-4.6a1 1 0 0 1 .6-.6l5.3-1.3-5.3-1.3a1 1 0 0 1-.6-.6Z" />
                </svg>
              </span>
              Generate
            </button>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="relative mx-auto mt-16 flex max-w-[1080px] items-end justify-center gap-4 md:mt-20"
          style={{ perspective: 1200 }}
        >
          {CARDS.map((card, index) => {
            const isPeek = Boolean(card.peek)
            return (
              <div
                key={card.src}
                data-gallery-card
                className="relative overflow-hidden rounded-[22px]"
                style={{
                  width: card.width,
                  aspectRatio: card.aspect,
                  transform: `translateY(${card.offsetY}px)`,
                  boxShadow: "0 26px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
                  border: `1px solid ${DARK.borderWeak}`,
                  filter: isPeek ? "saturate(1.35)" : "none",
                  opacity: isPeek ? 0.9 : 1,
                  pointerEvents: isPeek ? "none" : "auto",
                }}
                aria-hidden={isPeek}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 280px"
                  style={{ objectFit: "cover" }}
                  priority={index === 1}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(12,6,24,0) 35%, rgba(12,6,24,0.55) 100%)`,
                    boxShadow: isPeek ? `inset 0 0 0 1px ${DARK.accentCyan}44` : undefined,
                  }}
                />

                {index === 0 && (
                  <div
                    ref={ratingRef}
                    className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-full border px-3 py-1 text-xs font-semibold text-white"
                    style={{
                      background: `${DARK.backgroundHigh}CC`,
                      borderColor: DARK.borderStrong,
                      boxShadow: `0 12px 32px rgba(0,0,0,0.45)`
                    }}
                  >
                    <div className="flex -space-x-2">
                      {[DARK.accentPrimary, DARK.accentSecondary, DARK.accentCyan].map((tone) => (
                        <span
                          key={tone}
                          className="inline-block h-7 w-7 rounded-full border-2"
                          style={{
                            borderColor: DARK.backgroundHigh,
                            background: `radial-gradient(circle at 30% 25%, #fff8 0%, ${tone} 65%, #080026 100%)`,
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ letterSpacing: "0.12em" }}>Rated 5.0</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
