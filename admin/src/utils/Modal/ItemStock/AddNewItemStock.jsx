import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';

function AddNewItemStock() {
    const [formData, setFormData] = useState({
        category: '',
        item: '',
        published: false,
        stockCount: 0,
        lastStock: 0,
        quality: '',
        vendor: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (type === 'radio' ? (value === 'true') : value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            console.error("Token is missing");
            return;
        }
        try {
            const response = await axios.post(
                `${BASE_URL}/api/itemStocks/`,
                {
                    ...formData,
                    published: formData.published === true ? 'true' : 'false' // Convert to string here
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data); // Log the response data
            toast.success("ItemStock added successfully!");
            // Optionally, you can clear the form after successful submission
            setFormData({
                category: '',
                item: '',
                published: false,
                stockCount: 0,
                lastStock: 0,
                quality: '',
                vendor: ''
            });
        } catch (error) {
            console.error("Error adding ItemStock:", error);
            toast.error("Failed to add ItemStock. Please try again.");
        }
    };

    const [activeUsers, setActiveUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token not found.');
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/category`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const activeCategories = response.data.filter(category => category.status === 'active');
                setActiveUsers(activeCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='pt-6 mb-4 text-2xl sm:text-4xl item-center font-bold text-center text-gray-900'>
                <h3>Add ItemStock</h3>
            </div>

            <div className="border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-lg">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="block my-2 text-left text-sm font-medium text-gray-900">Category</label>
                            <select
                                name='category'
                                id='category'
                                value={formData.category}
                                onChange={handleChange}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            >
                                <option value=''>Select Category</option>
                                {activeUsersmap((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="item" className="block my-2 text-left text-sm font-medium text-gray-900">Item</label>
                            <input
                                type="text"
                                name="item"
                                id="item"
                                value={formData.item}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Item"
                                required
                            />
                        </div>
                        <div>
                            <label className="block my-2 text-left text-sm font-medium text-gray-900">Published</label>
                            <div className="flex items-center space-x-4">
                                <label htmlFor="published_yes" className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="published_yes"
                                        name="published"
                                        value="true"
                                        checked={formData.published === true}
                                        onChange={handleChange}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label htmlFor="published_no" className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="published_no"
                                        name="published"
                                        value="false"
                                        checked={formData.published === false}
                                        onChange={handleChange}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="stockCount" className="block my-2 text-left text-sm font-medium text-gray-900">Stock Count</label>
                            <input
                                type="number"
                                name="stockCount"
                                id="stockCount"
                                value={formData.stockCount}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Stock Count"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastStock" className="block my-2 text-left text-sm font-medium text-gray-900">Last Stock</label>
                            <input
                                type="number"
                                name="lastStock"
                                id="lastStock"
                                value={formData.lastStock}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Last Stock"
                                required
                            />
                        </div>
                        <div>
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
                        <div>
                            <label htmlFor="vendor" className="block my-2 text-left text-sm font-medium text-gray-900">Vendor</label>
                            <input
                                type="text"
                                name="vendor"
                                id="vendor"
                                value={formData.vendor}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Vendor"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button type="submit" className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105">
                            Add ItemStock
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNewItemStock;
