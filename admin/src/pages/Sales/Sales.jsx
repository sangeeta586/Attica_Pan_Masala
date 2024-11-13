import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Add } from '../../utils/Add';
import DeleteModal from '../../utils/Modal/Sales/DeleteModal'; // Assuming you have a DeleteModal component
import EditSaleModal from '../../utils/Modal/Sales/EditSales'; // Assuming you have an EditSaleModal component
import Logout from '../../utils/Logout';
import { BASE_URL } from '../../constants';

function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteSaleId, setDeleteSaleId] = useState(null);
  const [editSaleId, setEditSaleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    fetch(`${BASE_URL}/api/sales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleDelete = async (saleId) => {
    setDeleteSaleId(saleId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token not found.');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/sales/${deleteSaleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setSalesData(salesData.filter((sale) => sale._id !== deleteSaleId));
        console.log('Sale deleted successfully');
      } else {
        console.error('Failed to delete sale');
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (saleId) => {
    setEditSaleId(saleId);
    setShowEditModal(true);
  };

  const updateSale = (updatedSale) => {
    const updatedSalesData = salesData.map((sale) => (sale._id === updatedSale._id ? updatedSale : sale));
    setSalesData(updatedSalesData);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const filteredSalesData = salesData.filter((sale) => sale.email_Id.toLowerCase().includes(searchQuery.toLowerCase()));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSalesData = filteredSalesData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!Array.isArray(salesData)) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return ( 
    <div className="flex font-sans bg-blue-100 h-screen">
      <div className="lg:p-5 xl:p-5 ml-0 p-0">
        <Navbar />
      </div>
      <div className="w-full lg:ml-70 xl:ml-80 md:ml-60 flex flex-col h-full">
        <div>
          <Logout />
        </div>
        <div className="bg-container">
          <Add name="Sales" searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        </div>
        <div className="overflow-auto justify-start flex md:px-5 px-4 mx-5 mt-10 ml-0 w-full Table_Container">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-full">
            <thead className="Table uppercase  text-xs md:text-sm lg:text-sm xl:text-md h-11 dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between sticky top-0 z-10">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">S No</th>
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">Product Name</th>
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">Order Quantity</th>
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">Price Per Unit</th>
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">Total Price</th>
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">Date</th>
                <th className='text-center lg:mx-2 md:mx-2 mx-0 lg:px-2 md:px-2 px-1 ' scope="col">Time</th>
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSalesData.map((sale, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center font-normal">{indexOfFirstItem + index + 1}</td>
                  <td className='text-center text-normal font-semibold'>{sale.ProductName}</td>
                  <td className='text-center'>{sale.order_qty}</td>
                  <td className='text-center'>{sale.price_per_unit}</td>
                  <td className='text-center'>{sale.totalPrice}</td>
                  <td className='text-center'>{formatDate(sale.date)}</td>
                  <td className='text-center'>{sale.time}</td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div onClick={() => openEditModal(sale._id)} className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1">
                      <FaEdit className="text-xl" />
                      {/* <div>Edit Sale</div> */}
                    </div>
                    <div onClick={() => handleDelete(sale._id)} className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer">
                      <MdDelete className="text-xl" />
                      {/* <div>Delete Sale</div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <ul className="flex gap-2">
            {Array.from({ length: Math.ceil(filteredSalesData.length / itemsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DeleteModal isOpen={showDeleteModal} onClose={closeModal} onConfirm={confirmDelete} />
      <EditSaleModal isOpen={showEditModal} onClose={closeModal} saleId={editSaleId} onUpdate={updateSale} />
    </div>
  );
}

export default Sales;


