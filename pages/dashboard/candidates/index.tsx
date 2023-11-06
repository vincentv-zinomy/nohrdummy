import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import { classNames } from "@/lib/common";
import { Fragment, useState } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import FilterDropdown from "@/components/dashboard/candidates/FilterDropdown";
import { RoleTypes } from "@/components/contexts/AuthContext";
import CommonTable, {
  HeaderItemForTableTypes,
} from "@/components/Tables/CommonTable";
import Badges from "@/components/common/Badges";
import Link from "next/link";
import AddCandidateModal from "@/components/onboard/AddCandidateModal";
import { useRouter } from "next/router";
import CustomModal from "@/components/common/CustomModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import EditCandidateModal from "@/components/dashboard/candidates/EditCandidateModal";

// Sample data for team members
const teamMembers: any[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    _id: "1",
    phone: "123-456-7890",
    roles: [RoleTypes.ADMIN, RoleTypes.TEAM_MEMBER],
    calendar_connected: true,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    _id: "2",
    phone: "987-654-3210",
    roles: [RoleTypes.TEAM_MEMBER],
    calendar_connected: false,
  },
  {
    name: "Michael Johnson",
    email: "michael.j@example.com",
    _id: "3",
    phone: "555-555-5555",
    roles: [RoleTypes.TEAM_MEMBER, RoleTypes.INTERVIEWER],
    calendar_connected: true,
  },
  {
    name: "Emily Brown",
    email: "emily.b@example.com",
    _id: "4",
    phone: "777-777-7777",
    roles: [RoleTypes.TEAM_MEMBER],
    calendar_connected: true,
  },
  {
    name: "David Miller",
    email: "david.m@example.com",
    _id: "5",
    phone: "888-888-8888",
    roles: [RoleTypes.TEAM_MEMBER],
    calendar_connected: false,
  },
];

const candidateArray: any[] = [
  {
    _id: "6324202698d0762e242b1014",
    first_name: "John",
    last_name: "Doe",
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-555-5555",
    resume: "https://example.com/john-doe.pdf",
    status: "New",
    created_at: 1663153926000,
    updated_at: 1663153926000,
    interview_status: "No Response",
    job_id: "6324202698d0762e242b1013",
    outreach_date: "2023-09-15",
    response_recieved: false,
    interview_scheduled: false,
  },
  {
    _id: "6324202698d0762e242b1015",
    first_name: "Jane",
    last_name: "Doe",
    full_name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1-555-555-5556",
    resume: "https://example.com/jane-doe.pdf",
    status: "In Progress",
    created_at: 1663153926000,
    updated_at: 1663153926000,
    interview_status: "Interviewed",
    job_id: "6324202698d0762e242b1013",
    outreach_date: "2023-09-15",
    response_recieved: true,
    interview_scheduled: true,
  },
  {
    _id: "6324202698d0762e242b1016",
    first_name: "Mike",
    last_name: "Smith",
    full_name: "Mike Smith",
    email: "mike.smith@example.com",
    phone: "+1-555-555-5557",
    resume: "https://example.com/mike-smith.pdf",
    status: "Hired",
    created_at: 1663153926000,
    updated_at: 1663153926000,
    interview_status: "Interviewed",
    job_id: "6324202698d0762e242b1013",
    outreach_date: "2023-09-15",
    response_recieved: true,
    interview_scheduled: true,
  },
  {
    _id: "6324202698d0762e242b1017",
    first_name: "Mary",
    last_name: "Jones",
    full_name: "Mary Jones",
    email: "mary.jones@example.com",
    phone: "+1-555-555-5558",
    resume: "https://example.com/mary-jones.pdf",
    status: "Rejected",
    created_at: 1663153926000,
    updated_at: 1663153926000,
    interview_status: "Interviewed",
    job_id: "6324202698d0762e242b1013",
    outreach_date: "2",
    response_recieved: true,
    interview_scheduled: true,
    interview_link: "https://example.com/interview/1234567890",
  },
];

type Props = {};

const jobs = [
  { id: 1, name: "Product Manager" },
  { id: 2, name: "Frontend Engineer" },
  { id: 3, name: "Backend Developer" },
];

