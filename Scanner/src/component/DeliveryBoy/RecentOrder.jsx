import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRupeeSign } from "react-icons/fa";

const RecentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);
  const deliveryEmail = localStorage.getItem('email');

  const API_URL= process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/panshop/order`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const now = new Date();
        const recentOrders = data.filter(order =>
          order.status === 'pending' && (!order.deliveryTime || new Date(order.deliveryTime) >= now)
        );
        // Filter orders based on deliveryEmail
        const filteredOrders = recentOrders.filter(order => order.assignTo === deliveryEmail);
        setOrders(filteredOrders);
        console.log('Orders', filteredOrders)
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    };

    fetchOrders();
  }, [deliveryEmail]);

  const handleOTPSubmit = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setOtp('');
  };

  const handleInputChange = (index, value, keyCode) => {
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0 && keyCode === 8) {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = '';
    }
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    try {
      const otpNumber = Number(otp);
      const response = await fetch(`${API_URL}/api/panshop/order/${selectedOrder._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpNumber })
      });

      if (!response.ok) {
        throw new Error('OTP did not match the data');
      }

      const data = await response.json();
      toast.success('OTP matched and order status updated!');
      closeModal();
      setOrders((prevOrders) =>
        prevOrders.map(order => order._id === data.order._id ? data.order : order)
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto h-screen p-4 md:p-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center underline text-blue-600">Recent Orders</h1>
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
                    {product.productNames} - Quantity: {product.quantity} - Price:  <FaRupeeSign />{product.price}
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-gray-700 text-right border-r-2 border-blue-600 pr-4">Total Price:</p>
              <p className="text-gray-800 font-bold"><FaRupeeSign />{order.totalPrice}</p>
            </div>
            <div className="mt-4 text-right">
              <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onClick={() => handleOTPSubmit(order)}>Submit OTP</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-[#e8f0fe]  p-6 md:p-12 shadow-lg rounded ">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Enter OTP</h2>
            <form onSubmit={submitOtp}>
              <div className="flex space-x-4 justify-center">
                {[0, 1, 2, 3].map(index => (
                  <input
                    key={index}
                    ref={el => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    className="border rounded w-12 h-12 text-center text-gray-800 "
                    onChange={e => handleInputChange(index, e.target.value, e.keyCode)}
                    onKeyDown={e => handleInputChange(index, e.target.value, e.keyCode)}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-green-700"
                >
                  Submit
                </button>
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={closeModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrder;
