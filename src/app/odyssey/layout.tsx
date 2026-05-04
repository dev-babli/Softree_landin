import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "../globals.css";
import "./odyssey.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODYSSEY BEYOND | Commercial Orbital Departures 2027",
  description: "Experience the silence of space. Commercial orbital tourism for the discerning explorer.",
};

export default function OdysseyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${orbitron.variable} ${inter.variable}`}>
      <body className="odyssey-body antialiased">
        {children}
      </body>
    </html>
  );
}
