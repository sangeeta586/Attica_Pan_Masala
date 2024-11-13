import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';

const EditProduct = ({ isOpen, onClose, productId, onUpdate }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    units: '',
    price: '',
    status: 'active',
    variants: [
      {
        name: '',
        description: '',
        units: '',
        price: '',
        status: 'active',
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (isOpen) {
      fetchProduct();
    }
  }, [isOpen, productId]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setFormData({
        ...formData,
        [name]: value === 'active' ? 'active' : 'inactive',
      });
    } else if (name.includes('variant')) {
      const updatedVariants = [...formData.variants];
      const variantIndex = parseInt(name.split('-')[1]);
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        [name.split('-')[0]]: value,
      };
      setFormData({
        ...formData,
        variants: updatedVariants,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${BASE_URL}/api/product/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Product updated successfully');
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-200 rounded-lg w-full max-w-2xl overflow-hidden">
          <div className="pt-6 mb-4 text-4xl font-bold text-center text-gray-900">
            <h3>Edit Product</h3>
          </div>
          <div className=" rounded-lg py-5 px-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <div className="w-1/2 pr-2">
                  <label htmlFor="item_name" className="block my-2 text-left text-sm font-medium text-gray-900">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="item_name"
                    id="item_name"
                    value={formData.item_name}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Product Name"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
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
                    placeholder="Enter Description"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-1/2 pr-2">
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
                    placeholder="Enter Units"
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
                    placeholder="Enter Price"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-1/2 pr-2">
                  <label htmlFor="status" className="block my-2 text-left text-sm font-medium text-gray-900">
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-lg mb-2">Variants</h4>
                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex flex-row">
                    <div className="w-1/3 pr-2">
                      <label
                        htmlFor={`variantName-${index}`}
                        className="block my-2 text-left text-sm font-medium text-gray-900"
                      >
                        Variant Name
                      </label>
                      <input
                        type="text"
                        name={`variantName-${index}`}
                        id={`variantName-${index}`}
                        value={variant.name}
                        onChange={(e) => handleChange(e, index)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter Variant Name"
                      />
                    </div>

                    <div className="w-1/3 pr-2">
                      <label
                        htmlFor={`variantDescription-${index}`}
                        className="block my-2 text-left text-sm font-medium text-gray-900"
                      >
                        Variant Description
                      </label>
                      <input
                        type="text"
                        name={`variantDescription-${index}`}
                        id={`variantDescription-${index}`}
                        value={variant.description}
                        onChange={(e) => handleChange(e, index)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter Variant Description"
                      />
                    </div>

                    <div className="w-1/3 pl-2">
                      <label
                        htmlFor={`variantPrice-${index}`}
                        className="block my-2 text-left text-sm font-medium text-gray-900"
                      >
                        Variant Price
                      </label>
                      <input
                        type="number"
                        name={`variantPrice-${index}`}
                        id={`variantPrice-${index}`}
                        value={variant.price}
                        onChange={(e) => handleChange(e, index)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter Variant Price"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="submit"
                  className="p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
                >
                  Update Product
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
    </>
  );
};

export default EditProduct;
