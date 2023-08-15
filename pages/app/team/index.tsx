import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/Spinner";
import { useAuth } from "@/components/contexts/AuthContext";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import CommonTable, { HeaderItemForTableTypes } from "@/components/Tables/CommonTable";
import { TeamMember } from "@/lib/types/ui";
import { classNames } from "@/lib/common";
import { useToast } from "@/components/hooks/useToast";

function TeamsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { authState } = useAuth();

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axiosAPIWithAuth.get("/users/team-members/all");
      const data = await res.data;

      setTeamMembers(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await axiosAPIWithAuth.post("/users/team-members/bulk-delete", {
        ids: teamMembers.filter((item) => selectedIds.includes(item._id)).map((item) => item.email),
      });
      const data = await res.data;
      toast.addToast("success", "Team members deleted successfully");
      getData();
    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Error while deleting team members.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }
      toast.addToast("error", errorMsg);
    }
    setIsDeleting(false);
  }
  const handleSendInviteLink = async (item_id: string) => {
    setIsSendingInvite(true);
    try {
      const res = await axiosAPIWithAuth.post("/users/team-members/bulk-invite", {
        ids: [item_id],
      });
      const data = await res.data;
      toast.addToast("success", "Team members invited...");

    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Error while deleting team members.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }
      toast.addToast("error", errorMsg);
    }
    setIsSendingInvite(false);
  }
  const handleCheckboxChange = (item: TeamMember) => {
    const checked = selectedIds.includes(item._id);
    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedIds.filter((i) => i !== item._id);
    }
    else {
      newSelectedItems = [...selectedIds, item._id];
    }
    setSelectedIds(newSelectedItems);

  }
  useEffect(() => {
    if (authState.isAuthenticated) {
      getData();
    }
  }, [authState]);
  const showCustomComponent = (item: TeamMember, key: string) => {

    if (key === 'user_joined') {
      return <>

        {
          item[key] ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>
        }
      </>
    }
  }
  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center text-center">
        <Spinner color="text-indigo-500" />
      </div>
    );
  } else {
    return (
      <div className="m-4 p-4">


        {teamMembers.length > 0 ? (
          <>
            <div className="">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Team Members</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the the team members.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    onClick={async () => {
                      router.push("/app/team/create");
                    }}
                  >
                    Add Team Member
                  </button>
                </div>
              </div>
              {
                (isDeleting || isLoading || isSendingInvite) && <Spinner color="text-indigo-500" />
              }
              <CommonTable data={teamMembers} onRowClick={(item: TeamMember) => {
                console.log(item)
                handleCheckboxChange(item)
              }}
                checkBoxFilter={[

                  {
                    key: "user_joined",
                    label: "User Joined Status",
                  },
                  {
                    key: "roles",
                    label: "Roles",
                  }
                ]}
                searchFilter={[
                  {
                    key: "name",
                    label: "Name",
                  },
                  {
                    key: "email",
                    label: "Email",
                  },
                ]}
                header_items={[
                  {
                    key: "name",
                    label: "Name",
                    type: HeaderItemForTableTypes.TEXT
                  },
                  {
                    key: "email",
                    label: "Email",
                    type: HeaderItemForTableTypes.TEXT
                  },
                  {
                    key: "phone",
                    label: "Phone",
                    type: HeaderItemForTableTypes.TEXT
                  },
                  {
                    key: "user_joined",
                    label: "User Joined ?",
                    type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                  },
                  {
                    key: "roles",
                    label: "Roles",
                    type: HeaderItemForTableTypes.TEXT
                  }
                ]
                }
                pagination={{
                  totalItems: teamMembers.length,
                  itemsPerPage: 10,
                  onPageChange: (page: number) => {
                    console.log(page)
                  }

                }}
                selectedItems={selectedIds}
                setSelectedItems={setSelectedIds}
                handleCheckboxChange={handleCheckboxChange}
                selectionOptions={[

                  {
                    button_name: "Bulk Delete",
                    action: (ids: string[]) => {

                      handleBulkDelete();
                    }
                  },
                ]}
                renderCustomComponent={showCustomComponent}
                rowActions={(item: TeamMember) => {
                  return ([
                    <button
                      type="button"
                      className="inline-flex items-center rounded 
           border border-gray-300 
           bg-white px-2.5 py-1.5 text-xs 
           font-medium text-gray-700 shadow-sm 
           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
           focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => {
                        router.push(`/app/team/edit?id=${item._id}`)
                      }}
                      disabled={isDeleting || isSendingInvite || isLoading}
                    >
                      Edit
                    </button>
                    , <button
                      type="button"
                      className="inline-flex items-center rounded 
                          border border-gray-300 
                          bg-indigo-700 px-2.5 py-1.5 text-xs ml-1
                          font-medium text-white shadow-sm 
                          hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                          focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => {
                        // router.push(`/app/team/edit?id=${item._id}`);
                        handleSendInviteLink(item._id);
                      }}
                      disabled={isDeleting || isSendingInvite || isLoading}
                    >
                      Send Invite Link
                    </button>
                  ]

                  )
                }}
              />
            </div>
          </>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No Team Members
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new agent.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  router.push("/app/team/create");
                }}
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add Team Member
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TeamsPage;
