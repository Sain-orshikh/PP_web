import { ButtonGroup, Button, Box, Input } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import pp_logo from "../assets/pp-logo.png"
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";

function SignInPage() {
    
    const [email,setEmail] = useState('');

    return (
      <>
        <div className='flex flex-col w-full min-h-screen bg-gray-100'>
          <div className='flex flex-col w-full'>
            <span className='text-6xl font-bold mx-auto mt-5'>
              Log In
            </span>
            <span className='mt-3 mx-auto text-xl'>
              Don't have an account? <button className='text-blue-500'><Link to={'/signup'}>Sign Up</Link></button>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full mt-16">
            <div className='w-[75%] sm:w-[50%] border-b sm:border-b-0 sm:border-r border-black'>
              <div className='w-[90%] sm:w-[50%] mx-auto'>
                <span className='mx-auto text-md text-gray-500'>
                Email address
                </span>
              </div>
              <div className='flex flex-col w-full mt-1'>
                <input
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  placeholder='Email'
                  className='p-2 w-[90%] sm:w-[50%]  mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none'
                />
                <input
                  placeholder='Passwork'
                  className='p-2 w-[90%] sm:w-[50%]  mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none mt-3'
                />
                <div className='flex flex-row w-[90%] sm:w-[50%] mx-auto mt-1'>
                  <div className='flex items-center justify-between'>
                    <button className='w-[1rem] h-[1rem] border border-gray-400 my-auto'>
                    </button>
                    <span className='ml-1 text-gray-7 00'>Remember me</span>
                  </div>
                  <button className='mt-0 underline ml-auto'>
                    Forgot Email?
                  </button>
                </div>
                <div className='my-7 w-[90%] sm:w-[50%]  mx-auto'>
                  <button className='w-full h-[2.5rem] rounded-md border-2 border-cyan bg-black hover:bg-gray-500 flex items-center justify-center'> 
                    <span className='text-white'>Continue with Email   &gt;</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-[90%] sm:w-[50%]'>
              <div className='bg-blue-500 border border-blue-500 w-[80%] sm:w-[50%] h-[3rem] mx-auto mt-4 sm:mt-0'>
                <button className='flex flex-row w-full h-full text-white'>
                  <div className='flex items-center w-[15%] border-r border-blue-500 bg-white'>
                    <FcGoogle fontSize={25} className='mx-auto my-auto'/>
                  </div>
                  <span className='mx-auto my-auto'>Continue with Google</span>
                </button>
              </div>
              <div className='bg-blue-900 border border-blue-900 w-[80%] sm:w-[50%] h-[3rem] mx-auto mt-4'>
                <button className='flex flex-row w-full h-full text-white'>
                  <div className='flex items-center w-[15%] border-r border-blue-900 bg-white'>
                    <TfiFacebook fontSize={25} className='text-blue-900 mx-auto my-auto'/>
                  </div>
                  <span className='mx-auto my-auto'>Continue with Facebook</span>
                </button>
              </div>
              <div className='bg-white border border-black w-[80%] sm:w-[50%] h-[3rem] mx-auto mt-4'>
                <button className='flex flex-row w-full h-full text-black'>
                  <div className='flex items-center w-[15%] border-r border-black bg-white'>
                    <FaApple fontSize={25} className='mx-auto my-auto'/>
                  </div>
                  <span className='mx-auto my-auto'>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default SignInPage