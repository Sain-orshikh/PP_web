'use client';
import { cn } from '@/lib/utils';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  springOptions?: Record<string, unknown>;
  as?: keyof typeof motion | string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className,
  springOptions,
  as = 'span'
}) => {
  const Component = (as === 'span' ? motion.span : 
                   as === 'div' ? motion.div : 
                   as === 'p' ? motion.p : motion.span);

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
};
