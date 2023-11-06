import CommonTable, { HeaderItemForTableTypes } from '@/components/Tables/CommonTable'
import React, { useState } from 'react'

type Props = {
    candidates:any[]
}

const CandidatesTable = ({candidates}: Props) => {

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

    const showCustomComponent = (item: any, key: string) => {
        console.log(item.interview_status, 'item')
        return <>
    
            {item.interview_status==='No Response' && <span className="inline-flex items-center rounded-md  bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
            No Response
            </span>}
            {item.interview_status==='InActive' && <span className="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
                InActive
            </span>}
            {item.interview_status==='Interviewed' && <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
            Interviewed
            </span>}
        </> 
    }

  return (
    <div className="sm:w-full   py-4">
      <div className='flex items-center gap-2'>
          <h3 className="text-md text-black   font-bold">Total Candidates : </h3> 
          <span className='bg-green-900/30 font-medium shrink-0 w-7 h-7 flex items-center justify-center rounded-md'> {  candidates.length} </span>
      </div>
      <div>
      <CommonTable
        renderCustomComponent={showCustomComponent}
     
        data={candidates}
        onRowClick={(item: any) => {
          handleCheckboxChange(item._id);
        }}
        header_items={[
          {
            key: "full_name",
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
            key: "status",
            label: "Status",
            type: HeaderItemForTableTypes.TEXT,
          },
          {
            key: "interview_status",
            label: "Interview Status",
            type: HeaderItemForTableTypes.CUSTOM_COMPONENT,
          },
        ]}
        pagination={{
          totalItems: candidates.length,
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

export default CandidatesTable