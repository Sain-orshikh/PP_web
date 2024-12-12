import { Button, Box } from "@mui/material"
import { Link } from "react-router-dom"
import BCpic from "../assets/blogcardpic.jpg"
function BlogCard() {

    return (
      <>
        <Box className="w-[20rem]">
          {/*<img src="" className="max-w-full h-[5rem] bg-blue-500"></img>*/}
          <div className="w-full h-[5rem] bg-blue-500"></div>
          <div className="w-[90%] mx-auto">  
            <h6 className="">March 15, 2024</h6>
            <h2 className="text-2xl font-bold">Welcome to</h2>
            <p>Today in South Africa there are over 5 million orphan kids</p>
            <Button>
                <Link to={'/create'} className="text-black font-bold hover:text-gray-500">
                  Read More ➔
                </Link>
            </Button>
            </div>
        </Box>
      </>
    )
  }
  
  export default BlogCard
            