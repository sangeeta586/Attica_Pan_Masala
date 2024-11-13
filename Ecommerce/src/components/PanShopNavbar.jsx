import React from 'react';

function PanShopNavbar() {
  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* This div is empty to maintain space on the left */}
            <div className="flex-1" />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-lg gap-20 px-24">
                <a href="/" className="text-white rounded-md px-3 py-2 font-medium" aria-current="page">Home</a>
                <a href="/" className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 font-medium">About</a>
                <a href="/contact" className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 font-medium">Contact</a>
                {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PanShopNavbar;
