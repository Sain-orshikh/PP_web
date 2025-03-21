import * as React from 'react';
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai';
import { flashlightModeWithEffectAtom } from './ThemeAtom';
import { darkModeWithEffectAtom } from './ThemeAtom';
import { solarModeWithEffectAtom } from './ThemeAtom';

import { ButtonGroup, Button, Box, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaHome, FaPenSquare,  } from "react-icons/fa";
import { FaBookOpen, FaM } from "react-icons/fa6";

import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { BsLightbulb } from "react-icons/bs";
import { BsLightbulbFill } from "react-icons/bs";
import { BsLightbulbOff } from "react-icons/bs";
import { BsLightbulbOffFill } from "react-icons/bs";

import { MdFlashlightOff } from "react-icons/md";
import { MdFlashlightOn } from "react-icons/md";
import { MdOutlineFlashlightOff } from "react-icons/md";
import { MdOutlineFlashlightOn } from "react-icons/md";

import { BsFillInfoSquareFill } from "react-icons/bs";
import { VscSignIn } from "react-icons/vsc";
import { MdMenu } from "react-icons/md";
import pp_logo from "../assets/pp-logo.png"

import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { TextShimmer } from './ui/shimmertext';
import { LuNewspaper } from "react-icons/lu";
import toast from 'react-hot-toast';

//import IsSmallScreen from '../modes/isSmallScreen'

