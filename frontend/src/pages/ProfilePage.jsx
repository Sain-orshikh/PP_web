import {React, useEffect, useRef, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Grid2, Button } from '@mui/material'

import userdefault from '../assets/userdefault.jpg'
import cover from "../assets/cover.png"
import { FaUserGraduate } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbFaceIdError } from 'react-icons/tb'
import { TbLoader } from 'react-icons/tb'

import boy1 from "../assets/boy1.png";
import boy2 from "../assets/boy2.png";
import boy3 from "../assets/boy3.png";
import girl1 from "../assets/girl1.png";
import girl2 from "../assets/girl2.png";
import girl3 from "../assets/girl3.png";

import EditProfileModal from '../components/EditProfileModal'
import {formatMemberSinceDate} from "../utils/date";
import { AnimatedNumber } from '@/components/ui/animatenumber'
import { useInView } from 'framer-motion'
import BlogCard from "../components/BlogCard";
import UseFollow from "../components/useFollow";
import RightPanel from '@/components/RightPanel'

const ProfilePage = () => {

	const queryClient = useQueryClient();

	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("blogs");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const avatars = [boy1, boy2, boy3, girl1, girl2, girl3];
	const chosenavatar = avatars[Math.floor(Math.random() * avatars.length)];

	const {username} = useParams();

	const {data: authUser} = useQuery({queryKey: ["authUser"]});

	const {data:user, isLoading, refetch, isRefetching} = useQuery({queryKey: ["userProfile"],
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
				throw new Error(error);
			}
		},
	});

	const {data: blogs} = useQuery({queryKey: ["blogs"]});

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImg" && setCoverImg(reader.result);
				state === "profileImg" && setProfileImg(reader.result);
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
				throw new Error(error);
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

	const amIFollowing = authUser?.following.includes(user?._id);

	const isMyProfile = authUser?._id === user?._id;

	useEffect(() => {
		refetch();
	},[username,refetch]);
 
  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  const  Blogs = blogs?.data//?.filter((blog) => blog.ownerId === user?._id)

  const userBlogs = Blogs?.filter((blog) => blog.ownerId._id.toString() === user?._id);
  
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum) => prevNum + 4);
	toast.success("Loading more blogs... (Potential error in portal)");
  };

  let displayedBlogs = [];

  if(userBlogs){
    displayedBlogs = [...userBlogs].slice(0, visibleBlogs);
  }

  return (
	<>
	<div className='flex-[4_4_0] flex flex-row border-r border-gray-700 min-h-screen'>
		{!user && <p className='text-center text-lg mt-4'>User not found</p>}
		<div className='flex flex-col w-full sm:w-[80%] bg-black border-x border-gray-700'>
			{user && (
				<>
					{/* COVER IMG */}
					<div className='relative group/cover'>
						<img
							src={coverImg || user?.coverImg || cover}
							className='h-52 w-full object-cover'
							alt='cover image'
						/>
						{isMyProfile && (
							<div
								className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
								onClick={() => coverImgRef.current.click()}
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
								<img src={profileImg || user?.profileImg || chosenavatar} />
								<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
									{isMyProfile && (
										<MdEdit
											className='w-4 h-4 text-white'
											onClick={() => profileImgRef.current.click()}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='flex justify-end px-4 mt-5'>
						{isMyProfile && <EditProfileModal authUser={authUser}/>}
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
								{isUpdatingProfile ? "Updating..." : "Update"}
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
								<span className='text-md text-slate-500'>{memberSinceDate}</span>
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
									onClick={() => {setFeedType("projects"), toast.error("Projects are not available yet")}}
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
                <div className=''><Grid2 container spacing={2} columns={12} minHeight={290} >
                  {displayedBlogs.map((blog) => (
                  <Grid2 
                    xs={12} // 1 column on extra-small screens
                    sm={4}  // 2 columns on small screens and up
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} onUpdate={handleinval} inprofile={true} />
                  </Grid2>
                  ))}
                </Grid2></div>
              </div>
			)}
			{userBlogs && visibleBlogs < userBlogs.length && (
				<div className='flex flex-row justify-center w-full mt-3'>
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