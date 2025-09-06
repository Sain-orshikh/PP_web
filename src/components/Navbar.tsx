'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { flashlightModeWithEffectAtom, darkModeWithEffectAtom, solarModeWithEffectAtom } from './ThemeAtom';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserCircle, FaPenSquare, FaBookOpen, FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BsLightbulb, BsLightbulbFill } from "react-icons/bs";
import { MdFlashlightOff, MdFlashlightOn, MdOutlineFlashlightOff, MdOutlineFlashlightOn, MdMenu, MdClose } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { VscSignIn } from "react-icons/vsc";
import { LuNewspaper } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TextShimmer } from './ui/shimmertext';
import toast from 'react-hot-toast';
import AuthDialogs from './auth/AuthDialogs';

interface AuthUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
}

const Navbar: React.FC = () => {
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const [showToast, setShowToast] = useState(() => {
    const hasShownToast = localStorage.getItem('hasShownDarkModeToast');
    return hasShownToast === null;
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isSolarMode, setSolarMode] = useAtom(solarModeWithEffectAtom);
  const [isFlashlightMode, setFlashlightMode] = useAtom(flashlightModeWithEffectAtom);
  const [isDarkMode, setDarkMode] = useAtom(darkModeWithEffectAtom);

  // Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Error logging out");
    },
  });

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSolarMode = () => {
    setSolarMode();
    handleThemeMenuClose();
  };

  const handleFlashlightMode = () => {
    setFlashlightMode();
    handleThemeMenuClose();
  };

  const handleDarkMode = () => {
    setDarkMode();
    handleThemeMenuClose();
    if (showToast) {
      setShowToast(false);
      localStorage.setItem('hasShownDarkModeToast', 'true');
      toast.success('Dark mode enabled!');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/assets/pp-logo.png"
                alt="PP Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <TextShimmer className="text-xl font-bold text-gray-900 dark:text-white">
              PeerPro
            </TextShimmer>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <LuNewspaper size={18} />
              <span>Blog</span>
            </Link>
            <Link
              href="/projects"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FaBookOpen size={18} />
              <span>Projects</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FaPenSquare size={18} />
              <span>Create</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <BsFillInfoSquareFill size={18} />
              <span>About</span>
            </Link>
          </div>

          {/* Right Side - Theme Toggle & Auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <Button
              onClick={handleThemeMenuOpen}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isDarkMode && isSolarMode && (
                <BsLightbulbFill className="text-yellow-500" size={20} />
              )}
              {isDarkMode && !isSolarMode && (
                <FaMoon className="text-blue-400" size={20} />
              )}
              {!isDarkMode && isSolarMode && (
                <BsLightbulb className="text-yellow-600" size={20} />
              )}
              {!isDarkMode && !isSolarMode && (
                <FaSun className="text-yellow-500" size={20} />
              )}
            </Button>

            {/* Flashlight Toggle */}
            <Button
              onClick={handleFlashlightMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isDarkMode && isFlashlightMode && (
                <MdFlashlightOff className="text-gray-400" size={20} />
              )}
              {!isDarkMode && isFlashlightMode && (
                <MdOutlineFlashlightOff className="text-gray-600" size={20} />
              )}
              {isDarkMode && !isFlashlightMode && (
                <MdFlashlightOn className="text-yellow-400" size={20} />
              )}
              {!isDarkMode && !isFlashlightMode && (
                <MdOutlineFlashlightOn className="text-gray-600" size={20} />
              )}
            </Button>

            {/* Auth Button */}
            {authUser ? (
              <Button
                onClick={handleUserMenuOpen}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <FaUserCircle className="text-gray-700 dark:text-gray-300" size={24} />
              </Button>
            ) : (
              <AuthDialogs mode="signin">
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 cursor-pointer">
                  <VscSignIn size={18} />
                  <span className="hidden sm:inline">Sign In</span>
                </div>
              </AuthDialogs>
            )}

            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <MdClose className="text-gray-700 dark:text-gray-300" size={24} />
              ) : (
                <MdMenu className="text-gray-700 dark:text-gray-300" size={24} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/blog"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <LuNewspaper size={20} />
                  <span>Blog</span>
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <FaBookOpen size={20} />
                  <span>Projects</span>
                </Link>
                <Link
                  href="/create"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <FaPenSquare size={20} />
                  <span>Create</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <BsFillInfoSquareFill size={20} />
                  <span>About</span>
                </Link>
                {authUser && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      <FaUser size={20} />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className="flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors duration-200 w-full text-left"
                    >
                      <FaSignOutAlt size={20} />
                      <span>Sign Out</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleThemeMenuClose}
        PaperProps={{
          className: 'mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg'
        }}
      >
        <MenuItem onClick={handleDarkMode} className="flex items-center space-x-3 px-4 py-3">
          <FaMoon className="text-blue-400" size={18} />
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
        </MenuItem>
        <MenuItem onClick={handleSolarMode} className="flex items-center space-x-3 px-4 py-3">
          <BsLightbulb className="text-yellow-500" size={18} />
          <span className="text-gray-700 dark:text-gray-300">Solar Mode</span>
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          className: 'mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg'
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <Link
            href="/profile"
            className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <FaUser size={18} />
            <span>Profile</span>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleUserMenuClose();
          }}
          className="flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors duration-200"
        >
          <FaSignOutAlt size={18} />
          <span>Sign Out</span>
        </MenuItem>
      </Menu>
    </motion.nav>
  );
};

export default Navbar;