function Navbar() {

  const {data:authUser} = useQuery({queryKey:["authUser"]});

  const [showToast, setShowToast] = useState(() => {
    const hasShownToast = localStorage.getItem('hasShownDarkModeToast');
    return hasShownToast === null;
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [isSolarMode, setSolarMode] = useAtom(solarModeWithEffectAtom);

  const [isFlashlightMode, setFlashlightMode] = useAtom(flashlightModeWithEffectAtom);

  const [isDarkMode, setDarkMode] = useAtom(darkModeWithEffectAtom);
  
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    };

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setIsSmall(window.innerWidth <= 640);
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set the button as the anchor
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen2 = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left }); // Store button's position
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null); 
  };

  const handleSolarMode = () => {
    setSolarMode();
  };

  const handleFlashlightMode = () => {
    setFlashlightMode();
  };

  const handleDarkMode = () => {
    setDarkMode();
    if(showToast && isSmall){
      setShowToast(false);
      localStorage.setItem('hasShownDarkModeToast', 'true');
      toast.success("Try swiping!");
    }
  };

  const [showDarkMode, setShowDarkMode] = useState(true);
  const [showSolarButton, setShowSolarButton] = useState(false);
  const [showFlashLightButton, setShowFlashLightButton] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleSwipe = () => {
    if(showFlashLightButton){
      setShowFlashLightButton(false);
      setShowDarkMode(true);
    }
    else if(showDarkMode){
      setShowDarkMode(false);
      setShowSolarButton(true);
    }
    else{
      setShowSolarButton(false);
      setShowFlashLightButton(true);
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 50) {
      handleSwipe();
    } else {
      if (showSolarButton) {
        handleSolarMode();
      }
      else if(showFlashLightButton){
        handleFlashlightMode();
      }
      else {
        handleDarkMode();
      }
    }

    setTouchStartX(null);

    isProccessingRef.current = true;

    setTimeout(() => {
      isProccessingRef.current = false;
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full bg-white dark:bg-gray-100 p-1 shadow-md z-30 fixed top-0">
        <Box className="flex justify-start items-center w-[80%] sm:w-[30%]">
          {/*<img>Passion project logo has to go here</img>*/}
          <button><Link to={"/"}><img src={pp_logo} className=""/></Link></button>
          <button><Link to={"/"}><TextShimmer
            as="span"
            duration={1.5}
            className="text-3xl     [--base-color:theme(colors.cyan.400)] 
          [--base-gradient-color:theme(colors.blue.500)] font-harmonique ml-5"
          >
            Passion Project
          </TextShimmer></Link></button>
        </Box>
        <Box className="flex flex-row text-end items-center text-black hidden space-x-3 sm:block ">
          <Button className=''>
            <Link to={'/test'} className="text-sky-500 text-md hover:text-black">
              Test
            </Link>
          </Button>
          <Button className=''>
            <Link to={'/about'} className="text-sky-500 text-md hover:text-black">
              About
            </Link>
          </Button>
          <Button>
            <Link to={'/blog'} className="text-indigo-500 text-md hover:text-black">
              Blog
            </Link>
          </Button>
          <Button>
            <Link to={'/create'} className="text-emerald-500 text-md hover:text-black">{/* text-amber-500 */}
              Create
            </Link>
          </Button>
          <Button>
            <Link to={'/project'} className='text-amber-500 text-md hover:text-black'>
              Project
            </Link>
          </Button>
          <Button 
            id="menu-button-2"
            aria-controls={open2 ? 'menu-2' : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? 'true' : undefined}
            onClick={handleOpen2}
          >
            {isDarkMode && (
              <FaMoon fontSize={30} className='text-gray-400 hover:text-blue-500'/>
            )}
            {!isDarkMode && (
              <FaSun fontSize={30} className='text-amber-500 hover:text-blue-500'/>
            )}
          </Button>
          <Menu
            id='menu-2'
            anchorE1={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              'aria-labelledby': 'menu-button-2',
            }}
            anchorReference='anchorPosition'
            anchorPosition={{ top: position.top, left: position.left }}
          >
            <MenuItem>
              {isDarkMode && (
                <FaMoon fontSize={30} onClick={handleDarkMode} className='text-gray-400 hover:text-blue-500'/>
              )}
              {!isDarkMode && (
                <FaSun fontSize={30} onClick={handleDarkMode} className='text-amber-500 hover:text-blue-500'/>
              )}
            </MenuItem>
            <MenuItem>
              {isDarkMode && isSolarMode && (
                <BsLightbulbOffFill fontSize={30} onClick={handleSolarMode} className='hover:text-blue-500'/>
              )}
              {!isDarkMode && isSolarMode && (
                <BsLightbulbOff fontSize={30} onClick={handleSolarMode} className='hover:text-blue-500'/>
              )}
              {isDarkMode && !isSolarMode && (
                <BsLightbulbFill fontSize={30} onClick={handleSolarMode} className='hover:text-blue-500'/>
              )}
              {!isDarkMode && !isSolarMode && (
                <BsLightbulb fontSize={30} onClick={handleSolarMode} className='hover:text-blue-500'/>
              )}
            </MenuItem>
            <MenuItem>
              {isDarkMode && isFlashlightMode && (
                <MdFlashlightOff fontSize={30} onClick={handleFlashlightMode} className='hover:text-blue-500'/>
              )}
              {!isDarkMode && isFlashlightMode && (
                <MdOutlineFlashlightOff fontSize={30} onClick={handleFlashlightMode} className='hover:text-blue-500'/>
              )}
              {isDarkMode && !isFlashlightMode && (
                <MdFlashlightOn fontSize={30} onClick={handleFlashlightMode} className='hover:text-blue-500'/>
              )}
              {!isDarkMode && !isFlashlightMode && (
                <MdOutlineFlashlightOn fontSize={30} onClick={handleFlashlightMode} className='hover:text-blue-500'/>
              )}
            </MenuItem>
          </Menu>
          <Button>
            <Link to={'/signin'} className='w-full ml-auto text-black hover:text-blue-500'>
            {authUser ? (
              <FaUserCircle fontSize={30} />
            ) : (
              <VscSignIn fontSize={30}/>
            )}
            </Link>
          </Button>
        </Box>
        <Box className="flex items-center text-black block sm:hidden">
          <Button
            id='menu-button-1'
            aria-controls={open ? 'menu-1' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleOpen}>
            <MdMenu fontSize={40} className='mr-5 text-black'/>
          </Button>
        </Box>
        <Menu
          id="menu-1"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'menu-button-1',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to={"/blog"} className='text-indigo-500'><FaBookOpen fontSize={30}/></Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/create"} className='text-emerald-500'><FaPenSquare fontSize={30}/></Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/project"} className='text-amber-500'><LuNewspaper fontSize={30}/></Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/about"} className='text-yellow-400'><BsFillInfoSquareFill fontSize={30}/></Link>
          </MenuItem>
          <MenuItem>
        <div
          className=""
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {showSolarButton && (
              <motion.button
                key="solar"
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className=""
                onClick={() => {
                  if (!isProccessingRef.current){
                  handleSolarMode();
                  isProccessingRef.current = true;
                  setTimeout(() => {
                    isProccessingRef.current = false;
                  }, 1000);
                }
                }}
              >
                {isDarkMode && isSolarMode && (
                  <BsLightbulbOffFill fontSize={30} className='hover:text-blue-500'/>
                )}
                {!isDarkMode && isSolarMode && (
                  <BsLightbulbOff fontSize={30} className='hover:text-blue-500'/>
                )}
                {isDarkMode && !isSolarMode && (
                  <BsLightbulbFill fontSize={30} className='hover:text-blue-500'/>
                )}
                {!isDarkMode && !isSolarMode && (
                  <BsLightbulb fontSize={30} className='hover:text-blue-500'/>
                )}
              </motion.button>
            )}
            {showDarkMode && (
              <motion.button
                key="dark"
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className=""
                onClick={() => {
                  if (!isProccessingRef.current){
                  handleDarkMode();
                  isProccessingRef.current = true;
                  setTimeout(() => {
                    isProccessingRef.current = false;
                  }, 1000);
                }
                }}
              >
                {isDarkMode ? (
                  <FaMoon fontSize={30} className="text-gray-400" />
                ) : (
                  <FaSun fontSize={30} className="text-amber-500" />
                )}
              </motion.button>
            )}
            {showFlashLightButton && (
              <motion.button
                key="flashlight"
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className=""
                onClick={() => {
                  if (!isProccessingRef.current){
                  handleFlashlightMode();
                  isProccessingRef.current = true;
                  setTimeout(() => {
                    isProccessingRef.current = false;
                  }, 1000);
                }
                }}
              >
                {isDarkMode && isFlashlightMode && (
                  <MdFlashlightOff fontSize={30} className='hover:text-blue-500'/>
                )}
                {!isDarkMode && isFlashlightMode && (
                  <MdFlashlightOn fontSize={30} className='hover:text-blue-500'/>
                )}
                {isDarkMode && !isFlashlightMode && (
                  <MdOutlineFlashlightOff fontSize={30} className='hover:text-blue-500'/>
                )}
                {!isDarkMode && !isFlashlightMode && (
                  <MdOutlineFlashlightOn fontSize={30} className='hover:text-blue-500'/>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </MenuItem>
          <MenuItem onClick={handleClose} style={{borderTop: '1px solid #ccc'}}>
            <Link to={"/signin"} className='mt-1.5'>
            {authUser ? (
              <FaUserCircle fontSize={30}/>
            ) : (
              <VscSignIn fontSize={30}/>
            )}
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

export default Navbar