const index = (props: Props) => {

  const [selectedJob, setSelectedJob] = useState(jobs[2]);


  const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   Modal states
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectCandidate, setSelectCandidate] = useState<any | null>(null)

  const router = useRouter()
  
  const [interviewStatusFilter, setInterviewStatusFilter] = useState<any>([
    {
      key: "no response",
      label: "No Response",
      checked: false,
    },
    {
      key: "response recieved",
      label: "Response Recieved",
      checked: false,
    },
    {
      key: "interview scheduled",
      label: "Interview Scheduled",
      checked: false,
    },
    {
      key: "inactive",
      label: "Inactive",
      checked: false,
    },
    {
      key: "interviewed",
      label: "Interviewed",
      checked: false,
    },
  ]);

  const [candidateStatusFilter, setCandidateStatusFilter] = useState<any>([
    {
      key: "new",
      label: "New",
      checked: false,
    },
    {
      key: "old",
      label: "Old",
      checked: false,
    },
  ]);

  const handleDeleteSelected = async () => {};

  const handleDelete = () => {

  }

  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedIds.includes(item_id);

    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedIds.filter(
        (i) => i !== item_id
      );
    } else {
      newSelectedItems = [...selectedIds, item_id];
    }
    setSelectedIds(newSelectedItems);
  };

  const showCustomComponent = (item: any, key: string) => {
    return (
      <>
        {item.interview_link && key === "interview_link" && (
          <Link href={item.interview_link} className="">
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-500" />
          </Link>
        )}
        {item.interview_status && key === "interview_status" && (
          <>
            {item.interview_status === "No Response" && (
              <span className="w-32 text-center flex justify-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                No Response
              </span>
            )}
            {item.interview_status === "Interviewed" && (
              <span className="w-32 text-center flex justify-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Interviewed
              </span>
            )}
            {item.interview_status === "InActive" && (
              <span className="w-32 text-center flex justify-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                Inactive
              </span>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <DashboardLayout>
      <p className="block text-sm font-medium text-gray-700">Jobs</p>
      <div className="flex items-center justify-between">
        <div>
          <Listbox value={selectedJob} onChange={setSelectedJob}>
            {({ open }) => (
              <>
                <div className="relative mt-1">
                  <Listbox.Button className="flex items-center justify-between relative w-96 cursor-default rounded-md border border-gray-300 bg-white py-2 px-3 text-left shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm">
                    <span className="flex items-center gap-2">
                      {selectedJob.name}
                    </span>
                    <span className="pointer-events-none flex items-center ">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {jobs.map((job) => (
                        <Listbox.Option
                          key={job.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-green-600"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9 rounded-md"
                            )
                          }
                          value={job}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {job.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-green-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add Candidates
        </button>
      </div>
      <div className="flex  items-center justify-between mt-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Candidates
          </h3>
          <p className="text-sm text-gray-500 mt-1">A list of all Candidates</p>
        </div>

        <FilterDropdown
          interviewStatusFilter={interviewStatusFilter}
          setInterviewStatusFilter={setInterviewStatusFilter}
          candidateStatusFilter={candidateStatusFilter}
          setCandidateStatusFilter={setCandidateStatusFilter}
        />
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {interviewStatusFilter.map((x: any, i: number) => {
          const close = () => {
            const filter = [...interviewStatusFilter];
            filter[i].checked = false;
            setInterviewStatusFilter(filter);
          };
          return <>{x.checked && <Badges name={x.label} action={close} />}</>;
        })}
        {candidateStatusFilter.map((x: any, i: number) => {
          const close = () => {
            const filter = [...candidateStatusFilter];
            filter[i].checked = false;
            setCandidateStatusFilter(filter);
          };
          return <>{x.checked && <Badges name={x.label} action={close} />}</>;
        })}
      </div>

      <div className="mt-2">
        <CommonTable
          renderCustomComponent={showCustomComponent}
          // createAction={{
          // id: "addmember",
          // title: "You don’t have any Team Members added",
          // buttonLabel: "Add New Team Member",
          // // href:'/dashboard/jobpost/create',
          // // onClick: () => setOpenAddTeamMemberModal(true),
          // }}
          data={candidateArray}
          onRowClick={(item: any) => {
            handleCheckboxChange(item._id);
          }}
          header_items={[
            {
              key: "full_name",
              label: "Name",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "phone",
              label: "Phone",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "outreach_date",
              label: "Outreach Date",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "interview_status",
              label: "Interview Status",
              type: HeaderItemForTableTypes.CUSTOM_COMPONENT,
            },
            {
              key: "interview_link",
              label: "Interview Link",
              type: HeaderItemForTableTypes.CUSTOM_COMPONENT,
            },
          ]}
          pagination={{
            totalItems: teamMembers.length,
            itemsPerPage: 10,
            onPageChange: (page: number) => {},
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
                onClick={() => {}}
              >
                Start Conversation
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
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`/dashboard/jobpost/update?id=${item._id}`}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4    py-2 text-sm text-gray-700"
                          )}
                        >
                          Mark as Interviewed
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`/dashboard/jobpost/update?id=${item._id}`}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4    py-2 text-sm text-gray-700"
                          )}
                        >
                          Mark as Inactive
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                            onClick={()=>{
                                setSelectCandidate(item)
                                setEditModal(true)
                            }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4    py-2 text-sm text-gray-700"
                          )}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                            onClick={()=>{
                                setSelectCandidate(item)
                                setDeleteModal(true)
                            }}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}

                          onClick={()=>{router.push(`/dashboard/candidates/details?id=${item._id}`)}}
                        >
                          View Detail
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>,
            ];
          }}
        />
      </div>
      <AddCandidateModal open={open} setOpen={setOpen} />
        <DeleteModal
            handleDelete={handleDelete}
            button_content="Yes Delete"
            content="Are you sure you want to delete this Candidate, you will not
            be able to retrive member after deletion"
            title="Delete Candidate"
            open={deleteModal}
            setOpen={setDeleteModal}
            data={selectCandidate}
        />
         <EditCandidateModal
          open={editModal}
          setOpen={setEditModal}
          data={selectCandidate}
        />

    </DashboardLayout>
  );
};

export default index;
