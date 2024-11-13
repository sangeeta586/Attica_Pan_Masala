import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

const RegisterForm = ({ onClose }) => {
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
  });
  const [executiveEmails, setExecutiveEmails] = useState([]);
  const [selectedExecutiveEmail, setSelectedExecutiveEmail] = useState("");

  useEffect(() => {
    const fetchExecutiveEmails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/executives/getAllUser`
        );
        const executiveEmails = response.data.map(
          (executive) => executive.email
        );
        setExecutiveEmails(executiveEmails);
      } catch (error) {
        console.error("Failed to fetch executive emails:", error);
      }
    };
    fetchExecutiveEmails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        stockistEmailId: selectedExecutiveEmail,
      };
      const response = await axios.post(
        `${BASE_URL}/api/qrGeneraterBoy/register`,
        dataToSend
      );
      toast.success("User registered successfully"); // Display toast on success
      console.log("User registered successfully:", response.data);

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
      });
      setSelectedExecutiveEmail(""); // Clear selected executive email after successful registration
      onClose(); // Close the modal after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      toast.error(`Registration failed: ${error.response.data.error}`); // Display toast on registration failure
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal when cancel button is clicked
  };

  return (
    <div className="flex justify-center items-center h-full">
      <ToastContainer className="z-50" /> {/* ToastContainer must be placed here */}
      <Card color="transparent" shadow={false} className="p-2">
        <Typography variant="h4" className="text-[#1e40af]">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-[#1e40af]">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              size="lg"
              placeholder="Your Email"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              size="lg"
              placeholder="Confirm Password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="tel"
              size="lg"
              placeholder="Phone Number"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="phoneNo"
              id="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="Address"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="City"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="Pin Code"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="pinCode"
              id="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="lg"
              placeholder="State"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Select
              value={selectedExecutiveEmail}
              onChange={(value) => setSelectedExecutiveEmail(value)}
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            >
              <Option value="">
                Select Executive Email
              </Option>
              {executiveEmails.map((email) => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </div>

          <Button type="submit" className="mt-6 bg-[#1e40af] hover:bg-blue-400" fullWidth>
            Sign up
          </Button>
        </form>
        <Button color="red" className="w-24 ml-auto mt-4" onClick={handleCancel}>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default RegisterForm;
