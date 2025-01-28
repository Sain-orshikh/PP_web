import { Link } from "react-router-dom";
import { useState } from "react";

import pplogo from "../assets/pp-logo.png";
import wood from "../assets/wood.jpg";
import glass from "../assets/glass.jpg";
import ocean from "../assets/ocean.jpg";
import city from "../assets/city.jpg";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

const SignUpPage = () => {

	const queryClient = useQueryClient();

	const [newUser, setnewUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const { mutate: singupMutation, isError, error, isPending} = useMutation({
		mutationFn: async({email, username, password}) => {
			try{
				const res = await fetch('/api/auth/signup',{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body: JSON.stringify({username, email, password}),
				});
				
				const data = await res.json();
				if(!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
			}
			catch(error){
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({queryKey:["authUser"]});
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		singupMutation(newUser);
	};

	const bgImages = [wood, glass, ocean, city];

	const backgroundImage = bgImages[Math.floor(Math.random() * bgImages.length)];

	return (
	  <>
		<div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
			<div className="w-[25%] bg-white h-[80%] rounded-lg">
				<div className="flex flex-col justify-center w-full h-[20%] bg-black rounded-t-lg">
					<span className="font-playwright text-white text-5xl mx-auto">Passion</span>
					<span className="w-[55%] ml-auto font-playwright text-white text-4xl">Project</span>
				</div>
				<div className="h-[80%]">
					<div className="w-full font-semibold text-3xl ml-5 mt-5">
						Sign Up	
					</div>
					<div className="w-full">
						<div className="w-[90%] h-[3.5rem] mx-auto mt-5 border border-black">
							<input
								value={newUser.username}
								onChange={(e) => setnewUser({...newUser, username: e.target.value})}
								placeholder="Username"
								className="w-full h-full p-1 text-xl"
							/>
						</div>
					</div>
					<div className="w-full">
						<div className="w-[90%] h-[3.5rem] mx-auto mt-5 border border-black">
							<input
								value={newUser.email}
								onChange={(e) => setnewUser({...newUser, email: e.target.value})}
								placeholder="Email"
								className="w-full h-full p-1 text-xl"
							/>
						</div>
					</div>
					<div className="w-full">
						<div className="w-[90%] h-[3.5rem] mx-auto mt-5 border border-black">
							<input
								value={newUser.password}
								onChange={(e) => setnewUser({...newUser, password: e.target.value})}
								placeholder="Password"
								className="w-full h-full p-1 text-xl"
							/>
						</div>						
					</div>
					<div className="flex items-center justify-center w-full">
						<button className="bg-black text-white font-semibold text-xl w-[90%] mx-auto mt-5 h-[3.5rem] rounded hover:bg-gray-700" onClick={handleSubmit}>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</div>	
	  </>
	);
};
export default SignUpPage;