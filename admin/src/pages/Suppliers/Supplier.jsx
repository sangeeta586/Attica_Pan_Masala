import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditSupplier from "../../utils/Modal/Supplier/EditSupplier";
import axios from "axios";
import DeleteModal from "../../utils/Modal/Supplier/DeleteModal";
import Logout from "../../utils/Logout";
import { BASE_URL } from "../../constants";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSupplierId, setDeleteSupplierId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    axios
      .get(`${BASE_URL}/api/supplier/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (supplierId) => {
    setDeleteSupplierId(supplierId);
    setShowDeleteModal(true);
  };

  const handleEdit = (supplierId) => {
    setEditSupplierId(supplierId);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/supplier/${deleteSupplierId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuppliers(
          suppliers.filter((supplier) => supplier._id !== deleteSupplierId)
        );
        console.log("Supplier deleted successfully");
      } else {
        console.error("Failed to delete supplier");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }

    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const updateSupplier = (updatedSupplier) => {
    const updatedSuppliers = suppliersmap((supplier) =>
      supplier._id === updatedSupplier._id ? updatedSupplier : supplier
    );
    setSuppliers(updatedSuppliers);
    setShowEditModal(false);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  // Logic to calculate the current suppliers to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Logic to change page
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
        <div  className="bg-container">
          <Add
            name="Supplier"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchClick={handleSearch}
          />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container ">
          <table className="w-full">
            <thead className="Table uppercase  text-xs md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  S.NO
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Name
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Address
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Product name
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Description
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Price
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col"></th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSuppliers.map((supplier, index) => (
                <tr
                  key={supplier._id}
                  className="bg-white border-b font-semibold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center font-normal">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="text-center font-medium">{supplier.name}</td>
                  <td className="text-center font-normal">
                    {supplier.address}
                  </td>
                  <td className="text-center font-normal">
                    {supplier.products.map((product) => (
                      <div key={product._id}>{product.name}</div>
                    ))}
                  </td>
                  <td className="text-center font-normal">
                    {supplier.products.map((product) => (
                      <div key={product._id}>{product.description}</div>
                    ))}
                  </td>
                  <td className="text-center font-normal">
                    {supplier.products.map((product) => (
                      <div key={product._id}>{product.price}</div>
                    ))}
                  </td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer" 
                    onClick={() => handleEdit(supplier._id)}
                    >
                     
                     
                      <FaEdit className="text-xl"   />
                      {/* <div
                        onClick={() => handleEdit(supplier._id)}
                        
                        className="hidden lg:inline md:inline cursor-pointer"
                      >
                       <FaEdit className="text-xl" /> 
                      </div> */}
                    </div>
                    <div
                      onClick={() => handleDelete(supplier._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      {/* <div>Delete supplier</div> */}
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
            {Array.from({
              length: Math.ceil(filteredSuppliers.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-gray-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      {showEditModal && (
        <EditSupplier
          isOpen={showEditModal}
          supplierId={editSupplierId}
          onClose={closeModal}
          onUpdate={updateSupplier}
        />
      )}
    </div>
  );
}

export default Supplier;










































