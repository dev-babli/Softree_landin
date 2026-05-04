"use client";

import React, { useEffect, useRef, useState } from "react";

const HEADING = "Latest Articles And Financial Insights";

const POSTS = [
  {
    title: "Navigating the Stock Market: A Beginner's Guide",
    desc: "Automate tasks like budgeting, tracking, and saving, freeing up your time for more important things.",
    category: "Advice",
    date: "Apr 24, 2025",
    image: "https://framerusercontent.com/images/F98LGBOHfFqiDXa1swrICAuDeY.png",
  },
  {
    title: "Why You Should Not Invest Your Emergency Fund",
    desc: "It's been an incredible journey over the past year, and what better way to commemorate this milestone.",
    category: "Investing",
    date: "Apr 23, 2025",
    image: "https://framerusercontent.com/images/it9VhB7jvDzMA2FahvSIIpzRrbQ.png",
  },
  {
    title: "Adjusting The Sails Of Your Investment To The Weather",
    desc: "Understand how to align your investment strategy with shifting market conditions and economic cycles.",
    category: "Investing",
    date: "Apr 22, 2025",
    image: "https://framerusercontent.com/images/neu8z0higfnRkUhhh9P6JLg9Yk.png",
  },
  {
    title: "3 Essential Questions You Need to Ask Your Insurance Advisor",
    desc: "Make sure you're fully covered by knowing exactly what to ask before you sign on the dotted line.",
    category: "Insurance",
    date: "Apr 21, 2025",
    image: "https://framerusercontent.com/images/jS7dLdo55m8KoiCUcAwq3fhnA.png",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function SplitHeading({ text }: { text: string }) {
  const [ref, inView] = useInView<HTMLHeadingElement>(0.3);
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={`fz-blog-heading ${inView ? "in-view" : ""}`}>
      {words.map((word, wi) => {
        const charsBefore = words.slice(0, wi).reduce((a, w) => a + w.length, 0);
        return (
          <span key={wi} className="word">
            {word.split("").map((char, ci) => (
              <span key={ci} className="char" style={{ transitionDelay: `${(charsBefore + ci) * 0.018}s` }}>{char}</span>
            ))}
          </span>
        );
      })}
    </h2>
  );
}

export default function FizensBlogSection() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  return (
    <section className="fz-blog-section" id="blog">
      <section className="fz-blog-container">
        <div className="fz-blog-header">
          <div className="fz-features-eyebrow">
            <span className="fz-features-eyebrow-dot" />
            <span>Blog</span>
          </div>
          <SplitHeading text={HEADING} />
        </div>

        <div ref={ref} className={`fz-blog-grid ${inView ? "in-view" : ""}`}>
          {POSTS.map((post, i) => (
            <a key={post.title} href="/blog" className="fz-blog-card" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="fz-blog-card-thumb">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="fz-blog-card-info">
                <span className="fz-blog-category">{post.category}</span>
                <span className="fz-blog-dot">•</span>
                <span className="fz-blog-date">{post.date}</span>
              </div>
              <h3 className="fz-blog-card-title">{post.title}</h3>
              <p className="fz-blog-card-desc">{post.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
