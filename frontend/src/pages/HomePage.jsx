import React, { useState } from "react";
import { motion } from "framer-motion";
import { CiPaperplane } from "react-icons/ci"; // Paper airplane icon

function HomePage() {
  const [isRemoved, setIsRemoved] = useState(false);

  // Trigger the remove animation when button is clicked
  const handleRemovePlane = () => {
    setIsRemoved(true);
  };

  return (
    <div>
      <button onClick={handleRemovePlane} className="p-2 bg-red-500 text-white rounded">
        Remove Paper Airplane
      </button>

      <motion.div
        className="w-16 h-16 relative"
        initial={{ x: 0, y: 0 }} // Initial position of the airplane
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
          filter: isRemoved ? "grayscale(100%)" : "none", // Optionally, make it look burnt
        }}
      >
        <CiPaperplane
          className={`w-16 h-16 ${isRemoved ? "animate-burn" : ""}`}
        />
      </motion.div>

      {/* Burning animation with CSS */}
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
          animation: burn 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default HomePage;