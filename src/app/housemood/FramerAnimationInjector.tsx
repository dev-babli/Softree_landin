"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Full animation data extracted from framer-animations.json
const ANIMATION_DATA: Record<string, Record<string, unknown>> = {
  "10efnul": {
    default: {
      initial: { opacity: 0.001, y: -40 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0.3, duration: 1.9, type: "spring" },
    },
    ipf4be: {
      initial: { opacity: 0.001, y: -40 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0.3, duration: 1.9, type: "spring" },
    },
    "1yicgug": {
      initial: { opacity: 0.001, y: -40 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0.3, duration: 1.9, type: "spring" },
    },
  },
  "42jwbh": {
    default: {
      initial: { opacity: 0.001, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "2wk8na": {
      initial: { opacity: 0.001, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "1lg1qtq": {
      initial: { opacity: 0.001, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
  },
  "1u6303e": {
    default: {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "1lg1qtq": {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "2wk8na": {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
  },
  "1v41f9j": {
    default: {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "1lg1qtq": {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "2wk8na": {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
  },
  cr616k: {
    default: {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "1lg1qtq": {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
    "2wk8na": {
      initial: { opacity: 0.001, y: 42 },
      animate: { opacity: 1, y: 0 },
      transition: { bounce: 0.1, delay: 0, duration: 1.8, type: "spring" },
    },
  },
};

interface AnimState {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotateX?: number;
  rotateY?: number;
  skewX?: number;
  skewY?: number;
}

interface AnimSpec {
  initial: AnimState;
  animate: AnimState;
  transition: { bounce?: number; delay?: number; duration?: number; type?: string };
}

function getBreakpointVariant(id: string): string {
  const variants = ANIMATION_DATA[id];
  if (!variants) return "default";
  const w = window.innerWidth;
  if (w <= 809 && variants["1yicgug"]) return "1yicgug";
  if (w <= 1199 && variants["2wk8na"]) return "2wk8na";
  if (w <= 1439 && variants["1lg1qtq"]) return "1lg1qtq";
  if (w <= 1919 && variants.ipf4be) return "ipf4be";
  return "default";
}

function applyAnimation(el: HTMLElement, spec: AnimSpec) {
  const { initial, animate, transition } = spec;

  gsap.set(el, {
    opacity: initial.opacity ?? 1,
    y: initial.y ?? 0,
    x: initial.x ?? 0,
    scale: initial.scale ?? 1,
    rotateX: initial.rotateX ?? 0,
    rotateY: initial.rotateY ?? 0,
    skewX: initial.skewX ?? 0,
    skewY: initial.skewY ?? 0,
  });

  gsap.to(el, {
    opacity: animate.opacity ?? 1,
    y: animate.y ?? 0,
    x: animate.x ?? 0,
    scale: animate.scale ?? 1,
    rotateX: animate.rotateX ?? 0,
    rotateY: animate.rotateY ?? 0,
    skewX: animate.skewX ?? 0,
    skewY: animate.skewY ?? 0,
    duration: transition.duration ?? 1,
    delay: transition.delay ?? 0,
    ease: transition.type === "spring" ? "back.out(1.2)" : "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export default function FramerAnimationInjector() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Apply exact Framer appear animations
      Object.keys(ANIMATION_DATA).forEach((id) => {
        const els = document.querySelectorAll(`[data-framer-appear-id="${id}"]`);
        if (!els.length) return;
        const variant = getBreakpointVariant(id);
        const spec = (ANIMATION_DATA[id] as Record<string, AnimSpec>)[variant];
        if (!spec) return;
        els.forEach((el) => applyAnimation(el as HTMLElement, spec));
      });

      // Fallback: animate all section elements that don't have explicit appear IDs
      const sections = document.querySelectorAll("section[data-framer-name]");
      sections.forEach((section) => {
        const children = section.querySelectorAll(
          "[data-framer-component-type], .framer-text, img, h1, h2, h3, p, div[data-framer-name]"
        );
        children.forEach((child, i) => {
          const el = child as HTMLElement;
          if (el.getAttribute("data-framer-appear-id")) return;
          // Skip if already animated via parent
          if ((el as HTMLElement).style.opacity === "1" && (el as HTMLElement).style.transform) return;

          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.04,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });

      // Stagger hero elements immediately (no scroll trigger)
      const hero = document.querySelector('[data-framer-name="Hero"]') ||
        document.querySelector("section")?.closest('[data-framer-name*="hero" i]');
      if (hero) {
        const heroChildren = hero.querySelectorAll(
          "h1, h2, p, .framer-text, [data-framer-component-type]"
        );
        gsap.fromTo(
          heroChildren,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
