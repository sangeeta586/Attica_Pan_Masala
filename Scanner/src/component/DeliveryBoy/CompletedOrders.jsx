import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRupeeSign } from "react-icons/fa";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

    const API_URL= process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/panshop/order`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const completedOrders = data.filter(order => order.status === 'delivered');
        setOrders(completedOrders);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto overflow-y-auto p-4 md:p-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center underline text-blue-600">Completed Orders</h1>
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order._id} className="border border-gray-300 p-4 rounded bg-gradient-to-r bg-[#e8f0fe] shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700 border-b-2 border-blue-600 pb-2">Order ID: {order._id}</h2>
            <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 items-start">
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Pan Shop Owner Name:</p>
              <p className="text-gray-800">{order.panShopOwnerName}</p>
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Pan Shop Owner Address:</p>
              <p className="text-gray-800">{order.panShopOwneraddress}</p>
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Status:</p>
              <p className="text-gray-800">{order.status}</p>
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Delivery Time:</p>
              <p className="text-gray-800">{order.deliveryTime}</p>
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Products:</p>
              <ul className="list-disc pl-5 text-gray-800">
                {order.products.map(product => (
                  <li key={product._id} className="mb-1">
                    {product.productNames} - Quantity: {product.quantity} - Price: <FaRupeeSign />{product.price}
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Total Price:</p>
              <p className="text-gray-800 font-bold"><FaRupeeSign />{order.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrders;
