import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditItemModal from "../../utils/Modal/Items/EditItemModal";
import DeleteModal from "../../utils/Modal/Items/DeleteModal";
import Logout from "../../utils/Logout";
import { BASE_URL } from "../../constants";

function Items() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    fetch(`${BASE_URL}/api/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (itemId) => {
    setEditItemId(itemId);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/items/${deleteItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setItems(items.filter((item) => item._id !== deleteItemId));
        setFilteredItems(
          filteredItems.filter((item) => item._id !== deleteItemId)
        );
        console.log("Item deleted successfully");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  const updateItem = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setDeleteItemId(null);
    setEditItemId(null);
  };

  // Logic to calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="bg-container">
          <Add
            name="Items"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container">
          <table className="w-full">
            <thead className="Table uppercase  text-xs md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  S NO
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Item name
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Description
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Units
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Price
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentItems) &&
                currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                  >
                    <td className="text-center font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="text-center font-normal">{item.itemName}</td>
                    <td className="text-center font-normal">
                      {item.description}
                    </td>
                    <td className="text-center font-normal">{item.units}</td>
                    <td className="text-center font-normal">{item.price}</td>
                    <td className="flex justify-end items-center gap-2 py-5 mr-3">
                      <div
                        onClick={() => handleEdit(item._id)}
                        className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                      >
                        <FaEdit className="text-xl" />
                        {/* <div>Edit item</div> */}
                      </div>
                      <div
                        onClick={() => handleDelete(item._id)}
                        className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                      >
                        <MdDelete className="text-xl" />
                        {/* <div>Delete item</div> */}
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
              length: Math.ceil(filteredItems.length / itemsPerPage),
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
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        itemId={editItemId}
        onUpdate={updateItem}
      />
    </div>
  );
}

export default Items;
