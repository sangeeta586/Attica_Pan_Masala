import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ManagementSidebar from '../Management/ManagementSidebar';
import ManagementSideBarModal from '../Management/ManagementChart/ManagementSideBarModal';
import Navbar from '../../Components/Navbar/Navbar';
import { SuperStockistSideBar } from '../SuperStockist/SuperStockistSideBar';
import { BASE_URL } from '../../constants';
import { Button } from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import GoogleMapComponent from '../Management/DeliveryBoyTracker/GoogleMaps';
import ProductModelDeteails from './ProductModelDeteails';
import SuperStockistModel from './SuperStockistModel';
import StockistDetailsModel from './StockistDetailsModel';
import PanShowDetailsModel from './PanShowDetailsModel';





const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const TrackOrder = () => {
  const { name } = useParams();
  const location = useLocation();
  const { order } = location.state || {};
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [locations, setLocation] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [showProductModel, setShowProductModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showStockist, setShowStockist] = useState(false);
  const [ShowSuperStockistModel, setShowSuperStockistModel] = useState(false)
  const [showPanShowDetails , setShowPanShowDetails] = useState(false);



  if (!order) {
    return <div>Order data is not available</div>;
  }

  const {
    panShopOwnerName,
    panShopOwneraddress,
    panShopOwnerstate,
    products,
    stockistStatus,
    superStockistStatus,
    totalPrice,
    superStockistdeliveryTime,
    stockistdeliveryTime,
    deliveryBoyOrderStatus,
    stockistEmail,
    superStockistEmail,
    status,
    otp,
    createdAt,
    deliveryBoyId,
    deliveryTime,
    superStockistdeliveryBoyId,
    panShopOwner_id
  } = order;

  console.log(panShopOwner_id)

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return { textColor: "text-yellow-500", label: "Pending", bgColor: "bg-yellow-100" };
      case "processing":
        return { textColor: "text-blue-500", label: "Processing", bgColor: "bg-blue-100" };
      case "confirmed":
        return { textColor: "text-green-500", label: "Confirmed", bgColor: "bg-green-100" };
      case "delivered":
        return { textColor: "text-purple-500", label: "Delivered", bgColor: "bg-purple-100" };
      case "canceled":
        return { textColor: "text-red-500", label: "Canceled", bgColor: "bg-red-100" };
      default:
        return { textColor: "text-gray-500", label: "Unknown", bgColor: "bg-gray-100" };
    }
  }

  const openModal = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/location/get/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedDeliveryBoy(id);
        filterLocationsByDate(data.locations);
      } else {
        console.error('Failed to fetch location');
        setLocation([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setLocation([]);
    }
  };

  const filterLocationsByDate = (locations) => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toDateString();
      const filteredLocations = locations.filter((location) => {
        const locationDate = new Date(location.timestamp);
        return locationDate.toDateString() === selectedDateString;
      });
      setLocation(filteredLocations);
    } else {
      setLocation([]);
    }
  };

  const closeModal = () => {
    setSelectedDeliveryBoy(null);
    setLocation([]);
  };

  const handleViewProduct = (product) => {
    setShowProductModel(true);
    setSelectedProduct(product);
    console.log(product);
  };

  return (
    <div className="flex bg-[#DBEAFE] min-h-screen lg:p-32 md:p-20 p-5 min-w-full relative">
      {selectedDeliveryBoy && locations.length > 0 && (

        <GoogleMapComponent locations={locations} onClose={closeModal} className="w-full h-64 md:h-auto" />

      )}
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

      {name === "superstockist" && (
        <div className="lg:p-5 xl:p-5 ml-0 p-0">
          <SuperStockistSideBar />
        </div>
      )}

      <div className="relative w-full lg:ml-96">


        <div className="absolute left-1/2 transform -translate-x-1/2 h-[70%] w-[4px] bg-gray-400 boder-4 lg:block md:block hidden"></div>
        <button
          className="fixed top-10 right-8 z-40 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
          onClick={() => navigate(-1)}
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            BACK
          </span>
        </button>

        <ul className="timeline relative list-none p-0 font-light">
          {/* Display Pan Shop Owner Details */}
          <li className="mb-10 w-full flex flex-col items-center md:flex-row md:justify-between">
            {/* Timeline Marker */}
            <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-3 shadow-lg border-2 border-white"></div>

            {/* Content Container */}
            <div className="bg-white shadow-lg border border-gray-300 w-full  p-6 relative rounded-lg">
              {/* Title */}
              <h4 className="text-blue-700 font-semibold text-lg mb-4 text-center">
                Pan Shop Owner: <span className="text-gray-800">{panShopOwnerName}</span>
              </h4>

              {/* Address Details */}
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-800">Address:</span> {panShopOwneraddress}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-800">State:</span> {panShopOwnerstate}
              </p>

              {
                (() => {
                  const { textColor, label, bgColor } = getStatusStyles(status);
                  return (
                    <p className={`text-gray-600 mb-3`}>
                      <span className="font-medium text-gray-800">Status:</span>
                      <span className={`${textColor} ${bgColor} border px-4 py-2 rounded-full`}>
                        {label}
                      </span>
                    </p>
                  );
                })()
              }


              {
                (() => {
                  const { textColor, label, bgColor } = getStatusStyles(deliveryBoyOrderStatus);
                  return (
                    <p className={`text-gray-600 mb-3`}>
                      <span className="font-medium text-gray-800">Delivery Boy Status:</span>
                      <span className={`${textColor} ${bgColor} border px-4 py-2 rounded-full`}>
                        {label}
                      </span>
                    </p>
                  );
                })()
              }

              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-800">OTP:</span> {otp}
              </p>

              <p className="text-gray-600 mb-3">
                <span className="font-semibold text-gray-800">Order Date:</span>{" "}
                <span className="text-gray-700">
                  {createdAt ? new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "Not Available"}
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Delivery Time:</span>{" "}
                {deliveryTime
                  ? new Date(deliveryTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "Not Available"}
              </p>

              <div className='flex justify-center items-center'>
                    <button
                      className="w-40 p-1 text-sm my-4  text-white  rounded-lg bg-blue-600 hover:bg-blue-800 transition-all duration-300"

                      onClick={() => setShowPanShowDetails(true)}>View Pan Show Details</button>
                  </div>

            </div>
          </li>


          {/* Display Products */}
          <li className="mb-8 w-full flex flex-col items-center md:flex-row md:justify-between relative">
            {/* Timeline Marker */}
            <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-2 shadow-md border-2 border-white"></div>

            {/* Content Container */}
            <div className="bg-white shadow-lg border border-gray-300 w-full p-6 relative rounded-lg">
              {/* Title */}
              <h4 className="text-blue-700 font-semibold text-xl mb-6 text-center">Products</h4>

              {/* Product List */}
              <ul className="space-y-4">
                {products?.map((product, index) => (
                  <li
                    key={index}
                    className="text-gray-700 hover:bg-gray-50 p-4 rounded-lg transition-all duration-300 flex justify-between items-center  hover:shadow-xl"
                  >
                    <div className="flex flex-col w-full">
                      <p className="font-medium text-gray-800 text-lg mb-2">{product?.productName}</p>
                      <p className="text-sm text-gray-500 mb-2">Quantity: {product.quantity}</p>
                      <p className="font-semibold text-green-600 text-lg">₹{product?.price}</p>

                    </div>

                    <div className="mt-2 flex-col items-center">
                      {/* Display product image if exists */}
                      {product?.image && (
                        <img
                          src={`${BASE_URL}/uploads/${product.image}`}
                          alt={product?.productName}
                          className="w-16 h-16 object-cover rounded-md transition-all duration-300 transform hover:scale-110"
                        />

                      )}
                      {/* Display "Add to Cart" button if product is not in cart */}

                      <button
                        className="w-full p-1 text-xs my-4  text-white  rounded-lg bg-blue-600 hover:bg-blue-800 transition-all duration-300"

                        onClick={() => handleViewProduct(product)}>View Product</button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total Price */}
              <p className="mt-6 text-right font-semibold text-gray-800 text-xl">
                Total Price: <span className="text-green-700">₹{totalPrice}</span>
              </p>
            </div>
          </li>



          {
            superStockistEmail && (

              <li className="mb-10 w-full flex flex-col items-center md:flex-row md:justify-between">
                {/* Timeline Marker */}
                <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-3 shadow-md border-2 border-white"></div>

                {/* Content Container */}
                <div className="bg-white shadow-lg border border-gray-300 w-full p-6 relative rounded-lg">
                  {/* Title */}
                  <h4 className="text-blue-700 font-semibold text-lg mb-4 text-center">
                    Super Stockist Status
                  </h4>

                  {/* Email */}
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium text-gray-800">Email:</span> {superStockistEmail}
                  </p>

                  {/* Status */}
                  {
                    (() => {
                      const { textColor, label, bgColor } = getStatusStyles(superStockistStatus);
                      return (
                        <p className={`text-gray-600 mb-3`}>
                          <span className="font-medium text-gray-800">Status:</span>
                          <span className={`${textColor} ${bgColor} border px-4 py-2 rounded-full`}>
                            {label}
                          </span>
                        </p>
                      );
                    })()
                  }

                  {/* Delivery Time */}
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Delivery Time:</span>{" "}

                    <span className="text-gray-700">
                      {createdAt ? new Date(superStockistdeliveryTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "Not Available"}
                    </span>
                  </p>
                  <div className='flex justify-center items-center'>
                    <button
                      className="w-32 p-1 text-sm my-4  text-white  rounded-lg bg-blue-600 hover:bg-blue-800 transition-all duration-300"

                      onClick={() => setShowSuperStockistModel(true)}>View Super Stockist Details</button>
                  </div>
                </div>
              </li>

            )
          }


          {superStockistdeliveryBoyId && (
            <li className="mb-10 w-full flex flex-col items-center md:flex-row md:justify-between relative">
              {/* Timeline Marker */}
              <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-3 shadow-lg border-2 border-white"></div>

              {/* Content Container */}
              <div className="bg-white shadow-lg border border-gray-300 w-full p-6 relative rounded-lg">
                {/* Title */}
                <h4 className="text-blue-700 font-semibold text-lg mb-4 text-center">
                  Super Stockist Delivery Boy Status
                </h4>


                {/* Delivery Boy Details */}

                <div className="mt-4">
                  <h5 className="font-semibold text-lg text-blue-600">Delivery Boy Details:</h5>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Name:</span> {superStockistdeliveryBoyId.username}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Email:</span> {superStockistdeliveryBoyId.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Phone:</span> {superStockistdeliveryBoyId.phoneNo}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Address:</span> {superStockistdeliveryBoyId.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">State:</span> {superStockistdeliveryBoyId.state}
                  </p>


                  {
                    (() => {
                      const { textColor, label, bgColor } = getStatusStyles(
                        superStockistStatus);
                      return (
                        <p className={`text-gray-600 mb-3`}>
                          <span className="font-medium text-gray-800">Status:</span>
                          <span className={`${textColor} ${bgColor} border px-4 py-2 rounded-full`}>
                            {label}
                          </span>
                        </p>
                      );
                    })()
                  }
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Delivery Time:</span>
                    <span className="text-gray-700">
                      {createdAt ? new Date(superStockistdeliveryTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "Not Available"}
                    </span>
                  </p>
                </div>

              </div>
            </li>
          )}



          {/* Display Stockist Status */}
          {
            stockistEmail && (
              <li className="mb-10 w-full flex flex-col items-center md:flex-row md:justify-between relative">
                {/* Timeline Marker */}
                <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-3 shadow-lg border-2 border-white"></div>

                {/* Content Container */}
                <div className="bg-white shadow-lg border border-gray-300 w-full  p-6 relative rounded-lg">
                  {/* Title */}
                  <h4 className="text-blue-700 font-semibold text-lg text-center mb-4">
                    Stockist Status
                  </h4>

                  {/* Stockist Details */}
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium text-gray-800">Email:</span> {stockistEmail}
                  </p>
                  {
                    (() => {
                      const { textColor, label, bgColor } = getStatusStyles(stockistStatus);
                      return (
                        <p className={`text-gray-600 mb-3`}>
                          <span className="font-medium text-gray-800">Status:</span>
                          <span className={`${textColor} ${bgColor} border px-4 py-2 rounded-full`}>
                            {label}
                          </span>
                        </p>
                      );
                    })()
                  }
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Delivery Time:</span>
                    <span className="text-gray-700">
                      {createdAt ? new Date(stockistdeliveryTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "Not Available"}
                    </span>
                  </p>
                  <div className='flex justify-center items-center'>
                    <button
                      className="w-32 p-1 text-sm my-4  text-white  rounded-lg bg-blue-600 hover:bg-blue-800 transition-all duration-300"

                      onClick={() => setShowStockist(true)}>View  Stockist Details</button>
                  </div>
                </div>
              </li>
            )
          }


          {
            deliveryBoyId && (
              <ul className="w-full">
                <li className="mb-10 w-full flex flex-col items-center md:flex-row md:justify-between relative">
                  {/* Timeline Marker */}
                  <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-3 shadow-lg border-2 border-white"></div>

                  {/* Content Container */}
                  <div className="bg-white shadow-lg border border-gray-300 w-full p-6 relative rounded-lg">
                    {/* Title */}
                    <h4 className="text-blue-700 font-semibold text-lg mb-4 text-center">
                      Stockist Delivery Boy Status
                    </h4>

                    {/* Delivery Boy Details */}
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium text-gray-800">Name:</span> {deliveryBoyId.username}
                    </p>
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium text-gray-800">Email:</span> {deliveryBoyId.email}
                    </p>
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium text-gray-800">Phone No:</span> {deliveryBoyId.phoneNo}
                    </p>
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium text-gray-800">Address:</span> {deliveryBoyId.address}, {deliveryBoyId.city}, {deliveryBoyId.state} - {deliveryBoyId.pinCode}
                    </p>

                    {
                      (() => {
                        const { textColor, label, bgColor } = getStatusStyles(deliveryBoyOrderStatus);
                        return (
                          <p className={`text-gray-600 mb-3`}>
                            <span className="font-medium text-gray-800">Status:</span>
                            <span className={`${textColor} ${bgColor} border px-4 py-2 rounded-full`}>
                              {label}
                            </span>
                          </p>
                        );
                      })()
                    }
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-800">Delivery Time:</span>{" "}
                      {deliveryTime
                        ? new Date(deliveryTime).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        : "Not Available"}
                    </p>
                    <div className='flex justify-center items-center gap-4 flex-wrap my-4'>
                      <Button className='text-center ' onClick={() => openModal(deliveryBoyId._id)}>Check Location</Button>
                      <DatePicker
                        selected={selectedDate}
                        placeholderText='Select  date'
                        onChange={(date) => {
                          setSelectedDate(date);
                          filterLocationsByDate(locations);
                        }}
                        className="border rounded p-2"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            )
          }
          {
            showProductModel && selectedProduct && (

              <ProductModelDeteails
                show={showProductModel}
                onClose={() => setShowProductModel(false)}
                product={selectedProduct}
              />
            )

          }
          {
            ShowSuperStockistModel && (

              <SuperStockistModel
                show={ShowSuperStockistModel}
                onClose={() => setShowSuperStockistModel(false)}
                superStockistEmail={superStockistEmail}
              />
            )

          }

          {
            showStockist && (

              <StockistDetailsModel
                show={showStockist}
                onClose={() => setShowStockist(false)}
                stockistEmail={stockistEmail}
              />
            )

          }

          {
            showPanShowDetails && (
              <PanShowDetailsModel 
              show={showPanShowDetails}
              onClose={() => setShowPanShowDetails(false)}
              panShowId={panShopOwner_id}
              />
            )
          }




        </ul>
      </div>

    </div>
  );
};
