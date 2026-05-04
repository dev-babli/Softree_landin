"use client";

import React, { useEffect, useRef, useState } from "react";

const HEADING = "Frequently Asked Questions";

const FAQS = [
  { q: "How often should I review my financial data?", a: "We recommend reviewing your financial data at least weekly to stay on top of spending patterns. Our app sends you smart summaries to make this easy." },
  { q: "What kind of financial data can I track with this app?", a: "You can track expenses, income, investments, savings goals, debt balances, and more — all in one secure place." },
  { q: "Can I track my spending automatically?", a: "Yes. Once you connect your accounts, transactions are automatically categorized and tracked in real time." },
  { q: "Does the app offer investment tracking?", a: "Absolutely. You can link your investment accounts to monitor portfolio performance, asset allocation, and more — all in real time." },
  { q: "How do I sign up for the app?", a: "Tap Get Started Free, choose a plan, and create your account in under a minute. No credit card needed for the free tier." },
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
    <h2 ref={ref} className={`fz-faq-heading ${inView ? "in-view" : ""}`}>
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

export default function FizensFAQSection() {
  const [open, setOpen] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.1);

  return (
    <section className="fz-faq-section" id="faq">
      <section className="fz-faq-container">
        <div className="fz-faq-header">
          <div className="fz-features-eyebrow">
            <span className="fz-features-eyebrow-dot" />
            <span>FAQ</span>
          </div>
          <SplitHeading text={HEADING} />
        </div>

        <div ref={ref} className={`fz-faq-list ${inView ? "in-view" : ""}`}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`fz-faq-item ${open === i ? "open" : ""}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <button
                className="fz-faq-question"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className="fz-faq-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="fz-faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Cards (App store + Google Play) */}
        <div className="fz-faq-cta-row">
          <a href="#" className="fz-faq-cta-card">
            <div className="fz-faq-cta-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </div>
            <div>
              <span className="fz-faq-cta-small">Download on the</span>
              <strong>App Store</strong>
            </div>
          </a>
          <a href="#" className="fz-faq-cta-card">
            <div className="fz-faq-cta-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M3.5 3a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 .76.43l13.5-8.5a.5.5 0 0 0 0-.86l-13.5-8.5A.5.5 0 0 0 3.5 3z"/>
              </svg>
            </div>
            <div>
              <span className="fz-faq-cta-small">Get it on</span>
              <strong>Google Play</strong>
            </div>
          </a>
        </div>
      </section>
    </section>
  );
}
