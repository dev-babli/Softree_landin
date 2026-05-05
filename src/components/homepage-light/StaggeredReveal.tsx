'use client';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface StaggeredRevealProps {
  text: string;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export const StaggeredReveal: FC<StaggeredRevealProps> = ({ 
  text, 
  delay = 0, 
  className = "", 
  as: Component = "span" 
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '120%' },
    visible: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // Custom snappy easing
      },
    },
  };

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden pb-2 -mb-2 mr-[0.2em] relative">
          <motion.span className="inline-block origin-bottom" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};

export default StaggeredReveal;
