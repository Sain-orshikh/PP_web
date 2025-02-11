import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { TextEffect } from "@/components/ui/texteffect";

import tornppr from "../assets/tornppr.png";
import tornppr1 from "../assets/tornppr1.png";
import tornppr2 from "../assets/tornppr2.png";
import duo from "../assets/duo.jpg";
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

import { AnimatedGroup } from "@/components/ui/animateimage";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Grid2 } from "@mui/material";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function HomePage() {

  const {mutate: addEmail} = useMutation({
    mutationFn: async (email) => {
      try {
        const res = await fetch('/api/notifyuser/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
        return data;

      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Email added successfully');
      setNotifyemail('');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [Scramble, setScramble] = useState(false);
  const handleScramble = () => {
    setScramble(!Scramble);
  }

  const [notifyemail, setNotifyemail] = useState('');

  const {data:blogs} = useQuery({queryKey: ['blogs']});

  const Blogs = blogs?.data;

  let displayedBlogs = [];

  if(blogs){
    displayedBlogs = [...Blogs].slice(0, 3);
  }

  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  const handleSubmit = async (email) => {
    addEmail(email);
  };

  return (
    <>
      <div className='flex flex-col w-full min-h-screen bg-gray-100'>
        <div className="w-[90%] sm:w-[40%] mx-auto mt-12">
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
          className={`text-5xl sm:text-6xl font-harmonique font-bold text-center`}
        >
          Peek into the world of MAIS students
        </TextEffect>
        </div>
        <div className="w-[90%] sm:w-[40%] mx-auto mt-3 text-center">
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
            className={`text-gray-700 text-xl font-semibold`}
          >
            Be notified of our 20+ student researchers in their journey, to follow along in their route to a scientific discovery.
          </TextEffect>
        </div>
        <div className="w-[90%] sm:w-[30%] mx-auto mt-5 space-x-2 flex justify-center">
          <AnimatedGroup className={`w-[70%]`}>
          <input
            value={notifyemail}
            onChange={(e) => setNotifyemail(e.target.value)}
            placeholder="Email"
            className="w-full h-[2.5rem] text-black p-2 text-lg rounded-md border border-gray-300"
          />
          </AnimatedGroup>
          <AnimatedGroup className={`w-[25%]`}>
          <button className="w-full h-[2.5rem] bg-orange-500 hover:bg-purple-700 text-black font-harmonique text-lg rounded-md" onClick={() => {handleSubmit(notifyemail)}}>
            <span className="text-xl">
              Submit
            </span>
          </button>
          </AnimatedGroup>
        </div>
        <div className="w-[90%] sm:w-[45%] mx-auto mt-10 mb-10">
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

        <div className="w-full mx-auto min-h-[30rem] bg-gray-100">
          <div className="w-[95%] mx-auto mt-5">
          <div className="flex flex-row justify-between">
            <div className="text-5xl sm:text-6xl font-harmonique font-bold text-black">
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
                <Link to={"/projects"}>
                    See All Projects
                </Link>
              </button>
              </AnimatedGroup>
            </div>
          </div>
          <div className="text-black text-xl font-semibold mt-5 text-center sm:text-start">
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
              The brilliant researh projects of MAIS students
            </TextEffect>
          </div>
          <div className="w-full my-5">
          <Grid2 container spacing={4} className="w-full flex justify-evenly">
            <Grid2 xs={12} sm={6} md={4}>
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
        <div className="w-full h-[15rek] bg-black">
          <img
            src={tornppr}
            alt="torn paper"
            className="w-full h-full object-cover"
          />
        </div>
        </div>
        
        <div className="w-full mx-auto min-h-[30rem] bg-black">
          <div className="w-[95%] mx-auto mt-7">
          <div className="flex flex-row justify-between">
            <div className="text-5xl sm:text-6xl font-harmonique font-bold text-white">
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
          <div className="text-white text-xl font-semibold mt-5 text-center sm:text-start">
            Gain insight into the minds of MAIS students
          </div>
          <div className="w-full my-5">
          <Grid2 container spacing={4} className="w-full flex justify-evenly">
            {displayedBlogs?.map((blog) => (
              <Grid2 
                xs={12} // 1 column on extra-small screens
                sm={4}  // 2 columns on small screens and up
                key={blog._id}
                className="mx-auto text-white"
              >
                <BlogCard blog={blog} onUpdate={handleinval} />
              </Grid2>
            ))}
          </Grid2>
          </div>
        </div>
        <div className="w-full h-[15rem] bg-black">
          <img
            src={tornppr1}
            alt="torn paper"
            className="w-full h-full object-cover"
          />
        </div>
        </div>

        <div className="flex flex-col w-full mx-auto min-h-[30rem] bg-gray-100">
            <div className="w-full mt-0 sm:mt-10 text-center text-black text-5xl sm:text-6xl font-harmonique font-bold">
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
              <div className="w-[90%] sm:w-[50%] mt-3 sm:mt-0 text-gray-700">
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
        <div className="w-full bg-black border-t border-white">
          <div className="flex flex-col sm:flex-row justify-between w-[95%] mx-auto mt-7 mb-7">
            <div className="mx-8 sm:mx-0">
              <div className="flex flex-row space-x-4 text-white">
                <FaXTwitter fontSize={30}/>
                <FaInstagram fontSize={30}/>
                <FaFacebookSquare fontSize={30}/>
              </div>
              <div className="mt-5 text-lg text-white">
                © 2025 MAIS. All rights reserved.
              </div>
            </div>
            
            <div className="flex flex-col mt-3 sm:mt-0 mx-auto sm:mx-0">
              <div className="flex flex-row text-lg space-x-2 items-center text-white">
                <div>Found a bug?</div>
                <div><FaBug fontSize={20} /></div>
                <div className="ml-2">Help us improve</div>
                <div><FaTools fontSize={20} /></div>
              </div>
              <div className="space-y-1 mt-3 sm:mt-1 text-white">
                <div>26b_sain-orshikh.n@mongolaspiration.edu.mn</div>
                <div>26b_sayan.b@mongolaspiration.edu.mn</div>
                <div>27b_tsegts.a@mongolaspiration.edu.mn</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;