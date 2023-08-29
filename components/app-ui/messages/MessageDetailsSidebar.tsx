import { UsersIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { BuildingOfficeIcon, EnvelopeIcon, MapPinIcon, TagIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import React, { memo } from 'react'
import ContactData from './ContactData'
import LinkedTicket from './LinkedTicket'

type Props = {
    detailsSidebarOpen: boolean,
    setDetailsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const MessageDetailsSidebar = ({ detailsSidebarOpen, setDetailsSidebarOpen }: Props) => {
    return (
        <div
            id="messages-sidebar"
            className={`  h-full  w-full  md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out translate-x-full `}
        >
            <div className={` bg-white overflow-hidden shrink-0    ${detailsSidebarOpen ? 'w-60' : 'w-0'} transition-all  h-fit`}>

                <div className='flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16 '>
                    <span className='text-lg font-semibold '>
                        Details
                    </span>
                    <button className='p-1 text-gray-500 hover:bg-slate-200 border shadow-sm  active:border-indigo-400 active:bg-white rounded-md' onClick={() => setDetailsSidebarOpen(!detailsSidebarOpen)} >
                        <XMarkIcon className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
                <div className='px-4 py-2 border-b'>

                    <div className={`w-full transition-all text-xs h-fit text-gray-400 flex flex-col gap-2 [&>div]:shrink-0 [&>div>div]:p-1`}>
                        <div className='w-full flex gap-2   items-center justify-between'>
                            <div className=' '>
                                Assignee
                            </div>
                            <button className='flex gap-2 text-black'>
                                <UserCircleIcon className="h-4 w-4 " /> <span>Unassigned</span>
                            </button>
                        </div>
                        <div className='w-full flex gap-2    items-center justify-between'>
                            <div className=' '>
                                Team
                            </div>
                            <button className='flex gap-2 text-black'>
                                <UsersIcon className="h-4 w-4  " /> <span>Unassigned</span>
                            </button>
                        </div>


                    </div>
                </div>
                {/* <LinkedTicket/> */}
                <ContactData />
            </div>
        </div>
    )
}

export default memo(MessageDetailsSidebar)