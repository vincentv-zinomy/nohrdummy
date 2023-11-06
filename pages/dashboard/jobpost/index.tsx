import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import React, { Fragment, useEffect, useState } from "react";
import { PlusIcon,EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/components/hooks/useToast";
import { useRouter } from "next/router";
import CommonTable, {
  HeaderItemForTableTypes,
} from "@/components/Tables/CommonTable";
import { RoleTypes } from "@/components/contexts/AuthContext";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import DeleteModal from "@/components/dashboard/jobpost/DeleteModal";
import { classNames } from "@/lib/common";

type Props = {};

const jobs:any[] = [
  {
    _id:'1',
    "title": "Job Title 41",
    "description": "Description for Job 41",
    "interviewers": [
      {
        "name": "Random Name 91",
        "email": "email91@example.com",
        "_id": "a98e5f2a-69f6-4de6-b25b-0a6c855efc5f",
        "phone": "+1 074155234",
        "roles": ["ADMIN"],
        "calendar_connected": true
      }
    ],
    candidates_count:8,
    "schedule_from_time": "17:42",
    "schedule_to_time": "08:28",
    "schedule_days": ["Wednesday"],
    "status": "active",
    "time_zone": "UTC-8",
    "salary_info": "Salary Info for Job 41",
    "assigned_number": "+1 954287931",
    "number_type": "Mobile",
    "message_template_id": "9ac91e9a-b487-4a1f-92bf-5e6c894f318e"
  },
  {
    _id:'2',
    "title": "Job Title 86",
    "description": "Description for Job 86",
    candidates_count:8,
    "interviewers": [
      {
        "name": "Random Name 9",
        "email": "email9@example.com",
        "_id": "f7e0ccf4-29a7-42c1-8414-4e878174a10b",
        "phone": "+44 6287745925",
        "roles": ["INTERVIEWER"],
        "calendar_connected": false
      }
    ],
    "schedule_from_time": "23:19",
    "schedule_to_time": "17:10",
    "schedule_days": ["Monday"],
    "status": "inactive",
    "time_zone": "UTC+5",
    "salary_info": "Salary Info for Job 86",
    "assigned_number": "+1 749883200",
    "number_type": "Home",
    "message_template_id": "2c18b9ec-2143-4e49-aec5-9b5b8a4d8607"
  },
  {
    _id:'3',
    "title": "Job Title 12",
    "description": "Description for Job 12",
    candidates_count:8,
    "interviewers": [
      {
        "name": "Random Name 31",
        "email": "email31@example.com",
        "_id": "6311a244-1533-4a29-97f2-646a50c63f42",
        "phone": "+44 9353478281",
        "roles": ["ADMIN"],
        "calendar_connected": true
      }
    ],
    "schedule_from_time": "01:30",
    "schedule_to_time": "13:59",
    "schedule_days": ["Thursday"],
    "status": "Pending",
    "time_zone": "UTC+3",
    "salary_info": "Salary Info for Job 12",
    "assigned_number": "+1 565813228",
    "number_type": "Mobile",
    "message_template_id": "f583e787-4d8d-4f67-88f7-0a7952dcb8a6"
  },
  {
    _id:'4',
    "title": "Job Title 71",
    "description": "Description for Job 71",
    candidates_count:8,
    "interviewers": [
      {
        "name": "Random Name 68",
        "email": "email68@example.com",
        "_id": "c05376d3-951b-4f5b-8f9d-58c25f10d153",
        "phone": "+44 7042493083",
        "roles": ["ADMIN"],
        "calendar_connected": false
      }
    ],
    "schedule_from_time": "11:56",
    "schedule_to_time": "01:23",
    "schedule_days": ["Wednesday"],
    "status": "active",
    "time_zone": "UTC-5",
    "salary_info": "Salary Info for Job 71",
    "assigned_number": "+1 822185332",
    "number_type": "Mobile",
    "message_template_id": "5c3cbf50-48b5-49c8-8f2c-ba99f0807197"
  },
  {
    _id:'5',
    "title": "Job Title 66",
    "description": "Description for Job 66",
    candidates_count:8,
    "interviewers": [
      {
        "name": "Random Name 62",
        "email": "email62@example.com",
        "_id": "8831a932-19d0-4e05-83a9-0374a4f7ebf6",
        "phone": "+1 835248393",
        "roles": ["INTERVIEWER"],
        "calendar_connected": true
      }
    ],
    "schedule_from_time": "07:07",
    "schedule_to_time": "15:05",
    "schedule_days": ["Tuesday"],
    "status": "inactive",
    "time_zone": "UTC+0",
    "salary_info": "Salary Info for Job 66",
    "assigned_number": "+1 763888284",
    "number_type": "Mobile",
    "message_template_id": "3e3fbd36-3a2b-4a64-a74e-21b0d2c67b95"
  },
  {
    _id:'6',
    "title": "Job Title 27",
    "description": "Description for Job 27",
    candidates_count:8,
    "interviewers": [
      {
        "name": "Random Name 49",
        "email": "email49@example.com",
        "_id": "d44aeb8f-0724-44ca-8dbb-6700ac3c8eb3",
        "phone": "+1 702381592",
        "roles": ["TEAM_MEMBER"],
        "calendar_connected": false
      }
    ],
    "schedule_from_time": "04:11",
    "schedule_to_time": "22:12",
    "schedule_days": ["Friday"],
    "status": "active",
    "time_zone": "UTC+0",
    "salary_info": "Salary Info for Job 27",
    "assigned_number": "+44 8473923175",
    "number_type": "Home",
    "message_template_id": "a4a775c9-b13b-45e3-924e-7e02f834862e"
  },
]
 



const jobpost = (props: Props) => {
  // const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState<boolean>(false)

 
  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const handleDeleteSelected = async () => {};

  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedIds.includes(item_id);
    console.log(selectedIds.includes(item_id))

    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedIds.filter(
        (i) => i !== item_id
      );
    } else {
      newSelectedItems = [...selectedIds, item_id];
    }
    console.log(newSelectedItems, 'new')
    setSelectedIds(newSelectedItems);
  };

  const showCustomComponent = (item: any, key: string) => {
      return <>

         {item.status === 'active' ? <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          Active
        </span> : <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
          <svg className="mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          Inactive
        </span> }
      </> 
  }

  return (
    <DashboardLayout>
      <div className="  sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Job Postings
          </h3>
          <p className="text-sm text-gray-500 mt-1">A list of all the jobs</p>
        </div>
        {jobs.length > 0 && 
          <Link
            href={'/dashboard/jobpost/create'}
            className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create new job
          </Link>
        }
      </div>
      <CommonTable
        renderCustomComponent={showCustomComponent}
        createAction={{
          id:'createjob',
          title:'You don’t have any job posts',   
          buttonLabel:'Create New Job Post',
          href:'/dashboard/jobpost/create'
        }}
        data={jobs.map((job: any) => {
          return {
            ...job,
            interviewers: job.interviewers
              .map((interviewer: any) => interviewer.name)
              .join(", "),
          };
        })}
        onRowClick={(item: any) => {
          handleCheckboxChange(item._id);
        }}
        header_items={[
          {
            key: "title",
            label: "Title",
            type: HeaderItemForTableTypes.TEXT,
          }, 
          {
            key: "interviewers",
            label: "Interviewer",
            type: HeaderItemForTableTypes.TEXT,
          },
          {
            key: "candidates_count",
            label: "Candidates",
            type: HeaderItemForTableTypes.TEXT,
          },
          {
            key: "status",
            label: "Status",
            type: HeaderItemForTableTypes.CUSTOM_COMPONENT,
          },
        ]}
        pagination={{
          totalItems: jobs.length,
          itemsPerPage: 10,
          onPageChange: (page: number) => {
          },
        }}
        selectedItems={selectedIds}
        setSelectedItems={setSelectedIds}
        handleCheckboxChange={handleCheckboxChange}
        selectionOptions={[
          {
            button_name: "Delete Selected",
            action: (ids: string[]) => {
              handleDeleteSelected();
            },
          },
        ]}
        rowActions={(item: any) => {
          return [
            <button
              type="button"
              className="inline-flex items-center rounded-full 
                        border border-violet-400
                        bg-violet-400 px-2.5 py-1.5 text-xs ml-1
                        font-medium text-white shadow-sm 
                        hover:bg-gray-50 hover:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 
                        focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => {
              }}
            >
              Start Conversation
            </button>,
             
            <button
              type="button"
              className="inline-flex items-center rounded-full ml-2
                       border border-green-700 
                       bg-green-700
                       px-3 py-1.5 text-xs 
                       font-medium text-white shadow-sm 
                       hover:bg-green-900 
                       focus:outline-none focus:ring-2 
                       focus:ring-green-500 
                       focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => {
                router.push(
                  `/app/candidates/view?job_id=${item._id}&open_modal=1`
                );
              }}
            > 
              Add Candidates
            </button>,
             <Menu as="div" className="relative ml-3">
             <div>
               <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2"> 
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />

               </Menu.Button>
             </div>
             <Transition
               as={Fragment}
               enter="transition ease-out duration-100"
               enterFrom="transform opacity-0 scale-95"
               enterTo="transform opacity-100 scale-100"
               leave="transition ease-in duration-75"
               leaveFrom="transform opacity-100 scale-100"
               leaveTo="transform opacity-0 scale-95"
             >
               <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none [&_button]:w-full [&_button]:text-start"> 
                   <Menu.Item >
                     {({ active }) => (
                       <Link href={`/dashboard/jobpost/update?id=${item._id}`}
                         className={classNames(
                           active ? "bg-gray-100" : "",
                           "block px-4    py-2 text-sm text-gray-700"
                         )}
                       >
                         Edit
                       </Link>
                     )}
                   </Menu.Item>
                   <Menu.Item >
                     {({ active }) => (
                       <button 
                         className={classNames(
                           active ? "bg-gray-100" : "",
                           "block px-4 py-2 text-sm text-gray-700"
                         )}
                         onClick={()=>setOpen(true)}
                       >
                         Delete
                       </button>
                     )}
                   </Menu.Item>
                   <Menu.Item >
                     {({ active }) => (
                       <Link
                          href={`/dashboard/jobpost/details?id=${item._id}`} 
                         className={classNames(
                           active ? "bg-gray-100" : "",
                           "block px-4 py-2 text-sm text-gray-700"
                         )}
                       >
                         View Detail
                       </Link>
                     )}
                   </Menu.Item>
               </Menu.Items>
             </Transition>
           </Menu>
          ];
        }}
      />
      <DeleteModal open={open} setOpen={setOpen}/>
    </DashboardLayout>
  );
};

export default jobpost;
