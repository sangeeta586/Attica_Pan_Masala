import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Swal from "sweetalert2";

const VendorNotIntrestedModule = () => {
  const URI = import.meta.env.VITE_API_URL;
  const fieldManagerId = localStorage.getItem("fieldManager_Id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    contactNumber: "",
    reasonForNotRegistering: "",
    otherReasonDetails: "",
    vendorNotIntrested_Location: [],
  });

  useEffect(() => {
    if (navigator.geolocation?.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            vendorNotIntrested_Location: [
              {
                longitude,
                latitude,
                timestamp: new Date().toISOString(),
              },
            ],
          }));
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          toast.error("Could not fetch geolocation. Please try again.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      toast.error("Please enter a valid contact number.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      fieldManagerId: fieldManagerId,
    };

    try {
      const response = await axios.post(
        `${URI}/api/vendornotIntrested`,
        dataToSubmit
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Vendor not interested details submitted successfully!",
      });
      navigate("/showcase");
    } catch (error) {
      console.error(
        "Error during submission:",
        error.response?.data || error.message
      );
      toast.error("An error occurred while submitting data. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="text-white" />
      <div className="flex-grow p-4 justify-between items-center content-center lg:w-1/2">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl f mb-4 text-center font-semibold">
            Vendor Not Interested Form
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              required
              value={formData.ownerName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Reason for Not Registering
            </label>
            <select
              name="reasonForNotRegistering"
              required
              value={formData.reasonForNotRegistering}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select a reason</option>
              <option value="unknown_brand">Unknown Brand</option>
              <option value="not_applicable_product">
                Not Applicable Product
              </option>
              <option value="need_more_time">Need More Time</option>
              <option value="too_expensive">Too Expensive</option>
              <option value="other">Other</option>
            </select>
          </div>
          {formData.reasonForNotRegistering === "other" && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Other Reason Details
              </label>
              <input
                type="text"
                name="otherReasonDetails"
                value={formData.otherReasonDetails}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#1e40af] hover:bg-[#163a91] text-white py-2 rounded-lg font-medium text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorNotIntrestedModule;
