import { useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { FaSave, FaEye, FaRegPaperPlane } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";
import { useBlogStore } from '../store/blog';
import ErrorAlert from '../components/ErrorAlert';

function AboutPage() {

    const [newBlog, setnewBlog] = useState({
      title: "",
      prompt: "",
      content: "",
      image: "",
    });

    const { createBlog } = useBlogStore();

    const [open, setOpen] = useState(false);
    const [severityType, setseverityType] = useState("");
    const [alertMessage, setalertMessage] = useState("");

    const handlePublishBlog = async() => {
      const {success, message} = await createBlog(newBlog);
      console.log("Success:",success);
      console.log("Message:",message);
      if (success === false) {
        setOpen(true);
        setseverityType("error");
        setalertMessage("Please fill in all fields!");
      }
      else {
        setOpen(true);
        setseverityType("success");
        setalertMessage("Published a blog with success!");
      }

      setnewBlog({ title: "", prompt: "", content: "", image: "",});
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
              <div className="mt-3">
                Promt
              </div>
              <div className="mt-1">
                <textarea
                  value={newBlog.prompt}
                  onChange={(e) => setnewBlog({ ...newBlog, prompt: e.target.value})}
                  placeholder=" Enter your blog prompt"
                  className="w-full h-20 text-left border rounded"
                />
              </div>
              <div>
                <div className='mt-3'>
                  Content
                </div>
                <div className='focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600 rounded'>
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
                    value={newBlog.content}
                    onChange={(e) => setnewBlog({ ...newBlog, content: e.target.value})}
                    placeholder=" Write your blog content here..."
                    className="w-full h-60 text-left border-b border-l border-r rounded rounded-t-none focus:outline-none"
                  />
                </div>
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
                <Button>
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
        open={open}
        autoHideDuration={5000} 
        onClose={() => {setOpen(false)}}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => {setOpen(false)}} variant="filled" severity={severityType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      </>
    )
  }
  
  export default AboutPage