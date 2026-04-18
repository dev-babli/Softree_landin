"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Visual language matched to the surface / section (capsule homepage). */
export type MotionGraphicVariant =
  | "ai"
  | "m365"
  | "data"
  | "services"
  | "activities"
  | "connect"
  | "product"
  | "automation"
  | "security"
  | "engineering"
  | "experience"
  | "growth"
  | "delivery";

/** Five staggered “series” bars — widths + delays avoid lockstep (BI / throughput read). */
const DATA_BARS = [
  { w: 0.88, delay: 0 },
  { w: 0.52, delay: 0.27 },
  { w: 0.72, delay: 0.53 },
  { w: 0.42, delay: 0.11 },
  { w: 0.95, delay: 0.71 },
] as const;

/**
 * Contextual ambient motion for empty media wells — palette + rhythm + overlays
 * per variant. Pure CSS; respects `prefers-reduced-motion`.
 */
export function MotionGraphicPlaceholder({
  className,
  variant = "services",
}: {
  className?: string;
  variant?: MotionGraphicVariant;
}) {
  return (
    <div
      className={cn(
        "motion-graphic-placeholder",
        `motion-graphic-placeholder--${variant}`,
        "pointer-events-none overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div className="motion-graphic-placeholder__gradient" />
      <div className="motion-graphic-placeholder__mesh" />

      {variant === "ai" ? (
        <div className="motion-graphic-placeholder__scan">
          <div className="motion-graphic-placeholder__scan-beam" />
        </div>
      ) : null}

      {variant === "data" ? (
        <div className="motion-graphic-placeholder__data-bars">
          {DATA_BARS.map(({ w, delay }, i) => (
            <span
              key={i}
              className="motion-graphic-placeholder__data-bar"
              style={
                {
                  "--mg-bar-w": `${Math.round(w * 100)}%`,
                  "--mg-delay": `${delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}

      {variant === "connect" ? (
        <div className="motion-graphic-placeholder__meridian" />
      ) : null}

      {variant === "m365" ? (
        <div className="motion-graphic-placeholder__panes" />
      ) : null}

      {variant === "product" ? (
        <div className="motion-graphic-placeholder__app-glow" />
      ) : null}

      {variant === "security" ? (
        <div className="motion-graphic-placeholder__shield-ring" />
      ) : null}

      {variant === "automation" ? (
        <div className="motion-graphic-placeholder__workflow-lines" />
      ) : null}

      {variant === "growth" ? (
        <div className="motion-graphic-placeholder__trend-line" />
      ) : null}

      {variant === "delivery" ? (
        <div className="motion-graphic-placeholder__meridian motion-graphic-placeholder__meridian--strong" />
      ) : null}

      <div className="motion-graphic-placeholder__orb motion-graphic-placeholder__orb--a" />
      <div className="motion-graphic-placeholder__orb motion-graphic-placeholder__orb--b" />
      <div className="motion-graphic-placeholder__shine" />
    </div>
  );
}
