 



import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'

import img1 from '@/assets/images/solutions/howworks/ils_10.svg'
import img2 from '@/assets/images/solutions/howworks/ils_11.svg'
import img3 from '@/assets/images/solutions/howworks/ils_12.svg'
import Image from 'next/image'
import line from '@/assets/images/solutions/hero/line-shape-1.svg'

 

export default function HowWorksSections() {
  return (
    <div className="overflow-hidden   py-16  ">
      <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
        
        <div className="relative">
          <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          How It Works in 3 Easy Steps

            <Image src={line} alt='' className='w-[250px] absolute mx-auto inset-x-0 -bottom-4'/>
          </h2>
          
        </div>

        <div className="relative mt-12   lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Quick Setup</h3>
            <p className="mt-3 text-lg text-gray-500">
            Just a few clicks and you're good to go.

            </p>

            
          </div>

          <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
             
            <Image
              className="relative mx-auto"
              width={490}
              src={img1}
              alt=""
            />
          </div>
        </div>

         

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Customization</h3>
              <p className="mt-3 text-lg text-gray-500">
              Tell Zigment what you want to say and how you want to say it.

              </p>

               
            </div>

            <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
               
              <Image
                className="relative mx-auto"
                width={490}
                src={img2}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="relative mt-12   lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Engage and Relax
</h3>
            <p className="mt-3 text-lg text-gray-500">
            Watch your community grow while you focus on what you're best at.


            </p>

            
          </div>

          <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
             
            <Image
              className="relative mx-auto"
              width={490}
              src={img3}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
