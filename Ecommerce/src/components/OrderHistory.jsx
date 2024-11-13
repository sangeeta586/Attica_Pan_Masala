import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { FaClipboardList } from "react-icons/fa";
import axios from 'axios';
import { LuIndianRupee } from "react-icons/lu";

const OrderHistory = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const panshopOwner_id = localStorage.getItem("id");

  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/panShopLogin/orderHistroy/${panshopOwner_id}`);
        setHistoryData(response.data.orders);
       // console.log(response.data) // Ensure historyData is an array
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [panshopOwner_id]);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className="flex">
      <button onClick={toggleDrawer} className="btn-bg text-black px-4 py-2 rounded-lg w-full mb-20 transition duration-300 ease-in-out hover:bg-gray-700">
        <FaClipboardList />
      </button>

      {/* Drawer */}
      <div className={`fixed inset-0 z-50 ${openDrawer ? 'visible' : 'invisible'}`} onClick={toggleDrawer}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
      </div>

      {/* Order History Drawer */}
      <div className={`fixed right-0 top-0 h-full  md:w-2/3 lg:w-1/3  bg-gray-900 z-50 transform transition-transform ease-in-out duration-300 ${openDrawer ? 'translate-x-0' : 'translate-x-full'}`} style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
        <div className="flex justify-between items-center px-10 py-8 border-b border-gray-300 bg-gray-900 text-white">
          <div className='flex text-2xl font-bold text-center gap-2'>
            <SlArrowLeft onClick={toggleDrawer} className='mt-1' />
            <h1>Order History</h1>
          </div>
        </div>
        <div className='p-8'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='grid grid-cols-1 gap-6'>
              {historyData.length > 0 ? (
                historyData.map((order, index) => (
                  <div key={index} className="btn-bg shadow-lg rounded-lg overflow-hidden">
                    <div className=" border-gray-300 pt-4">
                      <h2 className="font-bold mb-1 text-xl">Products Details</h2>
                      <div className="px-6 py-4">
                        <div className='flex items-center justify-between border-b text-xl font-bold border-black py-2'>
                          <p className='font-semibold'>Product Name</p>
                          <p className='font-semibold'>Quantity</p>
                          <p className='font-semibold'>Price</p>
                        </div>
                        {order.products.map((product, pIndex) => (
                          <div key={pIndex} className='flex items-center justify-between border-b font-semibold border-black py-2'>
                            <p>{product.productNames}</p>
                            <p>{product.quantity}</p>
                            <p className='flex items-center'><LuIndianRupee />{product.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className='px-6 py-2'>Date & Time: {new Date(order.createdAt).toLocaleString()}</p>
                    <p className='py-3 font-bold px-6 flex items-center'>Total Price: <LuIndianRupee />{order.totalPrice}</p>
                  </div>
                ))
              ) : (
                <p>No order history available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
