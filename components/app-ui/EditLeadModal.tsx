import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";

import { allowedCountryCodes, classNames } from "@/lib/common";
import { LeadStatus, LeadTypes } from "@/lib/types/ui";
import validator from "validator";
import Spinner from "../common/Spinner";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import moment from "moment";
import MediaViewer from "./MediaViewer";

interface EditLeadModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    leadData: LeadTypes;
    onlyChat: boolean;
    updateLead: (leadId: string, data: LeadTypes) => void;

}

export interface MediaFileTypes {
    _id: string;
    mime_type: string;
    url: string;
    timestamp: number;
}
export interface FormattedMessages {
    _id: string;
    role: string;
    content: string;
    mime_type: string;
    url: string;
    timestamp: number;

}



function EditLeadModal({
    show,
    setShow,
    leadData,
    updateLead,
    onlyChat
}: EditLeadModalProps) {


    const [messages, setMessages] = useState<{
        role: string;
        content: string;
        message_timestamp: number;
    }[]>([]);
    const [mediaFiles, setMediaFiles] = useState<MediaFileTypes[]>([]);
    const [formattedMessages, setFormattedMessages] = useState<FormattedMessages[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state
    const [leadStatus, setLeadStatus] = useState<LeadStatus>(LeadStatus.NEW); // New state
    const [leadNotes, setLeadNotes] = useState<string>(""); // New state
    const [isChatLoading, setIsChatLoading] = useState(false); // New state
    const [isMediaLoading, setIsMediaLoading] = useState(false); // New state
    const [error, setError] = useState(""); // New error state
    const [msgBoxValue, setMsgBoxValue] = useState(""); // New error state



    const toast = useToast();

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [leadStage, setLeadStage] = useState<string>("")
    const [stopAI, setStopAI] = useState<boolean>(false);

    const [countryCode, setCountryCode] = useState("US");


    const sendMessage = async () => {
        setIsChatLoading(true);
        try {

            const sendMessage = await axiosAPIWithAuth.post(`/contacts/chat-manually-with-contact/${leadData._id}`, {
                message: msgBoxValue
            });
            toast.addToast("success", "Message sent to user...");
            setMsgBoxValue("");
        } catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong while starting conversation";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);
        }
        setIsChatLoading(false);
    }


    const errorMessage = error && (
        <p className="text-red-500">{error}</p>
    );
    useEffect(() => {
        if (leadData) {
            setFullName(leadData.full_name);
            setEmail(leadData.email);
            setFullName(leadData.full_name);
            setLeadStatus(leadData.status as LeadStatus)
            setLeadNotes(leadData.notes ? leadData.notes : "")
            setLeadStage(leadData.stage ? leadData.stage : "")
            setStopAI(leadData.stop_ai_processing ? leadData.stop_ai_processing : false)

            // If phone number is present
            if (leadData.phone) {
                let countryCode = '';
                let phoneNumber = leadData.phone;

                // Loop through the allowedCountryCodes to check if any is present as prefix in the phone number
                for (let country of allowedCountryCodes) {
                    // If country code is found at the beginning of the phone number string
                    if (phoneNumber.indexOf(country.dialCode) === 0) {
                        // Remove country code from phone number
                        phoneNumber = phoneNumber.replace(country.dialCode, '');
                        // Set the country code
                        countryCode = country.isoCode;
                        break;
                    }
                }

                // If no country code was found in the phone number, default to US
                if (!countryCode) {
                    countryCode = 'US';
                }

                console.log(phoneNumber, countryCode);
                // Now update the state values
                setPhone(phoneNumber);
                setCountryCode(countryCode);
            }
        }
    }, [leadData, show])


    useEffect(() => {
        // Combine messages and mediaFiles into a single array
        let customMessages: FormattedMessages[] = []
        let combined = [
            ...messages.map((message) => ({
                _id: message.message_timestamp.toString(), // Use a unique id or generate one as needed
                role: message.role,
                content: message.content,
                mime_type: '', // Add appropriate value or keep empty if not applicable
                url: '', // Add appropriate value or keep empty if not applicable
                timestamp: message.message_timestamp
            })),
            ...mediaFiles.map((mediaFile) => {
                customMessages.push({
                    _id: mediaFile.timestamp.toString(), // Use a unique id or generate one as needed
                    role: "assistant",
                    content: "Thanks. Let me check.",
                    mime_type: '', // Add appropriate value or keep empty if not applicable
                    url: '', // Add appropriate value or keep empty if not applicable
                    timestamp: mediaFile.timestamp + 10
                })
                return {
                    _id: mediaFile._id,
                    role: 'user', // Add appropriate value or keep empty if not applicable
                    content: '', // Add appropriate value or keep empty if not applicable
                    mime_type: mediaFile.mime_type,
                    url: mediaFile.url,
                    timestamp: mediaFile.timestamp
                }
            })
        ];
        combined = [...combined, ...customMessages]

        // Sort the combined array by timestamp
        const sorted = combined.sort((a, b) => a.timestamp - b.timestamp);

        // Set the formattedMessages state with the sorted array
        setFormattedMessages(sorted);
    }, [messages, mediaFiles]);
    useEffect(() => {
        if (leadData && leadData._id && show) {
            fetchChatHistory()
            fetchChatMedia()
        }
        if (!show) {
            setMessages([])
        }
    }, [show, leadData])

    const fetchChatMedia = async () => {
        setIsMediaLoading(true);
        try {
            const getMediaFilesResp = await axiosAPIWithAuth(`/contacts/chat-media/by-user/${leadData._id}`);

            console.log(getMediaFilesResp.data);
            let media_file = getMediaFilesResp && getMediaFilesResp.data ? getMediaFilesResp.data : [];
            const sortedMediaFiles: MediaFileTypes[] = [...media_file].sort((a: MediaFileTypes, b: MediaFileTypes) => b.timestamp - a.timestamp);
            console.log("media files---")
            console.log(sortedMediaFiles)
            setMediaFiles([...sortedMediaFiles]);

        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong while loading chat";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            // toast.addToast("error", errorMsg);
        }
        setIsMediaLoading(true);
    }
    const fetchChatHistory = async () => {
        setIsChatLoading(true);
        try {
            const getChatResp = await axiosAPIWithAuth(`/contacts/chat-history/by-user/${leadData._id}`);

            setMessages(getChatResp.data);
        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong while loading chat";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            // toast.addToast("error", errorMsg);
        }
        setIsChatLoading(false);
    }
    return (
        <div >
            {
                show && <>
                    <div
                        className="max-h-full  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-2 mx-auto max-w-full w-full max-h-full overflow-y-auto">

                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit Lead Info
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div className="text-left">
                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        name="full_name"
                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        name="email"
                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Mobile Phone
                                                </label>
                                                <div className="mt-1 flex">
                                                    <select
                                                        className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                        value={countryCode}
                                                        disabled={true}
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                    >
                                                        {
                                                            allowedCountryCodes.map((country) => {
                                                                return <option value={country.isoCode}>{`(${country.dialCode}) ${country.isoCode}`}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <input
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        name="phone"
                                                        disabled={true}
                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    />
                                                </div>

                                            </div>
                                            <div className="sm:col-span-6 sm:w-full mt-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Lead Stage
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        value={leadStage}
                                                        onChange={(e) => setLeadStage(e.target.value)}
                                                        name="stage"
                                                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Lead Status
                                                </label>
                                                <select

                                                    name="template_type"
                                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    value={leadStatus}
                                                    onChange={(e) => {
                                                        setLeadStatus(e.target.value as LeadStatus)
                                                    }}
                                                >
                                                    {
                                                        Object.values(LeadStatus).map((status, in_d) => {
                                                            return (
                                                                <option value={status} key={`lead-stauts-${status}-${in_d}`}>{status}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>

                                            <div className="mt-1">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Notes
                                                </label>
                                                <textarea
                                                    value={leadNotes}
                                                    onChange={(e) => {
                                                        setLeadNotes(e.target.value)
                                                    }}
                                                    name="agentDescription"
                                                    rows={5}
                                                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                />

                                            </div>
                                            <div className="mt-4">
                                                <div className="flex items-center">
                                                    <input

                                                        name={` Stop AI Processing`}
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setStopAI(e.target.checked)
                                                        }}
                                                        checked={stopAI}
                                                    />
                                                    <label
                                                        htmlFor={`filter--for-stop-ai-messages`}
                                                        className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                                    >
                                                        Stop AI Processing
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={`relative`}>
                                            {
                                                <button
                                                    type="button"
                                                    disabled={isChatLoading}
                                                    onClick={() => {
                                                        fetchChatHistory()
                                                        fetchChatMedia()
                                                    }}
                                                    className="float-right inline-flex items-center justify-center w-auto px-3 py-2 space-x-2 text-sm font-medium text-white transition bg-blue-700 border border-blue-700 rounded appearance-none cursor-pointer select-none hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={classNames("w-5 h-5", isChatLoading ? 'animate-spin' : '')}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>

                                                </button>

                                            }
                                            {isChatLoading && <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <Spinner color="text-indigo-500" />
                                            </div>}
                                            <span className="font-bold text-xl text-black">Chat History</span>

                                            <div
                                                className={` w-full h-[450px] overflow-y-scroll bg-[#e4dbd4]	 rounded-lg p-4 [&_div]:mb-2   customscroll ${isChatLoading ? 'backdrop-blur-md opacity-50' : ''}`}
                                                style={{ backgroundImage: "url('/whatsappbg.png')" }}>

                                                {formattedMessages.map((x) => {
                                                    console.log(x)
                                                    return (
                                                        <>
                                                            <div className={`  w-fit max-w-[75%]  ${x.role === 'user' ? 'ml-auto bg-white' : 'bg-[#dcf8c7]'} p-2 break-words rounded-b-lg  ${x.role === 'user' ? 'rounded-tl-lg' : 'rounded-tr-lg'}`}>
                                                                {
                                                                    (x.url !== null && x.url !== "") && (
                                                                        <MediaViewer
                                                                            url={x.url}
                                                                            mime_type={x.mime_type}
                                                                            _id={x._id}
                                                                            timestamp={x.timestamp}
                                                                        />
                                                                    )
                                                                }
                                                                <p className="w-full break-all text-sm font-normal	">
                                                                    {x.content}
                                                                </p>
                                                                <span className="text-gray-800 text-xs">{
                                                                    x.timestamp > 0 ? `(${moment.unix(x.timestamp).format("DD/MM/YYYY HH:mm:ss")})` : ""
                                                                }</span>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                )}


                                            </div>
                                            <div className="flex items-center border-t p-2">
                                                {/* chat input action */}

                                                {/* end chat input action */}
                                                <div className="w-full">
                                                    <input
                                                        className="w-full rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed p-2"
                                                        type="text"
                                                        value={msgBoxValue}
                                                        disabled={isChatLoading || isSubmitting}
                                                        onChange={(e) => {
                                                            setMsgBoxValue(e.target.value)
                                                        }}
                                                        placeholder="Enter message"
                                                        onKeyDown={(e) => {
                                                            // Check if Command (for Mac) or Control (for Windows/Linux) is pressed along with the Enter key
                                                            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                                                                sendMessage();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {/* chat send action */}
                                                <div>
                                                    <button
                                                        className="inline-flex hover:bg-indigo-50 rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        type="button"
                                                        disabled={isChatLoading || isSubmitting}
                                                        onClick={() => {
                                                            sendMessage()
                                                        }}

                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                        </svg>

                                                    </button>
                                                </div>
                                                {/* end chat send action */}
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
                                                className="w-full m-2 bg-white py-2 px-4 border border-gray-300 
                                                rounded-md shadow-sm 
                                                text-sm font-medium text-gray-700 hover:bg-gray-50 
                                                focus:outline-none focus:ring-2 
                                                focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 
                                                disabled:cursor-not-allowed"
                                                onClick={() => setShow(false)}
                                                disabled={isSubmitting || isChatLoading}
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

                                                    updateLead(leadData._id, {
                                                        ...leadData,
                                                        full_name: fullName,
                                                        email: email,
                                                        notes: leadNotes,
                                                        status: leadStatus,
                                                        stop_ai_processing: stopAI,
                                                        stage: leadStage

                                                    });
                                                }}
                                                disabled={isSubmitting || isChatLoading}
                                            >
                                                Update
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

export default EditLeadModal;