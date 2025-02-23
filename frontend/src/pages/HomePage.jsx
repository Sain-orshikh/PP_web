import React, { useEffect, useState, memo } from "react";
import { data, Link } from "react-router-dom";
import { TextEffect } from "@/components/ui/texteffect";
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import tornppr from "../assets/tornppr.png";
import tornppr1 from "../assets/tornppr1.png";
import tornppr2 from "../assets/tornppr2.png";
import duo from "../assets/duo.jpg";
import pplogo from "../assets/pp-logo.png";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

import { PiMoneyFill } from "react-icons/pi";
import { GiAtom } from "react-icons/gi";
import { FaTree } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";
import { PiBirdFill } from "react-icons/pi";
import { MdOutlineScience } from "react-icons/md";
import { TbLoader } from "react-icons/tb";
import {Button} from "@mui/material";
import SpotlightEffect from '@/components/SpotLight';
import FlashlightEffect from '@/components/Flashlight';

import { AnimatedGroup } from "@/components/ui/animateimage";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Grid2 } from "@mui/material";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAtom } from 'jotai';
import { flashlightModeAtom } from "@/components/ThemeAtom";
import { solarModeAtom } from '@/components/ThemeAtom';
import { darkModeAtom } from "@/components/ThemeAtom";

// Memoized components
const MemoizedTextEffect = memo(TextEffect);

const HeroSection = memo(() => (
  <>
    <div className="w-[90%] sm:w-[50%] mx-auto mt-12">
      <MemoizedTextEffect
        per='char'
        delay={0.2}
        preset="blur"
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: { duration: 0.2 }
            }
          }
        }}
        className={`text-5xl sm:text-6xl text-black dark:text-white font-harmonique font-bold text-center`}
      >
        MAIS's Largest Research Organization
      </MemoizedTextEffect>
    </div>
    <div className="w-[90%] sm:w-[35%] mx-auto mt-3 text-center">
      <MemoizedTextEffect
        per='char'
        delay={0.2}
        preset="blur"
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: { duration: 0.1 }
            }
          }
        }}
        className={`text-gray-700 dark:text-gray-300 text-xl font-semibold`}
      >
        We are dedicated to promoting interest in scientific research among the students of MAIS.
      </MemoizedTextEffect>
    </div>
  </>
));

const MemoizedDialog = memo(({ variants, transition, email, onEmailChange, onSubmit }) => (
  <Dialog variants={variants} transition={transition}>
    <DialogTrigger className='bg-zinc-950 px-4 py-2 text-white text-xl hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-xl'>
      Join our club
    </DialogTrigger>
    <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
      <DialogHeader>
        <DialogTitle className='text-zinc-900 text-center dark:text-white text-3xl'>
          Join the aspiring researchers
        </DialogTitle>
        <DialogDescription className='text-zinc-600 mt-1 text-center dark:text-zinc-400 text-xl'>
          Enter your email address to join our club.
        </DialogDescription>
      </DialogHeader>
      <div className='mt-1 flex flex-col space-y-4'>
        <label htmlFor='name' className='sr-only'>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          id='name'
          type='email'
          className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
          placeholder='Enter your email'
        />
        <button
          className='inline-flex items-center justify-center self-end rounded-lg bg-black px-4 py-1 text-lg font-medium text-zinc-50 dark:bg-white dark:text-zinc-900'
          type='submit'
          onClick={() => onSubmit(email)}
        >
          Join now
        </button>
      </div>
    </DialogContent>
  </Dialog>
));

