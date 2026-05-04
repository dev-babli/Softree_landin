"use client";

import { useRef } from "react";
import { PiggyBank, Wallet, BarChart3 } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";
import {
  BENTO_TRACKING_MAIN,
  BENTO_SAVINGS_MAIN,
  BENTO_ANALYTICS_ALT,
} from "./assets";

interface BentoCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  large?: boolean;
  blue?: boolean;
  img: string;
  imgStyle?: React.CSSProperties;
}

const cards: BentoCardData[] = [
  {
    id: "tracking",
    icon: <Wallet size={20} strokeWidth={1.75} />,
    title: "Expense & Income Tracking",
    text: "Record and categorize expense & income automatically or manually.",
    large: true,
    img: BENTO_TRACKING_MAIN,
    imgStyle: { objectPosition: "center top" },
  },
  {
    id: "savings",
    icon: <PiggyBank size={20} strokeWidth={1.75} />,
    title: "Smart Savings Goals",
    text: "Set specific savings goals and track progress towards them.",
    blue: true,
    img: BENTO_SAVINGS_MAIN,
  },
  {
    id: "analytics",
    icon: <BarChart3 size={20} strokeWidth={1.75} />,
    title: "Financial Analytics",
    text: "Generate reports and visualizations to analyze spending habits.",
    img: BENTO_ANALYTICS_ALT,
  },
];

export default function FeaturesBento() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref, { childSelector: ".fizens-bento-card", stagger: 0.1 });

  return (
    <section
      ref={ref}
      id="features"
      className="fizens-section fizens-bento fizens-reveal"
    >
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Key Features
          </span>
          <h2>Explore Our Standout Features</h2>
          <p>
            Experience the peace of mind that comes with having your finances
            under control.
          </p>
        </div>

        <div className="fizens-bento-grid">
          {cards.map((c) => (
            <article
              key={c.id}
              className={`fizens-bento-card fizens-reveal ${c.large ? "is-large" : ""} ${c.blue ? "is-blue" : ""}`}
            >
              <span className="fizens-bento-card-icon">{c.icon}</span>
              <div className="fizens-bento-card-visual">
                <img src={c.img} alt={c.title} loading="lazy" decoding="async" style={c.imgStyle} />
              </div>
              <div className="fizens-bento-card-body">
                <h3>{c.title}</h3>
                <p className="fizens-bento-card-text">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
