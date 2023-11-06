import { useState } from "react";
import { useToast } from "../hooks/useToast";

import Spinner from "../common/Spinner";

interface CommonDialogProps {
    show: boolean;
    setShow: (show: boolean) => void;
}
function CommonDialog({
    show,
    setShow,
}: CommonDialogProps) {

    const [isSubmitting, setIsSubmitting] = useState(false); // New state
    const [error, setError] = useState(""); // New error state




    const toast = useToast();


    // Add error message display in the modal
    const errorMessage = error && (
        <p className="text-red-500">{error}</p>
    );

    return (
        <div >
            {
                show && <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto max-w-full w-1/2">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Dialog Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShow(false)}
                                    >
                                        <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>

                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <div className="mt-5 sm:mt-6">
                                        {errorMessage}
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="w-1/2 m-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => setShow(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="w-1/2 m-2 inline-flex 
                      justify-center w-full rounded-md 
                      border border-transparent shadow-sm px-4 py-2 bg-indigo-600
                       text-base font-medium text-white 
                       hover:bg-indigo-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500 sm:text-sm
                       disabled:opacity-50
                       disabled:cursor-not-allowed
                       "
                                                onClick={() => { setShow(false) }}
                                                disabled={isSubmitting}
                                            >
                                                {
                                                    isSubmitting && <Spinner color='text-white' />
                                                }
                                                Finish
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }


        </div>
    );
}

export default CommonDialog;