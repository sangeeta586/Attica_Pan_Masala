import React, { useState } from 'react';
import ManagementSidebar from '../ManagementSidebar';
import ManagementSideBarModal from '../ManagementChart/ManagementSideBarModal';
import { AreaMangerDetailsTable } from './AreaMangerDetailsTable';

export const AreaMangerTacker = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-[#e8effe] min-h-screen">
      <div className="lg:block hidden">
        <ManagementSidebar />
      </div>
      
      <div className="flex-1 p-4 lg:ml-64">
        <div className="flex items-center justify-between lg:justify-end bg-[#93c5fd] rounded-xl p-4 my-4 lg:ml-20">
          <div className="lg:hidden block">
            <ManagementSideBarModal />
          </div>
          <p className="text-center lg:text-2xl md:text-xl text-base font-bold bg-[#dbeafe] text-[#1e40af] p-2 rounded-lg border-4 border-[#1e40af] lg:ml-10">
            Area Manager Tacking
          </p>
        </div>
        
        <div className="w-full">
          <AreaMangerDetailsTable />
        </div>
      </div>
    </div>
  )
}
