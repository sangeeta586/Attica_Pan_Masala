import React, { useState, useEffect } from "react";
import GoogleMapComponent from "./GoogleMaps"; // Import your map component
import { BASE_URL } from "../../../constants";

const DeliveryBoysTrack = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [location, setLocation] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  useEffect(() => {
    const fetchAllDeliveryBoys = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`
        );
        if (response.ok) {
          const data = await response.json();
          const loggedInEmail = localStorage.getItem("email");
          const filteredData = data.filter(
            (deliveryBoy) => deliveryBoy.stockistEmailId === loggedInEmail
          );
          setDeliveryBoys(filteredData);
        } else {
          console.error("Failed to fetch delivery boys.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllDeliveryBoys();
  }, []);

  const openModal = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/location/get/${id}`);
      if (response.ok) {
        const data = await response.json();
        setLocation(data.locations || []); // Ensure it's an array
        setSelectedDeliveryBoy(id);
      } else {
        console.error("Failed to fetch location.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setSelectedDeliveryBoy(null);
    setLocation([]);
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter the delivery boys based on search query
  const filteredDeliveryBoys = deliveryBoys.filter(
    (boy) =>
      boy.username.toLowerCase().includes(searchQuery) ||
      boy.email.toLowerCase().includes(searchQuery) ||
      (boy.phoneNo && String(boy.phoneNo).includes(searchQuery)) // Convert phoneNo to string before using .includes()
  );

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current page items
  const currentItems = filteredDeliveryBoys.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-w-full ">
      <div className="flex justify-between mb-6 mx-10 flex-wrap">
        <div className="text-2xl font-bold text-indigo-600">
          Delivery Boy Details
        </div>
        <div>
          <input
            type="search"
            placeholder="Search by Name, Email, or Mobile No..."
            className="p-2 text-lg border-2 border-indigo-600 rounded-lg shadow-md focus:outline-none"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table container with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border border-collapse rounded-lg shadow-xl overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {[
                "No.",
                "Name",
                "Email",
                "Mobile No",
                "Address",
                "State",
                "City",
                "Pincode",
                "Location",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-6 text-lg font-semibold text-center border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="py-3 px-6 text-center border-b">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.username}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.email}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.phoneNo}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.address}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.state}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.city}
                </td>
                <td className="py-3 px-6 text-center border-b">
                  {item.pinCode}
                </td>
                <td
                  className="py-3 px-6 text-center border-b text-blue-500 cursor-pointer hover:underline"
                  onClick={() => openModal(item._id)}
                >
                  View Location
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 mr-4"
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredDeliveryBoys.length}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 ml-4"
        >
          Next
        </button>
      </div>

      {/* Map Modal */}
      {selectedDeliveryBoy && location.length > 0 && (
        <div className="fixed inset-0 left-96 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-[100%] h-[100%] bg-white rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800"
            >
              Close
            </button>
            {/* Google Map */}
            <GoogleMapComponent locations={location} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoysTrack;
