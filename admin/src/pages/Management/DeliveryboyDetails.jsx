import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import ManagementSidebar from "./ManagementSidebar";
import RegisterForm from "./Register/RegisterForm";
import ManagementSideBarModal from "./ManagementChart/ManagementSideBarModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

const DeliveryboyDetails = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveryBoys();
  }, [sortField, sortDirection]);

  const fetchDeliveryBoys = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch delivery boys");
      }
      const data = await response.json();
      setDeliveryBoys(data);
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
    navigate("/resetpassworddeliveryboy");
  };

  // Filter and sort delivery boys based on search query
  const filteredDeliveryBoys = deliveryBoys.filter((deliveryBoy) => {
    return (
      deliveryBoy.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deliveryBoy.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deliveryBoy.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort filtered data
  const sortedDeliveryBoys = filteredDeliveryBoys.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Calculate pagination
  const indexOfLastDeliveryBoy = currentPage * itemsPerPage;
  const indexOfFirstDeliveryBoy = indexOfLastDeliveryBoy - itemsPerPage;
  const currentDeliveryBoys = sortedDeliveryBoys.slice(indexOfFirstDeliveryBoy, indexOfLastDeliveryBoy);

  const totalPages = Math.ceil(sortedDeliveryBoys.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
            Delivery Boy
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
              <RegisterForm onClose={handleCloseModal} />
            </div>
          </div>
        )}

        <div className="container mx-auto 2xl:ml-0 py-8">
          <div className="lg:h-full bg-[#1e40af] text-black rounded-xl p-4">
            <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 mt-1">
              Delivery Boy List
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
                  {currentDeliveryBoys.map((deliveryBoy) => (
                    <tr key={deliveryBoy._id} className="bg-gray-200 border-b-2 border-blue-200">
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{deliveryBoy.username}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{deliveryBoy.email}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">{deliveryBoy.state}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis">{deliveryBoy.address}</td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis text-[#1e40af] hover:text-black hover:text-xl">
                        <button onClick={() => resetHandler(deliveryBoy._id)}>Reset Password</button>
                      </td>
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
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : " bg-black"}`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Next
              </button>
            </div>
      </div>
    </div>
  );
};

export default DeliveryboyDetails;
