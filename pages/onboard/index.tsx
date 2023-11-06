import { Fragment, createContext, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
 
import JobPostingForm from  '@/components/onboard/JobPostingForm';
import RecruitmentAssistantForm from "@/components/onboard/RecruitmentAssistantForm";
import { CheckIcon, XMarkIcon} from '@heroicons/react/24/solid'
import CompantDetailForm from "@/components/onboard/CompanyDetailForm";
import CalenderInterviewersForm from "@/components/onboard/CalenderInterviewersForm";
import AddCandidatesForm from "@/components/onboard/AddCandidatesForm"

 
export interface formStepI {
    id:number,
    title:string,
    description:string
}

const formSteps:formStepI[] = [
    {
        id:0,
        title:'job Post',
        description:'Creating the job profile'
    },
    {
        id:1,
        title:'Recruitment Assistant',
        description:'Creating your own assistant'
    },
    {
        id:2,
        title:'Company Detail',
        description:'Filled company details' 
    },
    {
        id:3,
        title:'Add Calendar & Interviewers',
        description:`select host calender & invite interviewers` 
    },
    {
        id:4,
        title:'Candidates',
        description:'add candidates and start conversation'
    }
]


export type defaultValue = { 
    currentForm: formStepI;
    setCurrentForm:(c: formStepI) => void;
    formSteps:formStepI[]
}

export const FormContext = createContext<defaultValue>({ 
    currentForm: formSteps[0],
    setCurrentForm:() => {},
    formSteps

})
 
export default function OnBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentForm,setCurrentForm] = useState(formSteps[0])

  return (
    <>
      <div className="flex h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {/* {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))} */}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            Whitney Francis
                          </p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-96 flex-col m-4 rounded-lg overflow-hidden bg-gradient-to-l  from-lime-700 to-yellow-100 ">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col    bg-white/70  relative p-6">

              <h3 className="text-center text-zinc-900 text-3xl font-extrabold absolute top-6 left-6">
                NoHR.ai
              </h3>
                        
              <div className="mt-16 flex flex-col justify-between h-full">
                <div className="w-full   flex-col justify-start items-start gap-8 inline-flex">
                    {formSteps.map((x, i)=>(
                        <div className="justify-start items-center gap-2 inline-flex" key={`form-steps-key-${x.id}`}>
                        <div className="w-10 self-stretch px-[7px] justify-center items-start gap-2.5 flex relative">
                            <div className={`w-8 h-8 shrink-0 relative rounded-full border ${currentForm.id === x.id ? 'border-green-900 text-green-900' : 'border-green-900/50 text-green-900/50'}  flex items-center justify-center  ${currentForm.id > x.id &&  'bg-green-900'} `}>

                               {currentForm.id > x.id ? <CheckIcon className="w-6 h-6 text-white"/> : x.id + 1 }  

                            </div>
                            {i!==(formSteps.length-1) 
                                &&
                                <div className={`absolute -bottom-[32px] ${currentForm.id === x.id || currentForm.id > x.id ? 'stroke-green-900' : 'stroke-green-900/50'} stroke-green-900`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="46">
                                        <line x1="1" y1="0" x2="1" y2="200" stroke={``}strokeWidth="1" />
                                    </svg>

                                </div>
                            }
                        </div>
                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                          <div className={`${currentForm.id === x.id || currentForm.id > x.id ? 'text-green-900' : 'text-green-900/50'}   text-base font-semibold`}>
                            {x.title}
                          </div>
                          <div className="text-gray-500 text-sm font-normal">
                            {x.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  
                   
                </div> 
                <div>
                    <div className="text-start text-black text-base font-semibold">Having trouble?</div>
                        <div className="text-zinc-700 text-sm font-normal mt-1">Feel Free to chat us and we wil always<br/>help you through the process</div>
                        <button className="w-[101px] h-[39.33px] px-[15px] py-[9px] rounded-[100px] border border-green-800 justify-start items-start gap-[11px] inline-flex mt-3 font-semibold flex items-center justify-center">
                             Chat
                        </button>
                    </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
              {/* Start main area*/}
              <div className=" h-full inset-0 py-8 px-4 sm:px-6 lg:px-8">
                <div className="h-full rounded-lg   " >
                  <FormContext.Provider value={{currentForm, formSteps, setCurrentForm}}>
                    {
                      currentForm.id === 0 && 
                      <JobPostingForm />
                    }
                    {
                      currentForm.id === 1 && 
                      <RecruitmentAssistantForm/>
                    }
                    {
                      currentForm.id === 2 &&
                      <CompantDetailForm/>
                    }

                    {
                      currentForm.id === 3 &&
                      <CalenderInterviewersForm/>
                    }
                    {
                      currentForm.id === 4 &&
                      <AddCandidatesForm/>
                    }
                    </FormContext.Provider>
                </div>
                
              </div>
              {/* End main area */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
