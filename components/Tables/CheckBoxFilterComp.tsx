import { Popover, Transition } from '@headlessui/react'
import React, { Fragment, memo, useState } from 'react'
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface CheckBoxValueI {
  key:string,
  label:string,
  options:{key:any, checked:boolean}[]
}

interface Props {
  section: any,
  index: number,
  checkboxFilterValues: CheckBoxValueI[],
  setCheckboxFilterValues: any
}

const CheckBoxFilterComp = ({
  section,
  index, 
  checkboxFilterValues, 
  setCheckboxFilterValues
}: Props) => {

  const handleChange = (e:any, sectionIndex:number) => {
    const {checked} = e.target
    const duplicateValues = [...checkboxFilterValues]
    duplicateValues[index].options[sectionIndex].checked = checked
    setCheckboxFilterValues(duplicateValues)
  };
 
    
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
            <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <form className="space-y-4">
                {section.options.map((option: any, optionIdx: number) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.key}-${optionIdx}`}
                      name={`${section.key}[]`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => handleChange(e, optionIdx)}
                      checked={checkboxFilterValues[index].options[optionIdx].checked}
                    />
                    <label
                      htmlFor={`filter-${section.key}-${optionIdx}`}
                      className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                    >
                      {String(option.key)}
                    </label>
                  </div>
                ))}
              </form>
            </Popover.Panel>
          </Transition>
        </Popover>
    </div>
  )
}

export default memo(CheckBoxFilterComp)