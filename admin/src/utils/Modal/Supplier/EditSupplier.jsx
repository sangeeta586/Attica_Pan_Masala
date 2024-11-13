import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { BASE_URL } from '../../../constants';

function EditSupplier({ isOpen, supplierId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({       
    name: "",
    address: "",
    products: [{ name: '', description: '', price: '' }],       
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/supplier/${supplierId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching Supplier:", error);
        toast.error("Failed to fetch supplier details");
      }
    };

    if (isOpen) {
      fetchSupplier();
    }
  }, [isOpen, supplierId]);

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
      const response = await axios.put(`${BASE_URL}/api/supplier/${supplierId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        onUpdate(response.data);
        toast.success('Supplier updated successfully');
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      toast.error("Failed to update supplier");
    }
  };

  const handleCancel = () => {
    onClose(); // Close the EditSupplier modal
  };

  return (
    <>
      <ToastContainer position="top-center" />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative z-60 max-w-2xl w-full">
            <div className="p-6">
              <h3 className="text-2xl font-bold flex items-center justify-center mb-4">Edit Supplier</h3>
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="flex flex-row">
                  <div className="w-1/2 pr-2">
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
                  <div className="w-1/2 pl-2">
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
                  <ProductFields
                    key={index}
                    index={index}
                    product={product}
                    handleChange={handleChange}
                    handleDelete={() => handleDeleteProduct(index)}
                  />
                ))}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="flex items-center text-white rounded-lg bg-green-500 hover:bg-green-600 px-3 py-1"
                  >
                    <span className="mr-2">Add Product</span>
                    <FaPlus />
                  </button>
                </div>
                <div className='mt-6 flex justify-between'>
                  <button
                    type="submit"
                    className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                  >
                    Update Supplier
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
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

const ProductFields = ({ index, product, handleChange, handleDelete }) => (
  <div key={index} className="flex flex-row items-center mt-4 overflow-x-auto">
    <div className="flex-grow pr-2">
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
    </div>
    <div className="flex-grow pl-2 pr-2">
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
    <div className="flex-grow pl-2 pr-2">
      <label htmlFor={`Price_${index}`} className="block my-2 text-left text-sm font-medium text-gray-900">
        Price
      </label>
      <div className="flex items-center">
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
        <button
          type="button"
          onClick={handleDelete}
          className="ml-2 text-red-600 hover:text-red-700 focus:outline-none"
        >
          <FaMinus />
        </button>
      </div>
    </div>
  </div>
);

export default EditSupplier;
