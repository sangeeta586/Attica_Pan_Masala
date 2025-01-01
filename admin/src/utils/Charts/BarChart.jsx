import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import "./BarChart.css";
import { BASE_URL } from "../../constants";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip);

const options = {
  responsive: true,
  scales: {
    x: {
      barPercentage: 0.8,
      categoryPercentage: 0.9,
      grid: {
        display: false, // Remove vertical grid lines
      },
    },
    y: {
      beginAtZero: true, // Ensure the y-axis starts at zero
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Orders",
      font: {
        size: 30,
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Charts = ({ email }) => {
  const [sales, setSales] = useState(new Array(12).fill(0)); // Default to an array of 12 zeros
  const [loading, setLoading] = useState(true); // Loading state for the data
  const [error, setError] = useState(null); // Error state for any issues

  useEffect(() => {
    const fetchMonthlyOrderQty = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/panshop/order`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        // Filter orders for the logged-in stockist (using email)
        const userOrders = data.filter(
          (order) => order.stockistEmail === email
        );

        // Prepare an array to store the number of orders per month
        const orderCounts = new Array(12).fill(0); // Initialize the order count for each month

        // Iterate through each order to count orders by month
        userOrders.forEach((order) => {
          const orderDate = new Date(order.updatedAt); // Parse the updatedAt field
          const month = orderDate.getMonth(); // Get the month (0 = Jan, 11 = Dec)
          orderCounts[month] += 1; // Increment the count for the respective month
        });

        setSales(orderCounts); // Set the order counts in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Update error state
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchMonthlyOrderQty();
  }, [email]); // Re-fetch data if email changes

  // Prepare the chart data object
  const datasets = [
    {
      label: "Monthly Orders",
      data: sales,
      backgroundColor: "#3a9be9", // Adjust color if needed
      barThickness: 20,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  // Render loading, error, or chart based on state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chart-container mx-5 bg-[hsl(225,48%,23%)] rounded-lg p-4 w-full">
      <Bar data={data} options={options}  className="w-full"/>
    </div>
  );
};

export default Charts;
