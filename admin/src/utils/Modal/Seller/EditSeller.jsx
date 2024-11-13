import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

function EditSeller({ isOpen, onClose, sellerId, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    products: '',
  });

  useEffect(() => {
    const fetchSeller = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/api/seller/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    if (isOpen && sellerId) {
      fetchSeller();
    }
  }, [isOpen, sellerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${BASE_URL}/api/seller/${sellerId}`, {
        ...formData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Seller updated successfully");
        onUpdate({ _id: sellerId, ...formData });
        onClose();
      }
    } catch (error) {
      console.error("Error updating seller:", error);
      toast.error("Failed to update seller");
    }
  };

  const handleCancel = (e) => {
    onClose();
  };

  return (
    <> 
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative z-60 w-full max-w-3xl">
            <div className="p-6">
              <h3 className="text-2xl mb-4 font-bold flex items-center justify-center">Edit Seller</h3>
              <form onSubmit={handleSubmit}>

                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
                    <label htmlFor="name" className="block my-2 text-left text-sm font-medium text-gray-900">Seller Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Seller Name" 
                      required 
                    />
                  </div>

                  <div className="w-1/2 pl-2">
                    <label htmlFor="address" className="block my-2 text-left text-sm font-medium text-gray-900">Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      id="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Address" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="w-full pr-2">
                    <label htmlFor="products" className="block my-2 text-left text-sm font-medium text-gray-900">Products</label>
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

                <div className="mt-6 flex justify-end">
                  <button 
                    type="submit" 
                    className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                  >
                    Update Seller
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

export default EditSeller;
