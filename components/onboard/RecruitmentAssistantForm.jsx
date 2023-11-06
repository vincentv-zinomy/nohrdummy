import { FormContext } from "@/pages/onboard";
import React, { useContext, useState } from "react";

const RecruitmentAssistantForm = ({}) => {

    const {currentForm, setCurrentForm, formSteps} = useContext(FormContext)
    const [formData, setFormData] = useState({
        "assistant-name":'',
        "opening-message":'',
    })

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(currentForm)
        setCurrentForm(formSteps[currentForm.id + 1]) 
    }

    const handlePrevious = (e) => {
        e.preventDefault()
        setCurrentForm(formSteps[currentForm.id - 1]) 
    }

  return (
    <form className="h-full flex flex-col justify-between   " onSubmit={handleSubmit}>  
         
            <>
                <div>
                    <h3 className="text-black text-xl font-semibold">Create Assistant</h3>
                    <div className="text-zinc-500 text-base font-normal mt-2">
                    Lets begin by creating your own recruitment/HR assistant. This is for your virtual assistant, who will interact with the candidates.
                    </div>

                    <div className="pt-4 space-y-6">
                    <div>
                        <label
                        htmlFor="assistant-name"
                        className="block text-base font-medium text-gray-700"
                        >
                            Assistant Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                        <input
                            id="assistant-name"
                            name="assistant-name"
                            type="text"
                            autoComplete="assistant-name"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={formData["assistant-name"]}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div>
                        <label
                        htmlFor="opening-message"
                        className="block text-base font-medium text-gray-700"
                        >
                        Opening Message <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                        <textarea
                            id="opening-message"
                            name="opening-message"
                            type="text"
                            autoComplete="opening-message"
                            required
                            rows={4}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={formData["opening-message"]}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    </div>
                </div>
                <div className="py-10 w-full flex justify-between items-center">
                    <button className="w-[150px] h-[52px] px-6 py-3.5 rounded-[100px] border border-green-800 justify-center items-center gap-2 inline-flex text-center text-green-900 text-base font-medium" 
                        onClick={handlePrevious}
                    >
                        Back
                    </button>
                    <button className={`w-[150px] h-[52px] px-6 py-3.5  rounded-[100px] justify-center items-center gap-2 inline-flex text-center text-base font-medium  ${Object.entries(formData).every((x)=>x[1].length > 0) ? 'bg-green-600 text-white' : 'bg-neutral-200 text-zinc-500 '}  ` }>
                        Next 
                    </button>
                </div> 
            </>  
    </form>
  );
};

export default RecruitmentAssistantForm;
