import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { IoMdClose } from "react-icons/io";
import { BASE_URL } from "../../../src/constants";

export const ManagementRegister = ({ onClose, initialData,fetchManagementDetails }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setIsUpdateMode(true);
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrousername = 'Username is required.';
    if (!formData.email) newErroemail = 'Email is required.';
    if (!isUpdateMode && !formData.password) newErropassword = 'Password is required.';
    if (!isUpdateMode && formData.password !== formData.confirmPassword) newErroconfirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = isUpdateMode
        ? await axios.put(`${BASE_URL}/api/administrators/update/${initialData._id}`, formData)
        : await axios.post(`${BASE_URL}/api/administrators/register`, formData);

      toast.success(isUpdateMode ? 'User updated successfully!' : 'User registered successfully!');
      fetchManagementDetails(); // Fetch updated management details after successful registration or update
     
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      onClose();
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      toast.error(isUpdateMode ? 'Update failed. Please try again.' : 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer />
    
      <Card className="w-96 mx-auto shadow-lg rounded-lg p-6">
       <div className='flex justify-end content-center items-center'>
       <IoMdClose className='text-2xl cursor-pointer' onClick={onClose}/>
       </div>
        <Typography variant="h5" color="blue-gray" className="text-center my-4">
          {isUpdateMode ? 'Update User' : 'Register User'}
        </Typography>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errousername}
              helperText={errousername}
              icon={<MdPerson className="text-gray-500 mt-4 mx-4" />}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 pl-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!erroemail}
              helperText={erroemail}
              icon={<MdEmail className="text-gray-500 mt-4 mx-4" />}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 pl-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errorpassword}
              helperText={erropassword}
              icon={
                <div className="flex items-center">
                  <MdLock className="text-gray-500 mt-4 mx-4"  onClick={() => setShowPassword(!showPassword)}/>
                 
                </div>
              }
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 pl-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!erroconfirmPassword}
              helperText={erroconfirmPassword}
              icon={
                <div className="flex items-center">
                  <MdLock className="text-gray-500 mt-4 mx-4" onClick={() => setShowConfirmPassword(!showConfirmPassword)}  />
                 
                </div>
              }
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 pl-10"
            />
          </div>
         <div className='flex justify-between items-center gap-4'>
         <Button type="submit"  className="mt-6 transition duration-200 ease-in-out hover:bg-blue-600" color="blue">
            {isUpdateMode ? 'Update User' : 'Register User'}
          </Button>
          <Button variant="text" color="white" onClick={onClose} className='mt-6 transition duration-200 ease-in-out hover:bg-red-600 bg-red-700' >
          Close
        </Button>
         </div>
        </form>
        
      </Card>
    </div>
  );
};
