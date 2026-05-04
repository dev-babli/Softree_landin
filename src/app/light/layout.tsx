import type { Metadata } from "next"
import { Sofia_Sans } from "next/font/google"

const sofia = Sofia_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sofia",
})

export const metadata: Metadata = {
  title: "Softree — Light",
  description:
    "A warm, editorial, light-theme homepage for Softree — Mistral cream meets Mastercard pill.",
}

export default function LightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${sofia.variable} relative min-h-screen`}
      style={{
        background: "#F3F0EE",
        color: "#141413",
        fontFamily: "var(--font-sofia), 'MarkForMC', Arial, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  )
}
