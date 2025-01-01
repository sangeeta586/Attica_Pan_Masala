import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import ShopInspectionModule from "./ShopInspectionModule";
const fieldManager_id = localStorage.getItem("fieldManager_Id");
import Swal from "sweetalert2";
import FEASidebar from "../../../components/Sidebar/FEASidebar";
import GoogleMaps from "./GoogleMaps";


const RejectVendor = () => {
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
  const userDetails = localStorage.getItem("email");

  const itemsPerPage = 10;

  const [zoomedImageId, setZoomedImageId] = useState(null);
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
      const rejectedVendor = data.filter(v => v.status === 'rejected')
      setShops(rejectedVendor);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleLocationModal = (shop) => {
    console.log(shop._id);
    setInspectionId(shop._id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleeditCloseModal = () => {
    setInspectionShop(false);
    setEditModal(false);
  };

  const filteredAndSortedShops = () => {
    return shops
      .filter((shop) => {
        const term = searchTerm.toLowerCase();
        const matchesSearchTerm =
          shop.shop_name.toLowerCase().includes(term) ||
          shop.shop_address.toLowerCase().includes(term) ||
          shop.shop_owner_name.toLowerCase().includes(term);
        const matchesStatus = selectedStatus
          ? shop.shopStatus === selectedStatus
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

 

  const handleDeleteButton = (id) => {
    // Show a confirmation alert before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed to delete the shop
        fetch(`${BASE_URL}/api/inspectionShop/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete shop");
            }
            return response.json();
          })
          .then(() => {
            // Remove the deleted shop from state
            const updatedShops = shops.filter((shop) => shop._id !== id);
            setShops(updatedShops);

            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "The shop has been deleted.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.error("Error deleting shop:", error);

            // Show error message
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the shop.",
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
          });
      }
    });
  };







  return (
    <div className="min-h-screen bg-blue-100 flex w-full">
      <div>
        <FEASidebar />
      </div>
      <div className="flex-1 p-4 bg-gray-100">
        <div className="w-full  p-2">
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="z-50 bg-white w-[80%] p-8 rounded-lg shadow-lg">
                <GoogleMaps
                  onClose={handleCloseModal}
                  inspectionId={inspectionId}
                />
              </div>
            </div>
          )}

         
          <div className="container mx-auto ">
          <header className="bg-blue-300 rounded-md shadow-md p-4 flex justify-between items-center gap-4">
                    <h1 className="md:text-lg text-xs lg:text-xl font-bold text-gray-800 pl-12"> Rejected vendor list</h1>
                    <div className="flex items-center gap-2">

                        <div className="text-sm lg:text-lg font-bold text-white border-4 border-blue-900 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out">
                            {userDetails || "Guest"}
                        </div>
                    </div>
                </header>
            <div className="bg-[#1e40af] text-black rounded-xl p-4 my-8  ">
             

              {inspectionShop && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
                    <ShopInspectionModule
                      onClose={handleeditCloseModal}
                      fetchShops={fetchShops}
                    />
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-4">
                <input
                  type="text"
                  placeholder="Search by Shop Name, Address, or Owner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 border rounded"
                />
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="shop_name">Shop Name</option>
                  <option value="shop_address">Address</option>
                  <option value="shop_owner_name">Owner</option>
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
              <div
                className="overflow-x-auto overflow-y-auto"

              >
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
                      <th className="px-2 py-4 md:text-lg  text-xs text-left">
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
                    {paginatedShops().map((shop) => (
                      <tr
                        key={shop._id}
                        className="bg-gray-200 border-b-2 border-blue-200"
                      >  <td className="border border-gray-300 p-4 text-left align-top">
                          <div className="space-y-2">
                            <p className="font-bold text-gray-800 text-lg">{shop?.fieldManagerId?.name}</p>
                            <p className="text-gray-600 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M2 6v12h20V6H2zm18 2v4H4V8h16z" />
                              </svg>
                              {shop?.fieldManagerId?.email}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.27 11.72 11.72 0 0 0 3.7.59 1 1 0 0 1 1 1v3.94a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.94a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.7 1 1 0 0 1-.27 1z" />
                              </svg>
                              {shop?.fieldManagerId?.phoneNo}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 py-4">{shop.shop_name}</td>
                        <td className="px-2 py-4">{shop.shop_owner_name}</td>
                        <td className="px-2 py-4">
                          {shop.shop_contact_number}
                        </td>
                        <td className="px-2 py-4">{shop.shop_address}</td>
                        <td className="px-2 py-4 text-red-600">{shop.status}</td>

                        <td className="px-2 py-4">
                          {shop.Feedback_Provided || "No feedback yet"}
                        </td>
                        <td className="px-2 py-4">
                          {shop.Photos_Uploaded ? (
                            <img
                              src={`${BASE_URL}/${shop.Photos_Uploaded}`}
                              alt="Shop"
                              className="w-24 h-16 object-cover image-zoom" // Add zoom class
                            />
                          ) : (
                            <span>No photos uploaded</span>
                          )}
                        </td>



                        <td className="px-2 py-4 flex justify-center items-center content-center flex-wrap gap-2">
                          
                          <button
                            onClick={() => handleDeleteButton(shop._id)}
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out shadow flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                            style={{ fontSize: "0.875rem" }} // Smaller font size
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleLocationModal(shop)}
                            className="bg-blue-500 px-2 py-1 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
                            style={{ fontSize: "0.875rem" }} // Smaller font size
                          >
                            Location
                          </button>
                        </td>


                        <td>

                        </td>
                      </tr>
                    ))}
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
    </div>
  );
};

export default RejectVendor
