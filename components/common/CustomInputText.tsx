import React from 'react'

type Props = {}

const CustomInputText = ({
    required, 
    placeholder, 
    value,
    label, 
    handleChange, 
    error 
}: any) => {

    console.log(error, 'error')

  return (
    <div>
        <div className="flex justify-between">
        <label
            htmlFor={'input-text'}
            className="block text-base font-medium text-gray-700 w-full flex items-center justify-between"
        >
            <span className={`'text-red-500'`}>
                {label}
            </span>

        
        </label>
        </div>
        <div className="mt-1">
        <input
            type={"text"}
            name={'name'}
            id={'input-text'}
            className={`block w-full 
            rounded-lg 
            shadow-sm 
            ${error ? 'border-red-300' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
            }
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

export default CustomInputText