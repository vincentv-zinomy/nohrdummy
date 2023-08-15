import { Popover, Transition } from '@headlessui/react'
import React, { Fragment, memo, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  section: any,
  index: number,
  setSearchFilterValues: any,
  searchFilterValues: any
}

const SearchFIlterComp = ({section, searchFilterValues, setSearchFilterValues, index}:Props) => {
    
  const [input, setInput] = useState(searchFilterValues[index].value)
  const handleClick = () => {
      const searchValues = [...searchFilterValues]
      searchValues[index].value = input
      setSearchFilterValues(searchValues)
  }
    
  useEffect(()=>{
    setInput(searchFilterValues[index].value)
  },[searchFilterValues, index])

  return (
    <div>
        <Popover
          key={section.label}
          className="relative inline-block px-4 text-left"
        >
          <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            <span>{section.label}</span>
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="min-w-[200px] absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
               <h3 className='font-semibold text-sm'>Filter by <span className='text-indigo-600'>{section.label}</span></h3>
               <input 
                type="text" 
                className='w-full mt-2 text-sm rounded-md px-2 py-1' 
                onChange={(e)=>setInput(e.target.value)}
                value={input}
                />
               <button className='bg-indigo-600 mt-2 w-full p-1 text-sm rounded-md text-white' onClick={handleClick}>Apply</button>
            </Popover.Panel>
          </Transition>
        </Popover>
    </div>
  )
}

export default memo(SearchFIlterComp)