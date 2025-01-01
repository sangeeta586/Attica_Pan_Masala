import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ManagementSidebar.css";
import "../../Styles/Styles.css";
import logo from "../../assets/logo.png";
import { FaShoppingCart, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import {
 
  MdOutlineDeliveryDining,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { TbReport } from "react-icons/tb";

const ManagementSidebar = ({ onClose }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [manageDropdown, setManageDropdown] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [trackerDropdown, setTrackerDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const togglemanageDropdown = () => setManageDropdown(!manageDropdown);
  const toggleShopDropdown = () => setShopDropdown(!shopDropdown);
  const toggleTrackerDropdown = () => setTrackerDropdown(!trackerDropdown);
  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
    if (onClose) {
      onClose();
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar flex flex-col h-full w-64 bg-gray-800 text-black shadow-lg">
      <div className="sidebar-header p-4 flex items-center justify-center bg-gray-900">
        <img src={logo} alt="Logo" className="w-full h-full" />
      </div>
      <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6 ">
        <NavItem
          icon={<RxDashboard style={{ color: "#eab308", fontSize: "2rem" }} />}
          text="Dashboard"
          onClick={() => handleItemClick("/managementDashboard")}
        />
        <NavItem
          icon={
            <FaShoppingCart style={{ color: "#047857", fontSize: "2rem" }} />
          }
          text="Orders"
          onClick={() => handleItemClick("/orderHistory")}
        />
        <div className="relative" ref={dropdownRef}>
          <span
            className="nav-item nav-item-dropdown flex items-center gap-4 cursor-pointer p-4 transition duration-300 ease-in-out transform rounded-full mb-2"
            onClick={toggleDropdown}
          >
            <FaUserPlus style={{ color: "violet", fontSize: "2rem" }} />
            <span className="text-lg font-semibold">Registrations</span>
          </span>
          {showDropdown && (
            <div className="flex justify-start ml-10 flex-col font-semibold text-xl text-black">
              <DropdownItem
                text="Super Stockist"
                onClick={() => handleItemClick("/superstockistDetails")}
              />
              <DropdownItem
                text="Stockist"
                onClick={() => handleItemClick("/stockistDetails")}
              />
              <DropdownItem
                text="Delivery Boy"
                onClick={() => handleItemClick("/deliveryboyDetails")}
              />

              {/* <DropdownItem
                text="Field Manager"
                onClick={() => handleItemClick("/ListofregisteredFieldManager")}
              /> */}

              <DropdownItem
                text="Field Executive Approval"
                onClick={() => handleItemClick("/Field-Executive-Approval")}
              />
              {/* 
              <DropdownItem
                text=" Area Seal Manager "
                onClick={() => handleItemClick("/AreaSealManagerDetails")}
              /> */}
            </div>
          )}
        </div>

        <div className="relative">
          <span
            className="nav-item nav-item-dropdown flex items-center gap-4 cursor-pointer p-4 transition duration-300 ease-in-out transform rounded-full mb-2"
            onClick={togglemanageDropdown}
          >
            <MdOutlineManageAccounts
              style={{ color: "#047857", fontSize: "2rem" }}
            />
            <span className="text-lg font-semibold">Manage Users</span>
          </span>
          {manageDropdown && (
            <div className="flex justify-start ml-10 flex-col font-semibold text-xl text-black">
              <DropdownItem
                text="Super Stockist"
                onClick={() => handleItemClick("/manage/superStockit")}
              />
              <DropdownItem
                text="Stockist"
                onClick={() => handleItemClick("/manage/stockit")}
              />
              <DropdownItem
                text="Field Executive"
                onClick={() => handleItemClick("/manage/Field-Executive")}
              />
              <DropdownItem
                text="Field Executive Approval"
                onClick={() => handleItemClick("/mange/Field-Executive-Approval")}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <span
            className="nav-item nav-item-dropdown flex items-center gap-4 cursor-pointer p-4 transition duration-300 ease-in-out transform rounded-full mb-2"
            onClick={toggleShopDropdown}
          >
            <GiShop style={{ color: "#047857", fontSize: "2rem" }} />
            <span className="text-lg font-semibold">Shop Details</span>
          </span>
          {shopDropdown && (
            <div className="flex justify-start ml-10 flex-col font-semibold text-xl text-black">
              <DropdownItem
                text="Pan Shop Details"
                onClick={() => handleItemClick("/panshowDetails")}
              />
              {/* <DropdownItem
                text="Inspection Shop"
                onClick={() => handleItemClick("/management/inspection/shop")}
              /> */}
              
            </div>
          )}
        </div>

        <div className="relative">
          <span
            className="nav-item nav-item-dropdown flex items-center gap-4 cursor-pointer p-4 transition duration-300 ease-in-out transform rounded-full mb-2"
            onClick={toggleTrackerDropdown}
          >
            <MdOutlineDeliveryDining
              style={{ color: "blue", fontSize: "2rem" }}
            />
            <span className="text-lg font-semibold">Trackers</span>
          </span>
          {trackerDropdown && (
            <div className="flex justify-start ml-10 flex-col font-semibold text-xl text-black">
              <DropdownItem
                text="Delivery Tracker"
                onClick={() => handleItemClick("/deliveryBoyTracker")}
              />
              {/* <DropdownItem
                text="Area Seal Manager"
                onClick={() => handleItemClick("/areaManagerTracker")}
              /> */}
              <DropdownItem
                text="Field Executive"
                onClick={() => handleItemClick("/field-executive/details")}
              />
            </div>
          )}
        </div>

        {/* <NavItem
          icon={<TbReport style={{ color: "red", fontSize: "2rem" }} />}
          text="ShowCase"
          onClick={() => handleItemClick("/showCase")}
        /> */}

        {/* <NavItem
          icon={<MdSos style={{ color: "red", fontSize: "2rem" }} />}
          text="SOS"
          onClick={() => handleItemClick("/sos-homepage")}
        /> */}

        {/* <NavItem
          icon={<GiShop style={{ color: "green", fontSize: "2rem" }} />}
          text="Pan Shop Details"
          onClick={() => handleItemClick("/panshowDetails")}
        /> */}
        <NavItem
          icon={<FaUserPlus style={{ color: "green", fontSize: "2rem" }} />}
          text="Create Product"
          onClick={() => handleItemClick("/productadded")}
        />
        <LogoutItem
          icon={<FaSignOutAlt style={{ color: "gray", fontSize: "2rem" }} />}
          text="Logout"
          onClick={handleLogout}
        />
      </ul>
    </div>
  );
};

const NavItem = ({ icon, text, onClick }) => (
  <div
    className="nav-item flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full mb-2 cursor-pointer"
    onClick={onClick}
  >
    <span className="flex items-center">
      <span className="mr-8">{icon}</span>
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </div>
);

const DropdownItem = ({ text, onClick }) => (
  <div
    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
    onClick={onClick}
  >
    {text}
  </div>
);

const LogoutItem = ({ icon, text, onClick }) => (
  <div
    className="nav-item flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full mb-2 cursor-pointer"
    onClick={onClick}
  >
    <span className="flex items-center">
      <span className="mr-8">{icon}</span>
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </div>
);

export default ManagementSidebar;