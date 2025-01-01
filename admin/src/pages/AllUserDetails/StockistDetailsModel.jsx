import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';

const StockistDetailsModel = ({ show, onClose, stockistEmail }) => {
  const [stockist, setstockist] = useState(null);

  useEffect(() => {
    if (stockistEmail) {
      getstockistDetails(stockistEmail);
    }
  }, [stockistEmail]);  // Re-fetch data whenever the email changes

  const getstockistDetails = async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/executives/email`, {
        email: email,
      });
      setstockist(response.data); // Use Axios' data directly
    } catch (error) {
      console.error('Error fetching stockist details:', error);
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
          {stockist ? (
            <>
              <h3 className="text-xl font-semibold">{stockist.username}</h3>
              <p><strong>Email:</strong> {stockist.email}</p>
              <p><strong>Phone:</strong> {stockist.phoneNo}</p>
              <p><strong>Country:</strong> {stockist.country}</p>
              <p><strong>State:</strong> {stockist.state}</p>
              <p><strong>City:</strong> {stockist.city}</p>
              <p><strong>Address:</strong> {stockist.address}</p>
              <p><strong>Warehouse:</strong> {stockist.wareHouseName}</p>
              <p><strong>Pincode:</strong> {stockist.pinCode}</p>

              {/* Super Stockist Details */}
              <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold">Super Stockist Details</h4>
                <p><strong>Name:</strong> {stockist.superstockist.username}</p>
                <p><strong>Email:</strong> {stockist.superstockist.email}</p>
                <p><strong>Phone:</strong> {stockist.superstockist.phoneNo}</p>
                <p><strong>Country:</strong> {stockist.superstockist.country}</p>
                <p><strong>State:</strong> {stockist.superstockist.state}</p>
                <p><strong>City:</strong> {stockist.superstockist.city}</p>
                <p><strong>Address:</strong> {stockist.superstockist.address}</p>
                <p><strong>Warehouse:</strong> {stockist.superstockist.wareHouseName}</p>
                <p><strong>Pincode:</strong> {stockist.superstockist.pinCode}</p>
              </div>
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

export default StockistDetailsModel;
