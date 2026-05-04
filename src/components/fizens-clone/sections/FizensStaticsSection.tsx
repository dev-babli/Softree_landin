"use client";

import React, { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 99, suffix: "%", label: "Transactions are processed successfully" },
  { value: 50, suffix: "K+", label: "Our users' average saving amount" },
  { value: 80, suffix: "%", label: "Effective in financial growth than before" },
];

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function CountUp({ end, suffix, active }: { end: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);
  return <>{n}{suffix}</>;
}

export default function FizensStaticsSection() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="fz-statics-section">
      <section className="fz-statics-container">
        <div className="fz-statics-header">
          <div className="fz-features-eyebrow fz-features-eyebrow-light">
            <span className="fz-features-eyebrow-dot" />
            <span>Statistics</span>
          </div>
        </div>

        <div ref={ref} className={`fz-statics-grid ${inView ? "in-view" : ""}`}>
          {STATS.map((s, i) => (
            <div key={i} className="fz-statics-card" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="fz-statics-value">
                <CountUp end={s.value} suffix={s.suffix} active={inView} />
              </div>
              <p className="fz-statics-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Decorative crosses */}
        <div className="fz-statics-cross fz-statics-cross-1" aria-hidden="true">+</div>
        <div className="fz-statics-cross fz-statics-cross-2" aria-hidden="true">+</div>
        <div className="fz-statics-cross fz-statics-cross-3" aria-hidden="true">+</div>
      </section>
    </section>
  );
}
