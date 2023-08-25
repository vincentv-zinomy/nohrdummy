import React, { useState } from 'react'
import { BuildingOfficeIcon, ChevronDownIcon, EnvelopeIcon, MapPinIcon, TagIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import { UsersIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { TicketIcon } from '@heroicons/react/24/solid'

type Props = {}

const LinkedTicket = (props: Props) => {

    const [open, setOpen] = useState(false)

  return (
    <div className='w-full p-4 border-b '>
        <div className='w-full flex items-center justify-between  '>
            <h4 className='text-sm font-semibold'>
                Linked Tickets
            </h4>
            <button onClick={()=>setOpen(!open)}>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 font-bold ${open ? 'rotate-180' : 'rotate-0'} transition-all`} />
            </button>
        </div>
        <div className={`w-full ${open ? 'h-fit block' : 'h-0 hidden'} pt-2 transition-all  h-fit flex flex-col gap-3 [&>div]:shrink-0 [&>div>div]:p-1`}>
            <button className='text-xs flex items-center  gap-2 bg-gray-200 justify-center py-1 font-semibold rounded-md'>
                <TicketIcon className="h-6 w-6 text-black" />
                <span>Create Linked Ticket</span>
            </button>


        </div>
    </div>
  )
}

export default LinkedTicket