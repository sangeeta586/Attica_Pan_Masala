import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import ManagementSidebar from '../Management/ManagementSidebar';
import ManagementSideBarModal from '../Management/ManagementChart/ManagementSideBarModal';
import { FaProductHunt } from 'react-icons/fa';
import { SuperStockistSideBar } from '../SuperStockist/SuperStockistSideBar';

const DeliveryBoyDetails = () => {
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, name } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchDeliveryBoyDetails();
        await fetchOrderDetails();
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const fetchDeliveryBoyDetails = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/api/qrGeneraterBoy/${id}`);
      setDeliveryBoy(resp.data);
    } catch (error) {
      console.error('Error fetching delivery boy details:', error);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/api/qrGeneraterBoy/order/${id}`);
      setOrders(resp.data); // Set the fetched orders
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  // Group orders by status
  const groupedOrders = orders.reduce((acc, order) => {
    const status = order.status; // Grouping by status
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {});

  // Calculate total, confirmed, and delivered orders
  const totalOrders = orders.length;
  const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

  return (
    <div className="flex font-sans bg-blue-100 min-h-screen">
      {name === "management" ? (
        <>
          <div className="hidden lg:block">
            <ManagementSidebar />
          </div>
          <div className="lg:hidden md:hidden block absolute">
            <ManagementSideBarModal />
          </div>
        </>
      ) : (
        <div className="lg:p-5 xl:p-5 ml-0 p-0">
          <Navbar />
        </div>
      )}
      {
        name === "superstockist" &&
          
        (
          <div className="lg:p-5 xl:p-5 ml-0 p-0">
          <SuperStockistSideBar />
        </div>
        )
      }

      <div className="w-full lg:ml-70 xl:ml-80 md:ml-60 flex flex-col h-full px-5">
        <div className='flex justify-center items-center content-center'>
          <div className="grid grid-cols-1 gap-4 p-5 pt-10">
            <div className="flex flex-col items-center mb-4">
              <img
                className="w-44 h-44 rounded-full object-cover mb-4"
                src="https://assets.codepen.io/5453939/internal/avatars/users/default.png?format=auto&version=1638034680&width=300&height=300"
                alt="Avatar"
              />
            </div>

            <div className='lg:grid lg:grid-cols-3 gap-4 md:grid  hidden'>
              <div className="w-full rounded-lg h-32 bg-blue-800 p-5 mb-4 rotate-x-180">
                <h1 className="text-white text-2xl text-center font-semibold">
                  <p> Total order</p>
                  <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                    <FaProductHunt /> <p className="text-3xl">{totalOrders}</p>
                  </div>
                </h1>
              </div>
              <div className="w-full rounded-lg h-32 bg-blue-800 p-5 mb-4 rotate-x-180">
                <h1 className="text-white text-2xl text-center font-semibold">
                  <p> Confirmed</p>
                  <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                    <FaProductHunt /> <p className="text-3xl">{confirmedOrders}</p>
                  </div>
                </h1>
              </div>
              <div className="w-full rounded-lg h-32 bg-blue-800 p-5 mb-4 rotate-x-180">
                <h1 className="text-white text-2xl text-center font-semibold">
                  <p> Delivered Order</p>
                  <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                    <FaProductHunt /> <p className="text-3xl">{deliveredOrders}</p>
                  </div>
                </h1>
              </div>

            </div>

            {deliveryBoy && (
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-2 text-center my-4">Delivery Boy Details</h2>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 border-2 border-red-600 p-4 rounded-md my-4'>
                  <p><strong>Username:</strong> {deliveryBoy.username}</p>
                  <p><strong>Email:</strong> {deliveryBoy.email}</p>
                  <p><strong>Phone Number:</strong> {deliveryBoy.phoneNo}</p>
                  <p><strong>Address:</strong> {deliveryBoy.address}</p>
                  <p><strong>City:</strong> {deliveryBoy.city}</p>
                  <p><strong>State:</strong> {deliveryBoy.state}</p>
                  <p><strong>Pin Code:</strong> {deliveryBoy.pinCode}</p>
                  <p><strong>Registration Date:</strong> {new Date(deliveryBoy.createdAt).toLocaleString()}</p>
                  {/* Add total, confirmed, and delivered orders */}

                </div>
              </div>
            )}

            {/* Display orders grouped by status */}
            {Object.entries(groupedOrders).map(([status, orders]) => {
              const bgColor = status === 'confirmed' ? 'text-red-500' : status === 'Delivered' ? 'text-green-500' : 'bg-white';
              const bordercolor = status === 'confirmed' ? 'border-red-600' : status === 'Delivered' ? 'border-green-600' : 'bg-white';

              return (
                <>
                  <h3 className={`text-2xl font-bold text-center ${bgColor}`}>{status}</h3>
                  <div key={status} className={`grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 border-2 ${bordercolor} p-4 rounded-md my-1`}>
                    {orders.map(order => (
                      <div key={order._id} className="border-b py-2">
                        <div className='bg-blue-300 p-2 rounded-lg'>
                          <p><strong>Order ID:</strong> {order._id}</p>
                          <p><strong>Delivery Time:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>
                          <p><strong>Total Price:</strong> {order.totalPrice}</p>
                        </div>
                        <p className='text-center my-2'><strong>Products</strong></p>
                        <ul className="list-disc pl-5">
                          {order.products.map(product => (
                            <li key={product._id}>
                              {product.productNames} (Qty: {product.quantity}, Price: {product.price})
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyDetails;
