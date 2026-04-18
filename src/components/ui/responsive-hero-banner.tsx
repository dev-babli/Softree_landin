"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Partner {
  logoUrl: string;
  href: string;
  name?: string;
}

export interface ResponsiveHeroBannerProps {
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
  partnersTitle?: string;
  partners?: Partner[];
  /** Hide the header nav (use when parent provides its own nav) */
  hideHeader?: boolean;
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  logoUrl = "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png",
  backgroundImageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=3840&q=80",
  navLinks = [
    { label: "Home", href: "/", isActive: true },
    { label: "About", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "AI Solutions", href: "/ai" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButtonText = "Partner With Us",
  ctaButtonHref = "/contact",
  badgeLabel = "Microsoft Partner",
  badgeText = "Power Platform • Data • AI • Modern Apps",
  title = "Your Trusted",
  titleLine2 = "Microsoft Technology Delivery Partner",
  description = "Engineering support across Power Platform, Data, AI & Modern Applications. White-label friendly, NDA-driven, since 2013.",
  primaryButtonText = "Partner With Us",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Schedule a Strategy Call",
  secondaryButtonHref = "/contact",
  partnersTitle = "Trusted by leading enterprises and consulting partners worldwide",
  partners = [
    {
      logoUrl: "https://cdn.simpleicons.org/accenture",
      href: "#",
      name: "Accenture",
    },
    {
      logoUrl: "https://cdn.simpleicons.org/infosys",
      href: "#",
      name: "Infosys",
    },
    {
      logoUrl: "https://cdn.simpleicons.org/wipro",
      href: "#",
      name: "Wipro",
    },
    {
      logoUrl: "https://cdn.simpleicons.org/hcl",
      href: "#",
      name: "HCL",
    },
    {
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      href: "#",
      name: "Microsoft",
    },
  ],
  hideHeader = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinkComponent = ({ link }: { link: (typeof navLinks)[0] }) => {
    const isInternal = link.href.startsWith("/");
    const className = `px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${
      link.isActive ? "text-white/90" : "text-white/80"
    }`;
    if (isInternal) {
      return (
        <Link href={link.href} className={className}>
          {link.label}
        </Link>
      );
    }
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  };

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImageUrl}
        alt=""
        className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

      {!hideHeader && (
        <header className="z-10 xl:top-4 relative">
          <div className="mx-6">
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] bg-cover rounded bg-no-repeat"
                style={{ backgroundImage: `url(${logoUrl})` }}
              />

              <nav className="hidden md:flex items-center gap-2">
                <div className="liquid-glass-pill flex items-center gap-1 px-1 py-1">
                  {navLinks.map((link, index) => (
                    <NavLinkComponent key={index} link={link} />
                  ))}
                  <Link
                    href={ctaButtonHref}
                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
                  >
                    {ctaButtonText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </nav>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="liquid-glass-pill md:hidden inline-flex h-10 w-10 items-center justify-center"
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-5 w-5 text-white/90" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-slate-900 border-slate-700 text-white"
                >
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium ${
                          link.isActive ? "text-white" : "text-white/80"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href={ctaButtonHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-900"
                    >
                      {ctaButtonText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      )}

      <div className="z-10 relative">
        <div
          className={`sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto px-6 pb-16 ${
            hideHeader ? "pt-24" : "pt-28"
          }`}
        >
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
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors"
              >
                {secondaryButtonText}
                <Play className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="animate-fade-slide-in-1 text-sm text-white/70 text-center">
              {partnersTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-slide-in-2 text-white/70 mt-6 items-center justify-items-center gap-4">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.href}
                  className="inline-flex items-center justify-center bg-center w-[120px] h-[36px] bg-contain bg-no-repeat rounded-full opacity-80 hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `url(${partner.logoUrl})` }}
                  title={partner.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
