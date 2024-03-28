import React from 'react'
import './chart.scss'
import { convertNumber } from '../Functions/numberConvert';
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  LinearScale,
  CategoryScale,
  Legend, 
  Tooltip,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  PointElement,
  LineElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Title
);
function LChart({chartData, priceToggle}) {
 // console.log(priceToggle)



const data = {
  labels: chartData[priceToggle].map((price)=> convertDate(price[0])),
  datasets: [{
  
    data:chartData[priceToggle].map((price)=> price[1]),
    fill:true,
    borderColor: '#3980e9',
    tension: 0.25,
    backgroundColor: '#3980e9',
    pointRadius: 0,
  }
  
],
  responsive: true,
 
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  }
};

const options = {
  plugins: {
    legend: {
      display: false, // Hide legend
    },
  
   
  },

   tooltip: {
      enabled: true, // Enable tooltips
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Set background color for tooltip
      titleFont: {
        size: 16,
        weight: 'bold',
      },
  },

  scales: {
    y: {
      ticks: {
        callback: function(value) {
          // Convert value to dollar format
         if(priceToggle === 'prices') return '$' + value.toLocaleString();
          else{
            return "$" + convertNumber(value)
          }

        }
      }
    }
}

};

  return (
    <div className='line-chart'>
      <Line className='line' data={data} options={options} />
    </div>
  )
}

export default LChart

const convertDate = (number)=>{
  const myDate = new Date(number);
  return myDate.getDate() +"/"+ (myDate.getMonth() + 1);
}

