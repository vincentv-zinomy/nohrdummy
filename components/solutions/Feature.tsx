import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

type Props = {}

const Feature = ({item}: any) => {

    const [open, setOpen] = useState(false)
  return (
    <div key={item.id} className="relative border-b-2 border-slate-800 pb-5">
                  <dt className='flex items-center justify-between' onClick={()=>setOpen(!open)}>
                    <p className="  text-3xl font-medium   text-gray-900">{item.name}</p>
                        <ChevronDownIcon className='w-6 h-6'/>
                  </dt>
                  {
                    open
                        &&
                    <dd className="mt-4   text-lg text-gray-500">{item.description}</dd>
                  }
                </div>
  )
}

export default Feature