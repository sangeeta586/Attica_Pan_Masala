import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import DeleteModal from "../../utils/Modal/Category/DeleteModal";
import EditCategoryModal from "../../utils/Modal/Category/EditCategoryModal";
import Logout from "../../utils/Logout";
import Styles from '../../Styles/Styles.css';
import { BASE_URL } from "../../constants";

function Category() {
  const [categorys, setCategorys] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    fetch(`${BASE_URL}/api/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategorys(data);
        console.log(token);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (categoryId) => {
    setDeleteCategoryId(categoryId);
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
        `${BASE_URL}/api/category/${deleteCategoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setCategorys(
          categorys.filter((category) => category._id !== deleteCategoryId)
        );
        console.log("Category deleted successfully");
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (categoryId) => {
    setEditCategoryId(categoryId);
    setShowEditModal(true);
  };

  const updateCategory = (updatedCategory) => {
    const updatedCategories = categorys.map((category) =>
      category._id === updatedCategory._id ? updatedCategory : category
    );
    setCategorys(updatedCategories);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const filteredCategorys = categorys.filter((category) =>
    category.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategorys = filteredCategorys.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
            name="Category"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full">
          <table className="w-full">
            <thead className="Table uppercase text-xs md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  S.NO
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Name
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Status
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {currentCategorys.map((category, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base`}
                >
                  <td className="text-center font-normal">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="text-center font-medium">{category.name}</td>
                  <td className="text-center">
                    <span
                      className={`font-normal ${category.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                        } text-white py-1 px-2 rounded`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      onClick={() => openEditModal(category._id)}
                      className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs sm:text-sm md:text-sm lg:text-md xl:text-lg font-thin gap-1 cursor-pointer"
                    >
                      <FaEdit className="text-xl" />
                    </div>
                    <div
                      onClick={() => handleDelete(category._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs sm:text-sm md:text-sm lg:text-md xl:text-lg font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <ul className="flex gap-2">
            {Array.from({
              length: Math.ceil(filteredCategorys.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${currentPage === index + 1
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
      <EditCategoryModal
        isOpen={showEditModal}
        onClose={closeModal}
        categoryId={editCategoryId}
        onUpdate={updateCategory}
      />
    </div>
  );
}

export default Category;
