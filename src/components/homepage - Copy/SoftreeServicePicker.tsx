"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP)

type ServiceOption = {
  key: string
  index: string
  category: string
  title: string
  short: string
  description: string
  fit: string
  href: string
  image: string
  accent: string
  outcomes: string[]
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    key: "agentic-ai",
    index: "01",
    category: "AI Intelligence",
    title: "Agentic AI",
    short: "Autonomous workflows that move work across tools without adding another dashboard.",
    description:
      "We design AI agents around the approvals, documents, and operational loops that slow your team down, then wire them into the systems your people already use.",
    fit: "Best when your team is repeating judgment-heavy steps across CRM, M365, finance, or support workflows.",
    href: "/services/ai-intelligence/agentic-ai",
    image: "/whysoftree/ai.webp",
    accent: "#0089ff",
    outcomes: ["Workflow agents", "Human approval paths", "Governed automation"],
  },
  {
    key: "generative-ai",
    index: "02",
    category: "AI Intelligence",
    title: "Generative AI",
    short: "Domain-aware assistants, copilots, and content systems built on your business context.",
    description:
      "We turn private knowledge, documents, and product logic into useful AI interfaces with retrieval, guardrails, and measurable adoption loops.",
    fit: "Best when teams need answers or content from scattered internal knowledge without exposing sensitive context.",
    href: "/services/ai-intelligence/generative-ai",
    image: "/gif_assetsforservices/Scene.gif",
    accent: "#5a6bfd",
    outcomes: ["RAG systems", "Copilot interfaces", "Secure prompts"],
  },
  {
    key: "web-apps",
    index: "03",
    category: "Digital Workspace",
    title: "Web Apps",
    short: "Fast, production-ready web platforms for customer, employee, and partner workflows.",
    description:
      "From dashboards to transactional portals, we build modern web applications with clean UX, reliable delivery pipelines, and performance budgets from day one.",
    fit: "Best when a spreadsheet, legacy portal, or disconnected process needs to become a real product experience.",
    href: "/services/digital-workspace/web-app-development",
    image: "/whysoftree/web dev.webp",
    accent: "#0ae448",
    outcomes: ["Next.js builds", "API integrations", "Launch analytics"],
  },
  {
    key: "mobile-apps",
    index: "04",
    category: "Digital Workspace",
    title: "Mobile Apps",
    short: "Mobile experiences for field teams, customers, and operations that need speed on the move.",
    description:
      "We ship mobile apps that pair clean interaction design with secure data access, offline-aware flows, and the backend services required to scale.",
    fit: "Best when your workflow happens away from a desk and needs a native-feeling app experience.",
    href: "/services/digital-workspace/mobile-app-development",
    image: "/whysoftree/web.webp",
    accent: "#ff6b00",
    outcomes: ["React Native apps", "Offline-ready flows", "Secure sign-in"],
  },
  {
    key: "power-platform",
    index: "05",
    category: "Business Apps",
    title: "Power Platform",
    short: "Power Apps and automation for business teams that need speed without losing governance.",
    description:
      "We build Power Apps, Power Automate flows, and Microsoft 365 integrations that replace manual work with controlled, maintainable systems.",
    fit: "Best when the business needs fast internal tools but IT still needs security, ownership, and lifecycle discipline.",
    href: "/services/business-applications/power-apps",
    image: "/whysoftree/microsoft.webp",
    accent: "#742774",
    outcomes: ["Power Apps", "Automated approvals", "M365 integration"],
  },
  {
    key: "analytics",
    index: "06",
    category: "Data Analytics",
    title: "Power BI",
    short: "Decision dashboards and data models that make performance visible before it becomes urgent.",
    description:
      "We connect, clean, model, and visualize your operational data so leadership can see the right metrics and teams can act without waiting for manual reporting.",
    fit: "Best when reports are slow, metrics conflict, or teams need one trusted view of performance.",
    href: "/services/data-analytics/power-bi",
    image: "/whysoftree/data.webp",
    accent: "#f2c811",
    outcomes: ["Power BI dashboards", "Data models", "Executive reporting"],
  },
]

