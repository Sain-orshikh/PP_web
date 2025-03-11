import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import pxlmoon from "../assets/pxlmoon.jpg";

const TransitionAnimation = ({ children }) => {
  
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSmall(true);
    }
  }, []);

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 400); // Total animation time
  }, []);

  return (
    <div className="relative">
      {/* Transition Effect */}
      <AnimatePresence>
        {isAnimating && !isSmall && (
          <>
            {/* Left Panel with Image */}
            <motion.div
              initial={{ x: "-100%" }} // Start off-screen left
              animate={{ x: "0%" }} // Move to center
              exit={{ x: "-100%" }} // Move back out
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-1/2 h-full bg-cover bg-center z-50"
              style={{
                backgroundImage: `url(${pxlmoon})`, // Replace with your image path
                backgroundPosition: "left",
              }}
            />
            
            {/* Right Panel with Image */}
            <motion.div
              initial={{ x: "100%" }} // Start off-screen right
              animate={{ x: "0%" }} // Move to center
              exit={{ x: "100%" }} // Move back out
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-1/2 h-full bg-cover bg-center z-50"
              style={{
                backgroundImage: `url(${pxlmoon})`, // Replace with your image path
                backgroundPosition: "right",
              }}
            />
          </>
        )}
        {isAnimating && isSmall && (
        <>
        <div className="flex flex-row">
          <motion.div
              initial={{ y: "-100%" }} // Start off-screen left
              animate={{ y: "0%" }} // Move to center
              exit={{ y: "-100%" }} // Move back out
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-full h-1/2 bg-cover bg-center z-50"
              style={{
                backgroundImage: `url(${pxlmoon})`, // Replace with your image path
                backgroundPosition: "top",
              }}
            />
            
            <motion.div
              initial={{ y: "100%" }} // Start off-screen right
              animate={{ y: "0%" }} // Move to center
              exit={{ y: "100%" }} // Move back out
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 w-full h-1/2 bg-cover bg-center z-50"
              style={{
                backgroundImage: `url(${pxlmoon})`, // Replace with your image path
                backgroundPosition: "bottom",
              }}
            />
            </div>
        </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default TransitionAnimation;
