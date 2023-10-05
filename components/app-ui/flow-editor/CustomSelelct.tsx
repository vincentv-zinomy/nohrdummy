import { Fragment,useEffect,useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

 

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
    state:any,
    setState:(value:any)=>void,
    label:string,
    list:any[],
    name: any
}

export default function CustomSelelct({
    state,
    setState,
    label,
    list, 
    name
}:Props) {
  
    const [selected, setSelected] = useState(list[0])

    useEffect(()=>{
        
        setState({...state, [name]:selected.value})
    },[selected])

  return (

    <div className='bg-slate-50 py-2 px-6 flex flex-col    relative'>
        {
            state && 
            <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                <Listbox.Label className="block  text-black text-left">{label}</Listbox.Label>
                <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
                    <Listbox.Options className="absolute z-10   max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {list && list.map((x) => {
                            // console.log(x,'x')
                            return (
                        <Listbox.Option
                            key={x.id}
                            className={({ active }) =>
                            classNames(
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9 rounded-md'
                            )
                            }
                            value={x}
                        >
                            {({ selected, active }) => (
                            <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {x.label}
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
                        )})}
                    </Listbox.Options>
                    </Transition>
                </div>
                </>
            )}
            </Listbox>
        }
    </div>
  )
}
