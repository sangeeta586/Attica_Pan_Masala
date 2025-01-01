import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import ManagementSidebar from './ManagementSidebar';
import SuperstockistRegister from './Register/SuperstockistRegister';
import ManagementSideBarModal from './ManagementChart/ManagementSideBarModal';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import Swal from "sweetalert2";

const SuperStockistDetails = () => {
  const [superStockists, setSuperStockists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const [selectedSuperstockist, setSelectedSuperstockist] = useState();

  // Search state variables
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchSuperStockists();
  }, []);

  const fetchSuperStockists = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/superstockist/getAllUser`);
      if (!response.ok) {
        throw new Error('Failed to fetch super stockists');
      }
      const data = await response.json();
      setSuperStockists(data);
    } catch (error) {
      console.error('Error fetching super stockists:', error);
    }
  };

  const handleRegisterButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const resetHandler = (id) => {
    localStorage.setItem('superstockistId', id);
    navigate('/resetpasswordsuperstockist');
  };

  const sortByColumn = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedStockists = [...superStockists].sort((a, b) => {
      if (direction === 'asc') {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
    setSuperStockists(sortedStockists);
  };

  // Filter based on search input
  const filteredStockists = superStockists.filter((stockist) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      stockist.username.toLowerCase().includes(lowerCaseTerm) ||
      stockist.state.toLowerCase().includes(lowerCaseTerm) ||
      stockist.email.toLowerCase().includes(lowerCaseTerm)
    );
  });

  const indexOfLastStockist = currentPage * itemsPerPage;
  const indexOfFirstStockist = indexOfLastStockist - itemsPerPage;
  const currentStockists = filteredStockists.slice(indexOfFirstStockist, indexOfLastStockist);
  const totalPages = Math.ceil(filteredStockists.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-blue-500 rounded`}
        >
          {i}
        </button>
      );
    }
    return <div className="flex justify-center mt-4">{pageNumbers}</div>;
  };

  const handleUpdate = (deliveryBoy) => {
    setSelectedSuperstockist(deliveryBoy);
    setShowModal(true);
  };


  const handleDeleteClick = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      buttonsStyling: false, // Disable SweetAlert2 default button styling
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded-md mx-2", // Add margin to the button
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded-md mx-2" // Add margin to the button
      }
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${BASE_URL}/api/qrGeneraterBoy/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchDeliveryBoys();
          Swal.fire("Deleted!", "Delivery Boy has been deleted.", "success");
        } else {
          throw new Error("Failed to delete delivery boy");
        }
      } catch (error) {
        console.error("Error deleting delivery boy:", error);
        Swal.fire("Error", "Could not delete delivery boy", "error");
      }
    }
  };

  return (
    <div className="flex gap-6 bg-[#dbeafe] w-full">
      <div className="h-screen md:block lg:block hidden">
        <ManagementSidebar />
      </div>

      <div className="lg:ml-80 md:ml-40 font-serif w-full lg:p-10 md:p-5 p-4">
        <div className="flex items-center flex-wrap lg:justify-end md:justify-end justify-center lg:gap-10 md:gap-5 gap-1 lg:h-28 h-16 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2">
          <div className="lg:hidden md:hidden block">
            <ManagementSideBarModal />
          </div>
          <p className="lg:text-2xl md:text-xl text-xs font-bold border-4 border-[#1e40af] p-2 rounded-lg bg-[#dbeafe]">
            Super Stockist
          </p>
          <Button
            color="blue"
            onClick={handleRegisterButtonClick}
            className="lg:mr-12 lg:-ml-2 md:mr-8 mr-2 lg:text-md md:text-md text-xs bg-[#1e40af]"
          >
            Register
          </Button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
              <SuperstockistRegister onClose={handleCloseModal} selectSuperStockist={selectedSuperstockist} />
            </div>
          </div>
        )}

        <div className="container mx-auto 2xl:ml-0 py-8">
          <div className="lg:h-full bg-[#1e40af] text-black rounded-xl p-4">
            <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 mt-1">
              Super Stockist List
            </h2>

            {/* Unified Search Input */}
            <div className="flex gap-4 my-4">
              <input
                type="text"
                placeholder="Search by Username, State, or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '600px' }}>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#93c5fd] text-black sm:text-sm">
                    <th
                      onClick={() => sortByColumn('username')}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Name
                    </th>

                    <th
                      onClick={() => sortByColumn('address')}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Address
                    </th>
                    <th
                      onClick={() => sortByColumn('wareHouseName')}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Warehouse Name
                    </th>

                    <th className="px-2 py-4 md:text-lg text-xs text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStockists.map((superStockist) => (
                    <tr key={superStockist._id} className="bg-gray-200 border-b-2 border-blue-200">
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap border-r-2 border-white">
                        <div className=" px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white" >
                          <p className="truncate">{superStockist.username}</p>
                          <p className="truncate text-gray-500">{superStockist.email}</p>
                          <p className="truncate text-gray-500">{superStockist.phoneNo}</p>
                        </div>
                      </td>


                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        <div className="flex flex-col">
                          <span className="truncate">{superStockist.address}</span>
                          <span className="truncate text-gray-500">{superStockist.city}, {superStockist.state} - {superStockist.pinCode}</span>
                        </div>
                      </td>

                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{superStockist.wareHouseName}</td>

                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        <Button onClick={() => handleUpdate(superStockist)} className="bg-blue-500 text-white p-2 rounded">
                          Update
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(superStockist._id)}
                          className="bg-red-500 text-white p-2 rounded ml-2"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => resetHandler(superStockist._id)}
                          className="bg-orange-500 text-white p-2 rounded ml-2"
                        >
                          Reset Password
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default SuperStockistDetails;
