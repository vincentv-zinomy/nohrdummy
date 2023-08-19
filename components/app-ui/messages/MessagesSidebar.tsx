import React from 'react';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import { FormattedMessages } from '../EditLeadModal';
import { InboxMessageTypes } from '@/pages/app/contacts/inbox';

function MessagesSidebar({
  messages,
  msgSidebarOpen,
  setMsgSidebarOpen
}: {
  messages: InboxMessageTypes[],
  msgSidebarOpen: boolean,
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      id="messages-sidebar"
      className={` z-20  w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out translate-x-full`}
    >
      <div className=" bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]">

        {/* #Marketing group */}
        <div>

          {/* Group body */}
          <div className="px-5 py-4">
            {/* Search form */}
            <form className="relative">
              <label htmlFor="msg-search" className="sr-only">Search</label>
              <input id="msg-search" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search…" />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            {/* Direct messages */}
            <DirectMessages messages={messages} msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default MessagesSidebar;
