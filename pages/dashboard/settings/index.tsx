import DashboardLayout from "@/components/NewLayout/DashboardLayout";
import CommonTable, { HeaderItemForTableTypes } from "@/components/Tables/CommonTable";
import Image from "next/image";
import React, { useState } from "react";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import MessageTemplateModal from "@/components/dashboard/settings/MessageTemplateModal";
import MyNumbersTable from "@/components/dashboard/settings/MyNumbersTable";

type Props = {};

const index = (props: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false)
  const [action, setAction] = useState<'create' | 'update' | 'delete' | 'view' >('create')
  const [data, setData] = useState()

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

  const showCustomComponent = (item: any, key:any) => {
    return (
      <div>
        {
          item.status === 'active' &&
          <span className="w-[103px] h-6 px-[18px] py-[3px] bg-green-800 bg-opacity-10 rounded-[100px] justify-center items-center gap-2.5 inline-flex text-green-800 text-sm font-normal font-['Outfit']">
             Active 
          </span> 
        }
        {
          item.status === 'inactive' &&
          <span className="w-[103px] h-6 px-[18px] py-[3px] bg-red-800 bg-opacity-10 rounded-[100px] justify-center items-center gap-2.5 inline-flex text-red-800 text-sm font-normal font-['Outfit']">
             InActive 
          </span> 
        }
      </div>
    )
  }
  return (
    <DashboardLayout>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        My Connected Calender
      </h3>
      <div className="p-4 border border-brand-normalgreen rounded-lg mt-5" 
      style={{background: "linear-gradient(266deg, rgba(59, 120, 31, 0.06) 15.09%, rgba(253, 255, 167, 0. 06) 107.57%)"
      }}>
        <div className="flex items-center justify-between pr-5">
          <div className="flex items-center gap-4">
            <Image alt="" src="/google_calendar.svg" width={40} height={40}/>
            <div>
              <p className="text-lg font-semibold">Google Calender</p>
              <p className="text-sm text-slate-400">kishan.mendapara@gmail.com</p>
            </div>
          </div>
          <button className="text-brand-lightgreen font-medium">Disconnect</button>
        </div>
      </div>
       <MyNumbersTable/>

      <div className="mt-12">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            My Message Template
          </h3>
          <button className=" mt-2 h-8 py-2.5 px-4 bg-brand-normalgreen rounded-[100px] justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium font-['Outfit']"
            onClick={()=>setOpen(!open)}
          >
              Add Message Template
          </button>
        </div>
        <CommonTable
          renderCustomComponent={showCustomComponent}
          // createAction={{
          // id: "addmember",
          // title: "You don’t have any Team Members added",
          // buttonLabel: "Add New Team Member",
          // // href:'/dashboard/jobpost/create',
          // // onClick: () => setOpenAddTeamMemberModal(true),
          // }}
          data={[{_id:'3getg4',template_name:'Product Designer', template_type:'SMS', status:'active'},{_id:'rfwref',template_name:'Product Designer', template_type:'SMS', status:'inactive'}]}
          onRowClick={(item: any) => {
            handleCheckboxChange(item._id);
          }}
          header_items={[
            
            {
              key: "template_name",
              label: "Template Name",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "template_type",
              label: "Template Type",
              type: HeaderItemForTableTypes.TEXT,
            },
            {
              key: "status",
              label: "Status",
              type: HeaderItemForTableTypes.CUSTOM_COMPONENT,
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
                  <TrashIcon className="h-6 w-6  text-brand-solidgreen " />
              </button>,
              <button className="ml-2 p-1.5 rounded-full overflow-hidden hover:bg-slate-100 active:bg-slate-300 focus:ring-2 focus:ring-brand-solidgreen " 
              onClick={()=>{
                setAction('update')
                setOpen(true)
              }}>
                <PencilSquareIcon className="h-6 w-6  text-brand-solidgreen" />
              </button>
              ,<button
                type="button"
                className="ml-2 inline-flex items-center rounded-full 
                            border border-brand-solidgreen
                             text-brand-solidgreen px-2.5 py-1.5 text-xs  
                            font-medium  shadow-sm 
                            hover:bg-gray-100 hover:text-brand-solidgreen focus:outline-none focus:ring-2 focus:ring-brand-solidgreen
                            focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30  "
                onClick={() => {
                  setAction('view')
                  setOpen(true)
                }}
              >
                View Detail
              </button>,
              
            ];
          }}
        />
      </div>
      <MessageTemplateModal open={open} setOpen={setOpen} action={action} data={data}/>
    </DashboardLayout>
  );
};

export default index;
