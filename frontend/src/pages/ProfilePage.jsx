import {React, useEffect, useRef, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Grid2, TableRow } from '@mui/material'

import userdefault from '../assets/userdefault.jpg'
import cover from "../assets/cover.png"
import { FaUserGraduate } from "react-icons/fa6";
import {formatMemberSinceDate} from "../utils/date";
import BlogCard from "../components/BlogCard";
import UseFollow from "../components/useFollow";

const ProfilePage = () => {

	const queryClient = useQueryClient();

	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

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

	if(authUser){const isMyProfile = authUser._id === user?._id};

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

	if(authUser) {const amIFollowing = authUser?.following.includes(user?._id)};

	useEffect(() => {
		refetch();
	},[username,refetch]);
 
  const handleinval = () => {
    queryClient.invalidateQueries({queryKey: ['blogs']});
  };

  const  Blogs = blogs?.data//?.filter((blog) => blog.ownerId === user?._id)

  const userBlogs = Blogs.filter((blog) => blog.ownerId._id.toString() === user?._id);
  console.log("Blogs:", Blogs);
  console.log(typeof user?._id, user?._id);
console.log(typeof Blogs[0]?.ownerId, Blogs[0]?.ownerId);
  console.log("User Blogs:", userBlogs);

  return (
    <>
    <div className='flex flex-col'>
      <div>{username}</div>
      <div>
        <img
          src={coverImg || user?.coverImg || cover}
          className='h-52 w-full object-cover'
          alt='cover image'
        />
      </div>
      <div>
        <img
          src={profileImg || user?.profileImg || userdefault}
          className='h-24 w-full object-cover rounded-full'
          alt='profile image'
        />
      </div>
      {Blogs && (
              <div className='flex flex-row justify-evenly space-around w-[90%] mx-auto mt-10'>
                <div className=''><Grid2 container spacing={2} columns={12} minHeight={290} >
                  {userBlogs.map((blog) => (
                  <Grid2 
                    xs={12} // 1 column on extra-small screens
                    sm={4}  // 2 columns on small screens and up
                    key={blog._id}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} onUpdate={handleinval} />
                  </Grid2>
                  ))}
                </Grid2></div>
              </div>)}
              </div>
    </>
  )
}

export default ProfilePage