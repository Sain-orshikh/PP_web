import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import paperairplane from "../assets/paperairplane.png";
import pplogo from "../assets/pp-logo.png";
import moon from "../assets/moon.jpg";
import city from "../assets/city.jpg";
import cliff from "../assets/cliff.jpg";
import rug from "../assets/rug.jpg";
import boy1 from "../assets/boy1.png";
import boy2 from "../assets/boy2.png";
import boy3 from "../assets/boy3.png";
import girl1 from "../assets/girl1.png";
import girl2 from "../assets/girl2.png";
import girl3 from "../assets/girl3.png";

import { CiPaperplane } from "react-icons/ci";
import { Magnetic } from "../components/ui/magnetic";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

const SignUpPage = () => {

	const {data:authUser} = useQuery({queryKey:["authUser"]});

    const navigate = useNavigate();
    
    useEffect(() => {
		if(authUser){
		  navigate("/overview");
		}
	},[authUser]);

	const queryClient = useQueryClient();
	
	const avatars = [boy1, boy2, boy3, girl1, girl2, girl3];
	const chosenavatar = avatars[Math.floor(Math.random() * avatars.length)];

	const [newUser, setnewUser] = useState({
		username: "",
		email: "",
		password: "",
		profileImg: chosenavatar,
	});

	const [spawntag, setspawntag] = useState(true);

	const handlebigdot = () => {
		setspawntag(!spawntag);
	};

	const { mutate: singupMutation, isError, error, isPending} = useMutation({
		mutationFn: async({email, username, password, profileImg}) => {
			try{
				const res = await fetch('/api/auth/signup',{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body: JSON.stringify({username, email, password, profileImg}),
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

	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
		  if (window.innerWidth <= 768) {
			setIsSmallScreen(true);
		  } else {
			setIsSmallScreen(false);
		  }
		};
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => {
		  window.removeEventListener('resize', checkScreenSize);
		};
	  }, []);

	const [IsRemoved, setIsRemoved] = useState(true);

	const [planecolor, setplanecolor] = useState('black');

	const [spawnplane, setspawnplane] = useState(false);

	const handleColorChange = (color) => {
		setplanecolor(color);
	};

	const handleRemovePlane = () => {
		setIsRemoved(!IsRemoved);
		setTimeout(() => {
			setspawnplane(!spawnplane);
		}, 1500);
	};

	return (
	  <>
		<div className="w-full min-h-screen flex flex-col sm:flex-row justify-center bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
			{spawnplane ? <Magnetic color={planecolor} isRemoved={IsRemoved}/> : null}
			<div className={`flex flex-col justify-center w-[80%] sm:w-[40%] mx-auto sm:mr-auto ${ spawnplane === true ? `sm:ml-8` : `sm:ml-24`} my-3`}>
				<div className="text-gray-200 text-xl">
					GET STARTED
				</div>
				<div className="text-white text-5xl font-semibold mt-2">
					Create new account<span className="text-blue-500 text-5xl">.</span>
				</div>
				<div className="text-gray-200 mt-7 text-md">
					<button className="bg-blue-500 h-[2.5rem] px-3 py-2 rounded-l-xl font-semibold hover:bg-blue-700" onClick={handlecool}>Already A Member?</button><Link to="/signin" className="text-blue-500 h-[2.5rem] font-semibold p-2 bg-gray-700 rounded-r-xl hover:bg-gray-500 border-2 border-gray-700">Log in</Link>
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
			<div><button onClick={handlebigdot}>Big Dot</button></div>
			<div className={`${spawntag ? `hidden` : `flex`} flex-col justify-center w-[20%] min-h-screen bg-inherit`}>
				<div className="flex flex-col border w-full h-36 border-black">
					<div className="flex flex-row w-full h-24 border-b border-red-300">
						<div className="w-[80%] h-24 border-r border-black bg-white">
							<CiPaperplane className={`w-full h-full text-${planecolor}`}/>
						</div>
						<div className="w-[20%] h-24 flex flex-col items-center justify-evenly bg-white">
							<button className="w-4 h-4 bg-black" onClick={() => {handleColorChange('black')}}/>
							<button className="w-4 h-4 bg-red-500" onClick={() => {handleColorChange('red-500')}}/>
							<button className="w-4 h-4 bg-blue-500" onClick={() => {handleColorChange('blue-500')}}/>
							<button className="w-4 h-4 bg-purple-800" onClick={() => {handleColorChange('purple-800')}}/>
						</div>
					</div>
					<div className="w-full h-12 border-t border-black bg-gray-100">
						<button className="w-full h-full text-xl hover:bg-gray-300" onClick={handleRemovePlane}>
							{spawnplane ? 'Remove Paperplane' : 'Deploy Paperplane'}
						</button>
					</div>
				</div>
				<div className="flex flex-row w-full h-16 mt-auto mb-5 items-center bg-inherit">
					<img src={pplogo} className="w-16 h-16" alt="pplogo"/>
					<div className="ml-1">
						<div className="text-white text-2xl font-semibold">
							Passion Project
						</div>
						<p className="text-white mt-1 text-sm">
							&copy; 2025 Passion Project club
						</p>
					</div>
				</div>
			</div>
		</div>
	  </>
	);
};
export default SignUpPage;