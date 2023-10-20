 
import { PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MdSms } from "react-icons/md";

 

export default function IntegrationsSections() {
    return (
      <div className="relative overflow-hidden bg-white">
        <div className="  py-16     ">
          <div className="relative mx-auto max-w-7xl h-[440px] px-4 sm:static sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center font-outfit">
          <h2 className="font-bold text-4xl md:text-40">
          The Perfect Fit for Your Stack
{" "}
            {/* <span className="relative inline-flex justify-center items-center">
              {" "}
              
            </span> */}
          </h2>
          <p className="md:text-lg text-brand-gray-300 mt-3">
            {" "}
            Integrate Zigment seamlessly with your preferred platforms—Instagram, FB, SMS, WhatsApp, Webchat, Email, etc. Compatible with all major CRMs like Zoho, Salesforce, Hubspot, and Freshdesk.
          </p>
        </div>
        <div>
              <div className="mt-10 w-full">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className=" lg:w-full mx-auto   flex justify-center"
                >
                  <div className="     ">
                    <div className="flex items-center space-x-6 lg:space-x-4">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/Google_Drive_logo.png"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/Instagram_logo_2016.svg"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/facebook.png"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/WhatsApp.svg.webp"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/gmail.svg"
                            alt=""
                            className="h-20 w-20 object-fit object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/Salesforce.com_logo.svg"
                            alt=""
                            className="h-20 w-20 object-fit object-center"
                          />
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/hubspot.webp"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/microsoft.svg"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/freshdesk.png"
                            alt=""
                            className="h-20 w-20 object-cover object-center"
                          />
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                           <PhoneIcon className="w-20 h-20 text-slate-400"/>
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-32 w-32 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <MdSms className="w-20 h-20 text-slate-400"/>
                        </div>
                        <div className="h-32 w-32 overflow-hidden rounded-lg     flex items-center border hover:drop-shadow-md bg-white justify-center cursor-pointer">
                          <img
                            src="/Amazon_Web_Services_Logo.svg"
                            alt=""
                            className="h-20 w-20 object-fit object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
             
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  