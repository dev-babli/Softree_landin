"use client";

import { useRef } from "react";
import { useFizensReveal } from "./useFizensReveal";
import { BRAND_STRIP } from "./assets";

export default function FizensBrands() {
  const ref = useRef<HTMLElement>(null);
  useFizensReveal(ref);

  return (
    <section ref={ref} className="fizens-brands fizens-reveal">
      <div className="fizens-container">
        <p className="fizens-brands-head">
          Partnering with top tier brands to revolutionize financial services.
        </p>
        <div className="fizens-brands-image-wrap">
          <img src={BRAND_STRIP} alt="Trusted partner brands" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
