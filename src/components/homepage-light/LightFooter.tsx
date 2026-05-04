"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { color } from "./tokens"
import { SplitWords, W } from "./SplitWords"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP)

const COLUMNS = [
  {
    title: "Services",
    links: [
      "Product strategy",
      "Design systems",
      "Engineering",
      "AI & data",
      "Platform & SRE",
      "Staff augmentation",
    ],
  },
  {
    title: "Industries",
    links: [
      "Fintech & Payments",
      "Banking & Wealth",
      "Healthcare",
      "Insurance",
      "Marketplaces",
      "Climate tech",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Press", "Trust & security", "Contact"],
  },
  {
    title: "Need help?",
    links: [
      { label: "Talk to sales", icon: "chat" },
      { label: "Existing client support", icon: "card" },
      { label: "Visit an office", icon: "pin" },
      { label: "General enquiries", icon: "help" },
    ] as { label: string; icon: string }[],
  },
]

function Icon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  if (name === "chat")
    return (
      <svg {...common}>
        <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.8-5.5A8 8 0 1 1 21 12Z" />
      </svg>
    )
  if (name === "card")
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    )
  if (name === "pin")
    return (
      <svg {...common}>
        <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    )
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7V14" />
      <circle cx="12" cy="17.5" r=".8" fill="currentColor" />
    </svg>
  )
}

export default function LightFooter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // headline words
      const words = root.querySelectorAll<HTMLElement>("[data-sw]")
      if (words.length) {
        gsap.from(words, {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.04, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 90%", once: true },
        })
      }
      // columns stagger
      const cols = root.querySelectorAll<HTMLElement>("[data-footer-col]")
      if (cols.length) {
        gsap.from(cols, {
          y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        })
      }
      // bottom row
      const bottom = root.querySelector<HTMLElement>("[data-footer-bottom]")
      if (bottom) {
        gsap.from(bottom, {
          y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: bottom, start: "top 95%", once: true },
        })
      }
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <footer
      ref={ref}
      className="w-full"
      style={{ background: color.ink, color: color.canvas }}
    >
      {/* Sunset gradient transition from amber to ink (Mistral footer) */}
      <div
        aria-hidden
        style={{
          height: 120,
          background: `linear-gradient(180deg, ${color.canvas} 0%, ${color.sunshine}55 32%, ${color.flame}66 58%, ${color.ink} 100%)`,
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-32 md:pt-24">
        {/* Conversational headline */}
        <SplitWords
          as="h2"
          className="max-w-[920px]"
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 500,
            lineHeight: 1.0,
            letterSpacing: "-0.028em",
            color: color.canvas,
            textWrap: "balance",
          }}
          scrollStart="top 90%"
          stagger={0.04}
          y={25}
        >
          <W>We&apos;re</W> <W>always</W> <W>here</W> <W>when</W> <W>you</W> <W>need</W> <W>us.</W>
        </SplitWords>

        <div className="mt-16 grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-x-8">
          {COLUMNS.map((col) => (
            <div key={col.title} data-footer-col>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.56px",
                  textTransform: "uppercase",
                  color: color.dustTaupe,
                  marginBottom: 18,
                }}
              >
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => {
                  const isObj = typeof l !== "string"
                  const label = isObj ? l.label : l
                  return (
                    <li key={label}>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 transition-opacity hover:opacity-100"
                        style={{
                          fontSize: 14,
                          fontWeight: 450,
                          color: color.canvas,
                          textDecoration: "none",
                          opacity: 0.86,
                        }}
                      >
                        {isObj ? <Icon name={l.icon} /> : null}
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-20"
          style={{ height: 1, background: "rgba(255,255,255,0.18)" }}
        />

        {/* Bottom row */}
        <div data-footer-bottom className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: `conic-gradient(from 220deg, ${color.mistral}, ${color.sunshine}, ${color.yellow}, ${color.mistral})`,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 450,
                color: color.dustTaupe,
              }}
            >
              © {new Date().getFullYear()} Softree Technology. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {["Privacy", "Terms", "Cookies", "Trust centre"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontSize: 13,
                  fontWeight: 450,
                  color: color.dustTaupe,
                  textDecoration: "none",
                }}
              >
                {t}
              </a>
            ))}

            {/* Country selector pill */}
            <button
              type="button"
              className="flex items-center gap-2 transition-opacity hover:opacity-100"
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.4)",
                background: "transparent",
                color: color.canvas,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                opacity: 0.9,
              }}
            >
              <span>🌍</span> Global
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Socials */}
            <div className="flex items-center gap-3 pl-2">
              {["in", "X", "f", "▶"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "grid",
                    placeItems: "center",
                    color: color.canvas,
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
