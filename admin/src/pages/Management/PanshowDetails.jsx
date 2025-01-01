import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import ManagementSidebar from "./ManagementSidebar";
import { BASE_URL } from "../../constants";
import axios from "axios";
import ManagementSideBarModal from "./ManagementChart/ManagementSideBarModal";
import Swal from "sweetalert2"; // Import SweetAlert2

const PanshowDetails = () => {
  const [panShop, setPanShop] = useState([]);
  const [filteredPanShop, setFilteredPanShop] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    fetchPanShop();
  }, []);

  useEffect(() => {
    const searchFiltered = panShop.filter((shop) => {
      const lowerSearchQuery = searchQuery.toLowerCase();
      return (
        (shop.panShopOwner &&
          shop.panShopOwner.toLowerCase().includes(lowerSearchQuery)) ||
        (shop.address &&
          shop.address.toLowerCase().includes(lowerSearchQuery)) ||
        (shop.phoneNumber &&
          shop.phoneNumber.toString().includes(lowerSearchQuery))
      );
    });
    setFilteredPanShop(searchFiltered);
  }, [searchQuery, panShop]);

  const fetchPanShop = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/panShopOwner/`);
      setPanShop(response.data.data);
    } catch (error) {
      console.error("Error fetching panShop:", error);
    }
  };

  const indexOfLastShop = currentPage * itemsPerPage;
  const indexOfFirstShop = indexOfLastShop - itemsPerPage;
  const currentShops = filteredPanShop.slice(indexOfFirstShop, indexOfLastShop);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredPanShop.length / itemsPerPage))
    );
  const previousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle delete with SweetAlert confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deleting the pan shop
        deletePanShop(id);
      }
    });
  };

  const deletePanShop = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/panShopOwner/${id}`);
      Swal.fire("Deleted!", "The pan shop has been deleted.", "success");
      fetchPanShop(); // Re-fetch the pan shop list after deletion
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting the pan shop.", "error");
      console.error("Error deleting pan shop:", error);
    }
  };

  return (
    <div className="flex gap-6 bg-[#dbeafe] w-full">
      <div className="h-screen md:block lg:block hidden">
        <ManagementSidebar />
      </div>

      <div className="lg:ml-80 md:ml-40 font-serif w-full lg:p-10 md:p-5 p-4">
        <div className="flex items-center flex-wrap lg:justify-end md:justify-end justify-between lg:gap-10 md:gap-5 gap-1 lg:h-28 h-16 bg-[#93c5fd] rounded-xl lg:my-5 md:my-5 my-2 px-5">
          <p className="lg:text-2xl md:text-xl text-xs font-bold border-4 border-[#1e40af] p-2 rounded-lg bg-[#dbeafe]">
            Panshop Details
          </p>
          <div className="lg:hidden md:hidden block">
            <ManagementSideBarModal />
          </div>
        </div>

        <div className="container mx-auto py-8">
          <div className="bg-[#1e40af] text-black rounded-xl p-4">
            <h2 className="2xl:text-2xl xl:text-xl md:text-lg text-sm text-white font-bold p-1 mt-1">
              Phow Details List
            </h2>

            <input
              type="text"
              placeholder="Search PanShop by Shop Owner Name, Phone No, Address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded p-2 my-4 w-full"
            />

            <div
              className="overflow-x-auto overflow-y-auto"
              style={{ maxHeight: "600px" }}
            >
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#93C5FD] text-white">
                    <th className="px-6 py-3 text-left">Shop Owner Name</th>
                    <th className="px-6 py-3 text-left">Phone No</th>
                    <th className="px-6 py-3 text-left">Address</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShops.map((shop) => (
                    <tr
                      key={shop._id}
                      className="bg-gray-200 border-b-2 border-blue-200"
                    >
                      <td className="px-6 py-4">{shop.panShopOwner}</td>
                      <td className="px-6 py-4">{shop.phoneNumber}</td>
                      <td className="px-6 py-4">{shop.address}</td>
                      <td className="px-6 py-4 flex flex-wrap gap-4">
                        <Button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => {
                            // Add functionality to view or edit pan shop details
                          }}
                        >
                          View/Edit
                        </Button>
                        <Button
                          className="mx-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleDelete(shop._id)} // Delete confirmation
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <Button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="mx-1"
            >
              Previous
            </Button>

            {Array.from(
              { length: Math.ceil(filteredPanShop.length / itemsPerPage) },
              (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 ${
                    currentPage === index + 1 ? "bg-blue-500" : ""
                  }`}
                >
                  {index + 1}
                </Button>
              )
            )}

            <Button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(filteredPanShop.length / itemsPerPage)
              }
              className="mx-1"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanshowDetails;
