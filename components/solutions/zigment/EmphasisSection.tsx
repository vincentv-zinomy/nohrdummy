/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import line from '@/assets/images/solutions/hero/line-shape-1.svg'
import Image from 'next/image';

export default function EmphasisSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-12 w-full">
        <div className="overflow-hidden  rounded-lg  flex   w-full items-center justify-center">
          <div className=" py-10 flex items-center justify-center w-full">
            <div className="lg:self-center">
              <div className="text-4xl font-bold tracking-tight mx-auto  ">
                <span className="block text-center">
                  Each moment a lead waits, its value depreciates. 
                </span>
                <div className="relative text-center">
                  Don't let your leads go cold, heat them up 
                </div>
                <div className="relative text-center ">
                  <div>
                    instantly with Zigment.
                  </div>
                  <div className="absolute top-8  inset-x-0 mx-auto">
                    <Image src={line} alt='' className='w-[400px]  mx-auto'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
           
        </div>
      </div>
    </div>
  );
}
