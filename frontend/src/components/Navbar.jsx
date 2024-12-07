import { useState } from 'react'
import { ButtonGroup, Button, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { CgAddR } from "react-icons/cg";
import { TiAdjustBrightness, TiWeatherSunny } from "react-icons/ti";
//import IsSmallScreen from '../modes/isSmallScreen'

function Navbar() {

  return (
    <>
      <div className="flex justify-between items-center w-full bg-white p-1 shadow-md z-10">
        <text className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold ml-5'>
          Passion Project MAIS
        </text>
        <Box className="mr-5">
          <Button>
            <Link to={'/'}>
              Home
            </Link>
          </Button>
          <Button>
            <Link to={'/create'}>
              Create
            </Link>
          </Button>
        </Box>
        
      </div>
    </>
  )
}

export default Navbar



