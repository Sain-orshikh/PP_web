import { useEffect, useState } from "react";
import pp_logo from "../assets/pp-logo.png"
import { useAuth } from '../components/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { FaHome, FaBookReader, FaRegEdit, FaLongArrowAltRight } from "react-icons/fa";
import { useUserStore } from "../store/user";

function SignInSuccessPage() {

    const navigate = useNavigate();
    const { username, setusername, email, setemail, password, setpassword, isSignedIn, setIsSignedIn, id } = useAuth();
    useEffect(() => {
        if(isSignedIn === false) {
            navigate("/signin");
        };
    }, [isSignedIn]);

    const handleSignOut = () => {
        setemail('');
        setpassword('');
        setusername('');
        setIsSignedIn(false);
    };

    const {updateUser} = useUserStore()

    const [modalOpen, setmodalOpen] = useState(false);
    const [updatedUser, setupdatedUser] =  useState({
      name: username,
      email: email,
      password: password
    }); 
    const handleUpdateUser = async(uid, updatedUser) => {
      const {success, message} = await updateUser(uid, updatedUser)
      if(success) {
        setusername(updatedUser.name);
        setemail(updatedUser.email);
        setpassword(updatedUser.password);
      };
      setmodalOpen(false)
    };

    return (
      <>
        <div className="w-full min-h-screen flex flex-col bg-gray-100">
          <div className="flex flex-row justify-between w-[95%] h-[5rem] bg-white mt-7 mx-auto rounded-md">
            <div className="ml-5 w-[60%]">
              <span className="block font-bold text-xl sm:text-2xl mt-3">Welcome back, {username}!</span>
              <span className="block text-gray-500">Successfully signed in</span>
            </div>
            <div className="flex items-center h-full">
              <button onClick={handleSignOut} className="bg-black text-white rounded p-1.5 mr-5">
                <span className="mx-2">Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-evenly sm:flex-row w-[95%] mx-auto mt-7 space-y-2">
            <div className="w-[90%] sm:w-[28%] min-h-[10rem] mx-auto sm:mx-0 bg-white rounded-md">
              <div className="w-full h-full p-4"><div>
                <FaHome fontSize={30}/>
              </div>
              <div className="mt-2 text-xl font-bold">
                Homepage
              </div>
              <div className="mt-1 text-gray-500">
                Discover the latest updates and new projects
              </div>
              <div className="flex flex-row items-center font-bold mt-2">
                <button><Link to={"/"} className="flex flex-row items-center">Visit Homepage <FaLongArrowAltRight fontSize={15} className="mt-1 ml-1"/></Link></button>
              </div></div>
            </div>
            <div className="w-[90%] sm:w-[28%] min-h-[10rem] mx-auto sm:mx-0 bg-white rounded-md space-y-2">
              <div className="w-full h-full p-4"><div>
                <FaBookReader fontSize={30}/>
              </div>
              <div className="mt-2 text-xl font-bold">
                Blog Explorer
              </div>
              <div className="mt-1 text-gray-500">
                Read interesting articles from our community
              </div>
              <div className="flex flex-row items-center font-bold mt-2">
                <button><Link to={"/blog"} className="flex flex-row items-center">Explore Blogs <FaLongArrowAltRight fontSize={15} className="mt-1 ml-1"/></Link></button>
              </div></div>
            </div>
            <div className="w-[90%] sm:w-[28%] min-h-[10rem] mx-auto sm:mx-0 bg-white rounded-md space-y-2">
              <div className="w-full h-full p-4"><div>
                <FaRegEdit fontSize={30}/>
              </div>
              <div className="mt-2 text-xl font-bold">
                Create Blog
              </div>
              <div className="mt-1 text-gray-500">
                Share your thoughts with MAIS
              </div>
              <div className="flex flex-row items-center font-bold mt-2">
                <button><Link to={"/create/blog"} className="flex flex-row items-center">Start writing <FaLongArrowAltRight fontSize={15} className="mt-1 ml-1"/></Link></button>
              </div></div>
            </div>
          </div>
          <div className="flex flex-col w-[95%] min-h-[15rem] bg-white rounded-md mx-auto mt-7 p-4">
            <div className="mt-1">
              <span className="font-bold text-xl">Profile Information</span>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col">
                <span className="text-gray-500">Username</span>
                <span className="">{username}</span>
              </div>
              <div>
                <button onClick={() => setmodalOpen(true)} className="border border-black rounded p-1">
                  <span className="mx-2">Edit</span>
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col">
                <span className="text-gray-500">Email</span>
                <span className="">{email}</span>
              </div>
              <div>
                <button onClick={() => setmodalOpen(true)} className="border border-black rounded p-1">
                  <span className="mx-2">Change</span>
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-col">
                <span className="text-gray-500">Password</span>
                <span className="">{password}</span>
              </div>
              <div>
                <button onClick={() => setmodalOpen(true)} className="border border-black rounded p-1">
                  <span className="mx-2">Update</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setmodalOpen(false)}
          className="flex items-center"
        >
          <div className="w-[30%] h-[12rem] mx-auto bg-white rounded-md p-3">
            <div className="mt-2">
              <input
                value={updatedUser.name}
                onChange={(e) => setupdatedUser({ ...updatedUser, name: e.target.value})}
                placeholder={username}
                className="w-full border border-black p-1"
              />
            </div>
            <div className="mt-2">
              <input
                value={updatedUser.email}
                onChange={(e) => setupdatedUser({ ...updatedUser, email: e.target.value})}
                placeholder={email}
                className="w-full border border-black p-1"
              />
            </div>
            <div className="mt-2">
              <input
                value={updatedUser.password}
                onChange={(e) => setupdatedUser({ ...updatedUser, password: e.target.value})}
                placeholder={password}
                className="w-full border border-black p-1"
              />
              {/* check out responsiveness for modals */}
            </div>
            <div className="flex mt-3">
              <button onClick={() => {handleUpdateUser(id, updatedUser)}} className="bg-black rounded ml-auto p-1">
                <span className="text-white mx-1">Update</span>
              </button>
            </div>
          </div>
        </Modal>
      </>
    )
  }
  
  export default SignInSuccessPage