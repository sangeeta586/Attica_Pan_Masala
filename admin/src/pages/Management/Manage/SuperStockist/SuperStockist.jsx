import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../constants";
import ManagementSidebar from "../../ManagementSidebar";
import ManagementSideBarModal from "../../ManagementChart/ManagementSideBarModal";
import SuperstockistRegister from "../../Register/SuperstockistRegister";

const SuperStockist = () => {
  const [superStockists, setSuperStockists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "username",
    direction: "asc",
  });

  // Search state variables
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSuperStockists();
  }, []);

  const fetchSuperStockists = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/superstockist/getAllUser`);
      if (!response.ok) {
        throw new Error("Failed to fetch super stockists");
      }
      const data = await response.json();
      setSuperStockists(data);
    } catch (error) {
      console.error("Error fetching super stockists:", error);
    }
  };

  const handleRegisterButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const resetHandler = (id, email) => {
    // Store emailId in localStorage
    localStorage.setItem("superStockistEmail", email);
    localStorage.setItem("superstockistId", id);

    navigate("/manage/superStockist/dashboard");
  };

  const sortByColumn = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedStockists = [...superStockists].sort((a, b) => {
      if (direction === "asc") {
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
  const currentStockists = filteredStockists.slice(
    indexOfFirstStockist,
    indexOfLastStockist
  );
  const totalPages = Math.ceil(filteredStockists.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } border border-blue-500 rounded`}
        >
          {i}
        </button>
      );
    }
    return <div className="flex justify-center mt-4">{pageNumbers}</div>;
  };

  return (
    <div className="flex gap-6 bg-[#dbeafe] w-full">
      {/* Sidebar */}
      <div className="h-screen md:block lg:block hidden">
        <ManagementSidebar />
      </div>

      {/* Main Content */}
      <div className="w-[80%] lg:ml-80 md:ml-40 font-serif lg:p-5 md:p-5 p-4 justify-center">
        <div className="flex items-center flex-wrap lg:justify-end md:justify-end justify-center lg:gap-10 md:gap-5 gap-1 lg:h-28 h-16 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2">
          <div className="lg:hidden md:hidden block">
            <ManagementSideBarModal />
          </div>
          <p className="lg:text-2xl md:text-xl text-xs font-bold border-2 border-[rgb(140,160,226)] p-2 rounded-lg bg-[#dbeafe]">
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
              <SuperstockistRegister onClose={handleCloseModal} />
            </div>
          </div>
        )}

        <div className="container mx-auto py-4">
          <div className="lg:h-full bg-[#1e40af] text-black rounded-xl p-2">
            <h2 className="text-2xl text-white font-bold p-1 mt-1">
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

            <div
              className="overflow-x-auto overflow-y-auto"
              style={{ maxHeight: "600px" }}
            >
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#93c5fd] text-black sm:text-sm">
                    <th
                      onClick={() => sortByColumn("username")}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Name
                    </th>
                    <th
                      onClick={() => sortByColumn("email")}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Email
                    </th>
                    <th
                      onClick={() => sortByColumn("address")}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Address
                    </th>
                    <th
                      onClick={() => sortByColumn("wareHouseName")}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      Warehouse Name
                    </th>
                    <th
                      onClick={() => sortByColumn("state")}
                      className="px-2 py-4 md:text-lg text-xs text-left border-r-2 border-white cursor-pointer"
                    >
                      State
                    </th>
                    <th className="px-2 py-4 md:text-lg text-xs text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStockists.map((superStockist) => (
                    <tr
                      key={superStockist._id}
                      className="bg-gray-200 border-b-2 border-blue-200"
                    >
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        {superStockist.username}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        {superStockist.email}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        {superStockist.address}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        {superStockist.wareHouseName}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap overflow-hidden overflow-ellipsis border-r-2 border-white">
                        {superStockist.state}
                      </td>
                      <td className="px-2 py-4 md:text-lg text-xs text-left whitespace-nowrap">
                        <Button
                          color="orange"
                          onClick={() =>
                            resetHandler(superStockist._id, superStockist.email)
                          }
                          className="mr-2"
                        >
                          Show details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperStockist;
