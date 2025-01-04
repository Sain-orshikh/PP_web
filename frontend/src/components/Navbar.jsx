import { useState } from 'react'
import { ButtonGroup, Button, Box, Typography, Input } from '@mui/material'
import { Link } from 'react-router-dom'
import { CgAddR } from "react-icons/cg";
import { TiAdjustBrightness, TiWeatherSunny } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { VscSignIn } from "react-icons/vsc";
import pp_logo from "../assets/pp-logo.png"
//import IsSmallScreen from '../modes/isSmallScreen'

function Navbar() {

  return (
    <>
      <div className="flex justify-between items-center w-full bg-white p-1 shadow-md z-10 ">
        <Box className="flex justify-between items-center">
          {/*<img>Passion project logo has to go here</img>*/}
          <img src={pp_logo} className=""/>
          <text className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold ml-5'>
            Passion Project MAIS
          </text>
        </Box>
        <Box className="flex mr-10 space-x-4">
          <Button className=''>
            <Link to={'/'} className="text-sky-500 hover:text-black">
              Home
            </Link>
          </Button>
          <Button>
            <Link to={'/blog'} className="text-indigo-500 hover:text-black">
              Blog
            </Link>
          </Button>
          <Button>
            <Link to={'/create'} className="text-emerald-500 hover:text-black">{/* text-amber-500 */}
              Create
            </Link>
          </Button>
          <Button>
            <Link to={'/about'} className='text-amber-500 hover:text-black'>
              About
            </Link>
          </Button>
          <Button>
            <Link to={'/signin'} className='text-black hover:text-blue-500'>
              <VscSignIn fontSize={30}/>
            </Link>
          </Button>
        </Box>
        
      </div>
    </>
  )
}

export default Navbar



