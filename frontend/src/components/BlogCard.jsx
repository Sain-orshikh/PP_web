import { Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

function BlogCard() {

    return (
      <>
        <Box>
            <h2 className="text-xl font-bold">Welcome to my blog</h2>
            <p>Sample from the blog</p>
            <Button>
                <Link to={'/create'} className="text-black hover:text-gray-500">
                  Read More
                </Link>
            </Button>
        </Box>
      </>
    )
  }
  
  export default BlogCard
            