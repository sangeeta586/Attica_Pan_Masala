import React, { useState } from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgetPassword = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/forgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success) {
        alert(data.msg);
        navigate('/ResetPassword');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error occurred during forgot password:', error.message);
    }
  };

  return (
    <>
      <div className="h-screen">
        {/* Navbar */}
        {/* <Nav /> */}



        {/* -----------------------------svg wavy design------------ */}
        <div className="object-cover sm:w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
            <path fill="#0099ff" className="bottom-10" fillOpacity="1" d="M0,192L60,160C120,128,240,64,360,42.7C480,21,600,43,720,69.3C840,96,960,128,1080,144C1200,160,1320,160,1380,160L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>


        {/* -------------------------form----------------- */}
        <div className="lg:flex md:flex block  p-5 justify-evenly content-center items-center">


          {/* -------------------------------IMAGE--------------- */}
          <div className="lg:w-1/2 md:w-1/2 w-full lg:pl-32">
            <img
              src="https://img.freepik.com/premium-vector/forgot-password-illustration_65141-418.jpg"
              alt="forget password image"
              className="object-cover"
            />
          </div>

          {/* -------------------------form----------------- */}

          <div className="lg:w-1/2  md:w-1/2 flex items-center justify-center flex-col w-full">
            <div>
              <h1 className="lg:text-6xl md:text-6xl md:mx-8 text-3xl p-7 font-bold text-blue-500 mt-0 pt-0">Forget Password</h1>
            </div>

            <h3 className="text-base font-sm">
              Enter your Email to reset password
            </h3>

            <div className="">
              <form action="" className="flex flex-col ">
                <input
                  type="text"
                  placeholder="Email"
                  className="mb-4 px-10 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </div>
            <div className="w-96">
              <button
                onClick={handleForgetPassword}
                className="bg-blue-500 px-0 py-2 rounded-2xl font-bold text-white w-48 flex flex-row justify-center text-center mx-24 mt-5 hover:bg-white border-2 border-black hover:text-blue-500 hover:shadow-xl transition all 0.2 ease-in-out "
              >
                Reset Password
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ForgetPassword;
