import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import OrderModal from "../Order/OrderModal";
import ManagementSidebar from "../ManagementSidebar";
import ManagementSideBarModal from "../ManagementChart/ManagementSideBarModal";
import { BASE_URL } from "../../../constants";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate,Link } from 'react-router-dom';
import Img from "../../../assets/avataaars.png";
import { Avatar } from "@material-tailwind/react";
import { format, parse } from 'date-fns';



function DeliveryBoyHomePage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // Default active tab
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Number of items per page
  const navigate  = useNavigate()

  // Fetch orders from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/panshop/order`);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Check if order is available
  const isOrderAvailable = (order) => {
    return (
      order.panShopOwnerName &&
      order.panShopOwneraddress &&
      order.products.length > 0
    );
  };

  // Filter orders based on active tab, search query, and sort by date
  const filteredOrders = orders
    .filter(
      (order) =>
        isOrderAvailable(order) &&
        order.status === activeTab &&
        (order.panShopOwnerName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          order.panShopOwneraddress
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.products.some((product) =>
            product.productNames
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          ))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to handle cancellation
  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        // PATCH request to cancel the order
        await axios.put(`${BASE_URL}/api/panshop/order/cancel/${orderId}`);
        Swal.fire("Canceled!", "Your order has been canceled.", "success");

        // Refetch the orders after cancellation
        const response = await axios.get(`${BASE_URL}/api/panshop/order`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error canceling order:", error);
        Swal.fire(
          "Error!",
          "There was an error canceling your order.",
          "error"
        );
      }
    }
  };

  const handleOnclick = ( order) => {
                          
    navigate("/trackerOrder/management", { state: { order } });
  }


  return (
    <div className="  bg-[#DBEAFE] min-h-screen py-10">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <ManagementSidebar />
      </div>

      {/* Mobile Menu */}
      <div className=" lg:ml-70 xl:ml-80 md:ml-60 flex flex-col h-full px-5 my-4">
        <div className="flex items-center flex-wrap lg:justify-between px-5 md:justify-end justify-center lg:gap-10 md:gap-5 gap-1 h-auto py-4 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2 w-[1/2]">
          <p className="lg:text-2xl md:text-xl text-xs font-bold  ">My Order</p>
          <div className="flex justify-center items-center content-center gap-2">
            <Avatar className="" alt="Remy Sharp" src={Img} />
            <p className="lg:text-2xl md:text-xl text-sm font-bold border-4 border-blue-400 p-2 rounded-lg bg-blue-100">
              {localStorage.getItem("email")}
            </p>
            <div className="lg:hidden md:hidden block">
              <ManagementSideBarModal />
            </div>
          </div>
        </div>

        <div className="container  bg-[#1E40AF] p-4   rounded-lg ">
          {/* Tab Buttons */}
          <div className="mb-4 grid lg:grid-cols-10 md:grid-cols-6 grid-cols-2 gap-1">
            {[
              "pending",
              "processing",
              "confirmed",

              "delivered",
              "canceled",
            ].map((status) => (
              <Button
                key={status}
                className={`mr-2 ${activeTab === status
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-300 text-gray-800 hover:bg-blue-400"
                  }`}
                onClick={() => setActiveTab(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by Owner Name, Address, or Product Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Responsive Table with Horizontal Scrolling */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse rounded-lg overflow-hidden shadow-lg w-full">
              <thead>
                <tr className="bg-[#6daef8] text-white">
                  <th className="border px-4 py-2">PanShop Details</th>
                  {activeTab !== "pending" && activeTab !== "canceled" && (
                    <>
                      <th className="border px-4 py-2">Assign to Stockist</th>
                      <th className="border px-4 py-2">Assign to Super Stockist</th>
                    </>
                  )}

                  
                  <th className="border px-4 py-2">Products</th>
                  <th className="border px-4 py-2">Status</th>
                  {activeTab !== "delivered" && activeTab !== "canceled" && (
                    <th className="border px-4 py-2">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <tr
                      key={order._id}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                    >
                      <td className="border px-4 py-2 text-center">
                        {order?.panShopOwnerName} <br />
                        {order?.panShopOwneraddress}
                        <div className="flex justify-center items-center content-center">
                          <br />
                          <Link
                            to={`/panshowDetails`}
                            className="text-green-600"
                          >
                            Show Details
                          </Link>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          Order Created At: {format(new Date(order?.createdAt), 'MMM d, yyyy h:mm a')}
                        </div>
                      </td>
                      {activeTab !== "pending" && activeTab !== "canceled" && (
                        <>
                          <td className=" border px-4 py-2 flex-row justify-center items-center">
                            <p>{order.stockistEmail}</p>

                            <p
                              className={` ${order.stockistStatus === "pending"
                                ? "text-yellow-500"

                                : order.stockistStatus === "delivered"
                                  ? "text-purple-500"
                                  : order.stockistStatus === "canceled"
                                    ? "text-red-500"
                                    : ""
                                }`}
                            >
                              {order.stockistStatus}
                            </p>

                            <Link to="/stockistDetails" className="text-green-600">
                              Show Details
                            </Link>
                          </td>

                          <td className="border px-4 py-2 flex-row justify-center items-center">
                            {order.superStockistEmail}


                            <p
                              className={` ${order.superStockistStatus === "pending"
                                ? "text-yellow-500"
                                : order.superStockistStatus === "delivered"
                                  ? "text-purple-500"
                                  : order.superStockistStatus === "canceled"
                                    ? "text-red-500"
                                    : ""
                                }`}
                            >{order.superStockistStatus}</p>

                            <Link
                              to="/stockistDetails"
                              className="text-green-600"
                            >
                              Show Details
                            </Link>

                          </td>
                        </>
                      )}
                     

                      <td className="border px-4 py-2">
                        <ul className="space-y-1">
                          {order.products.map((product, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{product.productName}</span>
                              <br />
                              <span>Qty: {product.quantity}</span>

                            </li>
                          ))}
                          <p className="text-center"><span className="text-xl font-medium">Total Price :</span> ₹{order.totalPrice}</p>
                        </ul>

                      </td>

                      <td
                        className={`border px-4 py-2 ${order.status === "pending"
                          ? "text-yellow-500"
                          : order.status === "processing"
                            ? "text-blue-500"
                            : order.status === "confirmed"
                              ? "text-green-500"
                              : order.status === "delivered"
                                ? "text-purple-500"
                                : order.status === "canceled"
                                  ? "text-red-500"
                                  : ""
                          }`}
                      >
                        {order.status}
                      </td>

                      <td className="border px-4 py-2 ">
                        <div className="flex justify-center items-center content-center gap-4 flex-wrap">
                          {order.status === "pending" && (
                            <Button
                              className="bg-blue-600 text-white shadow hover:bg-blue-500"
                              onClick={() => openModal(order)}
                            >
                              Assign
                            </Button>
                          )}
                          { activeTab !== "canceled" && activeTab !== "delivered" &&  (
                            <Button
                              className="bg-red-600 text-white shadow hover:bg-red-500"
                              onClick={() => handleCancelOrder(order._id)}
                            >
                              Cancel
                            </Button>
                          )}


                            <Button  
                              className="bg-green-600 text-white shadow hover:bg-green-500"
                              onClick={() => handleOnclick(order)}
                            >
                              Track Order
                            </Button>
                  
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No available orders
                    </td>
                  </tr>
                )}
                {isModalOpen && (
                  <OrderModal
                    order={selectedOrder}
                    setIsModalOpen={setIsModalOpen}
                    fetchData={fetchData}
                  />
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}

          {/* Order Modal */}
        </div>
        <div className="flex justify-between my-4 px-4">
          <Button
            className="bg-gray-950 text-white px-4 py-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            className="bg-gray-950 text-white px-4 py-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div >
  );
}

export default DeliveryBoyHomePage;
