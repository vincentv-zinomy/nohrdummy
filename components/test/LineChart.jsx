import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend:{
      display:false,
    },
    
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
     // And this will affect the horizontal lines (yAxe) of your dataset
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

};

const labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 50)  );
};

export const data = {
  labels,
  datasets: [
    {
        label: 'No Response',
        data: generateRandomData(),
        borderColor: '#CBCBCB',
        backgroundColor: '#CBCBCB',
        // pointRadius: 3
    },
    {
        label: 'Inactive',
        data: generateRandomData(),
        borderColor: '#E97C7C',
        backgroundColor: '#E97C7C',
    },
    {
        label: 'Response Received',
        data: generateRandomData(),
        borderColor: '#85B8EB',
        backgroundColor: '#85B8EB',
    },
    {
        label: 'Interviewed',
        data: generateRandomData(),
        borderColor: '#87D0A5',
        backgroundColor: '#87D0A5',
    },
    {
        label: 'Interview Scheduled',
        data: generateRandomData(),
        borderColor: '#FFE183',
        backgroundColor: '#FFE183',
    } 
  ],
};

export default function LineChart({ chartdata }) {
  const divRef = useRef(null);
  const [size,setSize] = useState({width:'100%', height:'100%'})

  useEffect(() => {
    if (divRef.current) {
      console.log(divRef.current.getBoundingClientRect(),'ref');
      setSize({
        width:divRef.current.getBoundingClientRect().width,
        height:divRef.current.getBoundingClientRect().height
      })
    }
  }, []);

  return (
    <div className='w-full h-full' ref={divRef}>
      <Line 
        options={options} 
        data={chartdata} 
        style={{
          width:`${size.width - 64}px`,
          height:'250px'
        }}
      />
    </div>
  );
}
