"use client"

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx'; 
import FlyoutMenu from './Navbar/TailwindNav';
import { BuildingStorefrontIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import Sidebar from './Navbar/Sidebar';
import Link from 'next/link';
import { PencilSquareIcon, CloudIcon, ShoppingBagIcon, UserGroupIcon, ChartBarIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import Logo from './Navbar/Logo';
import {FcAssistant} from 'react-icons/fc'
import { MdAutoGraph, MdOutlineSportsBasketball } from 'react-icons/md';

 

const menuItems = [ 
  {
    name: 'Solutions',
    subMenu: [
      {
        name: 'For HR',
        description: 'Recruit faster and more efficiently.',
        href: '/solutions/nohr',
        icon: UserGroupIcon
      },
      {
        name: 'Lead Automation',
        description: 'Automate Leads, Maximize Conversions',
        href: '/solutions/zigment',
        icon: MdAutoGraph
      } 
      ,
      {
        name: 'Sales Assistant',
        description: 'Never Miss a Conversation Again',
        href: '/solutions/salesassistant',
        icon: FcAssistant
      } 
      ,
      {
        name: 'For Coaches ',
        description: 'Engage More, Stress Less',
        href: '/solutions/coaches',
        icon: MdOutlineSportsBasketball
      } 

    ]
  },
  {
    name: 'Products',
    subMenu: [
      {
        name: 'NoHR',
        description: 'Schedule Interviews Without Spending Hours',
        href: '/nohr',
        icon: '/nohrTabLogo.png'
      },
      {
        name: 'LeadFix',
        description: 'Your AI Sales assistant with superhuman abilities',
        href: '/leadfix',
        icon: '/leadfix_icon.svg'
      } 

    ]
  },
  {
    name: 'Pricing',
    href: '/#pricing'
  },
  {
    name: 'Resources',
    subMenu: [
      {
        name: 'Blog', 
        href: '/blog',
        icon: PencilSquareIcon,
        description: 'Your AI Sales assistant with superhuman abilities',
      },
      {
        name: 'Integrations', 
        href: '/integrations',
        icon: SquaresPlusIcon,
        description: "Connect with third-party tools that you're already using",
      } 

    ]
  }, 
  {
    name: 'Login',
    href: '/signin'
  },


]

export default function Navbar() {
  const [open, setOpen] = useState(false);


  return (
    <>
      <header>

        <nav
          className="bg-white h-[80px]    z-40 fixed w-full duration-50 transition-all overflow-hidden lg:overflow-visible"
        >
          <div className='w-full px-5 md:px-10 flex items-center border-b border-slate-300 justify-between h-[80px] z-40 relative bg-white'>
            <Logo src={'/Zigment_logo.svg'}  /> 
            <div className='flex gap-10 items-center hidden lg:flex'>
            {menuItems.map((x, i) => {
              if (x.href) {
                return <Link href={x.href} key={i} className='font-outfit text-md cursor-pointer hover:text-green-800'>{x.name}</Link>
              }
              if (x.subMenu) {
                return <FlyoutMenu menu={x} key={i} />
              }
            })}
            <Link
              href="/signin"
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-50 font-semibold text-white rounded-full hover:bg-inherit hover:text-brand-blue-100 border border-brand-blue-50 transition duration-200 py-2 px-4 "

            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>

          </div>
            <button className='lg:hidden' onClick={() => setOpen(true)}>  <RxHamburgerMenu size={25} />
            </button>
          </div>

        </nav>
      </header>

      <Sidebar open={open} setOpen={setOpen}   menuItems={menuItems} />
    </>
  );
}
