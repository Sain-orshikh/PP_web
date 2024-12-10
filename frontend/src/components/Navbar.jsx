import { useState } from 'react'
import { ButtonGroup, Button, Box, Typography, Input } from '@mui/material'
import { Link } from 'react-router-dom'
import { CgAddR } from "react-icons/cg";
import { TiAdjustBrightness, TiWeatherSunny } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
//import IsSmallScreen from '../modes/isSmallScreen'

function Navbar() {

  return (
    <>
      <div className="flex justify-between items-center w-full bg-white p-1 shadow-md z-10">
        <Box className="">
          {/*<img>Passion project logo has to go here</img>*/}
          <text>
            Logo
          </text>
          <text className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold ml-5'>
            Passion Project MAIS
          </text>
        </Box>
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
          <Button>
            <Link to={'/sign_in'}>
              <FaUserCircle className='' fontSize={'20'}/>
            </Link>
          </Button>
        </Box>
        
      </div>
    </>
  )
}

export default Navbar



