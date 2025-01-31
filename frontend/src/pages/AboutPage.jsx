import ocean from "../assets/ocean.jpg";
import React from 'react'
import { useQuery } from '@tanstack/react-query';

const AboutPage = () => {

  const {data: blogs, error, isLoading} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("/api/blogs/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
    retry: false,
  });
  console.log(blogs);

  const Blogs = blogs?.data;

  console.log(Blogs);

  if(Blogs){
    Blogs.slice(0, 3);
    console.log("Hihi");
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Curved Line */}
      <div className="w-1/2 flex justify-center items-center bg-white relative">
        <svg
          viewBox="0 0 200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-full"
        >
          <path
            d="M50 10 Q 150 400, 50 790"
            stroke="gray"
            strokeWidth="3"
            strokeDasharray="10 10"
            fill="transparent"
          />
        </svg>
      </div>

      {/* Right Side - Background Image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${ocean})` }}
      ></div>
    </div>
  );
}

export default AboutPage