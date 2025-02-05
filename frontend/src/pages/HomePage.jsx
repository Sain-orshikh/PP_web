import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/texteffect";
function HomePage() {



  return (
    <>
      <div className='flex flex-col space-y-0'>
        <TextEffect
          per='char'
          delay={0.7}
          preset="blur"
          variants={{
            container: {
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                rotateX: 90,
                y: 10,
              },
              visible: {
                opacity: 1,
                rotateX: 0,
                y: 0,
                transition: {
                  duration: 0.2,
                },
              },
            },
          }}
        >
          Explore the world of MAIS students
        </TextEffect>
        <TextEffect per='char' preset="blur" delay={1.5}>
          with our passion projects
        </TextEffect>
      </div>
    </>
  );
}

export default HomePage;