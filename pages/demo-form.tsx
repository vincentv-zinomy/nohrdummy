
import LandingPageLayout from "@/components/Layout/LandingPageLayout";
import { CalendarDaysIcon, ChartBarIcon, ChatBubbleBottomCenterTextIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon } from "@heroicons/react/24/outline"; 
import { ChangeEvent, useState } from "react";
import SelectCountry from '@/components/SelectCountry'
import { COUNTRIES } from "@/lib/countries";

const items = [
  {
    id: 1,
    title: "Intelligent, Human-like Interactions",
    description:
      "NoHR AI delivers engaging, human-like interactions, focusing on its task to schedule an interview.",
    icon:UserGroupIcon
  },
  {
    id: 2,
    title: "Smart Scheduling",
    description:
      "NoHR AI integrates with your Google calendar, scheduling interviews intelligently within the available time slots.",
      icon:CalendarDaysIcon
  },
  {
    id: 3,
    title: "Centralized Dashboard",
    description:
      "Gain a comprehensive overview of each candidate interaction for every job via a single dashboard view.",
      icon:ChartBarIcon
  },
  {
    id: 4,
    title: "Easy Whatsapp Integration",
    description:
      "Quickly connect your company&apos;s Whatsapp business account, or create a new one to get started.",
      icon:ChatBubbleBottomCenterTextIcon 
  },
];

export default function DemoForm() {

  const [formData, setFormData] = useState({
    "first-name":"",
    "last-name":"",
    phone:'',
    email:'',
    company:'',
    country:COUNTRIES[0]
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <>
      <LandingPageLayout>
        <div className="relative bg-white">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
          </div>
          <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-4">
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="mx-auto max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Schedule Interviews Without Spending Hours
                </h2>
                <div className="py-8">
                  <ul role="list" className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
                      >
                        <div className="sm:flex items-center">
                          <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                             <div className="w-24 h-24 rounded-full flex items-center justify-center bg-brand-blue-100 ">
                             
                                <item.icon className="h-12 w-12 text-white group-hover:text-indigo-600" aria-hidden="true"/>
                             </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold">{item.title}</h4>
                            <p className="mt-1 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white pb-10 md:py-16 px-4 sm:px-6 lg:col-span-2 lg:py-24 lg:px-8 xl:pl-12">
              <div className="mx-auto max-w-lg lg:max-w-none md:p-10 border rounded-lg bg-white drop-shadow-md">
                <p className="mb-6 text-2xl font-semibold text-center">See How  NO<span className="text-brand-blue-100">HR</span>  Works</p>
                <form
                  action="#"
                  method="POST"
                  className="grid grid-cols-1 gap-y-6"
                >
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="First name *"
                      required
                      value={formData["first-name"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Last name"
                      value={formData["last-name"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="sr-only">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company" 
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Company *"
                      required
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="sr-only">
                      country
                    </label>
                    <SelectCountry formData={formData} setFormData={setFormData}/>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-brand-blue-100 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-brand-blue-100 focus:outline-none focus:ring-2 focus:ring-brand-blue-100 focus:ring-offset-2"
                    >
                      Request Demo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LandingPageLayout>
    </>
  );
}
