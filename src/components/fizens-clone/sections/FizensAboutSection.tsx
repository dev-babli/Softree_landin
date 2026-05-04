"use client";

import React, { useEffect, useRef, useState } from "react";
import "../fizens-sections.css";

const HEADING = "Our app is all-in-one solution for managing your money and financial goals.";
const ROLLING_TEXT = "Get Started Free";

const PILL_BG = "https://framerusercontent.com/images/dxhAyu7VXogkB4PnzIUEs6r5DvE.svg?width=195&height=100";
const DECO_BG = "https://framerusercontent.com/images/H8Sn3i5awKMl87FuwNpkm3y7XQ.svg?width=402&height=394";

export default function FizensAboutSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!headingRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  // Split into words and chars for stagger animation
  const words = HEADING.split(" ");

  return (
    <section className="fz-about-section" id="about">
      <section className="fz-about-container">
        {/* Headline with split-text animation */}
        <h2
          ref={headingRef}
          className={`fz-about-heading ${inView ? "in-view" : ""}`}
        >
          {words.map((word, wi) => {
            const charsBefore = words.slice(0, wi).reduce((a, w) => a + w.length, 0);
            return (
              <span key={wi} className="word">
                {word.split("").map((char, ci) => {
                  const idx = charsBefore + ci;
                  return (
                    <span
                      key={ci}
                      className="char"
                      style={{ transitionDelay: `${idx * 0.018}s` }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h2>

        {/* Content wrap */}
        <div className="fz-about-content">
          <div className="fz-about-description">
            <div className="fz-about-line-pad">
              <div className="fz-about-line left" />
            </div>
            <p className="fz-about-desc-text">
              Experience the peace of mind that comes with having your finances under control.
            </p>
            <div className="fz-about-line-pad">
              <div className="fz-about-line right" />
            </div>
          </div>

          {/* Small CTA */}
          <a className="fz-cta fz-cta-small" href="/contact">
            <div className="fz-cta-content">
              <div className="fz-cta-text-wrap">
                <p className="fz-rolling-text">
                  {ROLLING_TEXT.split("").map((c, i) => (
                    <span key={i}>{c === " " ? "\u00A0" : c}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className="fz-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 256 256">
                <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Floating pill decorations */}
      {(["p1", "p2", "p3", "p4"] as const).map((cls) => (
        <div key={cls} className={`fz-about-pill ${cls}`} aria-hidden="true">
          <img src={PILL_BG} alt="" width={195} height={100} />
        </div>
      ))}

      {/* Bottom corner SVG decorations */}
      <div className="fz-about-deco left" aria-hidden="true">
        <img src={DECO_BG} alt="" width={401} height={393} />
      </div>
      <div className="fz-about-deco right" aria-hidden="true">
        <img src={DECO_BG} alt="" width={401} height={393} />
      </div>
    </section>
  );
}
