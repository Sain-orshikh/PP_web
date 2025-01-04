import { ButtonGroup, Button, Box, Input } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function SignInPage() {
    
    const [email,setEmail] = useState('');

    return (
      <>
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
          <div className='flex flex-col w-full'>
            <span className='text-6xl font-bold mx-auto'>
              Log In
            </span>
            <span className='mt-3 mx-auto text-xl'>
              Don't have an account? <button className='text-blue-500'><Link to={'/signup'}>Sign Up</Link></button>
            </span>
          </div>
          <div className='flex flex-col w-full mt-3'>
            <input
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              placeholder='Email'
              className='p-2 w-[25%] mx-auto bg-white border-b-2 border-black-700 hover:border-black focus:border-none'
            />
            <div className='w-[25%] mx-auto'>
              <button className='mt-2 underline'>
                Forgot Email?
              </button>
            </div>
            <div className='mt-7 w-[25%] mx-auto'>
              <button className='h-[2.5rem] rounded-2xl border border-cyan bg-white hover:bg-blue-500'> 
                <span className='p-3 text-blue-500 hover:text-white'>Continue with Email   &gt;</span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default SignInPage