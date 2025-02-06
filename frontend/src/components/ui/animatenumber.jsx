'use client';
import { cn } from '@/lib/utils';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function AnimatedNumber({ value, className, springOptions, as = 'span' }) {
  const Component = motion[as] || motion.span; // Ensure a valid motion component

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <Component className={cn('tabular-nums', className)}>
      {display}
    </Component>
  );
}