function HomePage() {

  const [notifyemail, setNotifyemail] = useState('');

  const customVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 40,
    },
  };

  const customTransition = {
    type: 'spring',
    bounce: 0,
    duration: 0.25,
  };

  const [Scramble, setScramble] = useState(false);
  const handleScramble = () => {
    setScramble(!Scramble);
  }

  const [isDarkMode, setDarkMode] = useAtom(darkModeAtom);
  const [isSolarMode, setSolarMode] = useAtom(solarModeAtom);
  const [isFlashlightMode, setFlashlightMode] = useAtom(flashlightModeAtom);

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  };

  const {data:blogs} = useQuery({queryKey: ['blogs']});

  const Blogs = blogs?.data;

  let displayedBlogs = [];

  const [visibleBlogs, setVisibleBlogs] = useState(3);

  if(blogs){
    displayedBlogs = [...Blogs].slice(0, visibleBlogs);
  }

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum) => prevNum + 3);
  };

  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  const handleSubmit = async (email) => {
    if (!email || email.trim() === '') {
      toast.error('Please enter your email address');
      return;
    }

    // email format shalgadag ym 
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const schoolRegex = /^[^\s@]+@mongolaspiration\.edu\.mn$/;
    if (!(emailRegex.test(email) || schoolRegex.test(email))) {
      toast.error('Please enter a valid Gmail or School email address');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/joins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gmail: email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Thank you for joining our club! We will soon notify you with updates');
        setNotifyemail(''); 
      } else {
        toast.error(data.message || 'Failed to join');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to server');
    }
  };

  return (
    <>
      {isSolarMode && !isFlashlightMode && (<SpotlightEffect />)}
      {isFlashlightMode && !isSolarMode && (<FlashlightEffect />)}
      <div className='flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
        <HeroSection />
        <div className="w-[90%] sm:w-[30%] mx-auto mt-5 flex justify-center">
          <MemoizedDialog 
            variants={customVariants} 
            transition={customTransition}
            email={notifyemail}
            onEmailChange={setNotifyemail}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="w-[90%] sm:w-[45%] mx-auto mt-10 mb-10 text-black dark:text-gray-300">
          <InfiniteSlider className={`w-full`} gap={100} autoPlay={true} autoPlaySpeed={3000}
            style={{
              maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)"
            }}
          >
            <PiMoneyFill fontSize={30}/>
            <MdOutlineScience fontSize={30}/>
            <FaTree fontSize={30}/>
            <MdOutlineWaterDrop fontSize={30}/>
            <PiBirdFill fontSize={30}/>
          </InfiniteSlider>
        </div>

        <div className="w-full mx-auto min-h-[30rem] bg-gray-100 dark:bg-gray-900">
          <div className="w-[95%] mx-auto mt-5">
          <div className="flex flex-row justify-between">
            <div className="text-5xl sm:text-6xl font-harmonique font-bold text-black dark:text-white">
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
                          duration: 0.1,
                        },
                      },
                    },
                  }}
              >
                Projects
              </TextEffect>
            </div>
            <div>
              <AnimatedGroup>
              <button className={`text-2xl font-harmonique mt-3 rounded-md bg-orange-500 hover:bg-purple-700 text-black px-4`}>
                <Link to={"/project"}>
                    See All Projects
                </Link>
              </button>
              </AnimatedGroup>
            </div>
          </div>
          <div className="text-black dark:text-white text-xl font-semibold mt-5 text-center sm:text-start">
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
                          duration: 0.1,
                        },
                      },
                    },
                  }}
            >
              The researh projects of MAIS students
            </TextEffect>
          </div>
          <div className="w-full my-5">
          <Carousel>
        <CarouselContent className="-ml-4 pb-5 flex">
          {/* Wrapping the ProjectCards in CarouselItems while maintaining Grid2 layout */}
          {[...Array(6)].map((_, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 pl-4">
              <Grid2 container spacing={4} className="w-full flex justify-evenly">
                <ProjectCard />
              </Grid2>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          className="absolute -bottom-10 sm:-bottom-16 left-auto right-5 top-auto w-full justify-end gap-2"
          classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
          alwaysShow
        />
      </Carousel>
          </div>
        </div>
        <div className="w-full bg-black dark:bg-gray-900">
          <img
            src={isDarkMode ? tornppr1 : tornppr}
            alt="torn paper"
            className="w-full h-full object-cover"
          />
        </div>
        </div>
        
        <div className="w-full mx-auto min-h-[30rem] bg-black dark:bg-gray-100">
          <div className="w-[95%] mx-auto mt-7">
          <div className="flex flex-row justify-between">
            <div className="text-5xl sm:text-6xl font-harmonique font-bold text-white dark:text-black">
              Blogs
            </div>
            <div>
              <button className={`text-2xl font-harmonique mt-3 rounded-md bg-orange-500 hover:bg-purple-700 text-black px-4`}>
                <Link to={"/blogs"}>
                    See All Blogs
                </Link>
              </button>
            </div>
          </div>
          <div className="text-white dark:text-black text-xl font-semibold mt-5 text-center sm:text-start">
            Gain insight into the minds of MAIS students
          </div>
          <div className='flex flex-row justify-evenly w-[95%] mx-auto mt-10'>
            {isDarkMode && (<div className='text-black'><Grid2 container spacing={10} columns={12} minHeight={250}>
                  {displayedBlogs.map((blog) => (
                  <Grid2 
                    xs={12} // 1 column on extra-small screens
                    sm={4}  // 2 columns on small screens and up
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} onUpdate={handleinval} inhomepage={true}/>
                  </Grid2>
                  ))}
                </Grid2></div>
              )}
            {!isDarkMode && (<div className='text-white'><Grid2 container spacing={10} columns={12} minHeight={250}>
                  {displayedBlogs.map((blog) => (
                  <Grid2 
                    xs={12} // 1 column on extra-small screens
                    sm={4}  // 2 columns on small screens and up
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} onUpdate={handleinval} />
                  </Grid2>
                  ))}
                </Grid2></div>
              )}
              </div>
              {Blogs && visibleBlogs < Blogs?.length && (
              <div className='flex flex-row justify-center w-full mt-3'>
                <div className='rounded-md hover:bg-gray-900'>
                <button onClick={handleLoadMore} className="flex flex-row items-center bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1.5 text-white">
                  <span className='capitalize text-black dark:text-white text-lg'>Load more</span>
                  <span className='text-black dark:text-white ml-1'><TbLoader fontSize={25}/></span>
                </button></div>
              </div>
              )}
        </div>
        <div className="w-full bg-black dark:bg-gray-900">
          <img
            src={isDarkMode ? tornppr : tornppr1}
            alt="torn paper"
            className="w-full h-full object-cover"
          />
        </div>
        </div>

        <div className="flex flex-col w-full mx-auto min-h-[30rem] bg-gray-100 dark:bg-gray-900">
            <div className="w-full mt-0 sm:mt-10 text-center text-black dark:text-white text-5xl sm:text-6xl font-harmonique font-bold">
              What is this club?
            </div>
            <div className="flex flex-col sm:flex-row justify-around items-center w-[95%] mx-auto mt-7 mb-20 text-white text-xl font-semibold">
              <div className="w-[90%] sm:w-[40%] bg-red-300">
                <img
                  src={duo}
                  alt="logo"
                  className="w-full h-full"
                />
              </div>
              <div className="w-[90%] sm:w-[50%] mt-3 sm:mt-0 text-gray-700 dark:text-gray-200">
                <div>Oi oi, Jack and Will here.</div>
                <div className="mt-8">Webflail was born out of frustration. Frustration about how freelancing looked so damn easy according to social media but how hard it was in reality.</div>
                <div className="mt-8">Will, my brother is the mastermind behind the editing and just generally being a bright bloke while I ask the hard questions to bright Webflowers.</div>
                <div className="mt-3"><button className="text-2xl font-harmonique mt-3 rounded-md bg-orange-500 hover:bg-purple-700 text-black px-4">
                  <Link to="/about">
                    Read About
                  </Link>  
                </button></div>
              </div>
            </div>
            {/*<div className="w-full h-[17rem] bg-black">
              <img
                src={tornppr2}
                alt="torn paper"
                className="w-full h-full object-cover"
              />
            </div>*/}
        </div>
        <div className="w-full bg-black dark:bg-gray-100 border-t border-white">
          <div className="flex flex-col sm:flex-row justify-between w-[85%] sm:w-[95%] mx-auto mt-7 mb-7">
            <div className="w-full">
              <div className="flex flex-row space-x-4 text-white dark:text-black">
                <FaXTwitter fontSize={30}/>
                <FaInstagram fontSize={30}/>
                <FaFacebookSquare fontSize={30}/>
              </div>
              <div className="mt-5 text-lg text-white dark:text-black">
                2025 MAIS. All rights reserved.
              </div>
            </div>

            {/*<div className="flex flex-row w-full h-16 mt-3 sm:mt-0 items-center bg-inherit mx-auto">
              <div className="mx-0 sm:mx-auto flex flex-row">
                <img src={pplogo} className="w-16 h-16" alt="pplogo"/>
                <div className="ml-1">
                  <div className="text-white dark:text-black text-2xl font-semibold">
                    Passion Project
                  </div>
                  <p className="text-white dark:text-black mt-1 text-md">
                    2025 Passion Project club
                  </p>
                </div>
              </div>
            </div>*/}

            <div className="flex flex-col w-full mt-5 sm:mt-0">
              <div className="ml-0 sm:ml-auto">
                <div className="flex flex-row text-xl space-x-2 items-center text-white dark:text-black">
                  <div>Found a bug?</div>
                  <div><FaBug fontSize={20} /></div>
                  <div className="ml-2">Help us improve</div>
                  <div><FaTools fontSize={20} /></div>
                </div>
                <div className="space-y-1 mt-3 text-md sm:mt-1 text-white dark:text-black">
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
  );
}

export default HomePage;