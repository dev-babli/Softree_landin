"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitMode = "words" | "chars";

type AnimatedTextProps = {
  as?: keyof typeof motion;
  text: string;
  className?: string;
  mode?: SplitMode;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedText({
  as = "div",
  text,
  className,
  mode = "words",
  delay = 0,
  stagger,
  once = true,
  amount = 0.35,
  ...rest
}: AnimatedTextProps) {
  const MotionTag = motion[as] as typeof motion.div;
  const reducedMotion = useReducedMotion();
  const units = mode === "chars" ? Array.from(text) : text.split(" ");
  const unitStagger = stagger ?? (mode === "chars" ? 0.028 : 0.08);

  if (reducedMotion) {
    return (
      <MotionTag className={className} {...rest}>
        {text}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants(unitStagger, delay)}
      {...rest}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {units.map((unit, index) => {
          const content = unit === " " ? "\u00A0" : unit;

          return (
            <span
              key={`${unit}-${index}`}
              className={cn(
                "inline-block overflow-hidden align-top",
                mode === "words" && "mr-[0.24em]",
              )}
            >
              <motion.span className="inline-block will-change-transform" variants={childVariants}>
                {content}
              </motion.span>
            </span>
          );
        })}
      </span>
    </MotionTag>
  );
}
