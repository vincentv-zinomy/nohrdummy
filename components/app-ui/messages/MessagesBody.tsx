import moment from "moment";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ContactContext } from "@/pages/app/inbox";
import {  ChevronDownIcon } from "@heroicons/react/24/solid";

 

function MessagesBody( ) { 
  const dates:any = {}

  const { messages, currentContact, setMessages, contacts} = useContext(ContactContext)
  const messageArea = useRef<HTMLDivElement>(null)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  
  const scrollToBottom = useCallback(() => {
    if (messageArea.current) {
      messageArea.current.scrollTop = messageArea.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    
  }, [messages]);

 

 

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (messageArea.current) {
        if (messageArea.current.scrollHeight !== e.currentTarget.scrollTop + e.currentTarget.clientHeight) {
          setShowScrollToBottom(true);
        } else {
          setShowScrollToBottom(false);
        }
      }
    },
    []
  );
 
  return (
    <div className="w-full px-4 sm:px-6 md:px-5 py-6"   >
      <div
        className={`overflow-y-scroll bg-[#e4dbd4] rounded-lg p-4 [&_div]:mb-2 customscroll relative 
        ${messages.loading && 'blur-sm'} `}
        style={{ backgroundImage: "url('/whatsappbg.png')", height:'calc(100vh - 240px)'}}
        ref={messageArea} 
        onScroll={handleScroll}
        > 
          <div 
            className={`fixed bottom-[100px] left-10 z-20 p-2 bg-white shadow-md rounded-full transition transform cursor-pointer
              ${showScrollToBottom ? 'scale-100' : 'scale-0'}`} onClick={scrollToBottom}>

              <ChevronDownIcon className="h-4 w-4 text-gray-500" />

          </div> 
           
          {messages.data && messages.data.length > 0  &&  messages.data?.map((x:any) => {
            let date:any = undefined 
            if(!dates[String(moment.unix(x.message_timestamp).format("DD/MM/YYYY"))]){
              date = moment.unix(x.message_timestamp).format("DD/MM/YYYY")
              dates[String(moment.unix(x.message_timestamp).format("DD/MM/YYYY"))] = 1
            } 
            return (
              <div key={`chat_key_${x.message_timestamp}`}>
              
                {date && 
                  <div   className="w-full flex justify-center">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                      {date}
                    </span>
                  </div>
                }
                <div  className={`  w-fit max-w-[75%]  ${x.role === 'user' && 'ml-auto' }`}>
                  <div className={`${x.role === 'user' ? 'bg-white' : 'bg-[#dcf8c7]'} p-2 break-words rounded-b-lg  ${x.role === 'user' ? 'rounded-tl-lg' : 'rounded-tr-lg'}`}>
                  <p className="w-full break-all text-sm font-normal	">
                    {x.content}
                  </p>
                  <span className="text-gray-800 text-xs">{
                    x.message_timestamp > 0 ? moment.unix(x.message_timestamp).format('hh:mm A') : ""
                  }</span>
                  </div>
                </div>
                
              </div>
            )
          }
          )}
      </div>
    </div>
  );
}

export default memo(MessagesBody);
