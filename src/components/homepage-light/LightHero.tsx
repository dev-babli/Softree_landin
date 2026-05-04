"use client"

import { color, shadow } from "./tokens"
import { BlockGradientStripe, Eyebrow, InkPill, ArrowRight } from "./primitives"

export default function LightHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${color.ivory} 0%, ${color.canvas} 55%, ${color.canvas} 100%)`,
      }}
    >
      {/* ambient warm wash, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background: `radial-gradient(circle, ${color.gold} 0%, ${color.sunshine}33 45%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-[320px] w-[320px] rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle, ${color.cream} 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-28 pt-16 md:px-10 md:pb-36 md:pt-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-12">
          {/* Left — headline */}
          <div>
            <Eyebrow className="mb-6">Softree · Technology partner</Eyebrow>

            <h1
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(44px, 8.2vw, 96px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.028em",
                color: color.ink,
                textWrap: "balance",
              }}
            >
              We build frontier{" "}
              <span
                style={{
                  backgroundImage: `linear-gradient(92deg, ${color.mistral} 0%, ${color.flame} 35%, ${color.sunshine} 70%, ${color.yellow} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                software
              </span>
              <br />
              in golden hour.
            </h1>

            <p
              className="mt-8 max-w-[560px]"
              style={{
                fontFamily: "inherit",
                fontSize: 18,
                fontWeight: 450,
                lineHeight: 1.5,
                color: color.charcoal,
              }}
            >
              A calm, senior engineering studio that ships durable products for
              ambitious teams. Strategy, design, engineering — one partner, from
              first whiteboard to production scale.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <InkPill href="#contact" size="lg">
                Start a project <ArrowRight />
              </InkPill>
              <InkPill href="#work" size="lg" variant="cream">
                See our work
              </InkPill>
            </div>

            {/* stats row */}
            <div className="mt-14 grid max-w-[560px] grid-cols-3 gap-6">
              {[
                ["120+", "Products shipped"],
                ["14", "Industries"],
                ["9 yrs", "In the trenches"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.72px",
                      color: color.ink,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    className="mt-2"
                    style={{ fontSize: 13, color: color.slate, fontWeight: 450 }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — golden block composition */}
          <div className="relative">
            {/* large warm block */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: 40,
                background: `linear-gradient(152deg, ${color.yellow} 0%, ${color.sunshine} 42%, ${color.flame} 78%, ${color.mistral} 100%)`,
                boxShadow: shadow.halo,
              }}
            >
              {/* subtle grain */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-25 mix-blend-overlay"
                style={{
                  background:
                    "repeating-linear-gradient(115deg, rgba(255,255,255,0.1) 0 1px, transparent 1px 3px)",
                }}
              />
              {/* orbital circle */}
              <div
                aria-hidden
                className="absolute -right-20 -bottom-20 h-[360px] w-[360px] rounded-full"
                style={{
                  border: `1px solid ${color.white}55`,
                  boxShadow: `inset 0 0 80px ${color.white}22`,
                }}
              />
              {/* floating mark */}
              <div
                className="absolute left-8 top-8 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  color: color.ink,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.48px",
                  textTransform: "uppercase",
                }}
              >
                • New · 2026
              </div>
              {/* big inline numeric */}
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <div
                    style={{
                      fontFamily: "inherit",
                      fontSize: "clamp(72px, 11vw, 140px)",
                      fontWeight: 500,
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                      color: color.ink,
                    }}
                  >
                    S/T
                  </div>
                  <div
                    className="mt-3 max-w-[260px]"
                    style={{ color: color.ink, fontSize: 14, fontWeight: 450 }}
                  >
                    A studio the shape of a sunrise — warm, deliberate, and on time.
                  </div>
                </div>
              </div>
            </div>

            {/* floating card — Mistral golden shadow */}
            <div
              className="absolute -bottom-10 -left-6 hidden w-[260px] p-5 md:block"
              style={{
                background: color.white,
                borderRadius: 8,
                boxShadow: shadow.golden,
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{ fontSize: 12, fontWeight: 700, color: color.slate, letterSpacing: "0.48px", textTransform: "uppercase" }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: color.signalLight,
                  }}
                />
                Live deploys · 24/7
              </div>
              <div className="mt-3" style={{ fontSize: 17, color: color.ink, fontWeight: 500, letterSpacing: "-0.3px" }}>
                Zero-downtime releases across <span style={{ color: color.mistral }}>14</span> regions.
              </div>
            </div>
          </div>
        </div>

        {/* Mistral block identity strip */}
        <div className="mt-20 md:mt-28">
          <div className="mb-3 flex items-center justify-between" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.48px", textTransform: "uppercase", color: color.slate }}>
            <span>· The Softree spectrum</span>
            <span>Warm → Signal</span>
          </div>
          <BlockGradientStripe height={14} style={{ borderRadius: 999 }} />
        </div>

        {/* trusted by strip */}
        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-80">
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.48px", textTransform: "uppercase", color: color.slate }}>
            · Trusted by teams at
          </span>
          {["Atlas", "Meridian", "Northwind", "Solace", "Orbit Labs", "Paragon"].map((n) => (
            <span
              key={n}
              style={{
                fontFamily: "inherit",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-0.5px",
                color: color.ink,
                opacity: 0.78,
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
