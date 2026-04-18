"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

interface CTASectionProps {
  variant?: "default" | "capsuleLight";
  badgeText?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTASection({
  variant = "default",
  badgeText = "Microsoft Partner",
  title = "Engineering Digital Solutions",
  titleLine2 = "That Scale Your Business",
  description = "Softree partners with organizations to design, build, and optimize modern digital products — from strategy and UX to cloud engineering and long-term support.",
  buttonText = "Request Consultation",
  buttonHref = "/contact",
}: CTASectionProps) {
  const light = variant === "capsuleLight";

  return (
    <section
      className={cn(
        "w-full px-4 py-8 md:px-6 md:py-10",
        light ? "bg-[var(--c-page)]" : "bg-[#0a0a0a]"
      )}
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <div
          className={cn(
            "relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-10 backdrop-blur-xl md:min-h-[470px] md:items-start md:px-8 md:py-14",
            light
              ? "border border-[color:var(--c-border)] bg-[color-mix(in_oklab,var(--c-section-elevated)_88%,transparent)] shadow-[0_26px_70px_rgba(15,23,42,0.08)]"
              : "border border-white/15 bg-[#181717]/35 shadow-[0_26px_70px_rgba(0,0,0,0.45)]"
          )}
        >
          <div className="pointer-events-none absolute inset-y-0 left-[16%] right-[-8%] z-0 md:left-[24%] md:right-[-12%]">
            {light ? (
              <div
                className="h-full w-full bg-[radial-gradient(900px_420px_at_20%_20%,rgba(34,211,238,0.2),transparent_62%),radial-gradient(980px_460px_at_88%_14%,rgba(139,92,246,0.22),transparent_60%),linear-gradient(145deg,rgba(255,255,255,0.6),rgba(241,245,249,0.88))]"
                aria-hidden
              />
            ) : (
              <Spline
                scene="https://prod.spline.design/mLWJ79VpoGYrOjk4/scene.splinecode"
                className={cn(
                  "h-full w-full scale-[1.28] transform-gpu",
                  light && "opacity-90"
                )}
              />
            )}
          </div>

          <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center md:ml-0 md:max-w-[52%] md:items-start md:text-left">
            <div
              className={cn(
                "mb-5 inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm",
                light
                  ? "border border-[color:var(--c-border)] bg-white/70 text-[var(--c-fg)]"
                  : "border border-white/25 bg-white/10 text-[#f4efe7]"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-70",
                    light ? "bg-[var(--c-fg)]" : "bg-[#f4efe7]"
                  )}
                ></span>
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    light ? "bg-[var(--c-fg)]" : "bg-[#f4efe7]"
                  )}
                ></span>
              </span>
              {badgeText}
            </div>

            <h2
              className={cn(
                "mb-5 font-instrument-serif text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
                light ? "text-[var(--c-fg)]" : "text-[#f4efe7]"
              )}
            >
              {title}
              <br />
              <span className={light ? "text-[var(--c-fg-soft)]" : "text-[#eae5dd]/85"}>
                {titleLine2}
              </span>
            </h2>

            <p
              className={cn(
                "mb-8 max-w-2xl text-sm leading-relaxed sm:text-base md:mb-10 md:text-lg",
                light ? "text-[var(--c-fg-soft)]" : "text-[#eae5dd]/85"
              )}
            >
              {description}
            </p>

            <Link
              href={buttonHref}
              className={cn(
                "group relative inline-flex h-11 items-center justify-center gap-3 overflow-hidden rounded-lg px-7 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:h-12 sm:px-10",
                light
                  ? "border border-[color:var(--c-border)] bg-[var(--c-fg)] text-[var(--c-page)] hover:bg-[var(--c-fg-soft)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.12)]"
                  : "border border-[#f4efe7]/35 bg-[#f4efe7] text-[#181717] hover:bg-[#fff8ef] hover:shadow-[0_14px_32px_rgba(0,0,0,0.35)]"
              )}
            >
              <span className="relative z-10">{buttonText}</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
