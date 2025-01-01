import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";


const RegisterOrEditFieldManager = ({
  onClose,
  fetchFiledManagers,
  selectedFieldManager,
}) => {
  
  const userId = localStorage.getItem("fieldManager_Id")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    role: "FieldManager",
    address: "",
    state: "",
    pincode: "",
    FEA_id: userId,
  });
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [errors, setErrors] = useState({});
  const isEdit = Boolean(selectedFieldManager);

  

  useEffect(() => {
    const fetchFieldManagerById = async () => {
      if (isEdit && selectedFieldManager) {
        try {
          const response = await fetch(
            `${BASE_URL}/api/fieldManager/getFieldManager/${selectedFieldManager}`
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setFormData({
              name: data.name || "",
              email: data.email || "",
              password: "",
              phoneNo: data.phoneNo || "",
              role: data.role || "FieldManager",
              address: data.address || "",
              state: data.state || "",
              pincode: data.pincode || "",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to fetch Field Executive details.",
            });
          }
        } catch (error) {
          console.error("Error fetching Field Executive details:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching details.",
          });
        }
      }
    };

    fetchFieldManagerById();
  }, [isEdit, selectedFieldManager]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!isEdit && (!formData.password || formData.password.length < 6))
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode || formData.pincode.length !== 6)
      newErrors.pincode = "Pincode must be 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const url = isEdit
        ? `${BASE_URL}/api/fieldManager/update/${selectedFieldManager}`
        : `${BASE_URL}/api/fieldManager/register`;

      try {
        const response = await fetch(url, {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: isEdit ? "Update Successful!" : "Registration Successful!",
            text: isEdit
              ? "Field Executive updated successfully."
              : "Field Executive registered successfully.",
            confirmButtonText: "OK",
          }).then(() => {
            fetchFiledManagers();
            onClose();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: isEdit ? "Update Failed" : "Registration Failed",
            text: data.message || "Something went wrong.",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        console.error("Error handling Field Executive:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while processing.",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        style={{
          background:
            "linear-gradient(to right, rgb(23 135 234), rgb(29 236 247))",
        }}
        className="w-[100%] p-10"
      >
        <div className="flex justify-between items-center content-center my-4 gap-10">
          <Typography variant="h4" className="text-[#1e40af]">
            {isEdit ? "Edit" : "Register"} Field Executive
          </Typography>
          <ImCross
            className="cursor-pointer text-2xl text-[rgb(175,30,30)]"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 px-8 py-2 w-full border rounded-md"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Phone No
            </label>
            <input
              type="number"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="mt-1 px-8 py-2 w-full border rounded-md"
              placeholder="Enter phone No"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
            )}
          </div>

        
          

          {/* Address Field */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Pincode Field */}
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter pincode"
            />
            {errors.pincode && (
              <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* State Field */}
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select your state
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              {/* Add other states */}

              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>

            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
            >
              {isEdit ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOrEditFieldManager;
