import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {BsChevronDown} from 'react-icons/bs'

import React from 'react'
import NavbarItem from './NavbarItem'
import Link from 'next/link'

type flyoutMenuItems = {
    name:string,
    subMenu:{
        name: string;
        description: string;
        href: string;
        icon:any
    }[]
}

type menuItemType = {
  name:string,
  href:string
}

type Props = {
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    flyoutMenuItems:flyoutMenuItems[],
    menuItems:menuItemType[]
}

export default function Sidebar({open, setOpen, flyoutMenuItems, menuItems}:Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Leadfix</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6 gap-2 flex flex-col">
                        {menuItems.map((x)=>(<Link href={x.href} className='font-outfit text-lg'>{x.name}</Link>))}

                        {flyoutMenuItems.map((x)=>(
                            <NavbarItem menu={x}/>
                        ))}
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
