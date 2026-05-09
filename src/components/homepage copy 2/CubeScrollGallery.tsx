"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const IMAGE_SRCS = [
  "/gif_assetsforservices/Scene.gif",
  "/gif_assetsforservices/ORBIT-5-01-LITE.gif",
  "/gif_assetsforservices/1-1.gif",
  "/gif_assetsforservices/Website-landing-page-with-blocs.gif",
  "/gif_assetsforservices/Scene%20(1).gif",
  "/gif_assetsforservices/Scene%20(2).gif",
]

const FACE_NAMES = ["SIGNAL", "SHAPE", "BUILD", "LAUNCH", "AUTOMATE", "SCALE"]

const SCENE_THEMES = [
  {
    key: "signal",
    bg: "#030303",
    fg: "#f8f5ef",
    muted: "#a39d97",
    accent: "#ff5722",
    accent2: "#6b8cff",
    cubeBg: "#08090d",
    grid: "rgba(255,255,255,0.045)",
    cardBg: "rgba(5, 5, 6, 0.74)",
    cardBorder: "rgba(255, 87, 34, 0.28)",
    wash: "linear-gradient(135deg, rgba(255, 87, 34, 0.54), rgba(107, 140, 255, 0.28), transparent)",
  },
  {
    key: "shape",
    bg: "#f5f1e9",
    fg: "#111111",
    muted: "#6e655f",
    accent: "#ff5722",
    accent2: "#7c3aed",
    cubeBg: "#ece6dc",
    grid: "rgba(17,17,17,0.065)",
    cardBg: "rgba(255, 255, 255, 0.7)",
    cardBorder: "rgba(255, 87, 34, 0.24)",
    wash: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 87, 34, 0.32), transparent)",
  },
  {
    key: "build",
    bg: "#05040a",
    fg: "#f7f5ff",
    muted: "#a9a0bc",
    accent: "#8b5cf6",
    accent2: "#3b82f6",
    cubeBg: "#070711",
    grid: "rgba(139,92,246,0.1)",
    cardBg: "rgba(10, 8, 18, 0.76)",
    cardBorder: "rgba(139, 92, 246, 0.32)",
    wash: "linear-gradient(135deg, rgba(139, 92, 246, 0.52), rgba(59, 130, 246, 0.28), transparent)",
  },
  {
    key: "launch",
    bg: "#06110f",
    fg: "#effff9",
    muted: "#92aaa3",
    accent: "#23d3a4",
    accent2: "#ff7759",
    cubeBg: "#061512",
    grid: "rgba(35,211,164,0.09)",
    cardBg: "rgba(4, 20, 16, 0.76)",
    cardBorder: "rgba(35, 211, 164, 0.28)",
    wash: "linear-gradient(135deg, rgba(35, 211, 164, 0.5), rgba(255, 119, 89, 0.28), transparent)",
  },
  {
    key: "automate",
    bg: "#120707",
    fg: "#fff8f2",
    muted: "#b69a91",
    accent: "#ff7759",
    accent2: "#facc15",
    cubeBg: "#170909",
    grid: "rgba(255,119,89,0.085)",
    cardBg: "rgba(28, 10, 10, 0.76)",
    cardBorder: "rgba(255, 119, 89, 0.3)",
    wash: "linear-gradient(135deg, rgba(255, 119, 89, 0.52), rgba(250, 204, 21, 0.22), transparent)",
  },
  {
    key: "scale",
    bg: "#030712",
    fg: "#eff6ff",
    muted: "#9aabc2",
    accent: "#38bdf8",
    accent2: "#a78bfa",
    cubeBg: "#050b1a",
    grid: "rgba(56,189,248,0.09)",
    cardBg: "rgba(4, 12, 30, 0.78)",
    cardBorder: "rgba(56, 189, 248, 0.3)",
    wash: "linear-gradient(135deg, rgba(56, 189, 248, 0.5), rgba(167, 139, 250, 0.28), transparent)",
  },
]

