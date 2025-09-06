import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { InfiniteSlider } from "./ui/infinite-slider";

import { TbFaceIdError } from "react-icons/tb";

const RightPanel: React.FC = () => {

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
				throw new Error((error as Error).message);
			}
		},
	});

	const portal = ["/assets/portal1.png", "/assets/portal2.png"];
	const [currentPortal, setCurrentPortal] = useState(0);
	const animateportal = () => {
	if (currentPortal === 1) {setCurrentPortal(0);}
	else {setCurrentPortal(1);}
	};
	useEffect(() => {
	const interval = setInterval(() => {
		animateportal();
	}, 400);
		return () => clearInterval(interval);
	}, [currentPortal]);

	return (
        <>
		<div className="flex flex-col w-full">
		<div className='w-[95%] my-4 mx-auto'>
			<div className='bg-[#16181C] flex flex-col justify-start h-[10rem] p-4 rounded-md w-full'>
				{<p className='font-bold text-gray-100 mb-3 text-lg'>Explore Members</p>}
				<div className='flex flex-col gap-4'>
					{!isLoading &&
						suggestedUsers?.map((user: { _id: string; username: string; profileImg?: string }) => (
							<Link
								href={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center mt-1'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/assets/boy1.png"} />
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
				{suggestedUsers?.length === 0 && (<div className="text-white">
					No members found <TbFaceIdError className="inline-block" fontSize={25}/>
				</div>)}
			</div>
		</div>
        <div className={`flex flex-col w-[95%] mx-auto h-full`}>
            		<div className={`relative flex flex-col items-center justify-start h-full my-0 overflow-hidden`}>
					  {/* Top Portal */}
					  <img src={portal[currentPortal]} alt="portal" className="w-[70%] z-10" style={{filter: 'invert(1)'}}/>
					  <img src={portal[currentPortal]} alt="portal" className="w-[70%] z-10 bg-transparent" 
					  	style={{
							position: "absolute",
							bottom: -20,
							transform: 'scaleY(-1)',
							filter: 'invert(1)',
						}}
					  />
					  {/* Image Moving Through Portals */}
					  <div className={`relative h-full w-[120px] flex items-center justify-center`} style={{top: `-25px`,}}>
						<InfiniteSlider direction="vertical" duration={5} durationOnHover={3} reverse className={`h-full`}>
						  <img
							src="/assets/boy1.png"
							alt="Falling Image"
							className="aspect-square w-[120px] rounded-[4px]"
						  />
						  <img
							src="/assets/boy2.png"
							alt="Falling Image"
							className="aspect-square w-[120px] rounded-[4px]"
						  />
						</InfiniteSlider>
					  </div>
					</div>
        </div>
		</div>
        </>
    );
};
export default RightPanel;
