import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";

const AssignModal = ({ order, setIsModalOpen, fetchData }) => {
  const [formData, setFormData] = useState({
    deliveryBoyId: "",
    deliveryTime: "",
  });
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [filteredDeliveryBoys, setFilteredDeliveryBoys] = useState([]); // For filtered results
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  const loggedUser = localStorage.getItem("email");

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/qrGeneraterBoy/allDetailsDeliverBoy?stockistEmailId=${encodeURIComponent(
          loggedUser
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch delivery boys");
      }
      const data = await response.json();
      setDeliveryBoys(data);
      setFilteredDeliveryBoys(data); // Initialize filtered list with all delivery boys
      setLoading(false);
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = deliveryBoys.filter(
      (boy) =>
        boy.username.toLowerCase().includes(query) ||
        boy.email.toLowerCase().includes(query) ||
        boy.state.toLowerCase().includes(query) ||
        boy.pinCode.includes(query) ||
        boy.address.toLowerCase().includes(query)
    );
    setFilteredDeliveryBoys(filtered); // Update filtered results
  };

  const handleChange = (e) => {
    const selectedBoy = deliveryBoys.find(
      (boy) => boy.username === e.target.value
    );
    if (selectedBoy) {
      setFormData({
        ...formData,

        deliveryBoyId: selectedBoy._id,
      });
    }
  };

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * filteredDeliveryBoys.length);
    const randomDeliveryBoy = filteredDeliveryBoys[randomIndex];
    setFormData({
      ...formData,

      deliveryBoyId: randomDeliveryBoy._id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        deliverBoyId: formData.deliveryBoyId,
        deliveryTime: formData.deliveryTime,
      };

      const response = await fetch(
        `${BASE_URL}/api/panshop/order/assignedToDeliverBoy/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully");
        setIsModalOpen(false);
        fetchData(); // Refresh the data after successful update
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <div className="bg-[#dbeafe] p-6 rounded-xl relative">
        <h2 className="text-3xl font-semibold mb-6 text-center underline text-[#1e40af]">
          Order Details
        </h2>

        <div className="gap-6 mb-6">
          <p className="mb-1">
            <strong className="pr-3">Pan Shop Owner Name :</strong>{" "}
            {order.panShopOwnerName}
          </p>
          {/* <p className="mb-1"><strong className="pr-3">Pan Shop Owner ID :</strong> {order.panShopOwner_id}</p> */}
          <p className="mb-1">
            <strong className="pr-3">Address :</strong>{" "}
            {order.panShopOwneraddress}
          </p>
          <p className="mb-1">
            <strong className="pr-3">State :</strong> {order.panShopOwnerstate}
          </p>
        </div>

        <div className="mb-6 border border-blue-600 p-4">
          <p className="text-lg font-semibold">Products:</p>
          {order.products.map((product, index) => (
            <div key={index} className="flex justify-between">
              <p>{product.productNames}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: rs{product.price}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Delivery Boys by name, email, state, etc."
          className="p-2 rounded border border-gray-400 w-full mb-4"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className="p-2 rounded border border-gray-400 w-3/4"
            >
              <option value="">Select Delivery Boy</option>
              {filteredDeliveryBoys.map((deliveryBoy) => (
                <option key={deliveryBoy._id} value={deliveryBoy.username}>
                  {deliveryBoy.email} - {deliveryBoy.state} (
                  {deliveryBoy.pinCode})
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
              onClick={handleRandomSelect}
            >
              Choose Random
            </button>
          </div>
          <input
            type="datetime-local"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={(e) =>
              setFormData({ ...formData, deliveryTime: e.target.value })
            }
            placeholder="Delivery Time"
            className="p-2 rounded border border-gray-400 w-full"
          />
          <div className="flex justify-end ">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded ml-2 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignModal;
