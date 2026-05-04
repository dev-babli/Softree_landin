"use client";

import { useRef } from "react";
import { useFizensReveal } from "./useFizensReveal";
import { HOW_STEP_1, HOW_STEP_2, HOW_STEP_3 } from "./assets";

const steps = [
  {
    num: "01",
    title: "Connect Your Accounts",
    text: "Securely link your bank, credit cards, and investments to get a complete financial overview in one place.",
    img: HOW_STEP_1,
  },
  {
    num: "02",
    title: "Track Expenses",
    text: "Watch every transaction get auto-categorized so you always know where your money is going.",
    img: HOW_STEP_2,
  },
  {
    num: "03",
    title: "Set Budget",
    text: "Create budgets that match your goals and get insights to keep you on the path to financial freedom.",
    img: HOW_STEP_3,
  },
];

export default function FizensHowItWorks() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref, { childSelector: ".fizens-how-step", stagger: 0.12 });

  return (
    <section ref={ref} className="fizens-section fizens-how fizens-reveal">
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            How It Works
          </span>
          <h2>Get started in three simple steps</h2>
          <p>
            From signup to a clear view of your finances in minutes — no
            spreadsheets, no setup headaches.
          </p>
        </div>

        <div className="fizens-how-grid">
          {steps.map((s) => (
            <div key={s.num} className="fizens-how-step fizens-reveal">
              <div className="fizens-how-step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              <div className="fizens-how-step-visual">
                <img src={s.img} alt={s.title} loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
