import CompanyInfoComponent from "@/components/app-ui/CompanyInfoComponent";

import React, { useEffect } from "react";
import { CompanyDataTypes } from "@/lib/types/ui";
import Spinner from "@/components/common/Spinner";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";

function CompanyInfo() {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [companyData, setCompanyData] = React.useState<CompanyDataTypes>({
    name: "",
    website: "",
    email: "",
    phone: "",
    description: "",
    assistant_name: ""
  });
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await axiosAPIWithAuth.put("/organizations/update", companyData);
      const data = await res.data;
    } catch (err) {
      console.log(err);
    }
    setIsSubmitting(false);
  };
  const getData = async () => {
    try {
      const res = await axiosAPIWithAuth.get("/organizations/details");
      const data = await res.data;

      setCompanyData(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 m-4">
      <CompanyInfoComponent
        companyData={companyData}
        setCompanyData={setCompanyData}
      />
      <div className="pt-5 ">
        <div className="flex justify-start">
          <button
            className="inline-flex justify-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            onClick={handleSubmit}
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

export default CompanyInfo;
