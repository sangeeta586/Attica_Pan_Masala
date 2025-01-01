import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import ShopInspectionModule from "./ShopInspectionModule";
import Swal from "sweetalert2";
import FEASidebar from "../../../components/Sidebar/FEASidebar";
import GoogleMaps from "./GoogleMaps";

const fieldManager_id = localStorage.getItem("fieldManager_Id");
const userDetails = localStorage.getItem("email");

const ListOfInspection = () => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("shop_name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [inspectionId, setInspectionId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectShop, setSelectShop] = useState(null);
  const [inspectionShop, setInspectionShop] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // Added selectedDate state
  const itemsPerPage = 10;

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchShops = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/inspectionShop/getinspection/shop`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const data = await response.json();
      setShops(data); // Save the shops data
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getTodaysDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
  };

  const filteredAndSortedShops = () => {
    const currentDate = selectedDate || getTodaysDate(); // Use selectedDate or today's date

    const filteredByDate = shops.filter((shop) => {
      const shopDate = new Date(shop.createdAt).toISOString().split("T")[0]; // Get date part only (YYYY-MM-DD)
      return shopDate === currentDate;
    });

    return filteredByDate
      .filter((shop) => {
        const term = searchTerm.toLowerCase();
        const matchesSearchTerm =
          shop.shop_name.toLowerCase().includes(term) ||
          shop.shop_address.toLowerCase().includes(term) ||
          shop.shop_owner_name.toLowerCase().includes(term);
        const matchesStatus = selectedStatus
          ? shop.status === selectedStatus
          : true;

        return matchesSearchTerm && matchesStatus;
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

  const paginatedShops = () => {
    const filteredShops = filteredAndSortedShops();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredShops.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredAndSortedShops().length / itemsPerPage);

  useEffect(() => {
    fetchShops();
  }, []);

  const handleEditButtonClick = (shop) => {
    setSelectShop(shop);
    setEditModal(true);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex w-full">
      <div>
        <FEASidebar />
      </div>
      <div className="flex-1 p-4 bg-gray-100">
        <div className="w-full p-2">
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="z-50 bg-white w-[80%] p-8 rounded-lg shadow-lg">
                <GoogleMaps
                  onClose={() => setShowModal(false)}
                  inspectionId={inspectionId}
                />
              </div>
            </div>
          )}

          {editModal && selectShop && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
                <ShopInspectionModule
                  onClose={() => setEditModal(false)}
                  shopData={selectShop}
                  fetchShops={fetchShops}
                />
              </div>
            </div>
          )}

          <div className="container mx-auto ">
            <header className="bg-blue-300 rounded-md shadow-md p-4 flex justify-between items-center gap-4">
              <h1 className="md:text-lg text-xs lg:text-xl font-bold text-gray-800 pl-12">
                Pending Verification Vendor List
              </h1>
              <div className="flex items-center gap-2">
                <div className="text-sm lg:text-lg font-bold text-white border-4 border-blue-900 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out">
                  {userDetails || "Guest"}
                </div>
              </div>
            </header>

            <div className="bg-[#1e40af] text-black rounded-xl p-4 my-8">
              <div className="flex gap-4 items-center my-4">
                <input
                  type="text"
                  placeholder="Search by Shop Name, Address, or Owner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 border rounded w-full sm:w-1/4"
                />
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="p-2 border rounded w-full sm:w-1/4"
                >
                  <option value="shop_name">Shop Name</option>
                  <option value="shop_address">Address</option>
                  <option value="shop_owner_name">Owner</option>
                </select>
                <select
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value)}
                  className="p-2 border rounded w-full sm:w-1/4"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="p-2 border rounded w-full sm:w-1/4"
                />
              </div>

              <table className="min-w-full text-center">
                <thead>
                  <tr className="bg-[#93c5fd] text-black sm:text-sm">
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Field Executive Details
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Shop Name
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Owner Name
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Contact
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white">
                      Address
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">
                      Status
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">
                      Feedback
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">
                      Photos
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedShops().length > 0 ? (
                    paginatedShops().map((shop) => (
                      <tr
                        key={shop._id}
                        className="bg-gray-200 border-b-2 border-blue-200"
                      >
                        <td className="border border-gray-300 p-4 text-left align-top">
                          <div className="space-y-2">
                            <p className="font-bold text-gray-800 text-lg">
                              {shop?.fieldManagerId?.name}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-blue-500"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M2 6v12h20V6H2zm18 2v4H4V8h16z" />
                              </svg>
                              {shop?.fieldManagerId?.email}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.27 11.72 11.72 0 0 0 3.7.59 1 1 0 0 1 1 1v3.94a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.94a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.7 1 1 0 0 1-.27 1z" />
                              </svg>
                              {shop?.fieldManagerId?.phoneNo}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 py-4">{shop.shop_name}</td>
                        <td className="px-2 py-4">{shop.shop_owner_name}</td>
                        <td className="px-2 py-4">{shop.shop_contact_number}</td>
                        <td className="px-2 py-4">{shop.shop_address}</td>
                        <td className="px-2 py-4">{shop.status}</td>
                        <td className="px-2 py-4">
                          {shop.Feedback_Provided || "No feedback yet"}
                        </td>
                        <td className="px-2 py-4">
                          {shop.Photos_Uploaded ? (
                            <img
                              src={`${BASE_URL}/${shop.Photos_Uploaded}`}
                              alt="Shop"
                              className="w-24 h-16 object-cover image-zoom"
                            />
                          ) : (
                            <span>No photos uploaded</span>
                          )}
                        </td>
                        <td className="px-2 py-4 flex justify-center items-center">
                          <button
                            onClick={() => handleEditButtonClick(shop)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out shadow focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            style={{ fontSize: "0.875rem" }}
                          >
                            Modify Status
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center p-4">
                        No data found for the selected date.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </button>
              </div>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfInspection;
