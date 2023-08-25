import { ContactContext } from "@/pages/app/inbox";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { memo, useContext } from "react";

function MessagesHeader({
  msgSidebarOpen,
  setMsgSidebarOpen,
  setDetailsSidebarOpen,
  detailsSidebarOpen,
}: {
  msgSidebarOpen: boolean;
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailsSidebarOpen: boolean;
}) {

  const {currentContact, messages} = useContext(ContactContext) 

  return ( 
      <div className="flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16 shrink-0">
        {/* People */}
        <div className="flex items-center">
          {/* Close button */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-500 mr-4"
            onClick={() => setMsgSidebarOpen(!msgSidebarOpen)}
            aria-controls="messages-sidebar"
            aria-expanded={msgSidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* People list */}
          <div className="flex  gap-4 items-center ">
            <a
              className="block w-12 h-12 bg-slate-500 rounded-full border border-slate-200 flex items-center justify-center text-lg text-white "
              href="#0"
            >
              <span className="uppercase font-semibold">{currentContact?.full_name[0]}</span>
            </a>
            <h4 className="font-semibold">
              {currentContact?.full_name}
            </h4>
          </div>
          
        </div>
        {/* Buttons on the right side */}
        <div className="flex">
          <button
            className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2"
            aria-label="mark as read"
            onClick={() => setDetailsSidebarOpen(!detailsSidebarOpen)}
          >
            <svg
              className="w-4 h-4 fill-current text-slate-400"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </button>
          {
            messages[messages.length - 1]?.admin_read_message && 
            <button
            className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2"
            aria-label="mark as read"
          >
            <svg
              className="w-4 h-4 fill-current text-indigo-500"
              viewBox="0 0 16 16"
            >
              <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
            </svg>
            </button>
          }
          
          <button
            className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2"
            aria-label="mark as read"
          >
             <BellIcon className="h-6 w-6 text-gray-500" />

          </button>
         
        </div>
      </div> 
  );
}

export default memo(MessagesHeader);
