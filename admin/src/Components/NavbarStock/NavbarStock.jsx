import React from "react";
import "./NavbarStock.css"; // Assuming you have a CSS file for styling
import { MdDashboard } from "react-icons/md";

import  '../../Styles/Styles.css'
import logo from "../../assets/logo.png"
import { FaShoppingCart } from "react-icons/fa";

const NavbarStock = () => {
  return (
    <div className="sidebar flex flex-col h-full">
      <div className="sidebar-header p-4">
        <img src={logo} alt="Logo"/>
      </div>
      <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6 Navlist">
        {/* <NavItem href="/SuperStockistDashboard" icon={<MdDashboard style={{ color: "#ffcc00", fontSize: "2rem" }} />} text="SS Dashboard" />  */}
        <NavItem href="/superOrderItems" icon={<FaShoppingCart style={{ color: "#000000", fontSize: "2rem"}} />} text="Orders" /> 
        {/* <NavItem href="/category" icon={<FaClipboardList style={{ color: "#ff6666", fontSize: "2rem" }} />} text="Category" />
        <NavItem href="/items" icon={<FaBoxOpen style={{ color: "#66cc99", fontSize: "2rem" }} />} text="Items" />
        */}
        
      </ul>
    </div>
  );
};

const NavItem = ({ href, icon, text }) => (
  <a href={href} className="flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full">
    <span className="flex items-center">
      <span className="mr-8">{icon}</span> {/* Increased margin from mr-4 to mr-8 */}
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </a>
);

export default NavbarStock;
