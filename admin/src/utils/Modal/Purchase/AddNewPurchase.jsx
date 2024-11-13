import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';

function AddNewPurchase() {
    const [formData, setFormData] = useState({
        vendor: '',
        category: '',
        products: '',
        purchase_price: '',
        units: '', // Assuming defaultunits is active
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        try {
            const response = await axios.post(
                `${BASE_URL}/api/purchase/`,
                {
                    vendor: formData.vendor,
                    category: formData.category,
                    products: [
                        {
                            name: formData.products,
                            units: formData.units,
                            purchase_price: formData.purchase_price,
                        },
                    ],
                },
                {
                    headers: {
                        // Provide authentication token here
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data); // Log the response data
            toast.success('Purchase added successfully!');
            // Optionally, you can clear the form after successful submission
            setFormData({
                vendor: '',
                category: '',
                products: '',
                purchase_price: '',
                units: '',
            });
        } catch (error) {
            console.error('Error adding purchase:', error);
            toast.error('Failed to add purchase. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='pt-6 mb-4 text-2xl sm:text-4xl item-center font-bold text-center text-gray-900'>
                <h3>Add Purchase</h3>
            </div>
            <div className='border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0'>
                            <label htmlFor='vendor' className='block my-2 text-left text-sm font-medium text-gray-900'>
                                Vendor
                            </label>
                            <input
                                type='text'
                                name='vendor'
                                id='vendor'
                                value={formData.vendor}
                                onChange={handleChange}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                placeholder='Enter Vendor'
                                required
                            />
                        </div>
                        <div className='w-full sm:w-1/2 pl-0 sm:pl-2'>
                            <label htmlFor='category' className='block my-2 text-left text-sm font-medium text-gray-900'>
                                Category
                            </label>
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
                    </div>
                    <div className='flex flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/3 pr-0 sm:pr-2 mb-4 sm:mb-0'>
                            <label htmlFor='products' className='block my-2 text-left text-sm font-medium text-gray-900'>
                                Products
                            </label>
                            <input
                                type='text'
                                name='products'
                                id='products'
                                value={formData.products}
                                onChange={handleChange}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                placeholder='Products'
                                required
                            />
                        </div>
                        <div className='w-full sm:w-1/3 pr-0 sm:pr-2 mb-4 sm:mb-0'>
                            <label htmlFor='units' className='block my-2 text-left text-sm font-medium text-gray-900'>
                                Units
                            </label>
                            <input
                                type='number'
                                name='units'
                                id='units'
                                value={formData.units}
                                onChange={handleChange}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                placeholder='Units'
                            />
                        </div>
                        <div className='w-full sm:w-1/3 pl-0 sm:pl-2'>
                            <label htmlFor='purchase_price' className='block my-2 text-left text-sm font-medium text-gray-900'>
                                Purchase Price
                            </label>
                            <input
                                type='number'
                                name='purchase_price'
                                id='purchase_price'
                                value={formData.purchase_price}
                                onChange={handleChange}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                placeholder='Purchase Price'
                            />
                        </div>
                    </div>
                    <div className='mt-6 item-center flex justify-center'>
                        <button
                            type='submit'
                            className='mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105'
                        >
                            Add Purchase
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNewPurchase;
