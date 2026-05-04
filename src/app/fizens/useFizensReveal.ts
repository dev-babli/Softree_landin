"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  /** CSS selector for staggered children inside the ref. If omitted, only the section itself reveals. */
  childSelector?: string;
  /** Trigger position. Default: 'top 85%'. */
  start?: string;
  /** Override duration. Default: 0.8. */
  duration?: number;
  /** Stagger amount. Default: 0.08. */
  stagger?: number;
  /** Disable section reveal (only stagger children). */
  skipSelf?: boolean;
}

/**
 * Reveals the section element on scroll-enter, then optionally staggers
 * a set of child elements. Plays once. Respects prefers-reduced-motion.
 *
 * Lenis + GSAP ScrollTrigger sync is already wired in the global
 * LenisProvider, so we can register triggers directly here.
 */
export function useFizensReveal(
  ref: RefObject<HTMLElement | null>,
  options: RevealOptions = {}
) {
  const {
    childSelector,
    start = "top 85%",
    duration = 0.8,
    stagger = 0.08,
    skipSelf = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.classList.add("fizens-revealed");
      if (childSelector) {
        el.querySelectorAll(childSelector).forEach((c) =>
          (c as HTMLElement).classList.add("fizens-revealed")
        );
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Framer-style easing: smooth ease-out-expo feel
      const EASE = "expo.out";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: EASE },
      });

      if (!skipSelf) {
        tl.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            onStart: () => el.classList.add("fizens-revealed"),
          }
        );
      }

      if (childSelector) {
        const children = el.querySelectorAll(childSelector);
        if (children.length > 0) {
          tl.fromTo(
            children,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration,
              stagger,
            },
            skipSelf ? 0 : "-=0.5"
          );
        }
      }
    }, el);

    return () => ctx.revert();
  }, [ref, childSelector, start, duration, stagger, skipSelf]);
}