export function SoftreeServicePicker() {
  const rootRef = useRef<HTMLElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLButtonElement>(null)
  const shellRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef<number | null>(null)
  const previousOverflowRef = useRef<string>("")

  const { contextSafe } = useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-picker-shell")
      const headerItems = gsap.utils.toArray<HTMLElement>(".service-picker-reveal")

      gsap.set([modalRef.current, overlayRef.current], { autoAlpha: 0 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from(headerItems, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.08,
        })
        .from(
          cards,
          {
            autoAlpha: 0,
            y: 36,
            scale: 0.96,
            duration: 0.7,
            stagger: { each: 0.07, from: "start" },
          },
          "-=0.35"
        )

      return () => {
        const activeIndex = activeIndexRef.current
        if (activeIndex !== null) {
          const card = cardRefs.current[activeIndex]
          const shell = shellRefs.current[activeIndex]
          if (card && shell) {
            card.classList.remove("is-expanded")
            card.setAttribute("aria-expanded", "false")
            shell.appendChild(card)
          }
        }
        document.documentElement.style.overflow = previousOverflowRef.current
      }
    },
    { scope: rootRef }
  )

  const closeActive = contextSafe(() => {
    const activeIndex = activeIndexRef.current
    if (activeIndex === null) return

    const card = cardRefs.current[activeIndex]
    const shell = shellRefs.current[activeIndex]
    const modal = modalRef.current
    const overlay = overlayRef.current

    if (!card || !shell || !modal || !overlay) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const state = Flip.getState(card)

    card.classList.remove("is-expanded")
    card.setAttribute("aria-expanded", "false")
    shell.appendChild(card)
    activeIndexRef.current = null
    document.documentElement.style.overflow = previousOverflowRef.current

    gsap.to([overlay, modal], {
      autoAlpha: 0,
      duration: reduceMotion ? 0.01 : 0.28,
      ease: "power1.inOut",
      onComplete: () => {
        modal.setAttribute("aria-hidden", "true")
        gsap.set(card, { zIndex: "auto", clearProps: "zIndex" })
      },
    })

    Flip.from(state, {
      duration: reduceMotion ? 0.01 : 0.68,
      ease: "power3.inOut",
      absolute: true,
      nested: true,
    })
  })

  const openCard = contextSafe((index: number) => {
    if (activeIndexRef.current === index) {
      closeActive()
      return
    }

    if (activeIndexRef.current !== null) return

    const card = cardRefs.current[index]
    const modal = modalRef.current
    const modalContent = modalContentRef.current
    const overlay = overlayRef.current

    if (!card || !modal || !modalContent || !overlay) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const state = Flip.getState(card)

    previousOverflowRef.current = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    activeIndexRef.current = index

    modalContent.appendChild(card)
    card.classList.add("is-expanded")
    card.setAttribute("aria-expanded", "true")
    modal.setAttribute("aria-hidden", "false")

    gsap.set(modal, { autoAlpha: 1 })
    gsap.set(card, { zIndex: 1002 })

    Flip.from(state, {
      duration: reduceMotion ? 0.01 : 0.78,
      ease: "power3.inOut",
      absolute: true,
      nested: true,
      onComplete: () => {
        card.querySelector<HTMLElement>(".service-picker-close")?.focus()
      },
    })

    gsap.to(overlay, {
      autoAlpha: 0.74,
      duration: reduceMotion ? 0.01 : 0.35,
      ease: "power1.out",
    })

    if (!reduceMotion) {
      gsap.fromTo(
        card.querySelectorAll(".service-picker-expanded-reveal"),
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.46,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.18,
        }
      )
    }
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeActive()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeActive])

  return (
    <section ref={rootRef} className="service-picker-section" aria-labelledby="service-picker-title">
      <div className="service-picker-inner">
        <header className="service-picker-header">
          <div className="service-picker-copy">
            <div className="service-picker-kicker service-picker-reveal">
              <span className="service-picker-kicker-line" />
              <span>Service Picker</span>
            </div>
            <h2 id="service-picker-title" className="service-picker-title service-picker-reveal">
              Choose the build lane that matches your bottleneck.
            </h2>
          </div>
          <p className="service-picker-intro service-picker-reveal">
            Open a service card to preview fit, outcomes, and the right next page without leaving the
            homepage flow.
          </p>
        </header>

        <div className="service-picker-grid" aria-label="Softree services">
          {SERVICE_OPTIONS.map((service, index) => (
            <div
              key={service.key}
              ref={(node) => {
                shellRefs.current[index] = node
              }}
              className="service-picker-shell"
              style={{ "--service-accent": service.accent } as React.CSSProperties}
            >
              <div
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className="service-picker-card"
                role="button"
                tabIndex={0}
                aria-expanded={false}
                aria-label={`Preview ${service.title}`}
                onClick={(event) => {
                  const target = event.target as HTMLElement
                  if (target.closest("a, button")) return
                  openCard(index)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    openCard(index)
                  }
                }}
              >
                <div className="service-picker-media" aria-hidden>
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    unoptimized={service.image.endsWith(".gif")}
                    sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="service-picker-image"
                  />
                  <div className="service-picker-media-grid" />
                  <div className="service-picker-media-scrim" />
                </div>

                <div className="service-picker-compact">
                  <div className="service-picker-card-top">
                    <span>{service.index}</span>
                    <span>{service.category}</span>
                  </div>
                  <div className="service-picker-card-bottom">
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                  </div>
                </div>

                <div className="service-picker-detail">
                  <button
                    type="button"
                    className="service-picker-close"
                    onClick={(event) => {
                      event.stopPropagation()
                      closeActive()
                    }}
                    aria-label={`Close ${service.title} preview`}
                  >
                    Close
                  </button>

                  <div className="service-picker-detail-main">
                    <div className="service-picker-expanded-reveal service-picker-detail-index">
                      <span>{service.index}</span>
                      <span>{service.category}</span>
                    </div>
                    <h3 className="service-picker-expanded-reveal">{service.title}</h3>
                    <p className="service-picker-expanded-reveal service-picker-detail-copy">
                      {service.description}
                    </p>
                    <p className="service-picker-expanded-reveal service-picker-fit">{service.fit}</p>
                  </div>

                  <div className="service-picker-detail-footer">
                    <ul className="service-picker-outcomes" aria-label={`${service.title} outcomes`}>
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="service-picker-expanded-reveal">
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.href}
                      className="service-picker-link service-picker-expanded-reveal"
                      onClick={(event) => event.stopPropagation()}
                    >
                      View service
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={modalRef}
        className="service-picker-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Service preview"
        aria-hidden="true"
      >
        <button
          ref={overlayRef}
          type="button"
          className="service-picker-overlay"
          onClick={closeActive}
          aria-label="Close service preview"
        />
        <div ref={modalContentRef} className="service-picker-modal-content" />
      </div>

      <style jsx>{`
        .service-picker-section {
          position: relative;
          width: 100%;
          overflow: clip;
          background:
            linear-gradient(180deg, #080808 0%, #050505 52%, #0a0a0a 100%);
          color: #f7f4ee;
          font-family: "Inter", sans-serif;
          color-scheme: dark;
        }

        .service-picker-inner {
          width: min(100% - 2rem, 1240px);
          margin: 0 auto;
          padding: clamp(4rem, 8vw, 7.5rem) 0;
        }

        .service-picker-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: end;
          margin-bottom: clamp(2rem, 4vw, 3.25rem);
        }

        .service-picker-copy {
          display: grid;
          gap: 1rem;
          min-width: 0;
        }

        .service-picker-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: #ff6b00;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .service-picker-kicker-line {
          width: 44px;
          height: 1px;
          background: linear-gradient(90deg, #ff6b00, transparent);
          opacity: 0.8;
        }

        .service-picker-title {
          max-width: 850px;
          margin: 0;
          color: #fff;
          font-size: clamp(2.45rem, 6vw, 5.7rem);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .service-picker-intro {
          max-width: 360px;
          margin: 0;
          color: rgba(255, 255, 255, 0.46);
          font-size: 0.95rem;
          line-height: 1.7;
          text-wrap: pretty;
        }

        .service-picker-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.85rem;
        }

        .service-picker-shell {
          min-width: 0;
          aspect-ratio: 1 / 1;
          padding: 0.48rem;
          border: 1px dashed rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          transition:
            border-color 180ms ease,
            background-color 180ms ease;
        }

        .service-picker-shell:hover {
          border-color: color-mix(in srgb, var(--service-accent) 72%, rgba(255, 255, 255, 0.2));
          background: color-mix(in srgb, var(--service-accent) 7%, rgba(255, 255, 255, 0.02));
        }

        .service-picker-card {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 8px;
          background: #111;
          cursor: pointer;
          isolation: isolate;
          outline: none;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transform-origin: center center;
          will-change: transform, opacity;
        }

        .service-picker-card:focus-visible {
          box-shadow:
            0 0 0 2px #050505,
            0 0 0 4px var(--service-accent),
            0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .service-picker-card:hover :global(.service-picker-image) {
          transform: scale(1.06);
        }

        .service-picker-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #111;
        }

        :global(.service-picker-image) {
          object-fit: cover;
          object-position: center;
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .service-picker-media-grid {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 42px 42px;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .service-picker-media-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.1) 38%, rgba(0, 0, 0, 0.82) 100%),
            radial-gradient(720px 360px at 18% 12%, color-mix(in srgb, var(--service-accent) 34%, transparent), transparent 62%);
          pointer-events: none;
        }

        .service-picker-compact {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1rem, 2vw, 1.35rem);
        }

        .service-picker-card-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.72);
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .service-picker-card-top span:first-child {
          color: var(--service-accent);
          font-size: clamp(1.1rem, 1.8vw, 1.55rem);
          letter-spacing: 0;
        }

        .service-picker-card-bottom {
          display: grid;
          gap: 0.7rem;
        }

        .service-picker-card-bottom h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(1.7rem, 3.2vw, 2.65rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: 0;
        }

        .service-picker-card-bottom p {
          max-width: 30ch;
          margin: 0;
          color: rgba(255, 255, 255, 0.64);
          font-size: 0.84rem;
          line-height: 1.55;
        }

        .service-picker-detail {
          display: none;
        }

        .service-picker-modal {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .service-picker-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          background: #000;
          opacity: 0;
          cursor: pointer;
          pointer-events: auto;
        }

        .service-picker-modal-content {
          position: relative;
          z-index: 1;
          width: min(1120px, calc(100vw - 2rem));
          height: min(78svh, 720px);
          pointer-events: auto;
        }

        .service-picker-modal-content :global(.service-picker-card) {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.03fr) minmax(360px, 0.97fr);
          cursor: default;
          border-color: color-mix(in srgb, var(--service-accent) 38%, rgba(255, 255, 255, 0.18));
          background: #090909;
        }

        .service-picker-modal-content :global(.service-picker-media) {
          position: relative;
          min-height: 0;
        }

        .service-picker-modal-content :global(.service-picker-media-scrim) {
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.54)),
            radial-gradient(760px 440px at 18% 16%, color-mix(in srgb, var(--service-accent) 30%, transparent), transparent 66%);
        }

        .service-picker-modal-content :global(.service-picker-compact) {
          display: none;
        }

        .service-picker-modal-content :global(.service-picker-detail) {
          position: relative;
          z-index: 2;
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          padding: clamp(1.25rem, 3vw, 2.4rem);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
            #0b0b0b;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-picker-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          min-height: 2.2rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.72);
          padding: 0.55rem 0.72rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            background-color 180ms ease,
            color 180ms ease,
            border-color 180ms ease;
        }

        .service-picker-close:hover,
        .service-picker-close:focus-visible {
          border-color: var(--service-accent);
          background: color-mix(in srgb, var(--service-accent) 14%, rgba(255, 255, 255, 0.06));
          color: #fff;
          outline: none;
        }

        .service-picker-detail-main {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: clamp(0.9rem, 1.6vw, 1.25rem);
          padding-top: 2.2rem;
        }

        .service-picker-detail-index {
          display: flex;
          align-items: baseline;
          gap: 0.9rem;
          color: rgba(255, 255, 255, 0.48);
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .service-picker-detail-index span:first-child {
          color: var(--service-accent);
          font-size: clamp(1.5rem, 3vw, 2.35rem);
          letter-spacing: 0;
        }

        .service-picker-detail h3 {
          max-width: 9ch;
          margin: 0;
          color: #fff;
          font-size: clamp(3.1rem, 7vw, 6.6rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .service-picker-detail-copy {
          max-width: 50ch;
          margin: 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: clamp(0.96rem, 1.1vw, 1.06rem);
          line-height: 1.65;
        }

        .service-picker-fit {
          max-width: 52ch;
          margin: 0;
          border-left: 2px solid var(--service-accent);
          padding-left: 0.9rem;
          color: rgba(255, 255, 255, 0.82);
          font-size: clamp(0.9rem, 1vw, 1rem);
          line-height: 1.55;
        }

        .service-picker-detail-footer {
          display: grid;
          gap: 1rem;
        }

        .service-picker-outcomes {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .service-picker-outcomes li {
          min-width: 0;
          min-height: 2.35rem;
          display: flex;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.72);
          padding: 0.52rem 0.7rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1.3;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .service-picker-link {
          min-height: 2.85rem;
          display: inline-flex;
          width: fit-content;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--service-accent);
          border-radius: 6px;
          background: var(--service-accent);
          color: #050505;
          padding: 0.78rem 1rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.74rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            transform 180ms ease,
            filter 180ms ease;
        }

        .service-picker-link:hover,
        .service-picker-link:focus-visible {
          transform: translateY(-1px);
          filter: brightness(1.08);
          outline: none;
        }

        @media (max-width: 1100px) {
          .service-picker-header {
            grid-template-columns: 1fr;
          }

          .service-picker-intro {
            max-width: 620px;
          }

          .service-picker-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .service-picker-modal-content {
            height: min(82svh, 760px);
          }

          .service-picker-modal-content :global(.service-picker-card) {
            grid-template-columns: 1fr;
            grid-template-rows: minmax(220px, 0.82fr) minmax(0, 1fr);
          }

          .service-picker-modal-content :global(.service-picker-detail) {
            border-left: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .service-picker-detail h3 {
            max-width: 12ch;
            font-size: clamp(2.6rem, 9vw, 4.6rem);
          }
        }

        @media (max-width: 720px) {
          .service-picker-inner {
            width: min(100% - 1.5rem, 1240px);
            padding: 4rem 0;
          }

          .service-picker-grid {
            grid-template-columns: 1fr;
          }

          .service-picker-shell {
            aspect-ratio: 1.08 / 1;
          }

          .service-picker-card-bottom h3 {
            font-size: clamp(2rem, 12vw, 3.4rem);
          }

          .service-picker-modal {
            align-items: flex-end;
          }

          .service-picker-modal-content {
            width: 100%;
            height: min(88svh, 760px);
            padding: 0.75rem;
          }

          .service-picker-modal-content :global(.service-picker-card) {
            border-radius: 10px;
            grid-template-rows: minmax(180px, 0.58fr) minmax(0, 1fr);
          }

          .service-picker-modal-content :global(.service-picker-detail) {
            padding: 1.15rem;
            gap: 1.2rem;
            overflow-y: auto;
          }

          .service-picker-detail-main {
            padding-top: 2.8rem;
          }

          .service-picker-detail h3 {
            max-width: 100%;
            font-size: clamp(2.4rem, 14vw, 3.8rem);
            line-height: 0.95;
          }

          .service-picker-outcomes {
            grid-template-columns: 1fr;
          }

          .service-picker-link {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-picker-card,
          :global(.service-picker-image),
          .service-picker-link {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default SoftreeServicePicker
