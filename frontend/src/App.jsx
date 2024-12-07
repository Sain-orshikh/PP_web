import { useState } from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'
import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import BlogCard from './components/BlogCard'

function App() {

  return (
    <>
      <Box className='flex'>
        <Navbar/>
      </Box>
      <Box className='flex'>
        <Routes>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/create' element={ <CreatePage/>}/>
        </Routes> 
      </Box>
    </>
  )
}

export default App
