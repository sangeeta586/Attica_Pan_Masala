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
import Sidebar from "../../components/Sidebar/Sidebar";

const ShopInspectionModule = ({ onClose, fetchShops, shopData }) => {
  const URI = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    fieldManagerId: localStorage.getItem("fieldManager_Id"),
    shop_name: "",
    shop_address: "",
    shop_contact_number: "",
    shop_owner_name: "",
    shopStatus: "",
    Issues_Reported: "",
    Feedback_Provided: "",
    shop_Location: "",
    productId: [], // Empty array to store product IDs
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const isUpdating = !!shopData;
  const navigate = useNavigate();

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

    // Retrieve productIds from localStorage, ensuring it's an array of strings
    const productIds = JSON.parse(localStorage.getItem("myData")) || [];
    setFormData((prevData) => ({
      ...prevData,
      productId: productIds,
    }));

    if (isUpdating && shopData) {
      setFormData({
        ...shopData,
        fieldManagerId: localStorage.getItem("fieldManager_Id"),
      });
      if (shopData.photo) {
        setImagePreview(`${URI}/${shopData.photo}`);
      }
    }
  }, [isUpdating, shopData]);

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
          `${URI}/api/inspectionShop/update/inspections/${shopData._id}`,
          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Submit new shop data
        response = await axios.post(
          `${URI}/api/inspectionShop/create`,
          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Navigate to the appropriate page
      navigate("/Pending-Verification");

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: isUpdating
          ? "Shop inspection data updated successfully!"
          : "Shop inspection data submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Reset form data and close modal
        setFormData({
          shop_name: "",
          shop_address: "",
          shop_contact_number: "",
          shop_owner_name: "",
          shopStatus: "",
          Issues_Reported: "",
          Feedback_Provided: "",
          shop_Location: "",
          productId: [],
        });
        setSelectedImage(null);
        setImagePreview(null);
        fetchShops(); // Refresh shop list
        onClose(); // Close modal
      });
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="text-white">
        <Sidebar />
      </div>
      <ToastContainer />
      <Card
        color="transparent"
        shadow={false}
        className="p-6 w-full lg:px-[10%]"
      >
        <div className="flex justify-center mb-4 mt-20">
          <Typography variant="h4" className="text-[#1e40af]">
            {isUpdating ? "Update Shop Inspection" : "Add New Vendor"}
          </Typography>
        </div>

        <form
          className="w-full space-y-4 bg-white shadow-lg p-4 rounded-lg max-w-8xl"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="shop_name"
              className="block text-sm font-medium text-gray-700"
            >
              Shop Name
            </label>
            <Input
              id="shop_name"
              type="text"
              name="shop_name"
              value={formData.shop_name}
              onChange={handleChange}
              placeholder="Enter Shop Name"
              required
              className="p-4"
            />
          </div>

          <div>
            <label
              htmlFor="shop_address"
              className="block text-sm font-medium text-gray-700"
            >
              Shop Address
            </label>
            <Input
              id="shop_address"
              type="text"
              name="shop_address"
              value={formData.shop_address}
              onChange={handleChange}
              placeholder="Enter Shop Address"
              required
              className="p-4"
            />
          </div>

          <div>
            <label
              htmlFor="shop_contact_number"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <Input
              id="shop_contact_number"
              type="text"
              name="shop_contact_number"
              value={formData.shop_contact_number}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              required
              className="p-4"
            />
          </div>

          <div>
            <label
              htmlFor="shop_owner_name"
              className="block text-sm font-medium text-gray-700"
            >
              Shop Owner Name
            </label>
            <Input
              id="shop_owner_name"
              type="text"
              name="shop_owner_name"
              value={formData.shop_owner_name}
              onChange={handleChange}
              placeholder="Enter Owner Name"
              required
              className="p-4"
            />
          </div>

          <div>
            <label
              htmlFor="Feedback_Provided"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback Provided
            </label>
            <Textarea
              id="Feedback_Provided"
              name="Feedback_Provided"
              value={formData.Feedback_Provided}
              onChange={handleChange}
              placeholder="Provide Feedback"
              className="p-4"
            />
          </div>

          <div>
            <label
              htmlFor="photoUpload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Photo
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full px-4 py-2 border rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                className="mt-4 h-32 w-32 object-cover rounded-lg"
              />
            )}
          </div>

          <Button type="submit" className="w-full bg-[#1e40af] p-4">
            {isUpdating ? "Update" : "Submit"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ShopInspectionModule;
