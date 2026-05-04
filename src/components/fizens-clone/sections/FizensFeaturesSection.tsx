"use client";

import React, { useEffect, useRef, useState } from "react";

const HEADING = "Explore Our Standout Features";

const FEATURES = [
  {
    title: "Expense & Income Tracking",
    description: "Record and categorize expense & income automatically or manually.",
    image: "https://framerusercontent.com/images/AmwXrcpwI566WaiIbAL7PmGMYPQ.png",
    accentColor: "#0040C1",
  },
  {
    title: "Smart Savings Goals",
    description: "Set specific savings goals and track progress towards them.",
    image: "https://framerusercontent.com/images/K1dKqLkgescF2YxTRGcgcziP0.png",
    accentColor: "#22C55E",
  },
  {
    title: "Financial Analytics",
    description: "Generate reports and visualizations to analyze spending habits.",
    image: "https://framerusercontent.com/images/vqovzzbe2Aal0uT3daXxOyAqy0.png",
    accentColor: "#F59E0B",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function SplitTextHeading({ text, className = "" }: { text: string; className?: string }) {
  const [ref, inView] = useInView<HTMLHeadingElement>(0.3);
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={`fz-features-heading ${inView ? "in-view" : ""} ${className}`}>
      {words.map((word, wi) => {
        const charsBefore = words.slice(0, wi).reduce((a, w) => a + w.length, 0);
        return (
          <span key={wi} className="word">
            {word.split("").map((char, ci) => {
              const idx = charsBefore + ci;
              return (
                <span key={ci} className="char" style={{ transitionDelay: `${idx * 0.018}s` }}>
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}

export default function FizensFeaturesSection() {
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>(0.15);

  return (
    <section className="fz-features-section" id="features">
      <section className="fz-features-container">
        {/* Header */}
        <div className="fz-features-header">
          <div className="fz-features-eyebrow">
            <span className="fz-features-eyebrow-dot" />
            <span>Key Features</span>
          </div>
          <SplitTextHeading text={HEADING} />
        </div>

        {/* Bento Grid */}
        <div
          ref={cardsRef}
          className={`fz-features-grid ${cardsInView ? "in-view" : ""}`}
        >
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="fz-feature-card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="fz-feature-card-icon"
                style={{ backgroundColor: feat.accentColor }}
              >
                <FeatureIcon index={i} />
              </div>
              <div className="fz-feature-card-content">
                <h3 className="fz-feature-card-title">{feat.title}</h3>
                <p className="fz-feature-card-desc">{feat.description}</p>
              </div>
              <div className="fz-feature-card-visual">
                <img src={feat.image} alt={feat.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function FeatureIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h4l3-9 4 18 3-9h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 20h18M7 16V10M12 16V6M17 16v-9" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
