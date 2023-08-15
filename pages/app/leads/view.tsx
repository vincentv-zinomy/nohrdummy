import { useAuth } from "@/components/contexts/AuthContext";
import AddEditLeadsMain from "@/components/app-ui/AddEditLeadsMain";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { classNames } from "@/lib/common";
import { LeadTypes, OrgAgentDataTypes } from "@/lib/types/ui";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter as navRouter, } from "next/navigation";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner";

function AddLeadPage() {
  const router = useRouter();
  const navR = navRouter();
  const { authState } = useAuth();
  const [leadsData, setLeadsData] = useState<LeadTypes[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<OrgAgentDataTypes | null>(null);
  const [productsData, setProductsData] = useState<OrgAgentDataTypes[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const getProductsData = async () => {

    setIsLoading(true);
    try {
      const res = await axiosAPIWithAuth.get(`/org-agent/all`);
      const data = await res.data;

      setProductsData(data);
      if (router.query.org_agent_id) {
        const selectedProduct = data.find((org_agent: OrgAgentDataTypes) => org_agent._id === router.query.org_agent_id);
        setSelectedProduct(selectedProduct);

      }
      else {
        setSelectedProduct(data.length > 0 ? data[0] : null);
      }

    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const getData = async () => {

    setIsLoadingLeads(true);
    try {
      const res = await axiosAPIWithAuth.get(`/leads/by-org-agent/${selectedProduct?._id}`);
      const data = await res.data;

      console.log(data);
      setLeadsData(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingLeads(false);
  };
  useEffect(() => {
    if (authState.isAuthenticated) {
      getProductsData();
    }
  }, [authState]);
  useEffect(() => {
    if (selectedProduct && selectedProduct._id) {
      getData();
      // Update the query here
      router.push({
        pathname: router.pathname,
        query: {
          open_modal: router.query.open_modal ? router.query.open_modal : 0,
          org_agent_id: selectedProduct._id
        },
      });
    }
  }, [selectedProduct]);

  return (

    <div className="m-2 p-2">
      <div className="sm:w-full md:w-1/2 w-1/2">
        {
          isLoading &&
          <div className="flex justify-center items-center">
            <Spinner color="text-indigo-600" />
          </div>
        }
        {
          !isLoading && <Listbox value={selectedProduct} onChange={setSelectedProduct}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  {`Your Products or Services`}
                  <span className="text-xs text-gray-500">
                    Select One
                  </span>
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedProduct?.title}{" "}

                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {productsData.map((product: OrgAgentDataTypes) => (
                        <Listbox.Option
                          key={product._id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={product}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected
                                    ? "font-semibold"
                                    : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {product.title}
                                <span className={"text-xs"}>
                                  {`(`}
                                  {product?.description}
                                  {`)`}
                                </span>
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active
                                      ? "text-white"
                                      : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
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
        }
      </div>
      {
        isLoadingLeads ?
          <div className="flex justify-center items-center">
            <Spinner color='text-indigo-500' />
          </div>
          :
          <AddEditLeadsMain
            leadsData={leadsData}
            setLeadsData={setLeadsData}
            reloadData={() => {
              getData()
            }}
          />
      }
    </div>
  );
}

export default AddLeadPage;
