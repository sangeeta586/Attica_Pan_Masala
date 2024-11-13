import React from 'react';
import { useWindowSize } from 'react-use';
import { ItemStockModal } from './Modal/ItemStock/ItemStockModal';
import { ItemModal } from './Modal/Items/ItemModal';
import { ProductStockModal } from './Modal/ProductStock/ProductStockModal';
import { SellerModal } from './Modal/Seller/SellerModal';
import { SuppliesModal } from './Modal/Supplies/SuppliesModal';
import { OrderModal } from './Modal/Order/OrderModal';
import { CategoryModal } from './Modal/Category/CategoryModal';
import { PurchaseModal } from './Modal/Purchase/PurchaseModal';
import { ProductModal } from './Modal/Products/ProductModal';
import { SupplierModal } from './Modal/Supplier/SupplierModal';
import SalesModal from './Modal/Sales/SalesModal';

export const Add = ({ name, searchQuery, onSearchChange }) => {
  const { width } = useWindowSize();

  // Determine the placeholder text based on the screen size
  const placeholderText = width < 768 ? 'Search' : `Search for ${name}`;

  // Function to render the appropriate modal based on the name
  function AddItem() {
    if (name === "Orders") {
      return <OrderModal />;
    } else if (name === "Items") {
      return <ItemModal />;
    } else if (name === "Category") {
      return <CategoryModal />;
    } else if (name === "ItemStock") {
      return <ItemStockModal />;
    } else if (name === "ProductStock") {
      return <ProductStockModal />;
    } else if (name === "Purchase") {
      return <PurchaseModal />;
    } else if (name === "Seller") {
      return <SellerModal />;
    } else if (name === "Supplies") {
      return <SuppliesModal />;
    } else if (name === "Supplier") {
      return <SupplierModal />;
    } else if (name === "Products") {
      return <ProductModal />;
    } else if (name === "Sales") {
      return <SalesModal />;
    }
    return null;
  }

  return (
    <div className='bg-white px-4 py-2 rounded-lg shadow-xl m-4  md:w-full'>
      <div>
        <h1 className='text-lg md:text-4xl item-center font-bold'>{name}</h1>
      </div>

      <div className="max-w-16xl mx-auto">
        <div className="bg-white my-4 px-0 sm:w-full">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center mr">
              <div className="flex gap-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="bg-gray-50  border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                    placeholder={`Search for ${name}`}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <AddItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




