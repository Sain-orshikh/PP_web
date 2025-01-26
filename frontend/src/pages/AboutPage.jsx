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
    <div>About</div>
  )
}

export default AboutPage