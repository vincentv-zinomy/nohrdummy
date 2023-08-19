import { useAuth } from "@/components/contexts/AuthContext";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { classNames } from "@/lib/common";
import { LeadStatus, LeadTypes, OrgAgentDataTypes } from "@/lib/types/ui";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { useRouter as navRouter, } from "next/navigation";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner";
import moment from "moment";
import { useToast } from "@/components/hooks/useToast";
import MessageTemplateSelectionModal from "@/components/app-ui/MessageTemplateSelectionModal";
import EditLeadModal from "@/components/app-ui/EditLeadModal";
import AddNewLeadModal from "@/components/app-ui/AddNewLeadModal";
import CommonTable, { HeaderItemForTableTypes } from "@/components/Tables/CommonTable";


function AddLeadPage() {
  const router = useRouter();
  const navR = navRouter();

  const toast = useToast();
  const { authState } = useAuth();
  const [leadsData, setLeadsData] = useState<{
    data: LeadTypes[];
    total: number;
    page: number;
    limit: number;
  }>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [showMessageTemplateModal, setShowMessageTemplateModal] = useState(false);
  const [selectedMessageTemplateId, setSelectedMessageTemplateId] = useState<string>("");
  const [requiredMsgTemplateValues, setRequiredMsgTemplateValues] = useState<string[]>([]);
  const [leadDataForEdit, setLeadDataForEdit] = useState<LeadTypes>({
    _id: "",
    full_name: "",
    email: "",
    phone: "",
    stop_ai_processing: false,
    status: LeadStatus.NEW,
    notes: ""
  });
  const [onlyChatMode, setOnlyChatMode] = useState(false);
  const [selectedLeadIdsForTable, setSelectedLeadIdsForTable] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStartingConversation, setIsStartingConversation] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(parseInt(router.query.page as string));
    }
  }, [router.query])

  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedLeadIdsForTable.includes(item_id);
    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedLeadIdsForTable.filter((i) => i !== item_id);
    }
    else {
      newSelectedItems = [...selectedLeadIdsForTable, item_id];
    }
    setSelectedLeadIdsForTable(newSelectedItems);

  }

  const handleOpenEditLeadModal = (contact_id: string, onlyChat: boolean) => {
    const lead = leadsData.data.find((i) => i._id === contact_id);
    if (lead) {
      console.log(lead);
      setLeadDataForEdit(lead);
      setShowEditLeadModal(true);
      setOnlyChatMode(onlyChat);
    }
  }
  const openSelectionModal = () => {
    setShowMessageTemplateModal(true);
  }
  const handleBulkStartConversation = async () => {
    setIsStartingConversation(true);
    setShowMessageTemplateModal(true);
    try {

      const startConversationsWithSpecificUser = await axiosAPIWithAuth.post(`/contacts/start-conversation/multiple-contacts`, {
        contactIds: selectedLeadIdsForTable,
        msg_template_id: selectedMessageTemplateId,
        required_values: requiredMsgTemplateValues

      });
      toast.addToast("success", "Conversation started successfully");

      setSelectedLeadIdsForTable([]);
    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while starting conversation";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    getData();
    setIsStartingConversation(false);
    setShowMessageTemplateModal(false);
  }

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {

      const tryDelete = await axiosAPIWithAuth.post('/contacts/bulk-delete', {
        contact_ids: selectedLeadIdsForTable
      });
      toast.addToast("success", "Lead(s) deleted successfully");

      setSelectedLeadIdsForTable([]);

    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while deleting lead(s)";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    getData();
    setIsDeleting(false);
  }

  const addLeadToExistingProduct = async (
    leadData: LeadTypes,
  ) => {
    try {
      setIsAdding(true);
      if (router.query._id) {

        await axiosAPIWithAuth.post(`/contacts/add/${router.query._id}`, { ...leadData });
        toast.addToast("success", `Lead added successfully: ${leadData.full_name}`);


      }

    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while adding lead";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsAdding(false);
    getData();
  }
  const updateLead = async (
    contact_id: string,
    lead_data: LeadTypes
  ) => {

    setShowEditLeadModal(false);
    try {
      setIsAdding(true);
      if (contact_id) {
        console.log(contact_id, lead_data)
        await axiosAPIWithAuth.put(`/contacts/update/${contact_id}`, {
          ...lead_data

        });
        toast.addToast("success", "Lead updated successfully");

        getData();
      }
      else {
        toast.addToast("error", "Invalid lead");
      }

    }

    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while adding lead";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsAdding(false);
  }


  const showCustomComponent = (item: any, key: string) => {
    if (key === 'last_message_timestamp') {
      return <>

        <span className="text-green-500 text-sm">{
          item[key] > 0 ? `${moment.unix(item[key]).format("DD/MM/YYYY HH:mm:ss")}` : "-"
        }</span>

      </>
    }
    if (key === 'created_at_timestamp') {
      return <>

        <span className="text-green-500 text-sm">{
          item[key] > 0 ? `${moment.unix(item[key]).format("DD/MM/YYYY HH:mm:ss")}` : "-"
        }</span>

      </>
    }
    if (key === 'total_messages') {
      return <>

        <span className="text-green-500 text-sm">
          {item[key]}
        </span>

      </>
    }
    if (key === 'stop_ai_processing') {
      if (item && item[key]) {
        return (<span className="text-red-500">
          Yes
        </span>
        )
      }
      else {
        return (<span className="text-green-500">
          No
        </span>
        )
      }
    }
  }
  const getData = async () => {


    setIsLoadingLeads(true);
    try {
      const res = await axiosAPIWithAuth.get(`/contacts/by-org-agent/${router.query._id}`, {
        params: {
          ...router.query,
          search: search
        }
      });
      const data = await res.data


      console.log(data);

      setLeadsData(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingLeads(false);
  };
  useEffect(() => {
    if (authState.isAuthenticated) {
      getData();
    }
  }, [authState]);

  useEffect(() => {
    getData()
  }, [router.query])

  return (

    <div className="m-2 p-2">
      <div className="sm:w-full md:w-1/2 w-1/2">
        {
          isLoading &&
          <div className="flex justify-center items-center">
            <Spinner color="text-indigo-600" />
          </div>
        }

      </div>

      <div className="container">

        <div className="space-y-8">

          <>
            <MessageTemplateSelectionModal
              show={showMessageTemplateModal}
              setShow={setShowMessageTemplateModal}
              org_agent_id={router.query._id ? router.query._id.toString() : ""}
              selectedMessageTemplateId={selectedMessageTemplateId}
              setSelectedMessageTemplateId={setSelectedMessageTemplateId}
              requiredMsgTemplateValues={requiredMsgTemplateValues}
              setRequiredMsgTemplateValues={setRequiredMsgTemplateValues}
              onSubmit={() => {
                handleBulkStartConversation();
              }}
            />
            <EditLeadModal show={showEditLeadModal}
              setShow={setShowEditLeadModal}
              leadData={leadDataForEdit}
              onlyChat={onlyChatMode}
              updateLead={updateLead}
            />
            <AddNewLeadModal
              show={showAddLeadModal}
              setShow={setShowAddLeadModal}
              setNewAddedLead={(newLead) => {
                setLeadsData({
                  ...leadsData,
                  data: [...leadsData.data, newLead]
                });
                addLeadToExistingProduct(newLead);
              }}
            />
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the leads.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                {
                  selectedLeadIdsForTable.length > 0 &&
                  <button
                    type="button"
                    className="inline-flex items-center justify-center 
            rounded-md border border-transparent bg-green-600 px-4 py-2 
            mr-2
            text-sm font-medium text-white shadow-sm hover:bg-green-700 
            focus:outline-none focus:ring-2 focus:ring-green-500 
            focus:ring-offset-2 sm:w-auto"
                    onClick={() => {
                      openSelectionModal()
                    }}
                    disabled={isStartingConversation}
                  >
                    Bulk Start Conversation
                  </button>
                }

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => setShowAddLeadModal(true)}
                >
                  Add Lead
                </button>
              </div>
            </div>
            {
              (isStartingConversation || isDeleting || isAdding) &&
              <Spinner color="text-indigo-500" />
            }

            <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search by name, status, etc."
                />
                <button
                  onClick={() => {
                    getData()
                  }}
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </div>
            <CommonTable
              data={leadsData.data}
              currentPage={currentPage}
              pagination={{
                totalItems: leadsData.total,
                itemsPerPage: leadsData.limit,
                onPageChange: (page: number) => {
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      page: page,
                    },
                  }, undefined, { shallow: true });
                }

              }}
              isLoading={isLoadingLeads}
              renderCustomComponent={showCustomComponent}

              onRowClick={(item: any) => {
                handleCheckboxChange(item._id)
              }}

              header_items={[
                {
                  key: "full_name",
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
                  key: "stop_ai_processing",
                  label: "AI Stopped ?",
                  type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                },
                {
                  key: "total_messages",
                  label: "Total Messages",
                  type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                },
                {
                  key: "created_at_timestamp",
                  label: "First Created",
                  type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                },
                {
                  key: "last_message_timestamp",
                  label: "Last Response Timestamp",
                  type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                },
                {
                  key: "status",
                  label: "Status",
                  type: HeaderItemForTableTypes.TEXT
                },
                {
                  key: "contact_stage",
                  label: "Stage",
                  type: HeaderItemForTableTypes.TEXT
                },


              ]
              }

              selectedItems={selectedLeadIdsForTable}
              setSelectedItems={setSelectedLeadIdsForTable}
              handleCheckboxChange={handleCheckboxChange}
              selectionOptions={[
                {
                  button_name: "Delete Selected",
                  action: (ids: string[]) => {
                    handleDeleteSelected()
                  }
                },

              ]}
              rowActions={(item: LeadTypes) => {
                const fixedActions = [
                  <button
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
                    onClick={(e) => {

                      e.preventDefault()
                      // handleStartConversation(item._id)
                      handleOpenEditLeadModal(item._id, false);
                    }}
                  >

                    View Chat
                  </button>
                ]
                let dynamicActions: any = [];
                // if (item.status === LeadStatus.NEW) {
                //   dynamicActions.push(
                //     <button
                //       type="button"
                //       className="inline-flex items-center rounded 
                //     border border-gray-300 
                //     bg-white px-2.5 py-1.5 text-xs 
                //     font-medium text-gray-700 shadow-sm 
                //     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                //     focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                //       onClick={(e) => {
                //         e.preventDefault()
                //         handleStartConversation(item._id)
                //       }}
                //       disabled={isStartingConversation || item.status !== LeadStatus.NEW}
                //     >
                //       Start Conversation
                //     </button>
                //   )
                // }
                // if (item.status === LeadStatus.IN_PROGRESS) {
                //   dynamicActions.push(
                //     <button
                //       type="button"
                //       className="inline-flex items-center rounded 
                //     border border-gray-300 
                //     bg-white px-2.5 py-1.5 text-xs 
                //     font-medium text-gray-700 shadow-sm 
                //     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                //     focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30 ml-1 mr-1"
                //       onClick={(e) => {
                //         e.preventDefault()
                //         handleReEngageConversation(item._id)
                //       }}
                //       disabled={isStartingConversation}
                //     >
                //       Re-Engage Lead
                //     </button>)
                // }
                return ([

                  ...dynamicActions,
                  ...fixedActions,


                ]

                )
              }}

            />



          </>
        </div>
      </div>
    </div>
  );
}

export default AddLeadPage;
