import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaApple, FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function SignUpPage() {

  const queryClient = useQueryClient();

  const [newUser, setnewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

	const { mutate: singupMutation, isError, error, isPending} = useMutation({
		mutationFn: async({username, email, password}) => {
			try{
				const res = await fetch('/api/auth/signup',{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body: JSON.stringify({username, email, password}),
				});
				
				const data = await res.json();
				if(!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
			}
			catch(error){
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully (reload to continue)");
			queryClient.invalidateQueries({queryKey:["authUser"]});
		},
	});

	const handleSignUp = (e) => {
		e.preventDefault();
		singupMutation(newUser);
	};

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100">
        <div className="w-[90%] sm:w-[30%] flex flex-col items-center justify-center mx-auto border-b border-gray-300">
          <div className="w-full mx-auto mt-16">
            <span className="block text-3xl font-bold text-center">Create your account</span>
            <span className="block text-md text-gray-500 text-center mt-2">Start your journey with us today</span>
          </div>
          <div className="w-full mt-7">
            <div className="text-gray-800">
             Email address
            </div>
            <div className="flex flex-row w-full mt-1 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600">
              <div className="flex items-center justify-center w-[2.5rem] h-[2.5rem] text-gray-500 bg-white border-t border-b border-l border-gray-300">
                <IoMdMail fontSize={20}/>
              </div>
              <input
                value={newUser.email}
                onChange={(e) => setnewUser({...newUser, email: e.target.value})}
                placeholder=" Enter your email"
                className="w-full h-[2.5rem] border-t border-b border-r border-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <div className="text-gray-800">
              Username
            </div>
            <div className="flex flex-row w-full mt-1 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600">
              <div className="flex items-center justify-center w-[2.5rem] h-[2.5rem] text-gray-500 bg-white border-t border-b border-l border-gray-300">
                <MdAccountCircle fontSize={25}/>
              </div>
              <input
                value={newUser.name}
                onChange={(e) => setnewUser({...newUser, name: e.target.value})}
                placeholder=" Choose a username"
                className="w-full h-[2.5rem] border-t border-b border-r border-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <div className="text-gray-800">
              Password
            </div>
            <div className="flex flex-row w-full mt-1 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600">
              <div className="flex items-center justify-center w-[2.5rem] h-[2.5rem] text-gray-500 bg-white border-t border-b border-l border-gray-300">
                <FaLock fontSize={20}/>
              </div>
              <input
                value={newUser.password}
                onChange={(e) => setnewUser({...newUser, password: e.target.value})}
                placeholder=" Create a password"
                className="w-full h-[2.5rem] border-t border-b border-r border-gray-300 focus:outline-none"
              />
            </div>
            {isError && <p className='text-red-500'>{error.message}</p>}
          </div>
          <div className="w-full my-7">
            <button onClick={handleSignUp} className="w-full h-[2.5rem] bg-black rounded hover:bg-gray-800">
              <span className="block text-center text-white">
                Sign up
              </span>
            </button>
          </div>
        </div>
        <div className="w-[90%] sm:w-[30%] flex flex-col items-center justify-center mx-auto">
          <div className="w-full flex flex-row justify-between mt-7">
            <button className="flex items-center justify-center w-[30%] h-[2.5rem] bg-white border rounded text-gray-500 hover:bg-gray-200">
              <FaGoogle/>
            </button>
            <button className="flex items-center justify-center w-[30%] h-[2.5rem] bg-white border rounded text-gray-500 hover:bg-gray-200">
              <FaFacebookF/>
            </button>
            <button className="flex items-center justify-center w-[30%] h-[2.5rem] bg-white border rounded text-gray-500 hover:bg-gray-200">
              <FaApple/>
            </button>
          </div>
          <div className="w-full mt-8 mb-16">
            <span className="block text-center"><span className="text-gray-500">Already have an account? </span><button className="font-bold"><Link to={"/signin"}>Sign in</Link></button></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;