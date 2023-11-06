import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import NewCustomSelectInput from "@/components/common/NewCustomSelectInput";

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
 


const convertArrayToObj = (inputArray:any) => {

    return inputArray.reduce((acc:any, curr:any) => {
        acc[curr.key] =  ''; 
        return acc;
      }, {});
}

export default function CustomModal({ 
    action, 
    open, 
    setOpen, 
    title, 
    inputs, 
    data,
    button_content,
    content 
}: Props) {
   
    const [formData, setFormData] = useState<any>();
    // console.log(data,'data')
    useEffect(()=>{
        if(!formData){
            if(action === 'create'){
                setFormData(convertArrayToObj(inputs))
            }else if(action === 'edit'){
                setFormData(data)
            }else{
                setFormData(null)
            }
        }
    },[inputs])    
   
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  
    const handleValidation = () => {
        const errors: { [key: string]: string } = {};

        // Check each property in formData for empty string, but only for inputs with required=true
        if( inputs){
            for (const input of inputs) {
              if (input.required && formData[input.key] === "") {
                errors[input.key] = "This field is required";
              }
            }
            setFormErrors(errors);
        }
        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
      };
      
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
        if(action==='delete'){
            // DELETE METHOD HERE
        }else{
            // Perform validation before submitting
            if (handleValidation()) {
                // POST, UPDATE, PATCH METHOD HERE
                setOpen(false);
            } 
        }
      
    };

  return (
    <form    >
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
                                {title}
                            </h3>
                        </div>

                        
                        <div className="p-6 space-y-4">
                            {
                                content &&
                                <p className="text-sm font-medium text-slate-600">
                                    {content}
                                </p>
                            }

                            {/* Inputs */}
                            {inputs && formData && inputs.map((input) => {
                                let error = (formErrors && formErrors[input.key] && formErrors[input.key].trim().length > 0) ? true : false
                                if(error) console.log(input.key) 
                                return (
                                    <div key={`input_keys_${input.key}`}>
                                    {input.input_type === "text" && (
                                        <>
                                        <div>
                                            <div className="flex justify-between">
                                            <label
                                                htmlFor={input.key}
                                                className="block text-base font-medium text-gray-700 w-full flex items-center justify-between"
                                            >
                                                <span className={`${error && 'text-red-500'}`}>
                                                    {input.label}
                                                </span>

                                                <p className="text-red-500 text-sm ">
                                                    {formErrors[input.key]}
                                                </p>
                                            </label>
                                            </div>
                                            <div className="mt-1">
                                            <input
                                                type={input.key==='email' ? 'email' :"text"}
                                                name={input.key}
                                                id={input.key}
                                                className={`block w-full 
                                                rounded-lg 
                                                shadow-sm 
                                                ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
                                                sm:text-base px-4 py-3`}
                                                placeholder={input.placeholder}
                                                required={input.required}
                                                value={formData[input.key]} 
                                                onChange={(e)=>{
                                                    setFormData({
                                                        ...formData, [input.key]:e.target.value}
                                                    )}
                                                }
                                            />
                                            </div>
                                        </div>
                                        </>
                                    )}

                                    {input.input_type === 'phone_number' && (
                                        <>
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
                                className="block w-full rounded-md border-gray-300 pl-16 py-3 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                placeholder="+1 (555) 987-6543"
                                required={input.required}

                                                value={formData[input.key]}
                                                onChange={(e)=>{
                                                    setFormData({
                                                        ...formData, [input.key]:e.target.value}
                                                    )}
                                                }
                                />
                            </div>
                        </div>
                                        </>
                                    )}

                                    {input.input_type === 'select' && 
                                        <>
                                            <label
                                                htmlFor="name"
                                                className="block text-base font-medium text-gray-700 w-full flex items-center justify-between"
                                            >
                                                <span>
                                                    {input.label}
                                                </span>

                                                <p className="text-red-500 text-sm ">
                                                    {formErrors[input.key]}
                                                </p>
                                            </label>
                                            <NewCustomSelectInput 
                                                input={input} 
                                                formData={formData} 
                                                setFormData={setFormData}
                                            />
                                        </>
                                    }
                                    </div>
                                )
                            })}

                        
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
                                {button_content}
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
}
