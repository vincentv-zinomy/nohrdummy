import { IAgentUseCase, MessageTemplateResponseType, OrgAgentDataTypes, PhoneNumberTypes, TeamMember } from "@/lib/types/ui";
import { useEffect, useState } from "react";

import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import moment from "moment";
import "moment-timezone";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import Spinner from "../common/Spinner";
import { classNames } from "@/lib/common";

interface AddEditProductMainProps {
  setFormDataMain: (data: OrgAgentDataTypes) => void;
  formData: OrgAgentDataTypes;
  isEditMode: boolean;
}
function AddEditProductMain({
  setFormDataMain,
  formData,
}: AddEditProductMainProps) {
  const router = useRouter();
  const toast = useToast();

  const [myNumbersList, setMyNumbersList] = useState<PhoneNumberTypes[]>([]);
  const [agentUseCases, setAgentUseCases] = useState<IAgentUseCase[]>([]);
  const [isLoadingPhoneNumbers, setIsLoadingPhoneNumbers] = useState(true);


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
    setIsLoadingPhoneNumbers(false);


  }
  const getAllMyNumbers = async () => {
    setIsLoadingPhoneNumbers(true);
    try {
      const getData = await axiosAPIWithAuth.get("/phone-numbers/find-dedicated-number");
      const resData = await getData.data;
      setMyNumbersList(resData);

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
    setIsLoadingPhoneNumbers(false);


  }






  useEffect(() => {
    if (formData.assigned_number && formData.assigned_number.length > 0) {
      setFormDataMain({
        ...formData,
        assigned_number: formData.assigned_number,
        number_type: formData.number_type,
      });

    }
    else {
      setFormDataMain({
        ...formData,
        assigned_number: myNumbersList && myNumbersList.length > 0 ? myNumbersList[0].phone_number : "",
        number_type: myNumbersList && myNumbersList.length > 0 ? myNumbersList[0].connection_type : "SMS",
      });
    }
  }, [myNumbersList]);

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

                    router.push(`/app/candidates/view?org_agent_id=${router.query.id}&open_modal=1`);
                  }}
                >
                  View/Add Candidates
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
                    console.log(formData.custom_values)
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
                      <p className="text-md text-gray-700 mt-1 mb-1 font-bold"> Phone Settings</p>
                    </div>
                    <div className="sm:col-span-6 sm:w-full mt-4">
                      {
                        isLoadingPhoneNumbers &&
                        <div className="sm:col-span-6 sm:w-full mt-4">
                          <div className="flex justify-center items-center">
                            <Spinner color="text-indigo-600" />
                          </div>
                        </div>
                      }
                      {
                        (!isLoadingPhoneNumbers && myNumbersList.length > 0) &&
                        <Listbox value={formData.assigned_number} onChange={(val) => {
                          const findNumber = myNumbersList.find((p) => p.phone_number === val);
                          let type = 'SMS';
                          if (findNumber) {
                            type = findNumber.connection_type;
                          }
                          console.log(type);
                          setFormDataMain({
                            ...formData,
                            assigned_number: val,
                            number_type: type
                          })
                        }}>
                          {({ open }) => {
                            const phone_number_item = myNumbersList.find((p) => p.phone_number === formData.assigned_number);

                            return (
                              <>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  {`Assigned Phone Number `}
                                  <span className="text-xs text-gray-500">
                                    This number will be used to interact with the candidate
                                  </span>
                                </Listbox.Label>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="bg-white relative w-full  min-h-[40px] border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <span className="block truncate">
                                      {formData.assigned_number}{" "}
                                      <span className={
                                        classNames(
                                          "text-xs",
                                          phone_number_item?.is_trial ? "text-rose-500" : "text-green-500"
                                        )
                                      }> {phone_number_item?.is_trial ? `(Free Trial) - ${phone_number_item.connection_type}` : `(Private Number) - ${phone_number_item?.connection_type}`}</span>


                                    </span>

                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <ChevronUpDownIcon
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
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {myNumbersList.map((phone_number_item: PhoneNumberTypes, index_id: number) => (
                                        <Listbox.Option
                                          key={`${phone_number_item._id}`}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-indigo-600"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={phone_number_item.phone_number}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {phone_number_item.phone_number}
                                                <span className={
                                                  classNames(
                                                    "text-xs",
                                                    phone_number_item.is_trial ? "text-rose-500" : "text-green-500"
                                                  )
                                                }> {phone_number_item.is_trial ? `(Free Trial) - ${phone_number_item.connection_type}` : `(Private Number) - ${phone_number_item.connection_type}`}</span>

                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-indigo-600",
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
                            )
                          }}
                        </Listbox>
                      }
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

export default AddEditProductMain;
