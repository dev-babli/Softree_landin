"use client";

import React, { useEffect, useState } from "react";

const CARD_WIDTH = 340;
const GAP = 28;
const WEB_SLIDES = [
  "/productpreview_images/webslideshow1.webp",
  "/productpreview_images/2.webp",
  "/productpreview_images/still-06607eaae7cc7819ac85a01c693f4722.webp",
  "/productpreview_images/still-8fba34a4fe44b9a978139b2280c6ce47.webp",
  "/productpreview_images/still-d32f64752588b0367e11bbed58868c12.webp",
];

const SolutionsDeck = () => {
  const solutions = [
    {
      id: "web",
      title: "Web Development",
      image: "/images/web.png",
      points: [
        "Scalable web platforms",
        "Modern frameworks",
        "Enterprise security",
      ],
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      image: "/images/mobile.png",
      points: [
        "iOS & Android apps",
        "High performance UX",
        "Scalable architecture",
      ],
    },
    {
      id: "sharepoint",
      title: "SharePoint Solutions",
      image: "/images/sp.png",
      points: [
        "Intranets & portals",
        "Document management",
        "Enterprise collaboration",
      ],
    },
    {
      id: "powerapps",
      title: "Power Apps",
      image: "/images/power.png",
      points: [
        "Low-code automation",
        "Business workflows",
        "Microsoft ecosystem",
      ],
    },
    {
      id: "ai",
      title: "Artificial Intelligence",
      image: "/images/ai.png",
      points: [
        "AI-driven automation",
        "Predictive insights",
        "Intelligent systems",
      ],
    },
  ];

  const [active, setActive] = useState(2);
  const [webSlideIndex, setWebSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWebSlideIndex((prev) => (prev + 1) % WEB_SLIDES.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-[#020d1a] to-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/images/service.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00091A]/90 via-[#00091A]/80 to-[#00091A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ===== Header ===== */}
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          {/* Eyebrow */}
          <span
            className="
      inline-flex items-center gap-2
      text-sm tracking-[0.3em] uppercase
      text-cyan-400
    "
          >
            <span className="w-8 h-px bg-cyan-400/60" />
            Our Capabilities
            <span className="w-8 h-px bg-cyan-400/60" />
          </span>

          {/* Heading */}
          <h2
            className="
      text-4xl md:text-5xl lg:text-6xl
      font-semibold leading-tight tracking-tight
    "
            style={{ fontFamily: "Calibri, serif" }}
          >
            <span className="text-slate-200">Technology</span>{" "}
            <span
              className="
        bg-gradient-to-r
        from-cyan-400
        via-sky-400
        to-blue-500
        bg-clip-text text-transparent
      "
            >
              Solutions
            </span>
            
            <span className="text-slate-400"> Built for</span>{" "}
            <span className="text-white">Scale</span>
          </h2>

          {/* Description */}
          <p className="text-[#CBD5E1] text-lg leading-relaxed max-w-2xl mx-auto">
            We engineer <span className="text-white font-medium">secure</span>,{" "}
            <span className="text-cyan-300 font-medium">scalable</span> digital
            platforms that help enterprises{" "}
            <span className="text-sky-300">modernize</span>,{" "}
            <span className="text-sky-300">innovate</span>, and grow with
            confidence.
          </p>
        </div>

        {/* Card Deck */}
        <div className="relative w-full h-[560px] flex justify-center items-center">
          {solutions.map((item, index) => {
            const offset = index - active;
            const isActive = offset === 0;
            const isWebCard = item.id === "web";

            return (
              <div
                key={item.id}
                onClick={() => setActive(index)}
                className="absolute cursor-pointer transition-all duration-700 ease-out"
                style={{
                  width: CARD_WIDTH,
                  transform: `
                    translateX(${offset * (CARD_WIDTH + GAP)}px)
                    translateY(${isActive ? "0px" : "20px"})
                    scale(${isActive ? 1 : 0.84})
                    rotate(${isActive ? "0deg" : offset > 0 ? "1.6deg" : "-1.6deg"})
                  `,
                  opacity: isActive ? 1 : 0.58,
                  filter: isActive ? "blur(0px)" : "blur(1px)",
                  zIndex: isActive ? 30 : 10,
                }}
              >
                {/* Card */}
                <div
                  className="
                    rounded-2xl overflow-hidden
                    border border-white/80
                    bg-white
                  "
                  style={{
                    boxShadow: isActive
                      ? "0 22px 60px rgba(4, 14, 33, 0.35)"
                      : "0 14px 36px rgba(8, 17, 33, 0.2)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-[320px] overflow-hidden bg-slate-200">
                    {isWebCard ? (
                      <>
                        {WEB_SLIDES.map((slide, slideIndex) => {
                          const isCurrent = slideIndex === webSlideIndex;
                          return (
                            <img
                              key={slide}
                              src={slide}
                              alt={`${item.title} showcase ${slideIndex + 1}`}
                              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1500ms] ease-out"
                              style={{
                                opacity: isCurrent ? 1 : 0,
                                transform: isCurrent ? "scale(1.06)" : "scale(1.15)",
                              }}
                            />
                          );
                        })}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
                      </>
                    ) : (
                      <>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="
    relative p-7
    border-t border-slate-100
    bg-white
  "
                  >
                    {/* Mirror highlight strip */}
                    <div
                      className="
      absolute inset-x-0 top-0 h-[1px]
      bg-gradient-to-r
      from-transparent via-slate-200 to-transparent
    "
                    />

                    {/* Accent edge */}
                    <span
                      className="
      absolute left-0 top-6
      h-14 w-[3px]
      bg-gradient-to-b from-slate-300 to-slate-500
      rounded-full
      opacity-70
    "
                    />

                    {/* Title */}
                    <h3
                      className="
    relative
    text-lg font-semibold
    text-slate-900
    tracking-tight
    mb-5 pl-4
  "
                    >
                      {item.title}

                      {/* Underline */}
                      <span
                        className="
      absolute left-4 -bottom-2
      h-[2px] w-12
      bg-gradient-to-r
      from-slate-500
      via-slate-300
      to-transparent
    "
                      />
                    </h3>

                    {/* Points */}
                    <ul className="space-y-3 pl-4">
                      {item.points.map((p, i) => (
                        <li
                          key={`${item.id}-${i}`}
                          className="
          flex items-start gap-3
          text-sm text-slate-600
          leading-relaxed
        "
                        >
                          <span className="mt-1 text-slate-500">
                            <CheckBullet />
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CheckBullet = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 7.2L6.1 9.2L10 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SolutionsDeck;
