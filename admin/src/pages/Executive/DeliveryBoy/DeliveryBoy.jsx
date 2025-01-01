import React, { useState } from "react";
import DeliveryBoysTrack from "./DeliveryBoysTrack";
import DeliveryBoysRegister from "./DeliveryBoysRegister";
import DeliveryBoysList from "./DeliveryBoysList";
import Navbar from "../../../Components/Navbar/Navbar";

const DeliveryBoy = () => {
  const [activeTab, setActiveTab] = useState("track");

  const renderContent = () => {
    switch (activeTab) {
      case "track":
        return <DeliveryBoysTrack />;
      case "register":
        return <DeliveryBoysRegister />;
      case "list":
        return <DeliveryBoysList />;
      default:
        return <DeliveryBoysTrack />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto ml-96 h-full ">
        <h1 className="text-2xl font-bold text-center mb-4">
          Delivery Boy Management
        </h1>

        {/* Tabs Navigation */}
        <div className="tabs flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "track"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("track")}
          >
            Track
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "register"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("list")}
          >
            List
          </button>
        </div>

        {/* Tab Content */}
        <div className="content  p-4 rounded-md ">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default DeliveryBoy;
