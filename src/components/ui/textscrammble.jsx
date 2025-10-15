'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  Scramble,
  as: Component = 'p',
  onScrambleComplete,
  ...props
}) {
  const MotionComponent = motion.create(Component);
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < children.length; i++) {
        if (children[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * children.length > i) {
          scrambled += children[i]; // Reveal original letter gradually
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(children);
        setIsAnimating(false);
        if (onScrambleComplete) onScrambleComplete();
      }
    }, speed * 1000);
  };

  useEffect(() => {
    if (Scramble) {
      scramble();
    }
  }, [Scramble]);

  return (
    <MotionComponent className={className} {...props} onClick={scramble}>
      {displayText}
    </MotionComponent>
  );
}
