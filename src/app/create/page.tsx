'use client';

import { useState } from 'react';
import { ButtonGroup, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
import { solarModeAtom } from '../../components/ThemeAtom';
import SpotlightEffect from '@/components/SpotLight';
import LaggingSpotlight from '@/components/Flashlight';
import { flashlightModeAtom } from '@/components/ThemeAtom';

interface AuthUser {
  _id: string;
  username: string;
  [key: string]: any;
}

const CreatePage: React.FC = () => {
  const {data: authUser} = useQuery<AuthUser>({queryKey: ["authUser"]});

  const queryClient = useQueryClient();

  const checkAuth = () => {
    if (authUser) {
      toast.success("You are authorized to access this page");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    } else {
      toast.error("You are not authorized to access this page");
    }
  };

  const [isSolarMode] = useAtom(solarModeAtom);
  const [isFlashlightMode] = useAtom(flashlightModeAtom);

  return (
    <>
      {isSolarMode && <SpotlightEffect />}
      {isFlashlightMode && <LaggingSpotlight />}
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
        {/* First Section - Project */}
        <div
          className="group relative w-full md:w-[50%] h-[50%] md:h-full bg-no-repeat bg-center transition-all duration-300 hover:w-[55%] overflow-hidden"
          style={{
            backgroundImage: `url(/assets/orangeproject_bg.png)`,
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h2 className="text-white text-5xl font-bold mb-4">Create Project</h2>
            <p className="text-gray-200 text-xl max-w-md mx-auto mb-4">Start your new project journey</p>
            <Button onClick={checkAuth}>
              <Link href="/create/project" className="bg-white text-black px-4 py-2 font-semibold transition-all duration-300 hover:bg-gray-100 rounded normal-case">
                Get Started ➔
              </Link>
            </Button>
          </div>
        </div>

        {/* Second Section - Blog */}
        <div
          className="group relative w-full md:w-[50%] h-[50%] md:h-full bg-no-repeat bg-center transition-all duration-300 hover:w-[55%] overflow-hidden"
          style={{
            backgroundImage: `url(/assets/blogbg.jpg)`,
            backgroundSize: 'cover', 
          }}
        >
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h2 className="text-white text-5xl font-bold mb-4">Create Blog</h2>
            <p className="text-gray-200 text-xl max-w-md mx-auto mb-4">Share your thoughts and stories</p>
            <Button onClick={checkAuth}>
              <Link href="/create/blog" className="bg-white text-black px-4 py-2 font-semibold transition-all duration-300 hover:bg-gray-100 rounded normal-case">
                Start Writing 🖋
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePage;
