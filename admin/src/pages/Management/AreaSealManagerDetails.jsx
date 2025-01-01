import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import ManagementSidebar from "./ManagementSidebar";
import RegisterForm from "./Register/RegisterForm";
import ManagementSideBarModal from "./ManagementChart/ManagementSideBarModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import Swal from "sweetalert2";
import { AreaSellManagerRegister } from "./Register/AreaSellManagerRegister";
export const AreaSealManagerDetails = () => {
    const [AreaSellManager, setAreaSellManager] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sortField, setSortField] = useState("username");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query
    const [selectAreaSellManager, setSelectAreaSellManager] = useState();
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchAreaSellManager();
    }, [sortField, sortDirection]);
  
    const fetchAreaSellManager = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/areaSealManger/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch delivery boys");
        }
        const data = await response.json();
        setAreaSellManager(data);
      } catch (error) {
        console.error("Error fetching delivery boys:", error);
      }
    };
  
    const handleRegisterButtonClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const resetHandler = (id) => {
      console.log("Clicked reset for ID:", id);
      localStorage.setItem("userId", id);
      navigate("/resetpasswordAreaSellManager");
    };
  
    // Filter and sort delivery boys based on search query
    const filteredAreaSellManager = AreaSellManager.filter((AreaSellManager) => {
      return (
        AreaSellManager.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        AreaSellManager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        AreaSellManager.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    // Sort filtered data
    const sortedAreaSellManager = filteredAreaSellManager.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  
    // Calculate pagination
    const indexOfLastAreaSellManager = currentPage * itemsPerPage;
    const indexOfFirstAreaSellManager = indexOfLastAreaSellManager - itemsPerPage;
    const currentAreaSellManager = sortedAreaSellManager.slice(indexOfFirstAreaSellManager, indexOfLastAreaSellManager);
  
    const totalPages = Math.ceil(sortedAreaSellManager.length / itemsPerPage);
  
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const handleUpdate = (AreaSellManager) => {
      setSelectAreaSellManager(AreaSellManager);
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
          const response = await fetch(`${BASE_URL}/api/areaSealManger/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            fetchAreaSellManager();
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
    <div>
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
            Area Sell Manager
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
              <AreaSellManagerRegister onClose={handleCloseModal} selectAreaSellManager={selectAreaSellManager} />
            </div>
          </div>
        )}

        <div className="container mx-auto 2xl:ml-0 py-8">
          <div className="lg:h-full bg-[#1e40af] text-black rounded-xl p-4">
            <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 mt-1">
            Area Sell Manager List
            </h2>

            {/* Search Input */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-4 ">
              <input
                type="text"
                placeholder="Search by username, email, or state"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded mr-2"
              />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="p-2 border rounded mr-2"
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

            <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: "600px" }}>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#93c5fd] text-black sm:text-sm">
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Name</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Email</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">State</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Address</th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAreaSellManager.map((AreaSellManager) => (
                    <tr key={AreaSellManager._id} className="bg-gray-200 border-b-2 border-blue-200">
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{AreaSellManager.username}</td>
                      <td className="px-4 py-3 md:text-base text-sm text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-gray-300">
                        <span className="block font-medium text-black">{AreaSellManager.email}</span>
                        <span className="block text-gray-600">{AreaSellManager.phoneNo}</span>
                      </td>

                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{AreaSellManager.state}</td>
                      <td className="px-4 py-3 md:text-base text-sm text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-gray-300">
                        <span className="block">{AreaSellManager.address}</span>
                        <span className="block">{AreaSellManager.city}, {AreaSellManager.pinCode}</span>
                      </td>

                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        <Button onClick={() => handleUpdate(AreaSellManager)} className="bg-blue-500 text-white p-2 rounded">
                          Update
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(AreaSellManager._id)}
                          className="bg-red-500 text-white p-2 rounded ml-2"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => resetHandler(AreaSellManager._id)}
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

            <div className="flex justify-between mt-4">
              <button onClick={handlePrevPage} className="p-2 bg-gray-300 rounded">
                Previous
              </button>
              <span className="self-center">{currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} className="p-2 bg-gray-300 rounded">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
