import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';

const SuperstockistRegister = ({onClose}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'India',
    phoneNo: '',
    address: '',
    state: '',
    pinCode: '',
    city: '',
    wareHouseName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/superstockist/register`,
        formData
      );
      console.log('Response:', response.data);
      toast.success('Superstockist registered successfully!');
      // Clear form data after successful submission if needed
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: 'India',
        phoneNo: '',
        address: '',
        state: '',
        pinCode: '',
        city: '',
        wareHouseName: '',
      });
    } catch (error) {
      toast.error('Error:', error);
      console.error('Error:', error);
    }
  };
  const handleCancel = () => {
    onClose(); // Close the modal when cancel button is clicked
  };

  return (
    <div className="h-full flex justify-center items-center">
      <ToastContainer />
      <Card color="transparent" shadow={false} className="w-full max-w-md p-2">
        <Typography variant="h4" className='text-[#1e40af]'>
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-[#1e40af]">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-6 flex flex-col gap-4">
            <Input
              size="lg"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Phone Number"
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder="Warehouse Name"
              name="wareHouseName"
              value={formData.wareHouseName}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-4 bg-[#1e40af]" fullWidth>
            Sign Up
          </Button>
          
        </form>
        <Button
          color="red"
          className="w-24 ml-auto mt-4"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default SuperstockistRegister;
