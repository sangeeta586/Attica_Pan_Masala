import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

function EditPurchaseModal({ isOpen, onClose, purchaseId, onUpdate }) {
  const [formData, setFormData] = useState({
    vendor: "",
    category: "",
    products: [{ name: "", units: "", purchase_price: "" }],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/purchase/${purchaseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching purchase:", error);
      }
    };

    if (isOpen) {
      fetchPurchase();
    }
  }, [isOpen, purchaseId]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/purchase/${purchaseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
      console.log(response);
      if (response.status === 200) {
        onUpdate(response.data);
        toast.success("Purchase updated successfully");
      }
    } catch (error) {
      toast.error("Error updating purchase:", error);
    }
  };

  return (
    <>
      <ToastContainer />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative z-60 w-full max-w-xl">
            <div className="pt-6 mb-4 text-4xl item-center font-bold text-center text-gray-900">
              <h3>Edit Purchase</h3>
            </div>
            <div className=" rounded-lg py-5 px-6 mx-auto max-w-screen-md">
              <form onSubmit={handleSubmit}>
                {formData.products.map((product, index) => (
                  <div key={index} className="flex flex-row">
                    <div className="w-1/3 pr-2">
                      <label
                        htmlFor={`productName${index}`}
                        className="block my-2 text-left text-sm font-medium text-gray-900"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id={`productName${index}`}
                        value={product.name}
                        onChange={(e) => handleChange(e, index)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter Product Name"
                      />
                    </div>
                    <div className="w-1/3 pr-2">
                      <label
                        htmlFor={`productUnits${index}`}
                        className="block my-2 text-left text-sm font-medium text-gray-900"
                      >
                        Units
                      </label>
                      <input
                        type="number"
                        name="units"
                        id={`productUnits${index}`}
                        value={product.units}
                        onChange={(e) => handleChange(e, index)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter Product Units"
                      />
                    </div>
                    <div className="w-1/3 pl-2">
                      <label
                        htmlFor={`productPrice${index}`}
                        className="block my-2 text-left text-sm font-medium text-gray-900"
                      >
                        Product Price
                      </label>
                      <input
                        type="number"
                        name="purchase_price"
                        id={`productPrice${index}`}
                        value={product.purchase_price}
                        onChange={(e) => handleChange(e, index)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter Product Price"
                      />
                    </div>
                  </div>
                ))}
                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
                    <label
                      htmlFor="vendor"
                      className="block my-2 text-left text-sm font-medium text-gray-900"
                    >
                      Vendor
                    </label>
                    <input
                      type="text"
                      name="vendor"
                      id="vendor"
                      value={formData.vendor}
                      onChange={(e) =>
                        setFormData({ ...formData, vendor: e.target.value })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Vendor"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label
                      htmlFor="category"
                      className="block my-2 text-left text-sm font-medium text-gray-900"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Category"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    type="submit"
                    className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                  >
                    Update Purchase
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-white rounded-lg border-red-600 bg-red-600 hover:scale-105"
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

export default EditPurchaseModal;
