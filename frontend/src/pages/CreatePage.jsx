import { useState } from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'

function CreatePage() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row justify-between w-full min-h-screen bg-gray-100 p-3 gap-3">
        <div className='w-[50%] bg-blue-500'>
          Add your project
        </div>
        <div className='w-[50%] bg-yellow-300'>
          Create a blog
        </div>
      </Box>
    </>
  )
}

export default CreatePage