import { useState } from 'react'
import { ButtonGroup, Button, Box, Input, Table, TableRow, Typography, TableHead, TableBody } from '@mui/material'
import { CiSearch } from "react-icons/ci";
import BGpic from "../assets/BGpic.png"
import BlogCard from '../components/BlogCard';
function HomePage() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row justify-between w-full min-h-screen bg-gray-100 p-3">
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
                <div className='w-[75rem] h-[10rem] rounded bg-blue-500 bg-cover bg-center' style={{ backgroundImage: `url(${BGpic})` }}>
                  <h1 className='text-black text-4xl font-bold'>READ OUR BLOG</h1>
                </div>
              </div>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            <TableRow className=' h-[5rem]'>
              <div className='flex flex-row justify-between w-[80%] mx-auto mt-10 '>
                <div className='my-auto ml-10'>
                  <Typography variant='h5'>
                    Weekly Articles with insight into the weekend's message
                  </Typography>
                </div>
                <div className="my-auto">
                  <Input
                    placeholder='Search for blogs'
                  />
                  <Button>
                    <CiSearch/>
                  </Button>
                  {/*<img
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                  />*/}
              </div>
            </div>
          </TableRow>
          <TableRow className='h-[3rem]'>
            <div className='flex w-[80%] mx-auto mt-5 '>
              <div className='ml-10'>
                <Typography variant='h7'>
                  Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways.
                </Typography>
              </div>
            </div>
          </TableRow>
          <TableRow>
            <div className='flex flex-row justify-evenly w-[80%] mx-auto mt-10'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
          </TableRow>
        </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default HomePage