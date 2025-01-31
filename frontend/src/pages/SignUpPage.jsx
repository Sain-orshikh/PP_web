import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import pplogo from "../assets/pp-logo.png";
import moon from "../assets/moon.jpg";
import city from "../assets/city.jpg";
import cliff from "../assets/cliff.jpg";
import rug from "../assets/rug.jpg";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
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

	const handlecool = () => {
		toast.success("cool");
	};

	const handleinfocls = () => {
		setnewUser({
			username: "",
			email: "",
			password: "",
		});
		toast.success("info cleared");
	};

	const bgImages = [moon, cliff, rug, city];

	const [backgroundImage, setBackgroundImage] = useState(bgImages[3]);

	useEffect(() => {
		setBackgroundImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
	}, []);

	return (
	  <>
		<div className="w-full min-h-screen flex flex-col sm:flex-row items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
			<div className="w-[80%] sm:w-[40%] mx-auto sm:mr-auto sm:ml-24 my-3">
				<div className="text-gray-200 text-xl">
					GET STARTED
				</div>
				<div className="text-white text-5xl font-semibold mt-2">
					Create new account<span className="text-blue-500 text-5xl">.</span>
				</div>
				<div className="text-gray-200 mt-7 text-md">
					<button className="bg-blue-500 h-[2.5rem] p-2 rounded-l-xl font-semibold hover:bg-blue-700" onClick={handlecool}>Already A Member?</button><Link to="/signin" className="text-blue-500 h-[2.5rem] font-semibold p-2 bg-gray-700 rounded-r-xl hover:bg-gray-500 border-2 border-gray-700">Log in</Link>
				</div>
				<div className="flex flex-row items-center w-full sm:w-[70%] bg-gray-700 p-3 rounded-xl h-[2.5rem] mt-7 border border-black focus-within:border-none focus-within:outline focus-within:outline-blue-500">
					<input
						value={newUser.username}
						onChange={(e) => setnewUser({...newUser, username: e.target.value})}
						placeholder="Username"
						className="text-white placeholder:text-white w-full bg-inherit focus:outline-none"
					/>
					<FaUser fontSize={30} className="text-gray-300"/>
				</div>
				<div className="flex flex-row items-center p-3 mt-5 w-full sm:w-[70%] bg-gray-700 rounded-xl h-[2.5rem] border border-black focus-within:border-none focus-within:outline focus-within:outline-blue-500">
					<input
						value={newUser.email}
						onChange={(e) => setnewUser({...newUser, email: e.target.value})}
						placeholder="Email"
						className="text-white placeholder:text-white w-full bg-inherit focus:outline-none"
					/>
					<FaMailBulk fontSize={30} className="text-gray-300"/>
				</div>
				<div className="flex flex-row items-center p-3 mt-5 w-full sm:w-[70%] bg-gray-700 rounded-xl h-[2.5rem] border border-black focus-within:border-none focus-within:outline focus-within:outline-blue-500">
					<input
						value={newUser.password}
						onChange={(e) => setnewUser({...newUser, password: e.target.value})}
						placeholder="Password"
						className="text-white placeholder:text-white w-full bg-inherit focus:outline-none"
					/>
					<RiLockPasswordFill fontSize={35} className="text-gray-300"/>
				</div>
				<div className="flex flex-row justify-between w-full sm:w-[70%] mt-10">
					<div className="w-[48%] bg-gray-700 text-white text-center font-semibold p-3 rounded-[30px] hover:bg-gray-500">
						<button onClick={handleinfocls}>Clear info</button>
					</div>
					<div className="w-[48%] text-white bg-blue-500 text-center font-semibold p-3 rounded-[30px] hover:bg-blue-700">
						<button onClick={handleSubmit}>Create Account</button>
					</div>
				</div>
			</div>
		</div>	
	  </>
	);
};
export default SignUpPage;