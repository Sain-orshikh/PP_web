'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { Button, Box, Table, TableRow, Typography, TableHead, TableBody } from '@mui/material'
import BlogCard from '../../components/BlogCard';
import { TbLoader } from "react-icons/tb";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SpotlightEffect from '@/components/SpotLight';
import { useAtom } from 'jotai';
import { solarModeAtom } from '../../components/ThemeAtom';
import { flashlightModeAtom } from '@/components/ThemeAtom';
import LaggingSpotlight from '@/components/Flashlight';
import TransitionAnimation from '@/components/TransitionAnimation';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  imageurl?: string;
  createdAt: string;
  ownerId: {
    _id: string;
    username: string;
  };
}

interface BlogsData {
  data: Blog[];
}

const BlogPage: React.FC = () => {
  const queryClient = useQueryClient();

  const {data: blogs} = useQuery<BlogsData>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: true,
  });
  
  const Blogs = blogs?.data;

  console.log("Blogs data:", Blogs);
  const [visibleBlogs, setVisibleBlogs] = useState<number>(6);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum) => prevNum + 6);
  };

  let displayedBlogs: Blog[] = [];

  if(Blogs){
    displayedBlogs = [...Blogs].slice(0, visibleBlogs);
  }

  const [isSolarMode] = useAtom(solarModeAtom);
  const [isFlashlightMode] = useAtom(flashlightModeAtom);

  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 200);
  }, []);

  return (
    <>
    <TransitionAnimation>Blog</TransitionAnimation>
      {render && (
      <>
      <Box className="flex flex-col justify-between w-full min-h-screen bg-gray-100 dark:bg-gray-900 pt-3">
        <Table>
          <TableHead>
            <TableRow className='h-[10rem]'>
              <div className='flex justify-center items-center h-[10rem] mt-10'>
                {/*<div
                  className="w-[75rem] h-[10rem] bg-center bg-cover flex justify-center items-center"
                  style={{ backgroundImage: `url(/assets/starry night.jpg)` }}
                >
                  <h1 className="text-white text-4xl font-bold">Welcome to My Website</h1>
                </div>*/}
                <div className='flex items-center w-[90%] h-[10rem] rounded bg-blue-500 bg-cover bg-center' style={{ backgroundImage: `url(/assets/starry night.jpg)` }}>
                  <h1 className='w-[80%] ml-auto text-white text-4xl sm:text-5xl font-bold mt-10'>Read Our Blog</h1>
                </div>
                {isSolarMode && (<SpotlightEffect />)}
                {isFlashlightMode && (<LaggingSpotlight />)}
              </div>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            <TableRow className='h-[5rem]'>
              <div className='flex flex-row items-center justify-between w-[80%] mx-auto mt-10'>
                <div className='flex mx-auto text-4xl sm:text-5xl text-black dark:text-white'>
                  Latest Blog Posts
                </div>
              </div>
            </TableRow>
            <TableRow className='h-[3rem]'>
              <div className='flex w-[80%] mx-auto mt-5 '>
                <div className='mx-auto text-center'>
                  <Typography variant='h6' className='text-gray-700 dark:text-gray-300'>
                   Discover our latest thoughts, ideas and insights about MAIS
                  </Typography>
                </div>
              </div>
            </TableRow>
            {Blogs && (<TableRow>
              <div className='flex flex-row justify-evenly space-around w-[90%] mx-auto mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-[290px]'>
                  {displayedBlogs.map((blog) => (
                  <div 
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} onUpdate={handleinval} />
                  </div>
                  ))}
                </div>
              </div>
            </TableRow>)}
            {Blogs && visibleBlogs < Blogs.length && (
            <TableRow>
              <div className='flex flex-row justify-center w-full mt-6'>
                <div className='bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 rounded'><Button onClick={handleLoadMore}>
                  <span className='capitalize text-white dark:text-black text-lg'>Load more</span>
                  <span className='text-white dark:text-black ml-1'><TbLoader fontSize={25}/></span>
                </Button></div>
              </div>
            </TableRow>
            )}
            {Blogs === undefined && (
              <div className='flex flex-row justify-center w-full mt-10 text-2xl dark:text-white'>
                No blogs found, <button className='text-blue-600 ml-1'><Link href={'/create/blog'}> Create One!</Link></button>
              </div>
            )}
            <TableRow>
              <div className='w-full bg-red-300 mt-10'>
                {/*This is footer bar*/}
              </div>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      {/*<div className='flex flex-row h-[5rem] w-full bg-white'></div>*/}
      </>
    )}
    </>
  )
}

export default BlogPage
