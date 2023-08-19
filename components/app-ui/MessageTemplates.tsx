import Spinner from "@/components/common/Spinner";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { MessageTemplateResponseType, MessageTemplateType } from "@/lib/types/ui";
import { useEffect, useState } from "react";
import CommonTable, { HeaderItemForTableTypes } from "../Tables/CommonTable";
import { useToast } from "../hooks/useToast";
import AddNewMessageTemplateModal from "./AddNewMessageTemplateModal";
import EditMessageTemplateModal from "./EditMessageTemplateModal";

function MessageTemplates() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [myMessageTemplates, setMyMessageTemplates] = useState<MessageTemplateResponseType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showMessageTemplate, setShowMessageTemplate] = useState(false);
    const [showEditMessageTemplate, setShowEditMessageTemplate] = useState(false);
    const [editMessageTemplateData, setEditMessageTemplateData] = useState<MessageTemplateResponseType>({

        template_name: "",
        template_type: MessageTemplateType.SMS,
        template_data: {
            text_content: "",
            sample_values: [],
            language: "en",
            allow_category_change: false,
            category: "MARKETING",
        },
        status: "ACTIVE",
        components: [],
        id: "",
        assigned_number_or_id: "",
    });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const toast = useToast();



    const getAllMessageTemplates = async () => {
        setIsLoading(true);
        try {
            const getData = await axiosAPIWithAuth.get("/message-template/my-templates");
            const resData = await getData.data;

            setMyMessageTemplates(resData);

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
        getAllMessageTemplates();
    }, [])
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
    const showCustomComponent = (item: MessageTemplateResponseType, key: string) => {
        if (key === 'template_type') {
            return <>

                {
                    item[key] === 'WHATSAPP' ? <span className="text-green-500">WhatsApp</span> : <span className="text-blue-500">SMS</span>
                }
            </>
        }
    }
    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner color="text-indigo-500" />
            </div>
        );
    }
    return (
        <>
            <AddNewMessageTemplateModal show={showMessageTemplate}
                setShow={setShowMessageTemplate}
            />
            <EditMessageTemplateModal show={showEditMessageTemplate} setShow={setShowEditMessageTemplate}
                messageTemplateData={editMessageTemplateData}
                setMyMessageTemplateData={setEditMessageTemplateData}
            />

            <div>

                <button
                    className="mt-2 inline-flex justify-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                        // CreateNewMessageTemplate();
                        setShowMessageTemplate(true);
                    }}
                    disabled={isSubmitting}
                >
                    Add Message Template
                </button>
            </div>

            {
                myMessageTemplates && myMessageTemplates.length > 0 ?
                    <CommonTable

                        isLoading={isLoading}
                        data={myMessageTemplates} onRowClick={(item: any) => {
                            handleCheckboxChange(item._id)
                        }}
                        renderCustomComponent={showCustomComponent}

                        header_items={[
                            {
                                key: "template_name",
                                label: "Template Name",
                                type: HeaderItemForTableTypes.TEXT
                            },

                            {
                                key: "template_type",
                                label: "Template Type",
                                type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                            },
                            {
                                key: "status",
                                label: "Status",
                                type: HeaderItemForTableTypes.TEXT
                            },
                        ]
                        }
                        pagination={{
                            totalItems: myMessageTemplates.length,
                            itemsPerPage: 10,
                            onPageChange: (page: number) => {

                            }

                        }}
                        selectedItems={selectedIds}
                        setSelectedItems={setSelectedIds}
                        handleCheckboxChange={handleCheckboxChange}
                        selectionOptions={[]}
                        rowActions={(item: MessageTemplateResponseType) => {
                            return ([
                                <span

                                    className="ml-1 mr-1 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                    onClick={() => {
                                        //    Edit
                                        console.log(item)
                                        setEditMessageTemplateData(item);
                                        setShowEditMessageTemplate(true);
                                    }}
                                >
                                    Edit
                                </span>

                            ]

                            )
                        }}

                    />
                    :
                    <div className="text-center">
                        <p>You do not have any message templates</p>
                    </div>
            }


        </>
    );
}

export default MessageTemplates;