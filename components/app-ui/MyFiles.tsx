
import React, { useEffect, useState } from 'react'
import ConnectIntegrations from './ConnectIntegrations'
import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import Spinner from '@/components/common/Spinner';
import { IntegrationAuth } from '@/lib/types/ui';
import CommonTable, { HeaderItemForTableTypes } from '../Tables/CommonTable';
import { useToast } from '../hooks/useToast';
import { useRouter } from 'next/router';
import { classNames } from '@/lib/common';
import UploadFiles from './UploadFiles';

function MyFiles() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dataStorageData, setDataStorageData] = useState<any[]>([]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const router = useRouter();
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchLatestFiles()
    }, [])


    const fetchLatestFiles = async () => {
        setIsLoading(true);
        try {
            const res = await axiosAPIWithAuth.get('/data-storage/all');
            const data = await res.data;

            setDataStorageData(data);

        }
        catch (err) {
            console.log(err);

        }
        setIsLoading(false);
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

    const startEmbedding = async (doc_id: string) => {
        setIsLoading(true);
        try {

            const startRes = await axiosAPIWithAuth.get(`/data-storage/start-embedding/${doc_id}`);

            fetchLatestFiles();
            toast.addToast("success", "Embedding started")
        }
        catch (err) {
            console.log(err)
            toast.addToast("error", "Error embedding files")
        }
        setIsLoading(false);
    }


    const showCustomComponent = (item: any, key: string) => {
        if (key === 'is_embedding_processed') {
            return (
                <span
                    className={classNames(
                        "text-green-800",
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                    )}
                >
                    {item.is_embedding_processed ? 'Yes' : 'No'}
                </span>
            )
        }
    }

    return (
        <div>

            {(isLoading || isDeleting) && (
                <div className='text-center'>
                    <Spinner color="text-indigo-500" />
                </div>
            )}
            <UploadFiles notifyUploaded={fetchLatestFiles} />

            <CommonTable

                isLoading={isLoading}
                data={dataStorageData} onRowClick={(item: any) => {

                    handleCheckboxChange(item._id)
                }}
                pagination={{
                    totalItems: dataStorageData.length,
                    itemsPerPage: 10,
                    onPageChange: (page: number) => {

                    }

                }}
                renderCustomComponent={showCustomComponent}

                header_items={[

                    {
                        key: "file_name",
                        label: "File Name",
                        type: HeaderItemForTableTypes.TEXT
                    },
                    {
                        key: "mime_type",
                        label: "File Type",
                        type: HeaderItemForTableTypes.TEXT
                    },
                    {
                        key: "created_at_timestamp",
                        label: "Uploaded Time",
                        type: HeaderItemForTableTypes.TEXT
                    },
                    {
                        key: "is_embedding_processed",
                        label: "Is Embedding processed ?",
                        type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                    },

                ]
                }
                selectedItems={selectedIds}
                setSelectedItems={setSelectedIds}
                handleCheckboxChange={handleCheckboxChange}
                selectionOptions={[

                ]}
                rowActions={(item: any) => {
                    let actions = [

                    ]
                    if (!item[`is_embedding_processed`]) {
                        actions.push(
                            <span

                                className="ml-1 mr-1 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                onClick={() => {
                                    // disconnectIntegration(item._id)
                                    startEmbedding(item._id)
                                }}
                            >
                                Start Embedding
                            </span>
                        )
                    }
                    actions.push(
                        <span

                            className="ml-1 mr-1 text-rose-600 hover:text-rose-900 cursor-pointer"
                            onClick={() => {
                                // disconnectIntegration(item._id)
                            }}
                        >
                            Delete
                        </span>
                    )
                    return actions
                }}
            />

        </div>
    )
}

export default MyFiles