import React, { useState } from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const ClearCart = () => {
  const [cleared, setCleared] = useState(false);

  const handleClearCart = () => {
    localStorage.removeItem('cartItems');
    setCleared(true);
    setTimeout(() => {
      setCleared(false);
    }, 5000); // Clear the "cleared" message after 5 seconds
    window.location.reload();
  };

  return (
    <div>
      <button className='bg-red-500 py-2 px-4' onClick={handleClearCart}>
        <MdOutlineRemoveShoppingCart />
      </button>
      {cleared && (
        <div className="bg-green-500 text-white py-2 px-4 mt-2 rounded-lg">
          Cart cleared successfully.
        </div>
      )}
    </div>
  );
};

export default ClearCart;
