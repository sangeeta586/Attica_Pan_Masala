import React, { useState } from "react";
import Img from "../../assets/Login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../constants";

const ManagementLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/administrators/login`, { email, password });
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("email", email);
      toast.success('Login Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/managementDashboard");

    } catch (error) {
      console.log(error);
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
          <span className="letter">M</span>
  <span className="letter">a</span>
  <span className="letter">n</span>
  <span className="letter">a</span>
  <span className="letter">g</span>
  <span className="letter">e</span>
  <span className="letter">m</span>
  <span className="letter">e</span>
  <span className="letter">n</span>
  <span className="letter">t</span>
  <span> </span>
  
  <span className="letter">L</span>
  <span className="letter">o</span>
  <span className="letter">g</span>
  <span className="letter">i</span>
  <span className="letter">n</span>
</h1>


            <div className="p-8 bg-white shadow-lg rounded-lg">
            
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Email
                  </label>
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
                  <label
                    htmlFor="password"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-center font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementLogin;
