"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FIZENS_LOGO } from "./assets";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
];

export default function FizensNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className={`fizens-nav ${scrolled ? "fizens-nav-scrolled" : ""}`}>
        <div className="fizens-nav-inner">
          <a href="#top" className="fizens-nav-logo" aria-label="Fizens home">
            <img src={FIZENS_LOGO} alt="Fizens" className="fizens-nav-logo-img" />
          </a>

          <div className="fizens-nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="fizens-nav-link">
                {l.label}
              </a>
            ))}
          </div>

          <div className="fizens-nav-cta-wrap">
            <a href="#pricing" className="fizens-btn fizens-btn-primary fizens-nav-cta">
              Get Started
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="fizens-nav-burger"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      <div
        className={`fizens-nav-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <a href="#top" className="fizens-nav-logo" onClick={() => setOpen(false)}>
            <img src={FIZENS_LOGO} alt="Fizens" className="fizens-nav-logo-img" />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            className="fizens-nav-burger"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="fizens-nav-overlay-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}

        <a
          href="#pricing"
          className="fizens-btn fizens-btn-primary"
          style={{ marginTop: 24, alignSelf: "stretch" }}
          onClick={() => setOpen(false)}
        >
          Get Started
        </a>
      </div>
    </>
  );
}
