import { FormContext } from "@/pages/onboard";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const JobPostingForm = ({}) => {

    const {currentForm, setCurrentForm, formSteps} = useContext(FormContext)
    const [formData, setFormData] = useState({
        "job-title":'',
        "job-description":'',
        'interview-timezone':'Canada',
        'salary-range':'',
    })

    const router = useRouter()


    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handlePrevious = (e) => {
        e.preventDefault()
        setCurrentForm(formSteps[currentForm.id - 1]) 
    }

    const handleNext = (e) => { 
        e.preventDefault()
        setCurrentForm(formSteps[currentForm.id + 1]) 
    }

  return (
    <form className="h-full flex flex-col justify-between" onSubmit={handleNext}>  
         
            <>
                <div>
                    <h3 className="text-black text-xl font-semibold">Hi , Jone Doe</h3>
                    <div className="text-zinc-500 text-base font-normal mt-2">
                    Lets get started with creating a job profile that you are looking to
                    hire for
                    </div>

                    <div className="pt-4 space-y-6">
                    <div>
                        <label
                        htmlFor="job-title"
                        className="block text-base font-medium text-gray-700"
                        >
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                        <input
                            id="job-title"
                            name="job-title"
                            type="text"
                            autoComplete="job-title"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={formData["job-title"]}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div>
                        <label
                        htmlFor="job-description"
                        className="block text-base font-medium text-gray-700"
                        >
                        Job Description <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                        <textarea
                            id="job-description"
                            name="job-description"
                            type="text"
                            autoComplete="job-description"
                            required
                            rows={4}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={formData["job-description"]}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                     
                    <div>
                        <label
                        htmlFor="interview-timezone"
                        className="block text-sm font-medium text-gray-700"
                        >
                            Interview timezone
                        </label>
                        <select
                            id="interview-timezone"
                            name="interview-timezone"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 pr-10 border text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={formData["interview-timezone"]}
                            onChange={handleChange}
                        >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        </select>
                    </div>
                    <div>
                        <label
                        htmlFor="salary-range"
                        className="block text-base font-medium text-gray-700"
                        >
                        Salary Range
                        </label>
                        <div className="mt-1">
                        <input
                            id="salary-range"
                            name="salary-range"
                            type="number"
                            autoComplete="salary-range"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={formData["salary-range"]}
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="py-10 w-full flex justify-between items-center">
                    <button className="w-[150px] h-[52px] px-6 py-3.5 rounded-[100px] border border-green-800 justify-center items-center gap-2 inline-flex text-center text-green-900 text-base font-medium"
                        onClick={()=>router.back()}
                    >
                        Back
                    </button>
                    <button className={`w-[150px] h-[52px] px-6 py-3.5  rounded-[100px] justify-center items-center gap-2 inline-flex text-center text-base font-medium  ${Object.entries(formData).every((x)=>x[1].length > 0) ? 'bg-green-600 text-white' : 'bg-neutral-200 text-zinc-500 '}  `}
                        // onClick={handleNext}
                    >
                        Next 
                    </button>
                </div> 
            </>  
    </form>
  );
};

export default JobPostingForm;
