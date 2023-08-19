import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner";
import { useToast } from "../hooks/useToast";
import CommonTable, { HeaderItemForTableTypes } from "../Tables/CommonTable";
import { ChatChannelType, CommunicationChannelTypes, EmailMetadata } from "@/lib/types/ui";
import WhatsAppBusinessAccountSetup from "./WhatsAppBusinessAccountSetup";

function CommunicationChannelSetup() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLauncherVisible, setIsLauncherVisible] = useState<boolean>(false);
  const [selectedChannelToAdd, setSelectedChannelToAdd] = useState<ChatChannelType>(ChatChannelType.SMS);
  const [emailChannelData, setEmailChannelData] = useState<EmailMetadata>({
    user: "",
    password: "",
    host: "",
    port: "",
    tls: "true"
  });
  const [myCommunicationChannels, setMyCommunicationChannels] = useState<CommunicationChannelTypes[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toast = useToast();

  const getAllMyChannels = async () => {
    setIsLoading(true);
    try {
      const getData = await axiosAPIWithAuth.get("/communication-channels/my-channels");
      const resData = await getData.data;

      setMyCommunicationChannels(resData);

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
  const AddNewEmailChannel = async () => {
    setIsSubmitting(true);
    try {
      const getData = await axiosAPIWithAuth.post("/communication-channels/add-email-channel", {
        ...emailChannelData
      });
      const resData = await getData.data;

      toast.addToast("success", "Number purchased successfully");
      getAllMyChannels();
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
  }
  const BuyNewDedicatedNumber = async () => {
    setIsSubmitting(true);
    try {
      const getData = await axiosAPIWithAuth.get("/communication-channels/buy-dedicated-number");
      const resData = await getData.data;

      toast.addToast("success", "Number purchased successfully");
      getAllMyChannels();
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
    getAllMyChannels();
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
  const showCustomComponent = (item: CommunicationChannelTypes, key: string) => {
    if (key === 'connection_type') {
      return <>

        <span className="text-green-500">{item[key]}</span>
      </>
    }
    if (key === 'email_metadata' && item[key]) {
      let emailData: EmailMetadata = item[key] as EmailMetadata;
      return <>

        <span className="text-indigo-500">{emailData.user}</span>
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
      <div className="sm:col-span-6 sm:w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700">
          Communication Channel To Add
        </label>
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedChannelToAdd}
          onChange={(e) => {
            setSelectedChannelToAdd(e.target.value as ChatChannelType)
          }}
        >
          <option value={""}>Select Channel</option>
          <option value={ChatChannelType.SMS}>SMS</option>
          <option value={ChatChannelType.WHATSAPP}>WhatsApp</option>
          <option value={ChatChannelType.INSTAGRAM}>Instagram</option>
          <option value={ChatChannelType.EMAIL}>Email</option>
        </select>
        {
          selectedChannelToAdd === ChatChannelType.SMS &&
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
        }
        {
          selectedChannelToAdd === ChatChannelType.WHATSAPP &&
          <>
            <button
              onClick={() => {
                setIsLauncherVisible(true);
                window.launchWhatsAppSignup();
              }}
              className="mt-2 inline-flex items-center 
                  py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium 
                  rounded-md text-white 
                  bg-[#1877f2] hover:bg-blue-700 
                  focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed"

            >
              Login with Facebook
            </button>
            <span className="text-xs text-slate-700 font-bold">{`(Add whatsapp number by connecting facebook account)`}</span>

          </>
        }
        {
          selectedChannelToAdd === ChatChannelType.INSTAGRAM &&
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
              alert("Coming Soon")
            }}
            disabled={isSubmitting}
          >
            Connect Instagram
          </button>
        }
        {
          selectedChannelToAdd === ChatChannelType.EMAIL &&
          <>
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                Email User
              </label>
              <input
                value={emailChannelData.user}

                onChange={(e) => {
                  setEmailChannelData({
                    ...emailChannelData,
                    user: e.target.value
                  })
                }}
                name="customer_variable_"
                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Password
              </label>
              <input
                value={emailChannelData.password}

                onChange={(e) => {
                  setEmailChannelData({
                    ...emailChannelData,
                    password: e.target.value
                  })
                }}
                name="customer_variable_"
                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Host
              </label>
              <input
                value={emailChannelData.host}

                onChange={(e) => {
                  setEmailChannelData({
                    ...emailChannelData,
                    host: e.target.value
                  })
                }}
                name="customer_variable_"
                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Port
              </label>
              <input
                value={emailChannelData.port}

                onChange={(e) => {
                  setEmailChannelData({
                    ...emailChannelData,
                    port: e.target.value
                  })
                }}
                name="customer_variable_"
                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700">
                TLS
              </label>
              <input
                value={emailChannelData.tls}

                onChange={(e) => {
                  setEmailChannelData({
                    ...emailChannelData,
                    tls: e.target.value
                  })
                }}
                name="customer_variable_"
                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
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
                AddNewEmailChannel();
              }}
              disabled={isSubmitting}
            >
              Add Email
            </button>
          </>

        }
      </div>
      <div>
        <WhatsAppBusinessAccountSetup isLauncherVisible={isLauncherVisible} setIsLauncherVisible={setIsLauncherVisible} />

      </div>

      {
        myCommunicationChannels && myCommunicationChannels.length > 0 ?
          <CommonTable data={myCommunicationChannels} onRowClick={(item: any) => {
            handleCheckboxChange(item._id)
          }}
            renderCustomComponent={showCustomComponent}
            checkBoxFilter={[
              {
                key: "connection_type",
                label: "Connection Type",
              },
            ]}
            searchFilter={[
              {
                key: "friendly_name",
                label: "Name",
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
                key: "email_metadata",
                label: "Email",
                type: HeaderItemForTableTypes.CUSTOM_COMPONENT
              },
              {
                key: "connection_type",
                label: "Channel Type",
                type: HeaderItemForTableTypes.CUSTOM_COMPONENT
              },
            ]
            }
            pagination={{
              totalItems: myCommunicationChannels.length,
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
            <p>You do not have any communication channels</p>
          </div>
      }


    </>
  );
}

export default CommunicationChannelSetup;