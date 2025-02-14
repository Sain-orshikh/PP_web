'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

export function Spotlight({ size = 200, springOptions = { bounce: 0 } }) {
  const spotlightRef = useRef(null);
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  const handleMouseMove = useCallback((event) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={spotlightRef}
      className="pointer-events-none absolute rounded-full bg-white opacity-100"
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        mixBlendMode: 'difference',
      }}
    />
  );
}

export default function AboutPage() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black text-black overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-90 pointer-events-none" />
      {/* Spotlight Effect */}
      <Spotlight size={300} />
      {/* Content */}
      <div className="z-10">
        <img src="https://plus.unsplash.com/premium_photo-1683134240084-ba074973f75e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fHww" alt="Example" className="w-64 h-auto mb-4" />
        <h1 className="text-3xl font-bold">Dark Mode Spotlight Effect</h1>
      </div>
    </div>
  );
}
