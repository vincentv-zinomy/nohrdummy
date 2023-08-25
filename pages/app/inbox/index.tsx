import { createContext, useCallback, useEffect, useRef, useState } from "react";

import MessagesBody from "@/components/app-ui/messages/MessagesBody";
import MessagesFooter from "@/components/app-ui/messages/MessagesFooter";
import MessagesHeader from "@/components/app-ui/messages/MessagesHeader";
import MessagesSidebar from "@/components/app-ui/messages/MessagesSidebar";
import { FormattedMessages } from "@/components/app-ui/EditLeadModal";
import MessageDetailsSidebar from "@/components/app-ui/messages/MessageDetailsSidebar";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { useAuth } from "@/components/contexts/AuthContext";

export interface InboxMessageTypes {
  name: string;
  contact_phone_number: string;
  contact_email: string;
  messages: FormattedMessages[];
  social_media_types?: "whatsapp" | "instagram" | "mail";
}

interface props {
  data: any;
}

const defaultContactContextValue = {
  setCurrentContact: () => {},
  currentContact: null,
  messages: null,
  projects: null,
  contacts: null,
};

export const ContactContext = createContext<any>(defaultContactContextValue);

function index() {
  const { authState } = useAuth();

  const [projects, setProjects] = useState<any>({
    loading: true,
    data: null,
    error: null,
  });
  const [contacts, setContacts] = useState({
    loading: true,
    data: null,
    error: null,
    page: 0,
    noOfPages: 0,
  });
  const [messages, setMessages] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const [currentProject, setCurrentProject] = useState<any>(null);
  const [currentContact, setCurrentContact] = useState<any>(null);


  useEffect(() => {
    if (authState.isAuthenticated) {
      getData();
    }
  }, [authState]);

  useEffect(() => {
    if (currentProject) {
      getContact(currentProject._id);
    }
  }, [currentProject]);

  useEffect(() => { 
    if (currentContact) {
      getMessages(currentContact._id);
    }
  }, [currentContact]);

  const getData = useCallback(async () => {
    try {
      const res = await axiosAPIWithAuth.get("/org-project/all");
      const data = await res.data;
      setProjects({ loading: false, data, error: null });
      setCurrentProject(data[0]);
    } catch (error: any) {
      setProjects({ ...projects, loading: false, error: error.message });
    }
  }, [projects]);

  const getContact = useCallback(
    async (id: string) => {
      try {
        const { data } = await axiosAPIWithAuth.get(
          `/contacts/by-org-project/${id}`
        );


        const { limit, total, page } = data;
        setContacts({
          loading: false,
          data: data.data,
          error: null,
          page,
          noOfPages: Math.ceil(total / limit),
        });
        setCurrentContact(data.data[0]);
      } catch (error: any) {
        setContacts({ ...contacts, error: error.message, loading: false });
      }
    },
    [contacts]
  );

  const getMessages =  async (id: string) => {
    setMessages({...messages,loading:true})
      try {
        const res = await axiosAPIWithAuth.get(
          `/contacts/chat-history/by-user/${id}`
        );
        setMessages({ loading: false, data: res.data, error: null });

      } catch (error: any) {

        setMessages({ ...messages, error: error.message, loading: false });

      }
    }

    console.log(projects, 'projects')
  

  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);
  const [detailsSidebarOpen, setDetailsSidebarOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false)

  return (
    <div className="flex    ">
      {/* Content area */}
      <div className="relative h-full flex flex-col flex-1   overflow-x-hidden ">
        <main className="h-full">
          <div className="relative h-full flex   ">
            <ContactContext.Provider
              value={{
                setCurrentContact,
                currentContact,
                messages,
                setMessages,
                projects,
                contacts,
                currentProject,
                setCurrentProject,
                setContacts,
                msgSidebarOpen, setMsgSidebarOpen,
                detailsSidebarOpen, setDetailsSidebarOpen,
                openFilter, setOpenFilter
              }}
            >
              {/* Messages sidebar */}
              <MessagesSidebar
                projects={projects}
                msgSidebarOpen={msgSidebarOpen}
                setMsgSidebarOpen={setMsgSidebarOpen}
              />

              {/* Messages body */}
              <div
                className={`w-full h-full   flex flex-col justify-between md:translate-x-0 transform transition-transform duration-300 ease-in-out translate-x-0 border-x`}
              >
                <MessagesHeader
                  msgSidebarOpen={msgSidebarOpen}
                  setMsgSidebarOpen={setMsgSidebarOpen}
                  setDetailsSidebarOpen={setDetailsSidebarOpen}
                  detailsSidebarOpen={detailsSidebarOpen}
                />
                <MessagesBody />
                <MessagesFooter />
              </div>
              <MessageDetailsSidebar
                detailsSidebarOpen={detailsSidebarOpen}
                setDetailsSidebarOpen={setDetailsSidebarOpen}
              />
            </ContactContext.Provider>
          </div>
        </main>
          {/* <div className="absolute w-72 h-72 inset-0 bg-white">

          </div> */}
      </div>
    </div>
  );
}

export default index;
