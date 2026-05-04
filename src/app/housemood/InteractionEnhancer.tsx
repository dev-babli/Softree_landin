"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function InteractionEnhancer() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Button hover effects
      const buttons = document.querySelectorAll(
        '[data-framer-name*="button" i], [class*="framer-"][style*="cursor: pointer"], a[class*="framer-"]'
      );
      buttons.forEach((btn) => {
        const el = btn as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.03, duration: 0.25, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" });
        });
      });

      // Image hover effects
      const images = document.querySelectorAll(
        'img[class*="framer-"], [data-framer-name*="photo" i] img, [data-framer-name*="image" i] img, [data-framer-name*="cover" i] img'
      );
      images.forEach((img) => {
        const el = img as HTMLElement;
        const parent = el.parentElement;
        if (!parent) return;
        parent.style.overflow = "hidden";
        el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        parent.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.05)";
        });
        parent.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1)";
        });
      });

      // Card hover lift effect
      const cards = document.querySelectorAll(
        '[data-framer-name*="card" i], [data-framer-name*="block" i], [data-framer-name*="container" i]'
      );
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.style.transition =
          "box-shadow 0.3s ease, transform 0.3s ease";
        el.addEventListener("mouseenter", () => {
          el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
          el.style.transform = "translateY(-4px)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.boxShadow = "none";
          el.style.transform = "translateY(0)";
        });
      });

      // Smooth anchor scroll
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = (a as HTMLAnchorElement).getAttribute("href");
          if (!href) return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: target as HTMLElement, offsetY: 80 },
              ease: "power3.inOut",
            });
          }
        });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
