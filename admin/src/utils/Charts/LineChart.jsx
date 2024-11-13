import React from 'react'
import {Line} from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import './LineChart.css'

const labels = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
const options={
    plugins:{
        legend:{
            position:"top"
        },
        title:{
            display:true,
            text:"State Vise Sales",
            fontSize:30
        }
    }
}
const data = {
  labels: labels,
  datasets: [{
    label: 'Bihar',
    data: [65, 59, 80, 81, 72, 69, 67,71,65,80,69,82],
    fill: false,
    borderColor: "#fe8a96",
    tension: 0.1
  },
  {
    label: 'AndhraPradesh',
    data: [70, 59, 81, 82, 87, 54, 65,75,63,75,56,84],
    fill: false,
    borderColor: "#3a9be9",
    tension: 0.1
  },{
    label: 'Karnataka',
    data: [65, 69, 70, 72, 81, 64, 59,75,66,72,66,74],
    fill: false,
    borderColor: "#39d2bc",
    tension: 0.1
  }
  
]
};

const config = {
    type: 'line',
    data: data,
  };
const LineChart = () => {
  return (
    <div className='linebar-container'>
<Line data={data} options={options}/>
    </div>
  )
}

export default LineChart