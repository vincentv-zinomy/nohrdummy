import React, { useState } from 'react'
import SelectInput from '../common/SelectInput'
import LineChart from '../test/LineChart'
 

type Props = {}

const time_periods = [
    {
        id:1,
        name:'Daily'
    }, 
    {
        id: 2,
        name:'Monthly'
    }, 
    {
        id: 3,
        name:'Yearly'
    }, 
]
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

const CandidateStatistics = (props: Props) => {
    const [duration, setDuration] = useState(time_periods[0])
    const [lineChartData, setLineChartData] = useState(data)
    
  return (
    <div className="border rounded-md my-4">
        <div className="flex py-3 px-5 border-b items-center justify-between">
          <p className="text-md font-medium leading-6 text-gray-900  ">
            Overall candidate statistics
          </p>
          <SelectInput 
            value={duration} 
            setValue={setDuration} 
            values={time_periods}
            />
        </div>

        <div className='p-4  '>
            <LineChart chartdata={lineChartData}/>
        </div>
        <div className='px-4 pb-4 flex items-center gap-4 justify-center'>
          {data.datasets.map((x)=>(
            <div className='flex items-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full' style={{backgroundColor:x.backgroundColor}}></span>
              <p className='text-xs text-gray-500 gap-2'>{x.label}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default CandidateStatistics