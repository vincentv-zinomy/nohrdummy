import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import Spinner from "@/components/common/Spinner";
import validator from "validator";
import { allowedCountryCodes } from "@/lib/common";

interface AddNewLeadModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setNewAddedLead: (NewAddedLead: any) => void;
}
function AddNewLeadModal({
  show,
  setShow,
  setNewAddedLead,
}: AddNewLeadModalProps) {
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [countryCode, setCountryCode] = useState("US");
  const [countryCodeForPhone, setCountryCodeForPhone] = useState("+1");
  const [error, setError] = useState<string>("");

  const addNewLead = async () => {
    // Validation checks
    if (!fullName.trim()) {
      setError("FirstName can't be empty");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (!(validator.isLength(phone, { min: 7, max: 14 }) && validator.isNumeric(phone, {
      no_symbols: true
    }))) {
      setError("Invalid phone number, must be in E.164 format (+12345678900) and consist only of digits");
      return;
    }

    try {

      // Reset form fields
      setEmail("");
      setPhone("");
      setFullName("");

      const findCountryCode = allowedCountryCodes.find((country) => country.isoCode === countryCode);
      let tempCode = findCountryCode?.dialCode;
      tempCode = tempCode ? tempCode : "+1";
      // Close the modal

      setNewAddedLead({ full_name: fullName, email, phone: `${tempCode}${phone}` });
      setShow(false);
      setError("");
    } catch (error) {
      console.error("Error adding member:", error);
      setError("An error occurred while adding the member."); // Set error state
    }
  };

  const errorMessage = error && (
    <p className="text-red-500">{error}</p>
  );

  return (
    <div>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setShow}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Add New Lead
                    </Dialog.Title>
                    <div className="text-left">
                      <div className="sm:col-span-6 sm:w-full mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name/Nick Name
                        </label>
                        <div className="mt-1">
                          <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            name="name"
                            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-6 sm:w-full mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="mt-1">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-6 sm:w-full mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Mobile Phone
                        </label>
                        <div className="mt-1 flex">
                          <select
                            className="block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                          >
                            {
                              allowedCountryCodes.map((country) => {
                                return <option value={country.isoCode}>{country.dialCode}</option>
                              })
                            }
                          </select>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            name="phone"
                            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {errorMessage}
                  <div className="flex">
                    <button
                      type="button"
                      className="w-1/2 m-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-1/2 m-2 inline-flex 
                      justify-center w-full rounded-md 
                      border border-transparent shadow-sm px-4 py-2 bg-indigo-600
                       text-base font-medium text-white 
                       hover:bg-indigo-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500 sm:text-sm
                       disabled:opacity-50
                       disabled:cursor-not-allowed
                       "
                      onClick={addNewLead}
                      disabled={fullName === "" || email === "" || phone === ""}
                    >
                      Add Lead
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default AddNewLeadModal;
