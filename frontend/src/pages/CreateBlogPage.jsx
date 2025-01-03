import { useState } from 'react';
import { Button } from '@mui/material';
import { FaSave, FaEye, FaRegPaperPlane } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";

function AboutPage() {

    const [file,setFile] = useState(null);
    const [fileUrl, setfileUrl] = useState(null);
    const handleFileChange = (event) => {
      const uploadedFile = event.target.files[0];
      if(uploadedFile) {
        setFile(uploadedFile);
        setfileUrl(URL.createObjectURL(uploadedFile));
      }
    };

    const [blogTitle, setblogTitle] = useState('');
    const [promptText, setpromptText] = useState('');
    const [contentText, setcontentText] = useState('');
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
                  value={blogTitle}
                  onChange={(e) => setblogTitle(e.target.value)}
                  placeholder=" Enter your blog title"
                  className="w-full h-8 pb-1 border rounded"
                />
              </div>
              <div className="mt-3">
                Promt
              </div>
              <div className="mt-1">
                <textarea
                  value={promptText}
                  onChange={(e) => setpromptText(e.target.value)}
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
                    value={contentText}
                    onChange={(e) => setcontentText(e.target.value)}
                    placeholder=" Write your blog content here..."
                    className="w-full h-60 text-left border-b border-l border-r rounded rounded-t-none focus:outline-none"
                  />
                </div>
              </div>
              <div className='mt-3'>
                Featured Image
              </div>
              <div className='flex items-center mt-1 mb-5 w-full h-[7.5rem] border border-dashed border-gray-400 rounded'>
                <div className='mx-auto'>
                  <div className='flex justify-center items-center'>
                    <button>
                      <MdCloudUpload fontSize={50}/>
                    </button>
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
              </div>
            </div>
          </div>
          <div className='flex flox-row items-center justify-between w-full h-[3rem] bg-white border-t'>
            <div className='flex flex-row ml-5 space-x-4'>
              <div className='border rounded'>
                <Button>
                  <span className='text-black'><FaSave/></span>
                  <span className='text-black capitalize ml-1'> Save Draft</span>
                </Button>
              </div>
              <div className='border rounded'>
                <Button>
                  <span className='text-black'><FaEye/></span>
                  <span className="text-black capitalize ml-1">Preview</span>
                </Button>
              </div>
            </div>
            <div className='text-white bg-black rounded mr-5'>
              <Button>
                <span className='text-white'><FaRegPaperPlane/></span>
                <span className='text-white capitalize ml-1'>Publish</span>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default AboutPage