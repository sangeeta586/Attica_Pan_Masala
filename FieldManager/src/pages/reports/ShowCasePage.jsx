import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import AddReview from "./AddReview";
import { useNavigate } from "react-router-dom";

export const ShowCasePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const email = localStorage.getItem("email");

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const resp = await axios.get(`${URI}/api/producteomm/`);
      setProducts(resp.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOnClicked = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null); // Reset selected product
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-100 font-sans">
        <div className="text-white">
          <Sidebar />
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between lg:justify-between gap-5 lg:h-28 h-16 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2">
            <button
              className="lg:text-2xl md:text-xl text-[15px] font-bold lg:p-2 lg:text-center text-blue-600 bg-transparent border-blue-600 rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ml-4"
              onClick={() => {
                localStorage.removeItem("myData"); // Clear myData from localStorage
                window.location.reload(); // Refresh the page after clearing localStorage
              }}
            >
              Refresh
            </button>

            <div className="lg:text-4xl md:text-xl text-[15px] font-bold lg:p-4 lg:text-center lg:mx-auto text-black transition-transform duration-700 ease-in-out ml-16">
              Our Products
            </div>
            <div className="lg:text-2xl md:text-xl text-xs text-white font-bold lg:border-4 border-2 border-[#1e40af] lg:p-2 p-1 py-2 rounded-lg bg-[rgb(42,108,194)] hover:bg-blue-800 transition-colors duration-300 ease-in-out mr-4">
              {email}
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const existingData =
                JSON.parse(localStorage.getItem("myData")) || [];
              const isProductInLocalStorage = existingData.some(
                (data) => data.Product._id === product._id
              );

              return (
                <div
                  key={product._id}
                  className="rounded-lg shadow-md overflow-hidden bg-slate-300"
                >
                  <img
                    src={`${URI}/uploads/${product.image}`}
                    alt={product.title}
                    className="w-full h-48 object-contain pt-6"
                  />
                  <div className="p-4 flex flex-col justify-center items-center content-center">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                    <p className="text-gray-800 font-bold mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOnClicked(product)}
                    disabled={isProductInLocalStorage}
                    className={`${
                      isProductInLocalStorage
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    } w-full flex justify-center items-center p-2 text-white font-semibold font-serif text-xl transition-colors duration-300`}
                  >
                    {isProductInLocalStorage ? "Already Tested" : "Test"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="px-6 py-3 bg-green-500 text-white font-semibold text-sm uppercase rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              onClick={() => navigate("/Add-New-Vendor")}
            >
              Register the Vendor
            </button>
            <button
              className="px-6 py-3 bg-red-500 text-white font-semibold text-sm uppercase rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out"
              onClick={() => navigate("/vendor-not-intrested")}
            >
              Vendor Not Interested
            </button>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <AddReview
                  selectedProduct={selectedProduct}
                  setShowModal={closeModal}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCasePage;
