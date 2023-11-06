import { useEffect, useState } from 'react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/outline'
import { Combobox } from '@headlessui/react'
import { classNames } from '@/lib/common'
import { BsCheck, BsChevronDown } from 'react-icons/bs'

const people = [
    {id: 0, name:'Select Role', value:''},
    { id: 1, name: 'Leslie Alexander',value:'' },
  // More users...
]

 
export default function CustomSelectInput({
    label, 
    name,
    state, 
    setState,
    options
}:any) {
  const [query, setQuery] = useState('')


  const [selected, setSelected] = useState(options.find((x:any)=>x.value===state[name]))

   useEffect(()=>{

    setState((prev:any)=>{
        return {
            ...prev,
            [name]:selected.value
        }
    })

   },[selected])

 

  return (
    <Combobox as="div" value={selected} onChange={setSelected}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
          displayValue={(person:any) => person?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <BsChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {options.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((person:any) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none p-2 pl-3 pr-9 rounded-md',
                    active ? 'bg-green-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-green-600'
                        )}
                      >
                        <BsCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
