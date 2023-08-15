import CompanyInfoComponent from "@/components/app-ui/CompanyInfoComponent";

import React, { useEffect } from "react";
import { BasicInfoData, CompanyDataTypes } from "@/lib/types/ui";
import Spinner from "@/components/common/Spinner";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { useAuth } from "../contexts/AuthContext";

function GeneralSettings() {
    const { authState } = useAuth();
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [basicData, setBasicData] = React.useState<BasicInfoData>({
        fullName: "",
    });
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await axiosAPIWithAuth.post("/users/basic-info/update", basicData);
            const data = await res.data;

        } catch (err) {
            console.log(err);
        }
        setIsSubmitting(false);
    };
    const getData = async () => {
        try {
            setBasicData({
                fullName: authState.user?.fullName ? authState.user.fullName : ""
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div >
            <div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6 sm:w-full md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="mt-1">
                            <input
                                value={basicData.fullName}
                                onChange={(e) =>
                                    setBasicData({
                                        ...basicData,
                                        fullName: e.target.value,
                                    })
                                }
                                name="companyName"
                                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            />
                        </div>
                        {/* <p className="mt-2 text-sm text-gray-500">Enter Full Name.</p> */}
                    </div>

                </div>
            </div>
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

export default GeneralSettings;
