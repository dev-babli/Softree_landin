"use client";

import React from "react";

type ThemeType = "ocean" | "emerald" | "sunset" | "optimus";

const themes: Record<ThemeType, React.CSSProperties> = {
  ocean: {
    "--color-foreground": "#e0f2fe",
    "--color-background": "#020617",
    "--color-primary": "#0ea5e9",
    "--color-accent": "#22d3ee",
    "--color-border": "rgba(14, 165, 233, 0.2)",
    "--color-muted-foreground": "rgba(186, 230, 253, 0.7)",
  } as React.CSSProperties,
  emerald: {
    "--color-foreground": "#ecfdf5",
    "--color-background": "#050510",
    "--color-primary": "#10b981",
    "--color-accent": "#34d399",
    "--color-border": "rgba(16, 185, 129, 0.2)",
    "--color-muted-foreground": "rgba(167, 243, 208, 0.7)",
  } as React.CSSProperties,
  sunset: {
    "--color-foreground": "#fff7ed",
    "--color-background": "#0c0a09",
    "--color-primary": "#8b5cf6",
    "--color-accent": "#f97316",
    "--color-border": "rgba(139, 92, 246, 0.2)",
    "--color-muted-foreground": "rgba(254, 215, 170, 0.7)",
  } as React.CSSProperties,
  optimus: {} as React.CSSProperties,
};

export function ThemedOptimusLayout({ theme, children }: { theme: ThemeType; children: React.ReactNode }) {
  return (
    <div style={themes[theme]} className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {children}
    </div>
  );
}
