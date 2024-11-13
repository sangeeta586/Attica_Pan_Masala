import React, { useState } from 'react';
import DeliveryImg from "../../assets/delivery.svg";
import { useNavigate } from 'react-router-dom';
import Logout from '../utils/Logout';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveryBoyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_URL= process.env.REACT_APP_API_URL;

  const HandleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/qrGeneraterBoy/login`, {
        email,
        password
      });

      const { deliveryBoyToken, id, email: responseEmail } = res.data;
      localStorage.setItem("CurrentUserId", id);
      localStorage.setItem("deliveryBoyToken", deliveryBoyToken);
      localStorage.setItem("email", email);  // Store the email in local storage

      await toast.success('Login successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate('/DeliveryBoyHomePage');
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Login failed, please try again', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-400 text-center">
      <div className="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
        <div className="text-white">
          {/* Logout function */}
          <Logout />

          <img src={DeliveryImg} alt="Img" />
          <h1 className="font-bold text-4xl mt-5">Welcome</h1>
          <p className="font-semibold">Please, login to your account</p>
        </div>
        <form className="flex flex-col space-y-8 mt-10" onSubmit={HandleLogin}>
          <input
            type="text"
            id="email"
            className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeliveryBoyLogin;
