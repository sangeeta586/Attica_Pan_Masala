import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserImg from '../assets/user.png';
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from '../Components/Navbar/Navbar';
import '../Styles/Styles.css';

const Logout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div>
      <div className='flex justify-center lg:justify-end  p-2 gap-2 lg:p-4 lg:gap-4 '>
        {/* <GiHamburgerMenu className='block md:hidden cursor-pointer' onClick={toggleSidebar} /> */}

        <div className='flex items-center justify-center border-2 border-black lg:px-2 lg:py-2 px-1 py-1 rounded-full bg-white  h-10 lg:h-auto mt-1'>
          <img className='w-5 h-5 lg:w-8 lg:h-8  border-2 border-black rounded-full' src={UserImg} alt="User" />
          <p className='ml-2 text-sm'>{localStorage.getItem('email')}</p>
        </div>
      
        <div>
          <button className='px-4 py-2 shadow-lg m-3 Button' onClick={handleLogout}>Logout</button>
        </div>
      </div>

    </div>
  );
}

export default Logout;


