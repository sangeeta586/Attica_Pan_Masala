import React, { useState, useEffect } from 'react';
import Message from './Message'; // Import the Message component

const DrawerCard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

 
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
    setShowMessage(true);
  };

  const handleOptionChange = (index, e) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = parseInt(e.target.value);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setSelectedOption({ ...selectedOption, [index]: e.target.value });
  };

  return (
    <div className="flex-col">
      <button onClick={toggleDrawer} className="btn-bg font-bold text-black px-4 py-2 rounded-lg w-full mb-5 transition duration-300 ease-in-out hover:bg-gray-700">
        Add to Cart
      </button>
      <h1 className='pack-text text-white' >1 Packet Contains 30 Pouches</h1>
      {/* Display message component */}
      {showMessage && (
        <Message message="Item added to cart" onClose={() => setShowMessage(false)} />
      )}

      {/* Rest of your code */}
    </div>
  );
};

export default DrawerCard;
