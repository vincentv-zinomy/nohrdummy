import React, { useState } from 'react'
import BarChart from '@/components/test/BarChart.jsx'
import LineChart from '@/components/test/LineChart.jsx'
import {UserData, CandidateData, LineChartdata} from './data'
import {Chart as ChartJS} from 'chart.js/auto'

console.log(UserData) 

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

const Charts = () => {
 

  const [candidateData, setCandidateData] = useState({
    labels: CandidateData.map((data)=>data.status),
    datasets:[{
      label: '',
      data:CandidateData.map((data)=>data.candidates),
      barPercentage:0.2,
      backgroundColor:['#BCBCBC', '#E97C7C','#85B8EB','#87D0A5', '#FFE183'],
      borderRadius: '10',
    }]
  })

  const [lineChartData, setLineChartData] = useState(data)

 

  return (
    <div>
      <BarChart chartData={candidateData}/>
      <LineChart chartdata={lineChartData}/>
    </div>
  )
}

export default Charts