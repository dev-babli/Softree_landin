"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LandinClientProps {
  bodyHtml: string;
  styles: string;
}

interface AppearConfig {
  delay: number;
  scale?: number;
  duration?: number;
  stiffness?: number;
  damping?: number;
}

const appearAnimations: Record<string, AppearConfig> = {
  "16birka": { delay: 0.2, stiffness: 200, damping: 60 },
  "5hbeit": { delay: 0.5, stiffness: 200, damping: 60 },
  "j0exq4": { delay: 0.7, stiffness: 200, damping: 60 },
  "1df8tgi": { delay: 1.1, stiffness: 200, damping: 60 },
  "1jq7msv": { delay: 1.2, stiffness: 200, damping: 60 },
  "ryrj4a": { delay: 0, scale: 1.1, duration: 3, stiffness: 200, damping: 60 },
  "1fujwx8": { delay: 0, stiffness: 200, damping: 60 },
};

function getSpringEase(stiffness: number, damping: number) {
  // Framer spring with stiffness 200, damping 60, mass 1 is over-damped
  // (damping ratio ≈ 2.12). Over-damped springs don't oscillate — they
  // settle smoothly, so a standard ease-out matches the feel better than
  // elastic which would add unwanted bounce.
  const ratio = damping / (2 * Math.sqrt(stiffness));
  if (ratio > 1.1) {
    return "power2.out";
  }
  return "elastic.out(1, 0.65)";
}

export default function LandinClient({ bodyHtml, styles }: LandinClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger so it picks up the dynamically injected DOM
    ScrollTrigger.refresh();

    // Replicate Framer appear animations with GSAP
    Object.entries(appearAnimations).forEach(([id, config]) => {
      const el = containerRef.current?.querySelector(`[data-framer-appear-id="${id}"]`);
      if (!el) return;

      const ease = config.duration
        ? "power2.out"
        : getSpringEase(config.stiffness ?? 200, config.damping ?? 60);

      const setVars: gsap.TweenVars = { opacity: 0.001 };
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration: config.duration ?? 1.2,
        delay: config.delay,
        ease,
      };

      if (config.scale) {
        setVars.scale = config.scale;
        toVars.scale = 1;
      }

      gsap.set(el, setVars);
      gsap.to(el, toVars);
    });

    // Also handle any elements with inline opacity:0.001 that should animate in
    const hiddenEls = containerRef.current?.querySelectorAll(
      '[style*="opacity: 0.001"], [style*="opacity:0.001"]'
    );
    hiddenEls?.forEach((el, i) => {
      if (!el.getAttribute("data-framer-appear-id")) {
        gsap.to(el, {
          opacity: 1,
          duration: 1,
          delay: 0.1 * i,
          ease: "power2.out",
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
        style={{ margin: 0, padding: 0, boxSizing: "border-box" }}
      />
    </>
  );
}
