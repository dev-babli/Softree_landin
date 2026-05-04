"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  caption: string;
}

const stats: Stat[] = [
  {
    value: 98,
    suffix: "%",
    caption: "Transactions are processed successfully",
  },
  {
    prefix: "$",
    value: 50,
    suffix: "K+",
    caption: "Our users' average saving amount",
  },
  {
    value: 2.3,
    suffix: "x",
    decimals: 1,
    caption: "Effective in financial growth than before",
  },
];

export default function FizensStats() {
  const ref = useRef<HTMLElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Section-level reveal
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Stagger the stat columns
      gsap.fromTo(
        el.querySelectorAll(".fizens-stat"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Count-up
      stats.forEach((s, i) => {
        const node = numberRefs.current[i];
        if (!node) return;
        if (reduce) {
          node.textContent = s.value.toFixed(s.decimals ?? 0);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 2.2,
          ease: "power2.out",
          delay: 0.2 + i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            node.textContent = obj.v.toFixed(s.decimals ?? 0);
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="fizens-section fizens-stats fizens-reveal">
      <div className="fizens-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            marginBottom: 64,
          }}
        >
          <span className="fizens-pill" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.16)", color: "#fff" }}>
            <span className="fizens-pill-dot" />
            Statistics
          </span>
          <h2>See Your Wealth Grow</h2>
        </div>

        <div className="fizens-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="fizens-stat">
              <div className="fizens-stat-value">
                {s.prefix && (
                  <span className="fizens-stat-suffix" style={{ marginRight: 4 }}>
                    {s.prefix}
                  </span>
                )}
                <span
                  className="fizens-stat-value-num"
                  ref={(node) => {
                    numberRefs.current[i] = node;
                  }}
                >
                  0
                </span>
                {s.suffix && <span className="fizens-stat-suffix">{s.suffix}</span>}
              </div>
              <p className="fizens-stat-caption">{s.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
