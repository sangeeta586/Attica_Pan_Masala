import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

const DeliveryBoysRegister = () => {
  const navigate = useNavigate();
  const stockistEmailId = localStorage.getItem("email"); // Fetch stockistEmailId from localStorage

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    stockistEmailId: stockistEmailId,
  });

  useEffect(() => {
    // Pre-fill stockistEmailId
    setFormData((prevData) => ({
      ...prevData,
      stockistEmailId,
    }));
  }, [stockistEmailId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/qrGeneraterBoy/register`,
        formData
      );
      toast.success("User registered successfully!");
      console.log("User registered successfully:", response.data);
      navigate("/deliveryboys");

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNo: "",
        address: "",
        city: "",
        pinCode: "",
        state: "",
        stockistEmailId: stockistEmailId,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <ToastContainer />
      <Card color="transparent" shadow={false} className="p-4">
        <Typography variant="h4" className="text-[#1e40af]">
          Sign Up
        </Typography>
        <form className="mt-4 w-96" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              size="lg"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              size="lg"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="tel"
              size="lg"
              placeholder="Phone Number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="bg-[#1e40af]" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DeliveryBoysRegister;
