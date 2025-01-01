import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const PanShowDetailsModel = ({ show, onClose, panShowId }) => {
  const [panShowDetails, setPanShowDetails] = useState(null);

  console.log(panShowId)

  const location = useLocation();

  useEffect(() => {
    if (panShowId) {
      getPanShowDetails(panShowId);
    }
  }, [panShowId]);

  const getPanShowDetails = async (panShowId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/panShopOwner/${panShowId._id}`);
      setPanShowDetails(response.data);
    } catch (error) {
      console.error('Error fetching pan show details:', error);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-modal');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;  // Replace page with the modal content
    window.print();  // Trigger the print dialog
    document.body.innerHTML = originalContents;  // Restore the original page after printing
    window.location.reload(); // Reload the page to re-attach the event handlers (if necessary)
  };

 

  if (!show) return null; // Don't show the modal if 'show' is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div id="print-modal" className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>

        <div className="space-y-4">
          {panShowDetails ? (
            <>
              <h3 className="text-xl font-semibold">{panShowDetails.owner.panShopOwner}</h3>
              <p><strong>Email:</strong> {panShowDetails.owner.email || 'Not available'}</p>
              <p><strong>Phone:</strong> {panShowDetails.owner.phoneNumber}</p>
              <p><strong>Country:</strong> {panShowDetails.owner.country || 'Not provided'}</p>
              <p><strong>State:</strong> {panShowDetails.owner.state}</p>
              <p><strong>City:</strong> {panShowDetails.owner.city}</p>
              <p><strong>District:</strong> {panShowDetails.owner.district}</p>
              <p><strong>Address:</strong> {panShowDetails.owner.address}</p>
              <p><strong>Pincode:</strong> {panShowDetails.owner.pinCode}</p>
              <p><strong>Latitude:</strong> {panShowDetails.owner.latitude}</p>
              <p><strong>Longitude:</strong> {panShowDetails.owner.longitude}</p>

               

              {panShowDetails.qrCodeBase64 && location.pathname === "/trackerOrder/management" && (
                <div>
                  <h4 className="text-lg font-medium">QR Code</h4>
                  <img src={`data:image/png;base64,${panShowDetails.qrCodeBase64}`} alt="QR Code" />
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-4">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
            >
              Print
            </button>
           
          </div>
        </div>

        {/* Close Button */}
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

export default PanShowDetailsModel;
