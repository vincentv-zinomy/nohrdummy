import React, { ChangeEvent } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon,DocumentPlusIcon } from "@heroicons/react/24/outline";
import candidateImage from '@/assets/images/0newHR/images/onboard/addCandidateImage.png'
import Image from "next/image";


type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddCandidateModal = ({ open, setOpen }: Props) => {
    const [resumeImage, setResumeImage] = useState<any>('')
    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setResumeImage(e.target.files[0])
        }
    }


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
          <div className="flex h-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" h-fit transform overflow-hidden rounded-lg bg-white   text-left shadow-xl transition-all absolute inset-0 m-auto   w-full  max-w-md  ">
                <>
                  <div className="flex min-h-full flex-col justify-center  ">
                    <div className="w-full   px-8 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                      <h3 className="text-center text-black text-lg font-medium">
                        Add New Candidates
                      </h3>
                    </div>
                    <div className="p-5 space-y-2 ">
                      <label
                        // type="button"
                        htmlFor="candidate_resume"
                        className="w-96 h-40 cursor-pointer relative block w-full rounded-lg border-2 border-dashed border-gray-300 overflow-hidden text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex flex-col items-center justify-center"
                      >
                            {resumeImage === ''
                                ? 
                                   
                                    <>
                                    <div className="flex flex-col items-center    ">
                                        <Image alt="Candidate Resume" className="" src={candidateImage} width={100} height={92}/>
                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                            Upload resume(s) or drag and drop 
                                        </span>
                                        <span className="mt-1 mb-3 block text-xs font-base text-gray-400">
                                            file size limit 10MB Per PDF or Docx 
                                        </span>
                                    </div>
                                </>  
                                : 
                                <img src={URL.createObjectURL(resumeImage)} alt="" className="w-full h-full object-cover " />
                            } 
                            
                      </label>
                      <input type="file" 
                        className="hidden" 
                        id="candidate_resume" 
                        name="candidate_resume" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        />
                      <p className="text-center text-black text-base font-semibold">
                        Or
                      </p>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="country" className="sr-only">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              autoComplete="country"
                              className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            >
                              <option>US</option>
                              <option>CA</option>
                              <option>EU</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            name="phone-number"
                            id="phone-number"
                            className="block w-full rounded-md border-gray-300 pl-16 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="+1 (555) 987-6543"
                          />
                        </div>
                      </div>
                      <div className="w-full    justify-between items-center gap-[59px] inline-flex pt-4">
                        <button
                          className="w-[152px]  px-4 py-3 rounded-full border border-green-800 justify-center items-center gap-2 flex grow shrink basis-0 text-center text-green-900 text-base font-medium"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button className="w-[193px]   px-4 py-3 bg-green-600 rounded-full justify-center items-center gap-2 flex grow shrink basis-0 text-center text-white text-base font-medium">
                          {" "}
                          Add Candidate
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
};

export default AddCandidateModal;
