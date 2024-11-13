import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import ManagementSidebar from './ManagementSidebar';
import StockistRegister from './Register/StockistRegister';
import ManagementSideBarModal from "./ManagementChart/ManagementSideBarModal";
import { BASE_URL } from '../../constants';

const StockistDetails = () => {
  const [stockists, setStockists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('username');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this for different pagination sizes

  useEffect(() => {
    fetchStockists();
  }, []);

  const fetchStockists = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/executives/getAlluser`);
      if (!response.ok) {
        throw new Error('Failed to fetch stockists');
      }
      const data = await response.json();
      setStockists(data);
    } catch (error) {
      console.error('Error fetching stockists:', error);
    }
  };

  const handleRegisterButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredAndSortedStockists = () => {
    return stockists
      .filter(stockist => {
        const term = searchTerm.toLowerCase();
        return (
          stockist.username.toLowerCase().includes(term) ||
          stockist.state.toLowerCase().includes(term) ||
          stockist.email.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        }
        return aValue > bValue ? -1 : 1;
      });
  };

  // Pagination logic
  const paginatedStockists = () => {
    const filteredStockists = filteredAndSortedStockists();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStockists.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedStockists().length / itemsPerPage);

  return (
    <div className="flex gap-6 bg-[#dbeafe] w-full">
      <div className="h-screen md:block lg:block hidden">
        <ManagementSidebar />
      </div>
      
      <div className="lg:ml-80 md:ml-40 font-serif w-full lg:p-10 md:p-5 p-4">
        <div className="flex items-center flex-wrap lg:justify-end md:justify-end justify-center lg:gap-10 md:gap-5 gap-1 lg:h-28 h-16 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2">
          <p className="lg:text-2xl md:text-xl text-xs font-bold border-4 border-[#1e40af] p-2 rounded-lg bg-[#dbeafe]">
            Stockist
          </p>
          <Button
            color="blue"
            onClick={handleRegisterButtonClick}
            className="lg:mr-12 lg:-ml-2 md:mr-8 mr-2 lg:text-md md:text-md text-xs bg-[#1e40af]"
          >
            Register
          </Button>
          <div className="lg:hidden md:hidden block">
            <ManagementSideBarModal />
          </div>
        </div>
        
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
              <StockistRegister onClose={handleCloseModal} />
            </div>
          </div>
        )}
        
        <div className="container mx-auto py-8">
          <div className="bg-[#1e40af] text-black rounded-xl p-4">
            <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 mt-1">Stockist List</h2>
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-4 ">
              <input
                type="text"
                placeholder="Search by Username, State, or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded"
              />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="username">Username</option>
                <option value="state">State</option>
                <option value="email">Email</option>
              </select>
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '600px' }}>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#93c5fd] text-black sm:text-sm">
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Name</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Email</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">State</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Address</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">PinCode</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStockists().map((stockist) => (
                    <tr key={stockist._id} className="bg-gray-200 border-b-2 border-blue-200">
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{stockist.username}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{stockist.email}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{stockist.state}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{stockist.address}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis">{stockist.pinCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            
          </div>
        </div>
        <div className="flex justify-between items-center gap-10 my-4 ">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-900"
              >
                Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-900"
              >
                Next
              </button>
            </div>
      </div>
    </div>
  );
};

export default StockistDetails;
