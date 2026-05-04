"use client";

import React from "react";

interface AboutProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function FizensAboutExact({
  heading = "Our app is an all-in-one solution for managing your money and financial goals.",
  description = "Experience the peace of mind that comes with having your finances under control.",
  ctaText = "Get Started Free",
  ctaLink = "/pricing",
}: AboutProps) {
  return (
    <section className="framer-81bs2k" data-framer-name="About Section" id="nav-trigger">
      <section className="framer-1v489bu" data-framer-name="Container" id="about-trigger">
        <div
          className="framer-8scff4"
          data-framer-name="Our app is all-in-one solution for managing your money and financial goals."
          data-framer-component-type="RichTextContainer"
          style={{ justifyContent: "center", transform: "none" }}
        >
          <h2
            className="framer-text framer-styles-preset-i0f6z9"
            data-styles-preset="Z6NLzAUVl"
            style={{
              "--framer-text-alignment": "center",
              "--framer-text-color": "var(--token-6d2eb3af-fe77-4a09-8815-78a070874f6e, rgb(0, 64, 193))",
            } as React.CSSProperties}
          >
            {heading.split(" ").map((word, i) => (
              <span key={i} style={{ whiteSpace: "nowrap" }}>
                {word.split("").map((char, j) => (
                  <span
                    key={j}
                    style={{
                      display: "inline-block",
                      opacity: 1,
                      transform: "none",
                      willChange: "transform",
                    }}
                  >
                    {char}
                  </span>
                ))}
                {i < heading.split(" ").length - 1 && (
                  <span
                    style={{
                      display: "inline-block",
                      opacity: 1,
                      transform: "none",
                      willChange: "transform",
                    }}
                  >
                    {" "}
                  </span>
                )}
              </span>
            ))}
          </h2>
        </div>
        <div className="framer-ps1jyp" data-framer-name="Content Wrap">
          <div className="framer-a06em2" data-framer-name="Decsription">
            <div className="framer-yrtut0 hidden-1qvnpt1" data-framer-name="Top Padding">
              <div className="framer-1yxv3fy" data-framer-name="Light" />
            </div>
            <div
              className="framer-1qnr8p3"
              data-framer-name="Experience the peace of mind that comes with having your finances under control."
              data-framer-component-type="RichTextContainer"
              style={{ justifyContent: "center", transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-7i9k8i"
                data-styles-preset="xqbJafdnV"
                style={{
                  "--framer-text-alignment": "center",
                  "--framer-text-color": "var(--token-339c53a4-6403-428e-9760-233187b03aa1, rgb(23, 23, 23))",
                } as React.CSSProperties}
              >
                {description}
              </p>
            </div>
            <div className="framer-10vc9wl hidden-1qvnpt1" data-framer-name="Top Padding">
              <div className="framer-6f6l0p" data-framer-name="Light" />
            </div>
          </div>
          <div className="ssr-variant hidden-1qvnpt1">
            <div className="framer-19a2xvm-container">
              <a
                className="framer-RW3kI framer-1g71hn6 framer-v-17ukbes framer-v9g74s"
                href={ctaLink}
                tabIndex={0}
                style={{ borderRadius: "1000px", opacity: 1 }}
                data-framer-name="Small"
              >
                <div
                  className="framer-101v7wz"
                  data-framer-name="Content"
                  style={{
                    backgroundColor: "var(--token-280335e9-be31-4ef5-b9cd-cc20e0b684ad, rgb(239, 244, 255))",
                    borderRadius: "1000px",
                    transform: "none",
                    opacity: 1,
                    willChange: "transform",
                  } as React.CSSProperties}
                >
                  <div className="framer-h5azkw-container" style={{ opacity: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        padding: "12px 68px 12px 24px",
                        boxSizing: "border-box",
                      }}
                    >
                      <p className="rolling-text-inner-df410738-e10b-4db1-bd06-ec17b7508a61">
                        {ctaText.split("").map((char, i) => (
                          <span
                            key={i}
                            style={{
                              display: "block",
                              fontFamily: "Poppins, 'Poppins Placeholder', sans-serif",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              letterSpacing: "0px",
                              lineHeight: "1.5em",
                              transform: "none",
                              willChange: "transform",
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </p>
                      <style>{`
                        .rolling-text-inner-df410738-e10b-4db1-bd06-ec17b7508a61 {
                          --font-size: 16px;
                          --text: var(--token-339c53a4-6403-428e-9760-233187b03aa1, rgb(23, 23, 23));
                          --line-height-abs: 24px;
                          box-sizing: border-box;
                          margin: 0;
                          padding: 0;
                          vertical-align: top;
                          display: flex;
                          overflow: hidden;
                          width: max-content;
                          font-family: "Poppins", "Poppins Placeholder", sans-serif;
                          font-size: 16px;
                          text-transform: none;
                          user-select: none;
                          text-shadow: 0 var(--line-height-abs) 0 var(--text);
                        }
                        .rolling-text-inner-df410738-e10b-4db1-bd06-ec17b7508a61 span {
                          display: block;
                          -webkit-backface-visibility: hidden;
                          backface-visibility: hidden;
                          white-space: pre;
                          flex-shrink: 0;
                          font-family: inherit;
                          font-weight: inherit;
                          font-style: inherit;
                          font-size: inherit;
                          letter-spacing: inherit;
                          line-height: 1.5em;
                          color: var(--text);
                        }
                      `}</style>
                    </div>
                  </div>
                  <div
                    className="framer-t2aurx"
                    data-framer-name="Icon"
                    style={{
                      backgroundColor: "var(--token-6d2eb3af-fe77-4a09-8815-78a070874f6e, rgb(0, 64, 193))",
                      borderRadius: "100px",
                      opacity: 1,
                    } as React.CSSProperties}
                  >
                    <div className="framer-1b303gm-container" style={{ transform: "none", opacity: 1 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        focusable="false"
                        color="var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255))"
                        style={{
                          userSelect: "none",
                          width: "100%",
                          height: "100%",
                          display: "inline-block",
                          fill: "var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255))",
                          color: "var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255))",
                          flexShrink: 0,
                        }}
                      >
                        <g color="var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255))">
                          <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div
            className="framer-1g6ig6e hidden-1jp9pa2 hidden-1qvnpt1"
            data-framer-name="Floating Image - 1"
            style={{ willChange: "transform", opacity: 1, transform: "none" }}
          >
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={390}
                height={200}
                src="https://framerusercontent.com/images/ZMO6G74xkrkpwEMg9F96Fk6fJOI.png?width=390&height=200"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div
            className="framer-atd5oa hidden-1jp9pa2 hidden-1qvnpt1"
            data-framer-name="Floating Image - 2"
            style={{ willChange: "transform", opacity: 1, transform: "none" }}
          >
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={392}
                height={200}
                src="https://framerusercontent.com/images/UV1aSP2hFFZ5uUbZbeXYtBucZk.png?width=392&height=200"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div
            className="framer-cdaolg hidden-1jp9pa2 hidden-1qvnpt1"
            data-framer-name="Floating Image - 3"
            style={{ willChange: "transform", opacity: 1, transform: "none" }}
          >
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={392}
                height={200}
                src="https://framerusercontent.com/images/mbFK17zWNH7TsMEI97xKQ46sfyw.png?width=392&height=200"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div
            className="framer-wrqdre hidden-1jp9pa2 hidden-1qvnpt1"
            data-framer-name="Floating Image - 4"
            style={{ willChange: "transform", opacity: 1, transform: "none" }}
          >
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={392}
                height={200}
                src="https://framerusercontent.com/images/0oBaiDJPLkYsgCOJRKVG41wQag.png?width=392&height=200"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="framer-p5gi9j hidden-1qvnpt1">
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={402}
                height={394}
                src="https://framerusercontent.com/images/H8Sn3i5awKMl87FuwNpkm3y7XQ.svg?width=402&height=394"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="framer-8kp87o hidden-1qvnpt1">
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={402}
                height={394}
                src="https://framerusercontent.com/images/H8Sn3i5awKMl87FuwNpkm3y7XQ.svg?width=402&height=394"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
