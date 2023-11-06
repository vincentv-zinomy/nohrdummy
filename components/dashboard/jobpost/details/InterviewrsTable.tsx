import CommonTable, { HeaderItemForTableTypes } from '@/components/Tables/CommonTable'
import React, { useState } from 'react'

type Props = {
    interviewers:any[]
}

const InterviewrsTable = ({interviewers}: Props) => {

    const [selectedCandidateIdsForTable, setSelectedCandidateIdsForTable] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedCandidateIdsForTable.includes(item_id);
    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedCandidateIdsForTable.filter((i) => i !== item_id);
    }
    else {
      newSelectedItems = [...selectedCandidateIdsForTable, item_id];
    }
    setSelectedCandidateIdsForTable(newSelectedItems);

  }
  
  const handleDeleteSelected = () => {

  }

  const showCustomComponent = (item: boolean, key: string) => {
    return <>

      {item === true ? 
       <span>Yes</span>
      : 
      <span>
        No
      </span> 
      }
    </> 
}

  return (
    <div className="sm:w-full  py-4">
      <div className='flex items-center gap-2'>
          <h3 className="text-md text-black   font-bold">Total Interviews : </h3> 
          <span className='bg-green-900/30 font-medium shrink-0 w-7 h-7 flex items-center justify-center rounded-md'> {  interviewers.length} </span>
      </div>
      <div>
      <CommonTable
        renderCustomComponent={showCustomComponent}
        createAction={{
          id:'createjob',
          title:'You don’t have any job posts',   
          buttonLabel:'Create New Job Post',
          href:'/dashboard/jobpost/create'
        }}
        data={interviewers}
        onRowClick={(item: any) => {
          handleCheckboxChange(item._id);
        }}
        header_items={[
          {
            key: "name",
            label: "Name",
            type: HeaderItemForTableTypes.TEXT,
          }, 
          {
            key: "email",
            label: "Email",
            type: HeaderItemForTableTypes.TEXT,
          },
          {
            key: "phone",
            label: "Phone",
            type: HeaderItemForTableTypes.TEXT,
          },
          {
            key: "calendar_connected",
            label: "Calender Connected",
            type: HeaderItemForTableTypes.CUSTOM_COMPONENT,
          },
        ]}
        pagination={{
          totalItems: interviewers.length,
          itemsPerPage: 10,
          onPageChange: (page: number) => {
          },
        }}
        selectedItems={selectedIds}
        setSelectedItems={setSelectedIds}
        handleCheckboxChange={handleCheckboxChange}
        selectionOptions={[
          {
            button_name: "Delete Selected",
            action: (ids: string[]) => {
              handleDeleteSelected();
            },
          },
        ]}
        
      />
      </div>
    </div>  
  )
}

export default InterviewrsTable