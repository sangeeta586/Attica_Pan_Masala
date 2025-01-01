import React, { useState, useEffect } from "react";
import "../../../../../src/Styles/Dashboard.css";

import { Avatar, Button } from "@material-tailwind/react";
import Img from "../../../../assets/avataaars.png";
import BarChart from "../../../../utils/Charts/BarChart";
import { BASE_URL } from "../../../../constants";

function StockistDashBoard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [todayOrderCount, setTodayOrderCount] = useState(0);
  const [monthlyOrderCount, setMonthlyOrderCount] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem("stockistEmail");
        if (!email) {
          console.error("No user logged in");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/panshop/order`);
        const data = await response.json();

        // Filter orders for the logged-in stockist
        const userOrders = data.filter(
          (order) => order.stockistEmail === email
        );

        // Count total orders and products
        const totalOrders = userOrders.length;
        const totalProducts = userOrders.reduce(
          (sum, order) =>
            sum +
            order.products.reduce(
              (productSum, product) => productSum + product.quantity,
              0
            ),
          0
        );

        // Calculate today's orders
        const today = new Date().toLocaleDateString();
        const todayOrders = userOrders.filter(
          (order) => new Date(order.updatedAt).toLocaleDateString() === today
        );

        // Calculate monthly orders
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyOrders = userOrders.filter((order) => {
          const orderDate = new Date(order.updatedAt);
          return (
            orderDate.getMonth() === currentMonth &&
            orderDate.getFullYear() === currentYear
          );
        });

        // Calculate total sales and monthly sales
        const totalRevenue = userOrders.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );
        const monthRevenue = monthlyOrders.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );

        // Calculate today's sales
        const todayRevenue = todayOrders.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );

        // Set state
        setOrderCount(totalOrders);
        setProductCount(totalProducts);
        setTodayOrderCount(todayOrders.length);
        setMonthlyOrderCount(monthlyOrders.length);
        setTodaySales(todayRevenue);
        setTotalSales(totalRevenue);
        setMonthlySales(monthRevenue);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f2edf3] ml-80">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-xl mx-4 lg:mx-10 my-6 p-6 lg:h-44">
        <Avatar
          alt="User Avatar"
          src={Img}
          className="w-16 h-16 lg:w-20 lg:h-20"
        />
        {/* <p className="font-medium text-xl text-black-400">{new Date().toLocaleDateString()}</p> */}
        <div className="text-center">
          <p className="text-lg lg:text-2xl font-bold text-white">
            {localStorage.getItem("stockistEmail")}
          </p>
          <Button color="red" onClick={handleLogout} className="text-md mt-4">
            Logout
          </Button>
        </div>
      </div>
      <div className="container mx-auto bg-[#f9f9f9] p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-white p-6 rounded-lg shadow-lg gap-6">
            <p className="font-medium text-lg text-gray-600">Today's Sales</p>
            <p className="font-bold text-2xl text-green-500">₹ {todaySales}</p>
          </div>
          <div className="card bg-white p-6 rounded-lg shadow-lg gap-6">
            <p className="font-medium text-lg text-gray-600">Total Sales</p>
            <p className="font-bold text-2xl text-green-500">₹ {totalSales}</p>
          </div>
          <div className="card bg-white p-6 rounded-lg shadow-lg gap-6">
            <p className="font-medium text-lg text-gray-600">Monthly Sales</p>
            <p className="font-bold text-2xl text-green-500">
              ₹ {monthlySales}
            </p>
          </div>

          <div className="card bg-white p-6 rounded-lg shadow-lg gap-6">
            <p className="font-medium text-lg text-gray-600">Monthly Orders</p>
            <p className="font-bold text-2xl text-blue-500">
              {monthlyOrderCount}
            </p>
          </div>
          <div className="card bg-white p-6 rounded-lg shadow-lg gap-6">
            <p className="font-medium text-lg text-gray-600">Total Orders</p>
            <p className="font-bold text-2xl text-blue-500">{orderCount}</p>
          </div>
          <div className="card bg-white p-6 rounded-lg shadow-lg gap-6">
            <p className="font-medium text-lg text-gray-600">Today's Orders</p>
            <p className="font-bold text-2xl text-blue-500">
              {todayOrderCount}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <BarChart monthlyOrderCount={monthlyOrderCount} />
        </div>
      </div>
    </div>
  );
}

export default StockistDashBoard;
