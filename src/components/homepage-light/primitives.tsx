"use client"

import type { CSSProperties, ReactNode } from "react"
import { color, radius, shadow, BLOCK_GRADIENT } from "./tokens"

/* ─────────────────────────────────────────────────────────────────────
 * Eyebrow — Mastercard signature: tiny orange dot + uppercase label
 * ──────────────────────────────────────────────────────────────────── */
export function Eyebrow({
  children,
  tone = "signal",
  className = "",
}: {
  children: ReactNode
  tone?: "signal" | "ink"
  className?: string
}) {
  const dotColor = tone === "signal" ? color.signalLight : color.ink
  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      style={{
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.56px",
        textTransform: "uppercase",
        color: color.ink,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotColor,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * InkPill — Mastercard primary CTA: warm-black pill (20px radius)
 * ──────────────────────────────────────────────────────────────────── */
export function InkPill({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: "primary" | "outline" | "cream"
  size?: "sm" | "md" | "lg"
}) {
  const padX = size === "lg" ? 32 : size === "sm" ? 18 : 24
  const padY = size === "lg" ? 14 : size === "sm" ? 6 : 10

  const styles: CSSProperties =
    variant === "primary"
      ? {
        background: color.ink,
        color: color.canvas,
        border: `1.5px solid ${color.ink}`,
      }
      : variant === "outline"
        ? {
          background: color.white,
          color: color.ink,
          border: `1.5px solid ${color.ink}`,
        }
        : {
          background: color.cream,
          color: color.ink,
          border: `1.5px solid ${color.cream}`,
        }

  const base = {
    ...styles,
    borderRadius: radius.button,
    padding: `${padY}px ${padX}px`,
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "-0.32px",
    lineHeight: 1.2,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    transition: "transform 220ms ease, box-shadow 220ms ease",
    textDecoration: "none",
    cursor: "pointer",
  } satisfies CSSProperties

  const cls = `group hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(20,20,19,0.18)] ${className}`

  if (href) {
    return (
      <a href={href} style={base} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} style={base} className={cls} type="button">
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * Arrow — used inside satellite CTAs and inline links
 * ──────────────────────────────────────────────────────────────────── */
export function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * BlockGradientStripe — Mistral identity: yellow→amber→orange blocks
 * Can be rendered as distinct blocks (no gaps) or a smooth gradient.
 * ──────────────────────────────────────────────────────────────────── */
export function BlockGradientStripe({
  variant = "blocks",
  height = 16,
  className = "",
  style,
}: {
  variant?: "blocks" | "smooth"
  height?: number
  className?: string
  style?: CSSProperties
}) {
  if (variant === "smooth") {
    return (
      <div
        className={className}
        style={{
          height,
          background: BLOCK_GRADIENT,
          ...style,
        }}
      />
    )
  }
  const blocks = [
    color.yellow,
    color.gold,
    color.sunshine,
    "#ff8105",
    color.flame,
    color.mistral,
  ]
  return (
    <div
      className={`flex ${className}`}
      style={{ height, ...style }}
      aria-hidden
    >
      {blocks.map((c) => (
        <div key={c} style={{ flex: 1, background: c }} />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * GoldenCard — Mistral golden-hour elevation card on cream
 * ──────────────────────────────────────────────────────────────────── */
export function GoldenCard({
  children,
  className = "",
  style,
  tone = "ivory",
  ...rest
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  tone?: "ivory" | "cream" | "white" | "lifted"
} & React.HTMLAttributes<HTMLDivElement>) {
  const bg =
    tone === "cream"
      ? color.cream
      : tone === "white"
        ? color.white
        : tone === "lifted"
          ? color.lifted
          : color.ivory

  return (
    <div
      className={className}
      style={{
        background: bg,
        boxShadow: shadow.golden,
        borderRadius: 4,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * CirclePortrait — Mastercard circular portrait with satellite CTA
 * The satellite is a perfect-circle white button docked bottom-right,
 * protruding ~40% outside the portrait.
 * ──────────────────────────────────────────────────────────────────── */
export function CirclePortrait({
  src,
  alt,
  eyebrow,
  title,
  href,
  diameter = 300,
  bg = color.cream,
  className = "",
}: {
  src?: string
  alt: string
  eyebrow: string
  title: string
  href?: string
  diameter?: number
  bg?: string
  className?: string
}) {
  const satSize = Math.round(diameter * 0.19)
  return (
    <a
      href={href ?? "#"}
      className={`group relative block ${className}`}
      style={{ width: diameter }}
    >
      <div
        className="relative"
        style={{
          width: diameter,
          height: diameter,
          borderRadius: "50%",
          overflow: "hidden",
          background: bg,
          boxShadow: shadow.halo,
          transition: "transform 420ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            aria-hidden
            className="h-full w-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color.gold} 0%, ${color.sunshine} 45%, ${color.mistral} 100%)`,
            }}
          />
        )}
      </div>

      {/* satellite CTA */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: -satSize * 0.2,
          bottom: satSize * 0.35,
          width: satSize,
          height: satSize,
          borderRadius: "50%",
          background: color.white,
          color: color.ink,
          display: "grid",
          placeItems: "center",
          boxShadow: shadow.pill,
          transition: "transform 320ms ease, background 320ms ease",
        }}
        className="group-hover:scale-[1.08]"
      >
        <ArrowRight size={Math.round(satSize * 0.4)} />
      </span>

      <div className="mt-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3
          className="mt-3"
          style={{
            fontFamily: "inherit",
            fontSize: 24,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.48px",
            color: color.ink,
            maxWidth: diameter + 40,
          }}
        >
          {title}
        </h3>
      </div>
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * GrainOverlay — lightweight SVG film-grain + optional noise layer
 * Pure CSS/SVG, no WebGL. Drop inside any positioned container.
 *
 *   <div style={{ position: 'relative' }}>
 *     <GrainOverlay opacity={0.08} />
 *   </div>
 *
 * Uses a fractal-noise SVG as a data-URI background.
 * ──────────────────────────────────────────────────────────────────── */
export function GrainOverlay({
  opacity = 0.1,
  blendMode = "overlay",
  scale = 1,
  className = "",
  style,
  animated = false,
}: {
  opacity?: number
  blendMode?: CSSProperties["mixBlendMode"]
  scale?: number
  className?: string
  style?: CSSProperties
  animated?: boolean
}) {
  // SVG turbulence noise — high-quality grain without WebGL
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${0.9 / scale}' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${animated ? "animate-[grainShift_6s_steps(8)_infinite]" : ""} ${className}`}
      style={{
        backgroundImage: url,
        backgroundSize: "200px 200px",
        mixBlendMode: blendMode,
        opacity,
        ...style,
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * SoftBlurOrb — a frosted amber orb used as ambient decor
 * ──────────────────────────────────────────────────────────────────── */
export function SoftBlurOrb({
  size = 420,
  color: orbColor = color.sunshine,
  className = "",
  style,
  blur = 80,
  opacity = 0.5,
}: {
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
  blur?: number
  opacity?: number
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${orbColor} 0%, transparent 65%)`,
        filter: `blur(${blur}px)`,
        opacity,
        ...style,
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────
 * GhostWatermark — cream-on-cream heading layered behind content
 * ──────────────────────────────────────────────────────────────────── */
export function GhostWatermark({
  children,
  size = 128,
  className = "",
  style,
}: {
  children: ReactNode
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{
        fontFamily: "inherit",
        fontSize: size,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "-2%",
        color: color.ghostCream,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
