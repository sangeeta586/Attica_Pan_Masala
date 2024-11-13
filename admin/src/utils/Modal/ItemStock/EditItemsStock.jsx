import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

function EditItemsStock({ isOpen, onClose, itemStockId }) {
  const [formData, setFormData] = useState({
    category: '',
    item: '',
    published: false,
    stockCount: 0,
    lastStock: 0,
    quality: '',
    vendor: ''
  });

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/api/itemStocks/${itemStockId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    if (isOpen) {
      fetchItem();
    }
  }, [isOpen, itemStockId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : (type === 'radio' ? (value === 'true') : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${BASE_URL}/api/itemStocks/${itemStockId}`, {
        ...formData,
        published: formData.published === true ? 'true' : 'false'
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("ItemStock updated successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
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
              <h3 className="text-2xl mb-4 font-bold flex items-center justify-center">Edit ItemStock</h3>
              <form onSubmit={handleSubmit}>

                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
                    <label htmlFor="category" className="block my-2 text-left text-sm font-medium text-gray-900">Category</label>
                    <input 
                      type="text" 
                      name="category" 
                      id="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Category" 
                      required 
                    />
                  </div>

                  <div className="w-1/2 pl-2">
                    <label htmlFor="item" className="block my-2 text-left text-sm font-medium text-gray-900">Item</label>
                    <input 
                      type="text" 
                      name="item" 
                      id="item" 
                      value={formData.item} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Item" 
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="w-1/2 pr-2 flex">
                      <label className="block my-2 py-8 text-left text-md font-medium text-gray-900">Published</label>
                      <div className='py-10 pl-4'>
                          <label htmlFor="published_yes">
                              <input 
                                type="radio" 
                                id="published_yes" 
                                name="published" 
                                value="true" 
                                checked={formData.published === true} 
                                onChange={handleChange} 
                              /> 
                              Yes
                          </label>
                      </div>
                      <div className='py-10 pl-4'>
                          <label htmlFor="published_no">
                              <input 
                                type="radio" 
                                id="published_no" 
                                name="published" 
                                value="false" 
                                checked={formData.published === false} 
                                onChange={handleChange} 
                              /> 
                              No
                          </label>
                      </div>
                  </div>

                  <div className="w-1/2 pl-2">
                    <label htmlFor="stockCount" className="block my-2 text-left text-sm font-medium text-gray-900">Stock Count</label>
                    <input 
                      type="number" 
                      name="stockCount" 
                      id="stockCount" 
                      value={formData.stockCount} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Stock Count" 
                    />
                  </div>

                  <div className="w-1/2 pl-2">
                    <label htmlFor="lastStock" className="block my-2 text-left text-sm font-medium text-gray-900">Last Stock</label>
                    <input 
                      type="number" 
                      name="lastStock" 
                      id="lastStock" 
                      value={formData.lastStock} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Last Stock" 
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
                    <label htmlFor="quality" className="block my-2 text-left text-sm font-medium text-gray-900">Quality</label>
                    <input 
                      type="text" 
                      name="quality" 
                      id="quality" 
                      value={formData.quality} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Quality" 
                      required 
                    />
                  </div>

                  <div className="w-1/2 pl-2">
                    <label htmlFor="vendor" className="block my-2 text-left text-sm font-medium text-gray-900">Vendor</label>
                    <input 
                      type="text" 
                      name="vendor" 
                      id="vendor" 
                      value={formData.vendor} 
                      onChange={handleChange} 
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                      placeholder="Enter Vendor" 
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button 
                    type="submit" 
                    className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                  >
                    Update ItemStock
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

export default EditItemsStock;
