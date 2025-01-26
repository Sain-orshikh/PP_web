import { ButtonGroup, Button, Box, Input, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pp_logo from "../assets/pp-logo.png"
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function SignInPage() {
    
    const [credentials, setCredentials] = useState({
      username: "",
      password: ""
    });

    const queryClient = useQueryClient();

    const {data:authUser} = useQuery({queryKey:["authUser"]});

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
                  User information
                </span>
              </div>
              <div className='flex flex-col w-full mt-1'>
                <input
                  value={credentials.username}
                  onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                  placeholder='Username'
                  className='p-2 w-[90%] sm:w-[50%]  mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none'
                />
                <input
                  value={credentials.password}
                  onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                  placeholder='Password'
                  className='p-2 w-[90%] sm:w-[50%]  mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none mt-3'
                />
                {authUser === false && (
                <div className='flex w-[90%] sm:w-[50%] mx-auto mt-1'>
                  <div className='w-full flex items-center justify-between'>
                    <span className='ml-1 text-red-600 block'>* Incorrect user credentials</span>
                  </div>
                </div>  
                )}
                <div className='flex flex-row w-[90%] sm:w-[50%] mx-auto mt-1'>
                  <button className='underline ml-auto'>
                    Forgot Password?
                  </button>
                </div>
                <div className='my-7 w-[90%] sm:w-[50%]  mx-auto'>
                  <button onClick={() => {handleLogin(credentials)}} className='w-full h-[2.5rem] rounded-md border-2 border-cyan bg-black hover:bg-gray-500 flex items-center justify-center'> 
                    <span className='text-white'>Continue</span>
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
                  <span className='mx-auto my-auto'>Continue with Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default SignInPage