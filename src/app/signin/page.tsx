'use client';

import { ButtonGroup, Button, Box, Input, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";
import { FaUserAstronaut } from "react-icons/fa";
import { MdLock } from "react-icons/md";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useAtom } from 'jotai';
import { solarModeAtom } from '../../components/ThemeAtom';
import SpotlightEffect from '@/components/SpotLight';
import LaggingSpotlight from '@/components/Flashlight';
import { flashlightModeAtom } from '@/components/ThemeAtom';

const SignInPage: React.FC = () => {

    const {data:authUser} = useQuery({queryKey:["authUser"]});

    const router = useRouter();
    
    useEffect(() => {
      if(authUser){
        router.push("/");
      }
    },[authUser, router]);

    const [isSolarMode] = useAtom(solarModeAtom);
    const [isFlashlightMode] = useAtom(flashlightModeAtom);

    const [credentials, setCredentials] = useState({
      username: "",
      password: ""
    });

    const queryClient = useQueryClient();

    const {mutate: loginMutation, error, isError} = useMutation({
      mutationFn: async (credentials: {username: string, password: string}) => {
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }

          return data;
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Login failed");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        toast.success("Login successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginMutation(credentials);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
      <>
        {isSolarMode && <SpotlightEffect />}
        {isFlashlightMode && <LaggingSpotlight />}
        <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(/assets/skybg.jpg)`}}>
          <div className="w-full max-w-md bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <PiSignIn className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your research portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaUserAstronaut className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={credentials.username}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={credentials.password}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              >
                <PiSignIn className="w-5 h-5 mr-2" />
                Sign In
              </button>

              {isError && (
                <div className="text-red-500 text-sm text-center">
                  {error?.message || 'Something went wrong'}
                </div>
              )}
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <FcGoogle className="w-5 h-5" />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <TfiFacebook className="w-5 h-5 text-blue-600" />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <FaApple className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

export default SignInPage;
