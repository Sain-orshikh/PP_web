import { useEffect, useState } from "react";
import pp_logo from "../assets/pp-logo.png"
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBookReader, FaRegEdit, FaLongArrowAltRight } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const SignInSuccessPage = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {data: authUser} = useQuery({queryKey: ["authUser"]});

  if(!authUser){
    navigate("/signin");
  };

  const [updatedUser, setupdatedUser] =  useState({
    username: authUser?.username,
    email: authUser?.email,
    currentpassword: "",
    newpassword: "",
    bio: authUser?.bio,
  });

  const customVariants = {
      initial: {
        opacity: 0,
        scale: 0.95,
        y: 40,
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 40,
      },
    };

  const customTransition = {
    type: 'spring',
    bounce: 0,
    duration: 0.25,
  };

    const {mutate:logoutMutation} = useMutation({
      mutationFn: async() => {
        try{
          const res = await fetch("/api/auth/logout",{
            method: "POST",
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error || "Failed to logout");
          console.log(data);
          return data;
        }
        catch(error){
          console.error(error);
          throw error;
        }
      },
      onSuccess: () => {
        toast.success("Logged out successfully");
        queryClient.invalidateQueries({queryKey:["authUser"]});
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }); 

    const handleSignOut = () => {
        logoutMutation();
    };

    const {mutate: updateUserMutation} = useMutation({
      mutationFn: async(updatedUser) => {
        try{
          const res = await fetch(`/api/users/update`,{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedUser),
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error || "Failed to update user");
          console.log(data);
          return data;
        }
        catch(error){
          console.error(error);
          throw error;
        }
      },
      onSuccess: () => {
        toast.success("User updated successfully");
        queryClient.invalidateQueries({queryKey:["authUser"]});
        DialogClose();
      }
    })

    const handleUpdateUser = async(updatedUser) => {
      updateUserMutation(updatedUser);
    };

    return (
      <>
        <div className="w-full min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
          <div className="flex flex-row justify-between w-[95%] h-[5rem] bg-white dark:bg-black mt-7 mx-auto rounded-md">
            <div className="ml-5 w-[60%]">
              <span className="block font-bold text-xl sm:text-2xl mt-3 dark:text-white">Welcome back, {authUser.username}!</span>
              <span className="block text-gray-500 dark:text-gray-200">Successfully signed in</span>
            </div>
            <div className="flex items-center h-full">
              <button onClick={handleSignOut} className="bg-black dark:bg-white text-white dark:text-black rounded p-1.5 mr-5 hover:bg-gray-800 dark:hover:bg-gray-200">
                <span className="mx-2">Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-evenly sm:flex-row w-[95%] mx-auto mt-7 space-y-2">
            <div className="w-[90%] sm:w-[28%] min-h-[10rem] mx-auto sm:mx-0 bg-white dark:bg-black rounded-md">
              <div className="w-full h-full p-4 dark:text-white"><div>
                <FaHome fontSize={30}/>
              </div>
              <div className="mt-2 text-xl dark:text-white font-bold">
                Homepage
              </div>
              <div className="mt-1 text-gray-500 dark:text-gray-200">
                Discover the latest updates and new projects
              </div>
              <div className="flex flex-row items-center font-bold mt-2 dark:text-white">
                <button><Link to={"/"} className="flex flex-row items-center">Visit Homepage <FaLongArrowAltRight fontSize={15} className="mt-1 ml-1"/></Link></button>
              </div></div>
            </div>
            <div className="w-[90%] sm:w-[28%] min-h-[10rem] mx-auto sm:mx-0 bg-white dark:bg-black rounded-md space-y-2">
              <div className="w-full h-full p-4 dark:text-white"><div>
                <FaBookReader fontSize={30}/>
              </div>
              <div className="mt-2 text-xl font-bold dark:text-white">
                Blog Explorer
              </div>
              <div className="mt-1 text-gray-500 dark:text-gray-200">
                Read interesting articles from our community
              </div>
              <div className="flex flex-row items-center font-bold mt-2 dark:text-white">
                <button><Link to={"/blog"} className="flex flex-row items-center">Explore Blogs <FaLongArrowAltRight fontSize={15} className="mt-1 ml-1"/></Link></button>
              </div></div>
            </div>
            <div className="w-[90%] sm:w-[28%] min-h-[10rem] mx-auto sm:mx-0 bg-white dark:bg-black rounded-md space-y-2">
              <div className="w-full h-full p-4 dark:text-white"><div>
                <FaRegEdit fontSize={30}/>
              </div>
              <div className="mt-2 text-xl font-bold dark:text-white">
                Create Blog
              </div>
              <div className="mt-1 text-gray-500 dark:text-gray-200">
                Share your thoughts with MAIS
              </div>
              <div className="flex flex-row items-center font-bold mt-2 dark:text-white">
                <button><Link to={"/create/blog"} className="flex flex-row items-center">Start writing <FaLongArrowAltRight fontSize={15} className="mt-1 ml-1"/></Link></button>
              </div></div>
            </div>
          </div>
          <div className="flex flex-col w-[95%] min-h-[15rem] bg-white dark:bg-black rounded-md mx-auto mt-7 p-4">
            <div className="mt-1 flex justify-between">
              <span className="font-bold text-xl dark:text-white">Profile Information</span>
              <button className="rounded bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 hover:bg-gray-800 dark:hover:bg-gray-200">
                <Link to={`/profile/${authUser?.username}`}>
                  To Profile
                </Link>
              </button>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col w-[60%] sm:w-[75%]">
                <span className="text-gray-500 dark:text-gray-200">Username</span>
                <span className="w-full break-words whitespace-pre-wrap dark:text-white">{authUser.username}</span>
              </div>
              <div>
                <Dialog variants={customVariants} transition={customTransition}>
                  <DialogTrigger className='bg-black dark:bg-white p-2 text-white dark:text-black text-md hover:bg-gray-800 dark:hover:bg-gray-200 rounded'>
                    <FaGear fontSize={20}/>
                  </DialogTrigger>
                  <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
                    <DialogHeader>
                      <DialogTitle className='text-zinc-900 text-center dark:text-white text-3xl'>
                        Enter your new credentials
                      </DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Email
                      </label>
                      <input
                        value={updatedUser.email}
                        onChange={(e) => setupdatedUser({ ...updatedUser, email: e.target.value })}
                        id='name'
                        type='email'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Username
                      </label>
                      <input
                        value={updatedUser.username}
                        onChange={(e) => setupdatedUser({ ...updatedUser, username: e.target.value })}
                        id='name'
                        type='username'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your username'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Current Password
                      </label>
                      <input
                        value={updatedUser.currentpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, currentpassword: e.target.value })}
                        id='name'
                        type='currentpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your current password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        New password
                      </label>
                      <input
                        value={updatedUser.newpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, newpassword: e.target.value })}
                        id='name'
                        type='newpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your new password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Bio
                      </label>
                      <input
                        value={updatedUser.bio}
                        onChange={(e) => setupdatedUser({ ...updatedUser, bio: e.target.value })}
                        id='name'
                        type='bio'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your bio'
                      />
                    </div>
                    <div className="mt-4 w-fit ml-auto">
                      <button onClick={() => handleUpdateUser(updatedUser)} className='bg-zinc-950 text-white rounded-lg px-4 py-2 hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'>
                        Update
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col w-[60%] sm:w-[75%]">
                <span className="text-gray-500 dark:text-gray-200">Email</span>
                <span className="w-full break-words whitespace-pre-wrap dark:text-white">{authUser.email}</span>
              </div>
              <div>
                <Dialog variants={customVariants} transition={customTransition}>
                  <DialogTrigger className='bg-black dark:bg-white p-2 text-white dark:text-black text-md hover:bg-gray-800 dark:hover:bg-gray-200 rounded'>
                    <FaGear fontSize={20}/>
                  </DialogTrigger>
                  <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
                    <DialogHeader>
                      <DialogTitle className='text-zinc-900 text-center dark:text-white text-3xl'>
                        Enter your new credentials
                      </DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Email
                      </label>
                      <input
                        value={updatedUser.email}
                        onChange={(e) => setupdatedUser({ ...updatedUser, email: e.target.value })}
                        id='name'
                        type='email'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Username
                      </label>
                      <input
                        value={updatedUser.username}
                        onChange={(e) => setupdatedUser({ ...updatedUser, username: e.target.value })}
                        id='name'
                        type='username'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your username'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Current Password
                      </label>
                      <input
                        value={updatedUser.currentpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, currentpassword: e.target.value })}
                        id='name'
                        type='currentpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your current password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        New password
                      </label>
                      <input
                        value={updatedUser.newpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, newpassword: e.target.value })}
                        id='name'
                        type='newpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your new password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Bio
                      </label>
                      <input
                        value={updatedUser.bio}
                        onChange={(e) => setupdatedUser({ ...updatedUser, bio: e.target.value })}
                        id='name'
                        type='bio'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your bio'
                      />
                    </div>
                    <div className="mt-4 w-fit ml-auto">
                      <button onClick={() => handleUpdateUser(updatedUser)} className='bg-zinc-950 text-white rounded-lg px-4 py-2 hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'>
                        Update
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-200">Password</span>
                <span className="dark:text-white">********</span>
              </div>
              <div>
                <Dialog variants={customVariants} transition={customTransition}>
                  <DialogTrigger className='bg-black dark:bg-white p-2 text-white dark:text-black text-md hover:bg-gray-800 dark:hover:bg-gray-200 rounded'>
                    <FaGear fontSize={20}/>
                  </DialogTrigger>
                  <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
                    <DialogHeader>
                      <DialogTitle className='text-zinc-900 text-center dark:text-white text-3xl'>
                        Enter your new credentials
                      </DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Email
                      </label>
                      <input
                        value={updatedUser.email}
                        onChange={(e) => setupdatedUser({ ...updatedUser, email: e.target.value })}
                        id='name'
                        type='email'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Username
                      </label>
                      <input
                        value={updatedUser.username}
                        onChange={(e) => setupdatedUser({ ...updatedUser, username: e.target.value })}
                        id='name'
                        type='username'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your username'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Current Password
                      </label>
                      <input
                        value={updatedUser.currentpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, currentpassword: e.target.value })}
                        id='name'
                        type='currentpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your current password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        New password
                      </label>
                      <input
                        value={updatedUser.newpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, newpassword: e.target.value })}
                        id='name'
                        type='newpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your new password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Bio
                      </label>
                      <input
                        value={updatedUser.bio}
                        onChange={(e) => setupdatedUser({ ...updatedUser, bio: e.target.value })}
                        id='name'
                        type='bio'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your bio'
                      />
                    </div>
                    <div className="mt-4 w-fit ml-auto">
                      <button onClick={() => handleUpdateUser(updatedUser)} className='bg-zinc-950 text-white rounded-lg px-4 py-2 hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'>
                        Update
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col w-[60%] sm:w-[75%]">
                <span className="text-gray-500 dark:text-gray-200">Bio</span>
                <span className="w-full break-words whitespace-pre-wrap dark:text-white">{authUser.bio}</span>
              </div>
              <div>
                <Dialog variants={customVariants} transition={customTransition}>
                  <DialogTrigger className='bg-black dark:bg-white p-2 text-white dark:text-black text-md hover:bg-gray-800 dark:hover:bg-gray-200 rounded'>
                    <FaGear fontSize={20}/>
                  </DialogTrigger>
                  <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
                    <DialogHeader>
                      <DialogTitle className='text-zinc-900 text-center dark:text-white text-3xl'>
                        Enter your new credentials
                      </DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Email
                      </label>
                      <input
                        value={updatedUser.email}
                        onChange={(e) => setupdatedUser({ ...updatedUser, email: e.target.value })}
                        id='name'
                        type='email'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Username
                      </label>
                      <input
                        value={updatedUser.username}
                        onChange={(e) => setupdatedUser({ ...updatedUser, username: e.target.value })}
                        id='name'
                        type='username'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your username'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Current Password
                      </label>
                      <input
                        value={updatedUser.currentpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, currentpassword: e.target.value })}
                        id='name'
                        type='currentpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your current password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        New password
                      </label>
                      <input
                        value={updatedUser.newpassword}
                        onChange={(e) => setupdatedUser({ ...updatedUser, newpassword: e.target.value })}
                        id='name'
                        type='newpassword'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your new password'
                      />
                    </div>
                    <div className='flex flex-col space-y-4'>
                      <label htmlFor='name' className='sr-only'>
                        Bio
                      </label>
                      <input
                        value={updatedUser.bio}
                        onChange={(e) => setupdatedUser({ ...updatedUser, bio: e.target.value })}
                        id='name'
                        type='bio'
                        className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-lg text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5'
                        placeholder='Enter your bio'
                      />
                    </div>
                    <div className="mt-4 w-fit ml-auto">
                      <button onClick={() => handleUpdateUser(updatedUser)} className='bg-zinc-950 text-white rounded-lg px-4 py-2 hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'>
                        Update
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                </div>
            </div>            
          </div>
        </div>
      </>
    )
  }
  
  export default SignInSuccessPage