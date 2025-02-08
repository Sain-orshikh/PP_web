'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({ children, variants, transition, viewOptions, as = 'div' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  // Dynamically selecting motion component
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants || defaultVariants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}
