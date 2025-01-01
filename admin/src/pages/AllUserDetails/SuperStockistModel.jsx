import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';

const SuperStockistModel = ({ show, onClose, superStockistEmail }) => {
  const [superstockist, setSuperStockist] = useState(null);

  useEffect(() => {
    if (superStockistEmail) {
      getSuperStockistDetails(superStockistEmail);
    }
  }, [superStockistEmail]);  // Re-fetch data whenever the email changes

  const getSuperStockistDetails = async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/superstockist/`, {
        email: email,
      });
      setSuperStockist(response.data); // Use Axios' data directly
    } catch (error) {
      console.error('Error fetching super stockist details:', error);
    }
  };

  if (!show) return null; // Don't show the modal if 'show' is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>

        <div className="space-y-4">
          {superstockist ? (
            <>
              <h3 className="text-xl font-semibold">{superstockist.username}</h3>
              <p><strong>Email:</strong> {superstockist.email}</p>
              <p><strong>Phone:</strong> {superstockist.phoneNo}</p>
              <p><strong>Country:</strong> {superstockist.country}</p>
              <p><strong>State:</strong> {superstockist.state}</p>
              <p><strong>City:</strong> {superstockist.city}</p>
              <p><strong>Address:</strong> {superstockist.address}</p>
              <p><strong>Warehouse:</strong> {superstockist.wareHouseName}</p>
              <p><strong>Pincode:</strong> {superstockist.pinCode}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperStockistModel;
