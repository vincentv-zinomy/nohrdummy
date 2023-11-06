 
import Image from 'next/image'
import img from '@/assets/images/solutions/features/feature-img-08.png'
import line from '@/assets/images/solutions/hero/line-shape-1.svg'

import Feature from '../Feature'
 

const transferFeatures = [
  {
    id: 1,
    name: 'Zigment Gets You',
    description:
      "We understand your business and adapt our conversations to represent you authentically.",
  },
  {
    id: 2,
    name: 'From Zero to Hero',
    description:
      "Most bots plateau; Zigment keeps learning and improving.",
  },
  {
    id: 3,
    name: 'More than Just Replies',
    description:
      "We initiate conversations, capture leads, and even close deals. We're the complete package.",
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
              This Ain't Your Average Bot 

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

