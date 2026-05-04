"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Runs inside the ReactLenis context so useLenis() returns the instance.
 * Drives Lenis from the GSAP ticker so both systems share one RAF loop —
 * this eliminates the jitter caused by two independent requestAnimationFrame
 * loops (Lenis native RAF vs GSAP RAF) fighting each other.
 */
function GSAPLenisSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    function onTick(time: number) {
      lenis.raf(time * 1000)
    }

    // Register Lenis in GSAP's RAF loop
    gsap.ticker.add(onTick)
    // Prevent GSAP from trying to "catch up" after tab focus loss,
    // which would cause a sudden scroll jump
    gsap.ticker.lagSmoothing(0)
    // Keep ScrollTrigger's scroll-position cache in sync with Lenis's
    // virtual scroll position on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.off("scroll", ScrollTrigger.update)
    }
  }, [lenis])

  return null
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // autoRaf: false — GSAP ticker drives Lenis instead of its own RAF
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.085,
        anchors: true,
      }}
    >
      <GSAPLenisSync />
      {children}
    </ReactLenis>
  )
}
