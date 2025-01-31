import { useState } from 'react'
import { ButtonGroup, Button, Box, Input, Table, TableRow, Typography, TableHead, TableBody, TableFooter } from '@mui/material'
import { CiSearch } from "react-icons/ci";
import BGpic from "../assets/starry night.jpg"
import BlogCard from '../components/BlogCard';
import paperairlplane from "../assets/paperairplane.png";
const Homepage = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Curved Dashed Line */}
      <svg
        viewBox="0 0 200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-[80%] w-auto"
      >
        <path
          d="M100 10 Q 200 250, 100 490"
          stroke="gray"
          strokeWidth="3"
          strokeDasharray="10 10"
          fill="transparent"
        />
      </svg>

      {/* Paper Airplane Icon */}
      <div className='relative w-full h-full'>
      <img
        src={paperairlplane} // Replace with your image path
        alt="Paper Airplane"
        className="absolute w-20 h-20 animate-flight"
      />
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes flight {
            0% { top: 90%; left: 10%; rotate: 0deg; opacity: 1; }
            25% { top: 75%; left: 25%; rotate: -10deg; }
            50% { top: 50%; left: 50%; rotate: 10deg; }
            75% { top: 25%; left: 75%; rotate: -5deg; }
            100% { top: 5%; left: 90%; rotate: 0deg; opacity: 0; }
          }

          .animate-flight {
            animation: flight 4s ease-in-out infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default Homepage;