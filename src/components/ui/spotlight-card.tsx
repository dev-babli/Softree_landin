"use client";

import React, { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type GlowColor = "blue" | "purple" | "green" | "red" | "orange";

export interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: GlowColor;
    size?: "sm" | "md" | "lg";
    width?: string | number;
    height?: string | number;
    /** When true, ignores fixed size map — use className / width / height */
    customSize?: boolean;
    /** Viewport pointer position from a single parent listener (avoids N document listeners) */
    pointerX: number;
    pointerY: number;
}

const glowColorMap = {
    blue: { base: 220, spread: 200 },
    purple: { base: 280, spread: 300 },
    green: { base: 120, spread: 200 },
    red: { base: 0, spread: 200 },
    orange: { base: 30, spread: 200 },
} as const;

const sizeMap = {
    sm: "w-48 h-64",
    md: "w-64 h-80",
    lg: "w-80 h-96",
} as const;

export function GlowCard({
    children,
    className = "",
    glowColor = "blue",
    size = "md",
    width,
    height,
    customSize = false,
    pointerX,
    pointerY,
}: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { base, spread } = glowColorMap[glowColor];

    useEffect(() => {
        const el = cardRef.current;
        if (!el || typeof window === "undefined") return;
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        el.style.setProperty("--x", pointerX.toFixed(2));
        el.style.setProperty("--xp", (pointerX / w).toFixed(2));
        el.style.setProperty("--y", pointerY.toFixed(2));
        el.style.setProperty("--yp", (pointerY / h).toFixed(2));
    }, [pointerX, pointerY]);

    const getSizeClasses = () => {
        if (customSize) return "";
        return sizeMap[size];
    };

    const getInlineStyles = (): CSSProperties => {
        const style: Record<string, string | number> = {
            "--base": base,
            "--spread": spread,
            "--radius": "14",
            "--border": "3",
            "--backdrop": "hsl(0 0% 60% / 0.12)",
            "--backup-border": "var(--backdrop)",
            "--size": "200",
            "--outer": "1",
            "--border-size": "calc(var(--border, 2) * 1px)",
            "--spotlight-size": "calc(var(--size, 150) * 1px)",
            "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
            backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
            backgroundColor: "var(--backdrop, transparent)",
            backgroundSize:
                "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
            backgroundPosition: "50% 50%",
            backgroundAttachment: "fixed",
            border: "var(--border-size) solid var(--backup-border)",
            position: "relative",
            touchAction: "manipulation",
        };

        if (width !== undefined) {
            style.width = typeof width === "number" ? `${width}px` : width;
        }
        if (height !== undefined) {
            style.height = typeof height === "number" ? `${height}px` : height;
        }

        return style as CSSProperties;
    };

    return (
        <div
            ref={cardRef}
            data-glow
            style={getInlineStyles()}
            className={`
          capsule-spotlight-card
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4] grid grid-rows-[1fr_auto]" : "flex flex-col"}
          rounded-2xl
          relative
          shadow-[0_1rem_2rem_-1rem_black]
          p-4
          gap-4
          backdrop-blur-[5px]
          ${className}
        `}
        >
            <div data-glow aria-hidden className="pointer-events-none" />
            <div className="relative z-[2] flex min-h-0 flex-col">{children}</div>
        </div>
    );
}
