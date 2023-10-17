import React, { UIEvent, memo, useContext, useEffect, useRef, useState } from "react";
import DirectMessages from "./DirectMessages";
import ProjectsLists from "./ProjectsLists";
import Spinner from "@/components/common/Spinner";
import { ContactContext } from "@/pages/app/inbox";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/react/24/outline";

function MessagesSidebar({
  projects,
  msgSidebarOpen,
  setMsgSidebarOpen,
}: {
  projects: any;
  msgSidebarOpen: boolean;
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const { contacts, setContacts, currentProject, openFilter, setOpenFilter } = useContext(ContactContext); 
  const filterRef = useRef<any>()

  useEffect(()=>{
    const handleClickOutside = (e:any) => {
      if(filterRef.current && !filterRef.current.contains(e.target)){
        setOpenFilter(false)
      }
    }

    document.addEventListener('click',handleClickOutside)

    return ( )=>{
      document.removeEventListener('click',handleClickOutside)
    }

  },[])

  return (
    <div
      id="messages-sidebar"
      className={`  w-full  md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out translate-x-full relative`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className=" bg-white  shrink-0   md:w-72 xl:w-80 h-full ">
        {/* #Marketing group */}

        <div>
          
          <div
            className="h-full flex flex-col"
            style={{ height: "calc(100vh - 129px)" }} 
          >
            <ProjectsLists projects={projects} />
            {/* Group body */}
            <div className=" px-2 mt-20 flex flex-col relative">
              {/* Search form */}
              <div className="flex justify-between pr-2 items-center gap-3">
                <form className="relative w-full">
                  <label htmlFor="msg-search" className="sr-only">
                    Search
                  </label>
                  <input
                    id="msg-search"
                    className="form-input w-full pl-9 focus:border-slate-300 rounded-md"
                    type="search"
                    placeholder="Search…"
                  />
                  <button
                    className="absolute inset-0 right-auto group"
                    type="submit"
                    aria-label="Search"
                  >
                    <svg
                      className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                      <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                    </svg>
                  </button>
                </form>
                <div className="relative"  ref={filterRef} >
                  <button onClick={()=>setOpenFilter(!openFilter)}>
                   <AdjustmentsHorizontalIcon  className="w-6 h-6 "/> 
                  </button>
                  {
                    openFilter && 
                    <div className="w-44 h-fit space-y-1 absolute drop-shadow-md rounded-md top-10 border bg-white right-1 px-3 py-3">
                        <div className="flex text-sm items-center gap-2 ">
                          <input type="checkbox" id="checkbox_id" className=" active:ring-1 rounded-sm active:ring-slate-200"  />
                          <label htmlFor="checkbox_id">filter</label>
                        </div>
                    </div>
                  }
                </div>
              </div>
              {/* Direct messages */}
              
              <DirectMessages
                msgSidebarOpen={msgSidebarOpen}
                setMsgSidebarOpen={setMsgSidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesSidebar;
