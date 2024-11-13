import React, { useEffect, useState } from "react";
import ManagementSidebar from "./ManagementSidebar";
import axios from "axios";
import { FaProductHunt, FaRunning } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import OrderChart from "./ManagementChart/OrderChart";
import OrderStateWise from "./OrderStateWise";
import { Avatar, Button } from "@material-tailwind/react";
import Img from "../../assets/avataaars.png";
import ManagementSideBarModal from "./ManagementChart/ManagementSideBarModal";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import OrderDetailsCityTaluka from "../Orders/OrderDetailsCityTaluka";

const ManagementDashboard = () => {
  const [SuperStockist, setSuperStockist] = useState([]);
  const [Stockist, setStockist] = useState([]);
  const [DeliveryBoy, setDeliveryBoy] = useState([]);
  const [panShopDetils, setPanShopDetils] = useState([]);
  const [pendingOrder, setPendingOrder] = useState(0);
  const [confirmedOrder, setConfirmedOrder] = useState(0);
  const [deliveredOrder, setDeliveredOrder] = useState(0);
  const [Order, setOrder] = useState([]);
  let TodayOrder = pendingOrder + confirmedOrder + deliveredOrder;
  let totalOrder = Order.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          superStockistRes,
          stockistRes,
          orderRes,
          deliveryBoyRes,
          panShopDetailsRes,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/api/superStockist/getAllUser`),
          axios.get(`${BASE_URL}/api/executives/getAlluser/`),
          axios.get(`${BASE_URL}/api/panshop/order/`),
          axios.get(`${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`),
          axios.get(`${BASE_URL}/api/panShopOwner/`),
        ]);

        setSuperStockist(superStockistRes.data);
        setStockist(stockistRes.data);
        setPanShopDetils(panShopDetailsRes.data.data);
        setDeliveryBoy(deliveryBoyRes.data);
        setOrder(orderRes.data);

        const today = new Date().toISOString().slice(0, 10);
        const todayOrders = orderRes.data.filter(
          (order) => order.createdAt.slice(0, 10) === today
        );

        const totalTodayProduct = todayOrdersreduce((acc, order) => {
          return (
            acc + order.products.reduce((sum, item) => sum + item.quantity, 0)
          );
        }, 0);

        setPendingOrder(
          todayOrdersfilter((order) => order.status === "pending").length
        );
        setConfirmedOrder(
          todayOrdersfilter((order) => order.status === "confirmed").length
        );
        setDeliveredOrder(
          todayOrdersfilter((order) => order.status === "delivered").length
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const sortedProducts = Order.sort((a, b) => b.totalPrice - a.totalPrice);
  const top5Products = sortedProducts.slice(0, 5);

  console.log("top5Products", top5Products);

  if (!SuperStockist.length) {
    return (
      <div className="flex justify-center content-center items-center flex-col min-h-screen bg-blue-300">
        <ManagementSidebar />
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <div className=" flex gap-6 bg-blue-100 w-full">
        <div className="h-screen md:block lg:block hidden">
          <ManagementSidebar />
        </div>

        <div className="  lg:ml-80 md:ml-40  font-serif w-full lg:p-10 md:p-5 p-21 ">
          <div className="flex items-center flex-wrap lg:justify-end md:justify-end justify-center lg:gap-10 md:gap-5 gap-1 h-44 bg-blue-300  rounded-xl lg:my-10 md:my-5 my-2 ">
            <Avatar className="" alt="Remy Sharp" src={Img} />
            <p className="lg:text-2xl md:text-xl text-sm font-bold border-4 border-blue-400 p-2 rounded-lg bg-blue-100 mr-4">
              {localStorage.getItem("email")}
            </p>
            <div className="lg:hidden md:hidden block">
              <ManagementSideBarModal />
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-4 gap-4  md:grid-cols-2  ">
            <div className="w-full rounded-lg h-40 bg-blue-800 p-5 mb-4 rotate-x-180">
              <h1 className="text-white text-2xl text-center font-semibold">
                <p> Today Order</p>
                <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                  <FaProductHunt /> <p className="text-3xl">{TodayOrder}</p>
                </div>
              </h1>
            </div>
            <div className="w-full rounded-lg h-40 bg-blue-800 p-5 mb-4 rotate-x-180">
              <h1 className="text-white text-2xl text-center font-semibold">
                <p> On Going</p>
                <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                  <FaRunning /> <p className="text-3xl">{confirmedOrder}</p>
                </div>
              </h1>
            </div>
            <div className="w-full rounded-lg h-40 bg-blue-800 p-5 mb-4 rotate-x-180">
              <h1 className="text-white text-2xl text-center font-semibold">
                <p> Completed Order</p>
                <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                  <MdIncompleteCircle />{" "}
                  <p className="text-3xl">{deliveredOrder}</p>
                </div>
              </h1>
            </div>
            <div className="w-full rounded-lg h-40 bg-blue-800 p-5 mb-4 rotate-x-180">
              <h1 className="text-white text-2xl text-center font-semibold  ">
                <p>Total Order</p>
                <div className="flext justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                  <TbTruckDelivery /> <p className="text-3xl">{totalOrder}</p>
                </div>
              </h1>
            </div>
          </div>
          <div className="lg:flex gap-5 md:flex block content-center items-center mb-4">
            <div className="w-full min-h-96 bg-blue-800 rounded-lg px-5 font-serif py-4 mb-4">
              <div className="text-white text-2xl  bg-blue-300 px-4 rounded-lg py-2 font-semibold  flex justify-between content-center items-center mb-2 ">
                <p>User</p>
                <p>No of User</p>
              </div>
              <Link
                to="/superstockistDetails"
                className="text-white text-lg flex justify-between content-center items-center mb-2 px-6 hover:bg-blue-300 rounded-lg cursor-pointer no-underline"
              >
                <p className="text-white text-2xl font-semibold">
                  SuperStockist
                </p>
                <p className="text-white text-2xl font-semibold">
                  {SuperStockist?.length}
                </p>
              </Link>

              <Link
                to="/stockistDetails"
                className="text-white text-xl font-semibold  flex justify-between content-center items-center  mb-2 px-6 hover:bg-blue-300 rounded-lg cursor-pointer"
              >
                <p className="text-white text-2xl font-semibold">Stockist</p>
                <p className="text-white text-2xl font-semibold">
                  {Stockist?.length}
                </p>
              </Link>
              <Link
                to="/deliveryboyDetails"
                className="text-white text-xl font-semibold  flex justify-between content-center items-center mb-2 px-6 hover:bg-blue-300 rounded-lg cursor-pointer"
              >
                <p className="text-white text-2xl font-semibold">
                  Delivery Boy
                </p>
                <p className="text-white text-2xl font-semibold">
                  {DeliveryBoy?.length}
                </p>
              </Link>
              <Link
                to="/panshowDetails"
                className="text-white text-xl font-semibold  flex justify-between content-center items-center mb-2 px-6 hover:bg-blue-300 rounded-lg cursor-pointer"
              >
                <p className="text-white text-2xl font-semibold">PanShop</p>
                <p className="text-white text-2xl font-semibold">
                  {panShopDetils?.length}
                </p>
              </Link>
            </div>

            <div className="w-full min-h-96 bg-blue-800 rounded-lg px-5 font-serif py-4 mb-4">
              <h1 className="text-white text-2xl bg-blue-300 px-4 rounded-lg py-2 font-semibold flex justify-between content-center items-center mb-2">
                <p>Top product sell</p>
              </h1>
              {top5Products?.map((product, index) => (
                <div key={index} className="mb-4">
                  <h1 className="text-white lg:text-xl md:text-lg text-base font-semibold flex justify-between content-center items-center mb-2 px-6">
                    <p className="text-clip-1">
                      {/* Show only the first product name if there are multiple */}
                      {
                        product.products.length > 1
                          ? product.products[0].productNames // Show the first product name
                          : product.products[0]?.productNames // If there's only one, display that
                      }
                    </p>
                    <p>rs{product.totalPrice}</p>
                  </h1>
                </div>
              ))}
            </div>

            <div className="w-full min-h-96  rounded-lg  font-serif  mb-4">
              <OrderChart product={Order} />
            </div>
          </div>
          <div className="w-full min-h-96 rounded-lg  font-serif py-4 my-4  ">
            <OrderStateWise />
          </div>

          <div className="w-full min-h-96 rounded-lg  font-serif py-4 my-4  ">
            <OrderDetailsCityTaluka />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementDashboard;
