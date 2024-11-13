import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import axios from 'axios';
import { LuIndianRupee } from "react-icons/lu";

const MonthlyIncom = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const panshopOwner_id = localStorage.getItem("id");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/panShopLogin/orderHistroy/${panshopOwner_id}`);
        setHistoryData(response.data.orders);
        console.log("MonthlyIncome", response.data); // Ensure historyData is an array
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredHistoryData = selectedMonth && selectedYear
    ? historyData.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
        const orderYear = orderDate.getFullYear();
        return orderMonth === selectedMonth && String(orderYear) === selectedYear;
      })
    : [];

  const totalSummary = filteredHistoryData.reduce((summary, order) => {
    order.products.forEach(product => {
      summary.totalPrice += product.price * product.quantity;
      summary.totalQuantity += product.quantity;
    });
    return summary;
  }, { totalPrice: 0, totalQuantity: 0 });

  return (
    <div className="flex">
      <button onClick={toggleDrawer} className="btn-bg text-black px-4 py-2 rounded-lg w-full mb-20 transition duration-300 ease-in-out hover:bg-gray-700">
        <RiMoneyRupeeCircleLine />
      </button>

      {/* Drawer */}
      <div className={`fixed inset-0 z-50 ${openDrawer ? 'visible' : 'invisible'}`} onClick={toggleDrawer}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
      </div>

      {/* Order History Drawer */}
      <div className={`fixed right-0 top-0 h-full md:w-2/3 lg:w-1/3 bg-gray-900 z-50 transform transition-transform ease-in-out duration-300 ${openDrawer ? 'translate-x-0' : 'translate-x-full'}`} style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
        <div className="flex justify-between items-center px-10 py-8 border-b border-gray-300 bg-gray-900 text-white">
          <div className='flex text-2xl font-bold text-center gap-2'>
            <SlArrowLeft onClick={toggleDrawer} className='mt-1' />
            <h1>Monthly Order</h1>
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-900 text-white px-4 py-2 rounded" value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select className="bg-gray-900 text-white px-4 py-2 rounded" value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='p-8'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='grid grid-cols-1 gap-6'>
              {filteredHistoryData.length > 0 ? (
                <>
                  <div className=" shadow-lg rounded-lg overflow-hidden mb-6 bg-blue-900 text-white">
                    <div className="border-gray-300 pt-4 px-6 py-4">
                      <h2 className="font-bold mb-2 text-xl">Summary</h2>
                      <div className='flex items-center justify-between border-b text-xl font-bold border-black py-2'>
                        <p className='font-semibold'>Total Quantity: </p>
                        <p className='font-semibold'>{totalSummary.totalQuantity} Items</p>
                      </div>
                      <div className='flex items-center justify-between border-b text-xl font-bold border-black py-2'>
                        <p className='font-semibold'>Total Price:  </p>
                        <p className='font-semibold flex items-center'><LuIndianRupee />{totalSummary.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                  {filteredHistoryData.map((order, index) => (
                    <div key={index} className="btn-bg shadow-lg rounded-lg overflow-hidden">
                      <div className="border-gray-300 pt-4">
                        <h2 className="font-bold mb-1 text-xl">Products Details</h2>
                        <div className="px-6 py-4">
                          <div className='flex items-center justify-between border-b text-xl font-bold border-black py-2'>
                            <p className='font-semibold'>Product Name</p>
                            <p className='font-semibold'>Quantity</p>
                            <p className='font-semibold'>Price</p>
                          </div>
                          {order.products.map((product, pIndex) => (
                            <div key={pIndex} className='flex items-center justify-between border-b font-semibold border-black py-2 '>
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
                  ))}
                </>
              ) : (
                <p className='text-[#c8a357]'>No order history available for the selected month.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncom;
