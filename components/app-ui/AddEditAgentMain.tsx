import { ChatChannelType, CommunicationChannelTypes, IAgentUseCase, OrgAgentDataTypes } from "@/lib/types/ui";
import { useEffect, useState } from "react";

import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import "moment-timezone";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

import Spinner from "../common/Spinner";

interface AddEditAgentMainProps {
  setFormDataMain: (data: OrgAgentDataTypes) => void;
  formData: OrgAgentDataTypes;
  isEditMode: boolean;
}
function AddEditAgentMain({
  setFormDataMain,
  formData,
}: AddEditAgentMainProps) {
  const router = useRouter();
  const toast = useToast();

  const [myCommunicationChannels, setMyCommunicationChannels] = useState<CommunicationChannelTypes[]>([]);
  const [agentUseCases, setAgentUseCases] = useState<IAgentUseCase[]>([]);
  const [isCommunicationChannelsLoading, setIsCommunicationChannelsLoading] = useState(true);


  const { authState } = useAuth();
  const getAllAgentUseCases = async () => {
    try {
      const getData = await axiosAPIWithAuth.get("/agents/all-use-cases");
      const resData = await getData.data;
      setAgentUseCases(resData);



    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong...";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }


  }
  const getAllMyNumbers = async () => {
    setIsCommunicationChannelsLoading(true);
    try {
      const getData = await axiosAPIWithAuth.get("/communication-channels/my-channels");
      const resData = await getData.data;
      setMyCommunicationChannels(resData);

    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong...";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsCommunicationChannelsLoading(false);


  }



  useEffect(() => {
    if (authState.isAuthenticated) {
      getAllMyNumbers()
      getAllAgentUseCases()
    }
  }, [authState]);

  return (
    <div className="container">

      <div className="space-y-8">

        {
          router.query.id && (
            <div className="flex justify-between">
              <div>

              </div>

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

                    router.push(`/app/contacts/${router.query.id}`);
                  }}
                >
                  View/Add Contacts
                </button>
              </div>
            </div>
          )
        }
        <div>
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6 sm:w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Agent Use Case
                </label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={formData.agent_use_case_id}
                  onChange={(e) => {
                    setFormDataMain({
                      ...formData,
                      agent_use_case_id: e.target.value
                    })
                  }}
                >
                  <option value={""}>Select Agent</option>
                  {
                    agentUseCases.map((use_case) => {
                      return <option value={use_case.id}>{use_case.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="sm:col-span-6 sm:w-full md:w-1/2">
                <button
                  className="ml-3 inline-flex justify-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={false}
                  onClick={() => {
                    setFormDataMain({
                      ...formData,
                      custom_values: {
                        ...formData.custom_values,
                        [`custom_variable_${Object.keys(formData.custom_values).length + 1}`]: ""
                      }
                    })
                  }}
                >
                  Add Custom Value
                </button>
              </div>
              <div className="sm:col-span-6 sm:w-full md:w-1/2">


                {
                  Object.keys(formData.custom_values).map((variable, index_v) => {
                    return (
                      <div key={`${index_v}-custom-variable-values_left_side`}
                        className="grid grid-cols-2 gap-1 border border-black p-2 m-2" >

                        <div className="mt-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Custom Value Name/Label
                          </label>
                          <input
                            value={variable}

                            onChange={(e) => {
                              const newCustomValues = formData.custom_values;
                              const valOfVariable = newCustomValues[variable];
                              delete newCustomValues[variable];
                              newCustomValues[e.target.value] = valOfVariable;
                              setFormDataMain({
                                ...formData,
                                custom_values: {
                                  ...newCustomValues
                                }
                              })
                            }}
                            name="customer_variable_"
                            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div className="mt-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Custom Value
                          </label>
                          <input
                            value={formData.custom_values[variable]}

                            onChange={(e) => {
                              setFormDataMain({
                                ...formData,
                                custom_values: {
                                  ...formData.custom_values,
                                  [variable]: e.target.value
                                }
                              })
                            }}
                            name="customer_variable"
                            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
                          />
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              const newCustomValues = formData.custom_values;
                              delete newCustomValues[variable];
                              setFormDataMain({
                                ...formData,
                                custom_values: {
                                  ...newCustomValues
                                }
                              })
                            }}
                          >
                            <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                      </div>
                    )
                  })
                }

              </div>
              <div className="sm:col-span-6 sm:w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Agent Title
                </label>
                <div className="mt-1">
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormDataMain({ ...formData, title: e.target.value })
                    }
                    name="agentTitle"
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Enter Agent Title.</p>
              </div>
              <div className="sm:col-span-6 sm:w-full md:w-1/2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Agent Description
                </label>
                <div className="mt-1">
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormDataMain({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    name="agentDescription"
                    rows={5}
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Copy Paste Agent Description.
                </p>
              </div>

              <div className="sm:col-span-6 sm:w-full md:w-1/2">

                <div>
                  <div>

                    <div className="sm:col-span-6 sm:w-full mt-4">
                      <p className="text-md text-gray-700 mt-1 mb-1 font-bold"> Communication Settings</p>
                    </div>
                    <div className="sm:col-span-6 sm:w-full mt-4">
                      {
                        isCommunicationChannelsLoading &&
                        <div className="sm:col-span-6 sm:w-full mt-4">
                          <div className="flex justify-center items-center">
                            <Spinner color="text-indigo-600" />
                          </div>
                        </div>
                      }

                      <div className="mt-4">
                        {/* Email Channel */}
                        <div className="flex items-center">
                          <input

                            name={`Enable Email`}
                            type="checkbox"
                            className="h-4 w-4 
                            rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                            disabled:bg-gray-200 disabled:cursor-not-allowed
                            "
                            onChange={(e) => {
                              setFormDataMain({
                                ...formData,
                                is_email_enabled: e.target.checked
                              })
                            }}
                            checked={formData.is_email_enabled}
                            disabled={myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.EMAIL) ? false : true}
                          />
                          <label
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            Enable Email

                          </label>
                          <span className="text-sm text-gray-600">{
                            myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.EMAIL) ? `` : `No Emails Found`
                          }</span>
                          {
                            formData.is_email_enabled &&
                            <select
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={formData.assigned_email_id}
                              onChange={(e) => {
                                setFormDataMain({
                                  ...formData,
                                  assigned_email_id: e.target.value
                                })
                              }}
                            >
                              <option value={""}>Select Email</option>
                              {
                                myCommunicationChannels.filter(elem => elem.connection_type === ChatChannelType.EMAIL).map((comm_channel: CommunicationChannelTypes) => {
                                  return <option value={comm_channel.email_metadata.user}>{comm_channel.email_metadata.user}</option>
                                })
                              }
                            </select>
                          }
                        </div>
                        {/* SMS Channel */}
                        <div className="flex items-center">
                          <input

                            name={`Enable SMS`}
                            type="checkbox"
                            className="h-4 w-4 
                            rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                            disabled:bg-gray-200 disabled:cursor-not-allowed
                            "
                            onChange={(e) => {
                              setFormDataMain({
                                ...formData,
                                is_sms_enabled: e.target.checked
                              })
                            }}
                            checked={formData.is_sms_enabled}
                            disabled={myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.SMS) ? false : true}
                          />
                          <label
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            Enable SMS

                          </label>
                          <span className="text-sm text-gray-600">{
                            myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.SMS) ? `` : `No SMS Number Found`
                          }</span>
                          {
                            formData.is_sms_enabled &&
                            <select
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={formData.assigned_sms_number}
                              onChange={(e) => {
                                setFormDataMain({
                                  ...formData,
                                  assigned_sms_number: e.target.value
                                })
                              }}
                            >
                              <option value={""}>Select SMS Number</option>
                              {
                                myCommunicationChannels.filter(elem => elem.connection_type === ChatChannelType.SMS).map((comm_channel: CommunicationChannelTypes) => {
                                  return <option value={comm_channel.phone_number}>{comm_channel.phone_number}</option>
                                })
                              }
                            </select>
                          }
                        </div>
                        {/* WhatsApp Channel */}
                        <div className="flex items-center">
                          <input

                            name={`Enable Whatsapp`}
                            type="checkbox"
                            className="h-4 w-4 
                            rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                            disabled:bg-gray-200 disabled:cursor-not-allowed
                            "
                            onChange={(e) => {
                              setFormDataMain({
                                ...formData,
                                is_whatsapp_enabled: e.target.checked
                              })
                            }}
                            checked={formData.is_whatsapp_enabled}
                            disabled={myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.WHATSAPP) ? false : true}
                          />
                          <label
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            Enable Whatsapp

                          </label>
                          <span className="text-sm text-gray-600">{
                            myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.WHATSAPP) ? `` : `No WHATSAPP Number Found`
                          }</span>
                          {
                            formData.is_whatsapp_enabled &&
                            <select
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={formData.assigned_whatsapp_number}
                              onChange={(e) => {
                                setFormDataMain({
                                  ...formData,
                                  assigned_whatsapp_number: e.target.value
                                })
                              }}
                            >
                              <option value={""}>Select Whatsapp Number</option>
                              {
                                myCommunicationChannels.filter(elem => elem.connection_type === ChatChannelType.WHATSAPP).map((comm_channel: CommunicationChannelTypes) => {
                                  return <option value={comm_channel.phone_number}>{comm_channel.phone_number}</option>
                                })
                              }
                            </select>
                          }
                        </div>
                        {/* Instagram Channel */}
                        <div className="flex items-center">
                          <input

                            name={`Enable Instagram`}
                            type="checkbox"
                            className="h-4 w-4 
                            rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                            disabled:bg-gray-200 disabled:cursor-not-allowed
                            "
                            onChange={(e) => {
                              setFormDataMain({
                                ...formData,
                                is_instagram_enabled: e.target.checked
                              })
                            }}
                            checked={formData.is_whatsapp_enabled}
                            disabled={myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.INSTAGRAM) ? false : true}
                          />
                          <label
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            Enable INSTAGRAM

                          </label>
                          <span className="text-sm text-gray-600">{
                            myCommunicationChannels.find((comm_channel: CommunicationChannelTypes) => comm_channel.connection_type === ChatChannelType.INSTAGRAM) ? `` : `No INSTAGRAM Account Found`
                          }</span>
                          {
                            formData.is_instagram_enabled &&
                            <select
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={formData.assigned_whatsapp_number}
                              onChange={(e) => {
                                setFormDataMain({
                                  ...formData,
                                  assigned_instagram_id: e.target.value
                                })
                              }}
                            >
                              <option value={""}>Select INSTAGRAM Account</option>
                              {
                                myCommunicationChannels.filter(elem => elem.connection_type === ChatChannelType.INSTAGRAM).map((comm_channel: CommunicationChannelTypes) => {
                                  return <option value={comm_channel.instagram_id}>{comm_channel.instagram_id}</option>
                                })
                              }
                            </select>
                          }
                        </div>
                      </div>
                    </div>

                    <div>

                    </div>



                    <div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
    </div>
  );
}

export default AddEditAgentMain;
