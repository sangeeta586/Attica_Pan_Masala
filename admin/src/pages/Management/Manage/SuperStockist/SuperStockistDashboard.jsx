import React from "react";
import { FaBox, FaUsers, FaChartLine, FaClipboardList } from "react-icons/fa"; // For icons

const SuperStockistDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-xl font-bold mb-8">SuperStockist Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              Orders
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              Inventory
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              Analytics
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Total Orders</h3>
              <p className="text-lg">1,250</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaClipboardList className="text-blue-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Total Stockists</h3>
              <p className="text-lg">500</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaUsers className="text-blue-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Total Sales</h3>
              <p className="text-lg">$250,000</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaChartLine className="text-blue-600 text-3xl" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">#001</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">Shipped</td>
                <td className="px-4 py-2">$150</td>
                <td className="px-4 py-2">Nov 25, 2024</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">#002</td>
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">Pending</td>
                <td className="px-4 py-2">$230</td>
                <td className="px-4 py-2">Nov 24, 2024</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">#003</td>
                <td className="px-4 py-2">Bill Gates</td>
                <td className="px-4 py-2">Delivered</td>
                <td className="px-4 py-2">$120</td>
                <td className="px-4 py-2">Nov 23, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperStockistDashboard;
