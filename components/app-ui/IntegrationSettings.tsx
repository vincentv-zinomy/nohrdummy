
import React, { useEffect, useState } from 'react'
import ConnectIntegrations from './ConnectIntegrations'
import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import Spinner from '@/components/common/Spinner';
import { IntegrationAuth } from '@/lib/types/ui';
import CommonTable, { HeaderItemForTableTypes } from '../Tables/CommonTable';
import { useToast } from '../hooks/useToast';
import { useRouter } from 'next/router';
import { classNames } from '@/lib/common';

function IntegrationSettings() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [integrationData, setIntegrationData] = useState<IntegrationAuth[]>([]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const router = useRouter();
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchIntegrations()
    }, [])
    const disconnectIntegration = async (integration_id: string) => {
        setIsDeleting(true);
        try {

            const getData = await axiosAPIWithAuth.post('/integration-auth/disconnect', {
                integration_id: integration_id
            });
            toast.addToast("success", "Integration disconnected successfully");
            window.location.reload();

        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "Error while disconnecting integration.";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);


        }
        setIsDeleting(false);
    }

    const fetchIntegrations = async () => {
        setIsLoading(true);
        try {
            const res = await axiosAPIWithAuth.get('/integration-auth/fetch-all');
            const data = await res.data;

            setIntegrationData(data);

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


    const showCustomComponent = (item: IntegrationAuth, key: string) => {
        return (
            <span
                className={classNames(
                    "text-green-800",
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                )}
            >
                <img src={item.logo_url} className='max-h-8' alt="" />
                <span className='ml-1 mr-1'> {item.integration_unique_id}</span>


            </span>
        )
    }

    return (
        <div>
            {(isLoading || isDeleting) && (
                <div className='text-center'>
                    <Spinner color="text-indigo-500" />
                </div>
            )}
            <div> <ConnectIntegrations onSuccess={() => {
                fetchIntegrations()
            }} onError={() => {

            }} /></div>
            <CommonTable
                setAppliedFilters={() => {

                }}
                isLoading={isLoading}
                data={integrationData} onRowClick={(item: any) => {

                    handleCheckboxChange(item._id)
                }}
                pagination={{
                    totalItems: integrationData.length,
                    itemsPerPage: 10,
                    onPageChange: (page: number) => {

                    }

                }}
                renderCustomComponent={showCustomComponent}
                checkBoxFilter={[

                    {
                        key: "integration_unique_id",
                        label: "Connection Type",
                    },
                ]}
                searchFilter={[
                    {
                        key: "integration_account_indentifier",
                        label: "Account Identifier",
                    },
                ]}
                header_items={[

                    {
                        key: "integration_account_indentifier",
                        label: "Account Identifier",
                        type: HeaderItemForTableTypes.TEXT
                    },
                    {
                        key: "integration_unique_id",
                        label: "Connection Type",
                        type: HeaderItemForTableTypes.CUSTOM_COMPONENT
                    },

                ]
                }
                selectedItems={selectedIds}
                setSelectedItems={setSelectedIds}
                handleCheckboxChange={handleCheckboxChange}
                selectionOptions={[

                ]}
                rowActions={(item: IntegrationAuth) => {
                    return ([
                        <span

                            className="ml-1 mr-1 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={() => disconnectIntegration(item._id)}
                        >
                            Disconnect
                        </span>

                    ]

                    )
                }}
            />

        </div>
    )
}

export default IntegrationSettings