
import React, { useState } from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styling
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
} from "react-icons/fa"; // Import required icons

import { RxCross1 } from "react-icons/rx";


import '../../Styles/Styles.css'
import logo from "../../assets/logo.png"
import { CiMenuBurger } from "react-icons/ci";

import { HiTemplate } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";

const Navbar = () => {

  const [open, setOpen] = useState(false); // State to control drawer
  const [showNavbar, setShowNavbar] = useState(false); // State to control navbar

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const location = useLocation();
  
  // Condition to determine when to show the sidebar
  const isOrderItemsRoute = location.pathname === '/orderItems';


  const toggleNavbar = () => {
    setShowNavbar(!showNavbar); // Toggle navbar visibility
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="navbar">
      <div
        className={`${
          isOrderItemsRoute
            ? ' top-12 right-2 '
            : ' top-3 right-2'
        } bg-slate-950 shadow-md rounded-md fixed h-6 w-6 flex justify-center items-center content-center menu-burger`}
      >
        <VscThreeBars
          className="text-white font-bold text-xl"
          onClick={toggleSidebar}
        />
      </div>
        {/* <div className= 'sidebar flex-col h-full '> */}
        <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''} flex-col h-full`}>
          <div className="sidebar-header">
            < RxCross1 className='menu-burger' onClick={toggleSidebar} />
            <img src={logo} alt="Logo" />
          </div>

          {/* <div className="sidebar-header p-4">
        <img src={logo} alt="Logo"/>  
      </div> */}
          <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6 Navlist ">
            <NavItem href="/supplier" icon={<FaTruck style={{ color: "#ffcc00", fontSize: "2rem" }} />} text="Supplier" />
            <NavItem href="/category" icon={<FaClipboardList style={{ color: "#ff6666", fontSize: "2rem" }} />} text="Category" />
            <NavItem href="/items" icon={<FaBoxOpen style={{ color: "#66cc99", fontSize: "2rem" }} />} text="Items" />
            <NavItem href="/purchases" icon={<FaMoneyBillAlt style={{ color: "#66ff66", fontSize: "2rem" }} />} text="Purchases" />
            <NavItem href="/itemStock" icon={<FaCog style={{ color: "#ff99cc", fontSize: "2rem" }} />} text="Item Stock" />
            <NavItem href="/products" icon={<FaTools style={{ color: "#cc99ff", fontSize: "2rem" }} />} text="Products" />
            <NavItem href="/productStock" icon={<FaWarehouse style={{ color: "#66cccc", fontSize: "2rem" }} />} text="Product Stock" />
            <NavItem href="/seller" icon={<FaUsers style={{ color: "#ff9966", fontSize: "2rem" }} />} text="Seller" />
            <NavItem href="/supplies" icon={<FaShoppingBasket style={{ color: "#66cc99", fontSize: "2rem" }} />} text="Supplies" />
            <NavItem href="/orders" icon={<FaShoppingCart style={{ color: "#ccccff", fontSize: "2rem" }} />} text="Orders" />
            <NavItem href="/sales" icon={<FaMoneyBillAlt style={{ color: "#ff6600", fontSize: "2rem" }} />} text="Sales" /> {/* Added Sales NavItem */}
            {/* <NavItem href="/superStockist" icon={<TbBuildingWarehouse   style={{ color: "#66cccc", fontSize: "2rem" }} />} text="SSOrder" /> Added Sales NavItem */}
            <NavItem href="/orderItems" icon={<HiTemplate style={{ color: "#66cccc", fontSize: "2rem" }} />} text="OrderItems" />
            {/* <NavItem href="/orderItems" icon={<HiTemplate style={{ color: "#66cccc", fontSize: "2rem" }} />} text="OrderItems" />  */}

          </ul>
        </div>
      </div>
    </>

  );
};

const NavItem = ({ href, icon, text }) => (
  <a href={href} className="flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full">
    <span className="flex items-center">
      <span className="mr-8 icon">{icon}</span> {/* Increased margin from mr-4 to mr-8 */}
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </a>
);

export default Navbar;

