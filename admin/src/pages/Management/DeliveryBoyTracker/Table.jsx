import React, { useState, useEffect } from 'react';
import GoogleMapComponent from './GoogleMaps';
import { BASE_URL } from '../../../constants';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Table = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [filteredDeliveryBoys, setFilteredDeliveryBoys] = useState([]); // State for filtered delivery boys
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [location, setLocation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchAllDeliveryBoys = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`);
        if (response.ok) {
          const data = await response.json();
          setDeliveryBoys(data);
          setFilteredDeliveryBoys(data); // Initialize filtered list with full data
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
        setSelectedDeliveryBoy(id);
        filterLocationsByDate(data.locations);
      } else {
        console.error('Failed to fetch location');
        setLocation([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setLocation([]);
    }
  };

  const filterLocationsByDate = (locations) => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toDateString();
      const filteredLocations = locations.filter((location) => {
        const locationDate = new Date(location.timestamp);
        return locationDate.toDateString() === selectedDateString;
      });
      setLocation(filteredLocations);
    } else {
      setLocation([]);
    }
  };

  const closeModal = () => {
    setLocation([]);
    setSelectedDeliveryBoy(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    // Filter delivery boys based on the search term
    const filtered = deliveryBoys.filter((boy) => {
      const phoneNo = boy?.phoneNo?.toString() || ""; // Ensure phoneNo is a string
      return (
        boy?.username?.toLowerCase().includes(value) ||
        boy?.email?.toLowerCase().includes(value) ||
        phoneNo.includes(value)
      );
    });
  
    setFilteredDeliveryBoys(filtered);
  };
  

  return (
    <div className="flex flex-col md:flex-row w-full lg:ml-20">
      <div className="p-4 rounded-lg shadow-lg overflow-auto border border-purple-900 w-[95%] md:mb-0">
        <div className="text-xl font-bold mb-4 text-[#5443c3]">Delivery Boy Details</div>
        {selectedDeliveryBoy && location.length > 0 && (
        
        <GoogleMapComponent locations={location} onClose={closeModal} className="w-full h-64 md:h-auto" />
      
    )}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, or mobile..."
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Delivery Boy Details</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Address</th>
              <th className="py-2 px-4 border-b bg-[#5443c3] text-white">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveryBoys.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-200">
                {/* Delivery Boy Details */}
                <td className="py-3 px-6 border-b border-gray-200 text-sm text-[#5443c3] font-medium">
                  <p>ID: {item._id}</p>
                  <p>Username: {item.username}</p>
                  <p>Email: {item.email}</p>
                  <p>Phone: {item.phoneNo}</p>
                </td>

                {/* Address Details */}
                <td className="py-3 px-6 border-b border-gray-200 text-sm text-[#5443c3] font-medium">
                  <p>Address: {item.address}</p>
                  <p>State: {item.state}</p>
                  <p>City: {item.city}</p>
                  <p>Pin Code: {item.pinCode}</p>
                </td>

                {/* Actions */}
                <td className="py-3 px-6 border-b border-gray-200 text-center">
                  {/* Clickable link styled as a button */}
                  <p
                    className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                    onClick={() => openModal(item._id)}
                  >
                    Click here
                  </p>

                  {/* Date Picker */}
                  <div className="mt-2">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="yyyy/MM/dd"
                      isClearable
                      placeholderText="Select a date"
                      className="w-full p-2 border rounded-lg text-sm"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

     
    </div>
  );
};

export default Table;
