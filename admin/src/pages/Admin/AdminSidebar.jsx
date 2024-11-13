import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { MdBusiness } from 'react-icons/md'; 
import { IoReorderThree } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi"; // Importing profile icon
import logo from '../../../src/assets/logo.png';

export const AdminSideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false); 
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Fetch the user's email from local storage
  const userEmail = localStorage.getItem('email') || 'No Email';

  return (
    <div
      className={`bg-[#FFFFFF] m-4 rounded-lg h-screen text-black transition-all duration-300 z-50 ${isExpanded ? 'w-64' : 'w-16'} md:w-64`}
    >
      {/* Logo and Menu button */}
      <div className="flex items-center justify-between bg-gray-950 rounded-t-md p-4">
        <button onClick={toggleSidebar} className="md:hidden flex items-center justify-center">
          {isExpanded ? (
            <IoMdClose className="w-6 h-6 text-white" />
          ) : (
            <IoReorderThree className="w-6 h-6 text-white" />
          )}
        </button>
        <div className='p-4'>
          <img src={logo} alt="Logo" className='w-full' />
        </div>
      </div>

      {/* Nav items */}
      <nav className="mt-4 relative">
        <ul className='relative'>
          <li className="group">
            <a href="/adminDashboard" className="flex items-center p-3 hover:bg-gray-700 hover:text-white font-bold">
              <AiOutlineDashboard className="w-6 h-6" />
              <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>Dashboard</span>
            </a>
          </li>
          
          {/* Profile item with email */}
          

          {/* Management Details item */}
          <li className="group">
            <button
              onClick={() => { navigate("/management-deteils"); }}
              className="flex items-center w-full p-3 hover:bg-gray-700 hover:text-white font-bold focus:outline-none"
            >
              <MdBusiness className="w-6 h-6" />
              <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>Management Details</span>
            </button>
          </li>

          {/* Logout item */}
          <li className="group">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 hover:bg-gray-700 hover:text-white font-bold focus:outline-none"
            >
              <AiOutlineLogout className="w-6 h-6" />
              <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>Logout</span>
            </button>
          </li>
          
        </ul>
       
      </nav>
     
            <button
              className={`flex items-center  p-3   font-bold focus:outline-none absolute bottom-0 bg-lime-300 ${isExpanded ? 'w-64' : 'w-16'} md:w-64`}
              onClick={() => { navigate("/profile"); }} 
            >
              <BiUserCircle className=" text-4xl" />
              <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>{userEmail}</span>
            </button>
          
    </div>
  );
};
