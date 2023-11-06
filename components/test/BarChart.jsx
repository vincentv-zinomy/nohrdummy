import React from 'react'
import { Bar } from 'react-chartjs-2' 

const options = {
    
    plugins:{
      legend:{
        display:false,
      },
      labels:{
        font: {
          size: 8
        }
      }
    },
    scales: {
        x: {
          grid: {
            display: false
          }
        },
         y: {
            grid: {
                color: 'rgb(226 232 240)',
            },
            border: {
                dash: [4,4],
            },
            ticks:{
              stepSize: 10
            }
       }
      },
      maintainAspectRatio: false
}

const BarChart = ({chartData}) => {
  return (
    <div className='w-full h-full'>
        <Bar 
            data={chartData} 
            options={options}
            height={'228px'}
            width={'100%'}
        />
    </div>
  )
}

export default BarChart