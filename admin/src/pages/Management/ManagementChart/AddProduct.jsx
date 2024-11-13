import React, { useState, useEffect } from 'react';
import ManagementSidebar from '../ManagementSidebar';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [updateProductId, setUpdateProductId] = useState('');

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Reset all states when closing the modal
    setUpdateProductId('');
    setProductName('');
    setProductDescription('');
    setPrice('');
    setImage(null);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/producteomm`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', productName);
    formData.append('description', productDescription);
    formData.append('price', price);
    
    if (image) {
      formData.append('file', image); // Include file only if selected
    }

    try {
      if (updateProductId) {
        // If updating, send a PUT request
        const response = await axios.put(`${BASE_URL}/api/producteomm/update/${updateProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Update response:', response.data); // Log response
        console.log('Product updated successfully');
      } else {
        // If adding a new product, send a POST request
        const response = await axios.post(`${BASE_URL}/api/producteomm`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Add response:', response.data);
        console.log('Product added successfully');
      }
      handleToggleModal(); // Close the modal after submitting
      fetchProducts(); // Fetch updated products after adding or updating
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    if (productToEdit) {
      setProductName(productToEdit.title);
      setProductDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setImage(null); // Reset image, user can choose to upload new
      setUpdateProductId(productToEdit._id); // Set the ID of the product to update
      setIsModalOpen(true); // Open the modal with prefilled data
      console.log('Editing product:', productToEdit); // Log the product being edited
    }
  };


  const handleDelete = async(id) => {

    const confirmDelete = window.confirm('Are you sure you want to delete this product');

    if(confirmDelete){
      try {
        await axios.delete(`${BASE_URL}/api/producteomm/${id}`);
        console.log('Product deleted successfully');
        fetchProducts(); // Fetch updated products after deleting
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
    // else do nothing, user didn't confirm deletion
    

   



  }

  return (
    <>
      <div className="background min-h-screen flex">
        <ManagementSidebar />

        <div className="flex flex-col w-full p-6 ml-40">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleToggleModal}
              className="text-3xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mx-4 sm:mx-0">
                <h2 className="text-2xl font-bold mb-6">
                  {updateProductId ? 'Update Product' : 'Add Product'}
                </h2>
                <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                      Product Name:
                    </label>
                    <input
                      type="text"
                      id="productName"
                      value={productName}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter product name"
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                      Product Description:
                    </label>
                    <input
                      type="text"
                      id="productDescription"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter product description"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                      Price:
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter product price"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                      Product Image Upload:
                    </label>
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="w-full text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {updateProductId ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={handleToggleModal}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:ml-56">
              {products.map((product) => (
                <div key={product._id} className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
                  <img
                    src={`${BASE_URL}/uploads/${product.image}`} // Assuming image URLs are served from '/uploads' directory
                    alt={product.title}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p>{product.description}</p>
                  <p className="text-blue-500 font-semibold mt-2">${product.price}</p>

                  <div className="mt-4 flex space-x-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600" onClick={()=>handleDelete(product._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
