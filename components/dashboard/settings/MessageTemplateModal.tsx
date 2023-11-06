import { Dialog, Transition } from "@headlessui/react";
import React, { ChangeEvent, FormEvent, Fragment, useRef, useState } from "react";
// import sanitizeHtml from 'sanitize-html';

type formDataI = {
    template_type:string,
    template_name:string,
    text_content:string
}

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  action:'create' | 'update' | 'delete' | 'view'
  data?:formDataI
};



const MessageTemplateModal = ({ open, setOpen, action }: Props) => {
    const [formData, setFormData] = useState<formDataI>({
        template_type:'',
        template_name:'',
        text_content:''
    });


    const formRef = useRef<HTMLFormElement>(null);
 
    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // Sanitize and replace newline characters with <br /> tags
        // const sanitizedText = sanitizeHtml(e.target.value, {
        //   allowedTags: ['br'],
        //   allowedAttributes: {},
        // });
        setFormData({ ...formData  });
      };

    const handleSubmit = (e: FormEvent) => {
        
    };
  return (
    <form ref={formRef}>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed    inset-0 z-10 overflow-y-auto">
            <div className="flex   min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform   rounded-lg bg-white   text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl  ">
                  <>
                    <div className="flex  min-h-full flex-col justify-center  ">
                      <div className="w-full   px-8 py-4 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                        <h3 className="text-center text-black text-xl font-medium">
                          Add New Message Template
                        </h3>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 h-full gap-5">

                            <div className="space-y-4 w-full">
                            <div>
                                <div className="flex justify-between">
                                <label
                                    htmlFor="{input.key}"
                                    className="block text-sm font-medium text-gray-700 w-full flex items-center justify-between"
                                >
                                    <span className={`   `}>Template Type</span>
                                </label>
                                </div>
                                <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="{input.key}"
                                    className={`block w-full 
                                                rounded-md 
                                                shadow-sm   border-gray-300 focus:border-green-500 focus:ring-green-500
                                                sm:text-sm px-2 py-1.5`}
                                    placeholder="SMS"
                                    required
                                />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                <label
                                    htmlFor="template_name"
                                    className="block text-sm font-medium text-gray-700 w-full flex items-center justify-between"
                                >
                                    <span className={`   `}>Template Name</span>
                                </label>
                                </div>
                                <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="template_name"
                                    className={`block w-full 
                                                rounded-md 
                                                shadow-sm    border-gray-300 focus:border-green-500 focus:ring-green-500
                                                sm:text-sm px-2 py-1.5`}
                                    placeholder="Hello Message"
                                    required
                                />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                <label
                                    htmlFor="text_content"
                                    className="block text-sm font-medium text-gray-700 w-full flex items-center justify-between"
                                >
                                    <span className={`   `}>Text Content</span>
                                </label>
                                </div>
                                <div className="mt-2">
                                <textarea
                                    name="text_content"
                                    id="text_content"
                                    className={`block w-full 
                                                rounded-md 
                                                shadow-sm   border-gray-300 focus:border-green-500 focus:ring-green-500
                                                sm:text-sm px-2 py-1.5`}
                                    placeholder={`Hi 
Jon Doe`}                       rows={7}
                                    required
                                    onChange={handleMessageChange}
                                />
                                </div>
                            </div>
                            </div>
                            <div className="w-full  px-1 h-full flex flex-col gap-2  ">
                                <div
                                    className="block text-sm font-medium text-gray-700 w-full flex items-center justify-between"
                                >
                                    <span className={`   `}>Message Preview</span>
                                </div>
                                <div className="p-3 w-full h-full  bg-green-600/30 block rounded-md ">
                                    {formData && formData.text_content && formData.text_content.length &&
                                    
                                        <div className="w-3/4 bg-white text-sm text-gray-700 rounded-r-lg rounded-b-lg p-2 break-words	">
                                            <div style={{ whiteSpace: 'pre-line' }}>{formData.text_content}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-full pt-6  justify-end gap-6 items-center   inline-flex mt-4">
                          <button
                            className="  px-8 py-2 rounded-full border border-green-800 justify-center items-center gap-2   text-center text-green-900 text-base font-medium "
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="    px-8 py-2 bg-green-600 hover:bg-green-700 rounded-full justify-center items-center gap-2   text-center text-white text-base font-medium"
                            onClick={handleSubmit}
                          >
                            {" "}
                            Add Template
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </form>
  );
};

export default MessageTemplateModal;
