import React from 'react';
import tropiccity from "../assets/tropiccity.jpg";
import hat from "../assets/hat2.png";
import pxlmoon from "../assets/pxlmoon.jpg";
import skybg from "../assets/skybg.jpg";
import tornppr from "../assets/starry night.jpg";
import wood from "../assets/wood.jpg";
import ocean from "../assets/ocean.jpg";

import biology from "../assets/leave.png";
import chemistry from "../assets/chemical-reaction.png";
import physics from "../assets/atom.png";
import economy from "../assets/economy.png";
import environment from "../assets/planet-earth.png";

import { InfiniteSlider } from "../components/ui/infinite-slider";

const ProjectPage = () => {

  return (
    <>
      <div className='flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
        <div className='flex flex-col justify-center items-center min-h-[18rem]'>
          <img
            src={hat}
            alt="hand"
            className='w-[25%]'
          />
          <div className='text-5xl font-harmonique font-bold mt-10'>
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
            <img src={pxlmoon} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={skybg} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={tornppr} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={wood} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
            <img src={ocean} alt="Pixel Moon" className="w-[500px] h-[300px] object-cover rounded-lg" />
          </InfiniteSlider>
        </div>

        <div className='flex flex-row justify-evenly items-center w-full h-[24rem] mt-5' style={{backgroundImage: `url(${tropiccity})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          <div className='w-[15%]'>
            <img
            src={physics}
            alt="Physics"
            className="w-full"
            />
            <div className='flex justify-center text-3xl font-bold'>
              Physics
            </div>
          </div>
          <div className='w-[15%]'>
            <img
            src={biology}
            alt="Biology"
            className="w-full"  
            />
            <div className='flex justify-center'>
              Biology
            </div>
          </div>
          <div className='w-[15%]'>
            <img
            src={chemistry}
            alt="Chemistry"
            className="w-full"
            />
            <div className='flex justify-center'>
              Chemistry
            </div>
          </div>
          <div className='w-[15%]'>
            <img
            src={economy}
            alt="Economy"
            className="w-full"
            />
            <div className='flex justify-center'>
              Economy
            </div>
          </div>
          <div className='w-[15%]'>
            <img
            src={environment}
            alt="Environment"
            className="w-full"
            />
            <div className='flex justify-center'>
              Environment
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectPage