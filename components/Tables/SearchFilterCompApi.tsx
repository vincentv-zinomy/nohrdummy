import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  search: string,
  setSearch: (search: string) => void;
  onSubmit: () => void;
}

const SearchFilterCompApi = ({
  search, setSearch,
  onSubmit
}: Props) => {


  return (
    <div className="w-full shrink-1 flex items-center">

      <div className="relative flex items-center gap-2">
        <div className='absolute z-30 left-3'>
          <MagnifyingGlassIcon className='w-4 h-4' />
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="relative w-72 pl-10  rounded-md border border-gray-300   py-2  pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm "
          placeholder="Search by name, status, etc."
        />
        <button
          onClick={() => {
            onSubmit();
          }}
          className="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchFilterCompApi