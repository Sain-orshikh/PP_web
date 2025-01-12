import { Button, Box, Alert, Snackbar, Modal, ButtonGroup } from "@mui/material"
import { Link } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { useBlogStore } from "../store/blog";
import React, { useState, useRef } from "react";
import { IoLinkSharp } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { useAuth } from "./AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogCard({blog}) {

    const quillRef = useRef(null);

    const {id, isSignedIn, username, password, email} = useAuth();

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
        const editor = quillRef.current.getEditor();
        const contentHtml = editor.root.innerHTML; // Get content as HTML

        const UpdatedBlog = {
          ...updatedBlog,
          content: contentHtml,
        };
      const { success, message } = await updateBlog(bid, UpdatedBlog)
      setmodalOpen(false)
    };

    const [viewBlogModal, setviewBlogModal] = useState(false);
    const fallbackImage = "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGRlZmF1bHQlMjBibG9nfGVufDB8fDB8fHww"; // Fallback image URL
    
    const [previewModalBodyOpen, setpreviewModalBodyOpen] = useState(false);
    const [previewThumbnailOpen, setpreviewThumbnailOpen] = useState(false);
    const [fullversion, setfullversion] = useState(true);

    const [alertopen, setalertOpen] = useState(false);
    const [severityType, setseverityType] = useState('');
    const [alertMessage, setalertMessage] = useState('');

    const handleEditOpen = () => {
      if(isSignedIn === false){
        setalertOpen(true);
        setseverityType('warning');
        setalertMessage('Please Sign in before editing!');
      }
      else if(isSignedIn && blog.owner_id === id){
        setmodalOpen(true);
      }
      else{
        setalertOpen(true);
        setseverityType('error');
        setalertMessage('You can only edit your blog!')
      }
    };

    const [freshBlog, setfreshBlog] = useState({
      title: "",
      content: "",
      image: "",
      owner_id: id || "",
    });

    const handlePreviewOpen = () => {
      const editor = quillRef.current.getEditor();
      const contentHtml = editor.root.innerHTML; // Get content as HTML

      setfreshBlog({...updatedBlog, content: contentHtml,});

      setpreviewModalBodyOpen(true);
    };

    return (
      <>
          <Box className="w-[22rem] min-h-[14rem] rounded border border-gray-500 transition-transform transform hover:-translate-y-1.5">
          {/*<img src="" className="max-w-full h-[5rem] bg-blue-500"></img>*/}
            <button onClick={() => {setviewBlogModal(true)}} className="w-full h-[12rem] border-b border-gray-500">
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
            </button>
          <div className="flex flex-row">
            <div><button onClick={handleEditOpen} className="ml-2"><FaRegEdit fontSize={25}/></button></div>  
            <div className=""><h6 className="mx-1 mb-1 text-xl">{blog.title}</h6></div>
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
            <div className='rounded mx-1 mt-1'>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="Write your blog here..."
                style={{
                  height: "300px",
                  backgroundColor: "white",
                }}
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
              <div className='flex flex-row ml-5 space-x-0 sm:space-x-4'>
                <div className='bg-gray-300 border rounded-md'>
                  <Button onClick={handlePreviewOpen}>
                    <span className="text-black capitalize ml-1">Preview</span>
                  </Button>
                </div>
                <div className='text-white bg-blue-500 rounded mr-5'>
                  <Button onClick={() => {handleUpdateBlog(blog._id, updatedBlog)}}>
                    <span className='text-white capitalize ml-1'>Update</span>
                  </Button>
                </div>
              </div>
              <div className='flex flex-row mr-5 space-x-0 sm:space-x-4'>
                <div className='border-2 rounded-md' style={{ backgroundColor: 'red' }}>
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
          className="overflow-y-auto" 
        >
          <div className="relative w-[70%] min-h-[80%] mx-auto my-10 bg-white shadow-lg rounded-lg">
            <div className="relative h-80 bg-cover bg-center">
              <img 
                src={blog.image}
                className="w-full h-full"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if fallback fails
                  e.target.src = fallbackImage; // Fallback image URL
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10"></div>
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={() => {setviewBlogModal(false)}}
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 break-words whitespace-normal">
                <h2 className="text-4xl font-bold text-white">{blog.title}</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="break-words whitespace-pre-wrap">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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
          <div className='w-[70%] mx-auto'>
          <div className="relative w-full min-h-[80%] mx-auto mt-10 bg-white shadow-lg rounded-lg">
            <div className="relative h-80">
              <img 
                src={freshBlog.image}
                className="w-full h-full"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 break-words whitespace-normal">
                <h2 className="text-4xl font-bold text-white">{freshBlog.title}</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="break-words whitespace-pre-wrap">
                <div dangerouslySetInnerHTML={{ __html: freshBlog.content }} />
              </div>
            </div>
          </div>
          <div className='flex justify-end w-full mx-auto'>
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
        {fullversion === false && (
          <Modal
            open={previewThumbnailOpen}
            onClose={() => {setfullversion(true), setpreviewModalBodyOpen(false), setpreviewThumbnailOpen(false)}}
          >
          <div className='flex flex-col w-[22rem] min-h-[14rem] mx-auto'><Box className="w-[22rem] min-h-[14rem] rounded border border-gray-500 bg-gray-100 mx-auto mt-24">
          {/*<img src="" className="max-w-full h-[5rem] bg-blue-500"></img>*/}
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
          <div className="flex flex-row bg-gray-100">
            <div><button className="ml-2"><FaRegEdit fontSize={25}/></button></div>  
            <div className=""><h6 className="mx-1 mb-1 text-xl">{freshBlog.title}</h6></div>
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
        <Snackbar
          open={alertopen}
          autoHideDuration={5000} 
          onClose={() => {setalertOpen(false)}}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setalertOpen(false)} variant="filled" severity={severityType}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </>
    )
  }
  
  export default BlogCard
            