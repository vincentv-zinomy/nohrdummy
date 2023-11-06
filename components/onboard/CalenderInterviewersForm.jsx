import { FormContext } from "@/pages/onboard";
import React, { useContext, useState } from "react";
import CustomModal from "../common/CustomModal";

const CalenderInterviewersForm = ({}) => {
    const { currentForm, setCurrentForm, formSteps } = useContext(FormContext);
    const [open, setOpen] = useState(false)
    const handleNext = () => {
        setCurrentForm(formSteps[currentForm.id + 1]);
    };

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
          <div>
            <h3 className="text-black text-xl font-semibold">
              Connect Your Calendar
            </h3>
            <p className="text-zinc-500 text-base font-normal mt-2">
              We need to connect yours and Interviewer’s calendars. Your ie
              host’s calendar will be the placeholder for all the scheduled
              interviews. Interviewer’s calendar will be used to check for any
              scheduling conflicts.
            </p>
            <div className="w-full gap-10 flex items-center">
                <button className="w-full   mt-10 px-5 py-5 rounded-lg border border-neutral-200 justify-center items-start gap-2.5 inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute">
                            </div>
                        </div>
                        <div className="text-center text-black text-sm font-normal">Google Calendar</div>
                    </div>
                </button>
                <button className="w-full   mt-10 px-5 py-5 rounded-lg border border-neutral-200 justify-center items-start gap-2.5 inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute">
                            </div>
                        </div>
                        <div className="text-center text-black text-sm font-normal">Outlook Calendar</div>
                    </div>
                </button>
                
            </div>

            <div className="pt-4 space-y-6">
              <div className="w-full px-6 py-4 bg-gray-100 rounded-lg">
                <p className="text-black text-lg font-semibold">
                  Select / Invite Interviewers
                </p>
                <div className="w-full text-zinc-500 text-base font-normal">
                  We need to connect yours and Interviewer’s calendars. Your ie
                  host’s calendar will be the placeholder for all the scheduled
                  interviews. Interviewer’s calendar will be used to check for
                  any scheduling conflicts.
                </div>
                <button className="w-fit mt-6 h-11 px-6 py-2.5 bg-green-800 rounded-[100px] justify-center items-center gap-2 inline-flex text-center text-white text-base font-medium" onClick={()=>setOpen(true)}>
                    Add Interviewer
                </button>
              </div>
            </div>
          </div>
          <div className="py-10 w-full flex justify-between items-center">
            <button
                onClick={handlePrevious} 
                className="w-[150px] h-[52px] px-6 py-3.5 rounded-[100px] border border-green-800 justify-center items-center gap-2 inline-flex text-center text-green-900 text-base font-medium">
              Back
            </button>
            <button onClick={handleNext}
              className={`w-[150px] h-[52px] px-6 py-3.5 bg rounded-[100px] bg-neutral-200 justify-center items-center gap-2 inline-flex text-center text-base font-medium     `}
            >
              Skip
            </button>
          </div>
        </>
      </form>
      {/* <AddInterviewerModal open={open} setOpen={setOpen}/> */}
      <CustomModal
            action="create"
            button_content="Add Interviewer"
            title="Add New Interviewer"
            open={open}
            setOpen={setOpen}
            inputs={[
              {
                key: "name",
                label: "Name",
                input_type: "text",
                placeholder: "Interviewer Name",
                required:true
              },
              {
                key: "email",
                label: "Email",
                input_type: "text",
                placeholder: "you@example.com",
                required:true

              },
             
            ]} 
          />
    </>
  );
};

export default CalenderInterviewersForm;
