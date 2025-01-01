import React, { useState, useEffect } from 'react';
import GoogleMapComponent from './GoogleMaps';
import { BASE_URL } from '../../../constants';

const Table = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fetchAllDeliveryBoys = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`);
        if (response.ok) {
          const data = await response.json();
          setDeliveryBoys(data);
        } else {
          console.error('Failed to fetch AllDeliveryBoys');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAllDeliveryBoys();
  }, []);

  const openModal = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/location/get/${id}`);
      if (response.ok) {
        const data = await response.json();
        setLocation(data.locations || []); // Ensure it is an array
        setSelectedDeliveryBoy(id); // Set the selected delivery boy ID
      } else {
        console.error('Failed to fetch location');
        setLocation([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setLocation([]);
    }
  };

  const closeModal = () => {
    setLocation([]); // Clear the location to close the map
    setSelectedDeliveryBoy(null); // Clear the selected delivery boy
  };

  return (
    <div className='flex flex-col md:flex-row w-full lg:ml-20 '>
      <div className="p-4 rounded-lg shadow-lg overflow-auto border border-purple-900 w-full md:w-1/2 mb-4 md:mb-0">
        <div className="text-xl font-bold mb-4 text-[#5443c3]">Delivery Boy Details</div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Delivery Boy Id</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Name</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Email</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Mobile No</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Address</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">State</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">City</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Pincode</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Location</th>
            </tr>
          </thead>
          <tbody>
            {deliveryBoys.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item._id}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.username}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.email}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.phoneNo}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.address}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.state}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.city}</td>
                <td className="py-2 px-4 border-b text-[#5443c3]">{item.pinCode}</td>
                <td
                  className="py-2 px-4 border-b text-decoration-line: underline"
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => openModal(item._id)}
                >
                  Click here
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedDeliveryBoy && location.length > 0 && (
        <div className="w-full md:w-1/2 md:ml-4">
          <GoogleMapComponent locations={location} onClose={closeModal} className="w-full h-64 md:h-auto" />
        </div>
      )}
    </div>
  );
};

export default Table;