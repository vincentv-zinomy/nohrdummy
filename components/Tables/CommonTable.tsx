import { classNames } from "@/lib/common";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FunnelIcon,
} from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import CheckBoxFilterComp from "./CheckBoxFilterComp";
import SearchFIlterComp from "./SearchFIlterComp";
import Spinner from "../common/Spinner";
import { useRouter } from "next/router";


export interface SelectionOption {
    button_name: string;
    action: (selectedItems: string[]) => void;
}

interface valuesOptionsI {
    key: string,
    checked: boolean
}

export interface checkboxFilterValuesI {
    options: valuesOptionsI[];
    key: string;
    label: string;
}

export interface searchFilterValuesI {
    value: string;
    key: string;
    label: string;
}

export interface sortI {
    key: string;
    type: "asc" | "desc";
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
    type: HeaderItemForTableTypes;
}
export interface CommonTablData {

    [key: string]: any;

}
export interface CommonTableProps {
    selectionOptions: SelectionOption[];
    header_items: HeaderItemForTable[];
    data: CommonTablData[];
    selectedItems: string[];
    setSelectedItems: (selectedItems: string[]) => void;
    handleCheckboxChange: (item: any) => void;
    onRowClick?: (item: any) => void;
    onRowDoubleClick?: (item: any) => void;
    rowActions?: (item: any) => React.ReactNode[];
    renderCustomComponent?: (item: any, key: string) => React.ReactNode;
    pagination: {
        totalItems: number;
        itemsPerPage: number;
        onPageChange: (page: number) => void;
    };
    checkBoxFilter: { key: string; label: string }[];
    searchFilter: { key: string; label: string }[];
    setAppliedFilters: (filters: { key: string; value: string }[]) => void;
    isLoading: boolean;
}

