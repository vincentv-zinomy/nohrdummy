import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useToast } from "../hooks/useToast";
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { classNames } from "@/lib/common";

export interface ConnectIntegrationsProps {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}
function ConnectIntegrations(props: ConnectIntegrationsProps) {
  const [integrations, setIntegrations] = useState<{
    id: string;
    name: string;
    logo_url: string;
  }[]>([]);
  const [selected, setSelected] = useState<{
    id: string;
    name: string;
    logo_url: string;
  }>({
    id: "",
    name: "",
    logo_url: "",
  });
  const { onSuccess, onError } = props;
  const router = useRouter();
  const toast = useToast();

  const fetchIntegrations = async () => {
    try {

      const getRes = await axiosAPIWithAuth.get('/integration-auth/public/fetch-all');
      const getData = getRes.data;

      setIntegrations(getData);
      if (getData.length > 0) {
        setSelected(getData[0]);
      }

    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);
    }
  }
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = React.useState(false);

  function openAuthPopup(authURL: string) {
    setIsIntegrationModalOpen(true);
    const width = 600;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      authURL,
      "integrationAuthPopup",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }

  const getAuthURL = async (integration_id: string) => {
    try {
      const getRes = await axiosAPIWithAuth(`/integration-auth/auth/${integration_id}`);
      const getURL = getRes.data;

      console.log(getURL)
      return getURL;
    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
  }


  useEffect(() => {
    fetchIntegrations()
  }, [])

  useEffect(() => {
    function handleAuthMessage(event: MessageEvent) {
      if (event.data.success) {
        toast.addToast("success", "Integration connected successfully");
        onSuccess && onSuccess();
        // router.reload();
      } else {
        if (isIntegrationModalOpen) {
          toast.addToast("error", "Integration connection failed");
        }
        console.error("Authentication failed:", event.data.error);
        onError && onError(event.data.error);
      }
    }

    window.addEventListener("message", handleAuthMessage);
    return () => {
      window.removeEventListener("message", handleAuthMessage);
    };
  }, []);

  return (
    <div className="mt-6 w-1/2">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">Select Integration</Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <img src={selected.logo_url} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {integrations.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img src={person.logo_url} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <button
        type="button"
        className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        onClick={async () => {
          const getURL = await getAuthURL(selected.id);
          openAuthPopup(getURL);
        }}
      >
        Connect
      </button>

    </div>
  );
}

export default ConnectIntegrations;
