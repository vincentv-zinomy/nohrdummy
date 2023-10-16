import React, { useEffect } from 'react'

type Props = {
  handleChange:(e:any)=>void,
  value:string | number,
  label:string,
  name:string,
  initialValue?:string
}

const TextInputComp = ({
  handleChange, 
  value, 
  label, 
  name,
  initialValue

}: Props) => {

  useEffect(()=>{
      if(initialValue){
        const e = {
          target:{
            value:initialValue,
            name:label
          }
        }
  
        handleChange(e)
      }
  },[])

  return (
    <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
            <label htmlFor="name" className="block    text-black text-left">
              {label}
            </label>
            <div>
              <input
                type="text"
                className="block  w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
  )
}

export default TextInputComp