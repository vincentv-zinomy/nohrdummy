import DashboardLayout from '@/components/NewLayout/DashboardLayout'
import React, { useState } from 'react'
import { BsChevronBarLeft, BsChevronLeft } from 'react-icons/bs'
import { ChevronLeftIcon, ClockIcon, CalendarIcon, DevicePhoneMobileIcon,EnvelopeIcon, CurrencyDollarIcon    } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { classNames } from '@/lib/common';
import CommonTable, { HeaderItemForTableTypes } from '@/components/Tables/CommonTable';
import CandidatesTable from '@/components/dashboard/jobpost/details/CandidatesTable';
import InterviewrsTable from '@/components/dashboard/jobpost/details/InterviewrsTable';
import DeleteModal from '@/components/dashboard/jobpost/DeleteModal';
import { useRouter } from 'next/router';


type Props = {}

const interviewers = [
  {
    "name": "Random Name 91",
    "email": "email91@example.com",
    "_id": "a98e5f2a-69f6-4de6-b25b-0a6c855efc5f",
    "phone": "+1 074155234",
    "roles": ["ADMIN"],
    "calendar_connected": true
  },
  {
    "name": "Random Name 23",
    "email": "email91@example.com",
    "_id": "a98e5f2a-69f6-sdsd-sdb25b-0a6c855efc5f",
    "phone": "+1 074155234",
    "roles": ["ADMIN"],
    "calendar_connected": true
  },
  {
    "name": "Random Name asd",
    "email": "email91@example.com",
    "_id": "a98e5f2a-69f6-sdsd-asdfas-0a6c855efc5f",
    "phone": "+1 074155234",
    "roles": ["ADMIN"],
    "calendar_connected": true
  }
   
]

const data = [
    {
        id:1,
        title:'Time Zone',
        ans:'Aisa / Culcuta', 
        icon:ClockIcon 
    }, 
    {
        id:2,
        title:'Interview Schedule Time',
        ans:'10:00 AM to 12:00 AM', 
        icon:ClockIcon 
    }, 
    {
        id:3,
        title:'Days',
        ans:'Monday, Tuesday, Friday', 
        icon:CalendarIcon  
    }, 
    {
        id:4,
        title:'Asigned Phone Number',
        ans:'+13158096145 (Free trial)-SMS', 
        icon:DevicePhoneMobileIcon   
    }, 
    {
        id:5,
        title:'Message Type',
        ans:'SMS', 
        icon:EnvelopeIcon   
    }, 
    {
        id:6,
        title:'Message Template',
        ans:'Product design Template', 
        icon:EnvelopeIcon   
    },
    {
        id:7,
        title:'Salary Range',
        ans:'Not Mention', 
        icon:CurrencyDollarIcon
    },
]

const candidates: any[] = [ 

  {
    _id: "3",
    first_name: "Michael",
    last_name: "Johnson",
    full_name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "555-555-5555",
    resume: "path/to/michael_j_resume.pdf",
    status: "Pending",
    created_at: 1631510400,
    updated_at: 1631510400,
    interview_status: "No Response",
    job_id: "job789",
    outreach_date: "2023-09-15",
    response_recieved: false,
    interview_scheduled: false,
    interview_link: "",
  },
  {
    _id: "4",
    first_name: "Emily",
    last_name: "Brown",
    full_name: "Emily Brown",
    email: "emily.b@example.com",
    phone: "777-777-7777",
    resume: "path/to/emily_b_resume.pdf",
    status: "Rejected",
    created_at: 1631510400,
    updated_at: 1631510400,
    interview_status: "No Response",
    job_id: "job101",
    outreach_date: "2023-09-16",
    response_recieved: true,
    interview_scheduled: false,
    interview_link: "",
  },
  {
    _id: "5",
    first_name: "David",
    last_name: "Miller",
    full_name: "David Miller",
    email: "david.m@example.com",
    phone: "888-888-8888",
    resume: "path/to/david_m_resume.pdf",
    status: "Pending",
    created_at: 1631510400,
    updated_at: 1631510400,
    interview_status: "InActive",
    job_id: "job202",
    outreach_date: "2023-09-17",
    response_recieved: false,
    interview_scheduled: false,
    interview_link: "",
  },
  {
    _id: "6",
    first_name: "Sarah",
    last_name: "Wilson",
    full_name: "Sarah Wilson",
    email: "sarah.w@example.com",
    phone: "999-999-9999",
    resume: "path/to/sarah_w_resume.pdf",
    status: "Shortlisted",
    created_at: 1631510400,
    updated_at: 1631510400,
    interview_status: "Interviewed",
    job_id: "job303",
    outreach_date: "2023-09-18",
    response_recieved: true,
    interview_scheduled: true,
    interview_link: "https://example.com/sarah-interview",
  },
  // Add more candidates as needed to reach a total of 10
];

console.log(candidates);


console.log(candidates);


const details = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  return (
    <DashboardLayout>
      <div>
        <div className="pb-5 border-b sm:flex sm:items-center sm:justify-between">
          <div className=' '>
            <div className='flex items-center gap-2'>
                <button  onClick={()=>router.back()} >
                    <ChevronLeftIcon className='h-4 w-4'/> 
                </button>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                Job Postings
                </h3>
            </div>
            <p className="mt-1 max-w-4xl text-sm text-gray-500 pl-6">
            A list of all jobs
            </p> 
          </div>
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            
            <Link
              href={'/dashboard/jobpost/update'}
              type="button"
              className="ml-3 inline-flex items-center border border-brand-lightgreen bg-white px-6 py-2 text-sm font-medium text-brand-lightgreen shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 rounded-full  "
            >
              Edit
            </Link>
            <button
              type="button"
              className="ml-3 inline-flex items-center border border-brand-lightgreen bg-white px-6 py-2 text-sm font-medium text-brand-lightgreen shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 rounded-full"
              onClick={()=>setOpen(!open)}
            >
              Delete
            </button>
          </div>
        </div>
        <div>
            <div className='py-4'>
                <h3 className="text-zinc-500 text-sm font-normal">Job Title</h3>
                <p className="text-green-900 text-base font-medium">Product Designer</p>
            </div>
        </div>
        <div className="w-full   px-6 pt-5 pb-7 bg-gray-200 bg-opacity-30 rounded-[10px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex-col justify-start items-start gap-2 flex">
                <div className="text-zinc-500 text-base font-medium">Job Discription</div>
                <div className="  text-zinc-900 text-sm font-normal">A Product Designer is a professional who is in charge of translating the wants and needs of consumers into product design features. They must have a creative eye, be able to think outside the box in order to come up with new ideas or solutions that meet customer expectations, and create digital or print drawings as well as design fully-functional products.</div>
            </div>
        </div>
    
        <div className="grid  gap-4 py-8 lg:grid-cols-3 md:grid-cols-2 border-b ">
            {data.map((item) => (
                <div
                key={item.id}
                className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
                >
                <div className="flex-shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
                    <item.icon className="h-7 w-7 rounded-full text-brand-solidgreen"/>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500">{item.title}</p>
                    <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">{item.ans}</p>
                </div>
                </div>
            ))}
        </div>  
        <div className='mt-4'>
          <CandidatesTable candidates={candidates}/>
          <InterviewrsTable interviewers={interviewers}/>
        </div>
      </div>
      <DeleteModal open={open} setOpen={setOpen}/>
  </DashboardLayout>
  )
}

export default details