import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../../constants';

function AddNewItem() {
    const [formData, setFormData] = useState({
        itemName: "",
        description: "",
        units: "",
        price: "",
        status: "active", // Assuming default status is active
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
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `${BASE_URL}/api/items/`,
                formData,
                {
                    headers: {
                        // Provide authentication token here
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Item added successfully!", { position: "top-center" });
            console.log(response.data);
            setFormData({
                itemName: "",
                description: "",
                units: "",
                price: "",
                status: "active",
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
            <div className='pt-6 mb-4 text-2xl sm:text-4xl font-bold text-center text-gray-900'>
                <h3>Add Item</h3>
            </div>
            <div className="border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0">
                            <label htmlFor="itemName" className="block my-2 text-left text-sm font-medium text-gray-900">
                                Item name
                            </label>
                            <input
                                type="text"
                                name='itemName'
                                id='itemName'
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
                                name='description'
                                id='description'
                                value={formData.description}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Description of item"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row mt-4">
                        <div className="w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0">
                            <label htmlFor="units" className="block my-2 text-left text-sm font-medium text-gray-900">
                                Units
                            </label>
                            <input
                                type="number"
                                name='units'
                                id='units'
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
                                name='price'
                                id='price'
                                value={formData.price}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Price"
                            />
                        </div>
                    </div>
                    <div className='mt-6 flex justify-center'>
                        <button
                            type="submit"
                            className="mt-2 p-2 bg-purple-600 text-white rounded-lg border-green-600 hover:scale-105">
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNewItem;
