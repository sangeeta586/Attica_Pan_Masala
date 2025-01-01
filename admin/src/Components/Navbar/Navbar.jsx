import React, { useState } from "react";
import { MdExitToApp, MdDashboard } from "react-icons/md";
import {
  FaTruck,
  FaClipboardList,
  FaBoxOpen,
  FaMoneyBillAlt,
  FaCog,
  FaTools,
  FaWarehouse,
  FaUsers,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { VscThreeBars } from "react-icons/vsc";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to control drawer
  const [showNavbar, setShowNavbar] = useState(false); // State to control navbar
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = () => {
    localStorage.removeItem("email"); // Remove email from localStorage
    navigate("/"); // Navigate to homepage after logout
  };

  // Mapping for NavItem text and icons
  const iconMap = {
    Dashboard: <MdDashboard style={{ color: "#ffcc00", fontSize: "2rem" }} />,
    DeliveryBoy: <FaTruck style={{ color: "#ffcc00", fontSize: "2rem" }} />,
    OrderItems: <HiTemplate style={{ color: "#66cccc", fontSize: "2rem" }} />,
    Sales: <FaMoneyBillAlt style={{ color: "#ff6600", fontSize: "2rem" }} />,
    Products: <FaTools style={{ color: "#cc99ff", fontSize: "2rem" }} />,
    Category: <FaClipboardList style={{ color: "#ff6666", fontSize: "2rem" }} />,
    ItemStock: <FaBoxOpen style={{ color: "#66cc99", fontSize: "2rem" }} />,
    ItemPurchases: <FaMoneyBillAlt style={{ color: "#66ff66", fontSize: "2rem" }} />,
    ProductStock: <FaWarehouse style={{ color: "#66cccc", fontSize: "2rem" }} />,
    Seller: <FaUsers style={{ color: "#ff9966", fontSize: "2rem" }} />,
    Supplies: <FaShoppingBasket style={{ color: "#66cc99", fontSize: "2rem" }} />,
    Orders: <FaShoppingCart style={{ color: "#ccccff", fontSize: "2rem" }} />,
  };

  const isOrderItemsRoute = location.pathname === "/orderItems";

  return (
    <>
      <div className="navbar">
        <div
          className={`${
            isOrderItemsRoute ? " top-12 right-2 " : " top-3 right-2"
          } bg-slate-950 shadow-md rounded-md fixed h-6 w-6 flex justify-center items-center content-center menu-burger`}
        >
          <VscThreeBars
            className="text-white font-bold text-xl"
            onClick={toggleSidebar}
          />
        </div>
        <div
          className={`sidebar-container ${showSidebar ? "show-sidebar" : ""} flex-col h-full`}
        >
          <div className="sidebar-header">
            <RxCross1 className="menu-burger" onClick={toggleSidebar} />
            <img src={logo} alt="Logo" />
          </div>

          <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6 Navlist">
            <NavItem href="/ExecutiveDashBoard" icon={iconMap.Dashboard} text="DashBoard" />
            <NavItem href="/deliveryboys" icon={iconMap.DeliveryBoy} text="Delivery Boy" />
            <NavItem href="/orderItems" icon={iconMap.OrderItems} text="My Order" />
            {/* <NavItem href="/sales" icon={iconMap.Sales} text="Sales" />
            <NavItem href="/products" icon={iconMap.Products} text="Products" />
            <NavItem href="/category" icon={iconMap.Category} text="Category" />
            <NavItem href="/itemStock" icon={iconMap.ItemStock} text="Item Stock" />
            <NavItem href="/itemPurchases" icon={iconMap.ItemPurchases} text="Item Purchases" />
            <NavItem href="/productStock" icon={iconMap.ProductStock} text="Product Stock" />
            <NavItem href="/seller" icon={iconMap.Seller} text="Seller" />
            <NavItem href="/supplies" icon={iconMap.Supplies} text="Supplies" />
            <NavItem href="/orders" icon={iconMap.Orders} text="Orders" /> */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg"
            >
              <MdExitToApp
                style={{
                  color: "#ffcc00",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              />
              <span
                style={{
                  color: "#EF4444",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
              >
                Logout
              </span>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full"
  >
    <span className="flex items-center">
      <span className="mr-8 icon">{icon}</span>
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </a>
);

export default Navbar;
