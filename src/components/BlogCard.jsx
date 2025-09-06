import { Button, Box, Alert, Snackbar, Modal, ButtonGroup } from "@mui/material"
import { Link } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useRef } from "react";
import { IoLinkSharp } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatMemberSinceDate } from "@/utils/date";
import { darkModeAtom } from "./ThemeAtom";
import { useAtom } from 'jotai';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function BlogCard({blog, onUpdate, inprofile, inhomepage}) {

    const queryClient = useQueryClient();
    const quillRef = useRef(null);

    const [isDarkMode, setDarkMode] = useAtom(darkModeAtom);

    const [modalOpen, setmodalOpen] = useState(false);

    const {data: authUser} = useQuery({queryKey: ["authUser"]});

    const {data: userVerification} = useQuery({
      queryKey: ["userVerification"],
      queryFn: async () => {
        try {
          const res = await fetch(`/api/blogs/check/${blog._id}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "You can only edit your blog");
          console.log("User verified:", data);
          return data.success;
        } catch (error) {
          console.error("Error verifying user:", error);
          throw error;
        }
      },
    });

    const {mutate: updateBlog} = useMutation({
      mutationFn: async (updatedBlog) => {
        try {
          const res = await fetch(`/api/blogs/update/${blog._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBlog),
          }
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to update blog");
          console.log("Updated blog:", data);
          return data;
        } catch (error) {
          console.error("Error updating blog:", error);
          throw error;
        }
      },
      onSuccess: () => {
        onUpdate();
        toast.success("Blog updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const {mutate: deleteBlog} = useMutation({
      mutationFn: async () => {
        try{
          const res = await fetch(`/api/blogs/delete/${blog._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error || "Failed to delete blog");
          console.log("Deleted blog:", data);
          return data;
        }
        catch(error){
          console.error("Error deleting blog:", error);
          throw error;
        }
      },
      onSuccess: async () => {
        toast.success("Blog deleted successfully");
        onUpdate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const handleDeleteBlog = async () => {
      deleteBlog();
      setmodalOpen(false);
    };

    const [updatedBlog, setupdatedBlog] = useState(blog);
    
      const handleUpdateBlog = async (bid, updatedBlog) => {
        const editor = quillRef.current.getEditor();
        const contentHtml = editor.root.innerHTML; // Get content as HTML

        const UpdatedBlog = {
          ...updatedBlog,
          content: contentHtml,
          image: updatedBlog.imageurl,
        };
      updateBlog(UpdatedBlog)
      setmodalOpen(false)
    };

    const fallbackImage = "https://shorturl.at/6w7NB";
    
    const [previewModalBodyOpen, setpreviewModalBodyOpen] = useState(false);
    const [previewThumbnailOpen, setpreviewThumbnailOpen] = useState(false);
    const [fullversion, setfullversion] = useState(true);

    const handleEditOpen = () => {
      if(userVerification === true){
        setmodalOpen(true);
      }
      else {
        toast.error("You can only edit your blog!");
      };
    };

    const [freshBlog, setfreshBlog] = useState({
      title: "",
      content: "",
      image: "",
      owner_id: blog?.ownerId._id,
    });

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

    const handlePreviewOpen = () => {
      const editor = quillRef.current.getEditor();
      const contentHtml = editor.root.innerHTML; // Get content as HTML
      
      setfreshBlog({...updatedBlog, content: contentHtml, owner_id: authUser.id});

      setpreviewModalBodyOpen(true);
    };

    const blogSinceDate = formatMemberSinceDate(blog?.createdAt);

    return (
      <>
          <Box className="w-[22rem] min-h-[14rem] rounded-sm border border-gray-500 transition-transform transform hover:-translate-y-1.5">
            <button className="w-full h-[12rem] border-b border-gray-500">
              <Link to={`/viewblog/${blog?._id}`}>
              <div className="w-full h-[12rem] border-b border-gray-500">
                <img
                  src={blog.image}
                  alt="Blog image"
                  className="w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback fails
                    e.target.src = fallbackImage; // Fallback image URL
                  }}
                />
              </div>
              </Link>
            </button>
          <div className="flex flex-row">
            <div><button onClick={handleEditOpen} className={`ml-2 ${inprofile ? `text-white` : ``} ${inhomepage ? `dark:text-black` : `dark:text-white`}`}><FaRegEdit fontSize={25}/></button></div>  
            <div><h6 className={`mx-1 mb-1 text-xl ${inprofile ? 'text-white' : ''} ${inhomepage ? 'text-white dark:text-black' : 'dark:text-white'}`}>{blog.title}</h6></div>
          </div>
        </Box>
        <Modal
          open={modalOpen}
        >
          <div className="bg-gray-100 dark:bg-gray-900 pt-1 px-1 w-[75%] mx-auto mt-10 rounded-xl overflow-y-auto">
            <div className="mt-2 ml-2 text-xl dark:text-white">
              Blog title
            </div>
            <div className="mt-1 mx-1 dark:text-white">
              <input
                value={updatedBlog.title}
                onChange={(e) => setupdatedBlog({ ...updatedBlog, title: e.target.value})}
                placeholder=" Enter new blog title"
                className="w-full h-8 pl-1 pb-1 mt-1 dark:placeholder:text-gray-200 border rounded dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div className="mt-1 mb-2 ml-2 text-xl dark:text-white">
              Blog content
            </div>
            <div className='mx-1 mt-1'>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Write your blog here..."
              style={{
                height: "300px",
                backgroundColor: isDarkMode ? "#111827" : "white",
                color: isDarkMode ? "white" : "black", // Ensures text is visible
              }}
            />
            </div>
            <div className="ml-2 mt-5 sm:mt-2 text-xl dark:text-white">
              Featured image
            </div>
            <div className='mt-7 sm:mt-3 mb-3 mx-1'>
              <input
                value={updatedBlog.imageurl}
                onChange={(e) => setupdatedBlog({ ...updatedBlog, imageurl: e.target.value})}
                placeholder=" Enter url of the image"
                className="w-full h-8 pl-1 pb-1 border rounded dark:placeholder:text-gray-200 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div className='flex flex-row items-center justify-between w-full h-[3rem] bg-white border-t dark:border-none rounded-t rounded-xl dark:bg-inherit'>
              <div className='flex flex-row ml-5 space-x-1 sm:space-x-4'>
                <div className='bg-gray-300 border rounded-md hover:bg-gray-400'>
                  <Button onClick={handlePreviewOpen}>
                    <span className="text-black capitalize ml-1">Preview</span>
                  </Button>
                </div>
                <div className='text-white bg-blue-500 rounded mr-5 hover:bg-blue-600'>
                  <Button onClick={() => {handleUpdateBlog(blog._id, updatedBlog)}}>
                    <span className='text-white capitalize ml-1'>Update</span>
                  </Button>
                </div>
              </div>
              <div className='flex flex-row mr-5 space-x-1 sm:space-x-4'>
                <div className='border border-red-500 rounded-md hover:border-red-300' style={{ backgroundColor: 'red' }}>
                  <Button onClick={() => {handleDeleteBlog(blog._id)}}>
                    <span className="text-black capitalize ml-1">Delete</span>
                  </Button>
                </div>
                <div className='text-white bg-black rounded mr-5 hover:bg-gray-800'>
                  <Button onClick={() => {setmodalOpen(false)}}>
                    <span className='text-white capitalize ml-1'>Cancel</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {fullversion && (
        <Modal
          open={previewModalBodyOpen}
          onClose={() => {setfullversion(true), setpreviewModalBodyOpen(false), setpreviewThumbnailOpen(false)}}
          className="overflow-y-auto" 
        >
          <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
            <div className="absolute top-10 sm:top-10 right-5 sm:right-20">
              <button className="text-black dark:text-white text-lg py-1 px-4 border-2 hover:bg-gray-200 dark:hover:bg-gray-800 border-black dark:border-white rounded-xl" onClick={() => {setfullversion(true), setpreviewModalBodyOpen(false), setpreviewThumbnailOpen(false)}}>
                Exit
              </button>
            </div>
            <div className="relative w-[60%] mx-auto bg-gray-100 dark:bg-gray-900">
              <div className="relative h-fit-content bg-cover bg-center">
                <div className="break-words whitespace-normal">
                  <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white pt-10">{freshBlog.title}</h2>
                </div>
                <div className='flex flex-row items-center mt-5'>
                  <img
                    src={ownerInfo?.profileImg || fallbackImage}
                    alt={ownerInfo?.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <button className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 text-lg ml-2">
                    <Link to={`/profile/${ownerInfo?.username}`}>          
                      <span>{ownerInfo?.username}</span>
                    </Link>
                  </button>
                  <div className='ml-auto text-gray-500 dark:text-gray-400 text-lg'>
                    {blogSinceDate}
                  </div>
                </div>
                <img 
                  src={freshBlog.image || blog.image}
                  className="w-full h-[24rem] mt-5 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
              </div>

              <div className="mt-5 px-4">
                <div className='text-black dark:text-white text-lg'>
                  <div dangerouslySetInnerHTML={{ __html: freshBlog.content }} />
                </div>
              </div>
            </div>
            <div className='flex justify-end w-[60%] mx-auto mt-4'>
              <ButtonGroup>
                <Button 
                  sx={{ 
                    backgroundColor: 'transparent', 
                    borderColor: 'currentColor',
                    color: 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '@media (prefers-color-scheme: dark)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }
                  }} 
                  className="dark:text-white"
                  onClick={() => {setfullversion(true), setpreviewModalBodyOpen(true), setpreviewThumbnailOpen(false)}}
                >
                  Full Version
                </Button>
                <Button 
                  sx={{ 
                    backgroundColor: 'transparent',
                    borderColor: 'currentColor',
                    color: 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '@media (prefers-color-scheme: dark)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }
                  }}
                  className="dark:text-white"
                  onClick={() => {setfullversion(false), setpreviewModalBodyOpen(true), setpreviewThumbnailOpen(true)}}
                >
                  Thumbnail
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Modal>
        )}
        {fullversion === false && (
          <Modal
            open={previewThumbnailOpen}
            onClose={() => {setfullversion(true), setpreviewModalBodyOpen(false), setpreviewThumbnailOpen(false)}}
          >
          <div className='flex flex-col w-[22rem] min-h-[14rem] mx-auto'><Box className="w-[22rem] min-h-[14rem] rounded border border-gray-500 bg-gray-100 dark:bg-gray-900 mx-auto mt-24">
          
            <button className="w-full h-[12rem] border-b border-gray-500">
              <div className="w-full h-[12rem] border-b border-gray-500">
                <img
                  src={freshBlog.image}
                  alt="Blog image"
                  className="w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback fails
                    e.target.src = fallbackImage; // Fallback image URL
                  }}
                />
              </div>
            </button>
          <div className="flex flex-row bg-gray-100 dark:bg-gray-900">
            <div><button className="ml-2 dark:text-white"><FaRegEdit fontSize={25}/></button></div>  
            <div className=""><h6 className="mx-1 mb-1 text-xl text-black dark:text-white">{freshBlog.title}</h6></div>
          </div>
        </Box>
          <div className='flex justify-end w-[22rem] mx-auto'>
            <ButtonGroup>
              <Button sx={{ backgroundColor: 'white', borderColor: 'black', mt: 2}} onClick={() => {setfullversion(true), setpreviewModalBodyOpen(true), setpreviewThumbnailOpen(false)}}>
                <span className='text-black'>Full Blog</span>
              </Button>
              <Button sx={{ backgroundColor: 'white', borderColor: 'black', mt: 2}} onClick={() => {setfullversion(false), setpreviewModalBodyOpen(false), setpreviewThumbnailOpen(true)}}>
                <span className='text-black'>Thumbnail</span>
              </Button>
            </ButtonGroup>
          </div>
        </div>
          </Modal>
        )}
      </>
    )
  }
  export default BlogCard
