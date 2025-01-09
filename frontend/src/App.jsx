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
import { AuthProvider } from './components/AuthContext'

function App() {

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
            <Route path='/signin' element={ <SignInPage/>}/>
            <Route path='/signup' element={ <SignUpPage/>}/>
          </Routes> 
        </Box>
      </AuthProvider>
    </>
  )
}

export default App
