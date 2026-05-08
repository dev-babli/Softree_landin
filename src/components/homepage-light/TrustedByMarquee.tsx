"use client";

import React from "react";

/* ─────────── Inline SVG logos (guaranteed visible, no external deps) ─────────── */

const GoogleLogo = () => (
  <svg viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.86 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.98 5.79 13.44 12.51 13.44s12.51-5.46 12.51-13.44z" fill="#EA4335" />
    <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.98 5.79 13.44 12.51 13.44s12.51-5.46 12.51-13.44z" fill="#FBBC05" />
    <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.19 21.25-22.19 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.52 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
    <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
    <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
    <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 108 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <path d="M45.35 0h5.32v22.1h-5.32V0zM52.7 0h5.04v22.1H52.7V0z" fill="#737373" />
    <path d="M64.15 8.5c-3.25 0-5.57 2.4-5.57 5.66 0 3.33 2.32 5.74 5.57 5.74 3.25 0 5.57-2.4 5.57-5.74 0-3.25-2.32-5.65-5.57-5.65zm0 8.83c-1.38 0-2.48-1.2-2.48-3.17 0-1.9 1.1-3.1 2.48-3.1s2.48 1.2 2.48 3.1c0 1.97-1.1 3.17-2.48 3.17z" fill="#737373" />
    <path d="M77.9 8.5c-3.1 0-5.1 2.32-5.1 5.66 0 3.4 2.08 5.74 5.18 5.74 2.08 0 3.64-.9 4.5-2.24l-2.4-1.73c-.43.68-1.13 1.05-1.97 1.05-1.2 0-2.1-.75-2.33-1.97h7.13c.02-.3.04-.6.04-.9 0-3.33-2.1-5.61-5.08-5.61zm-2.18 4.57c.15-1.05.9-1.82 2.03-1.82 1.05 0 1.8.68 2.03 1.82H75.7z" fill="#737373" />
    <path d="M86.45 5.2c0 1.2-.9 2.02-2.17 2.02-1.28 0-2.18-.83-2.18-2.03 0-1.2.9-2.02 2.18-2.02 1.27 0 2.17.83 2.17 2.03zm-4.27 3.3h4.2v13.6h-4.2V8.5z" fill="#737373" />
    <path d="M95.15 8.5c-.98 0-1.73.38-2.18.83V8.5h-4.2v13.6h4.2v-7.2c0-1.5.75-2.25 1.95-2.25 1.13 0 1.8.75 1.8 2.1v7.35h4.2V13.5c0-3.08-1.8-5-4.77-5z" fill="#737373" />
    <path d="M107.4 8.5v13.6h-4.2V8.5h4.2z" fill="#737373" />
    <path d="M0 0h11v11H0V0z" fill="#F25022" />
    <path d="M12 0h11v11H12V0z" fill="#7FBA00" />
    <path d="M0 12h11v11H0V12z" fill="#00A4EF" />
    <path d="M12 12h11v11H12V12z" fill="#FFB900" />
  </svg>
);

const KpmgLogo = () => (
  <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="32" fill="#00338D" letterSpacing="-1">KPMG</text>
  </svg>
);

const BcgLogo = () => (
  <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <rect x="0" y="8" width="32" height="32" rx="4" fill="#1E2A3A" />
    <text x="42" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="26" fill="#1E2A3A" letterSpacing="-0.5">BCG</text>
  </svg>
);

const BayerLogo = () => (
  <svg viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <circle cx="24" cy="24" r="20" fill="#10384F" />
    <text x="18" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="20" fill="white" textAnchor="middle">B</text>
    <text x="56" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="28" fill="#10384F" letterSpacing="-0.5">BAYER</text>
  </svg>
);

const KfcLogo = () => (
  <svg viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <rect x="0" y="4" width="40" height="40" rx="20" fill="#E4002B" />
    <text x="20" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="18" fill="white" textAnchor="middle">KFC</text>
    <text x="50" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="28" fill="#E4002B" letterSpacing="-1">KFC</text>
  </svg>
);

const DominosLogo = () => (
  <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <rect x="0" y="6" width="36" height="36" rx="4" fill="#006491" />
    <circle cx="10" cy="18" r="4" fill="#E31837" />
    <circle cx="26" cy="30" r="4" fill="#E31837" />
    <text x="46" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="24" fill="#006491" letterSpacing="-0.5">Domino&apos;s</text>
  </svg>
);

const ApplLogo = () => (
  <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <rect x="0" y="4" width="40" height="40" rx="8" fill="#1E40AF" />
    <text x="20" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="20" fill="white" textAnchor="middle">AP</text>
    <text x="50" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="22" fill="#1E40AF">APPI</text>
  </svg>
);

const logos = [
  { Component: GoogleLogo, name: "Google" },
  { Component: MicrosoftLogo, name: "Microsoft" },
  { Component: KpmgLogo, name: "KPMG" },
  { Component: BcgLogo, name: "BCG" },
  { Component: BayerLogo, name: "Bayer" },
  { Component: KfcLogo, name: "KFC" },
  { Component: DominosLogo, name: "Domino's" },
  { Component: ApplLogo, name: "APPI" },
];

export function TrustedByMarquee() {
  const doubled = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[#f6f6f6] py-10 sm:py-14 md:py-16 overflow-hidden">
      {/* Tag row */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4">
        <div className="h-px flex-1 max-w-[120px] bg-black/10" />
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center rounded-full bg-[#eaeaea] px-3 py-1 sm:px-4 sm:py-1.5">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#111]">Trusted by</span>
          </span>
          <span className="inline-flex items-center rounded-full bg-[#1a1a1a] px-3 py-1 sm:px-4 sm:py-1.5">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white">Industry Giants</span>
          </span>
        </div>
        <div className="h-px flex-1 max-w-[120px] bg-black/10" />
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-linear-to-r from-[#f6f6f6] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-linear-to-l from-[#f6f6f6] to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-10 sm:gap-14 md:gap-16">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-7 sm:h-8 md:h-9 w-auto shrink-0 items-center justify-center opacity-60 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0"
            >
              <logo.Component />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedByMarquee;
