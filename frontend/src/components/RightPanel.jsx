import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import boy1 from "../assets/boy1.png";
import pxlmoon from "../assets/pxlmoon.jpg";
import cat from "../assets/cat.jpg";
import cat1 from "../assets/cat1.jpg";

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

	if(suggestedUsers?.length === 0) return <div><img src={cat1} alt="No members found"/></div>;

	return (
        <>
		<div className='w-[95%] my-4 mx-auto'>
			<div className='bg-[#16181C] p-4 rounded-md w-full'>
				<p className='font-bold text-gray-100 text-lg'>Explore Members</p>
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
		</div>
        <div className="w-[95%] mx-auto">
            <img
                src={cat1}
            />
        </div>
        </>
    );
};
export default RightPanel;