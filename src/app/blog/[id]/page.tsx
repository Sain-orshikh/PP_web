'use client';

import React, { memo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query';
import { formatMemberSinceDate } from '@/utils/date';

import { solarModeAtom, flashlightModeAtom } from '@/components/ThemeAtom';
import { useAtom } from 'jotai';
import SpotlightEffect from '@/components/SpotLight';
import LaggingSpotlight from '@/components/Flashlight';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  ownerId: {
    username: string;
  };
}

interface OwnerInfo {
  username: string;
  profileImg?: string;
}

const ViewBlogPage: React.FC = () => {
  const { id } = useParams();
  
  const { data: blog, error} = useQuery<Blog>({
    queryKey: ["blogInfo", id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch blog");
        return data;
      } catch (error) {
        throw new Error(error as string);
      }
    }
  })
  
  const {data: ownerInfo} = useQuery<OwnerInfo>({
    queryKey: ["ownerInfo", blog?.ownerId.username],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${blog?.ownerId.username}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch user");
        console.log("Owner info:", data);
        return data;
      } catch (error) {
        console.error("Error fetching owner info:", error);
        throw error;
      }
    },
    enabled: !!blog?.ownerId.username,
  });

  const fallbackImage = "https://shorturl.at/6w7NB";

  const blogSinceDate = formatMemberSinceDate(blog?.createdAt);

  const [solarMode] = useAtom(solarModeAtom);
  const [flashlightMode] = useAtom(flashlightModeAtom);

  return (
    <>
      {solarMode && <SpotlightEffect />}
      {flashlightMode && <LaggingSpotlight />}
      <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
        <div className="relative w-[60%] my-10 mx-auto bg-gray-100 dark:bg-gray-900">
          <div className="relative h-fit-content bg-cover bg-center">
            <div className="break-words whitespace-normal">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">{blog?.title}</h2>
            </div>
            <div className='flex flex-row items-center mt-5'>
              <img
                src={ownerInfo?.profileImg || fallbackImage}
                alt={ownerInfo?.username}
                className="w-8 h-8 rounded-full"
              />
              <button className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 text-lg ml-2">
                <Link href={`/profile/${ownerInfo?.username}`}>          
                  <span>{ownerInfo?.username}</span>
                </Link>
              </button>
              <div className='ml-auto text-gray-500 dark:text-gray-400 text-lg'>
                {blogSinceDate}
              </div>
            </div>
            <img 
              src={blog?.image}
              className="w-full h-[24rem] mt-5"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop if fallback fails
                target.src = fallbackImage; // Fallback image URL
              }}
              alt={blog?.title || "Blog image"}
            />
          </div>

          <div className="mt-5 bg">
            <div className='text-black text-lg dark:text-white'>
              <div dangerouslySetInnerHTML={{ __html: blog?.content || '' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewBlogPage
