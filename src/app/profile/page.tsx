'use client';

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Grid, Button } from '@mui/material'

import { MdEdit } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbLoader } from 'react-icons/tb'

import {formatMemberSinceDate} from "../../utils/date";
import { AnimatedNumber } from '@/components/ui/animatenumber'
import BlogCard from "../../components/BlogCard";
import UseFollow from "@/components/UseFollow";
import RightPanel from '@/components/RightPanel'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useAtom } from 'jotai'
import { solarModeAtom } from '@/components/ThemeAtom'
import LaggingSpotlight from '@/components/Flashlight'
import SpotlightEffect from '@/components/SpotLight'
import { flashlightModeAtom } from '@/components/ThemeAtom'
import { IUser } from '@/models/User';

const ProfilePage: React.FC = () => {

	const queryClient = useQueryClient();

	const [coverImg, setCoverImg] = useState<string | null>(null);
	const [profileImg, setProfileImg] = useState<string | null>(null);
	const [feedType, setFeedType] = useState("blogs");

	const coverImgRef = useRef<HTMLInputElement>(null);
	const profileImgRef = useRef<HTMLInputElement>(null);

	const avatars = [
		"/assets/boy1.png", 
		"/assets/boy2.png", 
		"/assets/boy3.png", 
		"/assets/girl1.png", 
		"/assets/girl2.png", 
		"/assets/girl3.png"
	];
	const chosenavatar = avatars[Math.floor(Math.random() * avatars.length)];
	const cover = "/assets/city.jpg"; // Default cover image

	const {username} = useParams();

	const {data: authUser} = useQuery<IUser>({queryKey: ["authUser"]});

	const {data:user, isLoading, refetch, isRefetching} = useQuery<IUser>({queryKey: ["userProfile"],
		queryFn: async () => {
			try{
				const res = await fetch (`/api/users/profile/${username}`);
				const data = await res.json();
				if(!res.ok) {
					throw new Error(data.message || "Something went wrong");
				}
				return data;
			} 
			catch (error) {
				throw new Error(error instanceof Error ? error.message : "Something went wrong");
			}
		},
	});

	const {data: blogs} = useQuery({queryKey: ["blogs"]});

	const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>, state: string) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (state === "coverImg" && typeof reader.result === 'string') {
					setCoverImg(reader.result);
				}
				if (state === "profileImg" && typeof reader.result === 'string') {
					setProfileImg(reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const {mutate: updateProfileMutation, isPending: isUpdatingProfile} = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/users/update", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						coverImg,
						profileImg,
					}),
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error instanceof Error ? error.message : "Something went wrong");
			}
		},
		onSuccess: () => {
			toast.success("Profile updated successfully")
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
				queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
			])
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const memberSinceDate = formatMemberSinceDate(user?.createdAt);

	const {followUser, isPending} = UseFollow();

	const amIFollowing = authUser?.following?.includes(user?._id || '');

	const isMyProfile = authUser?._id === user?._id;

	useEffect(() => {
		refetch();
	},[username,refetch]);
 
  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  const Blogs = (blogs as any)?.data || [];

  const userBlogs = Blogs?.filter((blog: any) => blog.ownerId._id.toString() === user?._id);
  
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum) => prevNum + 4);
	toast.success("Loading more blogs... (Potential error in portal)");
  };

  const [updatedUser, setupdatedUser] = useState({
	username: authUser?.username || '',
	email: authUser?.email || '',
	bio: authUser?.bio || '',
	currentpassword: '',
	newpassword: '',
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
	ease: 'easeOut',
	};

    const {mutate: updateUserMutation} = useMutation({
		mutationFn: async(updatedUser: any) => {
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
			throw error instanceof Error ? error : new Error("Failed to update user");
		  }
		},
		onSuccess: () => {
		  toast.success("User updated successfully");
		  queryClient.invalidateQueries({queryKey:["authUser"]});
		  queryClient.invalidateQueries({queryKey:["userProfile"]});
		},
		onError: (error) => {
		  toast.error(error.message);
		},
	})
  
	const handleUpdateUser = async(updatedUser: any) => {
		updateUserMutation(updatedUser);
	};

  let displayedBlogs: any[] = [];

  if(userBlogs){
    displayedBlogs = [...userBlogs].slice(0, visibleBlogs);
  }

  const [isSolarMode] = useAtom(solarModeAtom)
  const [isFlashlightMode] = useAtom(flashlightModeAtom)

  return (
	<>
	{isSolarMode && <SpotlightEffect />}
	{isFlashlightMode && <LaggingSpotlight />}
	<div className='flex-[4_4_0] flex flex-row border-r border-gray-700 min-h-screen'>
		{!user && <p className='text-center text-lg mt-4'>User not found</p>}
		<div className='flex flex-col w-full sm:w-[80%] bg-black border-x border-gray-700'>
			{user && (
				<>
					{/* COVER IMG */}
					<div className='relative group/cover bg-white'>
						<img
							src={coverImg || user?.coverImg || cover}
							className='h-52 w-full object-cover'
							alt='cover image'
						/>
						{isMyProfile && (
							<div
								className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
								onClick={() => coverImgRef.current?.click()}
							>
								<MdEdit className='w-5 h-5 text-white' />
							</div>
						)}

						<input
							type='file'
							hidden
							accept="image/*"
							ref={coverImgRef}
							onChange={(e) => handleImgChange(e, "coverImg")}
						/>
						<input
							type='file'
							hidden
							accept="image/*"
							ref={profileImgRef}
							onChange={(e) => handleImgChange(e, "profileImg")}
						/>
						{/* USER AVATAR */}
						<div className='avatar absolute -bottom-16 left-4'>
							<div className='w-32 rounded-full relative group/avatar'>
								<img src={profileImg || user?.profileImg || chosenavatar} alt="Profile avatar" />
								<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
									{isMyProfile && (
										<MdEdit
											className='w-4 h-4 text-white'
											onClick={() => profileImgRef.current?.click()}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='flex justify-end px-4 mt-5'>
						{isMyProfile && (
							<div>
							<Dialog variants={customVariants} transition={customTransition}>
							  <DialogTrigger className='bg-white px-4 py-2 text-black text-md hover:bg-gray-300 rounded-xl'>
								Update
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
						)}
						{!isMyProfile && (
							<button
								className='border-2 p-2 border-white rounded-xl bg-black text-white hover:bg-gray-700'
								onClick={() => followUser(user?._id)}
							>
								{isPending && "Loading..."}
								{!isPending && amIFollowing && "Unfollow"}
								{!isPending && !amIFollowing && "Follow"}
							</button>
						)}
						{(coverImg || profileImg) && (
							<button
								className='border-2 border-white px-4 ml-2 bg-black text-white hover:bg-gray-700 rounded-xl'
								onClick={() => updateProfileMutation()}
							>
								{isUpdatingProfile ? "Uploading..." : "Upload"}
							</button>
						)}
					</div>

					<div className='flex flex-col gap-4 mt-10 px-4'>
						<div className='flex flex-col'>
							<span className='font-bold text-2xl text-white'>{user?.username}</span>
							<span className='text-md mt-5 text-white'>{user?.bio}</span>
						</div>

						<div className='flex gap-2 flex-wrap'>
							<div className='flex gap-2 items-center'>
								<IoCalendarOutline className='w-4 h-4 text-slate-500' />
								<span className='text-md text-slate-500'>Joined {memberSinceDate}</span>
							</div>
						</div>
						<div className='flex gap-2'>
							<div className='flex gap-1 items-center'>
								<AnimatedNumber value={user?.following.length} as='span' className="font-bold text-sm text-white" />
								<span className='text-slate-500 text-sm'>Following</span>
							</div>
							<div className='flex gap-1 items-center'>
								<AnimatedNumber value={user?.followers.length} as='span' className="font-bold text-sm text-white" />
								<span className='text-slate-500 text-sm'>Followers</span>
							</div>
						</div>
					</div>
					<div className='flex w-full border-b border-gray-700 mt-4'>
								<div
									className='flex justify-center flex-1 p-3 text-white hover:text-slate-500 transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("blogs")}
								>
									Blogs
									{feedType === "blogs" && (
										<div className='absolute bottom-0 w-10 h-1 rounded-full bg-blue-500' />
									)}
								</div>
								<div
									className='flex justify-center flex-1 p-3 text-slate-500 hover:text-white transition duration-300 relative cursor-pointer'
									onClick={() => {
										setFeedType("projects");
										toast.error("Projects are not available yet");
									}}
								>
									Projects
									{feedType === "projects" && (
										<div className='absolute bottom-0 w-10  h-1 rounded-full bg-inherit' />
									)}
								</div>
							</div>
				</>
			)}
			{userBlogs && (
              <div className='flex flex-row justify-evenly space-around w-[90%] mx-auto mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-[290px]'>
                  {displayedBlogs.map((blog) => (
                  <div 
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} onUpdate={handleinval} inprofile={true} />
                  </div>
                  ))}
                </div>
              </div>
			)}
			{userBlogs && visibleBlogs < userBlogs.length && (
				<div className='flex flex-row justify-center w-full mt-3 mb-3 sm:mb-1'>
                <div className='bg-black hover:bg-gray-700 rounded-lg border border-white'><Button onClick={handleLoadMore}>
                  <span className='capitalize text-white'>Load more</span>
                  <span className='text-white ml-1'><TbLoader fontSize={20}/></span>
                </Button></div>
              </div>
			)}	
		</div>
		<div className='w-[20%] hidden sm:block bg-black'>
			<RightPanel />
		</div>
	</div>
	</>
  )
}

export default ProfilePage