const PANELS = [
  {
    id: "s0",
    align: "left",
    tag: "Softree Delivery Cube",
    titleTag: "h1",
    title: ["SIGNAL", "TO", "SCALE"],
    body: [
      "A cinematic map of how Softree turns fuzzy demand",
      "into shipped products, AI workflows, and launch assets",
      "that are built to create qualified conversations.",
    ],
    ctas: [{ className: "cta", href: "#s1", label: "Explore the model", dir: "next" }],
  },
  {
    id: "s1",
    align: "right",
    tag: "01 - Product Signal",
    titleTag: "h2",
    title: ["FIND", "THE", "REVENUE SIGNAL"],
    body: [
      "We read the product, funnel, and buyer context first.",
      "Then we reduce the noise into one sharp build decision.",
    ],
    ctas: [
      { className: "cta-back", href: "#s0", label: "Back", dir: "back" },
      { className: "cta", href: "#s2", label: "Turn", dir: "next" },
    ],
  },
  {
    id: "s2",
    align: "left",
    tag: "02 - Experience Shape",
    titleTag: "h2",
    title: ["MAKE", "THE OFFER", "OBVIOUS"],
    body: [
      "The interface, story, and flow get shaped before code.",
      "Your buyer should understand the value before they scroll twice.",
    ],
    ctas: [
      { className: "cta-back", href: "#s1", label: "Back", dir: "back" },
      { className: "cta", href: "#s3", label: "Turn", dir: "next" },
    ],
  },
  {
    id: "s3",
    align: "right",
    tag: "03 - Production Build",
    titleTag: "h2",
    title: ["SHIP", "WORKING", "SYSTEMS"],
    body: [
      "Apps, AI interfaces, integrations, and data logic move together.",
      "The result is not a deck. It is a production surface your team can use.",
    ],
    stats: [
      { value: "6", label: "Phases" },
      { value: "360", label: "View" },
      { value: "1", label: "System" },
    ],
    ctas: [
      { className: "cta-back", href: "#s2", label: "Back", dir: "back" },
      { className: "cta", href: "#s4", label: "Turn", dir: "next" },
    ],
  },
  {
    id: "s4",
    align: "left",
    tag: "04 - Launch Motion",
    titleTag: "h2",
    title: ["TURN", "ATTENTION", "INTO ACTION"],
    body: [
      "Launch pages, proof blocks, tracking, and handoff assets are built as one system.",
      "The goal is pipeline, not a pretty dead end.",
    ],
    ctas: [
      { className: "cta-back", href: "#s3", label: "Back", dir: "back" },
      { className: "cta", href: "#s5", label: "Turn", dir: "next" },
    ],
  },
  {
    id: "s5",
    align: "right",
    tag: "05 - Growth Loop",
    titleTag: "h2",
    title: ["MEASURE", "REFINE", "COMPOUND"],
    body: [
      "Once the system is live, we read behavior and keep tightening the loop.",
      "Better signals create better builds. Better builds create better leads.",
    ],
    ctas: [
      { className: "cta-back", href: "#s4", label: "Back", dir: "back" },
      { className: "cta", href: "#s0", label: "Begin again", dir: "next" },
    ],
  },
]

const FACE_DATA = [
  { face: "top", label: "TOP" },
  { face: "front", label: "FRONT" },
  { face: "right", label: "RIGHT" },
  { face: "back", label: "BACK" },
  { face: "left", label: "LEFT" },
  { face: "bottom", label: "BOTTOM" },
]

const STOPS = [
  { rx: 90, ry: 0 },
  { rx: 0, ry: 0 },
  { rx: 0, ry: -90 },
  { rx: 0, ry: -180 },
  { rx: 0, ry: -270 },
  { rx: -90, ry: -360 },
]

const N = IMAGE_SRCS.length

function clampSceneIndex(progress: number) {
  return Math.min(N - 1, Math.max(0, Math.round(progress * (N - 1))))
}

