"use client";

import React, { useEffect, useRef, useState } from "react";

const HEADING = "Get Started in Just a Few Simple Steps";

const STEPS = [
  {
    n: 1,
    title: "Connect Your Accounts",
    desc: "Securely link your bank, credit cards, and investments to get a complete financial overview in one place.",
    image: "https://framerusercontent.com/images/QmYFiO3lpR1L76dddOShat9nac.png",
  },
  {
    n: 2,
    title: "Track Expenses",
    desc: "Automatically categorize transactions and track every expense across all your linked accounts.",
    image: "https://framerusercontent.com/images/piKX7HBe8Lur8DC1MHIYtPuDLfc.png",
  },
  {
    n: 3,
    title: "Set Budget",
    desc: "Create personalized budgets for different categories and get notified when you're nearing limits.",
    image: "https://framerusercontent.com/images/PYZljkgzIz3O7efSLVUNVnZbMvE.png",
  },
];

const TESTIMONIALS = [
  { name: "David Lee", location: "Montreal, Canada", text: "It has been a game-changer for my financial life. I love how it helps me stay organized my spending.", avatar: "https://framerusercontent.com/images/i2k3rhfcECl9A5LuquZJk5g819w.jpg", rating: 5 },
  { name: "Michael Brown", location: "London, UK", text: "I was skeptical at first, but then I have completely transformed my relationship with money.", avatar: "https://framerusercontent.com/images/w8tNEZ89kafk3tblQ09yNPD3Q.jpg", rating: 5 },
  { name: "Sarah Johnson", location: "Paris, France", text: "I've been able to pay off debt, save for a down payment, and even start investing.", avatar: "https://framerusercontent.com/images/8j7MtVVIDIYqwbyfPIQHrhDf2Fw.jpg", rating: 5 },
  { name: "Emily Smith", location: "Lyon, France", text: "Easy to use and beautifully designed. Tracking spending has never been this enjoyable.", avatar: "https://framerusercontent.com/images/z7MRh9YQt36FSbvSyGMGalLTwk.jpg", rating: 4.5 },
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
    <h2 ref={ref} className={`fz-howitworks-heading ${inView ? "in-view" : ""}`}>
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

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="fz-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < full ? "#0040C1" : i === full && half ? "url(#half)" : "#E5E7EB"}>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#0040C1" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function FizensHowItWorksSection() {
  const [stepsRef, stepsInView] = useInView<HTMLDivElement>(0.1);
  const [testRef, testInView] = useInView<HTMLDivElement>(0.1);

  return (
    <section className="fz-howitworks-section">
      <section className="fz-howitworks-container">
        <div className="fz-howitworks-header">
          <div className="fz-features-eyebrow">
            <span className="fz-features-eyebrow-dot" />
            <span>How It Works</span>
          </div>
          <SplitHeading text={HEADING} />
        </div>

        {/* Steps */}
        <div ref={stepsRef} className={`fz-howitworks-steps ${stepsInView ? "in-view" : ""}`}>
          {STEPS.map((step, i) => (
            <div key={step.n} className="fz-howitworks-step" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="fz-howitworks-step-number">{step.n}</div>
              <div className="fz-howitworks-step-image">
                <img src={step.image} alt={step.title} loading="lazy" />
              </div>
              <div className="fz-howitworks-step-content">
                <h3 className="fz-howitworks-step-title">{step.title}</h3>
                <p className="fz-howitworks-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="fz-testimonials-wrap">
          <div className="fz-testimonials-header">
            <div className="fz-features-eyebrow">
              <span className="fz-features-eyebrow-dot" />
              <span>Testimonials</span>
            </div>
            <div className="fz-testimonials-rating">
              <Stars rating={4.8} />
              <strong>4.8/5</strong>
              <span>Based on 14K+ reviews</span>
            </div>
          </div>

          <div ref={testRef} className={`fz-testimonials-grid ${testInView ? "in-view" : ""}`}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="fz-testimonial-card" style={{ transitionDelay: `${i * 0.08}s` }}>
                <Stars rating={t.rating} />
                <p className="fz-testimonial-text">{t.text}</p>
                <div className="fz-testimonial-author">
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
