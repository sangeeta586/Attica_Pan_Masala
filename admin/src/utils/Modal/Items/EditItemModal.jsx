import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';

const EditItemModal = ({ isOpen, onClose, itemId, onUpdate }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    units: '',
    price: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (isOpen) {
      fetchItem();
    }
  }, [isOpen, itemId]);

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
      const response = await axios.put(`${BASE_URL}/api/items/${itemId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Item updated successfully');
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 rounded-lg w-full max-w-md mx-4 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="p-6">
              <div className="mb-4 text-2xl sm:text-4xl font-bold text-center text-gray-900">
                <h3>Edit Item</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row mb-4">
                  <div className="w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0">
                    <label htmlFor="itemName" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Item name
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      id="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Item Name"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-1/2 pl-0 sm:pl-2">
                    <label htmlFor="description" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Description of item"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row mb-4">
                  <div className="w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0">
                    <label htmlFor="units" className="block my-2 text-left text-sm font-medium text-gray-900">
                      Units
                    </label>
                    <input
                      type="number"
                      name="units"
                      id="units"
                      value={formData.units}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Units"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-1/2 pl-0 sm:pl-2">
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
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                  <button type="submit" className="mt-2 p-2 bg-purple-600 text-white rounded-lg hover:scale-105">
                    Update Item
                  </button>
                  <button onClick={onClose} type="button" className="mt-2 p-2 bg-gray-600 text-white rounded-lg hover:scale-105">
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
};

export default EditItemModal;


