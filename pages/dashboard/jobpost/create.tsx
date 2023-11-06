import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, Fragment, useContext, useRef, useState } from "react";
import {
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import SelectInterviewerInput from "@/components/dashboard/jobpost/SelectInterviewerInput";
import CustomSelectInput from "@/components/dashboard/jobpost/CustomSelectInput";
import ScheduleDaysComponent from "@/components/dashboard/jobpost/ScheduleDaysComponent";
import { useToast } from "@/components/hooks/useToast";
import AddInterviewerModal from "@/components/dashboard/team/AddInterviewerModal";
type Props = {};
const values = [
  { id: 1, phone_number: '+ 13158096145' },
  { id: 2, phone_number: 'Arlene Mccoy' },
  { id: 3, phone_number: 'Devon Webb' },
  { id: 4, phone_number: 'Tom Cook' } 
]



const interviewTimezones = [
  {
    id: 1,
    "interview-timezone":'Asia / Culcutta',
  },
  {
    id: 2,
    "interview-timezone":'USA / California',
    
  },
  {
    id:3,
    "interview-timezone":"Canada / Torronto"
  }
]

const message_templates = [
  { 
    id: 1, 
    message_template: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, assumenda.' 
  },
  { 
    id: 2, 
    message_template: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, assumenda.' 
  },
  { id: 3, message_template: 'Devon Webb' },
  { id: 4, message_template: 'Tom Cook' } 
]

const timesFrom = [
  { id: 1, schedule_time_from: '00:00' },
  { id: 2, schedule_time_from: '01:00' },
  { id: 3, schedule_time_from: '02:00' },
  { id: 4, schedule_time_from: '03:00' },
  { id: 5, schedule_time_from: '04:00' },
  { id: 6, schedule_time_from: '05:00' },
  { id: 7, schedule_time_from: '06:00' },
  { id: 8, schedule_time_from: '07:00' },
  { id: 9, schedule_time_from: '08:00' },
  { id: 10, schedule_time_from: '09:00' },
  { id: 11, schedule_time_from: '10:00' },
  { id: 12, schedule_time_from: '11:00' },
  { id: 13, schedule_time_from: '12:00' },
  { id: 14, schedule_time_from: '13:00' },
  { id: 15, schedule_time_from: '14:00' },
  { id: 16, schedule_time_from: '15:00' },
  { id: 17, schedule_time_from: '16:00' },
  { id: 18, schedule_time_from: '17:00' },
  { id: 19, schedule_time_from: '18:00' },
  { id: 20, schedule_time_from: '19:00' },
  { id: 21, schedule_time_from: '20:00' },
  { id: 22, schedule_time_from: '21:00' },
  { id: 23, schedule_time_from: '22:00' },
  { id: 24, schedule_time_from: '23:00' }
];



const timesTo = [
  { id: 1, schedule_time_to: '00:00' },
  { id: 2, schedule_time_to: '01:00' },
  { id: 3, schedule_time_to: '02:00' },
  { id: 4, schedule_time_to: '03:00' },
  { id: 5, schedule_time_to: '04:00' },
  { id: 6, schedule_time_to: '05:00' },
  { id: 7, schedule_time_to: '06:00' },
  { id: 8, schedule_time_to: '07:00' },
  { id: 9, schedule_time_to: '08:00' },
  { id: 10, schedule_time_to: '09:00' },
  { id: 11, schedule_time_to: '10:00' },
  { id: 12, schedule_time_to: '11:00' },
  { id: 13, schedule_time_to: '12:00' },
  { id: 14, schedule_time_to: '13:00' },
  { id: 15, schedule_time_to: '14:00' },
  { id: 16, schedule_time_to: '15:00' },
  { id: 17, schedule_time_to: '16:00' },
  { id: 18, schedule_time_to: '17:00' },
  { id: 19, schedule_time_to: '18:00' },
  { id: 20, schedule_time_to: '19:00' },
  { id: 21, schedule_time_to: '20:00' },
  { id: 22, schedule_time_to: '21:00' },
  { id: 23, schedule_time_to: '22:00' },
  { id: 24, schedule_time_to: '23:00' }
]

export type DaysType = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type jobPostFormI = {
  "job-title":string,
  "job-description":string,
  "interview-timezone": 'Asia / Culcutta' | 'USA / California' | "Canada / Torronto",
  phone_number:string,
  "salary-range":string,
  "message_template":string,
  schedule_time_from:string,
  schedule_time_to:string,
  schedule_days:DaysType[]
}

const create = (props: Props) => {
  const [open,setOpen] = useState<boolean>(false)
  const router = useRouter();
  const toast = useToast()
  const [formData, setFormData] = useState<jobPostFormI>({
    "job-title": "",
    "job-description": "",
    "interview-timezone": "Canada / Torronto",
    "salary-range": "",
    "phone_number":'+ 13158096145',
    "message_template":`Default Message  (Active) `,
    "schedule_time_from":'10:00',
    "schedule_time_to":'12:00',
    "schedule_days":[]
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(formData.schedule_days.length === 0){
        toast.addToast('error','Please fill Schedule Days')
    }
    toast.addToast('success','Job Created Successfully')
    router.push('/dashboard/jobpost')
  }

  return (
    <>
      <DashboardLayout>
        <form onSubmit={handleSubmit}>
          <div className="  sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <button onClick={() => router.back()}>
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                  Job Postings
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1 pl-6">
                A list of all the jobs
              </p>
            </div>
            <button className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Create new job
            </button>
          </div>
          <div className="py-10 space-y-6">
            <div>
              <label
                htmlFor="job-title"
                className="block text-base font-medium text-gray-700"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="job-title"
                  name="job-title"
                  type="text"
                  autoComplete="job-title"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  value={formData["job-title"]}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="job-description"
                className="block text-base font-medium text-gray-700"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="job-description"
                  name="job-description"
                  autoComplete="job-description"
                  required
                  rows={4}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  value={formData["job-description"]}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <p
                className="block text-base font-medium text-gray-700"
              >
                Interview timezone 
              </p>
              <CustomSelectInput 
                    values={interviewTimezones} 
                    formData={formData} 
                    setFormData={setFormData} 
                    value={'interview-timezone'} 
                  />
            </div>
            <div>
              <label
                htmlFor="salary-range"
                className="block text-base font-medium text-gray-700"
              >
                Salary Range
              </label>
              <div className="mt-1">
                <input
                  id="salary-range"
                  name="salary-range"
                  type="number"
                  autoComplete="salary-range"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  value={formData["salary-range"]}
                  onChange={handleChange}
                />
              </div>
            </div> 

            <div className="w-full    p-4 rounded-md border border-gray-300    " > 
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-black ">
                  Interviewers
                </h3>   
                <button className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={()=>setOpen(true)}>
                  Add New Interviewer
                </button>
              </div>
              <SelectInterviewerInput/>
            </div>
            <div className="sm:col-span-6 sm:w-full mt-4">
                <p className="text-md text-black mt-1  font-bold">Schedule Time</p>
                <div className="flex items-center gap-10">
                  <div className="space-y-2 mt-3 w-48  shrink-0">
                    <p className="block text-sm font-medium text-gray-700 ">From</p>
                    <CustomSelectInput 
                      values={timesFrom} 
                      formData={formData} 
                      setFormData={setFormData} 
                      value={'schedule_time_from'} 
                    />
                  </div>
                  <div className="space-y-2 mt-3  w-48  shrink-0">
                    <p className="block text-sm font-medium text-gray-700 ">to</p>
                    <CustomSelectInput 
                      values={timesTo} 
                      formData={formData} 
                      setFormData={setFormData} 
                      value={'schedule_time_to'} 
                    />
                  </div>
                </div>
                <ScheduleDaysComponent setFormData={setFormData} formData={formData}/>
            </div>
            <div className="sm:col-span-6 sm:w-full mt-4">
                <p className="text-md text-black mt-1  font-bold"> Phone & Message Settings</p>
                <div className="space-y-2 mt-3">
                  <p className="block text-sm font-medium text-gray-700 ">Assigned Phone Number</p>
                  <p className=" text-zinc-500 text-sm font-normal  ">This number will be used to interact with the candidate</p>
                  <CustomSelectInput 
                    values={values} 
                    formData={formData} 
                    setFormData={setFormData} 
                    value={'phone_number'} 
                  />
                </div>
                <div className="space-y-2 mt-3">
                  <p className="block text-sm font-medium text-gray-700 ">Message Template</p>
                  <p className=" text-zinc-500 text-sm font-normal  ">This message template will be used to interact with candidate</p>
                  <CustomSelectInput 
                    values={message_templates} 
                    formData={formData} 
                    setFormData={setFormData} 
                    value={'message_template'} 
                  />
                </div>
              </div>
                  
              
          </div>
        </form>
      </DashboardLayout>
      <AddInterviewerModal open={open} setOpen={setOpen}/>
    </>
  );
};

export default create;
