import React from "react";
import { FormattedMessages } from "../EditLeadModal";
import { InboxMessageTypes } from "@/pages/inbox";

function DirectMessages({
  messages,
  setMsgSidebarOpen,
  msgSidebarOpen,
}: {
  messages: InboxMessageTypes[];
  msgSidebarOpen: boolean;
  setMsgSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="mt-4 overflow-y-scroll customscroll">
      <div className="text-xs font-semibold text-slate-400 uppercase mb-3">
        Messages
      </div>
      <ul className="mb-6   customscroll">
        {messages.map((elem, index) => {
          const message = String(elem.messages[elem.messages.length - 1].content)  ;
          console.log(elem.social_media_types, 'elem')
          return (
            <li className="  hover:bg-blue-100 rounded-md w-full">
              <button
                className="flex items-center gap-4 w-full p-2 rounded-md "
                onClick={() => setMsgSidebarOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-slate-500 shrink-0 flex items-center justify-center">
                  <span className="uppercase text-white">{elem.name[0]}</span>
                </div>
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center truncate">
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">
                          {elem.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center ml-2">
                      {elem.name === "test 1" ? (
                        <div className="text-xs flex items-center justify-center   font-medium bg-indigo-400 text-white rounded-full text-center leading-5 shrink-0 h-5 w-5">
                          2
                        </div>
                      ) : (
                        <div className="flex items-center px-1.5 ">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-slate-400"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs flex justify-between items-center text-gray-400 mt-1">
                    <div>
                      {message.length > 30 ? `${message.substring(0, 30)} ...` :message }
                    </div>
                    <div className="w-5 h-5 oveflow-hidden rounded-full">
                      {elem.social_media_types === 'whatsapp' && 
                        <img src={`/WhatsApp.svg.webp`} alt="" className="w-full h-full object-contain rounded-full" />
                      }
                      {elem.social_media_types === 'instagram' && 
                        <img src={`/Instagram_logo_2022.svg.png`} alt="" className="w-full h-full object-contain rounded-full" />
                      }
                       {elem.social_media_types === 'mail' && 
                        <img src={`/Gmail_icon_(2020).svg.png`} alt="" className="w-full h-full object-contain rounded-full" />
                      }
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DirectMessages;
