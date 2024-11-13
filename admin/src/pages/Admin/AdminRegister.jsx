import React, { useState } from "react";
import Img from "../../assets/Login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../constants";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/admin/register`, { username, email, password, confirmPassword });
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("email", email);
      toast.success('Registration Successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error('Registration failed, please try again', {
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
    <>
      <ToastContainer />
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Image Section */}
        <div className="lg:w-1/2 h-1/3 lg:h-full flex justify-center items-center bg-blue-500">
          <img
            src={Img}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 flex justify-center items-center bg-blue-500">
          <div className="w-full max-w-md p-6 lg:p-0">
            <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold text-gray-950 text-center mb-8">
              <span className="letter">A</span>
              <span className="letter">d</span>
              <span className="letter">m</span>
              <span className="letter">i</span>
              <span className="letter">n</span>
              <span className="letter"> </span>
              <span className="letter">R</span>
              <span className="letter">e</span>
              <span className="letter">g</span>
              <span className="letter">i</span>
              <span className="letter">s</span>
              <span className="letter">t</span>
              <span className="letter">e</span>
              <span className="letter">r</span>
            </h1>

            <div className="p-8 bg-white shadow-lg rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-center font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
                >
                  Register
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Already have an account?{" "}
                  <a href="/" className="font-semibold text-blue-500 hover:text-blue-600">
                    Login
                  </a>{" "}
                  or{" "}
                  <a href="/forgot-password" className="font-semibold text-blue-500 hover:text-blue-600">
                    Forgot Password
                  </a>{" "}
                  instead?{" "}
                  <a href="/" className="font-semibold text-blue-500 hover:text-blue-600">
                    Return to Admin Login
                  </a>{" "}
                  for the Super Stockist portal.{" "}
                  <a href="/contact" className="font-semibold text-blue-500 hover:text-blue-600">
                    Contact Us
                  </a>{" "}
                  for any other questions.{" "}
                  <a href="/terms-and-conditions " className="font-semibold text-blue
                  hover:text-blue-600">
                    Terms and Conditions
                  </a>{" "}

                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
