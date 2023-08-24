import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { BuildingOfficeIcon, ChartBarIcon, ChartBarSquareIcon, ChatBubbleLeftIcon, ChevronDownIcon, EnvelopeIcon, EnvelopeOpenIcon, MapPinIcon, PhoneIcon, StopIcon, TagIcon, UserCircleIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { UsersIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ContactContext } from '@/pages/app/inbox'
import { PauseIcon } from '@heroicons/react/24/outline'

type Props = {}

const LeadData = (props: Props) => {
    
    const {contacts, currentContact, currentProject} = useContext(ContactContext)

    const [open, setOpen] = useState(false)
    const [formContact, setFormContact] = useState<any>()

    const handleChange = (e:any) => {
        setFormContact({...formContact, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        setFormContact(currentContact)
    },[currentContact])

    console.log(  currentContact, 'current contact')

  return (
    <div className='w-full p-4 border-b '>
        <div className='w-full flex items-center justify-between  '>
            <h4 className=' font-semibold'>
                Lead Data
            </h4>
            <button onClick={()=>setOpen(!open)}>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 font-bold ${open ? 'rotate-180' : 'rotate-0'} transition-all`} />
            </button>
        </div>
        {currentContact && formContact && 
            <form className={`w-full ${open ? 'h-fit block' : 'h-0 hidden'} pt-2 transition-all  h-fit flex flex-col gap-3 [&>div]:shrink-0 [&>div>div]:p-1 text-sm
                [&>div]:justify-between
                [&>div>div>p]:font-semibold
                [&>div>div>p]:text-gray-600
                [&>div>input]:text-xs
                [&>div>input]:text-gray-500
                [&>div>input]:py-1 
                [&>div>input]:px-1 
                [&>div>input]:border-white 
                [&>div>input]:rounded-sm 
                [&>div>input]:w-32 
            `}>
                <div className='w-full flex gap-2 items-center  '>
                    <div className='w-fit flex items-center gap-2 rounded-full shrink-0'>
                        <span className='flex items-center justify-center  inline-block rounded-full overflow-hidden'>
                            <ChartBarIcon  className="h-4 w-4 text-gray-500" /> 
                        </span>
                        <p>Stage</p>
                    </div>
                    <input type="text" value={formContact.contact_stage} onChange={handleChange} name='contact_stage'/> 

                </div>
                <div className='w-full flex gap-2 items-center  '>
                    <div className='w-fit flex items-center gap-2 rounded-full shrink-0'>
                        <span className='flex items-center justify-center  inline-block rounded-full overflow-hidden'>
                            <UserPlusIcon  className="h-4 w-4 text-gray-500" /> 
                        </span>
                        <p>Status</p>
                    </div>
                    <input type="text" value={formContact.status} onChange={handleChange} name='status'/> 

                </div>
                <div className='w-full flex gap-2 items-center  '>
                    <div className='w-fit flex items-center gap-2 rounded-full shrink-0'>
                        <span className='flex items-center justify-center  inline-block rounded-full overflow-hidden'>
                            <EnvelopeIcon  className="h-4 w-4 text-gray-500" /> 
                        </span>
                        <p>Email</p>
                    </div>
                    <input type="email" value={formContact.email} onChange={handleChange} name='email'/> 
                </div>
                <div className='w-full flex gap-2 items-center  '>
                    <div className='w-fit flex items-center gap-2 rounded-full shrink-0'>
                        <span className='flex items-center justify-center  inline-block rounded-full overflow-hidden'>
                            <UserIcon  className="h-4 w-4 text-gray-500" /> 
                        </span>
                        <p>Name</p>
                    </div>
                    <input type="text" value={formContact.full_name} onChange={handleChange} name='full_name'/> 
                </div>
                <div className='w-full flex gap-2 items-center  '>
                    <div className='w-fit flex items-center gap-2 rounded-full shrink-0'>
                        <span className='flex items-center justify-center  inline-block rounded-full overflow-hidden'>
                            <PhoneIcon className="h-4 w-4 text-gray-500" /> 
                        </span>
                        <p>Phone</p>
                    </div>
                    <input type="text" value={formContact.phone} onChange={handleChange} name='phone'/> 

                </div>
                <div className='w-full flex gap-2 items-center '>
                    <div className=' flex items-center gap-2 rounded-full shrink-0  '>
                        <span className='flex items-center justify-center  inline-block rounded-full overflow-hidden '>
                            <ChatBubbleLeftIcon className="h-4 w-4 text-gray-500" /> 
                        </span>
                        <p>Stop AI</p>
                    </div>
                    <span className='flex items-center justify-center w-full gap-2'>
                        {/* <button className='py-1 px-3 bg-red-400 rounded-full '><StopIcon  className='w-4 text-white font-bold'/></button> */} 
                        <input type="radio"  id='stop_ai' />
                    </span>
                </div>

            </form>
        }
    </div>
  )
}

export default LeadData