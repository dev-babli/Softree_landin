"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import {
  Cloud,
  Database,
  Server,
  Monitor,
  BarChart3,
  Zap,
  Smartphone,
  Users,
  LineChart,
  Grip,
  MoreVertical,
  Code2,
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

type Props = {
  isActive?: boolean
  className?: string
}

export function FlexibleTechExecutionVisual({ isActive, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const loopsRef = useRef<gsap.core.Tween[]>([])
  const stRef = useRef<ScrollTrigger | null>(null)
  const playedRef = useRef(false)

  useIsoLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)

      // Initial hidden state
      gsap.set(q(".visual-panel"), { autoAlpha: 0, scale: 0.96 })
      gsap.set(q(".input-card"), { autoAlpha: 0, x: -28 })
      gsap.set(q(".solution-hub"), { autoAlpha: 0, scale: 0.94 })
      gsap.set(q(".hub-row"), { autoAlpha: 0, y: 14 })
      gsap.set(q(".output-card"), { autoAlpha: 0, x: 28 })
      gsap.set(q(".code-card"), { autoAlpha: 0, y: 18 })
      gsap.set(q(".green-glow"), { autoAlpha: 0 })

      // Prep connector paths: compute their length and dash them out
      const paths = q<SVGPathElement>(".connector-path")
      paths.forEach((p) => {
        const len = p.getTotalLength?.() ?? 200
        p.style.strokeDasharray = `6 8`
        p.style.strokeDashoffset = `${len}`
          ; (p as SVGPathElement & { dataset: DOMStringMap }).dataset.len = String(len)
      })

      // Master entrance timeline (paused)
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })

      tl.to(q(".green-glow"), { autoAlpha: 1, duration: 0.8 }, 0)
        .to(q(".visual-panel"), { autoAlpha: 1, scale: 1, duration: 0.7 }, 0)
        .to(q(".input-card"), { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.08 }, 0.15)
        .to(q(".solution-hub"), { autoAlpha: 1, scale: 1, duration: 0.55 }, 0.3)
        .to(q(".hub-row"), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07 }, 0.45)
        .to(q(".output-card"), { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.08 }, 0.4)
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power1.out",
            stagger: 0.05,
          },
          0.55,
        )
        .to(q(".code-card"), { autoAlpha: 1, y: 0, duration: 0.55 }, 0.85)
        .add(() => startLoops(), 0.95)

      tlRef.current = tl

      const startLoops = () => {
        // Kill any prior loops
        loopsRef.current.forEach((t) => t.kill())
        loopsRef.current = []

        // Continuous dashed connector flow
        paths.forEach((p) => {
          const len = Number((p as SVGPathElement & { dataset: DOMStringMap }).dataset.len) || 200
          const tween = gsap.to(p, {
            strokeDashoffset: -len,
            duration: 6 + Math.random() * 2,
            ease: "none",
            repeat: -1,
          })
          loopsRef.current.push(tween)
        })

        // Particles travelling along paths via motionPath fallback (simple x animation)
        q(".flow-particle").forEach((dot, i) => {
          const path = paths[i % paths.length]
          if (!path) return
          const len = Number((path as SVGPathElement & { dataset: DOMStringMap }).dataset.len) || 200
          const proxy = { d: 0 }
          const tween = gsap.to(proxy, {
            d: 1,
            duration: 3.5 + (i % 3) * 0.6,
            ease: "none",
            repeat: -1,
            delay: i * 0.4,
            onUpdate: () => {
              const pt = path.getPointAtLength(proxy.d * len)
              gsap.set(dot, { attr: { cx: pt.x, cy: pt.y } })
            },
          })
          loopsRef.current.push(tween as unknown as gsap.core.Tween)
        })

        // Pulsing status dots
        const pulse = gsap.to(q(".status-dot"), {
          scale: 1.35,
          opacity: 0.6,
          duration: 1.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.15, from: "random" },
          transformOrigin: "center center",
        })
        loopsRef.current.push(pulse)

        // Floating code card
        const float = gsap.to(q(".code-card"), {
          y: "+=10",
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
        loopsRef.current.push(float)

        // Breathing background glow
        const breathe = gsap.to(q(".green-glow"), {
          opacity: 0.55,
          scale: 1.06,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "center center",
        })
        loopsRef.current.push(breathe)
      }

      const playOnce = () => {
        if (playedRef.current) return
        playedRef.current = true
        tl.play(0)
      }

      const resetAll = () => {
        playedRef.current = false
        tl.pause(0)
        loopsRef.current.forEach((t) => t.kill())
        loopsRef.current = []
        gsap.set(q(".visual-panel"), { autoAlpha: 0, scale: 0.96 })
        gsap.set(q(".input-card"), { autoAlpha: 0, x: -28 })
        gsap.set(q(".solution-hub"), { autoAlpha: 0, scale: 0.94 })
        gsap.set(q(".hub-row"), { autoAlpha: 0, y: 14 })
        gsap.set(q(".output-card"), { autoAlpha: 0, x: 28 })
        gsap.set(q(".code-card"), { autoAlpha: 0, y: 18 })
        gsap.set(q(".green-glow"), { autoAlpha: 0 })
        paths.forEach((p) => {
          const len = Number((p as SVGPathElement & { dataset: DOMStringMap }).dataset.len) || 200
          p.style.strokeDashoffset = String(len)
        })
      }

      // Trigger logic
      if (typeof isActive === "boolean") {
        if (isActive) playOnce()
        else resetAll()
      } else {
        stRef.current = ScrollTrigger.create({
          trigger: root,
          start: "top 70%",
          once: true,
          onEnter: playOnce,
        })
      }

      // Expose for cleanup
      ; (root as HTMLElement & { __ftxReset?: () => void; __ftxPlay?: () => void }).__ftxReset = resetAll
        ; (root as HTMLElement & { __ftxReset?: () => void; __ftxPlay?: () => void }).__ftxPlay = playOnce
    }, root)

    return () => {
      stRef.current?.kill()
      stRef.current = null
      loopsRef.current.forEach((t) => t.kill())
      loopsRef.current = []
      tlRef.current?.kill()
      tlRef.current = null
      ctx.revert()
    }
    // We deliberately don't depend on isActive here; a separate effect handles it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React to isActive changes after mount
  useEffect(() => {
    const root = rootRef.current as
      | (HTMLElement & { __ftxReset?: () => void; __ftxPlay?: () => void })
      | null
    if (!root) return
    if (typeof isActive !== "boolean") return
    if (isActive) {
      root.__ftxReset?.()
      root.__ftxPlay?.()
    } else {
      root.__ftxReset?.()
    }
  }, [isActive])

  return (
    <div ref={rootRef} className={`section-root ftx-root ${className}`}>
      <div className="visual-panel" aria-label="Flexible technology execution diagram">
        <div className="green-glow" aria-hidden />

        {/* SVG connectors */}
        <svg
          className="ftx-connectors"
          viewBox="0 0 800 560"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="ftxLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#65C466" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#65C466" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#65C466" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Inputs -> Hub left edge (hub roughly x: 300-540) */}
          <path className="connector-path" d="M120,110 H230 Q260,110 260,150 V170 H300" />
          <path className="connector-path" d="M120,225 H260 Q290,225 290,235 V250 H300" />
          <path className="connector-path" d="M120,340 H260 Q290,340 290,330 V320 H300" />
          <path className="connector-path" d="M120,455 H230 Q260,455 260,420 V400 H300" />

          {/* Hub right edge -> Outputs */}
          <path className="connector-path" d="M540,170 H580 Q610,170 610,140 V120 H680" />
          <path className="connector-path" d="M540,280 H600 Q620,280 620,280 H680" />
          <path className="connector-path" d="M540,395 H580 Q610,395 610,420 V440 H680" />

          {/* Travelling particles */}
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
          <circle className="flow-particle" r="2.6" cx="-10" cy="-10" fill="#9BE39C" />
        </svg>

        {/* Left input cards */}
        <div className="ftx-col ftx-col-left">
          <div className="input-card feature-card">
            <Cloud className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>Cloud Services</span>
          </div>
          <div className="input-card feature-card">
            <Database className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>Databases</span>
          </div>
          <div className="input-card feature-card">
            <Cloud className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>SaaS Tools</span>
          </div>
          <div className="input-card feature-card">
            <Server className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>Legacy Systems</span>
          </div>
        </div>

        {/* Center solution hub */}
        <div className="solution-hub">
          <div className="hub-head">
            <div className="hub-title">
              <Grip className="hub-grip" strokeWidth={1.5} aria-hidden />
              <span>Solution Hub</span>
              <span className="hub-live" aria-hidden>
                <i className="hub-live-dot" />
                <em>live</em>
              </span>
            </div>
            <MoreVertical className="hub-more" strokeWidth={1.5} aria-hidden />
          </div>

          <div className="hub-row">
            <div className="hub-row-icon">
              <Monitor strokeWidth={1.5} aria-hidden />
            </div>
            <div className="hub-row-text">
              <strong>Customer Portal</strong>
              <em>Web Application</em>
            </div>
            <span className="status-dot" aria-hidden />
          </div>

          <div className="hub-row">
            <div className="hub-row-icon">
              <BarChart3 strokeWidth={1.5} aria-hidden />
            </div>
            <div className="hub-row-text">
              <strong>Internal Dashboard</strong>
              <em>Admin Panel</em>
            </div>
            <span className="status-dot" aria-hidden />
          </div>

          <div className="hub-row">
            <div className="hub-row-icon">
              <Zap strokeWidth={1.5} aria-hidden />
            </div>
            <div className="hub-row-text">
              <strong>Workflow Engine</strong>
              <em>Automation</em>
            </div>
            <span className="status-dot" aria-hidden />
          </div>

          <div className="hub-row">
            <div className="hub-row-icon">
              <Database strokeWidth={1.5} aria-hidden />
            </div>
            <div className="hub-row-text">
              <strong>Data Service</strong>
              <em>API Layer</em>
            </div>
            <span className="status-dot" aria-hidden />
          </div>
        </div>

        {/* Right output cards */}
        <div className="ftx-col ftx-col-right">
          <div className="output-card feature-card">
            <Smartphone className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>Web &amp; Mobile Apps</span>
          </div>
          <div className="output-card feature-card">
            <Users className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>User Experiences</span>
          </div>
          <div className="output-card feature-card">
            <LineChart className="ftx-ic" strokeWidth={1.5} aria-hidden />
            <span>Business Outcomes</span>
          </div>
        </div>

        {/* Floating code card */}
        <div className="code-card" role="img" aria-label="Code snippet">
          <div className="code-head">
            <Code2 strokeWidth={1.5} aria-hidden />
            <span className="code-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          </div>
          <pre className="code-body" aria-hidden>
            <code>
              <span className="tk-c">{`// Build. Integrate. Deliver.`}</span>
              {`\n`}
              <span className="tk-k">const</span>
              {` `}
              <span className="tk-v">solution</span>
              {` `}
              <span className="tk-p">=</span>
              {` {\n  `}
              <span className="tk-pr">flexible</span>
              <span className="tk-p">:</span>
              {` `}
              <span className="tk-b">true</span>
              {`,\n  `}
              <span className="tk-pr">scalable</span>
              <span className="tk-p">:</span>
              {` `}
              <span className="tk-b">true</span>
              {`,\n  `}
              <span className="tk-pr">outcomeFocused</span>
              <span className="tk-p">:</span>
              {` `}
              <span className="tk-b">true</span>
              {`\n}`}
            </code>
          </pre>
        </div>
      </div>

      <style jsx>{`
        .ftx-root {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-panel {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10.5;
          max-height: min(64svh, 600px);
          border-radius: 14px;
          /* Tuned to sit inside Phase 03 dark tone (#050608) */
          background: linear-gradient(180deg, #0a0c0a 0%, #050706 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 36px 110px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          overflow: hidden;
          isolation: isolate;
        }

        .visual-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(80% 60% at 50% 0%, rgba(255, 255, 255, 0.025), transparent 60%);
          z-index: 0;
        }

        .green-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(360px 260px at 60% 56%, rgba(101, 196, 102, 0.22), transparent 70%),
            radial-gradient(680px 460px at 82% 92%, rgba(101, 196, 102, 0.08), transparent 78%);
          filter: blur(3px);
        }

        .ftx-connectors {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .connector-path {
          fill: none;
          stroke: #7bd07c;
          stroke-width: 1.25;
          stroke-linecap: round;
          opacity: 0.78;
        }

        .ftx-col {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(0.45rem, 1.1vw, 0.7rem);
          padding: clamp(0.9rem, 2vw, 1.25rem) 0;
        }

        .ftx-col-left {
          left: clamp(0.6rem, 1.4vw, 1rem);
          width: clamp(6.6rem, 11.5vw, 8.4rem);
        }

        .ftx-col-right {
          right: clamp(0.6rem, 1.4vw, 1rem);
          width: clamp(6.8rem, 11.8vw, 8.6rem);
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.7rem 0.5rem;
          min-height: 3.8rem;
          border-radius: 11px;
          background: rgba(22, 27, 23, 0.62);
          border: 1px solid rgba(210, 230, 210, 0.12);
          color: #f4f5f2;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-align: center;
          line-height: 1.18;
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          box-shadow:
            0 10px 24px -10px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 320ms ease, background 320ms ease;
          will-change: transform;
        }

        .feature-card:hover {
          transform: translateY(-1px);
          border-color: rgba(123, 208, 124, 0.28);
          background: rgba(28, 34, 28, 0.7);
        }

        .feature-card .ftx-ic {
          width: 1rem;
          height: 1rem;
          color: #d6dbd5;
        }

        .solution-hub {
          position: absolute;
          top: 44%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          width: clamp(13.5rem, 26vw, 17rem);
          padding: 0.75rem 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-radius: 14px;
          background: rgba(20, 25, 21, 0.78);
          border: 1px solid rgba(210, 230, 210, 0.16);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            0 24px 60px -20px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(123, 208, 124, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .hub-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.15rem 0.3rem 0.45rem;
          border-bottom: 1px solid rgba(210, 230, 210, 0.1);
          margin-bottom: 0.1rem;
        }

        .hub-title {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #f4f5f2;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .hub-grip {
          width: 1.05rem;
          height: 1.05rem;
          color: #d6dbd5;
        }

        .hub-more {
          width: 1rem;
          height: 1rem;
          color: #9ea49e;
        }

        .hub-live {
          margin-left: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.12rem 0.42rem 0.12rem 0.36rem;
          border-radius: 999px;
          background: rgba(123, 208, 124, 0.08);
          border: 1px solid rgba(123, 208, 124, 0.2);
        }

        .hub-live em {
          font-style: normal;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #aed6ae;
        }

        .hub-live-dot {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          background: #7bd07c;
          box-shadow: 0 0 0 3px rgba(123, 208, 124, 0.15);
          animation: ftx-live-pulse 1.6s ease-in-out infinite;
        }

        @keyframes ftx-live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }

        .hub-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.6rem;
          border-radius: 10px;
          background: rgba(11, 15, 13, 0.7);
          border: 1px solid rgba(210, 230, 210, 0.06);
          transition: border-color 280ms ease, transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hub-row:hover {
          border-color: rgba(123, 208, 124, 0.18);
          transform: translateX(1px);
        }

        .hub-row-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 7px;
          background: rgba(123, 208, 124, 0.05);
          border: 1px solid rgba(210, 230, 210, 0.05);
          color: #e6ebe6;
        }

        .hub-row-icon :global(svg) {
          width: 0.85rem;
          height: 0.85rem;
        }

        .hub-row-text {
          display: flex;
          flex-direction: column;
          gap: 0.06rem;
          min-width: 0;
        }

        .hub-row-text strong {
          font-size: 0.72rem;
          font-weight: 600;
          color: #f4f5f2;
          line-height: 1.15;
          letter-spacing: -0.005em;
        }

        .hub-row-text em {
          font-style: normal;
          font-size: 0.6rem;
          color: #9ea49e;
          font-weight: 500;
          letter-spacing: 0;
        }

        .status-dot {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background: #7bd07c;
          box-shadow:
            0 0 0 3px rgba(123, 208, 124, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        /* Code card sits bottom-right of the hub (not center) per Image 2 */
        .code-card {
          position: absolute;
          right: clamp(8rem, 14vw, 10rem);
          bottom: clamp(0.6rem, 1.6vw, 1.1rem);
          z-index: 4;
          width: clamp(11rem, 22vw, 14rem);
          padding: 0.6rem 0.75rem 0.7rem;
          border-radius: 11px;
          background: rgba(20, 25, 21, 0.9);
          border: 1px solid rgba(210, 230, 210, 0.14);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          box-shadow:
            0 20px 50px -16px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
          font-family:
            "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-feature-settings: "calt" 1, "liga" 1;
        }

        .code-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #9ea49e;
          margin-bottom: 0.4rem;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .code-head :global(svg) {
          width: 0.82rem;
          height: 0.82rem;
          color: #7bd07c;
        }

        .code-dots {
          display: inline-flex;
          gap: 3px;
        }

        .code-dots i {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(158, 164, 158, 0.55);
        }

        .code-body {
          margin: 0;
          font-size: 0.56rem;
          line-height: 1.6;
          color: #d6dbd5;
          white-space: pre;
          overflow: hidden;
          font-variant-ligatures: contextual;
        }

        .code-body :global(.tk-c) { color: #6a7a6b; font-style: italic; }
        .code-body :global(.tk-k) { color: #c594c5; }
        .code-body :global(.tk-v) { color: #82b8e6; }
        .code-body :global(.tk-pr) { color: #e8c987; }
        .code-body :global(.tk-b) { color: #7bd07c; }
        .code-body :global(.tk-p) { color: #9ea49e; }

        @media (max-width: 1100px) {
          .visual-panel {
            aspect-ratio: 16 / 11.5;
          }
          .solution-hub {
            width: clamp(12rem, 36vw, 17rem);
          }
          .code-card {
            right: clamp(0.8rem, 3vw, 1.4rem);
            width: clamp(10rem, 30vw, 14rem);
          }
        }

        @media (max-width: 767px) {
          /* Mobile: collapse to a single readable column.
             Inputs row → hub → outputs row stacked vertically. */
          .visual-panel {
            aspect-ratio: auto;
            min-height: 720px;
            padding: 0.9rem;
          }
          .ftx-connectors {
            display: none;
          }
          .ftx-col {
            position: static;
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0;
          }
          .ftx-col-left {
            margin-top: 1.25rem;
          }
          .ftx-col-right {
            margin-bottom: 1.25rem;
          }
          .feature-card {
            flex: 0 1 calc(50% - 0.5rem);
            min-height: 3.6rem;
            font-size: 0.7rem;
            padding: 0.7rem 0.55rem;
          }
          .solution-hub {
            position: static;
            transform: none;
            margin: 1.25rem auto;
            width: min(100%, 22rem);
          }
          .code-card {
            position: static;
            transform: none;
            margin: 0 auto 1rem;
            width: min(100%, 22rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hub-live-dot {
            animation: none;
          }
          .visual-panel,
          .input-card,
          .output-card,
          .solution-hub,
          .hub-row,
          .code-card,
          .green-glow {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default FlexibleTechExecutionVisual
