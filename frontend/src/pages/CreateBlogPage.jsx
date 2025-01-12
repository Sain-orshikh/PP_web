import React, { useRef, useState } from 'react';
import { Alert, Button, Snackbar, Modal, Box, ButtonGroup } from '@mui/material';
import { FaSave, FaEye, FaRegPaperPlane, FaRegEdit } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";
import { useBlogStore } from '../store/blog';
import ErrorAlert from '../components/ErrorAlert';
import BlogCard from '../components/BlogCard';
import { useAuth } from '../components/AuthContext';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlogPage() {

    const {id} = useAuth();
    const fallbackImage = "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGRlZmF1bHQlMjBibG9nfGVufDB8fDB8fHww";

    const quillRef = useRef(null);
    const [newBlog, setnewBlog] = useState({
      title: "",
      content: "",
      image: "",
      owner_id: id || "",
    });

    const { createBlog } = useBlogStore();

    const [alertopen, setalertOpen] = useState(false);
    const [severityType, setseverityType] = useState("");
    const [alertMessage, setalertMessage] = useState("");
    
    const handlePublishBlog = async() => {
      const editor = quillRef.current.getEditor();
      const contentHtml = editor.root.innerHTML; // Get content as HTML

      const NewBlog = {
        ...newBlog,
        content: contentHtml,
      };

      console.log(NewBlog);
      const {success, message} = await createBlog(NewBlog);
      console.log("Success:",success);
      console.log("Message:",message);
      console.log("Owner id:",newBlog.owner_id);
      if (success === false) {
        setalertOpen(true);
        setseverityType("error");
        setalertMessage("Please fill in all fields and be Signed in!");
      }
      else {
        setalertOpen(true);
        setseverityType("success");
        setalertMessage("Published a blog with success!");
      }

      setnewBlog({ title: "", prompt: "", content: "", image: "", owner_id: id,});
    };

    const [previewModalBodyOpen, setpreviewModalBodyOpen] = useState(false);
    const [previewThumbnailOpen, setpreviewThumbnailOpen] = useState(false);
    const [fullversion, setfullversion] = useState(true);

    const [freshBlog, setfreshBlog] = useState({
      title: "",
      content: "",
      image: "",
      owner_id: id || "",
    });

    const handlePreviewOpen = () => {
      const editor = quillRef.current.getEditor();
      const contentHtml = editor.root.innerHTML; // Get content as HTML

      setfreshBlog({...newBlog, content: contentHtml,});
      setpreviewModalBodyOpen(true)
    };

    return (
      <>
        <div className="flex flex-col bg-gray-100 w-full h-full ">
          <div className="flex mt-5 mr-5 ml-5 rounded bg-white">
            <div  className="flex flex-col w-full mx-5">
              <div className="font-bold text-2xl mt-3">
                Create New Blog
              </div>
              <div className="mt-3">
                Blog Title
              </div>
              <div className="mt-1">
                <input
                  value={newBlog.title}
                  onChange={(e) => setnewBlog({ ...newBlog, title: e.target.value})}
                  placeholder=" Enter your blog title"
                  className="w-full h-8 pb-1 border rounded"
                />
              </div>
              <div>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="Write your blog here..."
                  style={{
                    height: "300px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div className='mt-3'>
                Featured Image
              </div>
              <div className='mt-1 mb-5'>
                <input
                  value={newBlog.image}
                  onChange={(e) => setnewBlog({ ...newBlog, image: e.target.value})}
                  placeholder=" Enter url of the image"
                  className="w-full h-8 pb-1 border rounded"
                />
              </div>
              {/*<div className='flex items-center mt-1 mb-5 w-full h-[7.5rem] border border-dashed border-gray-400 rounded'>
                <div className='mx-auto'>
                  <div className='flex justify-center items-center'>
                    <MdCloudUpload fontSize={50}/>
                  </div>
                  <div>
                    <label htmlFor="file-upload" className='cursor-pointer font-medium'>
                      <span className='font-bold'>Upload a File</span><span className='text-gray-500'> or drag and drop</span> 
                    </label>
                    <input
                      type='file'
                      id='file-upload'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                  </div>
                  <div className='flex space-evenly'>
                    <text className='text-gray-500 mx-auto'>PNG, JPG, GIF up to 10MB</text>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
          <div className='flex flex-row items-center justify-between w-full h-[3rem] bg-white border-t'>
            <div className='flex flex-row ml-auto'>
              <div className='border rounded mr-5 bg-gray-100'>
                <Button onClick={handlePreviewOpen}>
                  <span className='text-black'><FaEye/></span>
                  <span className="text-black capitalize ml-1">Preview</span>
                </Button>
              </div>
              <div className='text-white bg-black rounded mr-10'>
                <Button onClick={handlePublishBlog}>
                  <span className='text-white'><FaRegPaperPlane/></span>
                  <span className='text-white capitalize ml-1'>Publish</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
                src={newBlog.image}
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

      </>
    )
  }
  
  export default CreateBlogPage