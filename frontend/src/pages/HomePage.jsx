import { useState } from 'react'
import { ButtonGroup, Button, Box, Input, Table, TableRow, Typography, TableHead, TableBody } from '@mui/material'
import { CiSearch } from "react-icons/ci";

function HomePage() {

  return (
    <>
      <Box className="flex flex-col sm:flex-row justify-between w-full min-h-screen bg-gray-100 p-3">
        <Table>
          <TableHead>
            <TableRow className=''>
              <div className='flex h-[10%] rounded items-center justify-center bg-gray-300'>
                <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAtAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQIDBAUGB//EADkQAAIBAgEKAgcHBQEAAAAAAAACAQMSEQQTIjJSYpKh0eEUQiExQVFhkaIjQ1NxgrHwBXLBwuJz/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAIBAwQFBv/EACIRAQEAAgIDAAIDAQAAAAAAAAABAhEDEhMhMQRRFCJBMv/aAAwDAQACEQMRAD8A/ZQCJkS2RMJkgApttPInESVwJgjsnSJImSKlRU2jLxFPe5dSjPlwl0fHHbU5spo/eL+rqX8RT3uXUeJp73LqZ+TLjzmrTyWXbkwJiDSYp6y3Wt8I9HMpLLvcMdTB119Xb2gjES673DHUrLrvcMdRdphVnzGMR5m/SazUpomldb/bHUxetTfa3dGPRzKsr/uzRRjKol5pNSnvcMdSjVKe9wx1KL7WYuN1tM6jZpLU1m5R3/b8zrnNu+s3DGH7mT5Er6Wdbh7lVxWSuOGOilRZ9c1XIFf7xuCOpqmSNS+/a3/z7kTjprnGWaUHVmN76e4H8dJ3j6UAHuOrihBIFyxT2RJWZLSZNpmbO6WYqtpaxzOtmidOBR0vQwcuHZdjdONpJWLw8FlWwwa9rt+mkFZgjEnH/ks3C6UamZzTNJkxyh7fs/n0Kc9aPNuWu972+X+ekyhjWYM5Qx3e180rMlZLEMLTRnJtSe/RMpIiRZdJdEm1Jr9cxTTIdtjylkuvZLNurEHPGUT7QN5MUdX04APbOMAAAhovK5suCrLixt2aZKZveGa3i4F8OCe9c1bJ9POf6mU0t76e53HOy2GLm/Gxl3ItwztjDM7309xmd76e5qRM26TmW8eE96W7rCsqqt12l5Yt5+s4Jt2m4e50u7O93D8DCsnmTVblJg5rL/yuw3FMF2m4e40dpuHuVJVbzNtboakrpcrfT6+Zg1Fto6ZnhEwTcYJdOSaO8RFHeNyY0dLh/Mr6w/ZnC5rR2uXwMpks7FJIqYAAVL68AHvHCAAAAAAAARQFai3oWJEykymjT17cpyV6l2iuqvM9CrSVtrS2Tn8HT2m5HJ5+Hkv9cWnDOfa4sButqtrHd4NdpuQ8Gu03Iy/w+X9LPLi8l0ZXt/kkzFujxHqVMiWzWbR83uMPBLtNwlWX4fJjfh8ebGxwYErJ2+CXabh7keBX8Rvl3K/43J+jeTFwymmZVGv/ALfKdeV0c0mi120cUmfkx63SzC7UmCsl8SjQU1ajAEggPrwAe8cIAAAAAAIJIkTOJlSMSCsyVXLUNIYkAmIKrun+BaCILQW8eNtLlUnO62ObkOt6Dc3H2iMLqucq7WEzJzVKpyOXPrNX61YzatSVPLyhLH3fKehJnVp3pacvl/s04enBAwvJlTpyalb9o/6epnxxtWZXS1PJ6MLGciJb2g1Bp6RV2e2CFkk9g5QAAAAAAAABMFbCwEvHjTdlbCbSQHjxHYwGIIFu8fg9VOIuIIkjvlE9duXLl8y6vm/M4z1Ji7Rc8+rTzT28Jxfy+O9u0auLL1plIwJJVbzFpd8UjJlqurM1q/vPsOmcl3vp7mDzw+U6qFW5LX1l5/Ev4Zx71YTK5fWXhJ/Eb5dyTpBp8GH6L3ybQXgi0mIO6wgAAAAAAAAAAAAAAAAIs2EFJku0FbDNnjktlipSvTzqb3s6G1m8LN4qy4rlOtNMpLt5RZot0fn0OuvQVXzn8x95z5tdpjk8nBlhdVomcrDAlWZHuNpprtEZpdoq6WXcPuOim8OsNBJzZreYGmcmavUeniCpJ6FhSBEgAAAAAAAAAAAAAAAAAAihBOIIkrvo8Vk5ai2PadZSql6GTn4+02twy1XJgMCxMLec3ou2oDe0D+JHYjK6W9w9yYymnvcJ42SZV4qjnPMvodfj7/ynqdCsej6ubMrfb0vEUt7hL0qqvqXHn09PROylFmp5SLNGltdAIWSRDgAAAAAAAAAAAAAAAAIqTAjAkCXCJlrCrS8yfqEKblGgyZ8OMu4tmbO0GgF6xPZ8NkWUtk9a7WX1Mvvjr0PfVldLk0lb0q3vg82P6NU/Hp8z0/6XkVTJ0+1qrUX1p6/RPt9fs/ydrKy/HNwmUdlCnYmnrNy+B00zHEujMU1fGkyaq1xhiTDEUzeZIxM4li6wQFoABCQAAAAAAAAAAAAAC5bTAiSSMCuymZyDXAFXSm28uI4TWlIBvZY6E0tFxNPYAEqxUusAAhosFgCDAAAAAAAAAAAAAAAAAAAACgABWZ//2Q=='></img>
              </div>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            <TableRow className=''>
              <div className='flex flex-row justify-between w-[80%] mx-auto bg-yellow-100'>
                <div className='my-auto ml-10'>
                  <Typography variant='h5'>
                    Weekly Articles with insight into the weekend's message
                  </Typography>
                </div>
                <div className="my-auto">
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
            </div>
          </TableRow>
        </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default HomePage