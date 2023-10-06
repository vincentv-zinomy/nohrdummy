import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import EditTextModal from '../EditTextModal'

type Props = {
  value:string | number,
  handleChange:(e:any)=>void,
  label:string,
  name:string
}

const TextAreaInputComp = ({
  value, 
  handleChange, 
  label, 
  name 
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
              <label htmlFor="name" className="block    text-black text-left">
                {label}
              </label>
              <div className="mt-2 flex item-center gap-2">
                <textarea
                  rows={1}
                  className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  name={name}
                  value={value}
                  onChange={handleChange}
                />
                <button
                  onClick={() => {
                    setOpen(!open)
                  //   setOpenTextModal(!openTextModal);
                  //   setTextModalContent("qualification_requirement_check");
                  }}
                >
                  <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
                </button>
              </div>
      </div>
      <EditTextModal 
        open={open}
        setOpen={setOpen}
        name={name} 
        value={value}
        handleChange={handleChange}
        />
    </>

  )
}

export default TextAreaInputComp