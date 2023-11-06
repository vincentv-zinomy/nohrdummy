import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsCheck, BsChevronDown } from 'react-icons/bs'

export default function DeleteModal({ open, setOpen }: any) {
  return (
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white   text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md  ">
                <>
                  <div className="flex min-h-full flex-col justify-center  ">
                    <div className="w-full   px-8 py-4 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                      <h3 className="text-center text-black text-xl font-medium">
                        Delete Job Posts
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="text-zinc-500 text-base font-semibold leading-[21px] tracking-tight">Are you sure you want to delete this job post, you will not<br/>be able to retrive job post after deletion</div>

                        <div className="w-full pt-6  justify-between items-center gap-[59px] inline-flex mt-4">
                            <button className="w-[152px] h-[52px] px-6 py-3.5 rounded-full border border-green-800 justify-center items-center gap-2 flex grow shrink basis-0 text-center text-green-900 text-base font-medium" onClick={()=>setOpen(false)}>
                                 Cancel 
                            </button>
                            <button className="w-[193px] h-[52px] px-6 py-3.5 bg-green-600 rounded-full justify-center items-center gap-2 flex grow shrink basis-0 text-center text-white text-base font-medium"> Yes Delete
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
  );
}
