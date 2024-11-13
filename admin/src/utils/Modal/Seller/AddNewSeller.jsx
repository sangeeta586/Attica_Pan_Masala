import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

function AddNewSeller() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    products: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/seller/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Data:", response.data);
      toast.success("Add new seller successfully!");
      setFormData({
        name: "",
        address: "",
        products: "",
      });
    } catch (error) {
      console.error("Error adding seller:", error);
      toast.error("Failed to add seller. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-6 mb-4 text-2xl sm:text-4xl font-bold text-center text-gray-900">
        <h3>Add Seller</h3>
      </div>
      <div className="border border-black rounded-lg py-5 px-4 sm:px-6 mx-4 sm:mx-auto max-w-screen-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Address"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="products"
              className="block my-2 text-left text-sm font-medium text-gray-900"
            >
              Products
            </label>
            <input
              type="text"
              name="products"
              id="products"
              value={formData.products}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Products"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
            >
              Add Seller
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewSeller;
