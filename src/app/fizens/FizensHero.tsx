"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_DASHBOARD, HERO_AVATARS, HERO_DECO_LEFT, HERO_DECO_RIGHT } from "./assets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FizensHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.querySelectorAll(".fizens-hero-anim").forEach((n) =>
        (n as HTMLElement).classList.add("fizens-revealed")
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.1 },
      });

      tl.fromTo(
        el.querySelector(".fizens-hero-pill"),
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          el.querySelectorAll(".fizens-hero-title-line"),
          { opacity: 0, y: 60, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          el.querySelector(".fizens-hero-sub"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          el.querySelector(".fizens-hero-cta"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          el.querySelector(".fizens-hero-trust"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          el.querySelector(".fizens-hero-mockup"),
          { opacity: 0, y: 80, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          "-=0.6"
        )
        .fromTo(
          el.querySelector(".fizens-hero-deco-left"),
          { opacity: 0, x: -60, rotate: -20 },
          { opacity: 1, x: 0, rotate: -8, duration: 0.9 },
          "-=0.9"
        )
        .fromTo(
          el.querySelector(".fizens-hero-deco-right"),
          { opacity: 0, x: 60, rotate: 24 },
          { opacity: 1, x: 0, rotate: 12, duration: 0.9 },
          "-=0.8"
        );

      // Subtle parallax on dashboard and floating decos
      gsap.to(el.querySelector(".fizens-hero-mockup > img:last-child"), {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(el.querySelector(".fizens-hero-deco-left"), {
        y: -40,
        rotate: -14,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(el.querySelector(".fizens-hero-deco-right"), {
        y: -60,
        rotate: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="fizens-hero" ref={ref} id="top">
      <div className="fizens-hero-bg" aria-hidden />
      <div className="fizens-hero-grid" aria-hidden />

      <div className="fizens-container">
        <div className="fizens-hero-inner">
          <span className="fizens-pill fizens-hero-pill fizens-hero-anim">
            <span className="fizens-pill-dot" />
            Finance Management
          </span>

          <h1 className="fizens-hero-title fizens-reveal fizens-hero-anim">
            <span className="fizens-hero-title-line">Start Managing</span>
            <span className="fizens-hero-title-line">
              Your <em>Finance</em>
            </span>
            <span className="fizens-hero-title-line">With Our Tool</span>
          </h1>

          <p className="fizens-hero-sub fizens-reveal fizens-hero-anim">
            Simplify your financial life. Our intuitive app makes managing your
            money effortless.
          </p>

          <div className="fizens-hero-cta fizens-reveal fizens-hero-anim">
            <a href="#pricing" className="fizens-btn fizens-btn-primary">
              Get Started <ArrowRight size={16} />
            </a>
            <a href="#features" className="fizens-btn fizens-btn-ghost">
              Learn More
            </a>
          </div>

          <div className="fizens-hero-trust fizens-reveal fizens-hero-anim">
            <div className="fizens-hero-avatars" aria-hidden>
              {HERO_AVATARS.map((src, i) => (
                <div
                  key={i}
                  className="fizens-hero-avatar"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
            <span className="fizens-hero-trust-text">
              Trusted by millions of users in over 140 countries
            </span>
          </div>

          <div className="fizens-hero-mockup fizens-reveal fizens-hero-anim">
            <img
              className="fizens-hero-deco fizens-hero-deco-left"
              src={HERO_DECO_LEFT}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
            />
            <img
              className="fizens-hero-deco fizens-hero-deco-right"
              src={HERO_DECO_RIGHT}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
            />
            <img
              src={HERO_DASHBOARD}
              alt="Fizens dashboard preview"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
