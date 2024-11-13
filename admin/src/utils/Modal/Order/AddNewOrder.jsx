import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

function AddNewOrder() {
  const [formData, setFormData] = useState({
    products: "",
    quantity: "",
    status: "pending",
    supplier: "",
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
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/order/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Order added successfully!");
      setFormData({
        products: "",
        quantity: "",
        status: "pending",
        supplier: "",
      });
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-6 mb-4 text-2xl sm:text-4xl font-bold text-center text-gray-900">
        <h3>Add Order</h3>
      </div>
      <div className="border border-black rounded-lg py-5 px-4 sm:px-6 mx-4 sm:mx-auto max-w-screen-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="supplier"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Supplier
              </label>
              <input
                type="text"
                name="supplier"
                id="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Supplier"
                required
              />
            </div>
            <div>
              <label
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
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
                placeholder="Products (separate with comma)"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label
                htmlFor="quantity"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Quantity (separate with comma)"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="mt-2 p-2 sm:p-4 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewOrder;
