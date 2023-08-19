import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/hooks/useToast";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { OrgProjectDataTypes } from "@/lib/types/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EditProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<OrgProjectDataTypes>({
    title: "",
    description: "",
    _id: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getData = async () => {
    try {
      const res = await axiosAPIWithAuth.get(
        `/org-project/details/${router.query.id}`
      );
      const data = await res.data;

      const org_projects_data = data as OrgProjectDataTypes;

      setFormData({
        _id: org_projects_data._id,
        title: org_projects_data.title,
        description: org_projects_data.description,

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
      let projectsData: any = {
        ...formData,
        id: router.query.id,
      };

      await axiosAPIWithAuth.put(`/org-project/update/${router.query.id}`, JSON.stringify(projectsData));
      toast.addToast("success", "Project created successfully");
      window.location.href = "/app/org-project";
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
              window.location.href = "/app/org-project";
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
              formData.title === ""

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

export default EditProjectPage;
