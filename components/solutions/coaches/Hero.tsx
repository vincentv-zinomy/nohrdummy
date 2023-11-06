import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import hero from  '@/assets/images/solutions/ils-01.png'
import Image from 'next/image'
import line from '@/assets/images/solutions/hero/line-shape-1.svg'
 
 

export default function Example() {
  return (
    <div className="relative  ">
     

      <main className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <div className='relative'>
                <p className="block xl:inline">Engage More,  </p>{' '}
                <Image src={line} alt='' className='w-[300px]  '/>
              </div>
              <span className="block -mt-4 xl:inline">Stress Less</span>
            </h1>
            {/* <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p> */}
            <div className="mt-10  ">
              <div className="rounded-md w-11/12 flex items-center relative shadow">
                <input
                  type='text'
                  className="flex w-full items-center justify-center rounded-md border border-2  px-8 py-3 text-base font-medium  md:py-4 md:px-10 md:text-lg"
                /> 
                <button className=' absolute bg-red-500 rounded-md right-2 text-white font-semibold px-8 py-3'>
                  Get Started
                </button>
              </div>
              <div className='flex items-center gap-4 mt-4'>
                <div className='flex items-center gap-1.5 '>
                  <CheckIcon className='w-4 h-4 text-black'/>
                  <p>Live chat</p>
                </div>
                <div className='flex items-center gap-1.5'>
                  <CheckIcon className='w-4 h-4 text-black'/>
                  <p>Ticketing</p>
                </div>
                <div className='flex items-center gap-1.5'>
                  <CheckIcon className='w-4 h-4 text-black'/>
                  <p>14 days free trial</p>
                </div>
              </div>
           
            
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-2 lg:h-full lg:w-1/2">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={hero}
            alt=""
            width={500}
            height={500}
          />
        </div>
      </main>
    </div>
  )
}
