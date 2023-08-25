import Spinner from '@/components/common/Spinner';
import { useToast } from '@/components/hooks/useToast';
import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import { ContactContext } from '@/pages/app/inbox';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import React, { memo, useContext, useState } from 'react';

function MessagesFooter() {

  const toast = useToast()
  const {currentContact} = useContext(ContactContext)
  const [msgBoxValue, setMsgBoxValue] = useState(""); // New error state
  const [isChatLoading, setIsChatLoading] = useState(false)

  const sendMessage = async () => {
    setIsChatLoading(true);
    try {

        const sendMessage = await axiosAPIWithAuth.post(`/contacts/chat-manually-with-contact/${currentContact._id}`, {
            message: msgBoxValue
        });
        toast.addToast("success", "Message sent to user...");
        setMsgBoxValue("");
    } catch (err: any) {
        console.log(err);
        let errorMsg = "Something went wrong while starting conversation";

        // Check if err object has response data and it has a message property
        if (err.response && err.response.data && err.response.data.message) {
            errorMsg = err.response.data.message;
        }

        toast.addToast("error", errorMsg);
    }
    setIsChatLoading(false);
}

  return (
    <div className="w-full bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        {/* Plus button */}
        <button className="shrink-0 text-slate-400 hover:text-slate-500 mr-3">
          <span className="sr-only">Add</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
          </svg>
        </button>
        {/* Message input */}
        <form className="grow flex">
          <div className="grow mr-3">
            <label htmlFor="message-input" className="sr-only">Type a message</label>
            <input 
              id="message-input" className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300 rounded-md" type="text" 
              placeholder="Aa" 
            />
          </div>
          <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap px-4 py-2 rounded-md flex gap-2 items-center" onClick={sendMessage}>
            {isChatLoading ? <Spinner color='white'/> : 
            <>
              <span>
                Send 
              </span>
              <ArrowRightIcon className="h-5 w-5 text-white" />
            </>
            }
            
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(MessagesFooter);
