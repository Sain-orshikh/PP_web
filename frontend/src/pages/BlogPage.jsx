import { useState } from 'react'
import { ButtonGroup, Button, Box, Input, Table, TableRow, Typography, TableHead, TableBody, TableFooter } from '@mui/material'
import { CiSearch } from "react-icons/ci";
import BGpic from "../assets/starry night.jpg"
import BlogCard from '../components/BlogCard';
function BlogPage() {
  const [searchTerm, setsearchTerm] = useState('');
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
                  <h1 className='text-white text-5xl font-bold mt-20 ml-40'>Read Our Blog</h1>
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
                <div className="my-auto bg-white border">
                  <Button className=''>
                    <CiSearch/>
                  </Button>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                    placeholder='Search for blogs'
                    className='w-[70%]'
                  />
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
            <div className='flex flex-row justify-evenly w-[90%] mx-auto mt-10'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
          </TableRow>
          <TableRow>
            <div className='flex flex-row justify-evenly w-[90%] mx-auto mt-10'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
          </TableRow>
          <TableRow>
            <div className='flex justify-evenly mt-10'>
              <ButtonGroup>
                <Button sx={{ borderColor: "black", ":hover": { borderColor: "gray" } }}><text className='text-black'>&lt; Previous</text></Button>
                <Button sx={{ borderColor: "black", ":hover": { borderColor: "gray" } }}><text className='text-black'>1</text></Button>
                <Button sx={{ borderColor: "black", ":hover": { borderColor: "gray" } }}><text className='text-black'>2</text></Button>
                <Button sx={{ borderColor: "black", ":hover": { borderColor: "gray" } }}><text className='text-black'>3</text></Button>
                <Button sx={{ borderColor: "black", ":hover": { borderColor: "gray" } }}><text className='text-black'>...</text></Button>
                <Button sx={{ borderColor: "black", ":hover": { borderColor: "gray" } }}><text className='text-black'>Next &gt;</text></Button>
              </ButtonGroup>
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