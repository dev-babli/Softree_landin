"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { useFizensReveal } from "./useFizensReveal";
import { TESTIMONIAL_AVATARS } from "./assets";

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  avatar: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    name: "Michael Brown",
    location: "London, UK",
    quote:
      "I was skeptical at first, but then I have completely transformed my relationship with money.",
    avatar: TESTIMONIAL_AVATARS[0],
  },
  {
    name: "Sarah Jane",
    location: "Michigan, US",
    quote:
      "I've finally taken control of my finances. It's so easy to use and has helped me save more money than ever before.",
    avatar: TESTIMONIAL_AVATARS[1],
  },
  {
    name: "David Lee",
    location: "Montreal, Canada",
    quote:
      "It has been a game-changer for my financial life. I love how it helps me stay organized with my spending.",
    avatar: TESTIMONIAL_AVATARS[2],
  },
  {
    name: "Emily Smith",
    location: "Lyon, France",
    quote:
      "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I ever thought possible.",
    avatar: TESTIMONIAL_AVATARS[3],
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    name: "Sarah Johnson",
    location: "Paris, France",
    quote:
      "I've been able to pay off debt, save for a down payment, and even start investing.",
    avatar: TESTIMONIAL_AVATARS[4],
  },
  {
    name: "Guy Hawkins",
    location: "Berlin, Germany",
    quote:
      "Setting up automatic budgeting changed how I think about my paycheck. I see exactly where every dollar goes.",
    avatar: TESTIMONIAL_AVATARS[5],
  },
  {
    name: "Wade Warren",
    location: "Sydney, Australia",
    quote:
      "The investment tracker alone is worth it. I had no idea my portfolio looked so messy until I connected it.",
    avatar: TESTIMONIAL_AVATARS[6],
  },
  {
    name: "Jane Cooper",
    location: "Toronto, Canada",
    quote:
      "Finally, an app that doesn't just show me numbers — it helps me understand them and act on them.",
    avatar: TESTIMONIAL_AVATARS[7],
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="fizens-testimonial-card">
      <div className="fizens-testimonial-stars" aria-label="5 star rating">
        ★★★★★
      </div>
      <p>“{t.quote}”</p>
      <div className="fizens-testimonial-author">
        <div
          className="fizens-testimonial-avatar"
          style={{ backgroundImage: `url(${t.avatar})` }}
          aria-hidden
        />
        <div className="fizens-testimonial-meta">
          <strong>{t.name}</strong>
          <span>{t.location}</span>
        </div>
      </div>
    </div>
  );
}

export default function FizensTestimonials() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref);

  // Duplicate for infinite marquee
  const r1 = [...testimonialsRow1, ...testimonialsRow1];
  const r2 = [...testimonialsRow2, ...testimonialsRow2];

  return (
    <section ref={ref} className="fizens-section fizens-testimonials fizens-reveal">
      <div className="fizens-container">
        <div className="fizens-section-head">
          <span className="fizens-pill">
            <span className="fizens-pill-dot" />
            Testimonials
          </span>
          <h2>Loved by people, all around the world</h2>
          <div
            className="fizens-testimonials-rating"
            style={{ marginTop: 8, justifyContent: "center" }}
          >
            <span className="fizens-testimonials-stars">
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
              ))}
              <Star size={16} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5} />
            </span>
            <strong style={{ color: "var(--fizens-text-dark)" }}>4.8/5</strong>
            <span style={{ color: "var(--fizens-text-gray)" }}>
              Based on 14K+ reviews
            </span>
          </div>
        </div>
      </div>

      <div className="fizens-marquee-mask">
        <div className="fizens-marquee-row">
          {r1.map((t, i) => (
            <Card key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>
      <div className="fizens-marquee-mask">
        <div className="fizens-marquee-row is-reverse">
          {r2.map((t, i) => (
            <Card key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
