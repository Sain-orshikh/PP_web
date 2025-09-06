'use client';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * A wrapper component that animates its children when they come into view.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {{ hidden: Object, visible: Object }} [props.variants] - Motion variants for animation.
 * @param {Object} [props.transition] - Motion transition options.
 * @param {Object} [props.viewOptions] - Options for useInView hook.
 * @param {string} [props.as] - The HTML tag or component to render as.
 */
export function InView({
  children,
  variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  transition,
  viewOptions,
  as = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}
