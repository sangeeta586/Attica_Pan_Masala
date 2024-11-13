import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import axios from "axios";
import DeleteModal from "../../utils/Modal/Order/DeleteModal";
import EditOrder from "../../utils/Modal/Order/EditOrder"; // Corrected import
import Logout from "../../utils/Logout";
import { BASE_URL } from "../../constants";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    setDeleteOrderId(orderId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/order/${deleteOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOrders(orders.filter((order) => order._id !== deleteOrderId));
        console.log("Order deleted successfully");
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (orderId) => {
    setEditOrderId(orderId);
    setShowEditModal(true);
  };

  const updateOrder = (updatedOrder) => {
    const updatedOrders = ordersmap((order) =>
      order._id === updatedOrder._id ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const filteredOrders = orders.filter((order) =>
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
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
        </div >
        <div className="bg-container">
          <Add
            name="Orders"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-auto flex-grow justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container ">
          <table className="w-full">
            <thead  className="Table uppercase  text-xs md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  S No
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Supplier
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Products
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Quantity
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col">
                  Status
                </th>
                <th className="text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center font-normal">{index + 1}</td>
                  <td className="text-center font-normal">{order.supplier}</td>
                  <td className="text-center font-normal">{order.products}</td>
                  <td className="text-center font-normal">{order.quantity}</td>
                  <td className="text-center font-normal">{order.status}</td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      onClick={() => openEditModal(order._id)}
                      className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <FaEdit className="text-xl" />
                      {/* <div>Edit Order</div> */}
                    </div>
                    <div
                      onClick={() => handleDelete(order._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      {/* <div>Delete Order</div> */}
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
              { length: Math.ceil(filteredOrders.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
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
      <EditOrder
        isOpen={showEditModal}
        onClose={closeModal}
        orderId={editOrderId} // Corrected prop name
        onUpdate={updateOrder}
      />
    </div>
  );
}

export default Orders;
