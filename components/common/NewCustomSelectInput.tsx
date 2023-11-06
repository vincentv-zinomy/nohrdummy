import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from '@/lib/common'
import { InputI } from './CustomModal'
import { BsChevronDown } from 'react-icons/bs'

const people = [
  { id: 1, label: 'Select Role', value:null },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' }
]

type Props = {
  input: InputI,
  formData:any,
  setFormData:any
}
 

export default function NewCustomSelectInput({input, formData, setFormData}:Props) {
  const [selected, setSelected] = useState({ id: 1, label: 'Select Role', value:'' })

  useEffect(()=>{
    if(selected) setFormData({...formData, [input?.key]:selected.value})
  },[selected])

  // console.log(input, 'input')
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative   ">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white px-4 py-3 text-left shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-base">
              <span className="block truncate">{selected.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {/* {input && input.options && input?.options?.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-green-600' : 'text-gray-900',
                        'relative cursor-default select-none p-2 rounded-md cursor-pointer'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-green-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))} */}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
