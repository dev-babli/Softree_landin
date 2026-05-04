"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import Image from "next/image"
import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { FiArrowRight } from "react-icons/fi"

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP)

type ServiceOption = {
  key: string
  index: string
  category: string
  title: string
  short: string
  description: string
  fit: string
  moment: string
  signal: string
  move: string
  result: string
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
    short: "Approvals, summaries, and follow-ups move slower than the team.",
    description:
      "We design AI agents around the approvals, documents, and operational loops that slow your team down, then wire them into the systems your people already use.",
    fit: "Best when your team is repeating judgment-heavy steps across CRM, M365, finance, or support workflows.",
    moment: "The work is trapped in handoffs.",
    signal: "Approvals, summaries, and follow-ups move slower than the people waiting on them.",
    move: "We place governed AI agents around the real workflow, with humans still controlling the decisions that matter.",
    result: "Less manual routing, faster response loops, and ownership that stays visible.",
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
    short: "Docs, policies, and product context are scattered across tools.",
    description:
      "We turn private knowledge, documents, and product logic into useful AI interfaces with retrieval, guardrails, and measurable adoption loops.",
    fit: "Best when teams need answers or content from scattered internal knowledge without exposing sensitive context.",
    moment: "The knowledge exists, but nobody can reach it.",
    signal: "Teams waste time searching documents, asking the same questions, and rebuilding context.",
    move: "We build retrieval-backed copilots that answer from trusted sources, with prompts and guardrails shaped around your domain.",
    result: "People get accurate answers faster without exposing sensitive business context.",
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
    short: "Customers and teams are relying on brittle portals, forms, and manual checks.",
    description:
      "From dashboards to transactional portals, we build modern web applications with clean UX, reliable delivery pipelines, and performance budgets from day one.",
    fit: "Best when a spreadsheet, legacy portal, or disconnected process needs to become a real product experience.",
    moment: "The business has outgrown the spreadsheet.",
    signal: "Critical workflows depend on disconnected forms, brittle portals, and manual status checks.",
    move: "We turn the workflow into a fast web product with clear UX, integrations, and a delivery pipeline that can scale.",
    result: "The operation gets a system people can actually use, measure, and improve.",
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
    short: "Field teams need speed, offline-ready flows, and secure access.",
    description:
      "We ship mobile apps that pair clean interaction design with secure data access, offline-aware flows, and the backend services required to scale.",
    fit: "Best when your workflow happens away from a desk and needs a native-feeling app experience.",
    moment: "The workflow happens away from the desk.",
    signal: "Field teams need secure access, quick capture, and decisions that still work when connectivity drops.",
    move: "We design mobile experiences that carry the operation into the field without making the backend messy.",
    result: "Fewer delays, cleaner data capture, and better service moments for customers and teams.",
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
    short: "Business teams need automation fast, but IT still needs governance.",
    description:
      "We build Power Apps, Power Automate flows, and Microsoft 365 integrations that replace manual work with controlled, maintainable systems.",
    fit: "Best when the business needs fast internal tools but IT still needs security, ownership, and lifecycle discipline.",
    moment: "Internal tools need to ship before the quarter ends.",
    signal: "Manual approvals and Excel-based tracking are blocking teams that already know what they need.",
    move: "We build Power Apps and Power Automate flows with security, ownership, and lifecycle discipline from the start.",
    result: "Fast internal systems without creating shadow-IT sprawl or future cleanup work.",
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
    short: "Reports are slow, definitions conflict, and decisions wait for cleanup.",
    description:
      "We connect, clean, model, and visualize your operational data so leadership can see the right metrics and teams can act without waiting for manual reporting.",
    fit: "Best when reports are slow, metrics conflict, or teams need one trusted view of performance.",
    moment: "The numbers do not line up.",
    signal: "Reports arrive late, definitions conflict, and leaders wait for manual cleanup before acting.",
    move: "We model the data and publish trusted Power BI views that make performance visible at the right level.",
    result: "Leadership sees the same truth while teams spot risk earlier and move with more confidence.",
    href: "/services/data-analytics/power-bi",
    image: "/whysoftree/data.webp",
    accent: "#f2c811",
    outcomes: ["Power BI dashboards", "Data models", "Executive reporting"],
  },
]

