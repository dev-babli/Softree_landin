"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Helper component for the SVG grid pattern.
 */
const GridPattern = ({
  offsetX,
  offsetY,
  size,
  id,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
  size: number;
  id: string;
}) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-white/20"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export interface InfiniteGridCTAProps {
  /** Main heading */
  title: string;
  /** Subheading or description */
  description?: string;
  /** Primary CTA */
  primaryButtonText?: string;
  primaryButtonHref?: string;
  /** Secondary CTA */
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  /** Custom content (e.g. form) - renders instead of default buttons when provided */
  children?: React.ReactNode;
  /** Show grid density control panel */
  showDensityControl?: boolean;
  /** Additional section class */
  className?: string;
}

/**
 * Infinite Grid CTA Section
 * Displays a scrolling background grid with mouse-reveal effect. Use as CTA on homepage or AI page.
 */
const InfiniteGridCTA: React.FC<InfiniteGridCTAProps> = ({
  title,
  description,
  primaryButtonText = "Get Started",
  primaryButtonHref = "/contact",
  secondaryButtonText,
  secondaryButtonHref,
  children,
  showDensityControl = false,
  className,
}) => {
  const [gridSize, setGridSize] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceMotionRef.current = mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const speedX = 0.5;
  const speedY = 0.5;

  useAnimationFrame(() => {
    if (reduceMotionRef.current) return;
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % gridSize);
    gridOffsetY.set((currentY + speedY) % gridSize);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950",
        className
      )}
    >
      {/* Layer 1: Subtle background grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          size={gridSize}
          id="grid-pattern-bg"
        />
      </div>

      {/* Layer 2: Highlighted grid (mouse mask) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          size={gridSize}
          id="grid-pattern-highlight"
        />
      </motion.div>

      {/* Decorative Blur Spheres */}
      <div className="pointer-events-none absolute inset-0 z-0 max-md:opacity-70 motion-reduce:opacity-40">
        <div className="absolute right-[-20%] top-[-20%] h-[40%] w-[40%] rounded-full bg-cyan-500/20 blur-[120px] motion-reduce:blur-[80px]" />
        <div className="absolute right-[10%] top-[-10%] h-[20%] w-[20%] rounded-full bg-blue-500/20 blur-[100px] motion-reduce:blur-[60px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/20 blur-[120px] motion-reduce:blur-[80px]" />
      </div>

      {/* Grid Density Control (optional) */}
      {showDensityControl && (
        <div className="absolute bottom-10 right-10 z-30 pointer-events-auto">
          <div className="liquid-glass bg-slate-900/80 p-4 rounded-xl shadow-2xl space-y-3 min-w-[200px]">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              Grid Density
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              <span>Dense</span>
              <span>Sparse ({gridSize}px)</span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-8 w-full">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white drop-shadow-sm">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {children ? (
          <div className="w-full max-w-xl pointer-events-auto">{children}</div>
        ) : (
          <div className="pointer-events-auto flex flex-wrap justify-center gap-4">
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-cyan-400/50 bg-cyan-500 px-8 py-3 font-semibold text-slate-900 shadow-md transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:bg-cyan-400 hover:shadow-[0_20px_40px_-12px_rgba(56,189,248,0.35)] active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              {primaryButtonText}
            </Link>
            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:bg-white/20 active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default InfiniteGridCTA;
