"use client"

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from './Navbar/Logo';
import FlyoutMenu from './Navbar/TailwindNav';
import { BuildingStorefrontIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import Sidebar from './Navbar/Sidebar';
import Link from 'next/link';
import { CloudIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

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
    name: 'Pricing',
    href: '#pricing'
  },
  {
    name: 'Blog',
    href: '/blog'
  }
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
            <Logo src={'/leadfix_logo.svg'} />
            <div className='flex items-center gap-4 hidden lg:flex'>
              <div className='flex gap-10'>
                {menuItems.map((x) => (<Link href={x.href} className='font-outfit text-md'>{x.name}</Link>))}
                {flyoutMenuItems.map((x) => (
                  <FlyoutMenu menu={x} />
                ))}
              </div>
              <Link href='/signin' className='text-sm font-semibold border border-brand-green rounded-full text-brand-blue-100 hover:text-white hover:bg-brand-blue-100 transition duration-200 py-2 px-7 md:py-3 md:px-9'>
                Contact
              </Link>
            </div>
            <button className='lg:hidden' onClick={() => setOpen(true)}>  <RxHamburgerMenu size={25} />
            </button>
          </div>

        </nav>
      </header>

      <Sidebar open={open} setOpen={setOpen} flyoutMenuItems={flyoutMenuItems} menuItems={menuItems} />
    </>
  );
}
