import React from 'react';

import { Grid2 } from '@mui/material';
import toast from 'react-hot-toast';

import { solarModeAtom, flashlightModeAtom } from '@/components/ThemeAtom';
import { useAtom } from 'jotai';
import SpotlightEffect from '@/components/SpotLight';
import LaggingSpotlight from '@/components/FlashLight';

import tropiccity from "../assets/tropiccity.jpg";
import hat from "../assets/hat2.png";
import pxlmoon from "../assets/pxlmoon.jpg";
import skybg from "../assets/skybg.jpg";
// Using string path to avoid image optimization issues
const tornppr = "/assets/starry-night.jpg";
import wood from "../assets/wood.jpg";
import ocean from "../assets/ocean.jpg";
import economy from "../assets/currency.png";

import biology from "../assets/biology1.png";
import chemistry from "../assets/chemical-reaction.png";
import physics from "../assets/physics1.png";
import environment from "../assets/planet-earth.png";
import society from "../assets/society.png";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

import { InfiniteSlider } from "../components/ui/infinite-slider";

const ProjectPage = () => {

  const handleButtonClick = (category) => {
    toast.success(`Clicked on ${category}`);
  };

  const [isSolarMode] = useAtom(solarModeAtom);
  const [isFlashLightMode] = useAtom(flashlightModeAtom);

  return (
    <>
      {isSolarMode && <SpotlightEffect />}
      {isFlashLightMode && <LaggingSpotlight />}
      <div className='flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
        <div className='flex flex-col justify-center items-center min-h-[18rem]'>
          <img
            src={hat}
            alt="hand"
            className='w-[25%] dark:invert'
          />
          <div className='text-6xl font-harmonique font-bold mt-10 dark:text-white'>
            Student research hub
          </div>
        </div>

        {/* The photos from the process will be here */}
        <div className="w-full py-12 space-y-8">
          <InfiniteSlider duration={60}>
            <img src={pxlmoon} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={skybg} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={tornppr} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={wood} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={ocean} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
          </InfiniteSlider>
          <InfiniteSlider duration={60} reverse={true}>
            <img src={ocean} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={ocean} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={ocean} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={wood} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={ocean} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
          </InfiniteSlider>
        </div>

        <div className='flex flex-col justify-evenly items-center w-[95%] mx-auto min-h-[24rem] my-5 px-5 pb-10 bg-white dark:bg-gray-800 rounded-[30px]'>
          <div className='text-6xl font-bold mt-20 mb-10 dark:text-white'>
            Project categories
          </div>
          <Grid2 container spacing={4} columns={12} className='w-full justify-evenly my-3'>
            <Grid2 className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]" xs={12} sm={4}>
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Physics")}}>
                  <img
                    src={physics}
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
            </Grid2>
            <Grid2 className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]" xs={12} sm={4}>
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Chemistry")}}>
                  <img
                    src={chemistry}
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
            </Grid2>
            <Grid2 className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]" xs={12} sm={4}>
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Biology")}}>
                  <img
                    src={biology}
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
            </Grid2>
            <Grid2 className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]" xs={12} sm={4}>
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Economy")}}>
                  <img
                    src={economy}
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
            </Grid2>
            <Grid2 className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]" xs={12} sm={4}>
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Environment")}}>
                  <img
                    src={environment}
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
            </Grid2>
            <Grid2 className="w-[90%] sm:w-[30%] border border-gray-300 dark:border-white shadow-sm dark:shadow-xl rounded-[30px]" xs={12} sm={4}>
              <div className='w-full text-white p-6'>
                <button className='w-full' onClick={() => {handleButtonClick("Society")}}>
                  <img
                    src={society}
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
            </Grid2>
          </Grid2>
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
                <div className="flex flex-row text-xl space-x-2 items-center text-black dark:text-white">
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
    </>
  )
}

export default ProjectPage
