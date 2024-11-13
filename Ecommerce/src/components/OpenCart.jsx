import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { IoCart } from 'react-icons/io5';
import ClearCart from '../Utills/ClearCart';
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
import { TfiAlert } from "react-icons/tfi";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuIndianRupee } from "react-icons/lu";
import { useSelector } from 'react-redux';

const OpenCart = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [cartMessage, setCartMessage] = useState('');

  const pashShopOwnerId = localStorage.getItem("id");
  const address = localStorage.getItem("address");
  const panShopOwner = localStorage.getItem("panShopOwner");
  const panShopOwnerState = localStorage.getItem("state");
  const apiUrl = process.env.REACT_APP_API_URL;

  const cart = useSelector((store) => store.cart);
  console.log("cart opened", cart);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = storedCartItems.map(item => ({
      ...item,
      quantity: item.quantity && !isNaN(item.quantity) ? item.quantity : 1,
      productNames: item.heading || ''
    }));

    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  }, []);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleIncrement = itemNo => () => {
    const updatedCartItems = cartItems.map(item => {
      if (item.itemNo === itemNo) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const handleDecrement = itemNo => () => {
    const updatedCartItems = cartItems.map(item => {
      if (item.itemNo === itemNo && (item.quantity || 0) > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const handleRemoveItem = itemNo => () => {
    const updatedCartItems = cartItems.filter(item => item.itemNo !== itemNo);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const calculateTotalPrice = items => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setSubTotal(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    const postData = {
      products: cartItems.map(({ heading, quantity, price, description }) => ({
        productNames: heading + "( " + description + " )",
        quantity,
        price,
      })),
      otp: orderNumber,
      panShopOwnerName: panShopOwner,
      panShopOwneraddress: address,
      panShopOwner_id: pashShopOwnerId,
      panShopOwnerstate: panShopOwnerState,
      orderNumber
    };

    try {
      await axios.post(`${apiUrl}/api/panshop/order`, postData);
      setCartItems([]);
      localStorage.removeItem('cartItems');
      setCartMessage(`Order placed successfully! Your order number is ${orderNumber}.`);

      setTimeout(() => {
        setCartMessage(`Total Price: ${subTotal}`);
      }, 30000);
    } catch (error) {
      console.error('Error placing order:', error);
      setCartMessage('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="flex">
      <button onClick={toggleDrawer} className="btn-bg text-black px-4 py-2 rounded-lg w-full mb-20 transition duration-300 ease-in-out hover:bg-gray-700">
        <IoCart />
      </button>

      <div className={`fixed inset-0 z-50 ${openDrawer ? 'visible' : 'invisible'}`} onClick={toggleDrawer}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
      </div>
      <div className={`fixed right-0 top-0 h-full md:w-2/3 lg:w-1/3 bg-gray-900 z-50 transform transition-transform ease-in-out duration-300 ${openDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="items-center px-10 py-8">
          <div className="flex text-2xl font-bold gap-2 justify-between text-white">
            <div className="flex items-center">
              <SlArrowLeft onClick={toggleDrawer} className="mt-1" />
              <h1>Shopping Cart</h1>
            </div>
            <ClearCart />
          </div>
          <hr className="border-t border-gray-300 my-8 w-full" />

          <div className="cart-items-container" style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
            {cartItems.map((item, index) => (
              <div key={index} className="relative flex flex-col sm:flex-row items-center gap-4 py-6">
                <button onClick={handleRemoveItem(item.itemNo)} className="absolute top-0 right-0 bg-red-500 text-xl rounded-lg text-black m-2">
                  <RiDeleteBinLine className='lg:w-12 lg:h-10 w-8 h-8' />
                </button>
                <img className="w-60 h-60" src={item.img} alt="Product" />
                <div className="flex flex-col gap-2 text-white">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">{item.heading}</h1>
                    <h1 className="text-xl font-semibold flex items-center"><LuIndianRupee />{item.price}</h1>
                  </div>
                  <div className="flex items-center gap-4 text-2xl">
                    <button className="btn-bg w-12 h-10 rounded-lg" onClick={handleDecrement(item.itemNo)}>-</button>
                    <p className="text-white">{item.quantity}</p>
                    <button className="btn-bg w-12 h-10 rounded-lg" onClick={handleIncrement(item.itemNo)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-t border-gray-300 my-8 w-full" />
          <div className="total-price-container flex justify-between items-center text-lg text-white">
            <h1>Total:</h1>
            <h1><FaRupeeSign /> {subTotal}</h1>
          </div>
          {cartMessage && <div className="text-green-500">{cartMessage}</div>}
          <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default OpenCart;
