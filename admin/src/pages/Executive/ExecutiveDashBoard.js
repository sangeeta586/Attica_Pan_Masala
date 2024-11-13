import React,{useState,useEffect} from "react";
import '../../../src/Styles/Dashboard.css'
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@material-tailwind/react";
import Img from "../../assets/avataaars.png";
import BarChart from '../../utils/Charts/BarChart';
import { BASE_URL } from "../../constants";

function ExecutiveDashBoard() {
  const navigate = useNavigate();
  const [dailySales, setDailySales] = useState([]);
  const [todaySales, setTodaySales] = useState(0);
  const [sales, setSales] = useState([]);
  

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

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f2edf3]">
      <div className="flex flex-col lg:flex-row justify-end gap-4">
        <Navbar/>
        <div className="flex flex-col lg:flex-row items-center justify-end gap-4 lg:gap-10 bg-gray-200 rounded-xl mx-4 lg:mx-10 my-4 p-4 lg:h-44 lg:w-full lg:ml-85 mx-4">
          <Avatar alt="Remy Sharp" src={Img} className="w-16 h-16 lg:w-20 lg:h-20" />
          <p className="text-lg lg:text-2xl font-bold border-4 border-blue-400 p-2 rounded-lg bg-blue-100 text-center">
            {localStorage.getItem("email")}
          </p>
          <Button color="red" onClick={handleLogout} className="text-md lg:mr-12">
            Logout
          </Button>
        </div>
      </div>
      <div className="card-container bg-[#f2edf3] lg:ml-80 ">
            <div className="card ml-7">
              <div className="card1">
                <p style={{ fontWeight: 500, fontSize: 18 }}>Today's Sales</p>
                <p style={{ fontWeight: 700, fontSize: 22 }}>
                  rs {todaySales}
                </p>
                <p style={{ fontWeight: 500, fontSize: 18 }}>
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="card2">
                <p style={{ fontWeight: 500, fontSize: 18 }}>Weekly Sales</p>
                <p style={{ fontWeight: 700, fontSize: 22 }}>$ 15000</p>
                <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 60%</p>
              </div>
              <div className="card3">
                <p style={{ fontWeight: 500, fontSize: 18 }}>Weekly orders</p>
                <p style={{ fontWeight: 700, fontSize: 22 }}>42,254</p>
                <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 40%</p>
              </div>
              <div className="card4">
                <p style={{ fontWeight: 500, fontSize: 18 }}>Revenue</p>
                <p style={{ fontWeight: 700, fontSize: 22 }}>rs1024565</p>
                <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 10%</p>
              </div>
            </div>
      <div className="charts mx-4  mt-8">
        <BarChart />
      </div>
      </div>
    </div>
  );
}

export default ExecutiveDashBoard; 

