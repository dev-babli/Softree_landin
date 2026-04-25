"use client"

import { RefObject } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useHomePageCloneGsap(rootRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: "(min-width: 960px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean
            reduceMotion: boolean
          }

          const revealItems = q("[data-clone-reveal]")
          const heroItems = q("[data-hero-motion]")
          const progressBar = q("[data-scroll-progress]")[0]

          if (reduceMotion) {
            gsap.set([...revealItems, ...heroItems], {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
              clearProps: "transform,opacity,visibility",
            })

            q("[data-count]").forEach((el) => {
              const node = el as HTMLElement
              node.textContent = `${node.dataset.count ?? "0"}${node.dataset.suffix ?? ""}`
            })

            if (progressBar) {
              gsap.set(progressBar, { scaleY: 1, transformOrigin: "top center" })
            }

            return
          }

          gsap.set(revealItems, { autoAlpha: 0, y: isDesktop ? 34 : 22 })

          gsap.from(heroItems, {
            y: isDesktop ? 22 : 14,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.08,
            delay: 0.08,
            clearProps: "transform",
          })

          if (progressBar) {
            gsap.set(progressBar, { scaleY: 0, transformOrigin: "top center" })
            gsap.to(progressBar, {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
              },
            })
          }

          ScrollTrigger.batch(revealItems, {
            start: "top 82%",
            once: true,
            batchMax: isDesktop ? 6 : 3,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.78,
                ease: "power3.out",
                stagger: 0.06,
                overwrite: true,
              })
            },
          })

          q("[data-count]").forEach((el) => {
            const node = el as HTMLElement
            const target = Number(node.dataset.count ?? 0)
            const suffix = node.dataset.suffix ?? ""
            const proxy = { value: 0 }

            gsap.to(proxy, {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 85%",
                once: true,
              },
              onUpdate: () => {
                node.textContent = `${Math.round(proxy.value)}${suffix}`
              },
            })
          })

          const cleanupFns: Array<() => void> = []

          if (isDesktop) {
            q("[data-depth-card]").forEach((card) => {
              const element = card as HTMLElement
              const rotateY = gsap.quickTo(element, "rotationY", {
                duration: 0.4,
                ease: "power3.out",
              })
              const rotateX = gsap.quickTo(element, "rotationX", {
                duration: 0.4,
                ease: "power3.out",
              })
              const y = gsap.quickTo(element, "y", {
                duration: 0.35,
                ease: "power3.out",
              })

              const handleMove = (event: PointerEvent) => {
                const rect = element.getBoundingClientRect()
                const px = (event.clientX - rect.left) / rect.width - 0.5
                const py = (event.clientY - rect.top) / rect.height - 0.5
                rotateY(px * 5)
                rotateX(py * -4)
                y(-5)
              }

              const handleLeave = () => {
                rotateY(0)
                rotateX(0)
                y(0)
              }

              element.addEventListener("pointermove", handleMove, { passive: true })
              element.addEventListener("pointerleave", handleLeave)
              cleanupFns.push(() => {
                element.removeEventListener("pointermove", handleMove)
                element.removeEventListener("pointerleave", handleLeave)
              })
            })
          }

          const story = q("[data-operation-story]")[0]
          if (story && isDesktop) {
            const steps = q("[data-operation-step]")
            const nodes = q("[data-operation-node]")
            const lines = q("[data-operation-line]")

            gsap.set(steps, { autoAlpha: 0.28, y: 12 })
            gsap.set(steps[0], { autoAlpha: 1, y: 0 })
            gsap.set(nodes, { autoAlpha: 0.38, scale: 0.92 })
            gsap.set(nodes[0], { autoAlpha: 1, scale: 1 })
            gsap.set(lines, { autoAlpha: 0, scaleX: 0, transformOrigin: "left center" })

            const storyTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: story,
                start: "top top",
                end: "+=2600",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
              },
            })

            steps.forEach((_, index) => {
              storyTimeline
                .to(steps, { autoAlpha: 0.28, y: 12, duration: 0.25 }, index)
                .to(steps[index], { autoAlpha: 1, y: 0, duration: 0.35 }, index)
                .to(nodes, { autoAlpha: 0.38, scale: 0.92, duration: 0.25 }, index)
                .to(nodes[index], { autoAlpha: 1, scale: 1, duration: 0.35 }, index)

              if (lines[index - 1]) {
                storyTimeline.to(
                  lines[index - 1],
                  { autoAlpha: 1, scaleX: 1, duration: 0.35 },
                  index + 0.08
                )
              }
            })
          }

          q("[data-light-sweep]").forEach((el) => {
            gsap.fromTo(
              el,
              { xPercent: -120 },
              {
                xPercent: 120,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            )
          })

          return () => {
            cleanupFns.forEach((fn) => fn())
          }
        },
        root
      )

      return () => mm.revert()
    },
    { scope: rootRef }
  )
}
