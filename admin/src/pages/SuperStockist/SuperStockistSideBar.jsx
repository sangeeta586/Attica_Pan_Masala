import React, { useState } from "react";
import "./SuperStockistSideBar.css"; // Assuming you have a CSS file for styling
import { RxCross1 } from "react-icons/rx";
import "../../Styles/Styles.css";
import logo from "../../assets/logo.png";

import { MdOutlineDeliveryDining, MdDashboard } from "react-icons/md"; // Icons for Delivery and Dashboard
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation for active route
import { VscThreeBars } from "react-icons/vsc";
import { FiLogOut, FiUser } from "react-icons/fi"; // Icons for Logout and Profile
import { HiTemplate } from "react-icons/hi"; // Import HiTemplate



export const SuperStockistSideBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handlelogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="top-3 right-2 bg-slate-950 shadow-md rounded-md fixed h-6 w-6 flex justify-center items-center content-center menu-burger">
          <VscThreeBars
            className="text-white font-bold text-xl"
            onClick={toggleSidebar}
          />
        </div>

        <div
          className={`sidebar-container ${
            showSidebar ? "show-sidebar" : ""
          } flex-col h-full transition-all duration-300 ease-in-out`}
        >
          <div className="sidebar-header">
            <RxCross1 className="menu-burger" onClick={toggleSidebar} />
            <img src={logo} alt="Logo" />
          </div>

          <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6 Navlist">
            <NavItem
              href="/SuperStockist-Order"
              icon={
                <MdDashboard style={{ color: "#66cccc", fontSize: "2rem" }} />
              }
              text="Dashboard"
              activeRoute={location.pathname}
            />
            {/* <NavItem href="/superStockitDetailsDeliveryboyDetails" icon={<HiTemplate style={{ color: "#66cccc", fontSize: "2rem" }} />} text="My Order" activeRoute={location.pathname} />   */}
             <NavItem href="/superStockitDetailsDeliveryboyDetails" icon={<MdOutlineDeliveryDining style={{ color: "#66cccc", fontSize: "2rem" }} />} text="Delivery Details" activeRoute={location.pathname} />
            <NavItem
              href={"#"}
              icon={
                <FiLogOut
                  style={{
                    color: "#66cccc",
                    fontSize: "2rem",
                  }}
                />
              }
              text="Logout"
              onClick={handlelogOut}
              isButton
            />
          </ul>
        </div>
      </div>
    </>
  );
};

const NavItem = ({
  href,
  icon,
  text,
  onClick,
  isButton = false,
  activeRoute,
}) => {
  const isActive = href === activeRoute; // Compare the current path with the href

  const activeClass = isActive ? "bg-blue-500 text-white" : ""; // Add active background class

  if (isButton) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full ${activeClass}`}
      >
        <span className="flex items-center">
          <span className="mr-8 icon">{icon}</span>
          <span className="text-lg font-semibold">{text}</span>
        </span>
      </button>
    );
  }

  return (
    <a
      href={href}
      className={`flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full ${activeClass}`}
    >
      <span className="flex items-center">
        <span className="mr-8 icon">{icon}</span>
        <span className="text-lg font-semibold">{text}</span>
      </span>
    </a>
  );
};
