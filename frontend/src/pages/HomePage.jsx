import { useState } from 'react'
import { ButtonGroup, Button, Box, Input } from '@mui/material'
import { CiSearch } from "react-icons/ci";

function HomePage() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row justify-between w-full min-h-screen bg-gray-100 p-3">
        <div className=''>HomePage</div>
        <div className="">
          <Input
            placeholder='Search for blogs'
          />
          <Button onClick={() => {console.log('This is a blog')}}>
            <CiSearch/>
          </Button>
          {/*<img
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />*/}
      </div>
      </Box>
    </>
  )
}

export default HomePage