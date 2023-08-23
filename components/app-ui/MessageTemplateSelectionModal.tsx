import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";

import { allowedCountryCodes, classNames } from "@/lib/common";
import { ContactStatus, ContactTypes, MessageTemplateResponseType } from "@/lib/types/ui";
import validator from "validator";
import Spinner from "../common/Spinner";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";

interface MessageTemplateModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    selectedMessageTemplateId: string;
    setSelectedMessageTemplateId: (selectedMessageTemplates: string) => void;
    onSubmit: () => void;
    org_project_id: string;
    requiredMsgTemplateValues: string[];
    setRequiredMsgTemplateValues: (requiredMsgTemplateValues: string[]) => void;

}
function MessageTemplateSelectionModal({
    show,
    setShow,
    selectedMessageTemplateId,
    setSelectedMessageTemplateId,
    onSubmit,
    org_project_id,
    requiredMsgTemplateValues,
    setRequiredMsgTemplateValues
}: MessageTemplateModalProps) {
    const toast = useToast();


    const [myMessageTemplates, setMyMessageTemplates] = useState<MessageTemplateResponseType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [textContent, setTextContent] = useState<string>("");

    const getAllMessageTemplates = async () => {
        setIsLoading(true);
        try {
            const getData = await axiosAPIWithAuth.post("/message-template/my-templates-by-org-project", {
                org_project_id: org_project_id
            });
            const resData = (await getData.data) as MessageTemplateResponseType[];

            setMyMessageTemplates(resData);
            if (resData.length > 0) {
                setSelectedMessageTemplateId(resData[0].id);
            }

        } catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong.";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);


        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (show) {
            getAllMessageTemplates();
        }
    }, [show])
    useEffect(() => {
        const findTemplate = myMessageTemplates.find((item) => item.id === selectedMessageTemplateId);
        if (findTemplate) {
            const matches = findTemplate.template_data.text_content.match(/{{\d+}}/g);
            if (matches) {

                const tempArr = Array(matches.length).fill('ASSISTANT_NAME');
                setRequiredMsgTemplateValues(tempArr);
            }
            else {
                setRequiredMsgTemplateValues([]);
            }
            setTextContent(findTemplate.template_data.text_content);
        }

    }, [selectedMessageTemplateId])

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
                                        Selected Message Template
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
                                    <div className="grid grid-cols-1 gap-2">
                                        <div>
                                            <span className="text-sm"> {textContent}</span>
                                        </div>
                                        <div>
                                            <select
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={selectedMessageTemplateId}
                                                onChange={(e) => {
                                                    setSelectedMessageTemplateId(e.target.value);
                                                }}
                                            >
                                                {
                                                    myMessageTemplates.map((msg_tmp) => {
                                                        return <option value={msg_tmp.id}>{msg_tmp.template_name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            {
                                                requiredMsgTemplateValues.map((item, index) => {
                                                    return (
                                                        <div key={`${index}-msg-template-required-values`}>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                {`{{${index + 1}}}`}
                                                            </label>
                                                            <input type="text" name={item}
                                                                value={requiredMsgTemplateValues[index]}
                                                                onChange={(e) => {
                                                                    const tempArr = [...requiredMsgTemplateValues];
                                                                    tempArr[index] = e.target.value;
                                                                    setRequiredMsgTemplateValues(tempArr);
                                                                }}
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <div className="mt-5 sm:mt-6">

                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="w-full m-2 bg-white py-2 px-4 border border-gray-300 
                                                rounded-md shadow-sm 
                                                text-sm font-medium text-gray-700 hover:bg-gray-50 
                                                focus:outline-none focus:ring-2 
                                                focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
                                                disabled:cursor-not-allowed"
                                                onClick={() => setShow(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full m-2 py-2 px-4 
                                                border border-indigo-300 
                                                bg-indigo-500
                                                rounded-md shadow-sm 
                                                text-sm font-medium text-white hover:bg-indigo-700 
                                                focus:outline-none focus:ring-2 
                                                focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
                                                disabled:cursor-not-allowed"
                                                onClick={() => {
                                                    onSubmit()
                                                }}
                                            >
                                                Start
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

export default MessageTemplateSelectionModal;