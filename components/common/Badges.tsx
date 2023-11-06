import React from 'react'

type Props = {}

const Badges = ({name, action}: any) => {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-solidgreen/10 py-1 pl-3 pr-2 text-sm font-medium gap-2 text-brand-solidgreen">
        {name}
        <button
          type="button"
          className="ml-0.5 inline-flex p-1 flex-shrink-0 items-center justify-center rounded-full 
          bg-red-600 text-white hover:bg-red-700  active:bg-red-800 focus:text-white focus:outline-none"
          onClick={action}
        > 
           
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      </span>
  )
}

export default Badges