import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';

function EditSupplies({ isOpen, onClose, suppliesId, onUpdate }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchSupplyData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/api/supplies/${suppliesId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, products, quantity, price } = response.data;
        setFormData({ name, products, quantity, price });
      } catch (error) {
        console.error('Error fetching supply data:', error);
      }
    };

    if (isOpen && suppliesId) {
      fetchSupplyData();
    }
  }, [isOpen, suppliesId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `${BASE_URL}/api/supplies/${suppliesId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Supplies updated successfully');
        onUpdate({ _id: suppliesId, ...formData });
        onClose();
      }
    } catch (error) {
      console.error('Error updating supplies:', error);
      toast.error('Failed to update supplies. Please try again.');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!formData) {
    return "";
   }

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative z-60 w-full max-w-3xl">
            <div className="p-6">
              <h3 className="text-2xl mb-4 font-bold flex items-center justify-center">Edit Supplies</h3>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
                    <label htmlFor="name" className="block my-2 text-left text-sm font-medium text-gray-900">
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
                      placeholder="Products"
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
                      placeholder="Quantity"
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label htmlFor="price" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Price"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                  >
                    Update Supplies
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

export default EditSupplies;
