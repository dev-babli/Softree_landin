"use client"

import { useRef, type CSSProperties } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { useGSAP } from "@gsap/react"
import {
  ArrowRight,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  MonitorCog,
  Rocket,
  ShieldCheck,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, useGSAP)

const routeCards = [
  {
    id: "strategy",
    label: "Strategy",
    icon: "S",
    title: "Product direction before pixels.",
    code: [
      "const roadmap = validate({",
      "  users: interviews,",
      "  workflows: mapped,",
      "  risk: reduced,",
      "});",
    ],
  },
  {
    id: "interface",
    label: "UI",
    icon: "U",
    title: "Interfaces that make complex work feel simple.",
    code: [
      ".workspace {",
      "  state: clear;",
      "  motion: intentional;",
      "  trust: visible;",
      "}",
    ],
  },
  {
    id: "systems",
    label: "Stack",
    icon: "A",
    title: "Architecture that can take real traffic.",
    code: [
      "services.connect(",
      "  auth, api, data, cloud,",
      "  observability",
      ");",
    ],
  },
  {
    id: "launch",
    label: "Launch",
    icon: "L",
    title: "Release without turning launch day into a war room.",
    code: [
      "deploy({",
      "  downtime: 0,",
      "  rollback: ready,",
      "  monitoring: live",
      "});",
    ],
  },
]

const featurePanels = [
  {
    kicker: "Discovery system",
    title: "The brief becomes a buildable map.",
    copy:
      "We turn business goals, user journeys, integrations, and constraints into a shared product blueprint before engineering starts.",
    image: "/web-development-story/story-discovery.svg",
  },
  {
    kicker: "Architecture model",
    title: "Every layer has a reason.",
    copy:
      "Frontend, APIs, cloud, data, auth, automation, analytics, and monitoring are designed as one operating system.",
    image: "/web-development-story/story-architecture.svg",
  },
  {
    kicker: "Build loop",
    title: "Design and engineering move together.",
    copy:
      "Interactive UI, component systems, backend contracts, and CI pipelines evolve in tight feedback loops.",
    image: "/web-development-story/story-build.svg",
  },
  {
    kicker: "Launch cockpit",
    title: "Production is measured, not guessed.",
    copy:
      "Performance budgets, observability, rollback paths, and support routines keep the application reliable after launch.",
    image: "/web-development-story/story-launch.svg",
  },
]

const capabilityRows = [
  {
    icon: Code2,
    title: "Frontend systems",
    text: "React, Next.js, design systems, dashboards, portals, and high-performance interfaces.",
  },
  {
    icon: Database,
    title: "Backend and data",
    text: "APIs, databases, auth, integrations, automation, cloud services, and reporting pipelines.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise readiness",
    text: "RBAC, audit trails, security reviews, monitoring, accessibility, and deployment discipline.",
  },
]

const tiers = [
  {
    name: "MVP",
    line: "A focused first release for fast validation.",
    specs: ["Core journeys", "Design system seed", "API foundation", "Launch support"],
  },
  {
    name: "Scale",
    line: "A production platform built for teams and growth.",
    specs: ["Advanced workflows", "Integrations", "Role-based access", "Observability"],
  },
  {
    name: "Enterprise",
    line: "Complex applications with governance and resilience.",
    specs: ["Multi-system architecture", "Security controls", "Data intelligence", "SLA-ready operations"],
  },
]

