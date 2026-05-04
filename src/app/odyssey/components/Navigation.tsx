"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Destinations", href: "#destinations" },
  { label: "The Vessel", href: "#vessel" },
  { label: "Training", href: "#training" },
  { label: "Mission Control", href: "#mission" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <span className="odyssey-heading text-[11px] tracking-[0.4em] text-[#F5F5F5]/80 group-hover:text-[#F5F5F5] transition-colors duration-500">
              ODYSSEY
            </span>
            <span className="odyssey-heading text-[11px] tracking-[0.4em] text-[#F5F5F5]/40 ml-2">
              BEYOND
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] tracking-[0.3em] uppercase text-[#B0BEC5]/60 hover:text-[#F5F5F5] transition-colors duration-700"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[10px] tracking-[0.3em] uppercase text-[#B0BEC5]/60 hover:text-[#F5F5F5] transition-colors duration-500"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="odyssey-heading text-2xl tracking-[0.3em] text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
