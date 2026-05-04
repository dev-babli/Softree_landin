"use client";

import React, { useEffect, useRef, useState } from "react";

const HEADING = "Choose The Right Plan For Your Needs";

const PLANS = [
  {
    name: "Starter Plan",
    monthly: 0,
    yearly: 0,
    duration: "/Lifetime",
    description: "Starter Plan grants you access to exclusive features",
    badge: null as string | null,
    features: ["Access 14+ Features", "Support 24/7", "Get Personalized Insights", "3 Months Data Storage"],
    highlight: false,
  },
  {
    name: "Standard Plan",
    monthly: 20,
    yearly: 16,
    duration: "/Month",
    description: "Standard Plan grants you access to exclusive features",
    badge: "Popular",
    features: ["Access 23+ Features", "Priority Support", "Get Financial Analytics", "Unlimited Data Storage"],
    highlight: true,
  },
  {
    name: "Advanced Plan",
    monthly: 40,
    yearly: 32,
    duration: "/Month",
    description: "Advanced Plan grants you access to all exclusive features",
    badge: "Best Choice",
    features: ["Access All Features", "Priority Support", "Get Financial Advice", "Unlimited Data Storage"],
    highlight: false,
  },
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

function SplitHeading({ text }: { text: string }) {
  const [ref, inView] = useInView<HTMLHeadingElement>(0.3);
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={`fz-pricing-heading ${inView ? "in-view" : ""}`}>
      {words.map((word, wi) => {
        const charsBefore = words.slice(0, wi).reduce((a, w) => a + w.length, 0);
        return (
          <span key={wi} className="word">
            {word.split("").map((char, ci) => (
              <span key={ci} className="char" style={{ transitionDelay: `${(charsBefore + ci) * 0.018}s` }}>{char}</span>
            ))}
          </span>
        );
      })}
    </h2>
  );
}

export default function FizensPricingSection() {
  const [yearly, setYearly] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.1);

  return (
    <section className="fz-pricing-section" id="pricing">
      <section className="fz-pricing-container">
        <div className="fz-pricing-header">
          <div className="fz-features-eyebrow">
            <span className="fz-features-eyebrow-dot" />
            <span>Pricing</span>
          </div>
          <SplitHeading text={HEADING} />

          {/* Switch */}
          <div className="fz-pricing-switch" role="tablist">
            <button
              type="button"
              className={`fz-pricing-switch-btn ${!yearly ? "active" : ""}`}
              onClick={() => setYearly(false)}
              role="tab"
              aria-selected={!yearly}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`fz-pricing-switch-btn ${yearly ? "active" : ""}`}
              onClick={() => setYearly(true)}
              role="tab"
              aria-selected={yearly}
            >
              Yearly <span className="fz-pricing-discount">-20%</span>
            </button>
          </div>
        </div>

        <div ref={ref} className={`fz-pricing-grid ${inView ? "in-view" : ""}`}>
          {PLANS.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            const isFree = price === 0;
            return (
              <div
                key={plan.name}
                className={`fz-pricing-card ${plan.highlight ? "highlight" : ""}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {plan.badge && (
                  <div className="fz-pricing-badge">
                    <span className="fz-features-eyebrow-dot" />
                    {plan.badge}
                  </div>
                )}
                <div className="fz-pricing-card-header">
                  <h3 className="fz-pricing-card-name">{plan.name}</h3>
                  <div className="fz-pricing-card-price">
                    <span className="fz-pricing-card-amount">
                      {isFree ? "Free" : `$${price}`}
                    </span>
                    <span className="fz-pricing-card-duration">{plan.duration}</span>
                  </div>
                  <p className="fz-pricing-card-desc">{plan.description}</p>
                </div>

                <div className="fz-pricing-card-divider" />

                <ul className="fz-pricing-card-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="fz-pricing-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a className={`fz-pricing-card-cta ${plan.highlight ? "filled" : "outline"}`} href="/contact">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 256 256">
                    <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
