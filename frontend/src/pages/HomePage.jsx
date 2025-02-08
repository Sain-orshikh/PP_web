import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextEffect } from "@/components/ui/texteffect";
import { TextRoll } from "@/components/ui/textroll";

import ppredge from '@/assets/ppredge.png';
import { Grid2 } from "@mui/material";
import { set } from "mongoose";
import { TextScramble } from "@/components/ui/textscrammble";
import ProjectCard from "@/components/ProjectCard";
function HomePage() {

  const [Scramble, setScramble] = useState(false);
  const handleScramble = () => {
    setScramble(!Scramble);
  }

  return (
    <>
      <div className='flex flex-col w-full min-h-screen'>
        <div className="w-[40%] mx-auto mt-14">
        <TextEffect
          per='char'
          delay={0.2}
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
          className={`text-6xl font-harmonique font-bold text-center`}
        >
          Peek into the world of MAIS students
        </TextEffect>
        </div>
        <div>
          Hero section
        </div>
        <div className="w-full mx-auto h-[30rem] bg-black">
          <div className="w-[95%] mx-auto mt-7">
          <div className="flex flex-row justify-between">
            <div className="text-6xl font-harmonique font-bold text-white">
              Projects
            </div>
            <div>
              <button className={`text-2xl font-harmonique mt-3 rounded-md bg-orange-500 hover:bg-purple-800 text-black px-4`}>
                <Link to={"/projects"}>
                    See All Projects
                </Link>
              </button>
            </div>
          </div>
          <div className="text-white text-xl font-semibold mt-7">
            The brilliant researh projects of MAIS students
          </div>
          <div className="w-full mt-5">
          <Grid2 container spacing={4} className="w-full flex justify-evenly">
            <Grid2 xs={12} sm={6} md={4} className='w-[33%]'>
              <ProjectCard />
            </Grid2>
            <Grid2 xs={12} sm={6} md={4}>
              <ProjectCard />
            </Grid2>
            <Grid2 xs={12} sm={6} md={4}>
              <ProjectCard />
            </Grid2>
          </Grid2>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;