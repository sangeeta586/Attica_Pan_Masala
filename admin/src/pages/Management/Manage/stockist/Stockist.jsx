import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../constants";
import { useNavigate } from "react-router-dom";

const Stockist = () => {
  const [stockistData, setStockistData] = useState([]);
  console.log(stockistData);
  const navigate = useNavigate();

  const resetHandle = (email) => {
    localStorage.setItem("stockistEmail", email);
    navigate("/manage/stockist/dashboard");
  };

  useEffect(() => {
    const fetchStockistData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/executives/getAlluser`
        );
        setStockistData(response.data);
      } catch (error) {
        console.error("Failed to fetch stockist data:", error);
      }
    };
    fetchStockistData();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Stockist Data</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>

              <th className="py-2 px-4 border-b">State</th>
              <th className="py-2 px-4 border-b">City</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Pin Code</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {stockistData.length > 0 ? (
              stockistData.map((stockist) => (
                <tr key={stockist._id} className="text-center">
                  <td className="py-2 px-4 border-b">{stockist.username}</td>
                  <td className="py-2 px-4 border-b">{stockist.email}</td>

                  <td className="py-2 px-4 border-b">{stockist.state}</td>
                  <td className="py-2 px-4 border-b">{stockist.city}</td>
                  <td className="py-2 px-4 border-b">{stockist.address}</td>
                  <td className="py-2 px-4 border-b">{stockist.pinCode}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(stockist.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    onClick={() => resetHandle(stockist.email)}
                  >
                    Show Details
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stockist;
