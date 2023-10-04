import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ToogleSwitch from "./ToogleSwitch";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function EditModal({ open, setOpen }: Props) {
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
          <div className="flex min-h-full  items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white     text-left shadow-xl transition-all  sm:h-full       ">
                <div>
                  <div
                    role="dialog"
                    id="radix-:r27:"
                    aria-describedby="radix-:r29:"
                    aria-labelledby="radix-:r28:"
                    data-state="open"
                    className="noundo nocopy   z-50 flex w-full flex-col gap-3 p-6  animate-in sm:max-w-lg sm:rounded-lg sm:zoom-in-90 min-w-[80vw]"
                  >
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                      <h2
                        id="radix-:r28:"
                        className="text-lg font-semibold leading-none tracking-tight flex items-center"
                      >
                        <span className="pr-2">CombineDocsChain</span>
                        <div className="inline-flex items-center border rounded-full px-2.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground">
                          ID: CombineDocsChain-0Ozp0
                        </div>
                      </h2>
                      <p
                        id="radix-:r29:"
                        className="text-sm text-muted-foreground"
                      >
                        Load question answering chain.
                      </p>
                    </div>
                    <div className="mt-2 flex flex-col undefined w-full ">
                      <div className="h-full w-full">
                        <div className="flex pb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="w-5"
                          >
                            <path d="M8 21s-4-3-4-9 4-9 4-9"></path>
                            <path d="M16 3s4 3 4 9-4 9-4 9"></path>
                            <line x1="15" x2="9" y1="9" y2="15"></line>
                            <line x1="9" x2="15" y1="9" y2="15"></line>
                          </svg>
                          <span className="edit-node-modal-span">
                            Parameters
                          </span>
                        </div>
                        <div className="edit-node-modal-arrangement">
                          <div className="edit-node-modal-box overflow-hidden">
                            <div className="edit-node-modal-table">
                              <div className="border border-slate-200 rounded-md">
                                <table className="w-full bg-slate-50  overflow-hidden rounded-md p-2  text-sm table-fixed   outline-1">
                                  <thead className="   edit-node-modal-table-header">
                                    <tr className="border-b  [&_th]:p-2 transition-colors  ">
                                      <th className="px-4 align-middle font-medium text-muted-foreground  h-7 text-center">
                                        PARAM
                                      </th>
                                      <th className="align-middle font-medium text-muted-foreground  h-7 p-0 text-center">
                                        VALUE
                                      </th>
                                      <th className="px-4 align-middle font-medium text-muted-foreground  h-7 text-center">
                                        SHOW
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="[&amp;_tr:last-child]:border-0 p-0">
                                    <tr className="border-b transition-colors hover: /50 data-[state=selected]:  h-10">
                                      <td className="align-middle  truncate p-0 text-center text-sm text-foreground sm:px-3">
                                        chain_type
                                      </td>
                                      <td className="align-middle  w-[300px] p-0 text-center text-xs text-foreground">
                                        <div className="mx-auto">
                                          <div className="mt-1">

                                          </div>
                                        </div>
                                      </td>
                                      <td className="align-middle p-0 text-right">
                                        <div className="items-center text-center">
                                          <div className="">
                                            <ToogleSwitch/>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse">
                      <button
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-slate-700 bg-slate-700 text-white hover:bg-slate-700/90 h-10 py-2 px-4 mt-3"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                    <button
                      type="button"
                      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none  "
                      onClick={()=>setOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-4 w-4"
                      >
                        <line x1="18" x2="6" y1="6" y2="18"></line>
                        <line x1="6" x2="18" y1="6" y2="18"></line>
                      </svg>
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
