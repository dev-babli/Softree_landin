"use client";

import React from "react";
import "./fizens-hero.css";

/* ════════════════════════════════════════════════════════════
   FIZENS HERO CLONE — Faithful React Replica
   Uses original Framer CSS (scoped to .fz-root) + entrance anims
   ════════════════════════════════════════════════════════════ */

const ROLLING_TEXT = "Get Started Free";

const AVATAR_IDS = [
  "8j7MtVVIDIYqwbyfPIQHrhDf2Fw",
  "z7MRh9YQt36FSbvSyGMGalLTwk",
  "DZNJOIwlYVSuOLQUYlvD9UTjnVc",
];

const LOGOS = ["Stripe", "Notion", "Figma", "Slack", "Vercel", "Linear"];

export default function FizensHeroClone() {
  return (
    <>
      <section className="fz-section">
        <section className="fz-container">
          {/* ═══ Hero Content (top row) ═══ */}
          <div className="fz-content">
            {/* ── LEFT: Header ── */}
            <div className="fz-header">
              {/* Heading */}
              <div className="fz-heading-wrap fz-appear fz-d1">
                <h1 className="fz-h1">Start Managing</h1>
                <h1 className="fz-h1">Your Finance</h1>
                <div className="fz-highlight">
                  <div className="fz-line" />
                  <h1 className="fz-h1 fz-muted">With Our Tool</h1>
                </div>
              </div>

              {/* CTA */}
              <div className="fz-action fz-appear fz-d3">
                <a className="fz-cta" href="/contact">
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

              {/* Pattern 1 */}
              <div className="fz-pattern1" aria-hidden="true">
                <img
                  src="https://framerusercontent.com/images/FxG4w1m6Obfb6ChCSXhqQVQO70.svg?width=197&height=193"
                  alt=""
                  width={197}
                  height={193}
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Pattern 2 */}
              <div className="fz-pattern2" aria-hidden="true">
                <img
                  src="https://framerusercontent.com/images/oYG2689X2N6hn2mMqpUNrrJUoE.svg?width=197&height=193"
                  alt=""
                  width={197}
                  height={193}
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* ── RIGHT: Description ── */}
            <div className="fz-description">
              <div className="fz-top-wrap fz-appear fz-d2">
                <div className="fz-crosshair" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
                    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="#171717" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="fz-desc-text">
                  Simplify your financial life. Our intuitive app makes managing your money effortless.
                </p>
              </div>

              <div className="fz-bottom-wrap fz-appear fz-d4">
                <div className="fz-avatars">
                  <div className="fz-avatar-group">
                    {AVATAR_IDS.map((id, i) => (
                      <div key={id} className={`fz-avatar fz-avatar-${i + 1}`}>
                        <img
                          src={`https://framerusercontent.com/images/${id}.jpg?width=1200&height=1200`}
                          alt=""
                          width={36}
                          height={36}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="fz-counter">2.3M+</p>
                </div>
                <p className="fz-trust">Trusted to use by millions users over 140 countries</p>
              </div>
            </div>
          </div>

          {/* ═══ Phone Parallax (blue card + floating phone) ═══ */}
          <div className="fz-phone-parallax">
            {/* Desktop blue card */}
            <div className="fz-desktop-card fz-appear fz-d5">
              <div className="fz-desktop-card-bg">
                <img
                  src="https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?width=2592&height=1088"
                  alt=""
                  width={2592}
                  height={1088}
                />
              </div>

              {/* Ticker */}
              <div className="fz-ticker-container">
                <div className="fz-ticker">
                  <ul className="fz-ticker-track">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <li>
                          <div className="fz-ticker-item">
                            <p className="fz-ticker-text">FINANCE MANAGEMENT</p>
                          </div>
                        </li>
                        <li>
                          <div className="fz-ticker-dot" />
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="fz-divider" />

              {/* Client Wrap */}
              <div className="fz-client-wrap">
                <h5 className="fz-client-text">
                  Partnering with top tier brands to revolutionize financial services.
                </h5>
                <div className="fz-logo-wrap">
                  {LOGOS.map((name) => (
                    <span key={name} className="fz-logo">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating phone (user's hero image) */}
            <div className="fz-phone-wrapper">
              <div className="fz-phone fz-appear fz-d6">
                <div className="fz-phone-float">
                  <img
                    src="/fizens-html/Adobe%20Express%20-%20file.png"
                    alt="Softree Phone Hero"
                    width={1599}
                    height={1489}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pattern 3 */}
          <div className="fz-pattern3" aria-hidden="true">
            <img
              src="https://framerusercontent.com/images/oYG2689X2N6hn2mMqpUNrrJUoE.svg?width=197&height=193"
              alt=""
              width={197}
              height={193}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* Animation Trigger spacer (matches original footprint) */}
        <div className="fz-trigger" aria-hidden="true" />
      </section>
    </>
  );
}
