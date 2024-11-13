




import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from 'chart.js';
import './BarChart.css';
import { BASE_URL } from '../../constants';
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip);

const options = {
  responsive: true,
  //maintainAspectRatio: false,
  scales: {
    x: {
      barPercentage: 0.8,
      categoryPercentage: 0.9,
      grid: {
        display: false, // Remove vertical grid lines
      },
    },
  },
  plugins: {
    legend: {
      postion: "top"
    },
    title: {
      display: true,
      text: "Monthly Orders",
      fontSize: 30
    }
  }
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Charts = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchMonthlyOrderQty = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/sales/getMonthlyOrderQty`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSales(data);
        
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMonthlyOrderQty();
  }, []);

  // Prepare datasets from sales data
  const datasetData = new Array(12).fill(0); // Initialize an array with 12 zeros for each month
  sales.forEach(monthData => {
    if (monthData._id.month !== null) {
      datasetData[monthData._id.month - 1] = monthData.totalOrderQty;
    }
  });

  const datasets = [{
    label: "Monthly Orders",
    data: datasetData,
    backgroundColor: '#3a9be9', // Adjust color if needed
    barThickness: 20,
  }];

  const data = {
    labels,
    datasets,
  };

  return (
    <div className='chart-container mx-10 bg-[#1E40AF]'>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Charts;




















































