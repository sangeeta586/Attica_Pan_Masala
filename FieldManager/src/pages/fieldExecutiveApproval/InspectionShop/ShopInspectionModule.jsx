import React, { useState } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ShopInspectionModule = ({ onClose, fetchShops, shopData }) => {
  const [status, setStatus] = useState(shopData?.status || "pending");
  const [shopName, setShopName] = useState(shopData?.shop_name || "");
  const [shopContactNumber, setShopContactNumber] = useState(shopData?.shop_contact_number || "");
  const [shopAddress, setShopAddress] = useState(shopData?.shop_address || "");
  const [shopOwnerName, setShopOwnerName] = useState(shopData?.shop_owner_name || "");
  const [file, setFile] = useState(null); // State for file uploads
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Handle file selection (if applicable)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // assuming only one file is uploaded
  };

  // Handle status update with file upload
  const handleStatusUpdate = async () => {
    try {
      const url = `${BASE_URL}/api/inspectionShop/status/${shopData._id}`;
      const payload = { status };
  
      // Update only the status when not in edit mode
      if (!isEditing) {
        const response = await axios.put(url, payload);
        toast.success("Shop status updated successfully!");
        fetchShops(); // Refresh the shop list
        onClose(); // Close the module
      } else {
        // If editing, update the full data including the status, and optional file
        const formData = new FormData();
  
        // Append all form data
        formData.append("shop_name", shopName);
        formData.append("shop_contact_number", shopContactNumber);
        formData.append("shop_address", shopAddress);
        formData.append("shop_owner_name", shopOwnerName);
        formData.append("status", status);

        // Append additional fields
        formData.append("fieldManagerId", shopData.fieldManagerId?._id || '');  // assuming you have this data
        formData.append("PanShopOwner", shopData.PanShopOwner || '');  // assuming this is optional
        formData.append("Issues_Reported", shopData.Issues_Reported || '');  // assuming this is optional
        formData.append("Feedback_Provided", shopData.Feedback_Provided || '');  // assuming this is optional
  
        // Append the file if it's selected
        if (file) {
          formData.append("photo", file); // Send file under 'Photos_Uploaded'
        }
  
        // Log the FormData content by iterating through entries
        console.log("FormData to be sent:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
  
        // Send the request
        const response = await axios.put(
          `${BASE_URL}/api/inspectionShop/update/inspections/${shopData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Specify multipart form data
            },
          }
        );
  
        // Success callback
        toast.success("Shop details and status updated successfully!");
        fetchShops(); // Refresh the shop list
        onClose(); // Close the module
        setIsEditing(false); // Exit edit mode after successful update
      }
    } catch (error) {
      toast.error("Failed to update shop status. Please try again.");
      console.error("Error updating status:", error.message);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-lg p-6 bg-white shadow-xl rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" color="blue-gray" className="font-bold text-2xl text-center w-full">
            Shop Inspection - Pending Verification
          </Typography>
          <button
            className="text-red-500 text-xl hover:text-red-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="mb-6">
          <Typography className="text-sm font-semibold text-gray-600 mb-2">
            Shop Name:
          </Typography>
          <Input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="text-base text-gray-800 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter shop name"
            disabled={!isEditing} // Disable input if not editing
          />
        </div>

        <div className="mb-6">
          <Typography className="text-sm font-semibold text-gray-600 mb-2">
            Phone Number:
          </Typography>
          <Input
            value={shopContactNumber}
            onChange={(e) => setShopContactNumber(e.target.value)}
            className="text-base text-gray-800 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter phone number"
            disabled={!isEditing}
          />
        </div>

        <div className="mb-6">
          <Typography className="text-sm font-semibold text-gray-600 mb-2">
            Shop Address:
          </Typography>
          <Input
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            className="text-base text-gray-800 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter shop address"
            disabled={!isEditing}
          />
        </div>

        <div className="mb-6">
          <Typography className="text-sm font-semibold text-gray-600 mb-2">
            Owner Name:
          </Typography>
          <Input
            value={shopOwnerName}
            onChange={(e) => setShopOwnerName(e.target.value)}
            className="text-base text-gray-800 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter owner name"
            disabled={!isEditing}
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <Typography className="text-sm font-semibold text-gray-600 mb-2">
            Upload Photo (optional):
          </Typography>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            disabled={!isEditing}
          />
        </div>

        {/* Update Status */}
        <div className="mb-6">
          <Typography className="text-sm font-semibold text-gray-600 mb-2">
            Update Status:
          </Typography>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex justify-between gap-6">
          {/* Edit Button - Toggles edit mode */}
          <Button
            color="yellow"
            onClick={() => setIsEditing(!isEditing)}
            className="w-32 py-2 hover:bg-blue-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>

          {/* Update Button - Submit updated data */}
          <Button
            color="blue"
            onClick={handleStatusUpdate}
            className="w-32 py-2 hover:bg-blue-600"
            disabled={!isEditing}
          >
            Update
          </Button>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ShopInspectionModule;
