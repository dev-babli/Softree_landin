"use client";

import { useRef } from "react";
import {
  Calculator,
  CreditCard,
  TrendingUp,
  Receipt,
  FileText,
  Bell,
} from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";

const features = [
  {
    icon: <Calculator size={20} strokeWidth={1.75} />,
    title: "Budgeting",
    text: "Track budgets for different categories.",
  },
  {
    icon: <CreditCard size={20} strokeWidth={1.75} />,
    title: "Debt Management",
    text: "Track debt balances, interest rates, and create plans.",
  },
  {
    icon: <TrendingUp size={20} strokeWidth={1.75} />,
    title: "Investment Tracking",
    text: "Track investments, including stocks, bonds, and funds.",
  },
  {
    icon: <Receipt size={20} strokeWidth={1.75} />,
    title: "Bill Payment",
    text: "Pay bills directly through the app. One stop for all.",
  },
  {
    icon: <FileText size={20} strokeWidth={1.75} />,
    title: "Tax Preparation",
    text: "Get assistance with tax preparation and filing.",
  },
  {
    icon: <Bell size={20} strokeWidth={1.75} />,
    title: "Smart Notifications",
    text: "Get instant alerts when you go over budget or hit milestones.",
  },
];

export default function MoreFeatures() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref, { childSelector: ".fizens-more-card", stagger: 0.08 });

  return (
    <section ref={ref} className="fizens-section fizens-more fizens-reveal">
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Variety
          </span>
          <h2>…and more additional features</h2>
          <p>
            Every tool you need to take full control of your money — from
            day-to-day budgeting to long-term planning.
          </p>
        </div>

        <div className="fizens-more-grid">
          {features.map((f, i) => (
            <article key={i} className="fizens-more-card fizens-reveal">
              <span className="fizens-more-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
