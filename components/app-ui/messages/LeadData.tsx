import React, { useState } from 'react'
import { BuildingOfficeIcon, ChevronDownIcon, EnvelopeIcon, MapPinIcon, TagIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import { UsersIcon, XMarkIcon } from '@heroicons/react/20/solid'

type Props = {}

const LeadData = (props: Props) => {

    const [open, setOpen] = useState(false)

  return (
    <div className='w-full p-4 border-b '>
        <div className='w-full flex items-center justify-between  '>
            <h4 className='text-sm font-semibold'>
                Lead Data
            </h4>
            <button onClick={()=>setOpen(!open)}>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 font-bold ${open ? 'rotate-180' : 'rotate-0'} transition-all`} />
            </button>
        </div>
        <div className={`w-full ${open ? 'h-fit block' : 'h-0 hidden'} pt-2 transition-all  h-fit flex flex-col gap-3 [&>div]:shrink-0 [&>div>div]:p-1`}>
            <div className='w-full flex gap-2 '>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <UsersIcon className="h-4 w-4 text-gray-500" />
                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <UserIcon className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <MapPinIcon  className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <UserCircleIcon className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <EnvelopeIcon  className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <TagIcon   className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>

        </div>
    </div>
  )
}

export default LeadData