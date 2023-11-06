import { FormContext } from "@/pages/onboard";
import React, { useContext, useState } from "react";
import image from '@/assets/images/0newHR/images/onboard/newcandidate.png'
import Image from "next/image";
import AddCandidateModal from "./AddCandidateModal";
import Link from "next/link";

const AddCandidatesForm = ({}) => {
    const { currentForm, setCurrentForm, formSteps } = useContext(FormContext);
    const [open, setOpen] = useState(false)
 

    const handlePrevious = () => {
        setCurrentForm(formSteps[currentForm.id - 1])
    }

  return (
    <>
      <form
        className="h-full flex flex-col justify-between   "
        onSubmit={(e)=>e.preventDefault()}
      >
        <>
            <div className="w-full h-full  flex flex-col items-center justify-center text-center  ">
                <Image alt="" src={image} width={186} height={155} className="mx-auto"/>
                    
                    <div className="text-black text-[22px] font-semibold"> You are all set! </div>
                    <div className="text-zinc-500 text-base font-normal mt-3">
                        Now start adding candidates to this Job and start conversations.
                    </div>
                    <button className="w-72 mt-7 px-4 py-3 bg-green-600 rounded-[100px] text-center text-white text-base font-medium " onClick={()=>setOpen(true)}>
                        Add New Candidates
                    </button> 

            </div>
            <div className="py-10 w-full flex justify-between items-center">
                <button
                    onClick={handlePrevious} 
                    className="w-[150px] h-[52px] px-6 py-3.5 rounded-[100px] border border-green-800 justify-center items-center gap-2 inline-flex text-center text-green-900 text-base font-medium">
                Back
                </button>
                <Link href={'/dashboard'}
                className={`w-[150px] h-[52px] px-6 py-3.5 bg rounded-[100px] bg-neutral-200 justify-center items-center gap-2 inline-flex text-center text-base font-medium     `}
                >
                Skip
                </Link>
            </div>
        </>
      </form> 
      <AddCandidateModal open={open} setOpen={setOpen}/>
    </>
  );
};

export default AddCandidatesForm;
