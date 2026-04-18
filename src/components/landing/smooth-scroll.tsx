"use client"

import type React from "react"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll bypassed due to offline missing dependencies 
    // The page will fall back to native scrolling seamlessly.
    
    // Connect GSAP ScrollTrigger
    ScrollTrigger.update();
    
    return () => {
      // Cleanup
    }
  }, [])

  return <>{children}</>
}