function CommonTable(props: CommonTableProps) {
    const {
        selectionOptions,
        header_items,
        data,
        onRowClick,
        rowActions,
        selectedItems,
        setSelectedItems,
        onRowDoubleClick,
        handleCheckboxChange,
        renderCustomComponent,
        pagination,
        checkBoxFilter,
        searchFilter,
        setAppliedFilters,
        isLoading
    } = props;

    const handleRowClick = useCallback(
        (item: any) => {
            if (onRowClick) {
                onRowClick(item);
            }
        },
        [onRowClick]
    );

    const showCheckboxes =
        selectionOptions && selectionOptions.length > 0 ? true : false;

    const handleRowDoubleClick = useCallback(
        (item: any) => {
            if (onRowDoubleClick) {
                onRowDoubleClick(item);
            }
        },
        [onRowDoubleClick]
    );

    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();


    const handlePageChange = (page: number) => {

        const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
        // Checks if the page number is within the valid range
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            pagination.onPageChange(page);
        }
    };

    // State for checkbox Filters
    const [checkboxFilterValues, setCheckboxFilterValues] = useState<
        checkboxFilterValuesI[]
    >([]);

    const [sort, setSort] = useState<sortI | null>(null);

    // State for Search Filters
    const [searchFilterValues, setSearchFilterValues] = useState<
        searchFilterValuesI[]
    >(
        searchFilter.map((x) => {
            return {
                ...x,
                value: "",
            };
        })
    );

    const initializeCheckboxFilterValues = () => {
        console.log("init checkbox triggered")
        let values: {
            options: { key: any; checked: boolean }[];
            key: string;
            label: string;
        }[] = [];
        if (checkBoxFilter) {
            values = checkBoxFilter.map(element => {
                const uniqueValues = Array.from(new Set(data.map(item => item[element.key])));
                return {
                    ...element,
                    options: uniqueValues.map(val => ({
                        key: val,
                        checked: false,
                    }))
                };
            });
        }
        return values;
    };


    useEffect(() => {
        setCheckboxFilterValues(initializeCheckboxFilterValues());
    }, []);
    useEffect(() => {
        const tempAppliedFilters = [] as { key: string; value: string }[];
        checkboxFilterValues.forEach(element => {
            const filters = element.options
                .filter(x => x.checked)
                .map(x => x.key);
            if (filters.length > 0) {
                tempAppliedFilters.push({
                    key: element.key,
                    value: filters.join(","),
                });
            }
        });
        searchFilterValues.forEach(element => {
            if (element.value.trim()) {
                tempAppliedFilters.push({
                    key: element.key,
                    value: element.value,
                });
            }
        });
        if (sort) {
            tempAppliedFilters.push({
                key: sort.type,
                value: sort.key,
            });
        }
        console.log(tempAppliedFilters)
        setAppliedFilters([...tempAppliedFilters])

    }, [checkboxFilterValues, searchFilterValues, sort]);

    const handleSort = (key: string) => {
        if (sort) {
            if (sort.key === key) {
                if (sort.type === "asc") {
                    setSort({ key, type: "desc" });
                } else {
                    setSort(null);
                }
            } else {
                setSort({ key, type: "asc" });
            }
        } else {
            setSort({ key, type: "asc" });
        }
    };

    // delete functions from the filter chips
    const handleFilterDelete = (filterIndex: number, index: number) => {
        if (checkboxFilterValues) {
            const duplicateValues = [...checkboxFilterValues];
            duplicateValues[filterIndex].options[index].checked = false;
            setCheckboxFilterValues(duplicateValues);
        }
    };

    // delete functions from the filter chips
    const handleSearchFilterDelete = (searchFilterIdx: number) => {
        if (searchFilterValues) {
            const duplicateValues = [...searchFilterValues];
            duplicateValues[searchFilterIdx].value = "";
            setSearchFilterValues(duplicateValues);
        }
    };




    return (
        <>
            <div className="inline-block w-full py-2">
                {/* Dropdown filters */}
                <div className="flex justify-end mb-4">
                    {checkboxFilterValues.map((x: checkboxFilterValuesI, i: number) => (
                        <CheckBoxFilterComp
                            key={`table-key-for-checkbox-filter-${x.key}`}
                            section={x}
                            index={i}
                            checkboxFilterValues={checkboxFilterValues}
                            setCheckboxFilterValues={setCheckboxFilterValues}
                        />
                    ))}
                    {searchFilterValues.map((x: searchFilterValuesI, i: number) => (
                        <SearchFIlterComp
                            key={`table-key-for-search-filter-${x.key}`}
                            section={x}
                            index={i}
                            searchFilterValues={searchFilterValues}
                            setSearchFilterValues={setSearchFilterValues}
                        />
                    ))}
                </div>

                {/* Filter Chips */}
                {(searchFilter || checkBoxFilter) && (
                    <div className=" relative overflow-hidden px-4  ring-1 ring-gray-200  md:rounded-t-lg">
                        <div className=" max-w-7xl py-2 px-2 sm:flex sm:items-center ">
                            <div className="group flex items-center font-medium text-gray-700 h-12">
                                <FunnelIcon
                                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                Filters
                            </div>

                            <div
                                aria-hidden="true"
                                className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
                            />

                            <div className="mt-2 sm:mt-0 sm:ml-4">
                                <div className="-m-1 flex flex-wrap items-center gap-2  ">
                                    {checkboxFilterValues &&
                                        checkboxFilterValues.map((x: checkboxFilterValuesI, filterIndex: number) => {
                                            if (!x.options.some((item: valuesOptionsI) => item.checked === true))
                                                return null;
                                            return (
                                                <div
                                                    className=" flex flex-wrap items-center  border border-gray-100 bg-gray-50  p-1 px-2   rounded-md     "
                                                    key={`checkbox-filter-values-${x.key}`}
                                                >
                                                    <h3 className="font-semibold text-sm mr-3">{x.label}</h3>
                                                    <div className="flex flex-wrap">
                                                        {x.options.map((item: valuesOptionsI, index: number) => {
                                                            if (!item.checked) return null;
                                                            return (
                                                                <span
                                                                    key={`checkboxfilter-chips-${item.key}`}
                                                                    className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                                                >
                                                                    <span className="text-sm">
                                                                        {String(item.key)}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="ml-1 inline-flex items-center h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                                                        onClick={() =>
                                                                            handleFilterDelete(filterIndex, index)
                                                                        }
                                                                    >
                                                                        <svg
                                                                            className="h-2 w-2"
                                                                            stroke="currentColor"
                                                                            fill="none"
                                                                            viewBox="0 0 8 8"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeWidth="1.5"
                                                                                d="M1 1l6 6m0-6L1 7"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {searchFilterValues &&
                                        searchFilterValues.map(
                                            (x: searchFilterValuesI, searchFilterIdx: number) => {
                                                if (x.value.trim().length > 0) {
                                                    return (
                                                        <div
                                                            className=" flex items-center border border-gray-50 py-1 px-2 rounded-md  bg-gray-50"
                                                            key={`search-filter-values-${x.key}`}
                                                        >
                                                            <h3 className="font-semibold mr-3">{x.label} </h3>
                                                            <div className="flex">
                                                                {x.value.trim().length > 0 && (
                                                                    <span
                                                                        key={`searchfilter-chips-${x.value}`}
                                                                        className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                                                    >
                                                                        <span className="text-sm">{x.value}</span>
                                                                        <button
                                                                            type="button"
                                                                            className="ml-1 inline-flex items-center h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                                                            onClick={() =>
                                                                                handleSearchFilterDelete(searchFilterIdx)
                                                                            }
                                                                        >
                                                                            <svg
                                                                                className="h-2 w-2"
                                                                                stroke="currentColor"
                                                                                fill="none"
                                                                                viewBox="0 0 8 8"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth="1.5"
                                                                                    d="M1 1l6 6m0-6L1 7"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            }
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="relative overflow-hidden   ring-1 ring-black ring-opacity-10 md:rounded-b-lg">
                    {selectedItems.length > 0 && (
                        <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                            {selectionOptions &&
                                selectionOptions.length > 0 &&
                                selectionOptions.map((option, index) => (
                                    <button
                                        key={option.button_name}
                                        type="button"
                                        className="inline-flex items-center rounded border border-gray-300 
                        bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm 
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                        focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                        onClick={() => {
                                            option.action(selectedItems);
                                        }}
                                    >
                                        {option.button_name}
                                    </button>
                                ))}
                        </div>
                    )}
                    <div className="overflow-x-auto">


                        {
                            isLoading ?
                                (<div className="flex justify-center items-center">
                                    <Spinner color='text-indigo-500' />
                                </div>)
                                :
                                <table className="min-w-full table-fixed  ">
                                    <thead className="bg-gray-50  border-b  border-gray-200">
                                        <tr>
                                            {showCheckboxes && (
                                                <th
                                                    scope="col"
                                                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                                                >
                                                    <input
                                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                                        type="checkbox"
                                                        checked={
                                                            selectedItems.length === data.length &&
                                                            data.length > 0
                                                        }
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedItems(data.map((item) => item._id as string));
                                                            } else {
                                                                setSelectedItems([]);
                                                            }
                                                        }}
                                                    />
                                                </th>
                                            )}

                                            {header_items &&
                                                header_items.length > 0 &&
                                                header_items.map((item) => (
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                                        key={item.key}
                                                    >
                                                        <button
                                                            className="w-full text-left flex gap-4 items-center"
                                                            onClick={() => handleSort(item.key)}
                                                        >
                                                            {item.label}
                                                            {item.key === sort?.key && sort.type === "asc" && (
                                                                <BsArrowUp />
                                                            )}
                                                            {item.key === sort?.key && sort.type === "desc" && (
                                                                <BsArrowDown />
                                                            )}
                                                        </button>
                                                    </th>
                                                ))}
                                            {rowActions && (
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Actions
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white ">
                                        {data
                                            .map((data_item: any, table_index_) => {
                                                const is_selected = selectedItems.includes(data_item[`_id`] as string);
                                                const item_id = data_item._id;
                                                return (
                                                    <tr
                                                        key={`${item_id}_${table_index_}`}
                                                        className={classNames(
                                                            is_selected ? "bg-gray-50" : "",
                                                            "cursor-pointer"
                                                        )}
                                                        onClick={() => {
                                                            handleRowClick(data_item);
                                                        }}
                                                        onDoubleClick={() => {
                                                            handleRowDoubleClick(data_item);
                                                        }}
                                                    >
                                                        {showCheckboxes && (
                                                            <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                                                {is_selected && (
                                                                    <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                                                )}
                                                                <input
                                                                    type="checkbox"
                                                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                                                    checked={selectedItems.includes(item_id as string)}
                                                                    onChange={(e) => {
                                                                        handleCheckboxChange(item_id as string);
                                                                    }}
                                                                />
                                                            </td>
                                                        )}
                                                        {header_items &&
                                                            header_items.length > 0 &&
                                                            header_items.map((item) => {
                                                                if (
                                                                    item.type ===
                                                                    HeaderItemForTableTypes.CUSTOM_COMPONENT
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            className="px-3 py-4 text-left text-sm font-medium text-gray-900"
                                                                            key={item.key}
                                                                        >
                                                                            {renderCustomComponent &&
                                                                                renderCustomComponent(data_item, item.key)}
                                                                        </td>
                                                                    );
                                                                } else if (
                                                                    item.type === HeaderItemForTableTypes.TEXT
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            className={"px-3 py-4 text-sm text-gray-500"}
                                                                            key={item.key}
                                                                        >
                                                                            {data_item && data_item[item.key]
                                                                                ? `${data_item[item.key].length > 75
                                                                                    ? data_item[item.key].slice(0, 75) +
                                                                                    "..."
                                                                                    : data_item[item.key]
                                                                                }`
                                                                                : ``}
                                                                        </td>
                                                                    );
                                                                }
                                                            })}

                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                                            <div className="flex">
                                                                {rowActions &&
                                                                    rowActions(data_item).map((action) => action)}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>

                        }



                    </div>
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
                                <p className="text-sm text-gray-700">
                                    Showing
                                    <span className="font-medium">
                                        {" "}
                                        {Math.min(
                                            currentPage * pagination.itemsPerPage,
                                            pagination.totalItems
                                        ) === 0
                                            ? 0
                                            : (currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                                    </span>
                                    to
                                    <span className="font-medium">
                                        {" "}
                                        {Math.min(
                                            currentPage * pagination.itemsPerPage,
                                            pagination.totalItems
                                        )}{" "}
                                    </span>
                                    of
                                    <span className="font-medium"> {pagination.totalItems} </span>{" "}
                                    results
                                </p>
                            </div>

                            <div>
                                <nav
                                    className="isolate inline-flex -space-x-px rounded-md  "
                                    aria-label="Pagination"
                                >
                                    <a
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === 1
                                            ? "cursor-not-allowed"
                                            : "hover:bg-gray-50"
                                            } focus:z-20 focus:outline-offset-0`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    {[
                                        ...Array(
                                            Math.ceil(pagination.totalItems / pagination.itemsPerPage)
                                        ),
                                    ].map((_, i) => (
                                        <a
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === i + 1
                                                ? "bg-indigo-600 text-white"
                                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                } focus:z-20 focus:outline-offset-0`}
                                        >
                                            {i + 1}
                                        </a>
                                    ))}
                                    <a
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage)
                                            ? "cursor-not-allowed"
                                            : "hover:bg-gray-50"
                                            } focus:z-20 focus:outline-offset-0`}
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
        </>
    );
}

export default CommonTable;

