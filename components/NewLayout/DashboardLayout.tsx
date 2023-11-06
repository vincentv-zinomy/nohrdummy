import { Fragment, ReactNode, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import logo1 from '@/assets/images/0newHR/images/dashboard/outlineicon.svg'
import logo2 from '@/assets/images/0newHR/images/dashboard/outlineicon_1.svg'
import logo3 from '@/assets/images/0newHR/images/dashboard/outlineicon_2.svg'
import logo4 from '@/assets/images/0newHR/images/dashboard/outlineicon_3.svg'
import logo5 from '@/assets/images/0newHR/images/dashboard/outlineicon_4.svg'
import logo6 from '@/assets/images/0newHR/images/dashboard/outlineicon_5.svg'
import logo7 from '@/assets/images/0newHR/images/dashboard/outlineicon_6.svg'
import Image from "next/image";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true, logo:logo1 },
  { name: "Job Posts", href: "/dashboard/jobpost", icon: UsersIcon, current: false, logo:logo2 },
  { name: "Team Members", href: "/dashboard/team", icon: FolderIcon, current: false, logo:logo3 },
  { name: "Candidates", href: "/dashboard/candidates", icon: CalendarIcon, current: false, logo:logo4 },
  { name: "Company Info", href: "/dashboard/companyinfo", icon: InboxIcon, current: false, logo:logo5 },
  { name: "Billing", href: "/dashboard/billing", icon: ChartBarIcon, current: false, logo:logo6 },
  { name: "Settings", href: "/dashboard/settings", icon: ChartBarIcon, current: false, logo:logo7 },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

 
type Props = {
    children:ReactNode
}

const organizations:any = [
  {
    id:1,
    image:'/companyimage.png',
    name:'Universe'
  },
  {
    id:2,
    image:'/companyimage.png',
    name:'Company'
  }
]

 

export default function DashboardLayout({children}:Props) {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarShort, setSideBarShort] = useState<boolean>(false);
  
  const [organization, setOrganization] = useState(organizations[0])

  return (
    <>
     
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <div className="text-center text-zinc-900 text-[25px] font-extrabold">
                      NoHR.ai
                    </div>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={ `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer 
                          `}
                        >
                           
                          <Image src={item.logo} alt="" className="h-6 w-6 text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 "/>
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className={`hidden md:fixed  z-10  md:inset-y-0 md:flex ${sidebarShort ? 'w-fit' : 'w-64'}  md:flex-col transition-all`} 
            style={{backgroundImage: 'var(--green-yellow, linear-gradient(266deg, rgba(59, 120, 31, 0.15) 15.09%, rgba(253, 255, 167, 0.15) 107.57%))'}} 
          >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200  pt-5">
            <div className={` flex  flex-shrink-0 items-center px-4 text-center text-zinc-900 text-[25px] font-extrabold`}> 
                {sidebarShort ? 
                    <span className="p-1">
                        <img src="/favicon.png" className="h-[30px] h-[30px]" alt="" />
                    </span>
                    :

                    <span className={`  `}>
                        NoHR.ai 
                    </span>
                }
            </div>

            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 flex flex-col justify-between  px-2 pb-4 ">
                <div>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-green-900  hover:text-green-900 cursor-pointer
                        group flex ${sidebarShort && 'justify-center'} items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-brand-solidgreen/10`}
                    >
                      <Image src={item.logo} alt="" className={`h-6 w-6 text-green-400 group-hover:text-green-500  flex shrink-0   ${!sidebarShort && 'mr-4'} transition-all`}/>
                      {!sidebarShort && 
                      <span className={`${!sidebarShort && 'ml-3'}`}>

                          {item.name}
                      </span>
                      }
                    </Link>
                  ))}
                </div>
                <div>
                      {
                        !sidebarShort &&
                        <div className="flex w-full flex-col items-center justify-center">
                      <div className="w-[95%]   px-3 py-4 bg-green-800 bg-opacity-10 rounded-lg border border-gray-400 flex-col justify-start items-start gap-5 inline-flex">
                        <div className="w-full h-16 flex-col justify-start items-start gap-2.5 flex">
                          <div className="  text-green-900 text-base font-medium font-['Outfit']">information</div>
                          <div className="  text-neutral-500 text-sm font-normal font-['Outfit']">Your trail ends in 14 days,<br/>upgrade your plan.</div>
                        </div>
                        <div className="w-full h-1 relative">
                          <div className="w-full h-1 left-0 absolute top-0  bg-white rounded-full" />
                          <div className="w-3 h-1 left-0  absolute top-0 bg-green-900 rounded-full" />
                        </div>
                      </div>
                      <div className="w-[95%] h-12 p-2 mt-2 rounded-lg border border-gray-400 flex  justify-start items-center gap-2.5 "> 
        <ArrowRightOnRectangleIcon  className="w-6 h-6 relative text-brand-solidgreen " />
        <div className="text-center text-brand-solidgreen text-sm font-normal font-['Outfit']">Log Out</div> 
    </div>
                        </div>
                      }
                </div>
              </nav>
            </div>
          </div>
        </div>
        
        <div className={`flex flex-1 flex-col  ${sidebarShort ? 'pl-[71px]' : 'md:pl-64'} transition-all relative`}>
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-lightgreen md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 items-center  justify-between px-4 relative">
              <div className="flex flex-1">
                <button className="p-1 absolute bg-white absolute border rounded-md -left-3 top-5 z-20" onClick={()=>setSideBarShort(!sidebarShort)}>
                  <ChevronDoubleLeftIcon className={`${sidebarShort ? 'rotate-180' : 'rotate-0'} transition-all w-4 h-4`} />
                </button>
                <div className="w-full sm:max-w-xs ml-3">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-gray-100 rounded-md border border-gray-300   py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-brand-lightgreen focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="hidden md:flex flex justify-between w-52 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2 focus:ring-offset-gray-100">
                      <div className="flex items-center gap-2">
                        <Image 
                          src={organization.image}   
                          width={20}
                          height={20}
                          alt="" 
                        />
                        <p>
                          {organization.name}
                        </p>
                      </div>
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-1">
                        {organizations.map((x:any)=>(

                          <Menu.Item>
                            {({ active }) => (
                              <div 
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm flex items-center gap-2 rounded-md cursor-pointer"
                                )}
                                onClick={()=>setOrganization(x)}
                              >
                                <Image
                                  src={x.image}
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                <p>
                                  {x.name}
                                </p>
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                  
                        
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="rounded-full ml-2 bg-white p-1 text-brand-lightgreen hover:text-brand-lightgreen focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-lightgreen focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

            <main className="flex-1">
                
                <div className="mx-auto   max-w-7xl p-4   md:p-8">
                    {/* Replace with your content */}
                    <div className="h-96 rounded-lg  " >
                        {children}
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
      </div>
    </>
  );
}
