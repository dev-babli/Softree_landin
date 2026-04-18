"use client";

import { cn } from "@/lib/utils";

interface GradientWaveProps {
  colors?: string[];
  isPlaying?: boolean;
  className?: string;
}

export function GradientWave({
  colors = ["#38bdf8", "#22d3ee", "#3b82f6", "#6366f1", "#38bdf8"],
  className = "",
}: GradientWaveProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 w-full h-full overflow-hidden",
        "bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${colors.join(", ")})`,
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }}
    />
  );
}
