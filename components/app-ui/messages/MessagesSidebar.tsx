import React, { UIEvent, memo, useContext, useRef, useState } from "react"; 
import DirectMessages from "./DirectMessages"; 
import ProjectsLists from "./ProjectsLists";
import Spinner from "@/components/common/Spinner";
import { ContactContext } from "@/pages/app/inbox";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";

function MessagesSidebar({ 
  projects, 
  msgSidebarOpen,
  setMsgSidebarOpen,
}: {
  projects: any; 
  msgSidebarOpen: boolean;
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const contactsArea = useRef<HTMLDivElement>(null)
  
  const {contacts, setContacts, currentProject} = useContext(ContactContext)

  const ContactsPageChange = async() => {
    if(contacts.page !== contacts.noOfPages){
      const pageNo = contacts.page + 1
  
      const res = await axiosAPIWithAuth.get(`/contacts/by-org-project/${currentProject._id}?page=${pageNo}`);
      setContacts({
        ...contacts,
        loading:false, 
        data:[...contacts.data,...res.data.data], 
        error:null, 
        page:pageNo
      })
    }
  }

  const handleScroll = (e:any) => {
    if(contactsArea.current){
      if( contactsArea.current.scrollHeight === (e.target.scrollTop + e.target.clientHeight)){  
        ContactsPageChange()
      } 
    }
  }

  return (
    <div
      id="messages-sidebar"
      className={`  w-full  md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out translate-x-full `}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className=" bg-white  shrink-0   md:w-72 xl:w-80 h-full ">
        {/* #Marketing group */}

        <div>
          <div className="border-b px-4">
            <div className="w-full flex items-center justify-between h-16 ">
              <h4 className="text-lg font-semibold">Chats</h4>
            </div>
          </div>
          <div 
            className="h-full  overflow-y-scroll customscroll" 
            style={{ height:'calc(100vh - 129px)'}}
            ref={contactsArea}
            onScroll={handleScroll}
          >

          
          <ProjectsLists projects={projects} />
          {/* Group body */}
          <div className="px-5 py-4 flex flex-col">
            {/* Search form */}

            <form className="relative">
              <label htmlFor="msg-search" className="sr-only">
                Search
              </label>
              <input
                id="msg-search"
                className="form-input w-full pl-9 focus:border-slate-300"
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
            {/* Direct messages */}

            <DirectMessages
              msgSidebarOpen={msgSidebarOpen}
              setMsgSidebarOpen={setMsgSidebarOpen}
            />
            {
              !contacts.loading && contacts.page !== contacts.noOfPages &&
              <div className="w-full flex justify-center">
                <Spinner color="text-grey-100"/>
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MessagesSidebar);
