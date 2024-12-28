import { useState } from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function CreatePage() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row justify-between w-full min-h-screen bg-gray-100 p-3 gap-3">
        <div className='w-[50%] bg-blue-500'>
          <Button>
            <Link to={"/create/project"} className="bg-black-500"> 
              Add your project
            </Link>
          </Button>
        </div>
        <div className='w-[50%] bg-yellow-300'>
          <Button>
            <Link to={"/create/blog"} className="bg-black-500">
              Create a blog
            </Link>
          </Button>
        </div>
      </Box>
    </>
  )
}

export default CreatePage