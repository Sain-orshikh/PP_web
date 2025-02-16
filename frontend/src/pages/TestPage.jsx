import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BsLightbulb, BsLightbulbFill } from 'react-icons/bs';

export default function MobileMenu() {
  const [showSolarButton, setShowSolarButton] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSolarMode, setIsSolarMode] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 50) {
      // Swipe Right → Show Dark Mode Button
      setShowSolarButton(false);
    } else if (diffX < -50) {
      // Swipe Left → Show Solar Mode Button
      setShowSolarButton(true);
    } else {
      // Tap → Toggle the currently visible mode
      if (showSolarButton) {
        setIsSolarMode((prev) => !prev);
      } else {
        setIsDarkMode((prev) => !prev);
      }
    }

    setTouchStartX(null);
  };

  return (
    <div className="md:hidden p-4 flex flex-col items-center">
      <motion.div
        className="relative w-12 h-12"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {showSolarButton ? (
            <motion.button
              key="solar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center w-12 h-12 rounded-full bg-yellow-200"
              onClick={() => setIsSolarMode((prev) => !prev)}
            >
              {isSolarMode ? (
                <BsLightbulbFill fontSize={24} className="text-yellow-500" />
              ) : (
                <BsLightbulb fontSize={24} />
              )}
            </motion.button>
          ) : (
            <motion.button
              key="dark"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800"
              onClick={() => setIsDarkMode((prev) => !prev)}
            >
              {isDarkMode ? <FaMoon fontSize={24} /> : <FaSun fontSize={24} />}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        key={showSolarButton ? 'solarText' : 'darkText'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mt-2 text-center text-sm"
      >
        {showSolarButton ? (isSolarMode ? 'Solar Mode On' : 'Solar Mode Off') : isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </motion.div>
    </div>
  );
}
