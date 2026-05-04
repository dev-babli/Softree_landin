"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";

interface Plan {
  tag?: string;
  tagPopular?: boolean;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  period: string; // displayed when not free
  free?: boolean;
  features: string[];
  cta: string;
}

const plans: Plan[] = [
  {
    tag: "Free",
    name: "Starter Plan",
    description: "Starter Plan grants you access to exclusive features",
    monthly: 0,
    yearly: 0,
    period: "Lifetime",
    free: true,
    features: [
      "Access 14+ Features",
      "Support 24/7",
      "Get Personalized Insights",
      "3 Months Data Storage",
    ],
    cta: "Get Started",
  },
  {
    tag: "Popular",
    tagPopular: true,
    name: "Standard Plan",
    description: "Standard Plan grants you access to exclusive features",
    monthly: 20,
    yearly: 16,
    period: "Month",
    features: [
      "Access 23+ Features",
      "Priority Support",
      "Get Financial Analytics",
      "Unlimited Data Storage",
    ],
    cta: "Get Started",
  },
  {
    tag: "Best Choice",
    name: "Advanced Plan",
    description: "Advanced Plan grants you access to all exclusive features",
    monthly: 40,
    yearly: 32,
    period: "Month",
    features: [
      "Access All Features",
      "Priority Support",
      "Get Financial Advice",
      "Unlimited Data Storage",
    ],
    cta: "Get Started",
  },
];

export default function FizensPricing() {
  const ref = useRef<HTMLElement>(null);
  const [yearly, setYearly] = useState(false);
  useFizensReveal(ref, { childSelector: ".fizens-pricing-card", stagger: 0.12 });

  return (
    <section
      ref={ref}
      id="pricing"
      className="fizens-section fizens-pricing fizens-reveal"
    >
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Pricing
          </span>
          <h2>Try For Free And Start Controlling Your Finances</h2>
          <p>
            No credit card required. Cancel anytime. Start with a free plan and
            upgrade when you&apos;re ready.
          </p>

          <div className="fizens-pricing-toggle" role="tablist" aria-label="Billing period">
            <button
              type="button"
              role="tab"
              aria-selected={!yearly}
              data-active={!yearly}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={yearly}
              data-active={yearly}
              onClick={() => setYearly(true)}
            >
              Yearly
              <span className="fizens-pricing-toggle-discount">−20%</span>
            </button>
          </div>
        </div>

        <div className="fizens-pricing-grid">
          {plans.map((p) => {
            const price = p.free ? 0 : yearly ? p.yearly : p.monthly;
            const period = p.free ? "Lifetime" : yearly ? "Year" : "Month";
            return (
              <article
                key={p.name}
                className={`fizens-pricing-card fizens-reveal ${p.tagPopular ? "is-popular" : ""}`}
              >
                {p.tag && <span className="fizens-pricing-tag">{p.tag}</span>}

                <div className="fizens-pricing-price">
                  <span className="fizens-pricing-price-num">${price}</span>
                  <span className="fizens-pricing-price-period">/{period}</span>
                </div>

                <div>
                  <div className="fizens-pricing-name">{p.name}</div>
                  <p className="fizens-pricing-desc" style={{ marginTop: 6 }}>
                    {p.description}
                  </p>
                </div>

                <div className="fizens-pricing-divider" />

                <ul className="fizens-pricing-features">
                  {p.features.map((f) => (
                    <li key={f} className="fizens-pricing-feature">
                      <Check size={16} strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`fizens-btn ${p.tagPopular ? "fizens-btn-white" : "fizens-btn-primary"} fizens-pricing-cta`}
                >
                  {p.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
