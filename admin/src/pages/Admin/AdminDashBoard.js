import React, { useEffect, useState } from "react";
import SalesState from "../../Components/Sales_State";
import BarChart from "../../utils/Charts/BarChart";

import axios from "axios";
import { BASE_URL } from "../../constants";
import { AdminSideBar } from "./AdminSidebar";


function AdminDashBoard() {
  const [SuperStockist, setSuperStockist] = useState();
  const [Stockist, setStockist] = useState();
  const [DeliveryBoy, setDeliveryBoy] = useState();
  const [Panshop, setPanshop] = useState();
  const [product, setProduct] = useState();
  const [dailySales, setDailySales] = useState([]);
  const [todaySales, setTodaySales] = useState(0);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${BASE_URL}/api/superStockist/getAllUser`),
          axios.get(`${BASE_URL}/api/stockist/order/`),
          axios.get(`${BASE_URL}/api/panshop/order/`),
          axios.get(`${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy`),
          axios.get(`${BASE_URL}/api/superStockistProductDetails/productsDetails`),
        ]);

        setSuperStockist(responses[0].data);
        setStockist(responses[1].data);
        setPanshop(responses[2].data);
        setDeliveryBoy(responses[3].data);
        setProduct(responses[4].data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    fetch(`${BASE_URL}/api/sales/getOrdersGroupedByState`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
        calculateTodaySales(data);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const calculateTodaySales = (salesData) => {
    const today = new Date().toLocaleDateString();
    const todaySales = salesData
      .filter(sale => new Date(sale.timestamp).toLocaleDateString() === today)
      .reduce((total, sale) => total + sale.totalRevenue, 0);
    setTodaySales(todaySales);
  };

  return (
    <div className="flex  bg-[#DBEAFE] ">
       <div className="lg:w-[15%]">
       <AdminSideBar/>
       </div>
      <div className=" lg:w-[80%] md:w-[80%] w-full lg:mt-20 md:mt-20  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 ">
          <div className="w-full h-40 bg-[#1E40AF] flex justify-center items-center flex-col rounded-lg text-white">
            <p style={{ fontWeight: 500, fontSize: 18 }}>Today's Sales</p>
            <p style={{ fontWeight: 700, fontSize: 22 }}>
              rs {todaySales}
            </p>
            <p style={{ fontWeight: 500, fontSize: 18 }}>
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="w-full h-40 bg-[#1E40AF] flex justify-center items-center flex-col rounded-lg text-white">
            <p style={{ fontWeight: 500, fontSize: 18 }}>Weekly Sales</p>
            <p style={{ fontWeight: 700, fontSize: 22 }}>rs 15000</p>
            <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 60%</p>
          </div>
          <div className="w-full h-40 bg-[#1E40AF] flex justify-center items-center flex-col rounded-lg text-white">
            <p style={{ fontWeight: 500, fontSize: 18 }}>Weekly orders</p>
            <p style={{ fontWeight: 700, fontSize: 22 }}>42,254</p>
            <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 40%</p>
          </div>
          <div className="w-full h-40 bg-[#1E40AF] flex justify-center items-center flex-col rounded-lg text-white">
            <p style={{ fontWeight: 500, fontSize: 18 }}>Revenue</p>
            <p style={{ fontWeight: 700, fontSize: 22 }}>rs1024565</p>
            <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 10%</p>
          </div>
        </div>

        <SalesState />

        <BarChart />

      </div>
    </div>

  );
}

export default AdminDashBoard;



























































