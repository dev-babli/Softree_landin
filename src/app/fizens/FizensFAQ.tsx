"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";

const faqs = [
  {
    q: "How often should I review my financial data?",
    a: "We recommend reviewing your financial data at least once a week. Regular check-ins help you stay on top of your spending, track progress toward your goals, and make informed decisions.",
  },
  {
    q: "What kind of financial data can I track with this app?",
    a: "You can track a wide range of financial data, including income, expenses, budgets, savings, debt, and even investments. The app gives you a full picture of your financial health in one place.",
  },
  {
    q: "Can I track my spending automatically?",
    a: "Yes! You can connect your bank accounts and credit cards to the app to automatically import and categorize your transactions, making spending tracking effortless.",
  },
  {
    q: "Does the app offer investment tracking?",
    a: "Absolutely. You can link your investment accounts to monitor portfolio performance, asset allocation, and more — all in real time.",
  },
  {
    q: "How do I sign up for the app?",
    a: "Signing up is simple. Just download the app from the App Store or Google Play, follow the on-screen setup steps, and you'll be up and running in minutes.",
  },
];

export default function FizensFAQ() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useFizensReveal(ref);

  return (
    <section
      ref={ref}
      id="faq"
      className="fizens-section fizens-faq fizens-reveal"
    >
      <div className="fizens-container">
        <div className="fizens-faq-grid">
          <div className="fizens-faq-side">
            <span className="fizens-pill">
              <span className="fizens-pill-dot" />
              FAQ
            </span>
            <h2>Frequently Asked Questions</h2>
            <p>
              Everything you need to know about using Fizens to manage and grow
              your finances. Can&apos;t find an answer? Reach out to support.
            </p>
          </div>

          <div className="fizens-faq-list">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="fizens-faq-item"
                  data-open={isOpen}
                >
                  <button
                    type="button"
                    className="fizens-faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="fizens-faq-icon" aria-hidden>
                      <Plus size={16} strokeWidth={2.5} />
                    </span>
                  </button>
                  <div
                    id={`faq-content-${i}`}
                    role="region"
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p className="fizens-faq-content">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
