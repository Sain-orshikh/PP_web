import { useState } from 'react'

function AboutPage() {

    const [blogTitle, setblogTitle] = useState('');
    const [promptText, setpromptText] = useState('');
    const [contentText, setcontentText] = useState('');
    return (
      <>
        <div className="flex flex-col bg-gray-100 w-full h-full ">
          <div className="flex m-5 rounded bg-white">
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
                <div>
                  <div className='w-full bg-gray-300 rounded rounded-b-none border'>
                    buttons
                  </div>
                  <textarea
                    value={contentText}
                    onChange={(e) => setcontentText(e.target.value)}
                    placeholder=" Write your blog content here..."
                    className="w-full h-60 text-left border-b border-l border-r rounded rounded-t-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default AboutPage