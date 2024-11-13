import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { ManagementRegister } from './ManagementRegister';
import { BASE_URL } from "../../../src/constants";
import { AdminSideBar } from './AdminSidebar';

export const ManagementDetails = () => {
  const [superStockists, setSuperStockists] = useState([]);
  const [filteredStockists, setFilteredStockists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSuperStockist, setSelectedSuperStockist] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this to adjust items per page
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchManagementDetails();
  }, []);

  useEffect(() => {
    const filtered = superStockists
      .filter(stockist =>
        stockist.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stockist.email.toLowerCase().includes(searchTerm.toLowerCase())
      );     
    setFilteredStockists(filtered);
    setCurrentPage(1); // Reset to the first page when search term changes
  }, [searchTerm, superStockists]);

  const fetchManagementDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/administrators/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch super stockists');
      }
      const data = await response.json();
      // Sort by latest createdAt (descending order)
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setSuperStockists(sortedData);
      setFilteredStockists(sortedData); // Set filtered stockists initially to all stockists
    } catch (error) {
      setError(error.message);
      console.error('Error fetching super stockists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterButtonClick = () => {
    setSelectedSuperStockist(null);
    setShowModal(true);
  };

  const handleEditButtonClick = (superStockist) => {
    setSelectedSuperStockist(superStockist);
    setShowModal(true);
  };

  const handleDeleteButtonClick = async (id) => {
    // Show confirmation using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${BASE_URL}/api/administrators/delete/${id}`, { method: 'DELETE' });
          if (!response.ok) {
            throw new Error('Failed to delete super stockist');
          }
          fetchManagementDetails();
          Swal.fire(
            'Deleted!',
            'The super stockist has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting super stockist:', error);
        }
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStockists = filteredStockists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStockists.length / itemsPerPage);

  return (
    <div className="flex bg-[#DBEAFE]">
      <div className="lg:w-[15%]">
        <AdminSideBar/>
      </div>
      <div className="flex gap-6 w-full">
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true"></div>
            <div className="z-50">
              <ManagementRegister onClose={handleCloseModal} initialData={selectedSuperStockist} fetchManagementDetails={fetchManagementDetails} />
            </div>
          </div>
        )}

        <div className="container mx-auto 2xl:ml-0 py-8">
          <div className="h-screen bg-[#1e40af] text-black rounded-xl p-4">
            <div className='lg:flex md:flex block justify-between flex-wrap content-center items-center gap-4  w-full'>
              <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 my-2">
                Management Details
              </h2>
              
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg my-2"
                onClick={handleRegisterButtonClick}
              >
                Register New Management
              </button>
            </div>
            <div className='my-2'>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              </div>
            {loading ? (
              <div className="flex justify-center items-center">
                <p className="text-white">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '600px' }}>
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#93c5fd] text-black sm:text-sm">
                      <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Name</th>
                      <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Email</th>
                      <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStockists.map((superStockist) => (
                      <tr key={superStockist._id} className="bg-gray-200 border-b-2 border-blue-200">
                        <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                          {superStockist.username}
                        </td>
                        <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                          {superStockist.email}
                        </td>
                        <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis text-white">
                          <button onClick={() => handleEditButtonClick(superStockist)} className="mr-2 text-blue- bg-blue-600 px-4 py-2 rounded-md">Update</button>
                          <button onClick={() => handleDeleteButtonClick(superStockist._id)} className="mr-2 text-blue- bg-red-600 px-4 py-2 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pagination Controls */}
            <div className="flex justify-between gap-10 items-center absolute bottom-0">
              <button
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-white">Page {currentPage} of {totalPages}</span>
              <button
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
