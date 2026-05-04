"use client";

import { ArrowRight, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const cols = [
  {
    title: "Main Pages",
    links: ["Home", "About", "Features", "Pricing", "Blog"],
  },
  {
    title: "Other",
    links: ["Help Center", "Contact", "Changelog", "Status", "Security"],
  },
  {
    title: "Legal & Utilities",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  },
];

const socials = [
  { icon: <Twitter size={16} />, label: "X / Twitter", href: "#" },
  { icon: <Instagram size={16} />, label: "Instagram", href: "#" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", href: "#" },
  { icon: <Github size={16} />, label: "GitHub", href: "#" },
];

export default function FizensFooter() {
  return (
    <footer className="fizens-footer">
      <div className="fizens-container">
        <div className="fizens-footer-top">
          <div className="fizens-footer-brand">
            <a href="#top" className="fizens-nav-logo">
              <span className="fizens-nav-logo-mark">F</span>
              <span>fizens</span>
            </a>
            <p>
              Simplify your financial life. Fizens makes managing, tracking, and
              growing your money effortless.
            </p>
            <form
              className="fizens-footer-newsletter"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Subscribe to our newsletter"
            >
              <input
                type="email"
                placeholder="Subscribe for our newsletter"
                aria-label="Email address"
              />
              <button type="submit">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>

          <div className="fizens-footer-cols">
            {cols.map((c) => (
              <div key={c.title} className="fizens-footer-col">
                <h5>{c.title}</h5>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="fizens-footer-bottom">
          <span>© {new Date().getFullYear()} Fizens. All rights reserved.</span>
          <div className="fizens-footer-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="fizens-footer-social"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
