import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Box, Table, TableRow, Typography, TableHead, TableBody, Grid2 } from '@mui/material'
import BGpic from "../assets/starry night.jpg"
import BlogCard from '../components/BlogCard';
import { TbLoader } from "react-icons/tb";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SpotlightEffect from '@/components/SpotLight';
import { useAtom } from 'jotai';
import { solarModeAtom } from '@/components/ThemeAtom';

function BlogPage() {

  const queryClient = useQueryClient();

  const {data:blogs} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("/api/blogs/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: true,
  });
  
  const Blogs = blogs?.data;

  console.log("Blogs data:", Blogs);
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum) => prevNum + 6);
  };

  let displayedBlogs = [];


  if(Blogs){
    displayedBlogs = [...Blogs].slice(0, visibleBlogs);
  }

  const [isSolarMode, setSolarMode] = useAtom(solarModeAtom);

  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  return (
    <>
      <Box className="flex flex-col justify-between w-full min-h-screen bg-gray-100 dark:bg-gray-900 pt-3">
        <Table>
          <TableHead>
            <TableRow className='h-[10rem]'>
              <div className='flex justify-center items-center h-[10rem] mt-10'>
                {/*<div
                  className="w-[75rem] h-[10rem] bg-center bg-cover flex justify-center items-center"
                  style={{ backgroundImage: `url(${BGpic})` }}
                >
                  <h1 className="text-white text-4xl font-bold">Welcome to My Website</h1>
                </div>*/}
                <div className='flex items-center w-[90%] h-[10rem] rounded bg-blue-500 bg-cover bg-center' style={{ backgroundImage: `url(${BGpic})` }}>
                  <h1 className='w-[80%] ml-auto text-white text-4xl sm:text-5xl font-bold mt-10'>Read Our Blog</h1>
                </div>
                {isSolarMode && (<SpotlightEffect radius={200} />)}
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
                <div className=''><Grid2 container spacing={2} columns={12} minHeight={290} >
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
                No blogs found, <button className='text-blue-600 ml-1'><Link to={'/create/blog'}> Create One!</Link></button>
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
  )
}

export default BlogPage