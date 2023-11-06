import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CustomInputText from "@/components/common/CustomInputText";
import CustomInputEmail from "@/components/common/CustomInputEmail";
import CustomSelectInput from "@/components/common/CustomSelectInput";

export type InputI = {
  key: string;
  label: string;
  input_type: "text" | "text-area" | "number" | "select" | "phone_number";
  placeholder?: string;
  options?: {label:string, value:string}[];
  required?:boolean
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  inputs?: InputI[];
  data?:any
  action: 'edit' | 'create' | 'delete';
  button_content:string
  content?:string
};
 


 

export default function EditTeamMemberModal({ 
    
    open, 
    setOpen, 
    data
}: any) {
   
    const [formData, setFormData] = useState<any>({name:'', email:'',role:''});
    console.log(data, 'data')

    useEffect(()=>{
        setFormData(data)
    },[data])

    const [formError, setFormError] = useState({
        name:false,
        email:false,
        role:false
    })
  
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
      
    console.log(formError,'error form')
    const handleSubmit = (e: FormEvent) => {
        console.log(formData,'formData')
        for (const key in formData) {
            // console.log(formData[key])
            if(formData[key] === ''){
                setFormError({...formError, [key]:true})
            }
        }


    };

  return (
    <div    >
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
                <Dialog.Panel className="relative transform   rounded-lg bg-white   text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md  ">
                    <>
                    <div className="flex min-h-full flex-col justify-center  ">
                        
                        {/* Title */}
                        <div className="w-full   px-8 py-4 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                            <h3 className="text-center text-black text-xl font-medium">
                                Add Team Member
                            </h3>
                        </div>

                        {formData && 
                        <div className="p-6 space-y-4">
                            {/* {
                                content &&
                                <p className="text-sm font-medium text-slate-600">
                                    {content}
                                </p>
                            } */}
                            {formData && formData.name &&
                            <CustomInputText
                                label={'Name'}
                                name="name"
                                value={formData.name}
                                handleChange={handleChange}
                                placeholder="Enter your name..."
                                required={true}
                                error={formError.name}
                            />
                            }
                            {formData && formData.email &&
                            <CustomInputEmail
                                label={'Email'}
                                name="email"
                                value={formData.email}
                                handleChange={handleChange}
                                placeholder="Enter your email..."
                                required={true}
                            />
                            }
                            {/* <CustomSelectInput
                                label={'Role'}
                                options={[
                                    { 
                                        id: 1, 
                                        name: 'Leslie Alexander',value:'Leslie Alexander' 
                                    },
                                    {
                                        id: 0, 
                                        name:'Select Role', value:''
                                    }
                                ]}
                                name='role'
                                state={formData}
                                setState={setFormData}
                            /> */}
                        
                            {/* Buttons */}
                            <div className="w-full pt-6  justify-between items-center gap-[59px] inline-flex mt-4">
                                <button
                                className="w-[152px] h-[52px] px-6 py-3.5 rounded-full border border-green-800 justify-center items-center gap-2 flex grow shrink basis-0 text-center text-green-900 text-base font-medium "
                                onClick={() => setOpen(false)}
                                >
                                Cancel
                                </button>
                                <button
                                
                                className="w-[193px] h-[52px] px-6 py-3.5 bg-green-600 hover:bg-green-700 rounded-full justify-center items-center gap-2 flex grow shrink basis-0 text-center text-white text-base font-medium"
                                    onClick={handleSubmit}
                                >
                                {" "}
                                Edit Member
                                </button>
                            </div>
                        </div>
                        }
                    </div>
                    </>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    </div>
  );
}
