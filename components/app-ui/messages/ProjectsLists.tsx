import { ContactContext } from '@/pages/app/inbox'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { memo, useContext, useState } from 'react'

type Props = {
  projects: any
}

const ProjectsLists = ({ projects }: Props) => {
  const [openOrganization, setOpenOrganization] = useState(false)
  const { currentProject, setCurrentProject } = useContext(ContactContext)

  return (
    <>
      <div className='border-b px-4 fixed z-50 w-full bg-white'>
        <div className='w-full flex items-center justify-between h-16 '>
          <h4 className='text-lg font-semibold'>
            Project :
          </h4>
          {currentProject &&
            <h3 className='font-semibold text-indigo-600 cursor-pointer' onClick={() => setOpenOrganization(!openOrganization)}>
              {currentProject.title}
            </h3>
          }
          <button onClick={() => setOpenOrganization(!openOrganization)}>
            <ChevronDownIcon className={`h-4 w-4 text-gray-500 font-bold ${openOrganization ? 'rotate-180' : 'rotate-0'} transition-all`} />
          </button>
        </div>
        <div className={`w-full ${openOrganization ? 'h-fit block' : 'h-0 hidden'} pt-2 transition-all  h-fit flex flex-col gap-3 [&>div]:shrink-0 [&>div>div]:p-1 pb-4`}>
          <button className='text-md gap-2 bg-gray-200 justify-center py-1 font-semibold rounded-md'>
            {/* <TicketIcon className="h-6 w-6 text-black" /> */}
            {projects.data &&
              projects.data.map((x: any) => {
                return (
                  <div className='' key={`projects_key_${x._id}`} onClick={() => {
                    setCurrentProject(x)
                    setOpenOrganization(false)
                  }}>
                    {x.title}
                  </div>
                )
              })
            }
          </button>
        </div>
      </div>
    </>
  )
}

export default memo(ProjectsLists)