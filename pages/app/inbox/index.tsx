import { createContext, useCallback, useEffect, useRef, useState } from "react";

import MessagesBody from "@/components/app-ui/messages/MessagesBody";
import MessagesFooter from "@/components/app-ui/messages/MessagesFooter";
import MessagesHeader from "@/components/app-ui/messages/MessagesHeader";
import MessagesSidebar from "@/components/app-ui/messages/MessagesSidebar";
import { FormattedMessages } from "@/components/app-ui/EditLeadModal";
import MessageDetailsSidebar from "@/components/app-ui/messages/MessageDetailsSidebar";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { useAuth } from "@/components/contexts/AuthContext";
import { ContactTypes, OrgProjectDataTypes } from "@/lib/types/ui";
import { useToast } from "@/components/hooks/useToast";

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
  setCurrentContact: () => { },
  currentContact: null,
  messages: {
    loading: true,
    data: [],
    error: null,
  },
  projects: {
    loading: true,
    data: [],
    error: null,
  },
  contacts: {
    loading: true,
    data: [],
    error: null,
    page: 1,
    noOfPages: 0,
  },
  currentProject: null,
  setContacts: () => { },
  setCurrentProject: () => { },
  setMessages: () => { },
  refreshMessages: () => { },
  msgSidebarOpen: false,
  setMsgSidebarOpen: () => { },
  detailsSidebarOpen: false,
  setDetailsSidebarOpen: () => { },
  openFilter: false,
  setOpenFilter: () => { },
  updateContact: (contact_id: string, contact_data: ContactTypes) => { }
};

export const ContactContext = createContext<{
  setCurrentContact: React.Dispatch<React.SetStateAction<ContactTypes>>;
  currentContact: ContactTypes | null;
  updateContact: (contact_id: string, contact_data: ContactTypes) => void;
  messages: {
    loading: boolean;
    data: FormattedMessages[];
    error: string | null;
  } | null;
  projects: {
    loading: boolean;
    data: OrgProjectDataTypes[];
    error: string | null;
  };
  contacts: {
    loading: boolean;
    data: ContactTypes[];
    error: string | null;
    page: number;
    noOfPages: number;
  };
  currentProject: OrgProjectDataTypes | null;
  setContacts: React.Dispatch<React.SetStateAction<{
    loading: boolean;
    data: ContactTypes[];
    error: string | null;
    page: number;
    noOfPages: number;
  }>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<{
    loading: boolean;
    data: OrgProjectDataTypes[];
    error: string | null;
  }>>;
  setMessages: React.Dispatch<React.SetStateAction<
    {
      loading: boolean;
      data: FormattedMessages[];
      error: string | null;
    }>>;
  refreshMessages: (id: string | null) => void;
  msgSidebarOpen: boolean;
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailsSidebarOpen: boolean;
  setDetailsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}>(defaultContactContextValue);

function index() {
  const { authState } = useAuth();
  const toast = useToast();

  const [projects, setProjects] = useState<{
    loading: boolean;
    data: OrgProjectDataTypes[];
    error: string | null;
  }>({
    loading: true,
    data: [],
    error: null,
  });
  const [contacts, setContacts] = useState<{
    loading: boolean;
    data: ContactTypes[];
    error: string | null;
    page: number;
    noOfPages: number;
  }>({
    loading: true,
    data: [],
    error: null,
    page: 0,
    noOfPages: 0,
  });
  const [messages, setMessages] = useState<{
    loading: boolean;
    data: FormattedMessages[];
    error: string | null;
  }>({
    loading: true,
    data: [],
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
    setContacts({ ...contacts, loading: true, error: null })
    if (currentProject && projects && projects.data && projects.data.length > 0) {
      getContact(currentProject._id);
    } else {
      setContacts({ ...contacts, loading: false, error: 'No Messages' })
    }
  }, [currentProject]);

  useEffect(() => {
    if (currentContact && contacts && contacts.data && contacts.data.length > 0) {
      getMessages(currentContact._id);
    } else {
      setMessages({ ...messages, loading: false, error: 'No Messages' })

    }
  }, [currentContact]);

  const getData = useCallback(async () => {
    try {
      const res = await axiosAPIWithAuth.get("/org-project/all");
      const data = await res.data;
      if (data.length > 0) {

        setProjects({ loading: false, data, error: null });
        setCurrentProject(data[0]);
      }
    } catch (error: any) {
      setProjects({ ...projects, loading: false, error: error.message });
    }
  }, [projects]);

  const updateContact = async (
    contact_id: string,
    lead_data: ContactTypes
  ) => {


    try {

      if (contact_id) {
        console.log(contact_id, lead_data)
        await axiosAPIWithAuth.put(`/contacts/update/${contact_id}`, {
          ...lead_data

        });
        toast.addToast("success", "Contact updated successfully");

        getMessages(contact_id);
      }
      else {
        toast.addToast("error", "Invalid Contact");
      }

    }

    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while adding lead";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }

  }
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

  const getMessages = async (id: string | null) => {
    console.log(messages)
    setMessages({ ...messages, loading: true })
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
                updateContact,
                currentContact,
                messages,
                setMessages,
                refreshMessages: getMessages,
                projects,
                contacts,
                currentProject,
                setCurrentProject,
                setContacts,
                msgSidebarOpen,
                setMsgSidebarOpen,
                detailsSidebarOpen,
                setDetailsSidebarOpen,
                openFilter,
                setOpenFilter
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

      </div>
    </div>
  );
}

export default index;
