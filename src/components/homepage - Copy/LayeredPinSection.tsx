"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function LayeredPinSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set(".panel", {
        zIndex: (i, _target, targets) => targets.length - i,
      })

      gsap.to(".panel:not(:last-child)", {
        yPercent: -100,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".layered-pin-container",
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="layered-pin w-full">
      <div className="layered-pin-container">
        <div className="panel description">
          <h1>Layered pinning from bottom</h1>
          <p>A simple example where overlapping panels reveal from the bottom.</p>
          <div className="scroll-down" aria-hidden>
            <div className="arrow" />
          </div>
        </div>

        <section className="panel green">
          <h2>1</h2>
        </section>
        <section className="panel solid">
          <h2>2</h2>
        </section>
        <section className="panel purple">
          <h2>3</h2>
        </section>
      </div>

      <style jsx>{`
        .layered-pin-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #0a0a0a;
        }

        .panel {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          will-change: transform;
          color: #fff;
        }

        .panel h2 {
          font-size: 30vw;
          line-height: 1;
          margin: 0;
          opacity: 0.2;
          font-weight: 800;
        }

        .description {
          background: #111;
          color: #fff;
          gap: 1rem;
        }

        .description h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          margin: 0;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .description p {
          font-size: clamp(1rem, 1.4vw, 1.25rem);
          max-width: 48ch;
          opacity: 0.75;
          margin: 0;
        }

        .green {
          background: #0ae448;
          color: #000;
        }

        .solid {
          background: #fffce1;
          color: #111;
        }

        .purple {
          background: #6b4bff;
          color: #fff;
        }

        .scroll-down {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }

        .arrow {
          width: 14px;
          height: 14px;
          border-right: 2px solid currentColor;
          border-bottom: 2px solid currentColor;
          transform: rotate(45deg);
          opacity: 0.7;
          animation: layered-pin-bounce 1.6s ease-in-out infinite;
        }

        @keyframes layered-pin-bounce {
          0%, 100% {
            transform: rotate(45deg) translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: rotate(45deg) translate(4px, 4px);
            opacity: 0.9;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .arrow {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default LayeredPinSection
