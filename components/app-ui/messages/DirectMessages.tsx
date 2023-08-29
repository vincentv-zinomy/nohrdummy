import React, { useContext, useRef } from "react";
import { FormattedMessages } from "../EditLeadModal";
import { ContactContext } from "@/pages/app/inbox";
import Spinner from "@/components/common/Spinner";
import ContactBox, { ContactBoxSkeleton } from "./ContactBox";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

function DirectMessages({
  setMsgSidebarOpen,
  msgSidebarOpen,
}: {
  msgSidebarOpen: boolean;
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const { setCurrentContact, contacts, currentContact, currentProject, setContacts } = useContext(ContactContext)
  const contactsArea = useRef<HTMLDivElement>(null);
  const ContactsPageChange = async () => {
    if (contacts.page !== contacts.noOfPages) {
      const pageNo = contacts.page + 1;

      const res = await axiosAPIWithAuth.get(
        `/contacts/by-org-project/${currentProject && currentProject._id}?page=${pageNo}`
      );
      setContacts({
        ...contacts,
        loading: false,
        data: [...contacts.data, ...res.data.data],
        error: null,
        page: pageNo,
      });
    }
  };

  const handleScroll = (e: any) => {
    if (contactsArea.current) {
      if (
        contactsArea.current.scrollHeight ===
        e.target.scrollTop + e.target.clientHeight
      ) {
        ContactsPageChange();
      }
    }
  };



  return (
    <div
      className="mt-4 w-full  shrink-0 overflow-y-auto customscroll"
      style={{ height: 'calc(100vh - 204px )' }}
      ref={contactsArea}
      onScroll={handleScroll}
    >
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">
        Messages
      </div>
      {
        contacts.loading &&
        <ContactBoxSkeleton number={5} />
      }
      {
        contacts.error === 'No Messages' ?
          <div className="pt-10   text-gray-300 w-full flex flex-col items-center justify-center">
            <Bars3BottomLeftIcon className="w-20" />
            <p>No Conversations </p>
          </div> :
          contacts.error
      }

      <ul className="mb-2 w-full space-y-1 pr-1">
        {contacts.data && contacts.data.map((elem: any, index: number) => {
          return <ContactBox contact={elem} key={`contacts_${elem._id}`} />
        })}

        {
          !contacts.loading && contacts.page !== contacts.noOfPages &&
          <ContactBoxSkeleton number={1} />
        }
      </ul>
    </div>
  );
}

export default DirectMessages;
