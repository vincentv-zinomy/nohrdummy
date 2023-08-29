import moment from "moment";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ContactContext } from "@/pages/app/inbox";
import { ChatBubbleBottomCenterIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import MediaViewer from "../MediaViewer";
import { FormattedMessages } from "../EditLeadModal";
import { classNames } from "@/lib/common";



function MessagesBody() {
  const dates: any = {}

  const { messages, currentContact, setMessages, contacts } = useContext(ContactContext)
  const messageArea = useRef<HTMLDivElement>(null)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)


  const scrollToBottom = useCallback(() => {
    if (messageArea.current) {
      messageArea.current.scrollTop = messageArea.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log(messages, 'messages')

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
        className={`overflow-y-scroll  bg-[#e4dbd4] rounded-lg p-4 [&_div]:mb-2 customscroll relative 
        ${messages && messages.loading && 'blur-sm'} `}
        style={{ backgroundImage: `${messages && messages.error === 'No Messages' ? '' : "url('/whatsappbg.png')"} `, height: 'calc(100vh - 240px)' }}
        ref={messageArea}
        onScroll={handleScroll}
      >
        <div
          className={`fixed bottom-[100px] left-10 z-20 p-2 bg-white shadow-md rounded-full transition transform cursor-pointer
              ${showScrollToBottom ? 'scale-100' : 'scale-0'}`} onClick={scrollToBottom}>

          <ChevronDownIcon className="h-4 w-4 text-gray-500" />

        </div>
        {
          messages && messages.error === 'No Messages' ?
            <div className="absolute inset-0 m-auto text-gray-300  flex flex-col items-center justify-center">
              <Bars3BottomLeftIcon className="w-20" />
              <p>No Messages </p>
            </div> :
            messages && messages.error
        }
        {messages && messages.data && messages.data.length > 0 && messages.data.map((x: FormattedMessages, ind: number) => {
          let date: any = undefined
          if (!dates[String(moment.unix(x.timestamp).format("DD/MM/YYYY"))]) {
            date = moment.unix(x.timestamp).format("DD/MM/YYYY")
            dates[String(moment.unix(x.timestamp).format("DD/MM/YYYY"))] = 1
          }
          return (
            <div key={`chat_key_${x._id}_${ind}`}>

              {date &&
                <div className="w-full flex justify-center">
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                    {date}
                  </span>
                </div>
              }
              <div className={`  w-fit max-w-[75%]  ${x.role === 'user' && 'ml-auto'}`}>
                <div className={
                  classNames(
                    'p-2 break-words rounded-b-lg ',
                    x.role === 'user' ? 'bg-[#dcf8c7] rounded-tr-lg' : 'bg-white rounded-tl-lg',
                    x.role === 'user' ? 'rounded-bl-lg' : 'rounded-br-lg',
                  )}>
                  {
                    (x.url !== null && x.url !== "") && (
                      <MediaViewer
                        url={x.url}
                        mime_type={x.mime_type}
                        _id={x._id}
                        timestamp={x.timestamp}
                      />
                    )
                  }
                  <p className="w-full break-all text-sm font-normal	">
                    {x.content ? x.content : ""}
                  </p>
                  <span className="text-gray-800 text-xs">{
                    x.timestamp > 0 ? moment.unix(x.timestamp).format('hh:mm A') : ""
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
