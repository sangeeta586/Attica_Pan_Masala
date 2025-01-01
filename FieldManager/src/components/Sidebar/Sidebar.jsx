import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

import logo from "../../assets/attica-logo.png";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { GiShop, GiGlassBall } from "react-icons/gi";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import FieldManagerLocation from "../FieldManagerLocation";
import axios from "axios";

// Utility function to assign icons based on names
const getIconByName = (name) => {
  const icons = {
    Dashboard: <RxDashboard style={{ color: "#eab308", fontSize: "2rem" }} />,
    Showcase: <GiGlassBall style={{ color: "#eab308", fontSize: "2rem" }} />,
    "Show Case Report": (
      <GiGlassBall style={{ color: "#eab308", fontSize: "2rem" }} />
    ),
    Logout: <FaSignOutAlt style={{ color: "gray", fontSize: "2rem" }} />,
  };
  return (
    icons[name] || <RxDashboard style={{ color: "gray", fontSize: "2rem" }} />
  );
};

const Sidebar = ({ onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVendorMenuOpen, setIsVendorMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const URI = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("fieldManager_Id");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
    if (onClose) {
      onClose();
    }
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Ensure the URL is properly formed
      const resp = await axios.post(`${URI}/api/fieldManager/logout/${userId}`); // Correct URL structure

      // Clear the localStorage after successful logout
      localStorage.clear();

      // Optionally, handle any other cleanups here

      // Redirect to the home page or login page
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error, e.g., show a notification or message
    }
  };

  const getRouteWidth = () => {
    return location.pathname === "/fieldManagerDashboard" ? "100%" : "80%";s
  };

  const menuItems = [
    { text: "Dashboard", route: "/fieldManagerDashboard" },
    { text: "Showcase", route: "/showcase" },
    { text: "Show Case Report", route: "/showcaseList" },
  ];

  const vendorMenuItems = [
    { text: "Add New Vendor", route: "/Add-New-Vendor" },
    { text: "Vendor not Intrested", route: "/vendor-not-intrested" },
    { text: "Pending Verification", route: "/Pending-Verification" },
    // { text: "Verified Vendor", route: "/Verified-Vender" },
  ];

  return (
    <>
      <FieldManagerLocation />

      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-10 left-8 z-50 ${
          isSidebarOpen ? "" : "bg-[#1e40af]"
        } text-white p-3 rounded-full shadow-md`}
      >
        {isSidebarOpen ? "" : <FaBars />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full ${getRouteWidth()} lg:w-80 bg-white text-black shadow-gray-400 border-r border-gray-200 transition-transform duration-300 shadow-md ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static z-40`}
        style={{
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="sidebar-header p-6 flex items-center justify-between bg-gray-600">
          <img src={logo} alt="Logo" className="w-3/4 h-auto" />
          <button
            onClick={toggleSidebar}
            className={`lg:hidden text-white p-2 rounded-full shadow-md ${
              isSidebarOpen ? "bg-red-700" : ""
            }`}
          >
            {isSidebarOpen ? <IoCloseSharp /> : <FaBars />}
          </button>
        </div>

        <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6">
          {menuItems.map((item, index) => (
            <NavItem
              key={index}
              icon={getIconByName(item.text)}
              text={item.text}
              onClick={() => handleItemClick(item.route)}
            />
          ))}

          <div>
            <div
              className="nav-item flex items-center p-4 transition duration-300 ease-in-out hover:bg-gray-700 rounded-full mb-2 cursor-pointer m-3"
              onClick={() => setIsVendorMenuOpen(!isVendorMenuOpen)}
            >
              <span className="flex items-center w-full">
                <span className="mr-2">
                  <GiShop style={{ color: "#eab308", fontSize: "2rem" }} />
                </span>
                <span className="text-lg font-semibold">Vendors</span>
                <span className="ml-auto">
                  {isVendorMenuOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                </span>
              </span>
            </div>
            {isVendorMenuOpen && (
              <div className="ml-4">
                {vendorMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className="nav-item w-full flex items-center p-4 transition duration-300 ease-in-out hover:bg-gray-700 rounded-full cursor-pointer"
                    onClick={() => handleItemClick(item.route)}
                  >
                    <span className="mr-2">
                      <GiShop
                        style={{ color: "#eab308", fontSize: "1.5rem" }}
                      />
                    </span>
                    <span className="text-md font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <LogoutItem
            icon={getIconByName("Logout")}
            text="Logout"
            onClick={handleLogout}
          />
        </ul>
      </div>
    </>
  );
};

const NavItem = ({ icon, text, onClick }) => (
  <div
    className="nav-item flex items-center p-4 transition duration-300 ease-in-out hover:bg-gray-700 rounded-full mb-2 cursor-pointer m-3"
    onClick={onClick}
  >
    <span className="flex items-center w-full">
      <span className="mr-2">{icon}</span>
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </div>
);

const LogoutItem = ({ icon, text, onClick }) => (
  <div
    className="nav-item flex items-center p-4 transition duration-300 ease-in-out hover:bg-gray-700 rounded-full mb-4 cursor-pointer m-3"
    onClick={onClick}
  >
    <span className="flex items-center w-full">
      <span className="mr-2">{icon}</span>
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </div>
);

export default Sidebar;
