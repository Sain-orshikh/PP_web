'use client';

import React from 'react';
import Link from 'next/link';

import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import toast from 'react-hot-toast';

import { solarModeAtom, flashlightModeAtom } from '../../components/ThemeAtom';
import { useAtom } from 'jotai';
import SpotlightEffect from '@/components/SpotLight';
import LaggingSpotlight from '@/components/Flashlight';
import ProjectCard from '@/components/ProjectCard';

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { TbLoader } from "react-icons/tb";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useState } from "react";

const ProjectPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = useState<string>('');
  
  const handleButtonClick = (category: string) => {
    setCategory(category);
    handleOpen();
  };

  const [isSolarMode] = useAtom(solarModeAtom);
  const [isFlashLightMode] = useAtom(flashlightModeAtom);

  const [visibleProjects, setVisibleProjects] = useState<number>(2);

  const handleShowMore = () => {
    setVisibleProjects(prev => prev + 2);
  };

  const displayedProjects: any[] = [];

  return (
    <>
      {isSolarMode && <SpotlightEffect />}
      {isFlashLightMode && <LaggingSpotlight />}
      <div className='flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
        <div className='flex flex-col justify-center items-center min-h-[18rem]'>
          <img
            src="/assets/hat3.png"
            alt="hand"
            className='w-[25%] dark:invert'
          />
          <div className='text-6xl font-harmonique font-bold mt-10 dark:text-white'>
            Student research hub
          </div>
        </div>

        {/* The photos from the process will be here */}
        <div className="w-full py-12 space-y-8">
          <InfiniteSlider duration={60} durationOnHover={80} className="h-full">
            <img src="/assets/pxlmoon.jpg" alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/skybg.jpg" alt="Sky Background" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/starry night.jpg" alt="Starry Night" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/wood.jpg" alt="Wood" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/ocean.jpg" alt="Ocean" className="w-[500px] h-[300px] object-cover rounded-lg" />
          </InfiniteSlider>
          <InfiniteSlider duration={60} reverse={true} durationOnHover={80} className="h-full">
            <img src="/assets/ocean.jpg" alt="Ocean" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/ocean.jpg" alt="Ocean" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/ocean.jpg" alt="Ocean" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/wood.jpg" alt="Wood" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src="/assets/ocean.jpg" alt="Ocean" className="w-[500px] h-[300px] object-cover rounded-lg" />
          </InfiniteSlider>
        </div>

        <div className='flex flex-col justify-evenly items-center w-[95%] mx-auto min-h-[24rem] my-5 px-5 pb-10 bg-white dark:bg-gray-800 rounded-[30px]'>
          <div className='text-6xl font-bold mt-20 mb-10 dark:text-white'>
            Project categories
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full justify-items-center my-3'>
            <div className="w-[90%] sm:w-full border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]">
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Physics")}}>
                  <img
                    src="/assets/physics1.png"
                    alt="Physics"
                    className="w-[90%] mx-auto"
                  />
                </button>
              </div>
              <div className='w-full flex flex-row md:flex-col lg:flex-row'>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-r border-t border-gray-300 dark:border-white rounded-r-none md:rounded-l-none lg:rounded-r-none lg:rounded-l-[30px] lg:rounded-t-none'>
                  <button onClick={() => {handleButtonClick("Physics")}}>
                    Physics
                  </button>
                </div>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-l border-t border-gray-300 dark:border-white rounded-l-none md:rounded-l-[30px] md:rounded-t-none lg:border-l-none lg:rounded-t-none lg:rounded-l-none'>
                  <button onClick={() => {handleButtonClick("Physics")}}>
                    0 projects
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]">
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Chemistry")}}>
                  <img
                    src="/assets/chemical-reaction.png"
                    alt="Chemistry"
                    className="w-[90%] mx-auto"
                  />
                </button>
              </div>
              <div className='w-full flex flex-row md:flex-col lg:flex-row'>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-r border-t border-gray-300 dark:border-white rounded-r-none md:rounded-l-none lg:rounded-r-none lg:rounded-l-[30px] lg:rounded-t-none'>
                  <button onClick={() => {handleButtonClick("Chemistry")}}>
                    Chemistry
                  </button>
                </div>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-l border-t border-gray-300 dark:border-white rounded-l-none md:rounded-l-[30px] md:rounded-t-none lg:border-l-none lg:rounded-t-none lg:rounded-l-none'>
                  <button onClick={() => {handleButtonClick("Chemistry")}}>
                    0 projects
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]">
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Biology")}}>
                  <img
                    src="/assets/biology1.png"
                    alt="Biology"
                    className="w-[90%] mx-auto"
                  />
                </button>
              </div>
              <div className='w-full flex flex-row md:flex-col lg:flex-row'>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-r border-t border-gray-300 dark:border-white rounded-r-none md:rounded-l-none lg:rounded-r-none lg:rounded-l-[30px] lg:rounded-t-none'>
                  <button onClick={() => {handleButtonClick("Biology")}}>
                    Biology
                  </button>
                </div>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-l border-t border-gray-300 dark:border-white rounded-l-none md:rounded-l-[30px] md:rounded-t-none lg:border-l-none lg:rounded-t-none lg:rounded-l-none'>
                  <button onClick={() => {handleButtonClick("Biology")}}>
                    0 projects
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]">
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Economy")}}>
                  <img
                    src="/assets/currency.png"
                    alt="Economy"
                    className="w-[90%] mx-auto"
                  />
                </button>
              </div>
              <div className='w-full flex flex-row md:flex-col lg:flex-row'>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-r border-t border-gray-300 dark:border-white rounded-r-none md:rounded-l-none lg:rounded-r-none lg:rounded-l-[30px] lg:rounded-t-none'>
                  <button onClick={() => {handleButtonClick("Economy")}}>
                    Economy
                  </button>
                </div>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-l border-t border-gray-300 dark:border-white rounded-l-none md:rounded-l-[30px] md:rounded-t-none lg:border-l-none lg:rounded-t-none lg:rounded-l-none'>
                  <button onClick={() => {handleButtonClick("Economy")}}>
                    0 projects
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]">
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Environment")}}>
                  <img
                    src="/assets/planet-earth.png"
                    alt="Environment"
                    className="w-[90%] mx-auto"
                  />
                </button>
              </div>
              <div className='w-full flex flex-row md:flex-col lg:flex-row'>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-r border-t border-gray-300 dark:border-white rounded-r-none md:rounded-l-none lg:rounded-r-none lg:rounded-l-[30px] lg:rounded-t-none'>
                  <button onClick={() => {handleButtonClick("Environment")}}>
                    Environment
                  </button>
                </div>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-l border-t border-gray-300 dark:border-white rounded-l-none md:rounded-l-[30px] md:rounded-t-none lg:border-l-none lg:rounded-t-none lg:rounded-l-none'>
                  <button onClick={() => {handleButtonClick("Environment")}}>
                    0 projects
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]">
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Society")}}>
                  <img
                    src="/assets/society.png"
                    alt="Society"
                    className="w-[90%] mx-auto"
                  />
                </button>
              </div>
              <div className='w-full flex flex-row md:flex-col lg:flex-row'>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-r border-t border-gray-300 dark:border-white rounded-r-none md:rounded-l-none lg:rounded-r-none lg:rounded-l-[30px] lg:rounded-t-none'>
                  <button onClick={() => {handleButtonClick("Society")}}>
                    Society
                  </button>
                </div>
                <div className='flex justify-center overflow-auto dark:text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl py-2 font-bold w-[50%] md:w-[100%] lg:w-[50%] bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-b-[30px] border-l border-t border-gray-300 dark:border-white rounded-l-none md:rounded-l-[30px] md:rounded-t-none lg:border-l-none lg:rounded-t-none lg:rounded-l-none'>
                  <button onClick={() => {handleButtonClick("Society")}}>
                    0 projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white border-t border-white dark:border-black mt-3 dark:bg-black">
          <div className="flex flex-col sm:flex-row justify-between w-[85%] sm:w-[95%] mx-auto mt-7 mb-7">
            <div className="w-full">
              <div className="flex flex-row space-x-4 text-black dark:text-white">
                <FaXTwitter fontSize={30}/>
                <FaInstagram fontSize={30}/>
                <FaFacebookSquare fontSize={30}/>
              </div>
              <div className="mt-5 text-lg text-black dark:text-white">
                2025 MAIS. All rights reserved.
              </div>
            </div>
            <div className="flex flex-col w-full mt-5 sm:mt-0">
              <div className="ml-0 sm:ml-auto">
                <div className="flex flex-row text-md xs:text-xl space-x-2 items-center text-black dark:text-white">
                  <div>Found a bug?</div>
                  <div><FaBug fontSize={20} /></div>
                  <div className="ml-2">Help us improve</div>
                  <div><FaTools fontSize={20} /></div>
                </div>
                <div className="space-y-1 mt-3 text-md sm:mt-1 text-black dark:text-white">
                  <div>26b_sain-orshikh.n@mongolaspiration.edu.mn</div>
                  <div>26b_sayan.b@mongolaspiration.edu.mn</div>
                  <div>27b_tsegts.a@mongolaspiration.edu.mn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        scroll="paper"
      >
        <DialogTitle className='bg-white dark:bg-black'>
          <span className='text-4xl font-bold dark:text-white'>
            {category}
          </span>
        </DialogTitle>
        <DialogContent dividers className='dark:bg-gray-900'>
          <div className='w-full flex justify-evenly'>
            <div>
              <ProjectCard project={{}} bg="" />  
            </div>
            <div>
              <ProjectCard project={{}} bg="" />  
            </div>
          </div>
          <div className='flex flex-row justify-center w-full mt-5'>
            <div className='rounded-md hover:bg-gray-200'>
              <button onClick={handleShowMore} className="flex flex-row items-center bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 rounded px-2 py-1.5 text-white">
                <span className='capitalize text-white dark:text-black text-lg'>Load more</span>
                <span className='text-white dark:text-black ml-1'><TbLoader fontSize={25}/></span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProjectPage
