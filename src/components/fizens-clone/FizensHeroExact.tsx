"use client";

import React, { useEffect, useRef } from "react";

interface HeroProps {
  heading1?: string;
  heading2?: string;
  heading3?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  userCount?: string;
  userLabel?: string;
  partnerText?: string;
  phoneImage?: string;
  desktopCardImage?: string;
}

export default function FizensHeroExact({
  heading1 = "Start Managing",
  heading2 = "Your Finance",
  heading3 = "With Our Tool",
  description = "Simplify your financial life. Our intuitive app makes managing your money effortless.",
  ctaText = "Get Started Free",
  ctaLink = "/pricing",
  userCount = "2.3M+",
  userLabel = "Trusted to use by millions users over 140 countries",
  partnerText = "Partnering with top tier brands to revolutionize financial services.",
  phoneImage = "https://framerusercontent.com/images/2PJCBW3k14Gd59z05NimgBmXjSA.png?scale-down-to=1024&width=1599&height=1489",
  desktopCardImage = "https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?width=2592&height=1088",
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add parallax effect for phone
    const handleScroll = () => {
      if (containerRef.current) {
        const phoneWrapper = containerRef.current.querySelector('[data-framer-name="Phone Wrapper"]');
        if (phoneWrapper) {
          const scrollY = window.scrollY;
          const translateY = scrollY * 0.1;
          const translateX = scrollY * 0.05;
          phoneWrapper.setAttribute(
            "style",
            `transform: translate(${translateX}px, ${translateY}px) matrix(1, 0, 0, 1, -314.961, -23.701) !important;`
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tickerText = "FINANCE MANAGEMENT";
  const tickerItems = Array.from({ length: 4 });

  return (
    <section className="framer-1gplvv3" data-framer-name="Hero Section">
      <section className="framer-plgg47" data-framer-name="Container">
        <div className="framer-1m3xpgc" data-framer-name="Hero Content">
          {/* Header */}
          <div className="framer-1ryytuq" data-framer-name="Header">
            <div
              className="framer-1w2dwlq"
              data-framer-appear-id="1w2dwlq"
              data-framer-name="Heading Wrap"
            >
              <div
                className="framer-139ttm9"
                data-framer-component-type="RichTextContainer"
              >
                <h1 className="framer-text framer-styles-preset-i0f6z9" data-styles-preset="Z6NLzAUVl">
                  {heading1}
                </h1>
              </div>
              <div
                className="framer-176ikus"
                data-framer-component-type="RichTextContainer"
              >
                <h1 className="framer-text framer-styles-preset-i0f6z9" data-styles-preset="Z6NLzAUVl">
                  {heading2}
                </h1>
              </div>
              <div className="framer-t690be" data-framer-name="Highlight">
                <div
                  className="framer-1fremdt hidden-1jp9pa2 hidden-1qvnpt1"
                  data-framer-name="Line"
                />
                <div
                  className="framer-120odse"
                  data-framer-component-type="RichTextContainer"
                >
                  <h1
                    className="framer-text framer-styles-preset-i0f6z9"
                    data-styles-preset="Z6NLzAUVl"
                    style={{
                      "--framer-text-color": "var(--token-ff1927cf-6647-4041-a5b4-d14a150299ba, rgb(75, 85, 99))",
                    } as React.CSSProperties}
                  >
                    {heading3}
                  </h1>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className="framer-1h7f6qa"
              data-framer-appear-id="1h7f6qa"
              data-framer-name="Action"
            >
              <div className="ssr-variant hidden-1qvnpt1">
                <div className="framer-1hsgm4a-container">
                  <a
                    className="framer-RW3kI framer-1g71hn6 framer-v-1g71hn6 framer-v9g74s"
                    href={ctaLink}
                    tabIndex={0}
                    style={{ borderRadius: "1000px", opacity: 1 }}
                    data-framer-name="Large"
                  >
                    <div
                      className="framer-101v7wz"
                      data-framer-name="Content"
                      style={{
                        backgroundColor: "var(--token-280335e9-be31-4ef5-b9cd-cc20e0b684ad, rgb(239, 244, 255))",
                        borderRadius: "1000px",
                        transform: "none",
                        opacity: 1,
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
                            padding: "16px 76px 16px 32px",
                            boxSizing: "border-box",
                          }}
                        >
                          <p className="rolling-text-inner-f397ef0d-d828-4081-901a-8fee618da4d0">
                            {ctaText.split("").map((char, i) => (
                              <span
                                key={i}
                                style={{
                                  display: "block",
                                  fontFamily: "Poppins, 'Poppins Placeholder', sans-serif",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  letterSpacing: "0px",
                                  lineHeight: "1.325em",
                                  transform: "none",
                                }}
                              >
                                {char === " " ? "\u00A0" : char}
                              </span>
                            ))}
                          </p>
                          <style>{`
                            .rolling-text-inner-f397ef0d-d828-4081-901a-8fee618da4d0 {
                              --font-size: 18px;
                              --text: var(--token-6d2eb3af-fe77-4a09-8815-78a070874f6e, rgb(0, 64, 193));
                              --line-height-abs: 23.849999999999998px;
                              box-sizing: border-box;
                              margin: 0;
                              padding: 0;
                              vertical-align: top;
                              display: flex;
                              overflow: hidden;
                              width: max-content;
                              font-family: "Poppins", "Poppins Placeholder", sans-serif;
                              font-size: 18px;
                              text-transform: none;
                              user-select: none;
                              text-shadow: 0 var(--line-height-abs) 0 var(--text);
                            }
                            .rolling-text-inner-f397ef0d-d828-4081-901a-8fee618da4d0 span {
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
                              line-height: 1.325em;
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
                            <g
                              color="var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255))"
                            >
                              <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Pattern decorations */}
            <div className="framer-1avqogv hidden-1qvnpt1" data-framer-name="Pattern 1">
              <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                <img
                  decoding="auto"
                  width={197}
                  height={193}
                  src="https://framerusercontent.com/images/FxG4w1m6Obfb6ChCSXhqQVQO70.svg?width=197&height=193"
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
            <div className="framer-1n3zxfb hidden-1qvnpt1" data-framer-name="Pattern 2">
              <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                <img
                  decoding="auto"
                  width={197}
                  height={193}
                  src="https://framerusercontent.com/images/oYG2689X2N6hn2mMqpUNrrJUoE.svg?width=197&height=193"
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

          {/* Description */}
          <div className="framer-v6tdht" data-framer-name="Description">
            <div
              className="framer-1kxg18"
              data-framer-appear-id="1kxg18"
              data-framer-name="Top Wrap"
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Crosshair"
                data-parent-size="0"
                data-rotation="0"
                data-shadows=""
                className="framer-3bra4i"
                aria-hidden="true"
                style={{ imageRendering: "pixelated", flexShrink: 0 }}
              >
                <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href="#svg11443713790" />
                  </svg>
                </div>
              </div>
              <div className="ssr-variant hidden-1qvnpt1 hidden-1jp9pa2">
                <div
                  className="framer-s3sfaz"
                  data-framer-component-type="RichTextContainer"
                >
                  <p
                    className="framer-text framer-styles-preset-7i9k8i"
                    data-styles-preset="xqbJafdnV"
                    style={{
                      "--framer-text-color": "var(--token-35fcbc83-ee9d-4b1e-82fa-54a3134888cc, rgb(10, 10, 10))",
                    } as React.CSSProperties}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* User count */}
            <div
              className="framer-iwxkme"
              data-framer-appear-id="iwxkme"
              data-framer-name="Bottom Wrap"
            >
              <div className="framer-sgl58j" data-framer-name="Avatars">
                <div className="framer-54dsvk" data-framer-name="Avatar Group">
                  <div className="ssr-variant hidden-1qvnpt1">
                    <div className="framer-bechyt">
                      <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                        <img
                          decoding="auto"
                          width={1200}
                          height={1200}
                          sizes="36px"
                          srcSet="https://framerusercontent.com/images/8j7MtVVIDIYqwbyfPIQHrhDf2Fw.jpg?scale-down-to=512&width=1200&height=1200 512w, https://framerusercontent.com/images/8j7MtVVIDIYqwbyfPIQHrhDf2Fw.jpg?scale-down-to=1024&width=1200&height=1200 1024w, https://framerusercontent.com/images/8j7MtVVIDIYqwbyfPIQHrhDf2Fw.jpg?width=1200&height=1200 1200w"
                          src="https://framerusercontent.com/images/8j7MtVVIDIYqwbyfPIQHrhDf2Fw.jpg?width=1200&height=1200"
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
                  <div className="ssr-variant hidden-1qvnpt1">
                    <div className="framer-zu3bc6">
                      <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                        <img
                          decoding="auto"
                          width={1200}
                          height={1200}
                          sizes="36px"
                          srcSet="https://framerusercontent.com/images/z7MRh9YQt36FSbvSyGMGalLTwk.jpg?scale-down-to=512&width=1200&height=1200 512w, https://framerusercontent.com/images/z7MRh9YQt36FSbvSyGMGalLTwk.jpg?scale-down-to=1024&width=1200&height=1200 1024w, https://framerusercontent.com/images/z7MRh9YQt36FSbvSyGMGalLTwk.jpg?width=1200&height=1200 1200w"
                          src="https://framerusercontent.com/images/z7MRh9YQt36FSbvSyGMGalLTwk.jpg?width=1200&height=1200"
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
                  <div className="ssr-variant hidden-1qvnpt1">
                    <div className="framer-kdxp8x">
                      <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                        <img
                          decoding="auto"
                          width={1200}
                          height={1200}
                          sizes="36px"
                          srcSet="https://framerusercontent.com/images/DZNJOIwlYVSuOLQUYlvD9UTjnVc.jpg?scale-down-to=512&width=1200&height=1200 512w, https://framerusercontent.com/images/DZNJOIwlYVSuOLQUYlvD9UTjnVc.jpg?scale-down-to=1024&width=1200&height=1200 1024w, https://framerusercontent.com/images/DZNJOIwlYVSuOLQUYlvD9UTjnVc.jpg?width=1200&height=1200 1200w"
                          src="https://framerusercontent.com/images/DZNJOIwlYVSuOLQUYlvD9UTjnVc.jpg?width=1200&height=1200"
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
                </div>
                <div className="framer-1tzdxmu-container">
                  <p
                    style={{
                      margin: 0,
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                      textAlign: "center",
                      fontFamily: '"Poppins", "Poppins Placeholder", sans-serif',
                      fontSize: "40px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: "1.3em",
                    }}
                  >
                    {userCount}
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      inset: 0,
                      userSelect: "auto",
                      margin: 0,
                      color: "rgb(0, 0, 0)",
                      textDecoration: "none",
                      textAlign: "center",
                      fontFamily: '"Poppins", "Poppins Placeholder", sans-serif',
                      fontSize: "40px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: "1.3em",
                    }}
                  >
                    {userCount}
                  </p>
                </div>
              </div>
              <div className="ssr-variant hidden-1qvnpt1 hidden-1jp9pa2">
                <div
                  className="framer-j24pum"
                  data-framer-component-type="RichTextContainer"
                >
                  <p
                    className="framer-text framer-styles-preset-2teml0"
                    data-styles-preset="mPaHl3obC"
                    style={{
                      "--framer-text-color": "var(--token-7a7eea7e-1a34-40d2-9031-46365a7daac5, rgb(107, 114, 128))",
                    } as React.CSSProperties}
                  >
                    {userLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop card with ticker */}
        <div className="ssr-variant hidden-1qvnpt1">
          <div className="framer-1aw63wc-container" id="phone-parallax" ref={containerRef}>
            <div className="ssr-variant hidden-1jp9pa2">
              <div
                className="framer-6GvBj framer-gFtWU framer-1bv1sig framer-v-1bv1sig"
                data-framer-name="Desktop"
                style={{ borderRadius: "40px", width: "100%", opacity: 1 }}
              >
                <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                  <img
                    decoding="auto"
                    width={2592}
                    height={1088}
                    sizes="min(100vw - 64px, 1296px)"
                    srcSet="https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?scale-down-to=512&width=2592&height=1088 512w, https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?scale-down-to=1024&width=2592&height=1088 1024w, https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?scale-down-to=2048&width=2592&height=1088 2048w, https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?width=2592&height=1088 2592w"
                    src={desktopCardImage}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      objectPosition: "center bottom",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Ticker */}
                <div
                  className="framer-efxw2a-container"
                  data-framer-appear-id="efxw2a"
                  data-framer-name="Desktop Ticker"
                  data-name="Desktop Ticker"
                >
                  <section
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      placeItems: "center",
                      margin: "0px",
                      padding: "0px",
                      listStyleType: "none",
                      opacity: 1,
                      maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 100%)",
                      overflow: "hidden",
                    }}
                  >
                    <ul
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        placeItems: "center",
                        margin: "0px",
                        padding: "0px",
                        listStyleType: "none",
                        gap: "20px",
                        position: "relative",
                        flexDirection: "row",
                        willChange: "transform",
                        transform: "translateX(0px)",
                      }}
                    >
                      {tickerItems.map((_, i) => (
                        <React.Fragment key={i}>
                          <li aria-hidden="true">
                            <div
                              className="framer-oiuce9"
                              data-framer-name="Desktop - Text"
                              style={{ flexShrink: 0, opacity: 1 }}
                            >
                              <div
                                className="framer-1l6a3ha"
                                data-framer-component-type="RichTextContainer"
                                style={{
                                  "--extracted-r6o4lv": "var(--token-930d91fa-1428-4957-ac96-665b908ba52a, rgb(209, 224, 255))",
                                  "--framer-link-text-color": "rgb(0, 153, 255)",
                                  "--framer-link-text-decoration": "underline",
                                  transform: "none",
                                  opacity: 1,
                                } as React.CSSProperties}
                              >
                                <p
                                  className="framer-text"
                                  style={{
                                    "--font-selector": "RlM7UG9wcGlucy1zZW1pYm9sZA==",
                                    "--framer-font-family": '"Poppins", "Poppins Placeholder", sans-serif',
                                    "--framer-font-size": "128px",
                                    "--framer-font-weight": "600",
                                    "--framer-line-height": "1em",
                                    "--framer-text-color": "var(--extracted-r6o4lv, var(--token-930d91fa-1428-4957-ac96-665b908ba52a, rgb(209, 224, 255)))",
                                  } as React.CSSProperties}
                                >
                                  {tickerText}
                                </p>
                              </div>
                            </div>
                          </li>
                          <li aria-hidden="true">
                            <div
                              className="framer-g2b2m6"
                              data-framer-name="Dot"
                              style={{
                                backgroundColor: "var(--token-930d91fa-1428-4957-ac96-665b908ba52a, rgb(209, 224, 255))",
                                borderRadius: "1000px",
                                flexShrink: 0,
                                opacity: 1,
                              } as React.CSSProperties}
                            />
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Divider */}
                <div
                  className="framer-1y2qr5t"
                  data-framer-appear-id="1y2qr5t"
                  data-framer-name="Divider"
                  style={{
                    backgroundColor: "var(--token-930d91fa-1428-4957-ac96-665b908ba52a, rgb(209, 224, 255))",
                    mask: "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50.4084%, rgba(0, 0, 0, 0) 100%)",
                  } as React.CSSProperties}
                />

                {/* Partner text */}
                <div
                  className="framer-346lt4"
                  data-framer-appear-id="346lt4"
                  data-framer-name="Client Wrap"
                >
                  <div
                    className="framer-xs5nox"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      "--extracted-1lwpl3i": "var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255))",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      transform: "none",
                      opacity: 1,
                    } as React.CSSProperties}
                  >
                    <h5
                      className="framer-text framer-styles-preset-1sbhxof"
                      data-styles-preset="xQG3qURbw"
                      style={{
                        "--framer-text-alignment": "center",
                        "--framer-text-color": "var(--extracted-1lwpl3i, var(--token-0c35c7d3-21de-4070-8046-4a3fa0c5baf0, rgb(255, 255, 255)))",
                      } as React.CSSProperties}
                    >
                      {partnerText}
                    </h5>
                  </div>

                  {/* Logos */}
                  <div className="framer-1rxggk7" data-framer-name="Logo Wrap" style={{ opacity: 0.7 }}>
                    {["Logo-6", "Logo-3", "Logo-5", "Logo-1", "Logo-4", "Logo-2"].map((logo, i) => (
                      <div
                        key={logo}
                        data-framer-component-type="SVG"
                        data-framer-name={logo}
                        data-parent-size="0"
                        data-rotation="0"
                        data-shadows=""
                        className={`framer-${["139twwa", "l21g4m", "wu8225", "z8unzv", "1twpw1y", "1rkjyv7"][i]}`}
                        aria-hidden="true"
                        style={{ imageRendering: "pixelated", flexShrink: 0, fill: "black", color: "black", opacity: 1 }}
                      >
                        <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                          <svg
                            style={{ width: "100%", height: "100%" }}
                            viewBox={["0 0 101 20", "0 0 101 20", "0 0 99 24", "0 0 85 20", "0 0 72 18", "0 0 45 18"][i]}
                            preserveAspectRatio="none"
                            width="100%"
                            height="100%"
                          >
                            <use href={`#svg${["2071979949_3284", "2075604859_4795", "249156136_3182", "1829844052_4908", "779681207_1261", "1476244488_3001"][i]}`} />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div
          className="framer-kuaed2"
          data-framer-name="Phone Wrapper"
          data-parallaxfloating="hWUSiiXwbuUcc"
        >
          <div className="framer-1dn6000-container hidden-1qvnpt1">
            <style>{`
              [data-parallaxfloating="hWUSiiXwbuUcc"] {
                transform: translate(0px, 0px) matrix(1, 0, 0, 1, -314.961, -23.701) !important;
              }
            `}</style>
          </div>
          <div className="ssr-variant hidden-1qvnpt1 hidden-1jp9pa2">
            <div
              className="framer-13pyqo8"
              data-framer-appear-id="13pyqo8"
              data-framer-name="Phone Hero"
            >
              <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                <img
                  decoding="auto"
                  width={1599}
                  height={1489}
                  sizes="calc(min(100vw - 64px, 1296px) / 2)"
                  srcSet="https://framerusercontent.com/images/2PJCBW3k14Gd59z05NimgBmXjSA.png?scale-down-to=512&width=1599&height=1489 512w, https://framerusercontent.com/images/2PJCBW3k14Gd59z05NimgBmXjSA.png?scale-down-to=1024&width=1599&height=1489 1024w, https://framerusercontent.com/images/2PJCBW3k14Gd59z05NimgBmXjSA.png?width=1599&height=1489 1599w"
                  src={phoneImage}
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
        </div>

        {/* Pattern 3 */}
        <div className="ssr-variant hidden-1qvnpt1">
          <div className="framer-1tvv3s4" data-framer-name="Pattern 3">
            <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
              <img
                decoding="auto"
                width={197}
                height={193}
                src="https://framerusercontent.com/images/oYG2689X2N6hn2mMqpUNrrJUoE.svg?width=197&height=193"
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

      {/* Animation trigger */}
      <div className="framer-10m9s49" data-framer-name="Animation Trigger">
        <div className="framer-1agquuy" data-framer-name="Full Screen Spacer" />
        <div className="framer-nuyg5t" data-framer-name="Trigger" id="zoom-trigger" />
      </div>
    </section>
  );
}
