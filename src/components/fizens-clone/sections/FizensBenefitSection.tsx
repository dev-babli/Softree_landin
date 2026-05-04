"use client";

import React, { useEffect, useRef, useState } from "react";

const HEADING = "Discover the Benefits That Set Us Apart";

const BENEFITS = [
  {
    title: "Time and Stress Reduction",
    desc: "Save your time and reduce financial anxiety. Automate tasks like budgeting, tracking, and saving, freeing up your time for more important things.",
    image: "https://framerusercontent.com/images/HjrIbMlxQF2quPYpUhzfiIHgP8.png",
    points: ["Stay on top of your budget.", "Automate your finances for less stress."],
  },
  {
    title: "Financial Growth",
    desc: "Provide valuable insights into your spending habits, helping you identify areas where you can cut back and save more.",
    image: "https://framerusercontent.com/images/24FuYTjAsGI1mo2CsrbzrPQjOrI.png",
    points: ["Reach your financial goals", "Make informed decisions"],
  },
  {
    title: "Security and Privacy",
    desc: "Protect your information from unauthorized access, focus on managing your money without worry.",
    image: "https://framerusercontent.com/images/YzGqtPqHj2h6XUH2ylGCq4FqpKQ.png",
    points: ["Protect your data", "Peace of mind"],
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
    <h2 ref={ref} className={`fz-benefit-heading ${inView ? "in-view" : ""}`}>
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

export default function FizensBenefitSection() {
  return (
    <section className="fz-benefit-section">
      <section className="fz-benefit-container">
        <div className="fz-benefit-header">
          <div className="fz-features-eyebrow">
            <span className="fz-features-eyebrow-dot" />
            <span>Benefit</span>
          </div>
          <SplitHeading text={HEADING} />
        </div>

        <div className="fz-benefit-list">
          {BENEFITS.map((b, i) => (
            <BenefitRow key={b.title} benefit={b} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>
    </section>
  );
}

function BenefitRow({ benefit, reverse }: { benefit: typeof BENEFITS[number]; reverse: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`fz-benefit-row ${reverse ? "reverse" : ""} ${inView ? "in-view" : ""}`}
    >
      <div className="fz-benefit-content">
        <h3 className="fz-benefit-title">{benefit.title}</h3>
        <p className="fz-benefit-desc">{benefit.desc}</p>
        <ul className="fz-benefit-points">
          {benefit.points.map((pt) => (
            <li key={pt}>
              <span className="fz-benefit-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="fz-benefit-visual">
        <img src={benefit.image} alt={benefit.title} loading="lazy" />
      </div>
    </div>
  );
}
