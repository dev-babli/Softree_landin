"use client";

import { useRef } from "react";
import { ArrowRight, Apple, Smartphone } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";
import { CTA_DECO_LEFT, CTA_DECO_RIGHT } from "./assets";

export default function FizensCTA() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref);

  return (
    <section ref={ref} className="fizens-section fizens-cta-section fizens-reveal">
      <div className="fizens-container">
        <div className="fizens-cta-card">
          <img
            src={CTA_DECO_LEFT}
            alt=""
            aria-hidden
            className="fizens-cta-deco fizens-cta-deco-left"
            loading="lazy"
            decoding="async"
          />
          <img
            src={CTA_DECO_RIGHT}
            alt=""
            aria-hidden
            className="fizens-cta-deco fizens-cta-deco-right"
            loading="lazy"
            decoding="async"
          />
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Get the app
          </span>
          <h2>Your First Step To Financial Freedom Begins Here</h2>
          <p>
            Join 50,000+ users who trust Fizens with their finances. Download
            today and take control of your money in minutes.
          </p>
          <div className="fizens-cta-buttons">
            <a href="#" className="fizens-btn fizens-btn-white">
              <Apple size={16} strokeWidth={2} />
              App Store
            </a>
            <a href="#" className="fizens-btn fizens-btn-outline-white">
              <Smartphone size={16} strokeWidth={2} />
              Google Play
            </a>
            <a href="#pricing" className="fizens-btn fizens-btn-outline-white">
              Get Started <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
