import { useState } from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'
import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import BlogCard from './components/BlogCard'
import SignInPage from './pages/SignInPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import CreateBlogPage from './pages/CreateBlogPage'
import CreateProjectPage from './pages/CreateProjectPage'
import SignUpPage from './pages/SignUpPage'
import SignInSuccessPage from './pages/SignInSuccessPage'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './components/AuthContext'
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
  retry: false,
  });

  return (
    <>
      <AuthProvider>
        <Box className='flex'>
          <Navbar/>
        </Box>
        <Box className='flex'>
          <Routes>
            <Route path='/' element={ <HomePage/>}/>
            <Route path='/create' element={ <CreatePage/>}/>
            <Route path='/blog' element={ <BlogPage/>}/>
            <Route path='/about' element={ <AboutPage/>}/>
            <Route path='/create/project' element={ <CreateProjectPage/>}/>
            <Route path='/create/blog' element={ <CreateBlogPage/>}/>
            <Route path='/signin' element={authUser ? <SignInSuccessPage/> : <SignInPage/>}/>
            <Route path='/signup' element={authUser ? <SignInSuccessPage/> : <SignUpPage/>}/>
          </Routes> 
          <Toaster/>
        </Box>
      </AuthProvider>
    </>
  )
}

export default App
