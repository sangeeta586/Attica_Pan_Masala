import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { BASE_URL } from "../../../constants";

const ShopInspectionModule = ({ onClose, fetchShops, shopData }) => {
  const [formData, setFormData] = useState({
    shop_name: "",
    shop_address: "",
    shop_contact_number: "",
    shop_owner_name: "",
    shopStatus: "",
    Issues_Reported: "",
    Feedback_Provided: "",
    shop_Location: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const isUpdating = !!shopData; // Check if shopData is passed

  // Automatically fetch location
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData((prevData) => ({
              ...prevData,
              shop_Location: `${latitude}, ${longitude}`,
            }));
          },
          (error) => {
            console.error("Error fetching location:", error.message);
            toast.error("Could not fetch location.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser.");
      }
    };

    fetchLocation();

    // If updating, pre-fill form data
    if (shopData) {
      setFormData(shopData);
      if (shopData.photo) {
        setImagePreview(`${BASE_URL}/${shopData.photo}`);
      }
    }
  }, [shopData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataObj.append(key, value)
    );

    if (selectedImage) formDataObj.append("photo", selectedImage);

    try {
      let response;
      if (isUpdating) {
        // Update existing shop data
        response = await axios.put(
          `${BASE_URL}/api/inspectionShop/update/inspections/${shopData._id}`,

          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Submit new shop data
        response = await axios.post(
          `${BASE_URL}/api/inspectionShop/create`,
          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Success alert
      Swal.fire({
        title: "Success!",
        text: isUpdating
          ? "Shop inspection data updated successfully!"
          : "Shop inspection data submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setFormData({
          shop_name: "",
          shop_address: "",
          shop_contact_number: "",
          shop_owner_name: "",
          shopStatus: "",
          Issues_Reported: "",
          Feedback_Provided: "",
          shop_Location: "",
        });
        setSelectedImage(null);
        setImagePreview(null);
        fetchShops(); // Refresh list of shops
        onClose(); // Close the modal
      });
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error);
      toast.error("Submission failed. Please try again.");
    }
  };

  useEffect(() => {
    if (shopData) {
      setFormData({
        shop_name: shopData.shop_name,
        shop_address: shopData.shop_address,
        shop_contact_number: shopData.shop_contact_number,
        shop_owner_name: shopData.shop_owner_name,
        shopStatus: shopData.shopStatus,
        Issues_Reported: shopData.Issues_Reported,
        Feedback_Provided: shopData.Feedback_Provided,
        shop_location: shopData.shop_location,
      });
    }
  }, [shopData]);

  return (
    <div className="flex justify-center items-center h-full">
      <ToastContainer />
      <Card color="transparent" shadow={false} className="p-6 w-full max-w-lg">
        <div className="flex justify-between mb-4">
          <Typography variant="h4" className="text-[#1e40af]">
            {isUpdating ? "Update Shop Inspection" : "Shop Inspection"}
          </Typography>
          <ImCross
            className="cursor-pointer text-xl text-red-600 hover:text-red-800"
            onClick={onClose}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="shop_name"
            value={formData.shop_name}
            onChange={handleChange}
            placeholder="Shop Name"
            required
          />
          <Input
            type="text"
            name="shop_address"
            value={formData.shop_address}
            onChange={handleChange}
            placeholder="Shop Address"
            required
          />
          <Input
            type="text"
            name="shop_contact_number"
            value={formData.shop_contact_number}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
          <Input
            type="text"
            name="shop_owner_name"
            value={formData.shop_owner_name}
            onChange={handleChange}
            placeholder="Owner Name"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Status
            </label>
            <select
              name="shopStatus"
              value={formData.shopStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Update Status
              </option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="Visited">Visited</option>
              <option value="Not_Visited">Not Visited</option>
              <option value="Inspection_Completed">Inspection Completed</option>
              <option value="Inspection_Incomplete">
                Inspection Incomplete
              </option>
            </select>
          </div>
          <Textarea
            name="Feedback_Provided"
            value={formData.Feedback_Provided}
            onChange={handleChange}
            placeholder="Feedback Provided"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full px-4 py-2 border rounded-md"
              id="photoUpload"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                className="mt-4 h-32 w-32 object-cover rounded-lg"
              />
            )}
          </div>

          <Button type="submit" className="w-full bg-[#1e40af]">
            {isUpdating ? "Update" : "Submit"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ShopInspectionModule;
