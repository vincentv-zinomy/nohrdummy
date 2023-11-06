import React, { ChangeEvent } from 'react'

type Props = {
    required:boolean,
    placeholder:string,
    value:string,
    label:string,
    handleChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    name:string
}

const CustomInputEmail = ({required, placeholder, value,label, handleChange, name}: Props) => {
  return (
    <div>
        <div className="flex justify-between">
        <label
            htmlFor={'input-email'}
            className="block text-base font-medium text-gray-700 w-full flex items-center justify-between"
        >
            <span className={`'text-red-500'`}>
                {label}
            </span>

        
        </label>
        </div>
        <div className="mt-1">
        <input
            type={"email"}
            name={name}
            id={'input-email'}
            className={`block w-full 
            rounded-lg 
            shadow-sm 
              border-gray-300 focus:border-green-500 focus:ring-green-500 }
             sm:text-base px-4 py-3`}

            placeholder={placeholder}
            required={required}
            value={value} 
            onChange={handleChange}
        />
        </div>
    </div>
  )
}

export default CustomInputEmail