import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "../../../Styles/Styles.css";
import { BASE_URL } from "../../../constants";

function AddNewCategory() {
  const [formData, setFormData] = useState({
    ProductName: "",
    Status: "active",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${BASE_URL}/api/category/`,
        formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Category added successfully!", { position: "top-center" });

      setFormData({
        ProductName: "",
        Status: "active",
      });
      setError("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      
      <div className="pt-6 mb-4 text-2xl md:text-4xl text-center font-bold text-gray-90 ">
        <h3>Add Category</h3>
      </div>
      <div className="border border-black rounded-lg py-5 px-4 md:px-6 mx-auto max-w-screen-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label
                htmlFor="ProductName"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                NAME
              </label>
              <input
                type="text"
                name="ProductName"
                id="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Product Name"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label className="block my-2 text-left text-sm font-medium text-gray-900">
                Status
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="active"
                  name="Status"
                  value="active"
                  checked={formData.Status === "active"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  role="switch"
                  id="inactive"
                  name="Status"
                  value="inactive"
                  checked={formData.Status === "inactive"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="mt-2 p-2 text-white rounded-lg bg-purple-600 hover:scale-105 AddBtn"
            >
              Add category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewCategory;
