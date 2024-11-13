import React,{useEffect, useRef} from 'react'
import {Chart} from 'chart.js/auto'
import {Pie} from 'react-chartjs-2'
import './PieChart.css'
const PieChart = () => {
 
    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'Sales',
          data: [100, 100, 100],
          backgroundColor: [
            "#fe8a96",
            "#3a9be9",
            "#39d2bc",
            "#fe8a96"
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'pie',
        data: data,
      };
  return (
    <div>
     <Pie data={data}  className='pie-chart'/>
        
    </div>
  )
}

export default PieChart 

