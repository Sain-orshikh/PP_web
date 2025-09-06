'use client';

import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import { TextEffect } from "@/components/ui/texteffect";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa";

import { PiMoneyFill } from "react-icons/pi";
import { GiAtom } from "react-icons/gi";
import { FaTree } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";
import { PiBirdFill } from "react-icons/pi";
import { MdOutlineScience } from "react-icons/md";
import {Button} from "@mui/material";
import SpotlightEffect from '@/components/SpotLight';
import FlashlightEffect from '@/components/Flashlight';

import { useQuery } from "@tanstack/react-query";
import { useAtom } from 'jotai';
import { flashlightModeAtom } from "@/components/ThemeAtom";
import { solarModeAtom } from '@/components/ThemeAtom';
import { darkModeAtom } from "@/components/ThemeAtom";

// Memoized components
const MemoizedTextEffect = memo(TextEffect);

const HeroSection = memo(function HeroSection() {
  return (
    <>
      <div className="w-[90%] sm:w-[50%] mx-auto mt-12">
        <MemoizedTextEffect
          per='char'
          delay={0.2}
          preset="blur"
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-semibold text-center tracking-tight text-black dark:text-white"
        >
          Portal to Projects
        </MemoizedTextEffect>
      </div>
    </>
  );
});

const HomePage: React.FC = () => {
  const [isSolarMode] = useAtom(solarModeAtom);
  const [isFlashLightMode] = useAtom(flashlightModeAtom);
  const [isDarkMode] = useAtom(darkModeAtom);

  const [bgImages] = useState<string[]>([
    "/assets/skybg.jpg",
    "/assets/ocean.jpg",
    "/assets/cliff.jpg",
    "/assets/moon.jpg",
    "/assets/city.jpg",
    "/assets/wood.jpg",
    "/assets/starry night.jpg"
  ]);
  const [selectedBg, setSelectedBg] = useState<string>(bgImages[0]);

  const projectIcons = [
    <MdOutlineScience key="science" className="w-12 h-12" />,
    <PiMoneyFill key="money" className="w-12 h-12" />,
    <GiAtom key="atom" className="w-12 h-12" />,
    <FaTree key="tree" className="w-12 h-12" />,
    <MdOutlineWaterDrop key="water" className="w-12 h-12" />,
    <PiBirdFill key="bird" className="w-12 h-12" />
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      // This function can be used later if needed
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch projects
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error as string);
      }
    },
  });

  // Fetch blogs
  useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error as string);
      }
    },
  });

  const handleBgChange = (image: string) => {
    setSelectedBg(image);
  };

  return (
    <>
      {isSolarMode && <SpotlightEffect />}
      {isFlashLightMode && <FlashlightEffect />}
      
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative">
          <HeroSection />
          
          {/* Background selector */}
          <div className="flex justify-center mt-8 space-x-2">
            {bgImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleBgChange(image)}
                className={`w-12 h-8 rounded border-2 ${selectedBg === image ? 'border-blue-500' : 'border-gray-300'} bg-cover bg-center`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        </div>

        {/* Main content section with background */}
        <div 
          className="flex-1 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${selectedBg})` }}
        >
          <div className="bg-black bg-opacity-50 min-h-full">
            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-6xl mx-auto">
              {/* Torn paper decorative elements */}
              <div className="absolute top-4 left-4">
                <img
                  src={isDarkMode ? "/assets/tornppr1.png" : "/assets/tornppr.png"}
                  alt="torn paper"
                  className="w-20 h-20 opacity-70"
                />
              </div>
              
              {/* Projects Section */}
              <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Explore Projects
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {projectIcons.map((icon, index) => (
                    <div key={index} className="flex justify-center text-blue-600 dark:text-blue-400">
                      {icon}
                    </div>
                  ))}
                </div>
                <Link href="/projects">
                  <Button 
                    variant="contained" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View All Projects
                  </Button>
                </Link>
              </div>

              {/* Blogs Section */}
              <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Latest Blogs
                </h2>
                <div className="mb-4">
                  <img
                    src="/assets/duo.jpg"
                    alt="blog preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <Link href="/blog">
                  <Button 
                    variant="contained" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Read Blogs
                  </Button>
                </Link>
              </div>
            </div>

            {/* Featured Content */}
            <div className="max-w-6xl mx-auto p-8">
              <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg p-6 shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                  Featured Content
                </h2>
                
                {/* Decorative image */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/assets/tornppr2.png"
                    alt="featured decoration"
                    className="w-32 h-32 opacity-80"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/create">
                    <Button variant="outlined" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Create Content
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outlined" className="border-green-600 text-green-600 hover:bg-green-50">
                      About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer section */}
            <footer className="bg-black bg-opacity-80 text-white p-8">
              <div className="max-w-6xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                  <img src="/assets/pp-logo.png" className="w-16 h-16" alt="pplogo"/>
                </div>
                <div className="flex justify-center space-x-6 mb-4">
                  <FaXTwitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="w-6 h-6 hover:text-pink-400 cursor-pointer" />
                  <FaFacebookSquare className="w-6 h-6 hover:text-blue-600 cursor-pointer" />
                </div>
                <p className="text-sm opacity-80">
                  © 2025 Portal to Projects. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;