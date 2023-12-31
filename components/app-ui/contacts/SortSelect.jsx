import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 1, name: 'Name' },
  { id: 2, name: 'Email' },
  { id: 3, name: 'Phone' },
  { id: 4, name: 'AI Stopped?' },
  { id: 5, name: 'Total Messages' },
  { id: 6, name: 'First Created' },
  { id: 7, name: 'Last Response Timestamp' },
  { id: 8, name: 'Status' },
  { id: 9, name: 'Stage' }, 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SortSelect({options}) {

  const [selected, setSelected] = useState(options[0])

  console.log(selected)
  return (
    <Listbox className={'shrink-0'}  value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className='flex items-center gap-4'>
          <Listbox.Label className="block  text-sm font-medium text-gray-700 shrink-0">Sort By</Listbox.Label>
          <div className="relative  ">
            <Listbox.Button className="relative w-72 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 px-1 text-base shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm customscroll1">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.key}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9 rounded-md cursor-pointer'
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
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
