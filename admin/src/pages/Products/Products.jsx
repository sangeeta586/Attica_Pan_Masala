import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import DeleteModal from "../../utils/Modal/Products/DeleteModal";
import EditProduct from "../../utils/Modal/Products/EditProduct";
import Logout from "../../utils/Logout";
import { BASE_URL } from "../../constants";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

function Products() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    fetch(`${BASE_URL}/api/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (productId) => {
    setDeleteProductId(productId);
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
        `${BASE_URL}/api/product/${deleteProductId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setProducts(
          products.filter((product) => product._id !== deleteProductId)
        );
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (productId) => {
    setEditProductId(productId);
    setShowEditModal(true);
  };

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const filteredProducts = products.filter((product) =>
    product.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
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
            name="Products"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container">
          <table className="w-full">
            <thead className="Table uppercase  text-xs md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  S No
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Product Name
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Description
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Units
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Price
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col">
                  Status
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 " scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{product.item_name}</td>
                  <td className="text-center">{product.description}</td>
                  <td className="text-center">{product.units}</td>
                  <td className="text-center">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="text-center">{product.status}</td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      onClick={() => openEditModal(product._id)}
                      className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <FaEdit className="text-xl" />
                      {/* <div>Edit Product</div> */}
                    </div>
                    <div
                      onClick={() => handleDelete(product._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      {/* <div>Delete Product</div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="mt-4 flex justify-center">
          <ul className="flex gap-2">
            {Array.from({
              length: Math.ceil(filteredProducts.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <EditProduct
        isOpen={showEditModal}
        onClose={closeModal}
        productId={editProductId}
        onUpdate={updateProduct}
      />
    </div>
  );
}

export default Products;
