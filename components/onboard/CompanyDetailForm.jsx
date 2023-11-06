import React, { useContext, useState } from "react";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { FormContext } from "@/pages/onboard";


 
const CompantDetailForm = ({}) => {
    const { currentForm, setCurrentForm, formSteps } = useContext(FormContext);
    const [companyImage, setCompanyImage] = useState('')
    const [formData, setFormData] = useState({
        "comapany-name": "",
        "company-description": "",
        "company-Description": "Canada",
        "company-website": "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        
        setCompanyImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setCurrentForm(formSteps[currentForm.id + 1]);
    };

    const handlePrevious = () => {
      setCurrentForm(formSteps[currentForm.id - 1])
  }

  return (
    <form
      className="h-full flex flex-col justify-between   "
      onSubmit={handleSubmit}
    >
      <>
        <div>
          <h3 className="text-black text-xl font-semibold">
            Provide Your Company Details
          </h3>
          <div className="text-zinc-500 text-base font-normal mt-2">
            Lets add some details about your company. Remember, more information
            you provide, better will be your assistant’s answers to the
            candidates’ queries.
          </div>

          <div className="pt-4 space-y-6">

            <div>
              <label
                htmlFor="company-photo"
                className="block text-base font-medium text-gray-700 w-fit"
              >
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer relative ">
                    <span className="p-0.5 rounded-full  flex items-center justify-center absolute -bottom-0 bg-green-600 -right-0"><PlusSmallIcon class="h-5 w-5 text-white " /></span>
                    {companyImage === '' ? 
                    <>
                        
                        <BuildingOfficeIcon class="h-10 w-10 text-gray-500" />
                    </> 
                    : 
                    <img src={URL.createObjectURL(companyImage)} alt="" className="w-full h-full object-cover rounded-full" />
                    }
                    
                </div>
              </label>
              <div className="mt-1">
                <input type="file" 
                    className="hidden" 
                    id="company-photo" 
                    name="company-photo" 
                    accept="image/*" 
                    onChange={handleImageChange}
                />
              </div>
            </div>
            
            <div>
              <label
                htmlFor="company-name"
                className="block text-base font-medium text-gray-700"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="company-name"
                  name="company-name"
                  type="text"
                  autoComplete="company-name"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  value={formData["company-name"]}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ompany-description"
                className="block text-base font-medium text-gray-700"
              >
                Company Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="company-description"
                  name="company-description"
                  type="text"
                  autoComplete="company-description"
                  rows={4}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  value={formData["company-description"]}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company-website"
                className="block text-base font-medium text-gray-700"
              >
                Company Website <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="company-website"
                  name="company-website"
                  type="text"
                  autoComplete="company-website"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  value={formData["company-website"]}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
        </div>
        <div className="py-10 w-full flex justify-between items-center">
          <button className="w-[150px] h-[52px] px-6 py-3.5 rounded-[100px] border border-green-800 justify-center items-center gap-2 inline-flex text-center text-green-900 text-base font-medium"
          onClick={handlePrevious}>
            Back
          </button>
          <button
            className={`w-[150px] h-[52px] px-6 py-3.5  rounded-[100px] justify-center items-center gap-2 inline-flex text-center text-base font-medium  ${
              Object.entries(formData).every((x) => x[1].length > 0)
                ? "bg-green-600 text-white"
                : "bg-neutral-200 text-zinc-500 "
            }  `}
          >
            Next
          </button>
        </div>
      </>
    </form>
  );
};

export default CompantDetailForm;
