import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaProductHunt, FaRunning } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ManagementSidebar from "./ManagementSidebar";
import ManagementSideBarModal from "./ManagementChart/ManagementSideBarModal";
import OrderChart from "./ManagementChart/OrderChart";
import OrderStateWise from "./OrderStateWise";
import OrderDetailsCityTaluka from "../Orders/OrderDetailsCityTaluka";
import Img from "../../assets/avataaars.png";
import { BASE_URL } from "../../constants";

const ManagementDashboard = () => {
  const [superStockist, setSuperStockist] = useState([]);
  const [stockist, setStockist] = useState([]);
  const [deliveryBoy, setDeliveryBoy] = useState([]);
  const [panShopDetails, setPanShopDetails] = useState([]);
  const [pendingOrder, setPendingOrder] = useState(0);
  const [confirmedOrder, setConfirmedOrder] = useState(0);
  const [deliveredOrder, setDeliveredOrder] = useState(0);
  const [orders, setOrders] = useState([]);
  const [fieldManager, setFieldManager] = useState([]);
  const [fieldManagerAdmin, setFieldManagerAdmin] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          superStockistRes,
          stockistRes,
          orderRes,
          deliveryBoyRes,
          panShopDetailsRes,
          fieldManager
        ] = await Promise.all([
          axios.get(`${BASE_URL}/api/superStockist/getAllUser`),
          axios.get(`${BASE_URL}/api/executives/getAlluser/`),
          axios.get(`${BASE_URL}/api/panshop/order/`),
          axios.get(`${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`),
          axios.get(`${BASE_URL}/api/panShopOwner/`),
          axios.get(`${BASE_URL}/api/fieldManager/getFieldManager`)
        ]);

        setSuperStockist(superStockistRes.data);
        setStockist(stockistRes.data);
        setOrders(orderRes.data);
        setDeliveryBoy(deliveryBoyRes.data);
        setPanShopDetails(panShopDetailsRes.data.data);
        const FieldManagers = fieldManager.data.filter((manager) => manager.role === "FieldManager");
        const FieldManagersAdmin = fieldManager.data.filter((manager) => manager.role === "Admin");
        setFieldManagerAdmin(FieldManagersAdmin);
        setFieldManager(FieldManagers);

        const today = new Date().toISOString().slice(0, 10);
        const todayOrders = orderRes.data.filter(
          (order) => order.createdAt.slice(0, 10) === today
        );

        setPendingOrder(
          todayOrders.filter((order) => order.status === "pending").length
        );
        setConfirmedOrder(
          todayOrders.filter((order) => order.status === "confirmed").length
        );
        setDeliveredOrder(
          todayOrders.filter((order) => order.status === "delivered").length
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalOrder = orders.length;
  const sortedProducts = orders.sort((a, b) => b.totalPrice - a.totalPrice);
  const top5Products = sortedProducts.slice(0, 5);

  if (!superStockist.length) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen bg-blue-300">
        <ManagementSidebar />
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex gap-6 bg-blue-100 w-full">
      <div className="h-screen hidden md:block lg:block">
        <ManagementSidebar />
      </div>
      <div className="lg:ml-80 md:ml-40 font-serif w-full lg:p-10 md:p-5">
        <div className="flex items-center flex-wrap justify-center lg:justify-end gap-5 h-44 bg-blue-300 rounded-xl">
          <Avatar alt="User Avatar" src={Img} />
          <p className="lg:text-2xl md:text-xl text-sm font-bold border-4 border-blue-400 p-2 rounded-lg bg-blue-100">
            {localStorage.getItem("email")}
          </p>
          <div className="lg:hidden md:hidden block">
            <ManagementSideBarModal />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-10">
          {[
            { title: "Today Order", value: pendingOrder, icon: FaProductHunt },
            { title: "On Going", value: confirmedOrder, icon: FaRunning },
            { title: "Completed Order", value: deliveredOrder, icon: MdIncompleteCircle },
            { title: "Total Order", value: totalOrder, icon: TbTruckDelivery },
          ].map(({ title, value, icon: Icon }, idx) => (
            <div
              key={idx}
              className="w-full rounded-lg h-40 bg-blue-800 p-5 flex flex-col justify-center items-center text-white"
            >
              <h1 className="text-2xl font-semibold">{title}</h1>
              <div className="flex items-center gap-2 text-4xl">
                <Icon />
                <span>{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* User Details and Charts */}
        <div className="lg:flex gap-5 my-8">
          <div className="bg-blue-800 text-white p-5 rounded-lg w-full">
            <h1 className="text-2xl bg-blue-300 p-3 rounded-lg my-4">Users</h1>
            {[
              { name: "SuperStockist", count: superStockist.length, link: "/superstockistDetails" },
              { name: "Stockist", count: stockist.length, link: "/stockistDetails" },
              { name: "Delivery Boy", count: deliveryBoy.length, link: "/deliveryboyDetails" },
              { name: "PanShop", count: panShopDetails.length, link: "/panshowDetails" },
              { name: "Field Executive Approval", count: fieldManagerAdmin.length, link: "/mange/fieldManagerAdmin" },
              { name: "Field Executive", count: fieldManager.length, link: "/manage/field/manager" },
            ].map(({ name, count, link }, idx) => (
              <Link
                key={idx}
                to={link}
                className="flex justify-between items-center p-3 hover:bg-blue-300 rounded-lg"
              >
                <span>{name}</span>
                <span>{count}</span>
              </Link>
            ))}
          </div>

          <div className="bg-blue-800 text-white p-5 rounded-lg w-full">
            <h1 className="text-2xl bg-blue-300 p-3 rounded-lg">Top Products</h1>
            {top5Products.map((product, idx) => (
              <div key={idx} className="flex justify-between p-2">
                <span>{product.products[0]?.productName}</span>
                <span>₹{product.totalPrice}</span>
              </div>
            ))}
          </div>

          <div className="w-full my-8">
            <OrderChart product={orders} />
          </div>
        </div>

        <OrderStateWise />
        <div className="w-full my-8">
        <OrderDetailsCityTaluka />
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
