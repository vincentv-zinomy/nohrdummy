import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { ContactContext } from "@/pages/app/inbox";
import {
  CheckIcon,
  ChevronDoubleDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import StageBadge from "./StageBadge";
import StatusBadge from "./StatusBadge";

type Props = {
  contact: any;
};

const ContactBox = ({ contact }: Props) => {
  const { currentContact, setCurrentContact, setMsgSidebarOpen } =
    useContext(ContactContext);

  const [lastMessage, setLastMessage] = useState<any>(null);
  const [chanelData, setChanelData] = useState<string[]>([]);

  useEffect(() => {
    getMessage(contact._id);
  }, [contact]);

  const getMessage = async (id: string) => {
    const res = await axiosAPIWithAuth.get(
      `/contacts/chat-history/by-user/${id}`
    );

    const contactmessages = res.data;
    const data = Array.from(
      new Set([...contactmessages.map((msg: any) => msg.channel_type)])
    );
    setChanelData(data);
    setLastMessage(contactmessages[contactmessages.length - 1]);
  };

  return (
    <li
      className={`${contact._id === currentContact._id
          ? "bg-gray-200 hover:bg-gray-300"
          : "hover:bg-gray-100"
        }  rounded-md w-full  relative h-fit  `}
    >
      <button
        className=" w-full p-2 rounded-md"
        onClick={() => {
          setMsgSidebarOpen(false);
          setCurrentContact(contact);
        }}
      >
        <div className="w-full flex items-center  gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-500 shrink-0 flex items-center justify-center relative">
            <span className="uppercase text-white">{contact.full_name[0]}</span>
          </div>
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center truncate">
                <div className="truncate">
                  <span className="text-sm font-medium text-slate-800">
                    {contact.full_name &&
                      (contact.full_name.length > 15
                        ? `${contact.full_name.substring(0, 15)} ...`
                        : contact.full_name)}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-600 flex items-center gap-2 ">
                {lastMessage &&
                  moment.unix(lastMessage.timestamp).format("hh:mm A")}
              </span>
            </div>
            <div className="text-xs flex justify-between items-center text-gray-400 mt-1">
              <div className="flex items-center gap-1">
                {lastMessage?.admin_read_message && (
                  <CheckIcon className="w-4" />
                )}
                {lastMessage &&
                  (lastMessage.content.length > 25
                    ? `${lastMessage.content.substring(0, 25)} ...`
                    : lastMessage.content)}
              </div>
              {chanelData.map((x) => {
                return (
                  <div className="flex" key={`chanel_data_key_${x}`}>
                    {x === "WHATSAPP" && (
                      <Image
                        alt=""
                        width={20}
                        height={20}
                        src={"/whatsapp_circle_icon.png"}
                      />
                    )}
                    {x === "EMAIL" && (
                      <Image
                        alt=""
                        width={20}
                        height={20}
                        src={"/gmail_circle_icon.png"}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full pt-2 flex flex-row-reverse	 items-center justify-between">
          <StatusBadge status={contact.status} />
          <StageBadge stage={contact.contact_stage} />
        </div>
      </button>
    </li>
  );
};

export default ContactBox;

interface skeletonProps {
  number: number;
}

export const ContactBoxSkeleton = ({ number }: skeletonProps) => {
  return (
    <ul className="space-y-1 ">
      {[...Array(number)].map((x: number, i: number) => {
        return (
          <li
            className="w-full  p-2 rounded-md"
            key={`contact_skeleton_${i}`}
          >
            <div className="h-fit flex items-center gap-4 w-full">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-300 shrink-0 flex items-center justify-center skelton-loading  "></div>
              <div className="w-full">
                <div className="text-sm w-full bg-slate-300 rounded-sm h-[14px] skelton-loading" />
                <div className="text-sm w-3/4 bg-slate-300 h-[12px] mt-1 rounded-sm skelton-loading" />
              </div>
            </div>
            <div className="w-full pt-2 flex flex-row-reverse	 items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-slate-300 px-2.5 py-0.5 text-xs font-medium text-slate-300 skelton-loading">
                <svg
                  className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                Status
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-300 px-2.5 py-0.5 text-xs font-medium text-slate-300 skelton-loading">
                Stage 1
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
