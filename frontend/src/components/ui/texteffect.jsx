'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

const defaultStaggerTimes = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const presetVariants = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(12px)' },
    },
  },
  'fade-in-blur': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: 20, filter: 'blur(12px)' },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: defaultItemVariants,
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationComponent = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content = per === 'line' ? (
    <motion.span variants={variants} className='block'>
      {segment}
    </motion.span>
  ) : per === 'word' ? (
    <motion.span aria-hidden='true' variants={variants} className='inline-block whitespace-pre'>
      {segment}
    </motion.span>
  ) : (
    <motion.span className='inline-block whitespace-pre'>
      {segment.split('').map((char, charIndex) => (
        <motion.span key={`char-${charIndex}`} aria-hidden='true' variants={variants} className='inline-block whitespace-pre'>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );

  if (!segmentWrapperClassName) return content;

  return <span className={cn(per === 'line' ? 'block' : 'inline-block', segmentWrapperClassName)}>{content}</span>;
});

AnimationComponent.displayName = 'AnimationComponent';

const splitText = (text, per) => (per === 'line' ? text.split('\n') : text.split(/(\s+)/));

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset = 'fade',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}) {
  const segments = splitText(children, per);
  const MotionTag = motion[as] || motion.p;

  const baseVariants = preset ? presetVariants[preset] : { container: defaultContainerVariants, item: defaultItemVariants };
  const stagger = defaultStaggerTimes[per] / speedReveal;
  const baseDuration = 0.3 / speedSegment;

  const computedVariants = {
    container: {
      ...baseVariants.container,
      visible: {
        ...baseVariants.container.visible,
        transition: { staggerChildren: stagger, delayChildren: delay, ...containerTransition },
      },
      exit: { staggerChildren: stagger, staggerDirection: -1 },
    },
    item: { ...baseVariants.item, visible: { ...baseVariants.item.visible, transition: { duration: baseDuration, ...segmentTransition } } },
  };

  return (
    <AnimatePresence mode='popLayout'>
      {trigger && (
        <MotionTag
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {per !== 'line' ? <span className='sr-only'>{children}</span> : null}
          {segments.map((segment, index) => (
            <AnimationComponent key={`${per}-${index}-${segment}`} segment={segment} variants={computedVariants.item} per={per} segmentWrapperClassName={segmentWrapperClassName} />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
