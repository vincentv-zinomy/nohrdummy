import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from '@/lib/common'
import { BsCheck, BsChevronDown } from 'react-icons/bs'

type Props = {}

const SelectInput = ({
    value,
    setValue,
    values
}: any) => {
  return (
    <Listbox 
    value={value} 
    onChange={setValue}>
    {({ open }) => (
      <>
        
        <div className="relative mt-1 ">
          <Listbox.Button className="relative   w-48 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm cursor-pointer">
            <span className="block truncate">{value.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  border customscroll">
              {values.map((person:any) => (
                <Listbox.Option
                  key={person.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-green-600' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9 rounded-md'
                    )
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate cursor-pointer')}>
                        
                        {person.name}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-green-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <BsCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
  )
}

export default SelectInput