import { Box } from '@mui/material';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Box className='flex relative'>
        <Navbar />
      </Box>
      <Box className='flex pt-20'>
        {children}
      </Box>
    </>
  );
}
