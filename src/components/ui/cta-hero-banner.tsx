"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface TechItem {
  name: string;
  img: string;
}

interface CtaHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  techStackTitle?: string;
  techStack?: TechItem[];
}

const DEFAULT_TECH_STACK: TechItem[] = [
  { name: "Python", img: "https://cdn.simpleicons.org/python" },
  { name: "C#", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "Node.js", img: "https://cdn.simpleicons.org/nodedotjs" },
  { name: ".NET", img: "https://cdn.simpleicons.org/dotnet" },
  { name: "React", img: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Vue.js", img: "https://cdn.simpleicons.org/vuedotjs" },
  { name: "Power Apps", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "SharePoint", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Power Automate", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
];

const CtaHeroBanner: React.FC<CtaHeroBannerProps> = ({
  logoUrl = "",
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  navLinks = [
    { label: "Home", href: "/", isActive: true },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies/ai" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButtonText = "Request Consultation",
  ctaButtonHref = "/contact",
  badgeLabel = "Microsoft",
  badgeText = "Partner",
  title = "Engineering Digital Solutions",
  titleLine2 = "That Scale Your Business",
  description = "Softree partners with organizations to design, build, and optimize modern digital products — from strategy and UX to cloud engineering and long-term support.",
  primaryButtonText = "Partner With Us",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Book a Free Consultation",
  secondaryButtonHref = "/contact",
  techStackTitle = "Technologies we build with",
  techStack = DEFAULT_TECH_STACK,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img
        src={backgroundImageUrl}
        alt=""
        className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

      <header className="z-10 xl:top-4 relative">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] bg-cover rounded"
              style={{ backgroundImage: `url(${logoUrl})` }}
            />

            <nav className="hidden md:flex items-center gap-2">
              <div className="liquid-glass-pill flex items-center gap-1 px-1 py-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${
                      link.isActive ? "text-white/90" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={ctaButtonHref}
                  className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
                >
                  {ctaButtonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Link>
              </div>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="liquid-glass-pill md:hidden inline-flex h-10 w-10 items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white/90"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="liquid-glass mt-4 space-y-2 rounded-xl px-4 py-4 md:hidden">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-white/90 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={ctaButtonHref}
                className="block mt-2 pt-2 border-t border-white/10 text-center text-sm font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaButtonText}
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="z-10 relative">
        <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-28 px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="liquid-glass-pill mb-6 inline-flex items-center gap-3 px-2.5 py-2 animate-fade-slide-in-1">
              <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2 font-sans">
                {badgeLabel}
              </span>
              <span className="text-sm font-medium text-white/90 font-sans">
                {badgeText}
              </span>
            </div>

            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
              {title}
              <br className="hidden sm:block" />
              {titleLine2}
            </h1>

            <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white/80 max-w-2xl mt-6 mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
              <Link
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 font-sans transition-colors"
              >
                {primaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors"
              >
                {secondaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Tech Stack instead of Partners */}
          <div className="mx-auto mt-20 max-w-5xl">
            <p className="animate-fade-slide-in-1 text-sm text-white/70 text-center">
              {techStackTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 animate-fade-slide-in-2 text-white/70 mt-6 items-center justify-items-center gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors min-w-[80px]"
                >
                  <img
                    src={tech.img}
                    alt={tech.name}
                    className="w-10 h-10 object-contain opacity-90"
                  />
                  <span className="text-xs text-white/80 text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaHeroBanner;
