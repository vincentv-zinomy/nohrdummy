import { InboxMessageTypes } from "@/pages/inbox";
import { FormattedMessages } from "../EditLeadModal";
import MediaViewer from "../MediaViewer";
import moment from "moment";

export interface MessageBodyProps { messages: FormattedMessages[] }

function MessagesBody(props: MessageBodyProps) {
  const { messages } = props
  console.log(messages)
  const dates:any = {}
  return (
    <div className="w-full px-4 sm:px-6 md:px-5 py-6">

      {/* ${isChatLoading ? 'backdrop-blur-md opacity-50' : ''} */}
      <div
        className={`w-full   overflow-y-scroll bg-[#e4dbd4]	 rounded-lg p-4 [&_div]:mb-2   customscroll `}
        style={{ backgroundImage: "url('/whatsappbg.png')",height: "calc(100vh - 176px)" }}>

        {messages.map((x) => {
          let date:any = undefined 
          if(!dates[String(moment.unix(x.timestamp).format("DD/MM/YYYY"))]){
            date = moment.unix(x.timestamp).format("DD/MM/YYYY")
            dates[String(moment.unix(x.timestamp).format("DD/MM/YYYY"))] = 1
          } 
          return (
            <>
              {date && 
                <div className="w-full flex justify-center">
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                    {date}
                  </span>
                </div>
              }
               
              <div className={`  w-fit max-w-[75%]  ${x.role === 'user' && 'ml-auto' }`}>
                <div className={`${x.role === 'user' ? 'bg-white' : 'bg-[#dcf8c7]'} p-2 break-words rounded-b-lg  ${x.role === 'user' ? 'rounded-tl-lg' : 'rounded-tr-lg'}`}>
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
                  {x.content}
                </p>
                <span className="text-gray-800 text-xs">{
                  x.timestamp > 0 ? moment.unix(x.timestamp).format('hh:mm A') : ""
                }</span>
                 </div>
              </div>
              
            </>
          )
        }
        )}


      </div>
    </div>
  );
}

export default MessagesBody;
