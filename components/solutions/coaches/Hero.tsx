/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import hero from '@/assets/images/solutions/hero.svg'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="bg-white   flex items-center justify-center " style={{height:'calc(100vh - 80px)'}}>
      <div className=" flex items-center   lg:relative px-10 justify-between">
        <div className="  max-w-lg pl-4   ">
          <div>
            
            <div className=" ">
              <div>
                <a href="#" className="inline-flex space-x-4">
                  <span className="rounded bg-indigo-50 px-2.5 py-1 text-sm font-semibold text-indigo-600">
                  For Coaches

                  </span>
                  {/* <span className="inline-flex items-center space-x-1 text-sm font-medium text-indigo-600">
                    <span>Just shipped version 0.1.0</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </span> */}
                </a>
              </div>
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Engage More, Stress Les
                </h1>
                {/* <p className="mt-6 text-xl text-gray-500">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p> */}
              </div>
                 
                <div className="mt-10   ">
                  <button
                    type="submit"
                    className="block w-fit rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                  >
                    Book A Demo
                  </button>
                </div>
              
            </div>
          </div>
        </div>

        <div className="  sm:max-w-lg sm:px-6    ">
          <Image src={hero} width={100} height={100} className='w-full h-full object-fit' alt="" />
        </div>
      </div>
    </div>
  )
}
