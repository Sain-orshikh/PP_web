'use client';
import { motion } from 'motion/react';

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: 'easeIn' },
  variants,
  onAnimationComplete,
  shouldAnimate, // This now controls whether animation happens
}) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 90 },  // Start from rotated position
      animate: { rotateX: 0 },   // Animate to normal position
    },
    exit: {
      initial: { rotateX: 0 },   // Start from normal position
      animate: { rotateX: 90 },  // Animate to rotated position
    },
  };

  const letters = children.split('');

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
            initial={variants?.enter?.initial ?? defaultVariants.enter.initial}
            animate={shouldAnimate
              ? (variants?.enter?.animate ?? defaultVariants.enter.animate)
              : (variants?.exit?.animate ?? defaultVariants.exit.animate)}  // Control animation
            transition={{ ...transition, duration, delay: getEnterDelay(i) }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
            initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
            animate={shouldAnimate
              ? (variants?.enter?.animate ?? defaultVariants.enter.animate)
              : (variants?.exit?.animate ?? defaultVariants.exit.animate)}  // Control animation
            transition={{ ...transition, duration, delay: getExitDelay(i) }}
            onAnimationComplete={letters.length === i + 1 ? onAnimationComplete : undefined}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
          <span className="invisible">{letter === ' ' ? '\u00A0' : letter}</span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}
