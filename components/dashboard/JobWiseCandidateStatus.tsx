import React, { useState } from 'react'
import SelectInput from '../common/SelectInput'
import BarChart from '../test/BarChart'
import { CandidateData } from '../test/data'

type Props = {}

const jobs = [
    {
        id:1,
        name:'Project Manager'
    }, 
    {
        id: 2,
        name:'Frontend Developer'
    }, 
    {
        id: 3,
        name:'Backend Developer'
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

const JobWiseCandidateStatus = (props: Props) => {
    const [job, setJob] = useState(jobs[0])
    const [candidateData, setCandidateData] = useState({
        labels: CandidateData.map((data)=>data.status),
        datasets:[{
            label: '',
            data:CandidateData.map((data)=>data.candidates),
            barPercentage:0.2,
            backgroundColor:[
                '#BCBCBC', 
                '#E97C7C',
                '#85B8EB',
                '#87D0A5', 
                '#FFE183'
            ],
            borderRadius: '5',
        }]
      })
    
  return (
    <div className="w-full border rounded-md my-4">
        <div className="flex py-3 px-5 border-b items-center justify-between">
          <p className="text-md font-medium leading-6 text-gray-900">
            Overall candidate statistics
          </p>
          <SelectInput 
            value={job} 
            setValue={setJob} 
            values={jobs}
            />
        </div>

        <div className='p-4'>
            <BarChart chartData={candidateData}/>
        </div>

    </div>
  )
}

export default JobWiseCandidateStatus