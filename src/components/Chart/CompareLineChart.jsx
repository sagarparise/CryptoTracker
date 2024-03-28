import React from 'react';
import { Chart as ChartJS, PointElement, LineElement, CategoryScale, Legend, LinearScale, Tooltip, Title } from "chart.js";
import { Line } from "react-chartjs-2";
import './chart.scss'
import { convertNumber } from "../Functions/numberConvert";
ChartJS.register(PointElement, LineElement, CategoryScale, LinearScale, Legend, Tooltip,Title);

function CompareLineChart({ chartData1, chartData2,currancyHead,priceToggle  }) {

  const data = {
    labels: chartData1 && chartData1[priceToggle].map((price) => convertDate(price[0])),
    datasets: [
      {
        label: currancyHead.crypto1,
        data: chartData1 && chartData1[priceToggle].map((price) => price[1]),
        fill: false,
        borderWidth:2,
        borderColor: 'blue',
        yAxisID: 'y', // Assign the dataset to the first y-axis
        tension: 0.25,
        pointRadius:0
       
      },
      {
        label:  currancyHead.crypto2,
        data: chartData2 && chartData2[priceToggle].map((price) => price[1]),
        fill: false,
        borderWidth:2,
        borderColor: 'green',
        yAxisID: 'y1', // Assign the dataset to the second y-axis
        tension: 0.25,
       pointRadius:0
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Comparison between ${currancyHead.crypto1} & ${currancyHead.crypto2}`,
          font: {
            size: 12
          },
        },
      },

    scales: {
      y: {
        type: 'linear' ,
        display: true,
        position: 'left' ,
        ticks: {
          callback: function(value) {
            // Convert value to dollar format
           if(priceToggle === 'prices') return '$' + value.toLocaleString();
            else{
              return "$" + convertNumber(value)
            }
  
          }
        }
      },
      y1: {
        type: 'linear' ,
        display: true,
        position: 'right' ,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            // Convert value to dollar format
           if(priceToggle === 'prices') return '$' + value.toLocaleString();
            else{
              return "$" + convertNumber(value)
            }
  
          }
        }
      },
    },
  };



  return (
    <div className='line-chart'>
    <Line className='line' data={data} options={options} />
  </div>
  );
}

export default CompareLineChart;

const convertDate = (number) => {
  const myDate = new Date(number);
  return myDate.getDate() + "/" + (myDate.getMonth() + 1);
};
