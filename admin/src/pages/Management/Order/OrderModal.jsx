import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../constants";

const OrderModal = ({ setIsModalOpen, order, fetchData }) => {
  const [superStockist, setSuperStockist] = useState([]);
  const [stockist, setStockist] = useState([]);
  const [selectedSuperStockist, setSelectedSuperStockist] = useState(null);
  const [selectedStockist, setSelectedStockist] = useState(null);
  const [superSearch, setSuperSearch] = useState("");
  const [stockistSearch, setStockistSearch] = useState("");

  // Fetch all super stockists
  useEffect(() => {
    fetch(`${BASE_URL}/api/superstockist/getAllUser`)
      .then((response) => response.json())
      .then((data) => {
        setSuperStockist(data);
      })
      .catch((error) =>
        console.error("Error fetching super stockists:", error)
      );
  }, []);

  // Fetch stockists when a super stockist is selected
  useEffect(() => {
    if (selectedSuperStockist) {
      fetch(
        `${BASE_URL}/api/executives/superStockist/${selectedSuperStockist._id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setStockist(data);
        })
        .catch((error) =>
          console.error("Error fetching stockists:", error)
        );
    }
  }, [selectedSuperStockist]);

  const handleConfirm = async () => {
    if (!selectedStockist || !selectedSuperStockist) {
      Swal.fire({
        icon: "warning",
        title: "Selection Required",
        text: "Please select both a Stockist and a Super Stockist before confirming.",
      });
      return;
    }

    try {
      const data = {
        superStockistEmail: selectedSuperStockist.email,
        stockistEmail: selectedStockist.email,
        status: "processing",
        superStockistStatus: "pending",
        stockistStatus: "pending",
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
              <p>{product.productName}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          ))}
          <p className="text-[#1e40af] text-xl font-bold text-right">
            Total Price: ₹{order.totalPrice}
          </p>
        </div>

        {/* Super Stockist Search and Select */}
        <div>
          <label className="font-semibold">Search Super Stockists:</label>
          <input
            type="text"
            value={superSearch}
            onChange={(e) => setSuperSearch(e.target.value)}
            placeholder="Search super stockists..."
            className="w-full p-2 border rounded mt-2"
          />
          <div className="mt-2 max-h-40 overflow-y-auto border p-2">
            {superStockist
              .filter((item) =>
                item.username.toLowerCase().includes(superSearch.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item._id}
                  className={`p-2 cursor-pointer rounded ${selectedSuperStockist?._id === item._id
                    ? "bg-blue-500 text-white font-bold"
                    : "hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedSuperStockist(item)}
                >
                  {item.username} -{item.state}- {item.city}-{item.address}-{item.pinCode}
                </div>
              ))}

          </div>
        </div>

        {/* Stockist Search and Select */}
        <div className="mt-4">
          <label className="font-semibold">Search Stockists:</label>
          <input
            type="text"
            value={stockistSearch}
            onChange={(e) => setStockistSearch(e.target.value)}
            placeholder="Search stockists..."
            className="w-full p-2 border rounded mt-2"
            disabled={!selectedSuperStockist}
          />
          {selectedSuperStockist && (
            <div className="mt-2 max-h-40 overflow-y-auto border p-2">
              {stockist
                .filter((item) =>
                  item.username.toLowerCase().includes(stockistSearch.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item._id}
                    className={`p-2 cursor-pointer rounded ${selectedStockist?._id === item._id
                      ? "bg-blue-500 text-white font-bold"
                      : "hover:bg-gray-100"
                      }`}
                    onClick={() => setSelectedStockist(item)}
                  >
                    {item.username} -{item.state}- {item.city}-{item.address}-{item.pinCode}
                  </div>
                ))}

            </div>
          )}
        </div>

        {/* Confirm and Cancel Buttons */}
        <div className="flex justify-end mt-4 gap-3">
          <Button
            color="red"
            onClick={() => setIsModalOpen(false)}
            className="rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="rounded-none bg-[#1e40af]"
          >
            Confirm
          </Button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default OrderModal;
