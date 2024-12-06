import { useState } from 'react'
import { ButtonGroup, Button, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { CgAddR } from "react-icons/cg";
import { TiAdjustBrightness, TiWeatherSunny } from "react-icons/ti";
//import IsSmallScreen from '../modes/isSmallScreen'

function Navbar() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row justify-between items-center w-full mx-5 mt-3">
        
        <Button className=''>
          <Link to={"/"}>
            <Typography className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
              Product Store 🛒
            </Typography>
          </Link>
        </Button>
        <ButtonGroup className='mr-5'>
          <Button>
            <Link to={'/create'}><CgAddR fontSize={20}/></Link>
          </Button>
          
          <Button>
            <TiAdjustBrightness fontSize={20}/>
          </Button>
        </ButtonGroup>

      </Box>
    </>
  )
}

export default Navbar