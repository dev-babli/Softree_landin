"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SoftreeGridHero } from "@/components/brilliance/SoftreeGridHero"
import { VirtualOfficeSection } from "@/components/brilliance/VirtualOfficeSection"
import { SoftreeGlobalShowcase } from "@/components/homepage/SoftreeGlobalShowcase"
import { MirrorContentOpsSection } from "@/components/homepage/MirrorContentOpsSection"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface PanelDef {
  key: string
  bg: string
  node: ReactNode
}

const PANELS: PanelDef[] = [
  { key: "grid-hero", bg: "#000000", node: <SoftreeGridHero /> },
  { key: "virtual-office", bg: "#000000", node: <VirtualOfficeSection /> },
  { key: "global-showcase", bg: "#070707", node: <SoftreeGlobalShowcase /> },
  { key: "mirror-content-ops", bg: "#080808", node: <MirrorContentOpsSection /> },
]

export function LayeredHeroStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set(".lh-panel", {
        zIndex: (i, _target, targets) => targets.length - i,
      })

      gsap.to(".lh-panel:not(:last-child)", {
        yPercent: -100,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".lh-stage",
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
    <div ref={containerRef} className="lh-root w-full">
      <div className="lh-stage">
        {PANELS.map((panel) => (
          <div
            key={panel.key}
            className="lh-panel"
            style={{ backgroundColor: panel.bg }}
          >
            <div className="lh-panel-inner">{panel.node}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .lh-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .lh-panel {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
          overflow: hidden;
        }

        .lh-panel-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .lh-panel-inner > :global(*) {
          flex: 1 1 auto;
          min-height: 0;
        }
      `}</style>
    </div>
  )
}

export default LayeredHeroStack