export default function WebDevelopmentStoryExperience() {
  const rootRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLElement>(null)
  const socialStageRef = useRef<HTMLDivElement>(null)
  const socialTrackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      gsap.set(".wd-reveal", { autoAlpha: 0, y: 34, filter: "blur(8px)" })
      gsap.set(".wd-route-card", { autoAlpha: 0, y: 36, scale: 0.96 })
      gsap.set(".wd-tier", { autoAlpha: 0, y: 44 })

      if (reduceMotion) {
        gsap.set(".wd-reveal, .wd-route-card, .wd-tier", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        })
        return
      }

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wd-zoom-wrapper",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      heroTl
        .to(".wd-hero-platform", {
          scale: 2,
          z: 350,
          transformOrigin: "center center",
          ease: "power1.inOut",
        })
        .to(
          ".wd-hero-bg",
          {
            scale: 1.12,
            transformOrigin: "center center",
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".wd-hero-copy, .wd-hero-meta, .wd-scroll-cue",
          {
            autoAlpha: 0,
            y: -46,
            filter: "blur(10px)",
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".wd-hero-shade",
          {
            autoAlpha: 0.78,
            ease: "power1.inOut",
          },
          "<"
        )

      gsap.utils.toArray<HTMLElement>(".wd-reveal").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        })
      })

      const route = routeRef.current
      if (route) {
        ScrollTrigger.create({
          trigger: route,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(route, { "--strokeDashoffset": -2400 * self.progress })
          },
        })

        gsap.to(".wd-route-card", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.18,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: route,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        })
      }

      const social = socialRef.current
      const stage = socialStageRef.current
      const track = socialTrackRef.current
      if (social && stage && track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 96),
          ease: "none",
          scrollTrigger: {
            trigger: social,
            start: "top top",
            end: () => `+=${Math.max(900, track.scrollWidth - window.innerWidth + 640)}`,
            pin: stage,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      }

      gsap.to(".wd-tier", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wd-product",
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
      })

      ScrollTrigger.create({
        trigger: ".wd-morph-footer",
        start: "top bottom",
        onEnter: (self) => {
          const velocity = self.getVelocity()
          const variation = Math.max(0.2, Math.min(1.8, Math.abs(velocity) / 10000))

          gsap.fromTo(
            "#wd-bouncy-path",
            {
              morphSVG:
                "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z",
            },
            {
              duration: 2,
              morphSVG:
                "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z",
              ease: `elastic.out(${1 + variation}, ${1 - variation * 0.4})`,
              overwrite: true,
            }
          )
        },
        onLeaveBack: () => {
          gsap.to("#wd-bouncy-path", {
            duration: 0.9,
            morphSVG:
              "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z",
            ease: "power2.out",
          })
        },
      })

      const cursor = rootRef.current?.querySelector<HTMLElement>(".wd-cursor")
      if (!cursor) {
        return
      }

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" })
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" })
      let cursorVisible = false
      const onMove = (event: PointerEvent) => {
        if (!cursorVisible) {
          cursorVisible = true
          gsap.set(cursor, { autoAlpha: 1 })
        }
        xTo(event.clientX)
        yTo(event.clientY)
      }
      window.addEventListener("pointermove", onMove)

      return () => {
        window.removeEventListener("pointermove", onMove)
      }
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="wd-page">
      <div className="wd-cursor" aria-hidden />

      <section className="wd-zoom-wrapper" id="intro">
        <div className="wd-hero-bg" aria-hidden />
        <div className="wd-hero-shade" aria-hidden />

        <div className="wd-hero-copy">
          <div className="wd-kicker">
            <span />
            Web Application Development
          </div>
          <h1>
            Made for users.
            <br />
            Built for scale.
          </h1>
          <p>
            We turn business-critical workflows into fast, secure, and maintainable web
            platforms with strategy, design, engineering, and launch discipline in one team.
          </p>
          <div className="wd-hero-actions">
            <a href="/contact">
              Talk to our experts <ArrowRight size={16} />
            </a>
            <a href="#features">Explore the build</a>
          </div>
        </div>

        <div className="wd-hero-meta" aria-label="Delivery proof points">
          <span>Next.js</span>
          <span>Cloud APIs</span>
          <span>Secure data</span>
          <span>Zero-downtime releases</span>
        </div>

        <div className="wd-image-container">
          <img
            className="wd-hero-platform"
            src="/web-development-story/hero-platform.svg"
            alt="Softree web application platform dashboard"
          />
        </div>

        <div className="wd-scroll-cue">
          <span>Scroll to build</span>
          <i />
        </div>
      </section>

      <section className="wd-intro" id="features">
        <div className="wd-intro-grid">
          <div className="wd-reveal">
            <h2>
              This is not
              <br />
              just a website.
            </h2>
          </div>
          <div className="wd-reveal">
            <p>
              It is the operational layer where customers act, teams collaborate,
              data moves, and your business becomes easier to run.
            </p>
            <div className="wd-model-badge">
              <MonitorCog size={28} />
              <div>
                <span>Softree Web-01</span>
                <small>Strategy-trained delivery system</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={routeRef} className="wd-route-area" style={{ "--strokeDashoffset": 0 } as CSSProperties}>
        <div className="wd-route-heading wd-reveal">
          <span>Build path</span>
          <h2>From idea to production, without losing the plot.</h2>
        </div>

        <div className="wd-route-main">
          <div className="wd-cards">
            {routeCards.map((card, index) => (
              <div className="wd-route-card" key={card.id}>
                <div className="wd-card-glow" aria-hidden />
                <div className="wd-card-icon">{card.icon}</div>
                <div className="wd-card-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{card.label}</small>
                </div>
                <h3>{card.title}</h3>
                <pre aria-label={`${card.label} code sample`}>
                  <code>{card.code.join("\n")}</code>
                </pre>
              </div>
            ))}
          </div>

          <svg className="wd-svg-paths" width="740" height="2000" viewBox="0 0 740 2000" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="wd-cl1" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
                <stop offset="20%" stopColor="#FF6B00" />
                <stop offset="45%" stopColor="#F7D152" />
                <stop offset="65%" stopColor="#46CF71" />
                <stop offset="85%" stopColor="#0FBFFA" />
              </linearGradient>
            </defs>
            <path className="wd-route-line wd-line-1" d="m 106,45h 375c 114,0 226,128 226,235v 236c 0,136 -122,222 -224,221l -182,-2c -89,1 -141,42 -142,158l -2,204c -1,117 37,173 134,173h 186c 110,-3 230,111 230,220v 242c 0,113 -125,225 -248,225H 105" />
            <path className="wd-route-line wd-line-2" d="m 33,85h 444c 96,0 190,107 190,201v 224c 0,116 -98,188 -190,187l -192,-2c -92,0 -166,75 -166,168v 278c 0,94 74,169 166,169h 194c 92,0 188,94 188,188v 228c 0,94 -104,191 -214,191H 105" />
            <path className="wd-route-line wd-line-3" d="m 155,127h 308c 94,0 162,86 162,177v 178c 0,109 -50,174 -166,173L 277,653C 158,653 77,762 77,849v 302c 0,118 107,196 180,197l 204,4c 92,0 164,67 164,160v 200c 0,91 -89,163 -188,163H 105" />
            <path className="wd-route-line wd-line-4" d="m 283,173c 2,0 165,0 165,0C 544,175 577,238 577,330v 156c 0,94 -48,126 -140,125L 269,609C 167,602 29,702 29,851v 312c 0,111 101,235 242,235h 162c 109,1 144,49 144,136v 162c 0,73 -53,130 -118,130l -353,1" />
          </svg>
        </div>
      </section>

      <section ref={socialRef} className="wd-social">
        <div ref={socialStageRef} className="wd-social-stage">
          <div className="wd-social-intro">
            <span>Production scenes</span>
            <h2>Everything that matters keeps moving.</h2>
          </div>
          <div ref={socialTrackRef} className="wd-social-track">
            {featurePanels.map((panel, index) => (
              <article className="wd-feature-panel" key={panel.title}>
                <img src={panel.image} alt={`${panel.kicker} illustration`} />
                <div>
                  <span>{String(index + 1).padStart(2, "0")} / {panel.kicker}</span>
                  <h3>{panel.title}</h3>
                  <p>{panel.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wd-capabilities">
        <div className="wd-capabilities-copy wd-reveal">
          <span>What we engineer</span>
          <h2>Frontends, backends, integrations, and launch systems under one delivery roof.</h2>
        </div>
        <div className="wd-capability-list">
          {capabilityRows.map((item) => (
            <div className="wd-capability wd-reveal" key={item.title}>
              <item.icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wd-product" id="product">
        <div className="wd-product-head">
          <span>Choose your build mode</span>
          <h2>Softree Web Applications</h2>
          <p>Three engagement shapes, one standard: clean execution and production-grade outcomes.</p>
        </div>
        <div className="wd-tiers">
          {tiers.map((tier, index) => (
            <article className="wd-tier" key={tier.name}>
              <small>New</small>
              <h3>{tier.name}</h3>
              <p>{tier.line}</p>
              <ul>
                {tier.specs.map((spec) => (
                  <li key={spec}>
                    <GitBranch size={14} />
                    {spec}
                  </li>
                ))}
              </ul>
              <span className="wd-tier-stack">0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="wd-paper wd-reveal">
        <div className="wd-paper-inner">
          <span>Our SOTA delivery model</span>
          <h2>WEB-01</h2>
          <div className="wd-paper-actions">
            <a href="/case-studies/web">Case studies</a>
            <a href="/contact">Start a build</a>
            <a href="/services">All services</a>
          </div>
          <div className="wd-paper-grid">
            <div>
              <h3>Abstract</h3>
              <p>
                We present Softree Web-01, a full-stack delivery model for turning
                complex business workflows into reliable web applications. It faithfully
                reproduces key enterprise behaviors: clear UX, secure data movement,
                measurable performance, and stable release operations.
              </p>
            </div>
            <pre>{`@softree/web-01 {
  strategy: validated;
  interface: usable;
  architecture: scalable;
  release: observable;
}`}</pre>
          </div>
        </div>
      </section>

      <section className="wd-morph-footer" id="contact">
        <svg preserveAspectRatio="none" className="wd-footer-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2278 683" aria-hidden>
          <defs>
            <linearGradient id="wd-grad-1" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
              <stop offset="0.2" stopColor="#FF6B00" />
              <stop offset="0.55" stopColor="#0AE448" />
              <stop offset="0.9" stopColor="#00BAE2" />
            </linearGradient>
          </defs>
          <path id="wd-bouncy-path" fill="url(#wd-grad-1)" d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z" />
        </svg>
        <div className="wd-footer-content">
          <span>We caught your attention with a web experience.</span>
          <h2>If we can make a service page feel alive, imagine what we can build for your product.</h2>
          <a href="/contact">
            Start your web application <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <style jsx>{`
        .wd-page {
          --cream: #f4f1ea;
          --ink: #050505;
          --muted: rgba(255, 255, 255, 0.62);
          --orange: #ff6b00;
          --cyan: #22d3ee;
          --green: #0ae448;
          position: relative;
          overflow-x: clip;
          background: var(--ink);
          color: #ffffff;
          min-height: 100vh;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .wd-cursor {
          position: fixed;
          left: -12px;
          top: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 80;
          border: 1px solid rgba(255, 107, 0, 0.82);
          box-shadow: 0 0 24px rgba(255, 107, 0, 0.22);
          mix-blend-mode: difference;
          opacity: 0;
          visibility: hidden;
          will-change: transform;
        }

        .wd-zoom-wrapper {
          position: relative;
          height: 100vh;
          min-height: 720px;
          overflow: hidden;
          perspective: 500px;
          isolation: isolate;
          background: #050505;
        }

        .wd-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url("/web-development-story/hero-background.svg");
          background-size: cover;
          background-position: center;
          will-change: transform;
        }

        .wd-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(5, 5, 5, 0.92) 0%, rgba(5, 5, 5, 0.56) 46%, rgba(5, 5, 5, 0.18) 100%),
            radial-gradient(circle at 78% 42%, transparent 0%, rgba(5, 5, 5, 0.66) 64%);
        }

        .wd-hero-shade {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: #030303;
          opacity: 0;
          pointer-events: none;
        }

        .wd-hero-copy {
          position: absolute;
          z-index: 4;
          left: 6vw;
          top: 50%;
          width: min(640px, 46vw);
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          will-change: transform, opacity, filter;
        }

        .wd-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.68);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
        }

        .wd-kicker span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 18px rgba(255, 107, 0, 0.9);
        }

        .wd-hero-copy h1 {
          margin: 0;
          color: #fff;
          font-size: 86px;
          line-height: 0.94;
          font-weight: 800;
          letter-spacing: 0;
          max-width: 760px;
        }

        .wd-hero-copy p {
          margin: 0;
          max-width: 560px;
          font-size: 17px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.72);
        }

        .wd-hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .wd-hero-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: uppercase;
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
        }

        .wd-hero-actions a:first-child {
          background: #ffffff;
          color: #050505;
        }

        .wd-hero-actions a:last-child {
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .wd-hero-actions a:hover {
          transform: translateY(-2px);
        }

        .wd-hero-meta {
          position: absolute;
          z-index: 4;
          right: 5vw;
          top: 120px;
          display: grid;
          grid-template-columns: repeat(2, minmax(120px, 1fr));
          gap: 8px;
          width: 360px;
          will-change: transform, opacity, filter;
        }

        .wd-hero-meta span {
          border: 1px dashed rgba(255, 255, 255, 0.24);
          border-radius: 8px;
          padding: 12px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0;
          color: rgba(255, 255, 255, 0.72);
          background: rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(12px);
        }

        .wd-image-container {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 5vw;
          pointer-events: none;
          transform-style: preserve-3d;
        }

        .wd-hero-platform {
          width: min(68vw, 1100px);
          height: auto;
          object-fit: contain;
          transform-style: preserve-3d;
          will-change: transform;
          filter: drop-shadow(0 44px 80px rgba(0, 0, 0, 0.55));
        }

        .wd-scroll-cue {
          position: absolute;
          z-index: 5;
          left: 6vw;
          bottom: 38px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 12px;
          letter-spacing: 0;
          text-transform: uppercase;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          will-change: transform, opacity, filter;
        }

        .wd-scroll-cue i {
          display: block;
          width: 42px;
          height: 1px;
          background: linear-gradient(90deg, var(--orange), transparent);
        }

        .wd-intro {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 6vw;
          background: #050505;
        }

        .wd-intro-grid {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 80px;
          align-items: center;
        }

        .wd-intro h2,
        .wd-route-heading h2,
        .wd-social-intro h2,
        .wd-capabilities-copy h2,
        .wd-product-head h2,
        .wd-paper h2,
        .wd-footer-content h2 {
          margin: 0;
          font-weight: 800;
          letter-spacing: 0;
        }

        .wd-intro h2 {
          font-size: 74px;
          line-height: 0.96;
          text-transform: uppercase;
        }

        .wd-intro p {
          margin: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 25px;
          line-height: 1.45;
        }

        .wd-model-badge {
          margin-top: 42px;
          border: 1px dashed rgba(255, 255, 255, 0.22);
          border-radius: 8px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          width: min(420px, 100%);
          background: rgba(255, 255, 255, 0.05);
        }

        .wd-model-badge svg {
          color: var(--orange);
        }

        .wd-model-badge span,
        .wd-route-heading span,
        .wd-social-intro span,
        .wd-capabilities-copy span,
        .wd-product-head span,
        .wd-paper-inner > span,
        .wd-footer-content span {
          display: block;
          color: var(--orange);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0;
          text-transform: uppercase;
          line-height: 1;
        }

        .wd-model-badge small {
          display: block;
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 13px;
        }

        .wd-route-area {
          position: relative;
          min-height: 2200px;
          padding: 110px 0 160px;
          background:
            radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.12), transparent 32%),
            #101114;
          overflow: hidden;
        }

        .wd-route-heading {
          width: min(980px, calc(100% - 48px));
          margin: 0 auto 64px;
          text-align: center;
        }

        .wd-route-heading h2 {
          margin-top: 18px;
          font-size: 58px;
          line-height: 1;
        }

        .wd-route-main {
          position: relative;
          display: flex;
          justify-content: center;
          width: 740px;
          min-height: 2000px;
          margin: 0 auto;
        }

        .wd-cards {
          position: absolute;
          top: 0;
          z-index: 3;
          width: 300px;
        }

        .wd-route-card {
          position: relative;
          width: 300px;
          height: 450px;
          margin: 25px 0;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background:
            radial-gradient(circle at 20% 0%, rgba(34, 211, 238, 0.15), transparent 36%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03));
          backdrop-filter: blur(14px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          will-change: transform, opacity;
        }

        .wd-card-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, rgba(255, 107, 0, 0.18), transparent 45%, rgba(34, 211, 238, 0.14));
          pointer-events: none;
        }

        .wd-card-icon {
          position: absolute;
          right: 18px;
          top: 18px;
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-weight: 900;
          font-size: 26px;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.05);
        }

        .wd-card-top {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
        }

        .wd-card-top span {
          color: var(--orange);
          font-size: 20px;
          font-weight: 800;
        }

        .wd-card-top small {
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .wd-route-card h3 {
          position: relative;
          margin: 96px 0 0;
          font-size: 27px;
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: 0;
        }

        .wd-route-card pre {
          position: relative;
          margin: 0;
          white-space: pre-wrap;
          color: rgba(255, 255, 255, 0.78);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 13px;
          line-height: 1.65;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .wd-svg-paths {
          position: absolute;
          top: 75px;
          z-index: 1;
          width: 740px;
          height: 2000px;
          overflow: visible;
        }

        .wd-route-line {
          fill: none;
          stroke: url(#wd-cl1);
          stroke-linecap: round;
          stroke-dashoffset: var(--strokeDashoffset);
          opacity: 0.86;
        }

        .wd-line-1 {
          stroke-width: 20px;
          stroke-dasharray: 20px 50px 120px 50px 20px 50px 300px 50px 20px 50px 150px 50px 20px 20000px;
        }

        .wd-line-2 {
          stroke-width: 34px;
          stroke-dasharray: 34px 60px 120px 60px 34px 60px 300px 60px 34px 60px 150px 60px 34px 20000px;
          opacity: 0.62;
        }

        .wd-line-3 {
          stroke-width: 25px;
          stroke-dasharray: 25px 40px 120px 40px 25px 40px 250px 40px 25px 40px 150px 40px 25px 20000px;
          opacity: 0.5;
        }

        .wd-line-4 {
          stroke-width: 40px;
          stroke-dasharray: 40px 70px 100px 70px 40px 70px 200px 70px 40px 20000px;
          opacity: 0.3;
        }

        .wd-social {
          position: relative;
          min-height: 100vh;
          background: #050505;
        }

        .wd-social-stage {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding-left: 6vw;
        }

        .wd-social-intro {
          width: 420px;
          flex: 0 0 420px;
          margin-right: 48px;
        }

        .wd-social-intro h2 {
          margin-top: 18px;
          font-size: 54px;
          line-height: 1;
        }

        .wd-social-track {
          display: flex;
          align-items: center;
          gap: 24px;
          will-change: transform;
        }

        .wd-feature-panel {
          position: relative;
          flex: 0 0 78vw;
          height: 76vh;
          min-width: 900px;
          overflow: hidden;
          border-radius: 8px;
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .wd-feature-panel img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wd-feature-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.1));
        }

        .wd-feature-panel div {
          position: absolute;
          z-index: 2;
          left: 42px;
          bottom: 42px;
          max-width: 520px;
        }

        .wd-feature-panel span {
          display: block;
          color: var(--orange);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .wd-feature-panel h3 {
          margin: 0;
          font-size: 48px;
          line-height: 1;
          letter-spacing: 0;
        }

        .wd-feature-panel p {
          margin: 16px 0 0;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.72);
        }

        .wd-capabilities {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 64px;
          align-items: start;
          padding: 140px 6vw;
          background: var(--cream);
          color: #050505;
        }

        .wd-capabilities-copy h2 {
          margin-top: 18px;
          font-size: 54px;
          line-height: 1;
        }

        .wd-capability-list {
          display: grid;
          gap: 16px;
        }

        .wd-capability {
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.58);
          padding: 28px;
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 8px 18px;
        }

        .wd-capability svg {
          color: #0b7c42;
          grid-row: span 2;
        }

        .wd-capability h3 {
          margin: 0;
          font-size: 22px;
          line-height: 1.15;
          letter-spacing: 0;
        }

        .wd-capability p {
          margin: 0;
          color: rgba(0, 0, 0, 0.62);
          font-size: 15px;
          line-height: 1.6;
        }

        .wd-product {
          padding: 140px 6vw 130px;
          background: #050505;
          color: #ffffff;
        }

        .wd-product-head {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 56px;
        }

        .wd-product-head h2 {
          margin-top: 18px;
          font-size: 64px;
          line-height: 0.96;
        }

        .wd-product-head p {
          color: rgba(255, 255, 255, 0.62);
          font-size: 16px;
          line-height: 1.65;
          margin: 18px auto 0;
          max-width: 620px;
        }

        .wd-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 1180px;
          margin: 0 auto;
        }

        .wd-tier {
          position: relative;
          min-height: 420px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background:
            radial-gradient(circle at 80% 0%, rgba(34, 211, 238, 0.13), transparent 42%),
            rgba(255, 255, 255, 0.05);
          padding: 30px;
          overflow: hidden;
          will-change: transform, opacity;
        }

        .wd-tier:nth-child(2) {
          background:
            radial-gradient(circle at 80% 0%, rgba(255, 107, 0, 0.2), transparent 42%),
            rgba(255, 255, 255, 0.08);
        }

        .wd-tier small {
          color: var(--orange);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          letter-spacing: 0;
          text-transform: uppercase;
          font-size: 11px;
        }

        .wd-tier h3 {
          margin: 18px 0 14px;
          font-size: 44px;
          line-height: 1;
          letter-spacing: 0;
        }

        .wd-tier p {
          margin: 0;
          color: rgba(255, 255, 255, 0.66);
          line-height: 1.55;
        }

        .wd-tier ul {
          list-style: none;
          padding: 0;
          margin: 34px 0 0;
          display: grid;
          gap: 14px;
        }

        .wd-tier li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 14px;
        }

        .wd-tier li svg {
          color: var(--green);
        }

        .wd-tier-stack {
          position: absolute;
          right: 24px;
          bottom: 18px;
          color: rgba(255, 255, 255, 0.08);
          font-size: 86px;
          font-weight: 900;
          line-height: 1;
        }

        .wd-paper {
          padding: 120px 6vw 160px;
          background: #050505;
        }

        .wd-paper-inner {
          max-width: 940px;
          margin: 0 auto;
          text-align: center;
        }

        .wd-paper h2 {
          margin-top: 16px;
          font-size: 86px;
          line-height: 0.9;
        }

        .wd-paper-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 34px 0 48px;
        }

        .wd-paper-actions a {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          padding: 12px 18px;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .wd-paper-grid {
          display: grid;
          grid-template-columns: 1fr 0.85fr;
          gap: 22px;
          text-align: left;
        }

        .wd-paper-grid > div,
        .wd-paper-grid pre {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 26px;
          background: rgba(255, 255, 255, 0.05);
        }

        .wd-paper-grid h3 {
          margin: 0 0 14px;
          font-size: 18px;
          letter-spacing: 0;
        }

        .wd-paper-grid p {
          margin: 0;
          color: rgba(255, 255, 255, 0.64);
          line-height: 1.7;
        }

        .wd-paper-grid pre {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .wd-morph-footer {
          position: relative;
          min-height: 700px;
          background: #050505;
          overflow: hidden;
        }

        .wd-morph-footer::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image:
            linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .wd-footer-img {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .wd-footer-content {
          position: relative;
          z-index: 2;
          min-height: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 6vw 80px;
          color: #050505;
        }

        .wd-footer-content span {
          color: rgba(0, 0, 0, 0.68);
        }

        .wd-footer-content h2 {
          margin-top: 22px;
          max-width: 1060px;
          font-size: 58px;
          line-height: 1;
        }

        .wd-footer-content a {
          margin-top: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 999px;
          background: #050505;
          color: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0;
          font-size: 13px;
          font-weight: 800;
        }

        .wd-reveal,
        .wd-tier {
          will-change: transform, opacity, filter;
        }

        @media (max-width: 1180px) {
          .wd-hero-copy h1 {
            font-size: 64px;
          }

          .wd-hero-copy {
            width: min(590px, 58vw);
          }

          .wd-hero-meta {
            display: none;
          }

          .wd-hero-platform {
            width: 74vw;
            opacity: 0.72;
          }

          .wd-intro-grid,
          .wd-capabilities {
            grid-template-columns: 1fr;
          }

          .wd-route-main {
            transform: scale(0.9);
            transform-origin: top center;
            margin-bottom: -180px;
          }

          .wd-tiers,
          .wd-paper-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .wd-cursor {
            display: none;
          }

          .wd-zoom-wrapper {
            min-height: 680px;
          }

          .wd-hero-copy {
            left: 24px;
            right: 24px;
            width: auto;
            top: 45%;
          }

          .wd-hero-copy h1 {
            font-size: 46px;
          }

          .wd-hero-copy p {
            font-size: 15px;
          }

          .wd-hero-platform {
            width: 112vw;
            opacity: 0.44;
          }

          .wd-image-container {
            justify-content: center;
            padding-right: 0;
          }

          .wd-scroll-cue {
            display: none;
          }

          .wd-intro,
          .wd-capabilities,
          .wd-product,
          .wd-paper {
            padding-left: 24px;
            padding-right: 24px;
          }

          .wd-intro h2,
          .wd-route-heading h2,
          .wd-social-intro h2,
          .wd-capabilities-copy h2,
          .wd-product-head h2,
          .wd-footer-content h2 {
            font-size: 38px;
          }

          .wd-intro p {
            font-size: 18px;
          }

          .wd-route-area {
            min-height: auto;
            padding-bottom: 90px;
          }

          .wd-route-main {
            width: 100%;
            min-height: auto;
            transform: none;
            margin-bottom: 0;
          }

          .wd-cards {
            position: relative;
            width: min(100%, 330px);
            margin: 0 auto;
          }

          .wd-route-card {
            width: 100%;
            height: auto;
            min-height: 390px;
          }

          .wd-svg-paths {
            display: none;
          }

          .wd-social-stage {
            height: auto;
            min-height: 100vh;
            padding: 84px 24px;
            display: block;
          }

          .wd-social-intro {
            width: auto;
            margin: 0 0 28px;
          }

          .wd-social-track {
            transform: none !important;
            display: grid;
          }

          .wd-feature-panel {
            flex: none;
            min-width: 0;
            width: 100%;
            height: 520px;
          }

          .wd-feature-panel div {
            left: 24px;
            right: 24px;
            bottom: 24px;
          }

          .wd-feature-panel h3 {
            font-size: 34px;
          }

          .wd-capability {
            grid-template-columns: 1fr;
          }

          .wd-paper h2 {
            font-size: 58px;
          }

          .wd-footer-content {
            min-height: 620px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wd-hero-bg,
          .wd-hero-platform,
          .wd-social-track,
          .wd-reveal,
          .wd-route-card,
          .wd-tier {
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  )
}
