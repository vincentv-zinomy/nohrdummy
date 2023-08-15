import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/hooks/useToast";
import AddEditProductMain from "@/components/app-ui/AddEditProductMain";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { OrgAgentDataTypes } from "@/lib/types/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CreateProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState<OrgAgentDataTypes>({
    title: "",
    description: "",
    status: "draft",
    assigned_number: "",
    number_type: "SMS",
    agent_use_case_id: "",
    custom_values: {},
    _id: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();


  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      let productPostData: any = {
        ...formData,
      };
      await axiosAPIWithAuth.post("/org-agent/new", JSON.stringify(productPostData));
      toast.addToast("success", "Product created successfully");
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
      <AddEditProductMain
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
              formData.title === "" ||
              formData.assigned_number === ""

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

export default CreateProduct;
