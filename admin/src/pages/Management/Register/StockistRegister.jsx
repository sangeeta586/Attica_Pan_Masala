import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { BASE_URL } from "../../../constants";

const StockistRegister = ({ onClose, selectedStockist }) => {
  const [superStockists, setSuperStockists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuperStockists, setFilteredSuperStockists] = useState([]);
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
    selectedSuperStockist: "",
  });

  // Fetch super stockists on component mount and when searchTerm changes
  useEffect(() => {
    fetchSuperStockists();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSuperStockists(superStockists);
    } else {
      const filtered = superStockists.filter((stockist) =>
        Object.values(stockist).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredSuperStockists(filtered);
    }
  }, [searchTerm, superStockists]);

  const fetchSuperStockists = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/superstockist/getAllUser`);
      if (!response.ok) {
        throw new Error("Failed to fetch super stockists");
      }
      const data = await response.json();
      setSuperStockists(data);
      setFilteredSuperStockists(data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching super stockists:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.selectedSuperStockist) {
      toast.error("Please select a Super Stockist!");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const requestData = {
      ...formData,
      selectedSuperStockist: formData.selectedSuperStockist,
    };

    try {
      let response;
      if (selectedStockist) {
        response = await axios.put(
          `${BASE_URL}/api/executives/update/${selectedStockist._id}`,
          requestData
        );
        toast.success("User updated successfully!");
      } else {
        response = await axios.post(
          `${BASE_URL}/api/executives/registerexecutive`,
          requestData
        );
        toast.success("User registered successfully!");
      }

      console.log(response.data);

      // Reset form after submission
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
        selectedSuperStockist: "",
      });
      onClose();
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.error || error.message);
      toast.error("Registration failed!");
    }
  };

  useEffect(() => {
    if (selectedStockist) {
      setFormData({
        username: selectedStockist.username,
        email: selectedStockist.email,
        address: selectedStockist.address,
        city: selectedStockist.city,
        pinCode: selectedStockist.pinCode,
        state: selectedStockist.state,
        selectedSuperStockist: selectedStockist.selectedSuperStockist || "",
      });
    }
  }, [selectedStockist]);

  return (
    <div className="flex justify-center items-center h-full">
      <ToastContainer />
      <Card color="transparent" shadow={false} className="p-4">
        <Typography variant="h4" className="text-[#1e40af]">
          {selectedStockist ? "Update Delivery Boy" : "Registration"}
        </Typography>
        <IoMdClose onClick={onClose} className="absolute top-4 right-3 cursor-pointer text-2xl" />
        
        <div className="overflow-y-auto max-h-[80vh] p-4">
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="email"
                  size="lg"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  size="lg"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  size="lg"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="number"
                  size="lg"
                  placeholder="Pin Code"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Searchable Super Stockist List */}
            <div className="mb-6">
              <Input
                type="text"
                size="lg"
                placeholder="Search Super Stockists"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="h-60 overflow-y-auto border border-gray-300 mt-2 rounded-md p-2">
                {filteredSuperStockists.map((stockist) => (
                  <div
                    key={stockist.id}
                    className={`p-2 my-2 cursor-pointer rounded-md ${formData.selectedSuperStockist === stockist._id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                    onClick={() =>
                      setFormData({ ...formData, selectedSuperStockist: stockist._id })
                    }
                  >
                    {stockist?.username} {stockist?.state} {stockist?.city}
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="mt-6 bg-[#1e40af] hover:bg-blue-600">
              {selectedStockist ? "Update" : "Register"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default StockistRegister;
