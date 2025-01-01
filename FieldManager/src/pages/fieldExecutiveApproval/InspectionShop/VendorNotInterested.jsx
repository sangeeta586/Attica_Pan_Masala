import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FEASidebar from '../../../components/Sidebar/FEASidebar';
import Swal from 'sweetalert2';

const VendorNotInterested = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  // State for data, search query, and pagination
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(17);
  const userDetails = localStorage.getItem("email");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/vendornotIntrested/`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmResult.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/vendornotIntrested/${id}`);
        Swal.fire('Deleted!', 'The vendor has been removed.', 'success');
        fetchData(); // Refresh the data after deletion
      }
    } catch (error) {
      Swal.fire('Error!', 'There was an issue deleting the vendor.', 'error');
    }
  };


  // Filtered data based on the search query
  const filteredData = data.filter(
    (item) =>
      item.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactNumber.includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-blue-300 flex w-full font-sans">
      <div>
        <FEASidebar />
      </div>
      <div className="flex-1 bg-gray-100 p-8">
        <header className="bg-blue-300 rounded-md shadow-md p-4 flex justify-between items-center gap-4">
          <h1 className="md:text-lg text-xs lg:text-xl font-bold text-gray-800 pl-12">Not Interested Vendors List</h1>
          <div className="flex items-center gap-2">
            <div className="text-sm lg:text-lg font-bold text-white border-4 border-blue-900 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out">
              {userDetails || "Guest"}
            </div>
          </div>
        </header>
        <div className="overflow-x-auto bg-[#1E40AF] my-8 p-6 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search by Shop Name, Owner Name, or Contact Number"
            className="border rounded p-2 w-full mb-4"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {/* Data Table */}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#1e87ff] text-white rounded-md p-4">
                <th className="border border-gray-300 px-4 py-2">Shop Name</th>
                <th className="border border-gray-300 px-4 py-2">Owner Name</th>
                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                <th className="border border-gray-300 px-4 py-2">Reason</th>
                <th className="border border-gray-300 px-4 py-2">Other Reason</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100 bg-white">
                  <td className="border border-gray-300 px-4 py-2">{item.shopName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.ownerName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.contactNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.reasonForNotRegistering}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.otherReasonDetails || 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <a
                      href={`https://wa.me/${item.contactNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${item.contactNumber}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Call
                    </a>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 mx-1 border rounded ${
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorNotInterested;
