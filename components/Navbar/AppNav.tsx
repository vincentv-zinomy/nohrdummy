import { CurrencyDollarIcon, UserGroupIcon, BuildingOffice2Icon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";

import Sidebar from "@/components/Navbar/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import FlyoutMenu from './TailwindNav';




const menuItems = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Solutions',
    subMenu: [
      {
        name: 'For Agencies',
        description: 'Recruit faster and more efficiently.',
        href: '/solution/agency',
        icon: UserGroupIcon
      },
      {
        name: 'For Startups',
        description: 'Built for startups to scale their hiring',
        href: '/solution/startup',
        icon: BuildingStorefrontIcon
      },
      {
        name: 'For Enterprise',
        description: 'Large scale hiring made easy with our AI-powered platform',
        href: '/solution/enterprise',
        icon: BuildingOffice2Icon
      },

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
        name: 'HR Toolkit',
        description: 'Hub for all HR essentials: Documents, policies, templates and more',
        href: '/hr-toolkit',
        icon: UserGroupIcon
      }, 

    ]
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

const AppNav = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className="border-b border-brand-gray-300/10">
        <nav className="max-w-base mx-auto flex items-center justify-between px-5 py-4 md:py-5">
          <Link
            className="text-2xl md:text-3xl font-montserrat font-extrabold"
            href="/"
          >
            NoHR.ai
          </Link>
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
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-full hover:bg-inherit hover:text-brand-green border border-brand-green transition duration-200 py-2 px-4 "

            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-green group-hover:translate-x-2 transition duration-200"
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
        </nav>
      </header>
      <Sidebar
        open={open}
        setOpen={setOpen}
        menuItems={menuItems}
      />
    </>
  );
};

export default AppNav;