export function CubeScrollGallery() {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const themeWashRef = useRef<HTMLDivElement>(null)
  const hudPctRef = useRef<HTMLDivElement>(null)
  const progFillRef = useRef<HTMLDivElement>(null)
  const sceneNameRef = useRef<HTMLDivElement>(null)
  const captionNumRef = useRef<HTMLDivElement>(null)
  const captionNameRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<Array<HTMLAnchorElement | null>>([])

  useGSAP(
    () => {
      const root = rootRef.current
      const pin = pinRef.current
      const cube = cubeRef.current
      const wash = themeWashRef.current
      if (!root || !pin || !cube) return

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      let activeIndex = -1

      const applyScene = (index: number, immediate = false) => {
        if (index === activeIndex && !immediate) return

        activeIndex = index
        const theme = SCENE_THEMES[index] ?? SCENE_THEMES[0]
        const name = FACE_NAMES[index] ?? ""

        root.setAttribute("data-tone", theme.key)
        if (sceneNameRef.current) sceneNameRef.current.textContent = name
        if (captionNumRef.current) captionNumRef.current.textContent = String(index + 1).padStart(2, "0")
        if (captionNameRef.current) captionNameRef.current.textContent = name
        dotRefs.current.forEach((dot, dotIndex) => dot?.classList.toggle("active", dotIndex === index))

        const themeVars = {
          "--bg": theme.bg,
          "--fg": theme.fg,
          "--muted": theme.muted,
          "--accent": theme.accent,
          "--accent-2": theme.accent2,
          "--cube-bg": theme.cubeBg,
          "--grid-color": theme.grid,
          "--card-bg": theme.cardBg,
          "--card-border": theme.cardBorder,
        }

        if (immediate || reduceMotion) {
          gsap.set(root, themeVars)
          gsap.set(wash, { autoAlpha: 0 })
          return
        }

        gsap.to(root, {
          ...themeVars,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        })

        if (wash) {
          gsap.fromTo(
            wash,
            { autoAlpha: 0.68, scaleX: 0.78, transformOrigin: "left center", background: theme.wash },
            { autoAlpha: 0, scaleX: 1.12, duration: 1.05, ease: "power3.out", overwrite: true }
          )
        }

        gsap.fromTo(
          [captionNumRef.current, captionNameRef.current, sceneNameRef.current].filter(Boolean),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.035, ease: "power2.out", overwrite: true }
        )
      }

      const updateProgress = (progress: number) => {
        const percent = Math.round(progress * 100)
        const sceneIndex = clampSceneIndex(progress)

        if (hudPctRef.current) hudPctRef.current.textContent = `${String(percent).padStart(3, "0")}%`
        if (progFillRef.current) progFillRef.current.style.width = `${percent}%`
        applyScene(sceneIndex)
      }

      applyScene(0, true)
      updateProgress(0)

      gsap.set(cube, {
        rotationX: STOPS[0].rx,
        rotationY: STOPS[0].ry,
        transformOrigin: "50% 50%",
        force3D: true,
      })

      const cubeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: false,
          scrub: reduceMotion ? true : 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateProgress(self.progress),
          onRefresh: (self) => updateProgress(self.progress),
        },
      })

      STOPS.slice(1).forEach((stop) => {
        cubeTimeline.to(cube, {
          rotationX: stop.rx,
          rotationY: stop.ry,
          duration: 1,
          ease: reduceMotion ? "none" : "power2.inOut",
        })
      })

      const panels = Array.from(root.querySelectorAll<HTMLElement>(".cube-panel"))
      panels.forEach((panel) => {
        const items = Array.from(panel.querySelectorAll<HTMLElement>(".cinematic-item"))

        if (reduceMotion) {
          gsap.set(items, { autoAlpha: 1, y: 0, rotationX: 0, filter: "none" })
          return
        }

        gsap.set(items, {
          autoAlpha: 0,
          y: 54,
          rotationX: -14,
          transformOrigin: "50% 100%",
        })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 62%",
              end: "bottom 42%",
              toggleActions: "play reverse play reverse",
            },
          })
          .to(items, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            duration: 0.92,
            stagger: { each: 0.055, from: "start" },
            ease: "power3.out",
            overwrite: "auto",
          })
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    },
    { scope: rootRef }
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#s"]')
      if (!anchor || !root.contains(anchor)) return

      const target = root.querySelector<HTMLElement>(anchor.getAttribute("href") ?? "")
      if (!target) return
      event.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    root.addEventListener("click", onClick)
    return () => root.removeEventListener("click", onClick)
  }, [])

  return (
    <section ref={rootRef} className="raw-cube-root" aria-label="Softree delivery cube">
      <div className="raw-cube-sticky" ref={pinRef}>
        <div className="raw-cube-backdrop" aria-hidden />
        <div className="theme-wash" ref={themeWashRef} aria-hidden />

        <div className="cube-section-label" aria-hidden>
          <span>Softree Services</span>
          <strong>Signal to Scale</strong>
        </div>

        <div id="scene">
          <div id="cube" ref={cubeRef}>
            {FACE_DATA.map((face, index) => (
              <div className="face" data-face={face.face} data-i={index} key={face.face}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGE_SRCS[index]}
                  alt={`${FACE_NAMES[index]} service motion graphic`}
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <span className="face-ph">{face.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="hud">
          <div id="hud_pct" ref={hudPctRef}>
            000%
          </div>
          <div className="progress-bar">
            <div className="progress-fill" id="prog_fill" ref={progFillRef} />
          </div>
          <div className="scene-label" id="scene_name" ref={sceneNameRef}>
            SIGNAL
          </div>
        </div>

        <div id="scene_strip">
          {PANELS.map((panel, index) => (
            <a
              href={`#${panel.id}`}
              className={`scene-dot${index === 0 ? " active" : ""}`}
              key={panel.id}
              aria-label={`Go to ${FACE_NAMES[index]}`}
              ref={(node) => {
                dotRefs.current[index] = node
              }}
            />
          ))}
        </div>

        <div id="face_caption">
          <div id="face_caption_num" ref={captionNumRef}>
            01
          </div>
          <div id="face_caption_name" ref={captionNameRef}>
            SIGNAL
          </div>
        </div>
      </div>

      <div id="scroll_container">
        {PANELS.map((panel, index) => {
          const TitleTag = panel.titleTag as "h1" | "h2"

          return (
            <section id={panel.id} className={`cube-panel cube-panel-${panel.align}`} key={panel.id}>
              <div className={`text-card ${panel.align === "right" ? "right" : ""}`}>
                {index > 0 && <div className="h-line cinematic-item" />}
                <div className="tag cinematic-item">{panel.tag}</div>
                <TitleTag className="title-shell">
                  {panel.title.map((line) => (
                    <span className="title-line cinematic-item" key={line}>
                      {line}
                    </span>
                  ))}
                </TitleTag>
                <p className="body-text">
                  {panel.body.map((line) => (
                    <span className="body-line cinematic-item" key={line}>
                      {line}
                    </span>
                  ))}
                </p>
                {panel.stats && (
                  <div className="stat-row" aria-label={`${panel.tag} metrics`}>
                    {panel.stats.map((stat) => (
                      <div className="stat cinematic-item" key={stat.label}>
                        <span className="stat-num">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cta-row">
                  {panel.ctas.map((cta) => (
                    <a className={`${cta.className} cinematic-item`} href={cta.href} key={`${cta.href}-${cta.label}`}>
                      {cta.dir === "back" && (
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <path d="M11 6H1M6 11L1 6l5-5" />
                        </svg>
                      )}
                      <span>{cta.label}</span>
                      {cta.dir === "next" && (
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <path d="M1 6h10M6 1l5 5-5 5" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap");
      `}</style>

      <style jsx>{`
        .raw-cube-root,
        .raw-cube-root *,
        .raw-cube-root *::before,
        .raw-cube-root *::after {
          box-sizing: border-box;
        }

        .raw-cube-root {
          color-scheme: dark;
          --bg: #030303;
          --fg: #f8f5ef;
          --muted: #a39d97;
          --accent: #ff5722;
          --accent-2: #6b8cff;
          --cube-bg: #08090d;
          --grid-color: rgba(255, 255, 255, 0.045);
          --card-bg: rgba(5, 5, 6, 0.74);
          --card-border: rgba(255, 87, 34, 0.28);
          --font-main: "Outfit", system-ui, sans-serif;
          --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          --ui-inset: 2rem;
          position: relative;
          width: 100%;
          min-height: 600vh;
          overflow-x: clip;
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-main);
        }

        .raw-cube-sticky {
          position: relative;
          z-index: 0;
          height: 100vh;
          overflow: hidden;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--bg) 90%, #000 10%) 0%, var(--bg) 100%),
            #000;
        }

        .raw-cube-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px),
            linear-gradient(180deg, var(--grid-color) 1px, transparent 1px),
            linear-gradient(120deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 32%),
            linear-gradient(260deg, color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 36%);
          background-size: 64px 64px, 64px 64px, 100% 100%, 100% 100%;
          opacity: 0.78;
        }

        .raw-cube-backdrop::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.3), transparent 28%, transparent 72%, rgba(0, 0, 0, 0.44)),
            linear-gradient(90deg, rgba(0, 0, 0, 0.42), transparent 22%, transparent 78%, rgba(0, 0, 0, 0.42));
        }

        .theme-wash {
          position: absolute;
          inset: -10%;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: screen;
          will-change: opacity, transform;
        }

        .cube-section-label {
          position: absolute;
          top: var(--ui-inset);
          left: var(--ui-inset);
          z-index: 12;
          display: grid;
          gap: 0.35rem;
          color: var(--fg);
          text-transform: uppercase;
          pointer-events: none;
        }

        .cube-section-label span {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.18em;
        }

        .cube-section-label strong {
          font-size: 0.82rem;
          letter-spacing: 0.1em;
        }

        #scene {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1100px;
          pointer-events: none;
        }

        #cube {
          --s: min(64vw, 64vh, 520px);
          width: var(--s);
          height: var(--s);
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        #cube::before {
          content: "";
          position: absolute;
          inset: -7%;
          border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
          transform: translateZ(calc(var(--s) * -0.58));
          opacity: 0.28;
        }

        .face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--cube-bg) 88%, var(--accent) 12%), var(--cube-bg)),
            #070707;
          border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.04),
            0 28px 80px rgba(0, 0, 0, 0.28);
        }

        .face::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px),
            linear-gradient(180deg, var(--grid-color) 1px, transparent 1px);
          background-size: 36px 36px;
          opacity: 0.5;
        }

        .face::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.16), transparent 32%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.18), transparent 46%);
        }

        .face img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          padding: 7%;
          background: color-mix(in srgb, var(--cube-bg) 86%, #000 14%);
          filter: saturate(1.08) contrast(1.02);
        }

        .face:has(img) .face-ph {
          display: none;
        }

        .face-ph {
          position: absolute;
          bottom: 1.5rem;
          left: 1.75rem;
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: 0;
          color: rgba(255, 255, 255, 0.06);
          pointer-events: none;
          user-select: none;
        }

        .face[data-face="front"] {
          transform: translateZ(calc(var(--s) / 2));
        }

        .face[data-face="back"] {
          transform: rotateY(180deg) translateZ(calc(var(--s) / 2));
        }

        .face[data-face="right"] {
          transform: rotateY(90deg) translateZ(calc(var(--s) / 2));
        }

        .face[data-face="left"] {
          transform: rotateY(-90deg) translateZ(calc(var(--s) / 2));
        }

        .face[data-face="top"] {
          transform: rotateX(-90deg) translateZ(calc(var(--s) / 2));
        }

        .face[data-face="bottom"] {
          transform: rotateX(90deg) translateZ(calc(var(--s) / 2));
        }

        #hud {
          position: absolute;
          top: var(--ui-inset);
          right: var(--ui-inset);
          z-index: 12;
          text-align: right;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        #hud .progress-bar {
          width: 8.25rem;
          height: 1px;
          background: color-mix(in srgb, var(--muted) 48%, transparent);
          margin-block-start: 0.55rem;
          margin-inline-start: auto;
          position: relative;
          overflow: hidden;
        }

        #hud .progress-fill {
          position: absolute;
          inset-block: 0;
          inset-inline-start: 0;
          width: 0%;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transition: width 0.1s linear;
        }

        #hud .scene-label {
          color: var(--accent);
          margin-block-start: 0.45rem;
        }

        #scene_strip {
          position: absolute;
          left: var(--ui-inset);
          top: 50%;
          z-index: 12;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transform: translateY(-50%);
        }

        .scene-dot {
          position: relative;
          display: block;
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
          background: color-mix(in srgb, var(--muted) 58%, transparent);
          transition: background 0.3s, scale 0.3s;
          cursor: pointer;
        }

        .scene-dot::before {
          content: "";
          position: absolute;
          inset: -0.35rem;
        }

        .scene-dot.active {
          background: var(--accent);
          scale: 1.8;
        }

        #face_caption {
          position: absolute;
          bottom: var(--ui-inset);
          left: 50%;
          z-index: 12;
          text-align: center;
          transform: translateX(-50%);
          pointer-events: none;
          user-select: none;
        }

        #face_caption_num {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          margin-block-end: 0.25rem;
        }

        #face_caption_name {
          color: color-mix(in srgb, var(--fg) 55%, transparent);
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1;
          text-transform: uppercase;
        }

        #scroll_container {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .cube-panel {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem calc(5rem + var(--ui-inset)) 6rem 5rem;
        }

        .cube-panel-right {
          justify-content: flex-end;
        }

        .cube-panel-left {
          justify-content: flex-start;
        }

        .text-card {
          width: min(100%, 31rem);
          padding: 2.15rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(22px) saturate(130%);
          -webkit-backdrop-filter: blur(22px) saturate(130%);
          overflow: hidden;
          pointer-events: auto;
        }

        .text-card.right {
          text-align: right;
        }

        .tag {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-block-end: 1.15rem;
        }

        h1,
        h2 {
          color: var(--fg);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 0.93;
          margin: 0;
          text-transform: uppercase;
        }

        h1 {
          font-size: 5.4rem;
        }

        h2 {
          font-size: 4.15rem;
        }

        .title-line,
        .body-line {
          display: block;
        }

        .body-text {
          color: color-mix(in srgb, var(--fg) 66%, transparent);
          font-size: 1rem;
          line-height: 1.75;
          margin: 1.25rem 0 0;
        }

        .stat-row {
          display: flex;
          justify-content: flex-end;
          gap: 2.15rem;
          margin-block-start: 1.75rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .stat-num {
          color: var(--accent);
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1;
        }

        .stat-label {
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .h-line {
          width: 3.5rem;
          height: 1px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          margin-block-end: 1.2rem;
        }

        .text-card.right .h-line {
          margin-inline-start: auto;
        }

        .cta-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.75rem;
          margin-block-start: 1.7rem;
          flex-wrap: wrap;
        }

        .text-card.right .cta-row {
          justify-content: flex-end;
        }

        .cta,
        .cta-back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          min-height: 2.75rem;
          padding: 0.82rem 1.2rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .cta {
          background: var(--fg);
          color: var(--bg);
          box-shadow: 0 18px 52px color-mix(in srgb, var(--accent) 20%, transparent);
        }

        .cta-back {
          color: var(--fg);
          border: 1px solid color-mix(in srgb, var(--fg) 22%, transparent);
          background: color-mix(in srgb, var(--fg) 7%, transparent);
        }

        .cta:hover,
        .cta-back:hover {
          transform: translateY(-2px);
        }

        .cta svg,
        .cta-back svg {
          width: 0.78rem;
          height: 0.78rem;
          flex: 0 0 auto;
        }

        .cinematic-item {
          will-change: transform, opacity, filter;
          transform-style: preserve-3d;
        }

        @media (max-width: 900px) {
          .raw-cube-root {
            --ui-inset: 1rem;
          }

          .cube-section-label {
            display: none;
          }

          #hud {
            top: 1rem;
            right: 1rem;
          }

          #scene_strip {
            display: none;
          }

          #face_caption {
            bottom: 1rem;
          }

          #face_caption_name {
            font-size: 2rem;
          }

          #cube {
            --s: min(78vw, 46vh, 360px);
            transform: translateY(-7vh);
          }

          .cube-panel {
            min-height: 135vh;
            align-items: flex-end;
            padding: 0 1rem 4rem;
          }

          .cube-panel-right,
          .cube-panel-left {
            justify-content: center;
          }

          .text-card,
          .text-card.right {
            width: 100%;
            padding: 1.35rem;
            text-align: left;
          }

          .text-card.right .h-line,
          .text-card.right .cta-row,
          .stat-row {
            margin-inline-start: 0;
            justify-content: flex-start;
          }

          h1 {
            font-size: 3.25rem;
          }

          h2 {
            font-size: 2.85rem;
          }

          .body-text {
            font-size: 0.94rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  )
}

export default CubeScrollGallery
