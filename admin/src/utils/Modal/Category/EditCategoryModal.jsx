import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "../../../Styles/Styles.css";
import { BASE_URL } from '../../../constants';

const EditCategoryModal = ({ isOpen, onClose, categoryId, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (isOpen) {
      fetchCategory();
    }
  }, [isOpen, categoryId]);

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
      const response = await axios.put(`${BASE_URL}/api/category/${categoryId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Category updated successfully');
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="ModalBg rounded-lg w-full max-w-lg mx-auto">
              <div className="p-6">
                <div className="mb-4 text-2xl sm:text-4xl font-bold text-center ">
                  <h3>Edit Category</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block my-2 text-left text-sm font-medium">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm text-black font-bold bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Category Name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block my-2 text-left text-sm font-medium">
                      Status
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        value="active"
                        checked={formData.status === "active"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="active">Active</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="inactive"
                        name="status"
                        value="inactive"
                        checked={formData.status === "inactive"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="inactive">Inactive</label>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center items-center gap-4 sm:gap-10">
                    <button
                      type="submit"
                      className="mt-2 p-2 bg-purple-600 text-white rounded-lg shadow-lg hover:scale-105 ModalBtnRound ModalBtUpdate"
                    >
                      Update Category
                    </button>
                    <button
                      onClick={onClose}
                      type="button"
                      className="mt-2 p-2 bg-red-600 text-white rounded-lg shadow-lg hover:scale-105 ModalBtnRound ModalBtCancle"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditCategoryModal;