export function LCServicePicker() {
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
      const cards = gsap.utils.toArray<HTMLElement>(".lc-service-picker-shell")
      const headerItems = gsap.utils.toArray<HTMLElement>(".lc-service-picker-reveal")

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
        card.querySelector<HTMLElement>(".lc-service-picker-close")?.focus()
      },
    })

    gsap.to(overlay, {
      autoAlpha: 0.74,
      duration: reduceMotion ? 0.01 : 0.35,
      ease: "power1.out",
    })

    if (!reduceMotion) {
      gsap.fromTo(
        card.querySelectorAll(".lc-service-picker-expanded-reveal"),
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
    <section ref={rootRef} className="lc-service-picker-section" aria-labelledby="lc-service-picker-title">
      <div className="lc-service-picker-inner">
        <header className="lc-service-picker-header">
          <div className="lc-service-picker-copy">
            <div className="lc-service-picker-kicker lc-service-picker-reveal">
              <span className="lc-service-picker-kicker-line" />
              <span>Choose Your Bottleneck</span>
            </div>
            <h2 id="lc-service-picker-title" className="lc-service-picker-title lc-service-picker-reveal">
              Every build starts with the constraint you need to break.
            </h2>
          </div>
          <div className="lc-service-picker-intro lc-service-picker-reveal" aria-label="Softree pathway guide">
            <p>
              Pick the scene that looks closest to your business. Each card opens into the Softree move,
              the outcome, and the next route through the website.
            </p>
            <div className="lc-service-picker-route" aria-hidden>
              <span>Spot constraint</span>
              <span>Open pathway</span>
              <span>Choose build lane</span>
            </div>
          </div>
        </header>

        <div className="lc-service-picker-grid" aria-label="Softree services">
          {SERVICE_OPTIONS.map((service, index) => (
            <div
              key={service.key}
              ref={(node) => {
                shellRefs.current[index] = node
              }}
              className="lc-service-picker-shell"
              style={{ "--service-accent": service.accent } as CSSProperties}
            >
              <div
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className="lc-service-picker-card"
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
                <div className="lc-service-picker-media" aria-hidden>
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    unoptimized={service.image.endsWith(".gif")}
                    sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="lc-service-picker-image"
                  />
                  <div className="lc-service-picker-media-grid" />
                  <div className="lc-service-picker-media-scrim" />
                </div>

                <div className="lc-service-picker-compact">
                  <div className="lc-service-picker-card-top">
                    <span>{service.index}</span>
                    <span>{service.category}</span>
                  </div>
                  <div className="lc-service-picker-card-bottom">
                    <span className="lc-service-picker-card-step">Bottleneck</span>
                    <h3>{service.moment}</h3>
                    <p>{service.short}</p>
                    <span className="lc-service-picker-card-cta">
                      <span>Open pathway</span>
                      <FiArrowRight className="lc-service-picker-card-cta-icon" aria-hidden />
                    </span>
                  </div>
                </div>

                <div className="lc-service-picker-detail">
                  <button
                    type="button"
                    className="lc-service-picker-close"
                    onClick={(event) => {
                      event.stopPropagation()
                      closeActive()
                    }}
                    aria-label={`Close ${service.title} preview`}
                  >
                    Close
                  </button>

                  <div className="lc-service-picker-detail-main">
                    <div className="lc-service-picker-expanded-reveal lc-service-picker-detail-index">
                      <span>{service.index}</span>
                      <span>{service.category}</span>
                    </div>
                    <div className="lc-service-picker-expanded-reveal lc-service-picker-detail-title-block">
                      <span>{service.title}</span>
                      <h3>{service.moment}</h3>
                    </div>
                    <p className="lc-service-picker-expanded-reveal lc-service-picker-detail-copy">
                      {service.description}
                    </p>
                    <div className="lc-service-picker-story-blocks" aria-label={`${service.title} pathway`}>
                      <div className="lc-service-picker-expanded-reveal lc-service-picker-story-block">
                        <span>Bottleneck</span>
                        <p>{service.signal}</p>
                      </div>
                      <div className="lc-service-picker-expanded-reveal lc-service-picker-story-block">
                        <span>Softree move</span>
                        <p>{service.move}</p>
                      </div>
                      <div className="lc-service-picker-expanded-reveal lc-service-picker-story-block">
                        <span>Outcome</span>
                        <p>{service.result}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lc-service-picker-detail-footer">
                    <p className="lc-service-picker-expanded-reveal lc-service-picker-fit">{service.fit}</p>
                    <ul className="lc-service-picker-outcomes" aria-label={`${service.title} outcomes`}>
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="lc-service-picker-expanded-reveal">
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <div className="lc-service-picker-actions lc-service-picker-expanded-reveal">
                      <a
                        href={`/contact?service=${service.key}`}
                        className="lc-service-picker-hero-cta lc-service-picker-hero-cta-primary"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span>Start a project</span>
                        <FiArrowRight className="lc-service-picker-hero-cta-icon" aria-hidden />
                      </a>
                      <a
                        href={service.href}
                        className="lc-service-picker-hero-cta lc-service-picker-hero-cta-secondary"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span>View service</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={modalRef}
        className="lc-service-picker-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Service preview"
        aria-hidden="true"
      >
        <button
          ref={overlayRef}
          type="button"
          className="lc-service-picker-overlay"
          onClick={closeActive}
          aria-label="Close service preview"
        />
        <div ref={modalContentRef} className="lc-service-picker-modal-content" />
      </div>

      <style jsx>{`
        .lc-service-picker-section {
          position: relative;
          width: 100%;
          overflow: clip;
          isolation: isolate;
          background:
            linear-gradient(180deg, #F3F0EE 0%, #F3F0EE 18%, #F3F0EE 72%, #F3F0EE 100%);
          color: #141413;
          font-family: "Inter", sans-serif;
          color-scheme: light;
        }

        .lc-service-picker-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(90deg, rgba(20, 20, 19, 0.04) 1px, transparent 1px),
            linear-gradient(rgba(20, 20, 19, 0.03) 1px, transparent 1px),
            linear-gradient(135deg, rgba(251, 100, 36, 0.08), transparent 34%, rgba(127, 99, 21, 0.07) 68%, transparent);
          background-size: 96px 96px, 96px 96px, 100% 100%;
          mask-image: linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%);
          opacity: 0.62;
        }

        .lc-service-picker-inner {
          position: relative;
          z-index: 1;
          width: min(100% - 2rem, 1240px);
          margin: 0 auto;
          padding: clamp(4rem, 8vw, 7.5rem) 0;
        }

        .lc-service-picker-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: end;
          margin-bottom: clamp(2rem, 4vw, 3.25rem);
        }

        .lc-service-picker-copy {
          display: grid;
          gap: 1rem;
          min-width: 0;
        }

        .lc-service-picker-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: #fb6424;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .lc-service-picker-kicker-line {
          width: 44px;
          height: 1px;
          background: linear-gradient(90deg, #fb6424, transparent);
          opacity: 0.8;
        }

        .lc-service-picker-title {
          max-width: 850px;
          margin: 0;
          color: #141413;
          font-size: clamp(2.45rem, 6vw, 5.7rem);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .lc-service-picker-intro {
          display: grid;
          gap: 1.05rem;
          max-width: 360px;
          margin: 0;
          padding-left: 1.1rem;
          border-left: 1px solid #D1CDC7;
        }

        .lc-service-picker-intro p {
          margin: 0;
          color: #696969;
          font-size: 0.95rem;
          line-height: 1.7;
          text-wrap: pretty;
        }

        .lc-service-picker-route {
          display: grid;
          gap: 0.5rem;
        }

        .lc-service-picker-route span {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: #696969;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.64rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lc-service-picker-route span::before {
          content: "";
          width: 6px;
          height: 6px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: #fb6424;
          box-shadow: 0 0 18px rgba(251, 100, 36, 0.5);
        }

        .lc-service-picker-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.85rem;
        }

        .lc-service-picker-grid::before {
          content: "";
          position: absolute;
          left: 0.5rem;
          right: 0.5rem;
          top: 50%;
          z-index: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251, 100, 36, 0.42), rgba(127, 99, 21, 0.3), transparent);
          opacity: 0.55;
          pointer-events: none;
        }

        .lc-service-picker-shell {
          position: relative;
          z-index: 1;
          min-width: 0;
          aspect-ratio: 1 / 1;
          padding: 0.48rem;
          border: 1px dashed #D1CDC7;
          border-radius: 10px;
          background: rgba(20, 20, 19, 0.02);
          transition:
            border-color 180ms ease,
            background-color 180ms ease;
        }

        .lc-service-picker-shell:hover {
          border-color: color-mix(in srgb, var(--service-accent) 72%, #D1CDC7);
          background: color-mix(in srgb, var(--service-accent) 7%, rgba(20, 20, 19, 0.02));
        }

        .lc-service-picker-card {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 1px solid #D1CDC7;
          border-radius: 8px;
          background: #FCFBFA;
          cursor: pointer;
          isolation: isolate;
          outline: none;
          box-shadow:
            rgba(127,99,21,0.12) -8px 16px 39px,
            rgba(127,99,21,0.10) -33px 64px 72px;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        .lc-service-picker-card::after {
          content: "";
          position: absolute;
          left: clamp(1rem, 2vw, 1.35rem);
          right: clamp(1rem, 2vw, 1.35rem);
          bottom: clamp(1rem, 2vw, 1.35rem);
          z-index: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--service-accent), rgba(20, 20, 19, 0.38), transparent);
          opacity: 0.62;
          transform: scaleX(0.22);
          transform-origin: left center;
          transition:
            opacity 220ms ease,
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .lc-service-picker-card:hover::after,
        .lc-service-picker-card:focus-visible::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .lc-service-picker-card:focus-visible {
          box-shadow:
            0 0 0 2px #F3F0EE,
            0 0 0 4px var(--service-accent),
            rgba(127,99,21,0.12) -8px 16px 39px,
            rgba(127,99,21,0.10) -33px 64px 72px;
        }

        .lc-service-picker-card:hover :global(.lc-service-picker-image) {
          transform: scale(1.06);
        }

        .lc-service-picker-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #FCFBFA;
        }

        :global(.lc-service-picker-image) {
          object-fit: cover;
          object-position: center;
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .lc-service-picker-media-grid {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(20, 20, 19, 0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 20, 19, 0.1) 1px, transparent 1px);
          background-size: 42px 42px;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .lc-service-picker-media-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(243, 240, 238, 0.28) 0%, rgba(243, 240, 238, 0.1) 38%, rgba(243, 240, 238, 0.82) 100%),
            radial-gradient(720px 360px at 18% 12%, color-mix(in srgb, var(--service-accent) 34%, transparent), transparent 62%);
          pointer-events: none;
        }

        .lc-service-picker-compact {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1rem, 2vw, 1.35rem);
        }

        .lc-service-picker-card-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          color: #696969;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .lc-service-picker-card-top span:first-child {
          color: var(--service-accent);
          font-size: clamp(1.1rem, 1.8vw, 1.55rem);
          letter-spacing: 0;
        }

        .lc-service-picker-card-bottom {
          display: grid;
          gap: 0.7rem;
          align-content: end;
        }

        .lc-service-picker-card-step {
          color: var(--service-accent);
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.64rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          line-height: 1;
          text-transform: uppercase;
        }

        .lc-service-picker-card-bottom h3 {
          max-width: 12ch;
          margin: 0;
          color: #141413;
          font-size: clamp(1.38rem, 2.45vw, 2.15rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .lc-service-picker-card-bottom p {
          max-width: 32ch;
          margin: 0;
          color: #696969;
          font-size: 0.84rem;
          line-height: 1.55;
        }

        .lc-service-picker-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          width: fit-content;
          color: #141413;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.66rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          line-height: 1;
          text-transform: uppercase;
          transition: color 180ms ease, gap 220ms ease;
        }

        .lc-service-picker-card-cta-icon {
          width: 13px;
          height: 13px;
          flex: 0 0 auto;
        }

        .lc-service-picker-card:hover .lc-service-picker-card-cta,
        .lc-service-picker-card:focus-visible .lc-service-picker-card-cta {
          gap: 0.7rem;
          color: #141413;
        }

        .lc-service-picker-detail {
          display: none;
        }

        .lc-service-picker-modal {
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

        .lc-service-picker-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          background: #F3F0EE;
          opacity: 0;
          cursor: pointer;
          pointer-events: auto;
        }

        .lc-service-picker-modal-content {
          position: relative;
          z-index: 1;
          width: min(1180px, calc(100vw - 2rem));
          height: min(86svh, 780px);
          max-height: calc(100svh - 2rem);
          pointer-events: auto;
        }

        .lc-service-picker-modal-content :global(.lc-service-picker-card) {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
          min-height: 0;
          cursor: default;
          border-color: color-mix(in srgb, var(--service-accent) 38%, #D1CDC7);
          background: #FCFBFA;
        }

        .lc-service-picker-modal-content :global(.lc-service-picker-card::after) {
          display: none;
        }

        .lc-service-picker-modal-content :global(.lc-service-picker-media) {
          position: relative;
          min-height: 0;
        }

        .lc-service-picker-modal-content :global(.lc-service-picker-media-scrim) {
          background:
            linear-gradient(180deg, rgba(243, 240, 238, 0.06), rgba(243, 240, 238, 0.54)),
            radial-gradient(760px 440px at 18% 16%, color-mix(in srgb, var(--service-accent) 30%, transparent), transparent 66%);
        }

        .lc-service-picker-modal-content :global(.lc-service-picker-compact) {
          display: none;
        }

        .lc-service-picker-modal-content :global(.lc-service-picker-detail) {
          position: relative;
          z-index: 2;
          display: flex;
          min-width: 0;
          min-height: 0;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          padding: clamp(1.25rem, 3vw, 2.4rem);
          background:
            linear-gradient(180deg, rgba(20, 20, 19, 0.025), rgba(20, 20, 19, 0.01)),
            #FCFBFA;
          border-left: 1px solid #D1CDC7;
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-gutter: stable;
        }

        .lc-service-picker-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          min-height: 2.2rem;
          border: 1px solid #D1CDC7;
          border-radius: 6px;
          background: rgba(20, 20, 19, 0.04);
          color: #696969;
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

        .lc-service-picker-close:hover,
        .lc-service-picker-close:focus-visible {
          border-color: var(--service-accent);
          background: color-mix(in srgb, var(--service-accent) 14%, rgba(20, 20, 19, 0.04));
          color: #141413;
          outline: none;
        }

        .lc-service-picker-detail-main {
          display: flex;
          min-width: 0;
          min-height: 0;
          flex-direction: column;
          gap: clamp(0.9rem, 1.6vw, 1.25rem);
          padding-top: 2.2rem;
        }

        .lc-service-picker-detail-index {
          display: flex;
          align-items: baseline;
          gap: 0.9rem;
          color: #696969;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .lc-service-picker-detail-index span:first-child {
          color: var(--service-accent);
          font-size: clamp(1.5rem, 3vw, 2.35rem);
          letter-spacing: 0;
        }

        .lc-service-picker-detail-title-block {
          display: grid;
          gap: 0.75rem;
        }

        .lc-service-picker-detail-title-block > span {
          color: var(--service-accent);
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .lc-service-picker-detail-title-block h3 {
          max-width: 11ch;
          margin: 0;
          color: #141413;
          font-size: clamp(2.55rem, 5.35vw, 4.95rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .lc-service-picker-detail-copy {
          max-width: 50ch;
          margin: 0;
          color: #696969;
          font-size: clamp(0.96rem, 1.1vw, 1.06rem);
          line-height: 1.65;
        }

        .lc-service-picker-story-blocks {
          display: grid;
          gap: 0.65rem;
          margin-top: 0.25rem;
        }

        .lc-service-picker-story-block {
          position: relative;
          display: grid;
          gap: 0.35rem;
          border: 1px solid #D1CDC7;
          border-left-color: color-mix(in srgb, var(--service-accent) 64%, #D1CDC7);
          border-radius: 8px;
          background:
            linear-gradient(90deg, color-mix(in srgb, var(--service-accent) 10%, transparent), transparent 38%),
            rgba(20, 20, 19, 0.02);
          padding: 0.82rem 0.95rem;
        }

        .lc-service-picker-story-block span {
          color: color-mix(in srgb, var(--service-accent) 84%, #141413);
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.64rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .lc-service-picker-story-block p {
          margin: 0;
          color: #696969;
          font-size: 0.88rem;
          line-height: 1.48;
        }

        .lc-service-picker-fit {
          max-width: 52ch;
          margin: 0;
          border-left: 2px solid var(--service-accent);
          padding-left: 0.9rem;
          color: #141413;
          font-size: clamp(0.9rem, 1vw, 1rem);
          line-height: 1.55;
        }

        .lc-service-picker-detail-footer {
          display: grid;
          gap: 1rem;
          flex-shrink: 0;
        }

        .lc-service-picker-outcomes {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .lc-service-picker-outcomes li {
          min-width: 0;
          min-height: 2.35rem;
          display: flex;
          align-items: center;
          border: 1px solid #D1CDC7;
          border-radius: 6px;
          background: rgba(20, 20, 19, 0.03);
          color: #696969;
          padding: 0.52rem 0.7rem;
          font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1.3;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .lc-service-picker-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.9rem;
        }

        .lc-service-picker-hero-cta {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 3.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          border-radius: 9999px;
          padding: 0 2rem;
          color: #141413;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          transform: translateZ(0);
          transition:
            transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 260ms cubic-bezier(0.22, 1, 0.36, 1),
            color 180ms ease;
        }

        .lc-service-picker-hero-cta:hover,
        .lc-service-picker-hero-cta:focus-visible {
          transform: scale(1.045);
          outline: none;
        }

        .lc-service-picker-hero-cta:active {
          transform: scale(0.97);
        }

        .lc-service-picker-hero-cta::before,
        .lc-service-picker-hero-cta::after {
          content: "";
          position: absolute;
          pointer-events: none;
          border-radius: inherit;
        }

        .lc-service-picker-hero-cta::before {
          inset: 0;
          z-index: -1;
          mix-blend-mode: multiply;
        }

        .lc-service-picker-hero-cta::after {
          top: 0;
          left: -100%;
          z-index: 1;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          animation: lcServicePickerHeroGlare 5.5s infinite ease-in-out;
        }

        .lc-service-picker-hero-cta-primary {
          color: #fff;
          background: linear-gradient(
            135deg,
            rgba(251, 100, 36, 0.85) 0%,
            rgba(251, 100, 36, 0.6) 100%
          );
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(251, 100, 36, 0.4);
          border-top-color: rgba(251, 100, 36, 0.6);
          border-left-color: rgba(251, 100, 36, 0.5);
          box-shadow:
            0 14px 40px rgba(127, 99, 21, 0.18),
            0 0 52px rgba(251, 100, 36, 0.12),
            inset 0 1px 4px rgba(255, 255, 255, 0.3),
            inset 0 -1px 3px rgba(0, 0, 0, 0.05);
        }

        .lc-service-picker-hero-cta-primary::before {
          background: linear-gradient(
            135deg,
            rgba(251, 100, 36, 0.72) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.2) 100%
          );
        }

        .lc-service-picker-hero-cta-secondary {
          color: #141413;
          background: linear-gradient(
            135deg,
            rgba(20, 20, 19, 0.06) 0%,
            rgba(20, 20, 19, 0.02) 100%
          );
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid #D1CDC7;
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.6),
            inset 0 -1px 3px rgba(0, 0, 0, 0.06),
            0 8px 32px rgba(127, 99, 21, 0.08);
        }

        .lc-service-picker-hero-cta-secondary:hover,
        .lc-service-picker-hero-cta-secondary:focus-visible {
          color: #141413;
        }

        .lc-service-picker-hero-cta-secondary::before {
          background: linear-gradient(
            135deg,
            rgba(251, 100, 36, 0.15) 0%,
            transparent 50%,
            rgba(127, 99, 21, 0.1) 100%
          );
        }

        .lc-service-picker-hero-cta-secondary::after {
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          animation-duration: 6s;
          animation-delay: 1.5s;
        }

        .lc-service-picker-hero-cta-icon {
          position: relative;
          z-index: 2;
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
          transition: transform 180ms ease;
        }

        .lc-service-picker-hero-cta-primary:hover .lc-service-picker-hero-cta-icon,
        .lc-service-picker-hero-cta-primary:focus-visible .lc-service-picker-hero-cta-icon {
          transform: translateX(0.25rem);
        }

        .lc-service-picker-hero-cta span {
          position: relative;
          z-index: 2;
        }

        @keyframes lcServicePickerHeroGlare {
          0% {
            left: -100%;
          }
          15% {
            left: 200%;
          }
          100% {
            left: 200%;
          }
        }

        @media (max-width: 1100px) {
          .lc-service-picker-header {
            grid-template-columns: 1fr;
          }

          .lc-service-picker-intro {
            max-width: 620px;
          }

          .lc-service-picker-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lc-service-picker-modal-content {
            height: min(82svh, 760px);
          }

          .lc-service-picker-modal-content :global(.lc-service-picker-card) {
            grid-template-columns: 1fr;
            grid-template-rows: minmax(220px, 0.82fr) minmax(0, 1fr);
            min-height: 0;
          }

          .lc-service-picker-modal-content :global(.lc-service-picker-detail) {
            border-left: 0;
            border-top: 1px solid #D1CDC7;
          }

          .lc-service-picker-detail-title-block h3 {
            max-width: 12ch;
            font-size: clamp(2.6rem, 9vw, 4.6rem);
          }
        }

        @media (max-width: 720px) {
          .lc-service-picker-inner {
            width: min(100% - 1.5rem, 1240px);
            padding: 4rem 0;
          }

          .lc-service-picker-grid {
            grid-template-columns: 1fr;
          }

          .lc-service-picker-shell {
            aspect-ratio: 1.08 / 1;
          }

          .lc-service-picker-card-bottom h3 {
            max-width: 13ch;
            font-size: clamp(1.55rem, 8vw, 2.35rem);
          }

          .lc-service-picker-modal {
            align-items: flex-end;
          }

          .lc-service-picker-modal-content {
            width: 100%;
            height: min(88svh, 760px);
            padding: 0.75rem;
          }

          .lc-service-picker-modal-content :global(.lc-service-picker-card) {
            border-radius: 10px;
            grid-template-rows: minmax(180px, 0.58fr) minmax(0, 1fr);
          }

          .lc-service-picker-modal-content :global(.lc-service-picker-detail) {
            padding: 1.15rem;
            gap: 1.2rem;
            overflow-y: auto;
          }

          .lc-service-picker-detail-main {
            padding-top: 2.8rem;
          }

          .lc-service-picker-detail-title-block h3 {
            max-width: 100%;
            font-size: clamp(2.4rem, 14vw, 3.8rem);
            line-height: 0.95;
          }

          .lc-service-picker-story-block {
            padding: 0.78rem 0.85rem;
          }

          .lc-service-picker-outcomes {
            grid-template-columns: 1fr;
          }

          .lc-service-picker-hero-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lc-service-picker-card,
          :global(.lc-service-picker-image),
          .lc-service-picker-hero-cta,
          .lc-service-picker-hero-cta-icon,
          .lc-service-picker-card-cta {
            transition: none !important;
          }

          .lc-service-picker-hero-cta::after {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default LCServicePicker
