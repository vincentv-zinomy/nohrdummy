import { RoleTypes, useAuth } from "@/components/contexts/AuthContext";
import Spinner from "@/components/common/Spinner";
import CommonTable, { HeaderItemForTableTypes } from "@/components/Tables/CommonTable";
import { useToast } from "@/components/hooks/useToast";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { OrgProjectDataTypes } from "@/lib/types/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function OrgProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { authState } = useAuth()
  const router = useRouter();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(parseInt(router.query.page as string));
    }
  }, [router.query])
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axiosAPIWithAuth.get("/org-project/all");
      const data = await res.data;

      setProjects(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const showCustomComponent = (item: any, key: string) => {
    if (key === 'contacts_count') {
      return <>

        <span className="text-green-500">{
          item[key]
        }</span>

      </>
    }
    if (key === 'converted_contacts_count') {
      return <>

        <span className="text-green-500">
          {item[key]}
        </span>

      </>
    }
  }

  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedIds.includes(item_id);
    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedIds.filter((i) => i !== item_id);
    }
    else {
      newSelectedItems = [...selectedIds, item_id];
    }
    setSelectedIds(newSelectedItems);

  }
  const handleDeleteSelected = async () => {
    try {

      const tryDelete = await axiosAPIWithAuth.post('/org-project/bulk-delete', {
        org_project_ids: selectedIds
      });
      toast.addToast("success", "Project(s) deleted successfully");
      window.location.reload();

    }
    catch (err: any) {
      console.log(err);

      let errorMsg = "Error while deleting Project(s).";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
  }

  useEffect(() => {
    if (authState.isAuthenticated) {
      getData();
    }
  }, [authState]);
  if (loading) {
    return (
      <div className="mt-6 flex justify-center text-center">
        <Spinner color="text-indigo-500" />
      </div>
    );
  } else {
    return (
      <div className="m-4 p-4">

        {projects.length > 0 ? (
          <>
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">{`Your Projects`}</h1>
                {/* <p className="mt-2 text-sm text-gray-700">
                  A list of all the projects and/org.
                </p> */}
              </div>
            </div>
            <div className="flex justify-between">


              <div>
                <button
                  className="mt-2 mb-2 inline-flex justify-center 
            py-2 px-4 border border-transparent 
            shadow-sm text-sm font-medium 
            rounded-md text-white 
            bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500
            disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={false}
                  onClick={async () => {
                    router.push("/app/org-project/create");
                  }}
                >
                  Create New Project
                </button>
              </div>
            </div>

            <CommonTable
              isLoading={loading}
              currentPage={currentPage}
              data={projects} onRowClick={(item: any) => {
                console.log(item)
                handleCheckboxChange(item._id)
              }}

              renderCustomComponent={showCustomComponent}
              header_items={[
                {
                  key: "title",
                  label: "Title",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "description",
                  label: "Description",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "assigned_whatsapp_number",
                  label: "Whatsapp Number",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "assigned_sms_number",
                  label: "SMS Number",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "assigned_email_id",
                  label: "Email Id",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "assigned_instagram_id",
                  label: "Instagram Id",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "contacts_count",
                  label: "Total Leads(s)",
                  type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                },

                {
                  key: "converted_contacts_count",
                  label: "Scheduled/Converted Leads(s)",
                  type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                }
              ]
              }
              pagination={{
                totalItems: projects.length,
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
                  button_name: "Delete Selected",
                  action: (ids: string[]) => {
                    handleDeleteSelected()
                  }
                }
              ]}
              rowActions={(item: OrgProjectDataTypes) => {
                return ([
                  <button
                    type="button"
                    className="inline-flex items-center rounded 
                        border border-gray-300 
                        bg-white px-2.5 py-1.5 text-xs ml-1
                        font-medium text-gray-700 shadow-sm 
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                        focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => {

                      router.push(`/app/org-project/edit?id=${item._id}`)
                    }}
                  >
                    Edit Project
                  </button>
                  ,
                  <button
                    type="button"
                    className="inline-flex items-center rounded 
                          border border-gray-300 
                          bg-white px-2.5 py-1.5 text-xs 
                          font-medium text-gray-700 shadow-sm ml-1 
                          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                          focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => {
                      router.push(`/app/contacts/${item._id}`)
                    }}
                  >
                    View Leads
                  </button>
                  , <button
                    type="button"
                    className="inline-flex items-center rounded ml-1
                       border border-indigo-300 
                       bg-indigo-700
                       px-2.5 py-1.5 text-xs 
                       font-medium text-white shadow-sm 
                       hover:bg-indigo-500 
                       focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 
                       focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => {

                      router.push(`/app/contacts/${item._id}`);
                    }}
                  >
                    <PlusIcon className="ml-1 mr-1 h-5 w-5" aria-hidden="true" />
                    Add Leads
                  </button>
                ]

                )
              }}
            />
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
              No Projects
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new project. Ask your admin to give you access.
            </p>
            {
              authState?.current_org?.roles.includes(RoleTypes.ADMIN) && (
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      router.push("/app/org-project/create");
                    }}
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Create Project
                  </button>
                </div>
              )
            }
          </div>
        )}
      </div>
    );
  }
}

export default OrgProjectsPage;