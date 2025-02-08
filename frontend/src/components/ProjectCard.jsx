import React from 'react'
import Tilt from './ui/tilt'

const ProjectCard = ({project}) => {
  return (
    <>
        <Tilt rotationFactor={6} isRevese>
            <div className='w-full min-h-[22rem] shadow-lg rounded-lg overflow-hidden border-2'>
                <div className='border-b-2'>
                    <img
                        src='https://images.unsplash.com/photo-1738975927070-d5af82de67c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'
                        alt='project'
                        className='w-full h-64 object-cover'
                    />
                </div>
                <div className='w-full mt-3 flex justify-between'>
                    <div className='text-gray-700 ml-1'>Author name</div>
                    <div className='rounded-md bg-pink-200 p-2 mr-1'>Project type</div>
                </div>
                <div className='text-white font-harmonique text-xl ml-1'>Project title</div>
                <div className='text-gray-700 ml-1 mb-3'>Project date</div>
            </div>
        </Tilt>
    </>
  )
}

export default ProjectCard