import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/hooks/useToast";
import AddEditAgentMain from "@/components/app-ui/AddEditAgentMain";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { OrgAgentDataTypes } from "@/lib/types/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CreateAgent() {
  const router = useRouter();
  const [formData, setFormData] = useState<OrgAgentDataTypes>({
    is_sms_enabled: false,
    is_whatsapp_enabled: false,
    is_instagram_enabled: false,
    is_email_enabled: false,
    is_voice_enabled: false,
    is_website_chat_enabled: false,
    automated_meeting_reminders_enabled: false,
    assigned_sms_number: "",
    assigned_whatsapp_number: "",
    assigned_instagram_id: "",
    assigned_email_id: "",
    assigned_voice_id: "",
    title: "",
    description: "",
    status: "draft",
    agent_use_case_id: "",
    custom_values: {},
    _id: "",
    org_project_id: "",
    assigned_website_chat_widget_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();


  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      let agentPostData: any = {
        ...formData,
      };
      await axiosAPIWithAuth.post("/org-agent/new", JSON.stringify(agentPostData));
      toast.addToast("success", "Agent created successfully");
      router.push("/app/org-agent");
    } catch (err: any) {
      console.log(err);

      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsSubmitting(false);
  };

  return (
    <div className="m-2 p-2">
      <AddEditAgentMain
        setFormDataMain={(tempData) => {
          setFormData({
            ...tempData,
          });
        }}
        formData={formData}
        isEditMode={false}
      />
      <div className="pt-5">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => {
              router.push("/app/org-agent");
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            className="ml-3 inline-flex justify-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isSubmitting ||
              formData.description === "" ||
              formData.title === ""

            }
            onClick={() => {
              onSubmit();
            }}
          >
            Create Agent
          </button>
        </div>
        {isSubmitting && (
          <div className="text-center">
            <Spinner color="text-indigo-500" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAgent;
