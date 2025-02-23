import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { formatMemberSinceDate } from '@/utils/date';

const ViewBlogPage = () => {

  const { id } = useParams();
  const { data: blog, error} = useQuery({queryKey: ["blogInfo", id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/blogs/fetch/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch blog");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  })
  const {data: ownerInfo} = useQuery({
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
  });

  const fallbackImage = "https://shorturl.at/6w7NB";

  const blogSinceDate = formatMemberSinceDate(blog?.createdAt);
  console.log(blog?.content);
  return (
    <>
      <div className='w-full min-h-screen'>
        <div className="relative w-[60%] my-10 mx-auto bg-white">
          <div className="relative h-fit-content bg-cover bg-center">
            <div className="break-words whitespace-normal">
              <h2 className="text-3xl sm:text-4xl font-bold text-black">{blog?.title}</h2>
            </div>
            <div className='flex flex-row items-center mt-5'>
              <img
                src={ownerInfo?.profileImg || fallbackImage}
                alt={ownerInfo?.username}
                className="w-8 h-8 rounded-full"
              />
              <button className="text-black hover:text-gray-700 text-lg ml-2"><Link to={`/profile/${ownerInfo?.username}`}>          
                <span>{ownerInfo?.username}</span>
              </Link></button>
              <div className='ml-auto text-gray-500 text-lg'>
                {blogSinceDate}
              </div>
            </div>
            <img 
              src={blog?.image}
              className="w-full h-[24rem] mt-5"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback fails
                e.target.src = fallbackImage; // Fallback image URL
              }}
            />
          </div>

          <div className="mt-5 bg">
            <div className='text-black text-lg'>
            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewBlogPage