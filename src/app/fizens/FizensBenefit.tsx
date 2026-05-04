"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";

import { BENEFIT_1, BENEFIT_2, BENEFIT_3 } from "./assets";

const benefits = [
  {
    eyebrow: "Benefit 01",
    title: "Time and Stress Reduction",
    text: "Automate tasks like budgeting, tracking, and saving, freeing up your time for more important things.",
    bullets: [
      "Stay on top of your budget.",
      "Automate your finances for less stress.",
    ],
    img: BENEFIT_1,
    reverse: false,
  },
  {
    eyebrow: "Benefit 02",
    title: "Financial Growth",
    text: "Provide valuable insights into your spending habits, helping you identify areas where you can cut back and save more.",
    bullets: ["Reach your financial goals", "Make informed decisions"],
    img: BENEFIT_2,
    reverse: true,
  },
  {
    eyebrow: "Benefit 03",
    title: "Security and Privacy",
    text: "Protect your information from unauthorized access, focus on managing your money without worry.",
    bullets: ["Protect your data", "Peace of mind"],
    img: BENEFIT_3,
    reverse: false,
  },
];

export default function FizensBenefit() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref, { childSelector: ".fizens-benefit-row", stagger: 0.15 });

  return (
    <section ref={ref} className="fizens-section fizens-benefit fizens-reveal">
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Benefit
          </span>
          <h2>Experience The Future of Finance</h2>
          <p>
            See exactly how Fizens helps you save more, spend smarter, and grow
            your wealth — without the stress.
          </p>
        </div>

        {benefits.map((b, i) => (
          <div
            key={i}
            className={`fizens-benefit-row fizens-reveal ${b.reverse ? "is-reverse" : ""}`}
          >
            <div className="fizens-benefit-text">
              <span className="fizens-benefit-eyebrow">{b.eyebrow}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
              <ul className="fizens-benefit-list">
                {b.bullets.map((bullet, k) => (
                  <li key={k}>
                    <span className="fizens-benefit-check">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fizens-benefit-visual">
              <img src={b.img} alt={b.title} loading="lazy" decoding="async" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
