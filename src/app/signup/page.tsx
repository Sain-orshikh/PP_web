'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Images are now served from public/assets - no imports needed

import { CiPaperplane } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

import { useAtom } from "jotai";
import { solarModeAtom } from "../../components/ThemeAtom";
import SpotlightEffect from "@/components/SpotLight";
import LaggingSpotlight from "@/components/Flashlight";
import { flashlightModeAtom } from '@/components/ThemeAtom';

interface FormData {
	email: string;
	username: string;
	fullName: string;
	password: string;
}

interface AuthUser {
	_id: string;
	username: string;
	[key: string]: any;
}

const SignUpPage: React.FC = () => {
	const {data: authUser} = useQuery<AuthUser>({queryKey: ["authUser"]});

    const router = useRouter();
    
    useEffect(() => {
		if(authUser){
			router.push("/");
		}
	}, [authUser, router]);

	const [isSolarMode] = useAtom(solarModeAtom);
	const [isFlashlightMode] = useAtom(flashlightModeAtom);

	const [formData, setFormData] = useState<FormData>({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const queryClient = useQueryClient();

	const { mutate, isError, error, isPending } = useMutation({
		mutationFn: async ({ email, username, fullName, password }: FormData) => {
			try {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, username, fullName, password }),
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formData);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Avatar selection
	const [selectedAvatar, setSelectedAvatar] = useState<string>("");
	const [colorselected, setColorselected] = useState<string>("black");
	const [bgselected, setBgselected] = useState<number>(0);
	const [planecolor, setPlanecolor] = useState<string>("black");
	const [spawnplane, setSpawnplane] = useState<boolean>(false);

	const avatars: string[] = [
		"/assets/boy1.png", 
		"/assets/boy2.png", 
		"/assets/boy3.png", 
		"/assets/girl1.png", 
		"/assets/girl2.png", 
		"/assets/girl3.png"
	];

	const bgImages: string[] = [
		"/assets/skybg.jpg",
		"/assets/ocean.jpg",
		"/assets/cliff.jpg",
		"/assets/moon.jpg",
		"/assets/city.jpg",
		"/assets/wood.jpg",
		"/assets/starry night.jpg"
	];

	const handleColorChange = (color: string) => {
		setPlanecolor(color);
	};

	const handleRemovePlane = () => {
		setSpawnplane(!spawnplane);
	};

	return (
		<>
			{isSolarMode && <SpotlightEffect />}
			{isFlashlightMode && <LaggingSpotlight />}
			<div
				className="flex flex-col md:flex-row w-full min-h-screen bg-cover bg-center"
				style={{
					backgroundImage: `url(${bgImages[bgselected]})`,
				}}
			>
				{/* Left Panel - Desktop only */}
				<div className="hidden md:flex md:w-1/2 bg-white bg-opacity-10 backdrop-blur-sm">
					<div className="flex flex-col w-full h-screen justify-between p-8">
						{/* Top section with avatar selection */}
						<div className="flex flex-col space-y-4">
							<h2 className="text-2xl font-bold text-white mb-4">Choose Your Avatar</h2>
							<div className="grid grid-cols-3 gap-4">
								{avatars.map((avatar, index) => (
									<button
										key={index}
										onClick={() => setSelectedAvatar(avatar)}
										className={`relative w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${ 
											selectedAvatar === avatar 
												? 'border-yellow-400 scale-110' 
												: 'border-white hover:border-yellow-200'
										}`}
										>
											<img
												src={avatar}
												alt={`Avatar ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</button>
								))}
							</div>
						</div>

						{/* Background selector */}
						<div className="flex flex-col space-y-4">
							<h3 className="text-lg font-semibold text-white">Choose Background</h3>
							<div className="flex space-x-2 overflow-x-auto">
								{bgImages.map((bg, index) => (
									<button
										key={index}
										onClick={() => setBgselected(index)}
										className={`flex-shrink-0 w-16 h-12 rounded border-2 ${ 
											bgselected === index ? 'border-yellow-400' : 'border-white'
										} bg-cover bg-center`}
										style={{ backgroundImage: `url(${bg})` }}
									/>
								))}
							</div>
						</div>

						{/* Paper plane customizer */}
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
							<img src="/assets/pp-logo.png" className="w-full h-full object-contain" />
						</div>
					</div>
				</div>

				{/* Right Panel - Sign Up Form */}
				<div className="flex w-full md:w-1/2 bg-white bg-opacity-95 backdrop-blur-sm">
					<div className="flex flex-col w-full min-h-screen justify-center p-8">
						<div className="max-w-md mx-auto w-full">
							<div className="text-center mb-8">
								<h1 className="text-3xl font-bold text-gray-800 mb-2">Join Portal</h1>
								<p className="text-gray-600">Create your research account</p>
							</div>

							{/* Selected avatar preview */}
							{selectedAvatar && (
								<div className="flex justify-center mb-6">
									<div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
										<img
											src={selectedAvatar}
											alt="Selected avatar"
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="relative">
									<FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="Full Name"
										name="fullName"
										onChange={handleInputChange}
										value={formData.fullName}
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div className="relative">
									<FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="Username"
										name="username"
										onChange={handleInputChange}
										value={formData.username}
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div className="relative">
									<MdOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										type="email"
										placeholder="Email"
										name="email"
										onChange={handleInputChange}
										value={formData.email}
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div className="relative">
									<RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										type="password"
										placeholder="Password"
										name="password"
										onChange={handleInputChange}
										value={formData.password}
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<button
									type="submit"
									disabled={isPending}
									className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
								>
									{isPending ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											Creating Account...
										</>
									) : (
										'Create Account'
									)}
								</button>

								{isError && (
									<div className="text-red-500 text-sm text-center">
										{error?.message || 'Something went wrong'}
									</div>
								)}
							</form>

							<div className="text-center mt-6">
								<p className="text-gray-600">
									Already have an account?{' '}
									<Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
										Sign in
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Floating paper plane */}
				{spawnplane && (
					<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
						<CiPaperplane className={`w-16 h-16 text-${planecolor} animate-bounce`} />
					</div>
				)}
			</div>
		</>
	);
};

export default SignUpPage;
