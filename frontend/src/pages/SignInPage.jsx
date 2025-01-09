import { ButtonGroup, Button, Box, Input, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pp_logo from "../assets/pp-logo.png"
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";
import { useUserStore } from '../store/user';
import { useAuth } from '../components/AuthContext';

function SignInPage() {
    
    const { isSignedIn,setIsSignedIn } = useAuth();

    useEffect(() => {
      // This will log the updated state after it has changed and the component re-renders
      console.log("Updated state inside useEffect:", isSignedIn);
    }, [isSignedIn]);
    const [currentusername,setcurrentusername] = useState('');
    const [currentpassword, setcurrentpassword] = useState('');

    const { fetchUsers, users } = useUserStore();
    useEffect(() => {fetchUsers();
    },[fetchUsers]);

    const checkPasswordByUsername = () => {
      const user = users.find(user => user.name === currentusername);
      
      setIsSignedIn(user ? user.password === currentpassword : false);
      console.log("User found:",user ? true : false);
    };

    return (
      <>
        <div className='flex flex-col w-full min-h-screen bg-gray-100'>
          <div className='flex flex-col w-full'>
            <span className='text-6xl font-bold mx-auto mt-5'>
              Log In
            </span>
            {isSignedIn === false && (
              <div className='text-red'>
                Hello!
              </div>
            )}
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
                  value={currentusername}
                  onChange={(e) => {setcurrentusername(e.target.value)}}
                  placeholder='Username'
                  className='p-2 w-[90%] sm:w-[50%]  mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none'
                />
                <input
                  value={currentpassword}
                  onChange={(e) => {setcurrentpassword(e.target.value)}}
                  placeholder='Password'
                  className='p-2 w-[90%] sm:w-[50%]  mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none mt-3'
                />
                <div className='flex flex-row w-[90%] sm:w-[50%] mx-auto mt-1'>
                  <div className='flex items-center justify-between'>
                    <button className='w-[1rem] h-[1rem] border border-gray-400 my-auto'>
                    </button>
                    <span className='ml-1 text-gray-7 00'>Remember me</span>
                  </div>
                  <button className='underline ml-auto'>
                    Forgot Password?
                  </button>
                </div>
                <div className='my-7 w-[90%] sm:w-[50%]  mx-auto'>
                  <button onClick={checkPasswordByUsername} className='w-full h-[2.5rem] rounded-md border-2 border-cyan bg-black hover:bg-gray-500 flex items-center justify-center'> 
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