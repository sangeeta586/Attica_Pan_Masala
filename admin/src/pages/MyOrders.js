import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const user = localStorage.getItem('email');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    axios
      .get(`${BASE_URL}/api/stockist/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Filter orders based on logged-in user's email
        const filteredOrders = response.data.filter((order) => order.email === user);
        setOrderData(filteredOrders);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]); // Include user in dependency array to refetch orders whenever user changes

  if (orderData.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-gray-800'>No Orders Found</h1>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-blue-400 '>
      <h1 className='col-span-full text-center text-4xl font-bold mb-8 bg-white w-full rounded py-3'>Order History</h1>
      {orderData.map((order) => (
        <div key={order._id} className='overflow-hidden rounded-lg' style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
          <div className='bg-white p-4'>
            <div className='bg-blue-500 text-white p-2 rounded-t-lg mb-2'>
              <h2 className='text-lg font-semibold'>Order ID: {order._id}</h2>
              <p className='text-sm'>Status: {order.status}</p>
            </div>
            <div className='p-2'>
              <p className='text-sm'><span className='font-semibold'>Username:</span> {order.username}</p>
              <p className='text-sm'><span className='font-semibold'>Email:</span> {order.email}</p>
              <p className='text-sm'><span className='font-semibold'>Date:</span> {new Date(order.date).toLocaleDateString()}</p>
              <p className='text-sm'><span className='font-semibold'>Time:</span> {order.time}</p>
            </div>
            <div className='border-t border-gray-200 p-2'>
              <p className='text-lg  mb-2'><span className='font-semibold'>Message:</span>{order.message}</p>
              <p className='text-blue-500'>Stockist Message: {order.stockistMessage}</p>
            </div>
            <div className='border-t border-gray-200 p-2'>
              <h3 className='text-lg font-semibold mb-2'>Products: {order.products.length}</h3>
              <div className="overflow-x-auto">
                <ul className="whitespace-nowrap">
                  {order.products.map((product, index) => (
                    <li key={index} className='inline-block text-sm text-gray-600 px-2 py-1 mr-2 border border-gray-300 rounded '>
                        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                      <p><span className='font-semibold'>Name:</span> {product.productNames}</p>
                      <p><span className='font-semibold'>Description:</span> {product.productDescription}</p>
                      <p><span className='font-semibold'>Flavour:</span> {product.flavour}</p>
                      <p><span className='font-semibold'>Size:</span> {product.productSize}</p>
                      <p><span className='font-semibold'>Quantity:</span> {product.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;   


































