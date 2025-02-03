import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { InfiniteSlider } from "./ui/infinite-slider";

import { TbFaceIdError } from "react-icons/tb";
import boy1 from "../assets/boy1.png";
import portal1 from "../assets/portal1.png";
import portal2 from "../assets/portal2.png";

const RightPanel = () => {

	const {data: suggestedUsers, isLoading} = useQuery({queryKey: ["suggestedUsers"], 
		queryFn: async () => {
			try{
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			}
			catch(error){
				throw new Error(error.message);
			}
		},
	});

	const portal = [portal1, portal2];
	const [currentPortal, setCurrentPortal] = useState(0);
	const animateportal = () => {
	if (currentPortal === 1) {setCurrentPortal(0);}
	else {setCurrentPortal(1);}
	};
	useEffect(() => {
	const interval = setInterval(() => {
		animateportal();
	}, 500);
		return () => clearInterval(interval);
	}, [currentPortal]);

	return (
        <>
		{suggestedUsers?.length > 0 && (<div className='w-[95%] my-4 mx-auto'>
			<div className='bg-[#16181C] p-4 rounded-md w-full'>
				{<p className='font-bold text-gray-100 text-lg'>Explore Members</p>}
				<div className='flex flex-col gap-4'>
					{!isLoading &&
						suggestedUsers?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center mt-1'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || boy1} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold text-gray-100 tracking-tight truncate w-28'>
											{user.username}
										</span>
									</div>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>)}
        <div className={`flex flex-col w-[95%] mx-auto ${suggestedUsers?.length === 0 ? `h-full` : `h-screen`}`}>
            		<div className={`relative flex flex-col items-center justify-start ${suggestedUsers?.length === 0 ? `h-full` : `h-screen`} my-1 overflow-hidden`}>
					  {/* Top Portal */}
					  <img src={portal[currentPortal]} alt="portal" className="w-[70%] z-10" />
					  <img src={portal[currentPortal]} alt="portal" className="w-[70%] z-10" 
					  	style={{
							position: "absolute",
							bottom: -20,
							transform: 'scaleY(-1)',
						}}
					  />
					  {/* Image Moving Through Portals */}
					  <div className={`relative ${suggestedUsers?.length === 0 ? `h-full` : `h-screen`} w-[120px] flex items-center justify-center`} style={{top: `-25px`,}}>
						<InfiniteSlider direction="vertical" duration={10} reverse className={` ${suggestedUsers?.length === 0 ? `h-full` : `h-screen`}`}>
						  <img
							src={boy1}
							alt="Falling Image"
							className="aspect-square w-[120px] rounded-[4px]"
						  />
						  <img
							src={boy1}
							alt="Falling Image"
							className="aspect-square w-[120px] rounded-[4px]"
						  />
						  <img
							src={boy1}
							alt="Falling Image"
							className="aspect-square w-[120px] rounded-[4px]"
						  />
						</InfiniteSlider>
					  </div>
					</div>
        </div>
		{suggestedUsers?.length > 0 && (<div className={`flex items-center justify-center ${suggestedUsers?.length === 1 ? `mt-10` : `mt-4`} text-white`}><TbFaceIdError fontSize={40}/></div>)}
        </>
    );
};
export default RightPanel;