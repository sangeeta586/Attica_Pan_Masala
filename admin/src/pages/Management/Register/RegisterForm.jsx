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
import { IoMdClose } from "react-icons/io";
const RegisterForm = ({ onClose,selectDeliveryboy }) => {
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
    stockist: null, // Store the whole stockist object
  });

  const [executiveDetails, setExecutiveDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExecutives, setFilteredExecutives] = useState([]);

  useEffect(() => {
    const fetchExecutiveDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/executives/getAllUser`);
        setExecutiveDetails(response.data); // Save all executives
        setFilteredExecutives(response.data); // Initialize filtered list
      } catch (error) {
        console.error("Failed to fetch executive details:", error);
      }
    };
    fetchExecutiveDetails();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = executiveDetails.filter((executive) =>
      Object.values(executive).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredExecutives(filtered);
  };

  const handleExecutiveSelection = (executive) => {
    setFormData({ ...formData, selectedStockist: executive }); // Store full stockist object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic (e.g., password matching)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        stockist: formData.stockist?._id, // If stockist is selected, send their ID
      };

      const response = selectDeliveryboy
        ? await axios.put(`${BASE_URL}/api/qrGeneraterBoy/${selectDeliveryboy._id}`, dataToSend)
        : await axios.post(`${BASE_URL}/api/qrGeneraterBoy/register`, dataToSend);

      toast.success(selectDeliveryboy ? "User updated successfully" : "User registered successfully");

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
        selectedStockist: null,
      });
      onClose();
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      toast.error(`Registration failed: ${error.response.data.error}`);
    }
  };


  useEffect(() => {
    if (selectDeliveryboy) {
      setFormData({
        username: selectDeliveryboy.username,
        email: selectDeliveryboy.email,
        phoneNo: selectDeliveryboy.phoneNo,
        address: selectDeliveryboy.address,
        city: selectDeliveryboy.city,
        pinCode: selectDeliveryboy.pinCode,
        state: selectDeliveryboy.state,
        stockist: selectDeliveryboy.stockist || null,
      });
    }
  }, [selectDeliveryboy]);

  return (
    <div className="flex justify-center items-center h-full">
      <ToastContainer className="z-50" />
      <Card color="transparent" shadow={false} className="p-2">
      <Typography variant="h4" className="text-[#1e40af]">
          {selectDeliveryboy ? "Update Delivery Boy" : "Registration"}
        </Typography>
        <IoMdClose onClick={onClose}  className="absolute top-4 right-3 cursor-pointer  text-2xl"/>
        <div className="overflow-y-auto max-h-[80vh] p-4">
          <form className="mt-8 mb-2 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="email"
                  size="lg"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  size="lg"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  size="lg"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              {/* Contact Details */}
              <div className="mb-6">
                <Input
                  type="tel"
                  size="lg"
                  placeholder="Phone Number"
                  value={formData.phoneNo}
                  onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>

            </div>
            <div className="mb-6">
              <Input
                type="text"
                size="lg"
                placeholder="Search Super Stockists"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="h-60 overflow-y-auto border border-gray-300 mt-2 rounded-md p-2">
                {filteredExecutives.map((stockist) => (
                  <div
                    key={stockist._id}
                    className={`p-2 my-2 cursor-pointer rounded-md ${formData.selectedStockist?._id === stockist._id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleExecutiveSelection(stockist)}
                  >
                    {stockist.username}, {stockist.city}, {stockist.state}
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="mt-6 bg-[#1e40af] hover:bg-blue-400" fullWidth>
            {selectDeliveryboy ? "Update" : "Sign up"}
          </Button>
          </form>
        </div>
        
      </Card>
    </div>
  );
};

export default RegisterForm;
