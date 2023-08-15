import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner";
import { useToast } from "../hooks/useToast";
import CommonTable, { HeaderItemForTableTypes } from "../Tables/CommonTable";
import { PhoneNumberTypes } from "@/lib/types/ui";
import WhatsAppBusinessAccountSetup from "./WhatsAppBusinessAccountSetup";

function DedicatedNumberSetup() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myNumbersList, setMyNumbersList] = useState<PhoneNumberTypes[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toast = useToast();

  const getAllMyNumbers = async () => {
    setIsLoading(true);
    try {
      const getData = await axiosAPIWithAuth.get("/phone-numbers/find-dedicated-number");
      const resData = await getData.data;

      setMyNumbersList(resData);

    } catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }

    setIsLoading(false);
  }
  const BuyNewDedicatedNumber = async () => {
    setIsSubmitting(true);
    try {
      const getData = await axiosAPIWithAuth.get("/phone-numbers/buy-dedicated-number");
      const resData = await getData.data;

      toast.addToast("success", "Number purchased successfully");
      getAllMyNumbers();
    } catch (err: any) {
      console.log(err);
      let errorMsg = "Failed to purchase number. Please try again later.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    getAllMyNumbers();
  }, [])
  const handleCheckboxChange = (item_id: string) => {
    const checked = selectedIds.includes(item_id);
    let newSelectedItems: string[] = [];
    if (checked) {
      newSelectedItems = selectedIds.filter((i) => i !== item_id);
    }
    else {
      newSelectedItems = [...selectedIds, item_id];
    }
    setSelectedIds(newSelectedItems);

  }
  const showCustomComponent = (item: PhoneNumberTypes, key: string) => {
    if (key === 'connection_type') {
      return <>

        {
          item[key] === 'WHATSAPP' ? <span className="text-green-500">WhatsApp</span> : <span className="text-blue-500">SMS</span>
        }
      </>
    }
  }
  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner color="text-indigo-500" />
      </div>
    );
  }
  return (
    <>
      <div>
        <WhatsAppBusinessAccountSetup />
        <div>
          or
        </div>
        <button
          className="mt-2 inline-flex justify-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            BuyNewDedicatedNumber();
          }}
          disabled={isSubmitting}
        >
          Buy New SMS Number
        </button>
      </div>

      {
        myNumbersList && myNumbersList.length > 0 ?
          <CommonTable data={myNumbersList} onRowClick={(item: any) => {
            handleCheckboxChange(item._id)
          }}
            renderCustomComponent={showCustomComponent}
            checkBoxFilter={[

              {
                key: "friendly_name",
                label: "Name",
              },

              {
                key: "connection_type",
                label: "Number Type",
              },
            ]}
            searchFilter={[
              {
                key: "phone_number",
                label: "Phone Number",
              },
            ]}
            header_items={[
              {
                key: "friendly_name",
                label: "Name",
                type: HeaderItemForTableTypes.TEXT
              },
              {
                key: "phone_number",
                label: "Phone Number",
                type: HeaderItemForTableTypes.TEXT
              },
              {
                key: "connection_type",
                label: "Number Type",
                type: HeaderItemForTableTypes.CUSTOM_COMPONENT
              },
            ]
            }
            pagination={{
              totalItems: myNumbersList.length,
              itemsPerPage: 10,
              onPageChange: (page: number) => {

              }

            }}
            selectedItems={selectedIds}
            setSelectedItems={setSelectedIds}
            handleCheckboxChange={handleCheckboxChange}
            selectionOptions={[]}

          />
          :
          <div className="text-center">
            <p>You do not have any dedicated number</p>
          </div>
      }


    </>
  );
}

export default DedicatedNumberSetup;