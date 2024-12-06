import { useState } from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'

function CreatePage() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row items-center justify-between">
        <Button>Create</Button>
        <Button>Page</Button>
      </Box>
    </>
  )
}

export default CreatePage