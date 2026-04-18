"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  image: string;
};

let interval: ReturnType<typeof setInterval> | undefined;

// ---------------------------
// CardSlide Component
// ---------------------------
export const CardSlide = ({
  items,
  offset = 22,
  scaleFactor = 0.06,
  intervalDuration = 3000,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  intervalDuration?: number;
}) => {
  const [cards, setCards] = useState<Card[]>(items);
  const [dynamicOffset, setDynamicOffset] = useState(offset);
  const [dynamicScale, setDynamicScale] = useState(scaleFactor);
  const [cardSize, setCardSize] = useState({ height: "26rem", width: "22rem" });

  // Responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDynamicOffset(10);
        setDynamicScale(0.04);
        setCardSize({ height: "26rem", width: "26rem" });
      } else if (window.innerWidth < 1024) {
        setDynamicOffset(14);
        setDynamicScale(0.05);
        setCardSize({ height: "30rem", width: "28rem" });
      } else {
        setDynamicOffset(offset);
        setDynamicScale(scaleFactor);
        setCardSize({ height: "32rem", width: "32rem" });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [offset, scaleFactor]);

  // Auto-rotation
  useEffect(() => {
    interval = setInterval(() => {
      setCards((prev) => {
        const arr = [...prev];
        arr.unshift(arr.pop()!);
        return arr;
      });
    }, intervalDuration);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [intervalDuration]);

  return (
    <div
      className="relative flex justify-center"
      style={{
        height: `calc(${cardSize.height} + ${cards.length * dynamicOffset}px)`,
        width: cardSize.width,
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-neutral-200 dark:border-white/[0.08] flex flex-col justify-between text-left overflow-hidden"
          style={{
            transformOrigin: "top center",
            height: cardSize.height,
            width: cardSize.width,
          }}
          animate={{
            top: index * -dynamicOffset,
            scale: 1 - index * dynamicScale,
            zIndex: cards.length - index,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="font-semibold text-lg sm:text-xl md:text-2xl text-neutral-800 dark:text-neutral-100">
              {card.name}
            </div>
            <div className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              {card.content}
            </div>

            {/* Image Section */}
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 sm:h-48 md:h-56 rounded-lg border border-neutral-200 dark:border-neutral-800 object-cover shadow-md"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 mt-4">
            <p className="text-neutral-700 dark:text-white font-medium text-sm sm:text-base">
              {card.designation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ---------------------------
// HeroPreviewWalls Component
// ---------------------------
export function HeroPreviewWalls() {
  const CARDS: Card[] = [
    {
      id: 0,
      name: "AI & Intelligent Automation",
      designation: "Power Platform • Copilot • AI Agents",
      content: (
        <p>
          We design intelligent systems that streamline workflows, reduce
          overhead, and enable you to scale. Our automation integrates across{" "}
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
            Power Platform, Azure AI, and Microsoft 365
          </span>
          , ensuring precision and enterprise-grade reliability.
        </p>
      ),
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
    {
      id: 1,
      name: "Data & Analytics",
      designation: "Power BI • Fabric • Databricks",
      content: (
        <p>
          From dashboards to data lakes, we build scalable analytics that drive
          decisions. We deliver{" "}
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
            Power BI, Microsoft Fabric, and modern data pipelines
          </span>{" "}
          that adapt to your evolving business needs.
        </p>
      ),
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      id: 2,
      name: "Cloud & Modern Apps",
      designation: "Azure • Web • Mobile",
      content: (
        <p>
          Our deployments leverage Azure, container orchestration, and modern
          frameworks. Whether you&apos;re on{" "}
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
            Azure, hybrid, or on-prem
          </span>
          , we ensure performance, security, and fault tolerance.
        </p>
      ),
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-black text-black dark:text-white py-16 sm:py-20 md:py-24">
      <div className="max-w-5xl mx-auto text-left px-4 sm:px-6">
        <div className="inline-block mb-4 border border-neutral-300 dark:border-neutral-700 rounded-full px-3 py-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Microsoft Partner since 2013
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
          We build technology that moves your vision forward
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mb-8">
          Empowering organizations to turn ambitious ideas into scalable digital
          products — Power Platform, Data, AI, and modern applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-20">
          <Link
            href="/services"
            className="rounded-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-sm font-medium hover:opacity-80 transition text-center"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-400 dark:border-neutral-600 px-6 py-3 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-center"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Background Image */}
      <div className="relative flex justify-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
          alt="Technology background"
          className="rounded-2xl shadow-xl w-full object-cover border-8 border-neutral-200 dark:border-neutral-800"
        />

        {/* Anchored Card Stack */}
        <div className="absolute -bottom-36 sm:-bottom-16 md:-bottom-9 flex justify-center w-full">
          <CardSlide items={CARDS} />
        </div>
      </div>
    </section>
  );
}
