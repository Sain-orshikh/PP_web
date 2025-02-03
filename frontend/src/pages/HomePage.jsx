import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CiPaperplane } from "react-icons/ci"; // Paper airplane icon
import portal1 from "@/assets/portal1.png";
import portal2 from "@/assets/portal2.png";
import boy1 from "@/assets/boy1.png";
import boy2 from "@/assets/boy2.png";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
function HomePage() {

  const portal = [portal1, portal2];
  const [currentPortal, setCurrentPortal] = useState(0);
  const animateportal = () => {
  if (currentPortal === 1) {setCurrentPortal(0);}
  else {setCurrentPortal(1);}
  };
  useEffect(() => {
    const interval = setInterval(() => {
      animateportal();
    }, 500);
    return () => clearInterval(interval);
  }, [currentPortal]);
  return (
      <div className='flex h-full space-x-4'>
        <div className="relative flex flex-col items-center h-[1200px] overflow-hidden">
          {/* Top Portal */}
          <img src={portal[currentPortal]} alt="portal" className="w-[100px] z-10 mb-auto" />

          {/* Image Moving Through Portals */}
          <div className="relative h-full w-[120px] flex items-center justify-center" style={{top: `-25px`}}>
            <InfiniteSlider direction="vertical" duration={10} reverse className=" h-full">
              <img
                src={boy1}
                alt="Falling Image"
                className="aspect-square w-[120px] rounded-[4px]"
              />
              <img
                src={boy1}
                alt="Falling Image"
                className="aspect-square w-[120px] rounded-[4px]"
              />
              <img
                src={boy1}
                alt="Falling Image"
                className="aspect-square w-[120px] rounded-[4px]"
              />
              <img
                src={boy1}
                alt="Falling Image"
                className="aspect-square w-[120px] rounded-[4px]"
              />
            </InfiniteSlider>
          </div>

          {/* Bottom Portal */}
          <img src={portal[currentPortal]} alt="portal" className="w-[100px] mt-auto z-10" />
        </div>
    </div>
  );
}

export default HomePage;