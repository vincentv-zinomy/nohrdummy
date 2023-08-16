"use client"

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from './Navbar/Logo';
import FlyoutMenu from './Navbar/TailwindNav';
import { BuildingStorefrontIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import Sidebar from './Navbar/Sidebar';
import Link from 'next/link';
import { BuildingOffice2Icon, CloudIcon, ShoppingBagIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const flyoutMenuItems = [
  {
    name: 'Industries',
    subMenu: [

      {
        name: 'Fintech',
        description: 'Get a better understanding of your traffic',
        href: '#',
        icon: CurrencyDollarIcon
      },
      {
        name: 'Saas',
        description: 'Speak directly to your customers',
        href: '#',
        icon: CloudIcon
      },
      {
        name: 'Retail',
        description: "Your customers' data will be safe and secure",
        href: '#',
        icon: BuildingStorefrontIcon
      },
      {
        name: 'E-Commerce',
        description: 'Connect with third-party tools',
        href: '#',
        icon: ShoppingBagIcon
      },
    ]
  }
];

const menuItems = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Solutions',
    subMenu: [
      {
        name: 'For HR',
        description: 'Recruit faster and more efficiently.',
        href: '/solution/agency',
        icon: UserGroupIcon
      },
      {
        name: 'For Sales',
        description: 'Built for buisness to scale their sales',
        href: '/solution/startup',
        icon: ChartBarIcon
      } 

    ]
  },
  {
    name: 'Pricing',
    href: '/#pricing'
  },
  {
    name: 'Products',
    href: '/product'
  },
  {
    name: 'Resources',
    href: '/resources'
  },
  {
    name: 'Blog',
    href: '/blog'
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
            <Logo src={'/Zigment_logo.svg'} /> 
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
