import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import validator from 'validator';
import { useToast } from "../hooks/useToast";
import Spinner from "@/components/common/Spinner";
import { MessageTemplateResponseType, MessageTemplateType } from "@/lib/types/ui";
import MessageTemplates from "./MessageTemplates";

interface EditMessageTemplateModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    messageTemplateData: MessageTemplateResponseType;
    setMyMessageTemplateData: (messageTemplateData: MessageTemplateResponseType) => void;
}
function EditMessageTemplateModal({
    show,
    setShow,
    messageTemplateData,
    setMyMessageTemplateData
}: EditMessageTemplateModalProps) {

    const [isSubmitting, setIsSubmitting] = useState(false); // New state
    const [error, setError] = useState(""); // New error state
    // New error state



    useEffect(() => {
        // Find all instances of {{SOME_NUMBER}} using a regular expression
        const matches = messageTemplateData.template_data.text_content.match(/{{\d+}}/g);
        if (matches) {
            // If any matches were found, update sample_values with an array of the same length
            // filled with empty strings
            setMyMessageTemplateData({
                ...messageTemplateData,
                template_data: {
                    ...messageTemplateData.template_data,
                    sample_values: Array(matches.length).fill('ASSISTANT_NAME'),
                }
            });
        }
        else {
            setMyMessageTemplateData({
                ...messageTemplateData,
                template_data: {
                    ...messageTemplateData.template_data,
                    sample_values: [],
                }
            });
        }
    }, [messageTemplateData.template_data.text_content, show]);
    useEffect(() => {
        // Find all instances of {{SOME_NUMBER}} using a regular expression
        const matches = messageTemplateData.template_data.text_content.match(/{{\d+}}/g);
        if (matches) {
            // If any matches were found, update sample_values with an array of the same length
            // filled with empty strings
            setMyMessageTemplateData({
                ...messageTemplateData,
                template_data: {
                    ...messageTemplateData.template_data,
                    sample_values: Array(matches.length).fill('ASSISTANT_NAME'),
                }
            });
        }
    }, [messageTemplateData.template_data.text_content, show]);

    const toast = useToast();
    const updateMessageTemplate = async () => {
        // return
        setIsSubmitting(true); // Set isSubmitting to true

        try {
            await axiosAPIWithAuth.post("/message-template/update-template-data", {
                ...messageTemplateData,
                template_id: messageTemplateData.id
            });

            toast.addToast("success", "Messsage template updated successfully");
            // Reset form fields

            // Close the modal
            setShow(false);
        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "An error occurred while adding the message template.";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);
            setError("An error occurred while adding the MessageTemplate.");

        }
        setIsSubmitting(false); // Set isSubmitting to false
    };

    // Add error message display in the modal
    const errorMessage = error && (
        <p className="text-red-500">{error}</p>
    );

    return (
        <div >
            {
                show && <>
                    <div
                        className="max-h-full  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-2 mx-auto max-w-full lg:w-1/2 max-h-full overflow-y-auto">

                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit Message Template
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShow(false)}
                                    >
                                        <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-center">

                                            <div className="text-left">
                                                <div className="sm:col-span-6 sm:w-full">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Template Type
                                                    </label>
                                                    <div className="mt-1">
                                                        <select

                                                            name="template_type"
                                                            disabled={messageTemplateData.template_type === MessageTemplateType.WHATSAPP}
                                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            value={messageTemplateData.template_type}
                                                            onChange={(e) => setMyMessageTemplateData({
                                                                ...messageTemplateData,
                                                                template_type: e.target.value as MessageTemplateType
                                                            })}
                                                        >
                                                            <option value={MessageTemplateType.SMS}>SMS</option>
                                                            <option value={MessageTemplateType.WHATSAPP}>Whatsapp</option>

                                                        </select>
                                                    </div>
                                                </div>


                                                {
                                                    messageTemplateData.template_type === "SMS" && (
                                                        <>
                                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                                <label className="block text-sm font-medium text-gray-700">
                                                                    Template Name
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        value={messageTemplateData.template_name}
                                                                        onChange={(e) => setMyMessageTemplateData({
                                                                            ...messageTemplateData,
                                                                            template_name: e.target.value
                                                                        })}
                                                                        name="name"
                                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                                <label className="block text-sm font-medium text-gray-700">
                                                                    Text Content
                                                                </label>
                                                                <div className="mt-1">
                                                                    <textarea
                                                                        value={messageTemplateData.template_data.text_content}
                                                                        onChange={(e) => setMyMessageTemplateData({
                                                                            ...messageTemplateData,
                                                                            template_data: {
                                                                                ...(messageTemplateData.template_data),
                                                                                text_content: e.target.value
                                                                            }
                                                                        })}
                                                                        rows={5}
                                                                        name="sms_data_content"
                                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                            </div>
                                                            {
                                                                (messageTemplateData.template_data.sample_values).map((elem, el_index) => {
                                                                    return (
                                                                        <div className="sm:col-span-6 sm:w-full mt-2" key={`${el_index}_sms_data_sample_values_`}>
                                                                            <label className="block text-sm font-medium text-gray-700">
                                                                                {` Value for {{${el_index + 1}}}`}
                                                                            </label>
                                                                            <div className="mt-1">
                                                                                <select

                                                                                    name="template_example_sample_values"
                                                                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                                    value={elem}

                                                                                    onChange={(e) => {
                                                                                        // Create a new copy of the sample_values array
                                                                                        const newExampleValues = [...messageTemplateData.template_data.sample_values];
                                                                                        // Replace the value at the current index with the new input value
                                                                                        newExampleValues[el_index] = e.target.value;
                                                                                        // Update the state with the new array
                                                                                        setMyMessageTemplateData({
                                                                                            ...messageTemplateData,
                                                                                            template_data: {
                                                                                                ...messageTemplateData.template_data,
                                                                                                sample_values: newExampleValues
                                                                                            }
                                                                                        });
                                                                                    }}
                                                                                >
                                                                                    <option value={"ASSISTANT_NAME"}>Assistant Name</option>

                                                                                    <option value="LEAD_FULL_NAME">Lead Full Name</option>
                                                                                    <option value={"PRODUCT_TITLE"}>Product Name</option>
                                                                                    <option value={"COMPANY_NAME"}>Company Name</option>
                                                                                </select>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <span className="text-xs text-slate-600">
                                                                {` You can add custom variables like this (use numbers only): "Hi {{1}}, This is Zigment Team.  Are you interested in buying {{2}} ?".`}
                                                            </span>
                                                        </>
                                                    )
                                                }

                                                {
                                                    messageTemplateData.template_type === "WHATSAPP" && (
                                                        <>

                                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                                <label className="block text-sm font-medium text-gray-700">
                                                                    Template Name
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        value={messageTemplateData.template_name}
                                                                        disabled={true}
                                                                        onChange={(e) => setMyMessageTemplateData({
                                                                            ...messageTemplateData,
                                                                            template_name: e.target.value
                                                                        })}
                                                                        name="name"
                                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                                <label className="block text-sm font-medium text-gray-700">
                                                                    Text Content
                                                                </label>
                                                                <div className="mt-1">
                                                                    <textarea
                                                                        value={messageTemplateData.template_data.text_content}
                                                                        disabled={true}
                                                                        onChange={(e) => setMyMessageTemplateData({
                                                                            ...messageTemplateData,
                                                                            template_data: {
                                                                                ...(messageTemplateData.template_data),
                                                                                text_content: e.target.value
                                                                            }
                                                                        })}
                                                                        rows={5}
                                                                        name="sms_data_content"
                                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>




                                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                                <label className="block text-sm font-medium text-gray-700">
                                                                    Category
                                                                </label>
                                                                <div className="mt-1">
                                                                    <select

                                                                        name="template_type_category"
                                                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                        value={messageTemplateData.template_data.category}
                                                                        disabled={true}
                                                                        onChange={(e) => setMyMessageTemplateData({
                                                                            ...messageTemplateData,
                                                                            template_data: {
                                                                                ...messageTemplateData.template_data,
                                                                                category: e.target.value
                                                                            }
                                                                        })}
                                                                    >
                                                                        <option value={"MARKETING"}>MARKETING</option>
                                                                        <option value="UTILITY">UTILITY</option>

                                                                    </select>

                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                                <label className="block text-sm font-medium text-gray-700">
                                                                    Language
                                                                </label>
                                                                <div className="mt-1">
                                                                    <select
                                                                        name="template_type_language"
                                                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                        value={messageTemplateData.template_data.language}

                                                                        onChange={(e) => setMyMessageTemplateData({
                                                                            ...messageTemplateData,
                                                                            template_data: {
                                                                                ...messageTemplateData.template_data,
                                                                                language: e.target.value
                                                                            }
                                                                        })}
                                                                    >
                                                                        <option value="en">{`English`}</option>
                                                                        <option value={"en_US"}>{`English (US)`}</option>
                                                                        <option value="en_GB">{`English (UK)`}</option>

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            {
                                                                (messageTemplateData.template_data.sample_values).map((elem, el_index) => {
                                                                    return (
                                                                        <div className="sm:col-span-6 sm:w-full mt-2" key={`${el_index}_sms_data_sample_values_`}>
                                                                            <label className="block text-sm font-medium text-gray-700">
                                                                                {` Value for {{${el_index + 1}}}`}
                                                                            </label>
                                                                            <div className="mt-1">
                                                                                <select

                                                                                    name="template_example_sample_values"
                                                                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                                    value={elem}

                                                                                    onChange={(e) => {
                                                                                        // Create a new copy of the sample_values array
                                                                                        const newExampleValues = [...messageTemplateData.template_data.sample_values];
                                                                                        // Replace the value at the current index with the new input value
                                                                                        newExampleValues[el_index] = e.target.value;
                                                                                        // Update the state with the new array
                                                                                        setMyMessageTemplateData({
                                                                                            ...messageTemplateData,
                                                                                            template_data: {
                                                                                                ...messageTemplateData.template_data,
                                                                                                sample_values: newExampleValues
                                                                                            }
                                                                                        });
                                                                                    }}
                                                                                >
                                                                                    <option value={"ASSISTANT_NAME"}>Assistant Name</option>

                                                                                    <option value="LEAD_FULL_NAME">Lead Full Name</option>
                                                                                    <option value={"PRODUCT_TITLE"}>Product Name</option>
                                                                                    <option value={"COMPANY_NAME"}>Company Name</option>
                                                                                </select>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <span className="text-xs text-slate-600">
                                                                {` You can add custom variables like this (use numbers only): "Hi {{1}}, This is Zigment Team.  Are you interested in buying {{2}} ?".`}
                                                            </span>
                                                        </>
                                                    )
                                                }

                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Message Preview
                                            </label>
                                            <div
                                                className={` w-full  bg-blue-100  rounded-lg p-4 min-w-1/2`}
                                                style={{ backgroundImage: "url('/whatsappbg.png')" }}>
                                                {messageTemplateData.template_data.text_content.length > 0 &&
                                                    <div className="flex max-w-lg">
                                                        <span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 15 15"
                                                                fill="white"
                                                            >
                                                                <polygon
                                                                    points="0,0 0,20 20,20"
                                                                    transform="rotate(180, 10, 10)"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <div className="bg-white min-h-fit p-2 rounded-br-lg rounded-tr-lg rounded-bl-lg">
                                                            {messageTemplateData.template_data.text_content}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <div className="mt-5 sm:mt-6">
                                        {errorMessage}
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="w-1/2 m-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => setShow(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="w-1/2 m-2 inline-flex 
                      justify-center w-full rounded-md 
                      border border-transparent shadow-sm px-4 py-2 bg-indigo-600
                       text-base font-medium text-white 
                       hover:bg-indigo-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500 sm:text-sm
                       disabled:opacity-50
                       disabled:cursor-not-allowed
                       "
                                                onClick={updateMessageTemplate}
                                                disabled={isSubmitting}
                                            >
                                                {
                                                    isSubmitting && <Spinner color='text-white' />
                                                }
                                                Update Message Template
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }


        </div>
    );
}

export default EditMessageTemplateModal;