import { CompanyDataTypes } from "@/lib/types/ui";
import { useRouter } from "next/router";

interface Props {
  companyData: CompanyDataTypes;
  setCompanyData: (data: CompanyDataTypes) => void;
}
function CompanyInfoComponent(props: Props) {
  const { companyData, setCompanyData } = props;
  const router = useRouter();
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6 sm:w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <div className="mt-1">
            <input
              value={companyData.name}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  name: e.target.value,
                })
              }
              name="companyName"
              className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Enter Company Name.</p>
        </div>
        <div className="sm:col-span-6 sm:w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <div className="mt-1">
            <textarea
              value={companyData.description}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  description: e.target.value,
                })
              }
              name="companyDescription"
              rows={5}
              className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Copy Paste Company Description.
          </p>
        </div>
        <div className="sm:col-span-6 sm:w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Company Website
          </label>
          <div className="mt-1">
            <input
              value={companyData.website}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  website: e.target.value,
                })
              }
              name="companyName"
              className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Enter Company Website URL.</p>
        </div>
        <div className="sm:col-span-6 sm:w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            AI Assistant Name
          </label>
          <div className="mt-1">
            <input
              value={companyData.assistant_name}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  assistant_name: e.target.value,
                })
              }
              name="assistantName"
              className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Enter Assistant Name.</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfoComponent;
