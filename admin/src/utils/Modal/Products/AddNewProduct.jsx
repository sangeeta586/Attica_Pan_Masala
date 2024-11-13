import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

function AddNewProduct() {
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    units: "",
    price: "",
    status: "active",
    variants: [],
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
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/product/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Product added successfully!", { position: "top-center" });
      setFormData({
        item_name: "",
        description: "",
        units: "",
        price: "",
        status: "active",
        variants: [],
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
      <div className="pt-6 mb-4 text-2xl sm:text-4xl item-center font-bold text-center text-gray-900">
        <h3>Add Products</h3>
      </div>
      <div className="border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="item_name"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="item_name"
                id="item_name"
                value={formData.item_name}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Product Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Description"
                required
              />
            </div>
            <div>
              <label
                htmlFor="units"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Units
              </label>
              <input
                type="number"
                name="units"
                id="units"
                value={formData.units}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Units"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Price"
                required
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewProduct;
