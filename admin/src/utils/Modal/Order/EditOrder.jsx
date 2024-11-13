import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

function EditOrder({ isOpen, onClose, orderId, onUpdate }) {
  const [formData, setFormData] = useState({
    products: "",
    quantity: "",
    status: "",
    supplier: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (isOpen && orderId) {
      fetchOrder();
    }
  }, [isOpen, orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`${BASE_URL}/api/order/${orderId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Order updated successfully");
        onUpdate({ _id: orderId, ...formData });
        onClose();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!formData.products) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative z-60 w-full max-w-3xl">
            <div className="p-6">
              <h3 className="text-2xl mb-4 font-bold flex items-center justify-center">Edit Order</h3>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row">
                <div className="w-1/2 pr-2">
                    <label htmlFor="supplier" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Supplier
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      id="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Supplier"
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label htmlFor="products" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Products
                    </label>
                    <input
                      type="text"
                      name="products"
                      id="products"
                      value={formData.products}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Products"
                      required
                    />
                  </div>
            
                </div>
                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
                    <label htmlFor="quantity" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Quantity"
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label htmlFor="status" className="block my-2 text-left text-sm font-medium text-gray-900">
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
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                  >
                    Update Order
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="ml-2 p-2 text-white rounded-lg border-red-600 bg-red-600 hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditOrder;
