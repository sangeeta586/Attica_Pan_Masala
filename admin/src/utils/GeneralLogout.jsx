import { Button } from '@material-tailwind/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const GeneralLogout = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        navigate("/");
      };
  return (
    <div>
        <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default GeneralLogout