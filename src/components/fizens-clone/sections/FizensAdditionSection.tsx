"use client";

import React, { useEffect, useRef, useState } from "react";

const FEATURES = [
  { title: "Budgeting", desc: "Track budgets for different categories.", color: "#0040C1", bg: "#EFF4FF", icon: "wallet" },
  { title: "Debt Management", desc: "Track debt balances, interest rates, and create plans.", color: "#22C55E", bg: "#F0FDF4", icon: "scale" },
  { title: "Investment Tracking", desc: "Track investments, including stocks, bonds, and funds.", color: "#EC4899", bg: "#FDF2F8", icon: "chart" },
  { title: "Bill Payment", desc: "Pay bills directly through the app. One stop for all.", color: "#F59E0B", bg: "#FFFBEB", icon: "card" },
  { title: "Tax Preparation", desc: "Get assistance with tax preparation and filing.", color: "#8B5CF6", bg: "#F5F3FF", icon: "doc" },
];

function useInView<T extends HTMLElement>(threshold = 0.15) {
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

function FeatureIcon({ name }: { name: string }) {
  const props = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "wallet":
      return <svg {...props}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
    case "scale":
      return <svg {...props}><path d="M16 16.5a4.5 4.5 0 0 1-4.5-4.5h-7a4.5 4.5 0 0 0 9 0Z"/><path d="M12 3v18M3 12h2M19 12h2"/></svg>;
    case "chart":
      return <svg {...props}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>;
    case "card":
      return <svg {...props}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
    default:
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>;
  }
}

export default function FizensAdditionSection() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  return (
    <section className="fz-addition-section">
      <section className="fz-addition-container">
        {/* Underlay text */}
        <div className="fz-addition-underlay" aria-hidden="true">
          <span>VARIETY</span>
          <span>FEATURES</span>
        </div>

        {/* Feature Cards */}
        <div ref={ref} className={`fz-addition-grid ${inView ? "in-view" : ""}`}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="fz-addition-card"
              style={{
                transitionDelay: `${i * 0.08}s`,
                ["--card-bg" as string]: f.bg,
                ["--card-color" as string]: f.color,
              }}
            >
              <div className="fz-addition-card-icon">
                <FeatureIcon name={f.icon} />
              </div>
              <div className="fz-addition-card-content">
                <h3 className="fz-addition-card-title">{f.title}</h3>
                <p className="fz-addition-card-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Phone wrapper */}
        <div className="fz-addition-phone-wrap">
          <img
            src="https://framerusercontent.com/images/JDSot5NIN3WyEkAj3NoSKPG7f0c.png"
            alt=""
            loading="lazy"
            className="fz-addition-phone"
          />
        </div>
      </section>
    </section>
  );
}
