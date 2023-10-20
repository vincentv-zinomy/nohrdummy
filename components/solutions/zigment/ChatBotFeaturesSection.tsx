import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'
import bot from '@/assets/images/solutions/section3.png'
import Image from 'next/image'

const features = [
  {
    name: 'The Brain Behind the Bot',
    description:
      "Zigment isn’t just coded commands. It's machine learning, continually optimizing for your business goals.",
    icon: GlobeAltIcon,
  },
  {
    name: "24/7 Servicing, No Breaks",
    description:
      "Most bots are limited by office hours or time zones. Zigment works round the clock to make sure no lead goes cold.",
    icon: ScaleIcon,
  },
  {
    name: "From Leads to Loyalty ",
    description:
      "Zigment does more than just convert leads; it starts the process of turning them into loyal customers.",
    icon: BoltIcon,
  },
]


export default function Example() {
  return (
    <div className="overflow-hidden bg-gray-50    ">
      <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
        <svg
          className="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

       

        <div className="relative my-12  flex items-center justify-between">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Not Just Another Chatbot
</h3>
           

            <dl className="mt-10 space-y-10">
              {features.map((item:any) => (
                <div key={item.name} className="relative bg-white px-4 py-3 rounded-md border">
                  <dt>
                   
                    <p className="  text-lg font-medium leading-6 text-gray-900">{item.name}</p>
                  </dt>
                  <dd className="mt-2  text-base text-gray-500">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative w-1/2 shrink-0  " aria-hidden="true">
            
            <Image
              className="relative mx-auto w-3/4 object-fit "
              width={490}

              src={bot}
              alt=""
            />
          </div>
        </div>

     
      </div>
    </div>
  )
}
