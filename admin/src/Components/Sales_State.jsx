import React from 'react';
// import Sales from '../../../server/models/salesModel';
import { useState,useEffect } from 'react';
import { BASE_URL } from '../constants';
import PieChart from '../utils/Charts/PieChart';

const ListItems = () => {

  const [sales, setSales] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    fetch(`${BASE_URL}/api/sales/getOrdersGroupedByState`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSales(data);
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);  


  
 

    return (
        <div className='shadow-md rounded-lg p-3   gap-5 bg-[#1E40AF] font-sans overflow-y-auto' >
            <div>
                <h1 className='font-bold py-4 px-2 text-2xl  text-white text-center'>Sales By State</h1>
            </div>
            <div>
                <table className="table-auto overflow-y-auto text-white  w-full">
                    <thead>
                        <tr className='text-white text-xl bg-[rgba(255,255,255,0.3)]'>
                            <th className='px-4 py-2 text-xl'>State</th>
                            <th className='px-4 py-2 text-xl'>Sales</th>
                            <th className='px-4 py-2 text-xl'>Value</th>
                            {/* <th className='px-4 py-2 text-xl'>Bounce Percentage</th> */}
                        </tr>
                    </thead>
                  
                    <tbody className='text-center'>
                        
               
                       {
                      sales.map((sale,index)=>(
                       <tr key={index} className='hover:bg-[rgba(255,255,255,0.3)]'>
                        <td className=' px-4 py-2  '>{sale._id}</td>
                        <td className=' px-4 py-2'>{sale.totalOrderQuantity}</td>
                        <td className=' px-4 py-2'>{`rs ${sale.totalRevenue}`}</td>
                       </tr>
                      ))
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TopSalesArea = () => {
  const [cities,setCities]=useState([]);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    fetch(`${BASE_URL}/api/sales/getOrdersGroupedByCity`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCities(data);
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);  

  return (
    <div className='p-4  bg-gradient-to-r bg-[#1E40AF] text-white rounded-xl font-bold '>
      <div>
        <h1 className='font-bold text-2xl text-center'>Top Sales</h1>
      </div>
      <div className="mt-5 shadow-2xl ">
        <table className="table-auto ">
          <thead className='bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.3)]'>
            <tr className='font-bold text-xl'>
              <th className="px-4 py-2 text-xl">Rank</th>
        
              <th className="px-4 py-2 text-xl">City</th>
              
              <th className="px-4 py-2 text-xl">Sales Amount</th>
            </tr>
          </thead>
          <tbody className='text-sm '>
           
            {
                     cities.map((city,index)=>(
                       <tr key={index} className='hover:bg-[rgba(255,255,255,0.3)]'>
                        <td className=' px-4 py-2  '>{index+1}</td>
                        <td className=' px-4 py-2'>{city._id}</td>
                        <td className=' px-4 py-2'>{`rs ${city.totalSales}`}</td>
                       </tr>
                      ))
                    }
           
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Sales_State = ({data}) => {
    return (
        <div>
            <div className='p-5 grid grid-cols-1  lg:grid-cols-3 gap-4 w-full'>
                <ListItems />
                <TopSalesArea/>
                <PieChart data={data} />
            </div>
        </div>
    );
};

export default Sales_State;







