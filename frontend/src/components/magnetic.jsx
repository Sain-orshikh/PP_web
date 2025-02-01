"use client";

import { FaPaperPlane } from "react-icons/fa6";
import paperairplane from "../assets/paperairplane.png";
import { CiPaperplane } from "react-icons/ci";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING_CONFIG = { stiffness: 50, damping: 10, mass: 0.5 };

export function Magnetic({color, isRemoved}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);
  const springRotate = useSpring(rotate, SPRING_CONFIG);

  const ref = useRef(null);

  useEffect(() => {

    const handleMouseMove = (e) => {

      const rect = ref.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
    
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      x.set(e.clientX);
      y.set(e.clientY);
      rotate.set(angle);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);



  return (
    <>
    <motion.div
      ref={ref}
      className="w-16 h-16"
      animate={{
        x: isRemoved ? 600 : 0, // Move down when removed
        opacity: isRemoved ? 0 : 1, // Fade out when removed
        scale: isRemoved ? 0.5 : 1, // Shrink when removed
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      style={{
        x: springX,
        y: springY,
        rotate: springRotate,
        transformOrigin: "center center",
      }}
    >
      <CiPaperplane className={`w-16 h-16 text-${color} ${isRemoved ? "animate-burn" : ""}`} />
    </motion.div>
      <style jsx>{`
        @keyframes burn {
          0% {
            transform: scale(1);
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            transform: scale(0.7);
            opacity: 0.5;
            filter: brightness(0.5);
          }
          100% {
            transform: scale(0);
            opacity: 0;
            filter: brightness(0);
          }
        }

        .animate-burn {
          animation: burn 2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
