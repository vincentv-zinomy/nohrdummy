import { classNames } from '@/lib/common';
import React, { ReactNode, useCallback, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import newjobimg from '@/assets/images/0newHR/images/table/I_Copywriting_Icon_01-01 1.png'
import Image from 'next/image';
import newMember from '@/assets/images/0newHR/images/dashboard/add-01.png'

const images:any = {
    createjob:newjobimg,
    addmember:newMember
}


export interface SelectionOption {
    button_name: string;
    action: (selectedItems: string[]) => void;
}
export interface RowActions {
    div_component: React.ReactNode;
}

export enum HeaderItemForTableTypes {
    TEXT = "text",
    CUSTOM_COMPONENT = "custom_component",
}
export interface HeaderItemForTable {

    key: string;
    label: string;
    type: HeaderItemForTableTypes

}
export interface CommonTableProps {
    selectionOptions: SelectionOption[];
    header_items: HeaderItemForTable[];
    data: {
        [key: string]: any;
    }[];
    selectedItems: string[];
    setSelectedItems: (selectedItems: string[]) => void;
    handleCheckboxChange: (item_id: string) => void;
    onRowClick?: (item: any) => void;
    onRowDoubleClick?: (item: any) => void;
    rowActions?: (item: any) => React.ReactNode[];
    renderCustomComponent?: (item: any, key: string) => React.ReactNode;
    pagination: {
        totalItems: number;
        itemsPerPage: number;
        onPageChange: (page: number) => void;
    };
    createAction?:any

}

function CommonTable(props: CommonTableProps) {
    const { selectionOptions, header_items, data,
        onRowClick, rowActions, selectedItems,
        setSelectedItems, onRowDoubleClick, handleCheckboxChange, renderCustomComponent, pagination } = props;
    const handleRowClick = useCallback((item: any) => {
        if (onRowClick) {
            onRowClick(item);
        }
    }, [onRowClick]);
    const showCheckboxes = selectionOptions && selectionOptions.length > 0 ? true : false;
    const handleRowDoubleClick = useCallback((item: any) => {
        if (onRowDoubleClick) {
            onRowDoubleClick(item);
        }
    }, [onRowDoubleClick]);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

    const handlePageChange = (page: number) => {
        // Checks if the page number is within the valid range
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            pagination.onPageChange(page);
        }
    };

    return (


        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto  sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="relative overflow-hidden     md:rounded-lg">
                        {selectedItems && selectedItems.length > 0 && (
                            <div className="absolute top-0 left-12 flex h-12  items-center space-x-3  sm:left-16">

                                {
                                    selectionOptions && selectionOptions.length > 0 && selectionOptions.map((option) => (
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded border border-gray-300 
                        bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700  
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 
                        focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                            key={`option_button_name_key_${option.button_name}`}
                                            onClick={() => {
                                                option.action(selectedItems);
                                            }}
                                        >
                                            {option.button_name}
                                        </button>
                                    ))
                                }

                            </div>
                        )}
                        <table className="min-w-full table-fixed divide-y divide-gray-300 border border-green-800/20 rounded-md   ">
                            <thead className="bg-brand-lightgreen/10 rounded-md  border border-green-800/20   ">
                                <tr className='border border-green-800/20 rounded-md' >
                                    {
                                        showCheckboxes &&
                                        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                                            <input
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 sm:left-6"
                                                type="checkbox"
                                                checked={(selectedItems.length === data.length) && data.length > 0}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedItems(data.map((item) => item._id));
                                                    } else {
                                                        setSelectedItems([]);
                                                    }
                                                }}

                                            />
                                        </th>
                                    }

                                    {
                                        header_items && header_items.length > 0 && header_items.map((item) => (


                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-solidgreen" key={`header_items_key_${item.label}`}>
                                                {item.label}
                                            </th>

                                        ))
                                    }
                                    {
                                        rowActions && (
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Actions
                                            </th>
                                        )
                                    }

                                </tr>
                            </thead>
                            <tbody className={`  divide-gray-200 bg-white ${data.length === 0 && 'h-[300px]'} `}>
                                {data.length > 0 &&
                                    data.map((data_item, table_index_) => {
                                        const is_selected = selectedItems.includes(data_item[`_id`]);
                                        const item_id = data_item._id;
                                        return (
                                            <tr key={`${item_id}_${table_index_}`} className={classNames(is_selected ? 'bg-gray-50' : "", "cursor-pointer")} onClick={() => {
                                                handleRowClick(data_item)
                                            }} onDoubleClick={() => {
                                                handleRowDoubleClick(data_item)
                                            }}>

                                                {
                                                    showCheckboxes && (
                                                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                                            {is_selected && (
                                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-green-600" />
                                                            )}
                                                            <input
                                                                type="checkbox"
                                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 sm:left-6"

                                                                checked={selectedItems.includes(item_id)}
                                                                onChange={(e) => {
                                                                    handleCheckboxChange(item_id,)
                                                                }
                                                                }

                                                            />
                                                        </td>
                                                    )
                                                }
                                                {
                                                    header_items && header_items.length > 0 && header_items.map((item) => {
                                                        if (item.type === HeaderItemForTableTypes.CUSTOM_COMPONENT) {
                                                            return (
                                                                <td className="px-3 py-4 text-left text-sm font-medium text-gray-900" key={`headerrs_items_key_${item.key}`}>
                                                                    {renderCustomComponent && renderCustomComponent(data_item, item.key)}
                                                                </td>
                                                            )
                                                        }
                                                        else if (item.type === HeaderItemForTableTypes.TEXT) {
                                                            return (
                                                                <td className={"px-3 py-4 text-sm text-gray-500"}>
                                                                    {
                                                                        data_item && data_item[item.key]
                                                                            ? `${data_item[item.key].length > 75 ? data_item[item.key].slice(0, 75) + "..." : data_item[item.key]}`
                                                                            : ``
                                                                    }
                                                                </td>
                                                            )
                                                        }
                                                    })
                                                }
                                                {
                                                    rowActions && 
                                                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                                        <div className="flex items-center">
                                                            {  rowActions(data_item).map((action) => (action))
                                                            }
                                                        </div>
                                                    </td>
                                                }
                                                
                                            </tr>
                                        )
                                    })
                                }
                                {props.createAction && data.length === 0  &&
                                    <div className='w-full absolute flex flex-col items-center justify-center h-72 pb-8'>
                                        <Image 
                                            src={images[props.createAction.id]} 
                                            alt=''
                                            width={212}
                                            height={212}
                                        />
                                        <h4 className='font-semibold '>{props.createAction.title}</h4>
                                        {props.createAction.onClick &&
                                            <button className='inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2'
                                                onClick={props.createAction.onClick}
                                            >
                                                {props.createAction.buttonLabel}
                                            </button>
                                        }
                                        {
                                            props.createAction.href &&

                                            <Link href={'/dashboard/jobpost/create'}
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2"
        >
            {props.createAction.buttonLabel}
        </Link>
                                        }

                                    </div>
                                }
                            </tbody>
                        </table>
                        
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Showing
                                        <span className="font-medium"> {
                                            Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems) === 0 ? 0 : (currentPage - 1) * pagination.itemsPerPage + 1
                                        } </span>
                                        to
                                        <span className="font-medium"> {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} </span>
                                        of
                                        <span className="font-medium"> {pagination.totalItems} </span> results
                                    </p>
                                </div>

                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <a
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400   ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <a
                                                key={i}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === i + 1 ? 'bg-green-900/30 text-green-900' : 'text-gray-900   hover:bg-gray-50'} focus:z-20 focus:outline-offset-0 rounded-md`}
                                            >
                                                {i + 1}
                                            </a>
                                        ))}
                                        <a
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400   ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CommonTable