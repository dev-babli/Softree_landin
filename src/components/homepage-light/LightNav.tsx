"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { color, shadow } from "./tokens"
import { InkPill } from "./primitives"

const DEFAULT_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#process" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
]

type NavProps = {
  links?: { label: string; href: string }[]
  cta?: { label: string; href: string }
  homeHref?: string
}

export default function LightNav({
  links = DEFAULT_LINKS,
  cta = { label: "Start a project", href: "#contact" },
  homeHref = "/light",
}: NavProps = {}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4"
        style={{ paddingTop: scrolled ? 12 : 24, transition: "padding 280ms ease" }}
      >
        <nav
          className="pointer-events-auto flex w-full max-w-[1240px] items-center gap-6 px-5 py-2.5 md:px-7 md:py-3"
          style={{
            background: scrolled ? "rgba(255,250,235,0.72)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(18px) saturate(1.4)",
            WebkitBackdropFilter: "blur(18px) saturate(1.4)",
            border: `1px solid ${scrolled ? "rgba(20,20,19,0.06)" : "rgba(20,20,19,0.03)"}`,
            borderRadius: 999,
            boxShadow: scrolled
              ? "0 10px 40px rgba(127,99,21,0.12), 0 2px 8px rgba(20,20,19,0.04)"
              : shadow.pill,
            transition:
              "background 320ms ease, box-shadow 320ms ease, border-color 320ms ease",
          }}
        >
          {/* Logo */}
          <a
            href={homeHref}
            aria-label="Softree home"
            className="flex shrink-0 items-center"
            style={{ textDecoration: "none" }}
          >
            <Image
              src="/brand/softree-logo-light-bg.png"
              alt="Softree Technology"
              width={760}
              height={195}
              priority
              style={{ height: 28, width: "auto", display: "block" }}
            />
          </a>

          {/* Center links */}
          <div className="mx-auto hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "-0.3px",
                  color: color.ink,
                  textDecoration: "none",
                  opacity: 0.88,
                  transition: "opacity 200ms ease",
                }}
                className="hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="grid place-items-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "transparent",
                border: `1px solid ${color.ink}20`,
                color: color.ink,
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <InkPill href={cta.href} size="sm" className="hidden md:inline-flex">
              {cta.label}
            </InkPill>
          </div>
        </nav>
      </div>

      {/* spacer so content isn't pushed under the floating pill */}
      <div aria-hidden style={{ height: 88 }} />
    </>
  )
}
