import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleTypes, useAuth } from "@/components/contexts/AuthContext";
import CommonTable, {
  HeaderItemForTableTypes,
} from "@/components/Tables/CommonTable";
import { useToast } from "@/components/hooks/useToast";
import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import AddTeamMemberModal from "@/components/dashboard/team/AddTeamMemberModal";
import EditTeamMemberModal from "@/components/dashboard/team/EditTeamMemberModal";
import DeleteModal from "@/components/dashboard/DeleteModal";

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

const index = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  const toast = useToast();

  // Modal States
  const [openAddTeamMemberModal, setOpenAddTeamMemberModal] =
    useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setDeleteModal] = useState<boolean>(false);

  const [selectMember, setSelectMember] = useState<any | null>(null);

  const [selectedCandidateIdsForTable, setSelectedCandidateIdsForTable] =
    useState<string[]>([]);

  const handleDeleteSelected = async () => {};

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
    // console.log(newSelectedItems, 'new')
    setSelectedIds(newSelectedItems);
  };

  const handleDelete = () =>{

  }


  const showCustomComponent = (item: any, key: string) => {
    return (
      <>
        {item.status === "active" ? (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            <svg
              className="mr-1.5 h-2 w-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
            <svg
              className="mr-1.5 h-2 w-2 text-red-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            Inactive
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <DashboardLayout>

        <div className="  sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Team Members
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              A list of all the team members
            </p>
          </div>
          {teamMembers.length > 0 && (
            <button
              onClick={() => setOpenAddTeamMemberModal(true)}
              className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Team Member
            </button>
          )}
        </div>
        <CommonTable
          renderCustomComponent={showCustomComponent}
          createAction={{
            id: "addmember",
            title: "You don’t have any Team Members added",
            buttonLabel: "Add New Team Member",
            // href:'/dashboard/jobpost/create',
            onClick: () => setOpenAddTeamMemberModal(true),
          }}
          data={teamMembers}
          onRowClick={(item: any) => {
            handleCheckboxChange(item._id);
          }}
          header_items={[
            {
              key: "name",
              label: "Name",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "email",
              label: "Email",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "phone",
              label: "Phone",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "roles",
              label: "Roles",
              type: HeaderItemForTableTypes.TEXT,
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
                className="inline-flex items-center rounded-full ml-2
                        border border-green-700 
                        bg-white
                        px-3 py-1.5 text-xs 
                        font-medium text-green-900 shadow-sm 
                        hover:bg-green-300 
                        focus:outline-none focus:ring-2 
                        focus:ring-green-500 
                        focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                onClick={() => {}}
              >
                Resend Invites
              </button>,
              <button
                className="ml-2 p-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-full"
                onClick={() => {
                  setOpenEditModal(true);
                  setSelectMember(item);
                  // console.log(item)
                }}
              >
                <PencilSquareIcon className="w-5 h-5 text-green-800" />
              </button>,
              <button
                className="ml-2 p-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-full"
                onClick={() => {
                  setDeleteModal(true);
                  setSelectMember(item);
                  // console.log(item)
                }}
              >
                <TrashIcon className="w-5 h-5 text-green-800" />
              </button>,
            ];
          }}
        />
        <>
          
          <AddTeamMemberModal    
            open={openAddTeamMemberModal}
            setOpen={setOpenAddTeamMemberModal}
          />
        
          <EditTeamMemberModal 
            open={openEditModal}
            setOpen={setOpenEditModal}
            data={selectMember}
          />
          <DeleteModal
            handleDelete={handleDelete}
            button_content="Yes Delete"
            content="Are you sure you want to delete this member, you will not
            be able to retrive member after deletion"
            title="Delete Team Member"
            open={openDeleteModal}
            setOpen={setDeleteModal}
            data={selectMember}
          />
        </>
        
      </DashboardLayout>
    </>
  );
};

export default index;
