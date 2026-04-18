"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/optimus/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Optimus Navigation - Uniform Logo Edition
 * Implements a pure transparent glassmorphic effect with 
 * a perfectly aligned uniform-size logo crossfade.
 */

const LOGO_WHITE = "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";
const LOGO_COLORED = "/logos/softree-colored.png";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Developers", href: "#developers" },
  { name: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-700 w-full",
        isScrolled ? "top-6 px-6" : "top-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "backdrop-blur-[40px] saturate-[180%]",
          isScrolled || isMobileMenuOpen
            ? "bg-black/60 rounded-[28px] max-w-[1000px] border border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)]"
            : "bg-transparent max-w-full border-b border-white/5 shadow-none"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-700 px-10",
            isScrolled ? "h-14" : "h-24"
          )}
        >
          {/* Uniform Logo Section */}
          <a href="/" className="group relative flex items-center shrink-0">
            {/* 
              Parent container defines the uniform box for both logos. 
              Using fixed-aspect container ensures zero jump during transition.
            */}
            <div className={cn(
              "relative transition-all duration-500",
              isScrolled ? "h-6 w-[130px]" : "h-8 w-[170px]"
            )}>
              {/* White Logo (Base) */}
              <Image
                src={LOGO_WHITE}
                alt="Softree"
                fill
                priority
                className="object-contain transition-all duration-300 group-hover:opacity-0 group-hover:scale-[1.02]"
              />
              {/* Colored Logo (Hover) */}
              <Image
                src={LOGO_COLORED}
                alt="Softree Colored"
                fill
                priority
                className="object-contain opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.02]"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold tracking-wide uppercase text-white/50 hover:text-white transition-all duration-500 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-white transition-all duration-500 group-hover:w-full opacity-50" />
              </a>
            ))}
          </div>

          {/* Action Section */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all duration-500">
              Log in
            </a>
            <Button
              size="sm"
              className={cn(
                "bg-white hover:bg-neutral-200 text-black rounded-full font-[800] uppercase tracking-tighter transition-all duration-700 overflow-hidden",
                isScrolled ? "px-6 h-9 text-[10px]" : "px-8 h-11 text-xs"
              )}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 transition-all duration-700 flex flex-col items-center justify-center gap-12",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-5xl font-black text-white hover:text-white/40 transition-all tracking-tighter"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
