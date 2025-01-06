import { Button, Box, Alert, Snackbar } from "@mui/material"
import { Link } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { useBlogStore } from "../store/blog";
import { useState } from "react";
function BlogCard({blog}) {

    const {deleteBlog} = useBlogStore()
    const handleDeleteBlog = async (pid) => {
      const { success,message } = await deleteBlog(pid)
      console.log("Success:",success);
      console.log("Message:",message);
    };
    return (
      <>
          <Box className="w-[18rem] min-h-[15rem] rounded border border-gray-500 transition-transform transform hover:-translate-y-1.5">
          {/*<img src="" className="max-w-full h-[5rem] bg-blue-500"></img>*/}
            <button className="w-full">
              <Link to={"/create"}>
                <div className="w-full h-[13rem] border-b border-gray-500">
                  <img
                    src={blog.image}
                    alt="Blog image"
                    className="w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback fails
                      e.target.src = "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGRlZmF1bHQlMjBibG9nfGVufDB8fDB8fHww"; // Fallback image URL
                    }}
                  />
                </div>
              </Link>
            </button>
          <div className="flex flex-row">
            <div><button onClick={() => handleDeleteBlog(blog._id)} className="ml-2"><FaRegEdit fontSize={20}/></button></div>  
            <div><h6 className="mx-1 mb-1">{blog.title}</h6 ></div>
          </div>
        </Box>
      </>
    )
  }
  
  export default BlogCard
            