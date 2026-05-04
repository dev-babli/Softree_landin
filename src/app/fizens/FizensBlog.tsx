"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";

interface Post {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  thumb: string;
}

import { BLOG_THUMBS } from "./assets";

const posts: Post[] = [
  {
    category: "Advice",
    date: "Apr 24, 2025",
    title: "Navigating the Stock Market: A Beginner's Guide",
    excerpt:
      "Learn the basics of investing and how to build a portfolio that grows with you over time.",
    thumb: BLOG_THUMBS[0],
  },
  {
    category: "Advice",
    date: "Apr 23, 2025",
    title: "Why You Should Not Invest Your Emergency Fund",
    excerpt:
      "Your emergency fund is meant to be safe — here's why mixing it with investments is risky.",
    thumb: BLOG_THUMBS[1],
  },
  {
    category: "Investing",
    date: "Apr 22, 2025",
    title: "Adjusting The Sails Of Your Investment To The Weather",
    excerpt:
      "Markets shift constantly. Learn how to adapt your strategy without panic-selling.",
    thumb: BLOG_THUMBS[2],
  },
];

export default function FizensBlog() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref, { childSelector: ".fizens-blog-card", stagger: 0.1 });

  return (
    <section
      ref={ref}
      id="blog"
      className="fizens-section fizens-blog fizens-reveal"
    >
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Blog
          </span>
          <h2>Read the Articles</h2>
          <p>
            Smart, practical reads to help you take charge of your money — one
            article at a time.
          </p>
        </div>

        <div className="fizens-blog-grid">
          {posts.map((p) => (
            <a
              key={p.title}
              href="#"
              className="fizens-blog-card fizens-reveal"
            >
              <div className="fizens-blog-thumb">
                <img src={p.thumb} alt={p.title} loading="lazy" decoding="async" />
              </div>
              <div className="fizens-blog-card-body">
                <div className="fizens-blog-meta">
                  <span className="fizens-blog-cat">{p.category}</span>
                  <span>{p.date}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.excerpt}</p>
                <span
                  style={{
                    marginTop: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--fizens-blue-primary)",
                  }}
                >
                  Read article <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
