import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/hooks/useToast";
import AddEditProductMain from "@/components/app-ui/AddEditProductMain";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { LeadTypes, OrgAgentDataTypes } from "@/lib/types/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EditProduct() {
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

  const getData = async () => {
    try {
      const res = await axiosAPIWithAuth.get(
        `/org-agent/details/${router.query.id}`
      );
      const data = await res.data;

      const products_data = data as OrgAgentDataTypes;

      setFormData({
        _id: products_data._id,
        title: products_data.title,
        description: products_data.description,
        status: products_data.status,
        assigned_number: products_data.assigned_number,
        number_type: products_data.number_type,
        agent_use_case_id: products_data.agent_use_case_id,
        custom_values: products_data.custom_values
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getData();
    }
  }, [router]);



  const toast = useToast();

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      let productPostData: any = {
        ...formData,
        id: router.query.id,
      };

      await axiosAPIWithAuth.put(`/org-agent/update/${router.query.id}`, JSON.stringify(productPostData));
      toast.addToast("success", "Product created successfully");
      window.location.href = "/app/org-agent";
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
        isEditMode={true}
      />
      <div className="pt-5">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/app/org-agent";
            }}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Back
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
            disabled={isSubmitting ||
              formData.description === "" ||
              formData.title === "" ||
              formData.assigned_number === ""

            }
            onClick={() => {
              onSubmit();
            }}
          >
            Save
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

export default EditProduct;
