import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../constants";

const OrderModal = ({ setIsModalOpen, order, fetchData }) => {
  console.log("OrderModal", order);

  const [selectedStockist, setSelectedStockist] = useState(order.stockistEmail);
  const [selectedSuperStockist, setSelectedSuperStockist] = useState(
    order.superStockistEmail
  );
  const [stockistOptions, setStockistOptions] = useState([]);
  const [superStockistOptions, setSuperStockistOptions] = useState([]);
  const [stockistSearch, setStockistSearch] = useState("");
  const [superStockistSearch, setSuperStockistSearch] = useState("");

  // Fetch stockists
  useEffect(() => {
    fetch(`${BASE_URL}/api/executives/getAllUser`)
      .then((response) => response.json())
      .then((data) => {
        setStockistOptions(data);
      })
      .catch((error) =>
        console.error("Error fetching stockist options:", error)
      );
  }, []);

  // Fetch super stockists
  useEffect(() => {
    fetch(`${BASE_URL}/api/superstockist/getAllUser`)
      .then((response) => response.json())
      .then((data) => {
        setSuperStockistOptions(data);
      })
      .catch((error) =>
        console.error("Error fetching super stockist options:", error)
      );
  }, []);

  const handleConfirm = async () => {
    try {
      const data = {
        superStockistEmail: selectedSuperStockist,
        stockistEmail: selectedStockist,
        status: "processing",
      };

      const response = await fetch(
        `${BASE_URL}/api/panshop/order/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      await response.json();
      fetchData();
      toast.success("Order placed successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error placing order");
    }
  };

  // Filter stockists based on search input
  const filteredStockists = stockistOptions.filter(
    (option) =>
      option.username.toLowerCase().includes(stockistSearch.toLowerCase()) ||
      option.email.toLowerCase().includes(stockistSearch.toLowerCase()) ||
      option.state.toLowerCase().includes(stockistSearch.toLowerCase()) ||
      option.pinCode.includes(stockistSearch)
  );

  // Filter super stockists based on search input
  const filteredSuperStockists = superStockistOptions.filter(
    (option) =>
      option.username
        .toLowerCase()
        .includes(superStockistSearch.toLowerCase()) ||
      option.email.toLowerCase().includes(superStockistSearch.toLowerCase()) ||
      option.state.toLowerCase().includes(superStockistSearch.toLowerCase()) ||
      option.pinCode.includes(superStockistSearch)
  );

  return (
    <div className="fixed inset-0 top-4 flex items-center justify-center z-50 max-h-[90vh] overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950 bg-opacity-50 z-40"></div>

      <div className="bg-[#dbeafe] p-8 rounded shadow-lg z-50 relative w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-center underline text-[#1e40af]">
          Order Details
        </h2>

        <div className="gap-6">
          <p className="mb-1">
            <strong className="pr-3">Pan Shop Owner Name:</strong>{" "}
            {order.panShopOwnerName}
          </p>
          {/* <p className="mb-1">
            <strong className="pr-3">Pan Shop Owner ID:</strong> {order.panShopOwner_id}
          </p> */}
          <p className="mb-1">
            <strong className="pr-3">Address:</strong>{" "}
            {order.panShopOwneraddress}
          </p>
          <p className="mb-1">
            <strong className="pr-3">State:</strong> {order.panShopOwnerstate}
          </p>
        </div>

        <div className="mt-4 border border-blue-600 p-4">
          <p className="text-lg font-semibold">Products:</p>
          {order.products.map((product, index) => (
            <div key={index} className="flex justify-between">
              <p>{product.productNames}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: rs{product.price}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label
            htmlFor="stockistSearch"
            className="block text-base font-medium text-gray-950 mt-5"
          >
            Search Stockist:
          </label>
          <input
            type="text"
            id="stockistSearch"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            value={stockistSearch}
            onChange={(e) => setStockistSearch(e.target.value)}
            placeholder="Search for stockist..."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stockistEmail"
            className="block text-base font-medium text-gray-950 mt-5"
          >
            Stockist Email:
          </label>
          <select
            id="stockistEmail"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            value={selectedStockist}
            onChange={(e) => setSelectedStockist(e.target.value)}
          >
            <option value="">Select Stockist</option>
            {filteredStockists.map((option, index) => (
              <option key={index} value={option.email}>
                {option.username} ({option.email}) - {option.state} -{" "}
                {option.pinCode}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="superStockistSearch"
            className="block text-base font-medium text-gray-950 mt-5"
          >
            Search Super Stockist:
          </label>
          <input
            type="text"
            id="superStockistSearch"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            value={superStockistSearch}
            onChange={(e) => setSuperStockistSearch(e.target.value)}
            placeholder="Search for super stockist..."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="superStockistEmail"
            className="block text-base font-medium text-gray-950"
          >
            Super Stockist Email:
          </label>
          <select
            id="superStockistEmail"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            value={selectedSuperStockist}
            onChange={(e) => setSelectedSuperStockist(e.target.value)}
          >
            <option value="">Select Super Stockist</option>
            {filteredSuperStockists.map((option, index) => (
              <option key={index} value={option.email}>
                {option.username} ({option.email}) - {option.state} -{" "}
                {option.pinCode}
              </option>
            ))}
          </select>
        </div>

        <p className="text-[#1e40af] text-xl font-bold">
          Total Price: rs{order.totalPrice}
        </p>

        <div className="flex justify-end mt-4 gap-3">
          <Button
            color="red"
            onClick={() => setIsModalOpen(false)}
            className="rounded-none"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="rounded-none bg-[#1e40af]">
            Confirm
          </Button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default OrderModal;
