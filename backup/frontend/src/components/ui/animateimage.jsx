'use client';
import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const defaultContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants = {
  fade: {},
  slide: { hidden: { y: 20 }, visible: { y: 0 } },
  scale: { hidden: { scale: 0.8 }, visible: { scale: 1 } },
  blur: { hidden: { filter: 'blur(4px)' }, visible: { filter: 'blur(0px)' } },
  'blur-slide': { hidden: { filter: 'blur(4px)', y: 20 }, visible: { filter: 'blur(0px)', y: 0 } },
  zoom: { hidden: { scale: 0.5 }, visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } } },
  flip: { hidden: { rotateX: -90 }, visible: { rotateX: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } } },
  bounce: { hidden: { y: -50 }, visible: { y: 0, transition: { type: 'spring', stiffness: 400, damping: 10 } } },
  rotate: { hidden: { rotate: -180 }, visible: { rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } } },
  swing: { hidden: { rotate: -10 }, visible: { rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 8 } } },
};

// Helper function to merge default and preset variants
const addDefaultVariants = (variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

// Memoized component to prevent re-renders when props don't change
export const AnimatedGroup = React.memo(({ children, className, variants, preset, as = 'div', asChild = 'div' }) => {
  // Memoize computed animation variants to prevent unnecessary recalculations
  const containerVariants = useMemo(() => variants?.container || defaultContainerVariants, [variants]);
  const itemVariants = useMemo(() => variants?.item || addDefaultVariants(preset ? presetVariants[preset] : {}), [variants, preset]);

  // Memoize motion components to avoid re-creation on every render
  const MotionComponent = useMemo(() => motion.create(as), [as]);
  const MotionChild = useMemo(() => motion.create(asChild), [asChild]);

  return (
    <MotionComponent initial="hidden" animate="visible" variants={containerVariants} className={className}>
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
});

AnimatedGroup.displayName = 'AnimatedGroup';
