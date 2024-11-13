import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { BASE_URL } from '../../../constants';

function AddNewSupplier() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        products: [{ name: '', description: '', price: '' }],
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name.includes("products")) {
            const updatedProducts = [...formData.products];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [name.split('.')[1]]: value
            };
            setFormData(prevState => ({
                ...prevState,
                products: updatedProducts
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleAddProduct = () => {
        setFormData(prevState => ({
            ...prevState,
            products: [...prevState.products, { name: '', description: '', price: '' }]
        }));
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `${BASE_URL}/api/supplier/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
            toast.success("Supplier added successfully!");
            setFormData({
                name: "",
                address: "",
                products: [{ name: '', description: '', price: '' }],
            });
        } catch (error) {
            console.error("Error adding supplier:", error);
            toast.error("Failed to add supplier. Please try again.");
        }
    };

    return (
        <>
        
        <ToastContainer />
         <div className='pt-6 mb-4 text-2xl md:text-4xl text-center font-bold text-gray-900'>
                <h3>Add Supplier</h3>
            </div>
            <div className="border border-black rounded-lg py-5 px-4 md:px-6 mx-auto max-w-screen-xl">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <label htmlFor="Name" className="block my-2 text-left text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <input
                                type="text"
                                name='name'
                                id='Name'
                                onChange={handleChange}
                                value={formData.name}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <label htmlFor="Address" className="block my-2 text-left text-sm font-medium text-gray-900">
                                Address
                            </label>
                            <input
                                type="text"
                                name='address'
                                id='Address'
                                value={formData.address}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    {formData.products.map((product, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:space-x-4 mt-4">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <label htmlFor={`Product_name_${index}`} className="block my-2 text-left text-sm font-medium text-gray-900">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name={`products[${index}].name`}
                                    id={`Product_name_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    value={product.name}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Product Name"
                                    required
                                />
                                {index === formData.products.length - 1 && (
                                    <div className="flex items-center mt-4 space-x-2">
                                        <button type="button" onClick={handleAddProduct} className="p-2 bg-green-500 w-10 md:w-16 rounded-md flex items-center justify-center"><FaPlus /></button>
                                        {formData.products.length > 1 && (
                                            <button type="button" onClick={() => handleDeleteProduct(index)} className="p-2 bg-red-500 rounded-md w-10 md:w-16 flex items-center justify-center"><FaMinus /></button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <label htmlFor={`Description_${index}`} className="block my-2 text-left text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name={`products[${index}].description`}
                                    id={`Description_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    value={product.description}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Description"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <label htmlFor={`Price_${index}`} className="block my-2 text-left text-sm font-medium text-gray-900">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name={`products[${index}].price`}
                                    id={`Price_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    value={product.price}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Price"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <div className='mt-6 text-center'>
                        <button
                            type="submit"
                            className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                        >
                            Add Supplier
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNewSupplier;
