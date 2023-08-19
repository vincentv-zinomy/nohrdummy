import React from 'react';
import { FormattedMessages } from '../EditLeadModal';
import { InboxMessageTypes } from '@/pages/app/contacts/inbox';


function DirectMessages({
  messages,
  setMsgSidebarOpen,
  msgSidebarOpen
}: {
  messages: InboxMessageTypes[],
  msgSidebarOpen: boolean,
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Messages</div>
      <ul className="mb-6">
        {
          messages.map((elem, index) => {
            return (<li className="-mx-2"><button className="flex items-center 
            justify-between w-full p-2 rounded "
              onClick={() => setMsgSidebarOpen(false)}>
              <div className="flex items-center truncate">

                <div className="truncate">
                  <span className="text-sm font-medium text-slate-800">
                    {
                      elem.name
                    }
                  </span>
                </div>
              </div>
              <div className="flex items-center ml-2">
                {
                  elem.name === "test 1"
                    ?
                    <div className="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">2</div>
                    :
                    <div className="flex items-center ml-2">
                      <svg className="w-3 h-3 shrink-0 fill-current text-slate-400" viewBox="0 0 12 12">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                    </div>
                }
              </div>
            </button>
            </li>)
          })
        }
      </ul>
    </div>
  )
}

export default DirectMessages;