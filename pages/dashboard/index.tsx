import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import Image from "next/image";
import newjobimg from "@/assets/images/0newHR/images/table/I_Copywriting_Icon_01-01 1.png";
import addcandidate from "@/assets/images/0newHR/images/dashboard/addcandidate.png";
import coversationimg from "@/assets/images/0newHR/images/dashboard/coversation-01.png";
import Link from "next/link";
import AddCandidateModal from "@/components/onboard/AddCandidateModal";
import { useState } from "react";
import CandidateStatistics from "@/components/dashboard/CandidateStatistics";
import JobWiseCandidateStatus from "@/components/dashboard/JobWiseCandidateStatus";
import {Chart, BarController, BarElement} from 'chart.js'

Chart.register(BarElement)


export default function index() {

  const [open, setOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="w-full pb-10">

        <div className="  pb-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Dashboard
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="w-full border p-2  rounded-md">
            <div className="  text-brand-solidgreen text-sm font-medium font-['Outfit']">
              Total Jobpost
            </div>
            <div className="text-black text-xl mt-2 font-semibold font-['Outfit']">
              0
            </div>
          </div>
          <div className="w-full border p-2  rounded-md">
            <div className="  text-brand-solidgreen text-sm font-medium font-['Outfit']">
              Total Candidates
            </div>
            <div className="text-black text-xl mt-2 font-semibold font-['Outfit']">
              0
            </div>
          </div>
          <div className="w-full border p-2  rounded-md">
            <div className="  text-brand-solidgreen text-sm font-medium font-['Outfit']">
              Total Members
            </div>
            <div className="text-black text-xl mt-2 font-semibold font-['Outfit']">
              0
            </div>
          </div>
          <div className="w-full border p-2  rounded-md">
            <div className="  text-brand-solidgreen text-sm font-medium font-['Outfit']">
              Interviewers
            </div>
            <div className="text-black text-xl mt-2 font-semibold font-['Outfit']">
              0
            </div>
          </div>
        </div>

        <div>
          <div className="mt-6 rounded-md w-full flex flex-col items-center justify-center bg-gray-100/50 pb-10 border border-slate-200">
            <Image src={newjobimg} alt="" width={212} height={212} />
            <h4 className="font-semibold ">You don’t have any job posts</h4>

            <Link
              href={"/dashboard/jobpost/create"}
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2"
            >
              Create New Job Post
            </Link>
          </div>
        </div>

        <div className="flex items-center pl-2 pr-8 py-1 justify-between   mt-6 rounded-md w-full  bg-gray-100/50   border border-slate-200">
          <div className="flex gap-2 items-center">
            <Image src={newjobimg} alt="" width={100} height={100} />
            <h3 className="font-semibold text-sm max-w-md">"Expand your team's potential. Add more job postings effortlessly and
      unlock new opportunities.</h3>
          </div>
          <button className="inline-flex items-center rounded-full border border-brand-solidgreen bg-white px-4 py-2 text-base font-medium text-brand-solidgreen  hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2">
            Add More Jobs 
          </button>
        </div>

        <div className=" pb-6  mt-6 rounded-md w-full flex flex-col items-center justify-center bg-gray-100/50   border border-slate-200">
          <div className="">
            <Image src={addcandidate} alt="" width={212} height={212} />
          </div>
          <h4 className="font-semibold max-w-md text-center">You have recently added Product Designer Job, Start adding candidate to schedule interviews</h4>
          <button
            className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2"
            onClick={()=>setOpen(true)}
          >
            Add Candidates
          </button>
        </div>
        <div className=" py-6  mt-6 rounded-md w-full flex flex-col items-center justify-center bg-gray-100/50   border border-slate-200">
          <div className="">
            <Image src={coversationimg} alt="" width={150} height={150} />
          </div>
          <h4 className="font-semibold max-w-md text-center">You already have added candidates to your job posts, start conversation to schedule interview</h4>
          <Link
            href={"/dashboard/jobpost"}
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2"
          >
            Go to Job Posts
          </Link>
        </div>

        <div className="flex items-center gap-6 w-full">
          <div className="w-full h-full shrink-1">

            <JobWiseCandidateStatus />
          </div>
          <div className="rounded-lg border  max-w-[250px] shrink-0  h-full bg-green-100">
            <h3 className="p-3 border-b font-semibold ">Insights</h3>
            <div className="px-4 py-3 text-sm border-t">
              <h4 className="font-medium">Conversation</h4>
              <div className="mt-2 w-full h-3 bg-slate-200">
                <div className="w-3/4 bg-green-900 h-full">
                  <div className="w-11/12 bg-yellow-300 h-full">

                  </div>
                </div>
              </div>
              <div className="px-2 py-1.5 font-semibold bg-green-300 mt-3 text-xs rounded-md w-fit mx-auto">
                Total Candidates : 60
              </div>
            </div>

            <div className="border-t px-4 py-3 flex    gap-2">
                <div className="rounded-full h-2 w-2 mt-2 text-sm bg-yellow-300 shrink-0"></div> 
              <p className="text-brand-solidgreen text-sm font-medium"> 50% candidates you have started conversation has no response yet.</p>
            </div>

            <div className="border-t px-4 py-3 flex   gap-2">
              <div className="rounded-full h-2 w-2 mt-2 text-sm bg-green-900 shrink-0"></div>
              <p className="text-brand-solidgreen text-sm font-medium">2% candidates whom responded has scheduled the interview</p>
            </div>
          </div>
        </div>

        <CandidateStatistics/>
        
      </div>

      <AddCandidateModal open={open} setOpen={setOpen} />

    </DashboardLayout>
  );
}
