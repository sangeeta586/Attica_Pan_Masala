import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants";

const DeliveryBoysList = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [sortField, setSortField] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveryBoys();
  }, [sortField, sortDirection]);

  const fetchDeliveryBoys = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`
      );
      if (!response.ok) throw new Error("Failed to fetch delivery boys");
      const data = await response.json();

      // Filter by stockistEmailId matching the email in localStorage
      const loggedInEmail = localStorage.getItem("email");
      const filteredData = data.filter(
        (deliveryBoy) => deliveryBoy.stockistEmailId === loggedInEmail
      );

      setDeliveryBoys(filteredData);
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
    }
  };

  const resetHandler = (id) => {
    localStorage.setItem("userId", id);
    navigate("/resetpassworddeliveryboy");
  };

  const filteredDeliveryBoys = deliveryBoys.filter((deliveryBoy) =>
    ["username", "email", "state"].some((key) =>
      deliveryBoy[key]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedDeliveryBoys = filteredDeliveryBoys.sort((a, b) =>
    sortDirection === "asc"
      ? a[sortField]?.localeCompare(b[sortField])
      : b[sortField]?.localeCompare(a[sortField])
  );

  const indexOfLastDeliveryBoy = currentPage * itemsPerPage;
  const indexOfFirstDeliveryBoy = indexOfLastDeliveryBoy - itemsPerPage;
  const currentDeliveryBoys = sortedDeliveryBoys.slice(
    indexOfFirstDeliveryBoy,
    indexOfLastDeliveryBoy
  );

  const totalPages = Math.ceil(sortedDeliveryBoys.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Delivery Boy List
        </h2>

        {/* Search and Sort Inputs */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by username, email, or state"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/3"
          />
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/4"
          >
            <option value="username">Sort by Username</option>
            <option value="email">Sort by Email</option>
            <option value="state">Sort by State</option>
          </select>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/4"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr  className="bg-[#001D3D] text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Username
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  State
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDeliveryBoys.map((deliveryBoy) => (
                <tr
                  key={deliveryBoy._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {deliveryBoy.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {deliveryBoy.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {deliveryBoy.state}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {deliveryBoy.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => resetHandler(deliveryBoy._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoysList;
