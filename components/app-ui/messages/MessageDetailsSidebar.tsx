import { UsersIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { BuildingOfficeIcon, EnvelopeIcon, MapPinIcon, TagIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {
    detailsSidebarOpen: boolean, 
    setDetailsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const MessageDetailsSidebar = ({detailsSidebarOpen, setDetailsSidebarOpen}: Props) => {
  return (
    <div
      id="messages-sidebar"
      className={` z-20  w-full  md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out translate-x-full `}
    >
      <div className={` bg-white overflow-hidden shrink-0 border-l border-slate-200 ${detailsSidebarOpen ? 'w-60' : 'w-0'} transition-all  h-screen`}>

        <div className='flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16 '>
            <span className='text-lg font-semibold '>
                Lead Data
            </span>
            <button className='p-1 text-gray-500 hover:bg-slate-200 border shadow-sm  active:border-indigo-400 active:bg-white rounded-md' onClick={()=>setDetailsSidebarOpen(!detailsSidebarOpen)} >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
            </button>
        </div>
        <div className='w-full p-2 '>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <UsersIcon className="h-4 w-4 text-gray-500" />
                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <UserIcon className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <MapPinIcon  className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <UserCircleIcon className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <EnvelopeIcon  className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>
            <div className='w-full p-2 flex gap-2'>
                <div className='p-1 flex items-center justify-center bg-gray-100 inline-block rounded-full overflow-hidden'>
                    <TagIcon   className="h-4 w-4 text-gray-500" />

                </div>
                <span>
                    _
                </span>
            </div>

        </div>
      </div>
    </div>
  )
}

export default MessageDetailsSidebar