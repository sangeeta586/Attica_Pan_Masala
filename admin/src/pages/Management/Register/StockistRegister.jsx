import React, { useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

const StockistRegister = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "India",
    state: "",
    city: "",
    address: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/executives/registerexecutive`,
        formData
      );
      toast.success("User registered successfully:");
      console.log("User registered successfully:", response.data);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "India",
        state: "",
        city: "",
        address: "",
        pinCode: "",
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <ToastContainer />
      <Card color="transparent" shadow={false} className="p-2">
        <Typography variant="h4" className="text-[#1e40af]">
          Register
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <Input
              type="text"
              size="lg"
              placeholder="Username"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              size="lg"
              placeholder="Email"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              size="lg"
              placeholder="Confirm Password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              size="lg"
              placeholder="Country"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="country"
              id="country"
              value={formData.country}
              readOnly
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              size="lg"
              placeholder="State"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              size="lg"
              placeholder="City"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              size="lg"
              placeholder="Address"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              size="lg"
              placeholder="Pin Code"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="pinCode"
              id="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="mt-6 bg-[#1e40af] hover:bg-blue-400" fullWidth>
            Register
          </Button>
       
        </form>
        <Button
          color="red"
          className="w-24 ml-auto mt-4"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default StockistRegister;
