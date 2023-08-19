import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/hooks/useToast";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { OrgProjectDataTypes } from "@/lib/types/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CreateProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<OrgProjectDataTypes>({

    title: "",
    description: "",

    _id: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();


  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      let orgProjectData: any = {
        ...formData,
      };
      await axiosAPIWithAuth.post("/org-project/new", JSON.stringify(orgProjectData));
      toast.addToast("success", "Project created successfully");
      router.push("/app/org-project");
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
      <div className="sm:col-span-6 sm:w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700">
          Project Title
        </label>
        <div className="mt-1">
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            name="projectTitle"
            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Enter Project Title.</p>
      </div>
      <div className="sm:col-span-6 sm:w-full md:w-1/2">
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          Project Description
        </label>
        <div className="mt-1">
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            name="projectDescription"
            rows={5}
            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Copy Paste Project Description.
        </p>
      </div>
      <div className="pt-5">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => {
              router.push("/app/org-project");
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
            Create Project
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

export default CreateProjectPage;
