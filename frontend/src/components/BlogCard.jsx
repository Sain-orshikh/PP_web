import { Button, Box, Alert, Snackbar, Modal } from "@mui/material"
import { Link } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { useBlogStore } from "../store/blog";
import { useState } from "react";
import { IoLinkSharp } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
function BlogCard({blog}) {

    const [modalOpen, setmodalOpen] = useState(false);

    const {deleteBlog} = useBlogStore()
    const handleDeleteBlog = async (bid) => {
      const { success,message } = await deleteBlog(bid)
      console.log("Success:",success);
      console.log("Message:",message);
    };

    const [updatedBlog, setupdatedBlog] = useState(blog);

    const {updateBlog} = useBlogStore()
    const handleUpdateBlog = async (bid, updatedBlog) => {
      const { success, message } = await updateBlog(bid, updatedBlog)
      setmodalOpen(false)
    };

    const [viewBlogModal, setviewBlogModal] = useState(false);

    return (
      <>
          <Box className="w-[18rem] min-h-[15rem] rounded border border-gray-500 transition-transform transform hover:-translate-y-1.5">
          {/*<img src="" className="max-w-full h-[5rem] bg-blue-500"></img>*/}
            <button onClick={() => {setviewBlogModal(true)}} className="w-full h-[13rem] border-b border-gray-500">
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
            </button>
          <div className="flex flex-row">
            <div><button onClick={() => {setmodalOpen(true)}} className="ml-2"><FaRegEdit fontSize={20}/></button></div>  
            <div><h6 className="mx-1 mb-1">{blog.title}</h6 ></div>
          </div>
        </Box>
        <Modal
          open={modalOpen}
        >
          <div className="bg-gray-100 w-[75%] mx-auto mt-10 rounded-xl">
            <div className="mt-3 mx-1">
              <input
                value={updatedBlog.title}
                onChange={(e) => setupdatedBlog({ ...updatedBlog, title: e.target.value})}
                placeholder=" Enter new blog title"
                className="w-full h-8 pb-1 mt-1 border rounded"
              />
            </div>
            <div className="mt-1 mx-1">
              <textarea
                value={updatedBlog.prompt}
                onChange={(e) => setupdatedBlog({ ...updatedBlog, prompt: e.target.value})}
                placeholder=" Enter new blog prompt"
                className="w-full h-20 text-left border rounded"
              />
            </div>
            <div className='focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600 rounded mx-1 mt-1'>
              <div className='flex items-center w-full bg-gray-100 rounded rounded-b-none border '>
                <button className='ml-2 w-[1rem] font-greek text-gray-700 hover:text-black'>
                  B
                </button>
                <button className='ml-2 w-[1rem] font-italic italic text-gray-700 hover:text-black'>
                  I
                </button>
                <button className='ml-2 w-[1rem]'> 
                  <IoLinkSharp/>
                </button>
                <button className='ml-4 w-[1rem]'>
                  <BiNotepad/>
                </button>
              </div>
                <textarea
                  value={updatedBlog.content}
                  onChange={(e) => setupdatedBlog({ ...updatedBlog, content: e.target.value})}
                  placeholder=" Write your blog content here..."
                  className="w-full h-60 text-left border-b border-l border-r rounded rounded-t-none focus:outline-none"
                />
            </div>
            <div className='mt-1 mb-3 mx-1'>
              <input
                value={updatedBlog.image}
                onChange={(e) => setupdatedBlog({ ...updatedBlog, image: e.target.value})}
                placeholder=" Enter url of the image"
                className="w-full h-8 pb-1 border rounded"
              />
            </div>
            <div className='flex flex-row items-center justify-between w-full h-[3rem] bg-white border-t rounded-t rounded-xl'>
              <div className='flex flex-row ml-5 space-x-4'>
                <div className='bg-gray-300 border rounded'>
                  <Button>
                    <span className="text-black capitalize ml-1">Preview</span>
                  </Button>
                </div>
                <div className='text-white bg-blue-500 rounded mr-5'>
                  <Button onClick={() => {handleUpdateBlog(blog._id, updatedBlog)}}>
                    <span className='text-white capitalize ml-1'>Update</span>
                  </Button>
                </div>
              </div>
              <div className='flex flex-row mr-5 space-x-4'>
                <div className='border rounded-md' style={{ backgroundColor: 'red' }}>
                  <Button onClick={() => {handleDeleteBlog(blog._id)}}>
                    <span className="text-black capitalize ml-1">Delete</span>
                  </Button>
                </div>
                <div className='text-white bg-black rounded mr-5'>
                  <Button onClick={() => {setmodalOpen(false)}}>
                    <span className='text-white capitalize ml-1'>Cancel</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={viewBlogModal}
          onClose={() => {setviewBlogModal(false)}}
        >
          <div className="w-[50%] h-[25%] mx-auto bg-white">
            Title: {blog.title}
          </div>

        </Modal>
      </>
    )
  }
  
  export default BlogCard
            