import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditItemsStock from "../../utils/Modal/ItemStock/EditItemsStock";
import DeleteModal from "../../utils/Modal/ItemStock/DeleteModal";
import Logout from "../../utils/Logout";
import { BASE_URL } from "../../constants";

function ItemStock() {
  const [itemStocks, setItemStocks] = useState([]);
  const [filteredItemStocks, setFilteredItemStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemStockId, setDeleteItemStockId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemStockId, setEditItemStockId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchItemStocks();
  }, []);

  useEffect(() => {
    setFilteredItemStocks(
      itemStocks.filter((itemStock) =>
        itemStock.item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, itemStocks]);

  const fetchItemStocks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/itemStocks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch item stocks");
      }
      const data = await response.json();
      setItemStocks(data);
      setFilteredItemStocks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (itemStockId) => {
    setDeleteItemStockId(itemStockId);
    setShowDeleteModal(true);
  };

  const handleEdit = (itemStockId) => {
    setEditItemStockId(itemStockId);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/itemStocks/${deleteItemStockId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Filter out the deleted item from the state
        setItemStocks(
          itemStocks.filter((itemStock) => itemStock._id !== deleteItemStockId)
        );
        setFilteredItemStocks(
          filteredItemStocks.filter(
            (itemStock) => itemStock._id !== deleteItemStockId
          )
        );
        console.log("Item deleted successfully");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  // Logic to calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItemStocks.slice(
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
          <Logout />
        </div>
        <div className="bg-container">
          <Add
            name="ItemStock"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container">
          <table className="w-full">
            <thead className="Table uppercase text-xs  md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  S.NO
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Category
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Item
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Published
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  stockCount
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  lastStock
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  quality
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  vendor
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((itemStock, index) => (
                <tr
                  key={itemStock._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center font-normal">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="text-center font-normal">
                    {itemStock.category}
                  </td>
                  <td className="text-center font-normal">{itemStock.item}</td>
                  <td className="text-center font-normal">
                    {itemStock.published.toString()}
                  </td>
                  <td className="text-center font-normal">
                    {itemStock.stockCount}
                  </td>
                  <td className="text-center font-normal">
                    {itemStock.lastStock}
                  </td>
                  <td className="text-center font-normal">
                    {itemStock.quality}
                  </td>
                  <td className="text-center font-normal">
                    {itemStock.vendor}
                  </td>

                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                      onClick={() => handleEdit(itemStock._id)}
                    >
                      <FaEdit className="text-xl" />
                      {/* <div>Edit itemStock</div> */}
                    </div>
                    <div
                      onClick={() => handleDelete(itemStock._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      {/* <div>Delete itemStock</div> */}
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
              length: Math.ceil(filteredItemStocks.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}
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
      <EditItemsStock
        isOpen={showEditModal}
        onClose={closeModal}
        itemStockId={editItemStockId}
      />
    </div>
  );
}

export default ItemStock;
