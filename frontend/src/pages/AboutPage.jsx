import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import duo from "../assets/duo.jpg";
import nature from "../assets/nature.jpg";
import {  Box, Image, Text, Container, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

const members = [
  { id: 1, name: "Zlog's", photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fnot-found_7010170&psig=AOvVaw3rV9n6u5OvgYVCavN9hldd&ust=1761914200021000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjj4IP4y5ADFQAAAAAdAAAAABAE", role: "President" },
];



const AboutPage = () => {
  const [showAll, setShowAll] = useState(false);
  return(
    <>
  <div className='flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
  <div className='w-[90%] sm:w-[50%] mx-auto mt-12 bg-gray-100 dark:bg-gray-900'>
      <div className={`text-6xl font-bold font-harmonique text-center w-full animate-fade-in-down text-black dark:text-white`}>
        What is the passion club?
      </div>
      <div className={`text-center text-gray-700 dark:text-gray-200 ml-1 mt-5 text-xl animate-fade-in-down animation-delay-200`}>
      Passion Project is a student-led research organization in MAIS 
      dedicated to empowering young minds to pursue their dreams and make a 
      positive impact on the world. We are also devoted to promote interest 
      in scientific research among the students of MAIS.
      </div>
    </div>

    {/* Blog */}
    <div className='w-[95%] sm:w-[80%] min-h-[500px] max-sm:min-h-[700px] mx-auto mt-12 bg-purple-300 dark:bg-purple-200 rounded-lg relative p-6 sm:p-10'>
      <div className='font-harmonique font-bold text-black dark:text-black text-4xl sm:text-5xl sm:w-[50%] max-sm:w-full sm:ml-10 mt-5 text-center  animate-slide-in-left animation-delay-200'>
        Blog
      </div>
      <div className='font-harmonique text-lg sm:text-2xl animate-slide-in-left animation-delay-200 mt-5 
      max-sm:w-full sm:w-[50%] max-sm:text-center sm:ml-20 px-4 sm:px-0'>
        Our blog serves as a platform to share knowledge, ideas, and research findings from our members. We publish articles on a variety of topics, 
        ranging from cutting-edge scientific advancements to student-led research projects and personal experiences in the field of inquiry. Through our blog, 
        we aim to spark curiosity, provide educational insights, and promote discussions around scientific research.
      </div>
      <div className='bg-[url("/src/assets/annoying-frog.jpg")] bg-cover bg-center w-[80%] sm:w-[30%] h-[250px] sm:h-[80%] rounded-lg 
      absolute sm:top-10 max-sm:relative max-sm:mt-6 sm:right-20 mx-auto animate-slide-in-right animation-delay-200'></div>
      <div className='mt-8 max-sm:flex max-sm:justify-center sm:ml-60'>
        <Button className='animate-slide-in-left animation-delay-200 text-white pl-3 pr-3 font-bold border border-gray-500 p-2 
        bg-purple-700 rounded-lg hover:bg-purple-800 hover:shadow-xl'>
          <Link to={'/blog'}>See our blogs!</Link>
        </Button>
      </div>
</div>

{/* Project */}

<div className='w-[95%] sm:w-[80%] min-h-[500px] max-sm:min-h-[700px] mx-auto mt-12 bg-orange-200 dark:bg-orange-100 rounded-lg relative p-6 sm:p-10'>
      <div className='font-harmonique font-bold text-black dark:text-black text-4xl sm:text-5xl sm:w-[50%] max-sm:w-full sm:ml-10 mt-5 text-center animate-slide-in-left animation-delay-200'>
        Project
      </div>
      <div className='font-harmonique text-lg sm:text-2xl animate-slide-in-left animation-delay-200 mt-5 
      max-sm:w-full sm:w-[50%] max-sm:text-center sm:ml-20 px-4 sm:px-0'>
        At Passion Project, we engage in a variety of hands-on research projects that allow students to apply theoretical knowledge to real-world problems.
       These projects are driven by student interests and cover diverse fields such as environmental science, technology, medicine, and engineering. Each project involves thorough research, 
       experimentation, data analysis, and collaboration, helping students develop critical thinking and problem-solving skills.
      </div>
      <div className='bg-[url("/src/assets/bananawagon.png")] bg-cover bg-center w-[80%] sm:w-[30%] h-[250px] sm:h-[80%] rounded-lg 
      absolute sm:top-10 max-sm:relative max-sm:mt-6 sm:right-20 mx-auto animate-slide-in-right animation-delay-200'></div>
      <div className='mt-8 max-sm:flex max-sm:justify-center sm:ml-60'>
        <Button className='animate-slide-in-left animation-delay-200 text-white pl-3 pr-3 font-bold border border-gray-500 p-2 
        bg-orange-600 rounded-lg hover:bg-orange-800 hover:shadow-xl'>
          <Link to={'/project'}>See our projects!</Link>
        </Button>
      </div>
</div>

    {/* why join */}
    <div className="flex flex-col w-full mx-auto min-h-[30rem] bg-gray-100 dark:bg-gray-900 mt-5">
            <div className="w-full mt-0 sm:mt-10 text-center text-black dark:text-white text-5xl sm:text-6xl font-harmonique font-bold">
              Why join this club?
            </div>
            <div className="flex flex-col sm:flex-row justify-around items-center w-[95%] mx-auto mt-7 mb-20 text-white text-xl font-semibold">
              <div className="w-[90%] sm:w-[40%] bg-gray-100 dark:bg-gray-900">
                <img
                  src={nature}
                  alt="logo"
                  className="w-full h-full mt-2 animate-slide-in-left animation-delay-200"
                />
              </div>
              <div className="w-[90%] sm:w-[50%] mt-3 sm:mt-0 text-gray-700 dark:text-gray-200">
                <div className="mt-2 text-center text-2xl animate-slide-in-right animation-delay-200">By participating in Passion Project, students gain invaluable experience in scientific research, 
                  teamwork, and communication. Our goal is to provide a supportive environment where students can explore their passions, 
                  contribute to meaningful projects, and make a lasting impact on the world.</div>
              </div>
            </div>
          </div>


    {/* Member */}
    <div className='font-harmonique font-bold text-black dark:text-white text-7xl  mt-5 text-center  animate-slide-in-left animation-delay-200'>Members</div>
    <div className="flex flex-col items-center justify-center p-4">
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500 w-[95%] mx-auto flex justify-center">
  {members.slice(0, 2).map((member) => (
    <div key={member.id} className="flex flex-col items-center bg-white dark:bg-gray-400 p-4 rounded-lg shadow-lg">
      <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full object-cover" />
      <p className="mt-2 text-lg font-semibold text-center">{member.name}</p>
      <p className="text-gray-600 text-center">{member.role}</p>
    </div>
  ))}
</div>
      {showAll && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500 mt-6 w-[95%] ">
          {members.slice(2).map((member) => (
            <div key={member.id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg dark:bg-gray-400">
              <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full object-cover" />
              <p className="mt-2 text-lg font-semibold">{member.name}</p>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      )}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
        >
          Show All Members
        </button>
      )}
    </div>

    {/* Footer */}
    <div className="w-full bg-black dark:bg-gray-100 border-t border-white mt-10">
          <div className="flex flex-col sm:flex-row justify-between w-[85%] sm:w-[95%] mx-auto mt-7 mb-7">
            <div className="w-full">
              <div className="flex flex-row space-x-4 text-white dark:text-black">
                <FaXTwitter fontSize={30}/>
                <FaInstagram fontSize={30}/>
                <FaFacebookSquare fontSize={30}/>
              </div>
              <div className="mt-5 text-lg text-white dark:text-black">
                2025 MAIS. All rights reserved.
              </div>
            </div>

            <div className="flex flex-col w-full mt-5 sm:mt-0">
              <div className="ml-0 sm:ml-auto">
                <div className="flex flex-row text-xl space-x-2 items-center text-white dark:text-black">
                  <div>Found a bug?</div>
                  <div><FaBug fontSize={20} /></div>
                  <div className="ml-2">Help us improve</div>
                  <div><FaTools fontSize={20} /></div>
                </div>
                <div className="space-y-1 mt-3 text-md sm:mt-1 text-white dark:text-black">
                  <div>26b_sain-orshikh.n@mongolaspiration.edu.mn</div>
                  <div>26b_sayan.b@mongolaspiration.edu.mn</div>
                  <div>27b_tsegts.a@mongolaspiration.edu.mn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
    </>
  )
}

export default AboutPage
