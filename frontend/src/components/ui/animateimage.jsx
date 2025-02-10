'use client';
import React from 'react';
import { motion } from 'motion/react';

export function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}) {
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
    slide: {
      hidden: { y: 20 },
      visible: { y: 0 },
    },
    scale: {
      hidden: { scale: 0.8 },
      visible: { scale: 1 },
    },
    blur: {
      hidden: { filter: 'blur(4px)' },
      visible: { filter: 'blur(0px)' },
    },
    'blur-slide': {
      hidden: { filter: 'blur(4px)', y: 20 },
      visible: { filter: 'blur(0px)', y: 0 },
    },
    zoom: {
      hidden: { scale: 0.5 },
      visible: {
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
    },
    flip: {
      hidden: { rotateX: -90 },
      visible: {
        rotateX: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
    },
    bounce: {
      hidden: { y: -50 },
      visible: {
        y: 0,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      },
    },
    rotate: {
      hidden: { rotate: -180 },
      visible: {
        rotate: 0,
        transition: { type: 'spring', stiffness: 200, damping: 15 },
      },
    },
    swing: {
      hidden: { rotate: -10 },
      visible: {
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 8 },
      },
    },
  };

  const addDefaultVariants = (variants) => ({
    hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
    visible: { ...defaultItemVariants.visible, ...variants.visible },
  });

  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  };

  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  const MotionComponent = motion.create(as);
  const MotionChild = motion.create(asChild);

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}
