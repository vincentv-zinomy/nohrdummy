import { PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MdSms } from "react-icons/md";
import curveline from "@/assets/images/solutions/curveline.svg";
import Image from "next/image";
import line from '@/assets/images/solutions/hero/line-shape-1.svg'

export default function IntegrationsSections() {
  return (
    <div className="mb-10">
      <div className="relative   bg-[#fdf3e7]">
        <div className="  py-16     ">
          <div className="relative mx-auto max-w-7xl h-[330px] px-4 sm:static sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center font-outfit">
              <h2 className="font-bold text-4xl md:text-40 relative mb-4 relative">
              The Perfect Fit for Your Stack{" "}
                <Image src={line} alt="line" width={200} className="w-[400px] top-9 absolute inset-x-0 mx-auto"/>
              </h2>
              <p className="md:text-lg text-brand-gray-300 mt-10">
                {" "}
                Integrate Zigment seamlessly with your preferred platforms—Instagram, FB, SMS, WhatsApp, Webchat, Email, etc. Compatible with all major CRMs like Zoho, Salesforce, Hubspot, and Freshdesk.
              </p>
            </div>
            <div className="absolute mx-auto inset-x-0 pt-10">
              <div className="mt-10 w-full  ">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className=" lg:w-full mx-auto   flex justify-center"
                >
                  <div className="     ">
                    <div className="flex items-center space-x-6 lg:space-x-4">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/Google_Drive_logo.png"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/Instagram_logo_1216.svg"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid -mt-24 flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/facebook.png"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/WhatsApp.svg.webp"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/Salesforce.com_logo.svg"
                            alt=""
                            className="h-12 w-12 object-fit object-center"
                          />
                        </div>
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/hubspot.webp"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid -mt-24 flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/microsoft.svg"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/freshdesk.png"
                            alt=""
                            className="h-12 w-12 object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <MdSms className="w-12 h-12 text-slate-400" />
                        </div>
                        <div className="h-24 w-24 overflow-hidden rounded-lg     flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/Amazon_Web_Services_Logo.svg"
                            alt=""
                            className="h-12 w-12 object-fit object-center"
                          />
                        </div>
                      </div>
                      <div className="grid -mt-24 flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 flex items-center   bg-white justify-center cursor-pointer">
                          <PhoneIcon className="w-12 h-12 text-slate-400" />
                        </div>
                        <div className="h-24 w-24 overflow-hidden rounded-lg     flex items-center   bg-white justify-center cursor-pointer">
                          <img
                            src="/Ggmail_circle_icon.png"
                            alt=""
                            className="h-12 w-12 object-fit object-center"
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
      <Image className="w-full" src={curveline} alt="curveline" />
    </div>
  );
}
