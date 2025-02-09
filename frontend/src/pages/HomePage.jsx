import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextEffect } from "@/components/ui/texteffect";

import duo from "../assets/duo.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

import { Grid2 } from "@mui/material";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { useQuery } from "@tanstack/react-query";

function HomePage() {

  const [Scramble, setScramble] = useState(false);
  const handleScramble = () => {
    setScramble(!Scramble);
  }

  const {data:blogs} = useQuery({queryKey: ['blogs']});

  const Blogs = blogs?.data;

  let displayedBlogs = [];

  if(blogs){
    displayedBlogs = [...Blogs].slice(0, 3);
  }

  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  return (
    <>
      <div className='flex flex-col w-full min-h-screen bg-gray-100'>
        <div className="w-[40%] mx-auto mt-12">
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
          Hero section (to be finished)
        </div>
        <div className="w-full mx-auto min-h-[30rem] bg-black">
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
          <div className="w-full my-5">
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

        <div className="w-full mx-auto min-h-[30rem] bg-gray-100">
          <div className="w-[95%] mx-auto mt-7">
          <div className="flex flex-row justify-between">
            <div className="text-6xl font-harmonique font-bold text-black">
              Blogs
            </div>
            <div>
              <button className={`text-2xl font-harmonique mt-3 rounded-md bg-orange-500 hover:bg-purple-800 text-black px-4`}>
                <Link to={"/blogs"}>
                    See All Blogs
                </Link>
              </button>
            </div>
          </div>
          <div className="text-black text-xl font-semibold mt-7">
            Gain insight into the minds of MAIS students
          </div>
          <div className="w-full my-5">
          <Grid2 container spacing={4} className="w-full flex justify-evenly">
            {displayedBlogs?.map((blog) => (
              <Grid2 
                xs={12} // 1 column on extra-small screens
                sm={4}  // 2 columns on small screens and up
                key={blog._id}
                className="mx-auto"
              >
                <BlogCard blog={blog} onUpdate={handleinval} />
              </Grid2>
            ))}
          </Grid2>
          </div>
        </div>
        </div>

        <div className="w-full mx-auto min-h-[30rem] bg-blue-700 border-b-2 border-blue-900">
            <div className="w-full mt-20 text-center text-white text-6xl font-harmonique font-bold">
              What is this club?
            </div>
            <div className="flex justify-around items-center w-[95%] mx-auto mt-7 mb-20 text-white text-xl font-semibold">
              <div className="w-[40%] bg-red-300">
                <img
                  src={duo}
                  alt="logo"
                  className="w-full h-full"
                />
              </div>
              <div className="w-[50%] text-gray-300">
                <div>Oi oi, Jack and Will here.</div>
                <div className="mt-8">Webflail was born out of frustration. Frustration about how freelancing looked so damn easy according to social media but how hard it was in reality.</div>
                <div className="mt-8">Will, my brother is the mastermind behind the editing and just generally being a bright bloke while I ask the hard questions to bright Webflowers.</div>
                <div className="mt-3"><button className="text-2xl font-harmonique mt-3 rounded-md bg-orange-500 hover:bg-purple-800 text-black px-4">
                  <Link to="/about">
                    Read About
                  </Link>  
                </button></div>
              </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-[95%] mx-auto mt-10 mb-7">
          <div>
          <div className="flex flex-row space-x-4">
            <FaXTwitter fontSize={25}/>
            <FaInstagram fontSize={25}/>
            <FaFacebookSquare fontSize={25}/>
          </div>
          <div>
            © 2025 MAIS. All rights reserved.
          </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div>Found a bug?</div>
              <div><FaBug fontSize={20} /></div>
              <div>Help us improve</div>
              <div><FaTools fontSize={20} /></div>
            </div>
            <div>
              <div>26b_sain-orshikh.n@mongolaspiration.edu.mn</div>
              <div>26b_sayan.b@mongolaspiration.edu.mn</div>
              <div>27b_tsegts.a@mongolaspiration.edu.mn</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;