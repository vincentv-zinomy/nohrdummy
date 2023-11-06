import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import CommonTable, { HeaderItemForTableTypes } from "@/components/Tables/CommonTable";
import Image from "next/image";
import React, { useState } from "react";
import MessageTemplateModal from "@/components/dashboard/settings/MessageTemplateModal";
import { BsTrash } from "react-icons/bs";
import {AiOutlineEdit} from 'react-icons/ai'
type Props = {}

const MyNumbersTable = (props: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedIds.includes(item_id);
    console.log(selectedIds.includes(item_id))

    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedIds.filter(
        (i) => i !== item_id
      );
    } else {
      newSelectedItems = [...selectedIds, item_id];
    }
    console.log(newSelectedItems, 'new')
    setSelectedIds(newSelectedItems);
  };
  
  return (
    <div className="mt-12">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            My Number
          </h3>
          <button className=" mt-2 h-8 py-2.5 px-4 bg-brand-normalgreen rounded-[100px] justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium font-['Outfit']">
              Buy New SMS Number
            </button>
        </div>
        <CommonTable
          // renderCustomComponent={showCustomComponent}
          // createAction={{
          // id: "addmember",
          // title: "You don’t have any Team Members added",
          // buttonLabel: "Add New Team Member",
          // // href:'/dashboard/jobpost/create',
          // // onClick: () => setOpenAddTeamMemberModal(true),
          // }}
          data={[{_id:'12412',phone:'+13158096145', number_type:'SMS'}]}
          onRowClick={(item: any) => {
            // handleCheckboxChange(item._id);
          }}
          header_items={[
            
            {
              key: "phone",
              label: "Phone",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "number_type",
              label: "Number Type",
              type: HeaderItemForTableTypes.TEXT,
            } 
          ]}
          pagination={{
            totalItems: 1,
            itemsPerPage: 10,
            onPageChange: (page: number) => {},
          }}
          selectedItems={selectedIds}
          setSelectedItems={setSelectedIds}
          handleCheckboxChange={handleCheckboxChange}
          selectionOptions={[
            {
              button_name: "Delete Selected",
              action: (ids: string[]) => {
                // handleDeleteSelected();
              },
            },
          ]}
          rowActions={(item: any) => {
            return [
              <button className="p-1.5 rounded-full overflow-hidden hover:bg-slate-100 active:bg-slate-300 focus:ring-2 focus:ring-brand-solidgreen">
                  <BsTrash className="h-6 w-6  text-brand-solidgreen" />
              </button>,
              <button className="p-1.5 rounded-full overflow-hidden hover:bg-slate-100 active:bg-slate-300 focus:ring-2 focus:ring-brand-solidgreen">
                <AiOutlineEdit className="h-6 w-6  text-brand-solidgreen" />
              </button>
              ,<button
                type="button"
                className="inline-flex items-center rounded-full 
                            border border-brand-solidgreen
                             text-brand-solidgreen px-2.5 py-1.5 text-xs ml-1
                            font-medium  shadow-sm 
                            hover:bg-gray-100 hover:text-brand-solidgreen focus:outline-none focus:ring-2 focus:ring-brand-solidgreen
                            focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                onClick={() => {}}
              >
                View Detail
              </button>,
              
            ];
          }}
        />
      </div>
  )
}

export default MyNumbersTable