import { ButtonGroup, Button, Box, Input, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pp_logo from "../assets/pp-logo.png"
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";
import { FaUserAstronaut } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import skybg from "../assets/skybg.jpg"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function SignInPage() {
    
    const [credentials, setCredentials] = useState({
      username: "",
      password: ""
    });

    const queryClient = useQueryClient();

    const {mutate: loginMutation, error, isError} = useMutation({
      mutationFn: async (credentials) => {
        try{
          const res = await fetch("/api/auth/login",{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(credentials),
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error || "Failed to login");
          console.log(data);
          return data;
        }
        catch(error){
          console.error(error);
          throw error;
        }
      },
      onSuccess: () => {
        toast.success("Logged in successfully");
        queryClient.invalidateQueries({queryKey:["authUser"]});
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const handleLogin = (credentials) => {
      loginMutation(credentials);
    };

    const handleforgotpassword = () => {
      toast.error("Please contact the admin to reset your password");
    };

    return (
      <>
      <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${skybg})`}}>
        <div className="flex flex-col items-center w-[75%] sm:w-[35%] rounded-lg shadow-lg bg-gradient-to-b from-[#B3DAF1] via-[#A0C4E2] to-[#EAF1F6]">
          <div className='flex items-center justify-center p-2 mt-7 mb-5 mx-auto bg-white hover:bg-gray-100 p-1 rounded-xl'>
            <button onClick={() => {handleLogin(credentials)}}>
              <PiSignIn fontSize={40}/>
            </button>
          </div>
          <div className='text-3xl font-semibold text-black'>
            Sign in 
          </div>
          <div className='text-gray-600 w-[70%] sm:[60%] text-center text-xl mt-2'>
            Explore the world of Passionate MAIS students
          </div>
          <div className='flex flex-row items-center w-[70%] border-2 mt-5 bg-white focus-within:border-blue-500 rounded-xl'>
            <FaUserAstronaut fontSize={25} className='ml-1'/>
            <input
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder='Username'
              className='w-full p-2 focus:outline-none bg-inherit rounded-xl'
            />
          </div>
          <div className='flex flex-row items-center w-[70%] border-2 mt-3 bg-white focus-within:border-blue-500 rounded-xl'>
            <MdLock fontSize={30} className='ml-1'/>
            <input
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder='Password'
              className='w-full p-2 focus:outline-none bg-inherit rounded-xl'
            />
          </div>
          <div className='flex justify-end mt-1 w-[70%] underline hover:text-gray-700'>
            <button onClick={handleforgotpassword}>
              Forgot password?
            </button>
          </div>
          <div className='w-[70%] mt-3'>
            <button className='bg-black hover:bg-gray-700 text-white w-full p-2 rounded-xl' onClick={() => {handleLogin(credentials)}}>
              Get Started
            </button>
          </div>
          <div className='w-[70%] mt-5 border-dashed border border-gray-500'>
          </div>
          <div className='my-5 text-xl'>
            Don't have an account? <button className='font-semibold hover:text-gray-700'><Link to={'/signup'}>Sign up</Link></button>
          </div>
        </div>
      </div>	
      </>
    )
  }
  
  export default SignInPage