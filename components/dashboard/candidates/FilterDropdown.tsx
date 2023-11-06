import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
 

import {HiAdjustmentsHorizontal} from 'react-icons/hi2'
import { classNames } from '@/lib/common'
import { BsChevronDown } from 'react-icons/bs'

const interviewStatusFilters = [
    {id:1, name:'No Response'},
    {id:2, name:'Response Recieved'},
    {id:3, name:'Interview Scheduled'},
    {id:4, name:'Inactive'},
    {id:5, name:'Interviewed'},
]

const candidateStatusFilter = [
    {id:1, name:'New'},
    {id:2, name:'Old'},
]
 

export default function FilterDropdown({
    interviewStatusFilter, 
    setInterviewStatusFilter,
    candidateStatusFilter, 
    setCandidateStatusFilter
}:any) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center gap-2 justify-center rounded-full border border-green-800 bg-white px-4 py-2 text-sm font-medium text-green-800 shadow-sm hover:bg-gray-50  ">
            <HiAdjustmentsHorizontal className="h-4 w-4 text-green-800" />
            <span>
                Filter
            </span> 
          <BsChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="p-4">
                <p className=' font-medium'>Interview Status</p>
                <div className='grid grid-cols-2 mt-2 gap-3'>

                    {interviewStatusFilter.map((x:any,i:number)=>(
                        <div   className="flex items-center " key={`intrview_filter_${x.key}` }>
                            <input
                                id={`filter-mobile-`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                checked={x.checked}
                                onChange={(e)=>{
                                    const filter = [...interviewStatusFilter]
                                    filter[i].checked = e.target.checked
                                    setInterviewStatusFilter(filter)
                                }}
                            />
                            <label
                                htmlFor={`filter-mobile`}
                                className="ml-3 text-sm text-gray-500"
                            >
                                {x.label}
                            </label>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="p-4">
                <p className=' font-medium'>Candidate Status</p>
                <div className='grid grid-cols-2 mt-2 gap-3'>

                {candidateStatusFilter && candidateStatusFilter.map((x:any,i:number)=>(
                        <div   className="flex items-center " key={`candidate_filter_${x.key}` }>
                            <input
                                id={`filter-mobile-`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                checked={x.checked}
                                onChange={(e)=>{
                                    const filter = [...candidateStatusFilter]
                                    filter[i].checked = e.target.checked
                                    setCandidateStatusFilter(filter)
                                }}
                            />
                            <label
                                htmlFor={`filter-mobile`}
                                className="ml-3 text-sm text-gray-500"
                            >
                                {x.label}
                            </label>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className='p-4 border-t flex items-center justify-between gap-10'>
            <button
                                className=" w-fit px-3 py-1 rounded-full border border-green-800 justify-center items-center gap-2 flex grow shrink basis-0 text-center text-green-900 text-sm "
                                >
                                Cancel
                                </button>
                                <button
                                
                                className=" w-fit px-3 py-1 bg-green-600 hover:bg-green-700 rounded-full justify-center items-center gap-2 flex grow shrink basis-0 text-center text-white text-sm"
                                >
                                {" "}
                                Apply
                                </button>
            </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}