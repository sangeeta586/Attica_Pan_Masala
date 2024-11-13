import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditSupplies from "../../utils/Modal/Supplies/EditSupplies";
import DeleteModal from "../../utils/Modal/Supplies/DeleteModal";
import Logout from "../../utils/Logout";
import { BASE_URL } from "../../constants";

function Supplies() {
  const [supplies, setSupplies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteSupplyId, setDeleteSupplyId] = useState(null);
  const [editSupplyId, setEditSupplyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    fetch(`${BASE_URL}/api/supplies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSupplies(data);
        console.log("Supplies data:", data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (supplyId) => {
    setDeleteSupplyId(supplyId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/${deleteSupplyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setSupplies(supplies.filter((supply) => supply._id !== deleteSupplyId));
        console.log("Supply deleted successfully");
      } else {
        console.error("Failed to delete supply");
      }
    } catch (error) {
      console.error("Error deleting supply:", error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (supplyId) => {
    setEditSupplyId(supplyId);
    setShowEditModal(true);
  };

  const updateSupply = (updatedSupply) => {
    const updatedSupplies = supplies.map((supply) =>
      supply._id === updatedSupply._id ? updatedSupply : supply
    );
    setSupplies(updatedSupplies);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const filteredSupplies = supplies.filter((supply) =>
    supply.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastSupply = currentPage * itemsPerPage;
  const indexOfFirstSupply = indexOfLastSupply - itemsPerPage;
  const currentSupplies = filteredSupplies.slice(
    indexOfFirstSupply,
    indexOfLastSupply
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex font-sans bg-blue-100 h-screen">
      <div className="lg:p-5 xl:p-5 ml-0 p-0">
        <Navbar />
      </div>
      <div className="w-full lg:ml-70 xl:ml-80 md:ml-60 flex flex-col h-full">
      <div>
          <Logout/>
        </div>
        <div className="bg-container">
          <Add
            name="Supplies"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container">
          <table className="w-full">
            <thead  className="Table uppercase text-xs  md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  S No
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Supplier
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Products
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Quality
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Price
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSupplies.map((supply, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center font-normal">{index + 1}</td>
                  <td className="text-center font-normal">{supply.name}</td>
                  <td className="text-center font-normal">{supply.products}</td>
                  <td className="text-center font-normal">{supply.quantity}</td>
                  <td className="text-center font-normal">{supply.price}</td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      onClick={() => openEditModal(supply._id)}
                      className="flex justify-start cursor-pointer items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1"
                    >
                      <FaEdit className="text-xl" />
                      {/* <div>Edit Supplies</div> */}
                    </div>
                    <div
                      onClick={() => handleDelete(supply._id)}
                      className="flex cursor-pointer justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 "
                    >
                      <MdDelete className="text-xl" />
                      {/* <div>Delete Supplies</div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <ul className="flex gap-2">
            {Array.from(
              { length: Math.ceil(filteredSupplies.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <EditSupplies
        isOpen={showEditModal}
        onClose={closeModal}
        suppliesId={editSupplyId}
        onUpdate={updateSupply}
      />
    </div>
  );
}

export default Supplies;












