import {
  BoltIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'
import bot from '@/assets/images/solutions/section3.png'
import Image from 'next/image'
import img from '@/assets/images/solutions/features/feature-img-08.png'
import line from '@/assets/images/solutions/hero/line-shape-1.svg'

import Feature from '../Feature'
 

const transferFeatures = [
  {
    id: 1,
    name: 'Thoughtful Interactions',
    description:
      "We don't just reply; we engage meaningfully with your audience.",
  },
  {
    id: 2,
    name: 'Smart and Learning',
    description:
      "We're always learning from your community to serve them better.",
  },
  {
    id: 3,
    name: 'Beyond Basic',
    description:
      "Conventional bots have limits; we're out here pushing boundaries.",
  }, 
]
 

export default function Features() {
  return (
    <div className="overflow-hidden  py-16  ">
      <div className="relative mx-auto max-w-xl pl-6 lg:max-w-7xl lg:pl-8">
        

    

        <div className="relative     lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              <div>
              We're Not Just 

              </div>
              <Image src={line} alt='' className='w-[300px]  '/>

              <div className='-mt-3'>
              Another Bot 
              </div>
            </h3>
            {/* <p className="mt-3 text-lg text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi recusandae, porro maiores
              officia assumenda aliquam laborum ab aliquid veritatis impedit odit adipisci optio iste blanditiis facere.
              Totam, velit.
            </p> */}

            <dl className="mt-10 space-y-5">
              {transferFeatures.map((item) => (
                 <Feature item={item} key={`feature_key_${item.id}`}/>
              ))}
            </dl>
          </div>

          <div className="relative flex items-center justify-end mt-10 lg:mt-0" aria-hidden="true">
             
            <Image
              
              className="w-[490px] relative ml-auto"
              width={500}
              height={500}
              src={img}
              alt=""
            />
          </div>
        </div> 
      </div>
    </div>
  )
}

