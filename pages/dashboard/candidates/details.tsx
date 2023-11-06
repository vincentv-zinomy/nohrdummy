import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import React, { useState } from "react";
import { BsChevronBarLeft, BsChevronLeft } from "react-icons/bs";
import {
  ChevronLeftIcon,
  ClockIcon,
  CalendarIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  UserIcon,
  PhoneIcon,
  UserGroupIcon,
  IdentificationIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteModal from "@/components/dashboard/jobpost/DeleteModal";
import { useRouter } from "next/router";

type Props = {};

 

const candidate: any = {
  _id: "6",
  first_name: "Sarah",
  last_name: "Wilson",
  full_name: "Sarah Wilson",
  email: "sarah.w@example.com",
  phone: "999-999-9999",
  resume: "path/to/sarah_w_resume.pdf",
  status: "New",
  created_at: 1631510400,
  updated_at: 1631510400,
  interview_status: "Interviewed",
  job_id: "job303",
  outreach_date: "2023-09-18",
  response_recieved: true,
  interview_scheduled: true,
  interview_link: "https://example.com/sarah-interview",
};

const keys: any = {
  full_name: {
    label: "Full Name",
    icon: UserIcon,
  },
  email: {
    label: "Email",
    icon: EnvelopeIcon,
  },
  phone: {
    label: "Phone",
    icon: PhoneIcon,
  },
  outreach_date: {
    label: "Outreach Date",
    icon: CalendarIcon,
  },
  interview_status: {
    label: "Interviewed",
    icon: UserGroupIcon,
  },
  status: {
    label: "Candidate Status",
    icon: IdentificationIcon,
  },
};

const chats = [
  {
    name:'Anita',
    message:'Hi, Good afternoon',
    time:'13:00'
  },
  {
    name:'Jane',
    message:'Hi',
    time:'13:00'
  },
  {
    name:'Anita',
    message:'Yes, l’ll send you a link',
    time:'13:00'
  }
]

const details = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [chatTranscriptOpen, setChatTranscriptOpen] = useState<boolean>(false)
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="mb-10 pb-10">
        <div className="pb-5 border-b sm:flex sm:items-center sm:justify-between">
          <div className=" ">
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()}>
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Candidates Detail
              </h3>
            </div>
            <p className="mt-1 max-w-4xl text-sm text-gray-500 pl-6">
              Karen Johson All Details
            </p>
          </div>
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="ml-3 inline-flex items-center border border-brand-lightgreen bg-white px-6 py-2 text-sm font-medium text-brand-lightgreen shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 rounded-full"
              // onClick={()=>setOpen(!open)}
            >
              Interviewed
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center border border-brand-lightgreen bg-white px-6 py-2 text-sm font-medium text-brand-lightgreen shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 rounded-full"
              // onClick={()=>setOpen(!open)}
            >
              InActive
            </button>
            <Link
              href={"/dashboard/jobpost/update"}
              type="button"
              className="ml-3 inline-flex items-center border border-brand-lightgreen bg-white px-6 py-2 text-sm font-medium text-brand-lightgreen shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 rounded-full  "
            >
              Edit
            </Link>
            <button
              type="button"
              className="ml-3 inline-flex items-center border border-brand-lightgreen bg-white px-6 py-2 text-sm font-medium text-brand-lightgreen shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 rounded-full"
              onClick={() => setOpen(!open)}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid  gap-4 py-4 lg:grid-cols-3 md:grid-cols-2 border-b ">
          <div 
            className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
          >
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <UserIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500">
                  Full Name
              </p>
              <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">
                {candidate.full_name}
              </p>
            </div>
          </div>
          
          <div 
            className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
          >
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <EnvelopeIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500">
                  Email
              </p>
              <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">
                {candidate.email}
              </p>
            </div>
          </div>

          <div 
            className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
          >
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <PhoneIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500">
                  Phone
              </p>
              <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">
                {candidate.phone}
              </p>
            </div>
          </div>

          <div 
            className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
          >
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <CalendarIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500">
                Outreach Date
              </p>
              <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">
                {candidate.outreach_date}
              </p>
            </div>
          </div>

          <div 
            className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
          >
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <UserGroupIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500">
                Interview Status
              </p>
              <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">
                {candidate.interview_status}
              </p>
            </div>
          </div>

          <div 
            className="relative flex items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm "
          >
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <IdentificationIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-500">
                Candidate Status
              </p>
              <p className="truncate font-semibold text-sm mt-1  text-brand-solidgreen">
                {candidate.status}
              </p>
            </div>
          </div>

          
           
        </div>
        <div className="py-4 flex items-center pr-12">
          <div className="relative flex justify-between w-full items-center space-x-3 rounded-lg bg-white px-2 py-3 shadow-sm ">
            <div className="flex shrink-0 bg-brand-lightgreen/10 p-2 rounded-md">
              <ArrowTopRightOnSquareIcon className="h-6 w-6 text-brand-solidgreen" />
            </div>
            <div className="min-w-0 flex-1 ">
              <p className="text-sm font-medium text-gray-500">
                Interview Link
              </p>
              <p className="truncate font-medium text-sm mt-1  text-blue-500">
                {candidate.interview_link}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Resume</p>
            <button className="w-[118px] mt-2 h-8 py-1.5 bg-green-600 rounded-[100px] justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium font-['Outfit']">
              Download
            </button>
          </div>
        </div>


        <div className="border   mt-3 rounded-lg ">
          <div className="p-3 flex items-center justify-between cursor-pointer" onClick={()=>setChatTranscriptOpen(!chatTranscriptOpen)}>
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-brand-solidgreen"/>
              <p className="text-sm font-semibold">Chat Transcipt</p>
            </div>
            <button >
              <ChevronDownIcon className="h-4 w-4 text-gray-600"/>
            </button>
          </div>
          
          <div className={`border-t p-3 space-y-2 ${chatTranscriptOpen ? 'block' : 'hidden'} transition-all`}>
            {chats.map((x)=>{
              return (
                <div className="flex items-start gap-4 text-sm">
                  <div className="text-brand-solidgreen font-semibold">
                    [{x.time}]
                  </div>
                  <div>
                    <p className="text-brand-solidgreen font-semibold">{x.name}</p>
                    <p>{x.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <DeleteModal open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
};

export default details;
