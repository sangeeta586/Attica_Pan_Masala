import React, { useState, useEffect } from "react";
import RegisterFieldManager from "./RegisterOrEditFieldManager";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import Swal from "sweetalert2";
import FEASidebar from "../../../components/Sidebar/FEASidebar";

const ListOfRegisterdField = () => {
  const [filedManagers, setFiledManagers] = useState([]);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name"); // Fixed to match backend field
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedFieldManager, setSelectedFieldManager] = useState(null);
  const email = localStorage.getItem("email");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFiledManagers();
  }, []);

  const fetchFiledManagers = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/fieldManager/getFieldManager`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filedManagers");
      }
      const data = await response.json();
      const FieldManagers = data.filter((manager) => manager.role === "FieldManager");
      setFiledManagers(FieldManagers);
    } catch (error) {
      console.error("Error fetching filedManagers:", error);
    }
  };

  const handleEditButtonClick = (id) => {
    setSelectedFieldManager(id);
    setShowModal(true);
  };

  const handleDeleteButtonClick = async (selectedFieldManager) => {
    try {
      // Ask for confirmation before proceeding with delete
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This action cannot be undone.",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "custom-confirm-button", // Custom class for confirm button
          cancelButton: "custom-cancel-button",   // Custom class for cancel button
        },
        buttonsStyling: false, // Prevent default button styling
      });
  
      if (result.isConfirmed) {
        // Proceed with delete if confirmed
        const response = await fetch(
          `${BASE_URL}/api/fieldManager/getFieldManager/delete/${selectedFieldManager}`,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Delete Successful!",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "custom-success-button", // Custom class for success button
            },
          }).then(() => {
            fetchFiledManagers();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Something went wrong.",
            confirmButtonText: "Try Again",
            customClass: {
              confirmButton: "custom-error-button", // Custom class for error button
            },
          });
        }
      }
    } catch (error) {
      console.error("Error deleting field manager:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Please try again later.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "custom-error-button", // Custom class for error button
        },
      });
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredAndSortedFiledManagers = () => {
    return filedManagers
      .filter((filedManager) => {
        const term = searchTerm.toLowerCase();

        // Matching search term against name, address, or email
        const matchesSearchTerm =
          filedManager.name.toLowerCase().includes(term) ||
          filedManager.address.toLowerCase().includes(term) ||
          filedManager.email.toLowerCase().includes(term);

        // Matching status filter
        const matchesStatus = selectedStatus
          ? filedManager.status === selectedStatus
          : true;

        // Matching state filter
        const matchesState = selectedState
          ? filedManager.state === selectedState
          : true;

        // Return true if all filters match
        return matchesSearchTerm && matchesStatus && matchesState;
      })
      .sort((a, b) => {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();
        if (sortDirection === "asc") {
          return aValue < bValue ? -1 : 1;
        }
        return aValue > bValue ? -1 : 1;
      });
  };

  const paginatedFiledManagers = () => {
    const filteredManagers = filteredAndSortedFiledManagers();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredManagers.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    filteredAndSortedFiledManagers().length / itemsPerPage
  );

  const handleRegisterButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex w-full">
      {/* Sidebar */}
      <div>
        <FEASidebar />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
            <RegisterFieldManager
              selectedFieldManager={selectedFieldManager}
              onClose={handleCloseModal}
              fetchFiledManagers={fetchFiledManagers}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className=" lg:p-5 md:p-5 p-4  w-full">
        <header className="bg-[#93c5fd] rounded-md shadow p-4 flex justify-between items-center ">
          <h1 className="llg:text-xl md:text-base text-xs font-bold text-gray-800 pl-12">
            Field Executive Approval 
          </h1>
          <div className="lg:text-2xl md:text-xl text-xs text-white font-bold border-4 border-[#1e40af] p-2 rounded-lg bg-[rgb(42,108,194)] hover:bg-blue-800 transition-colors duration-300 ease-in-out mr-4">
            {email}
          </div>
        </header>

        <div className=" py-8 w-full">
          <div className="bg-[#1e40af] text-black rounded-xl p-4 w-full">
            <div className="flex justify-between items-center content-center">
              <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 mt-1">
                Field Executive
              </h2>
              <button
                onClick={handleRegisterButtonClick}
                className="lg:mr-12 lg:-ml-2 md:mr-8 mr-2 2xl:text-2xl xl:text-xl md:text-lg text-sm 
             bg-[#e0e7fc] hover:bg-blue-500 hover:text-white text-blue-600 
             font-semibold p-4 rounded-md shadow-md transition-transform 
             duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Register
              </button>

            </div>
            <div className=" grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4 my-4 ">
              <input
                type="text"
                placeholder="Search by Name, Address, or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded"
              />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="name">Name</option>
                <option value="address">Address</option>
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
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                id="state"
                name="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select your state
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              {/* Add other states */}

              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div
              className="overflow-x-auto overflow-y-auto"
              style={{ maxHeight: "600px" }}
            >
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#93c5fd] text-black sm:text-sm rounded-md">
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Name
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Email
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Phone
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Status
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                     Address
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFiledManagers().map((filedManager) => (
                    <tr key={filedManager._id} className="bg-white rounded-lg">
                      <td className="px-2 py-4 md:text-lg text-xs text-left">
                        {filedManager.name}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left">
                        {filedManager.email}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left">
                        {filedManager.phoneNo}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left">
                        {filedManager.status}
                      </td>
                      <td className="px-4 py-6 text-left  md:text-lg text-sm">
                        <div className="space-y-1">
                          <p className="font-semibold">{filedManager.state}</p>
                          <p className="">{filedManager.address}</p>
                          <p className="">{filedManager.city}</p>
                          <p className="">{filedManager.pincode}</p>
                        </div>
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left flex gap-4">
                        <button
                          onClick={() => handleEditButtonClick(filedManager._id)}
                          className="flex items-center text-blue-500 hover:text-blue-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-110"
                        >
                          <FaRegEdit size={20} />
                          <span className="ml-1 hidden md:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteButtonClick(filedManager._id)}
                          className="flex items-center text-red-500 hover:text-red-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-110"
                        >
                          <MdAutoDelete size={20} />
                          <span className="ml-1 hidden md:inline">Delete</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center my-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
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

export default ListOfRegisterdField;
