import { useState } from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'
import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import BlogCard from './components/BlogCard'
import SignInPage from './pages/SignInPage'
import BlogPage from './pages/BlogPage'
import ProjectPage from './pages/ProjectPage'
import CreateBlogPage from './pages/CreateBlogPage'
import CreateProjectPage from './pages/CreateProjectPage'
import SignUpPage from './pages/SignUpPage'
import SignInSuccessPage from './pages/SignInSuccessPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import TestPage from './pages/TestPage'
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query"

function App() {

  const {data:authUser, isLoading} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try{
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok){
          throw new Error(data.error || "Something went wrong");
        }
        console.log("Auth user is here:",data);
        return data;
      }
      catch(error){
        throw new Error(error);
    }
  },
  retry: 1,
  refetchOnWindowFocus: true,
  });

  const {data:blogs, error} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("/api/blogs/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
    retry: false,
  });

  console.log("Auth User is:",authUser);
  console.log(blogs);
  return (
    <>
        <Box className='flex relative'>
          <Navbar/>
        </Box>
        <Box className='flex pt-20'>
          <Routes>
            <Route path='/' element={ <HomePage/>}/>
            <Route path='/create' element={ <CreatePage/>}/>
            <Route path='/blog' element={ <BlogPage/>}/>
            <Route path='/project' element={ <ProjectPage/>}/>
            <Route path='/about' element={ <AboutPage/>}/>
            <Route path='/profile/:username' element={ <ProfilePage/>}/>
            <Route path='/create/project' element={authUser ? <CreateProjectPage/> : <CreatePage/>}/>
            <Route path='/create/blog' element={authUser ? <CreateBlogPage/> : <CreatePage/>}/>
            <Route path='/signin' element={<SignInPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/overview' element={<SignInSuccessPage/>}/>
            <Route path='/test' element={<TestPage/>}/>
          </Routes> 
          <Toaster/>
        </Box>
    </>
  )
}

export default App
