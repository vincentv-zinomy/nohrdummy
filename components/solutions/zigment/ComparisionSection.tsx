import { BoltIcon, EnvelopeIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'


const transferFeatures = [
  {
    id: 1,
    name: 'Immediate Response vs. Delays',
    description:
      'When most systems are still queuing, Zigment has already engaged the lead.',
  },
  {
    id: 2,
    name: 'Multi-Channel Capability vs. Single Focus',
    description:
      'Zigment is everywhere your customers are, while other systems force you to pick a platform.',
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: 'AI-Learning vs. Static Scripts',
    description:
      "Zigment improves with every interaction; conventional tools just repeat themselves.",
    icon: BoltIcon,
  },
  {
    id: 4,
    name: 'Easy Integration vs. Complicated Set-Up',
    description:
      "One click and you're ready with Zigment, as opposed to a maze of configurations elsewhere.",
    icon: BoltIcon,
  },
  {
    id: 5,
    name: 'Cost-Effectiveness vs. Human Resources ',
    description:
      "Why burn payroll when you can achieve more for less?",
    icon: BoltIcon,
  },
]
 

export default function Features() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl py-24 px-6  ś lg:px-8 ">
        <svg
          className="absolute top-0 left-full -translate-x-1/2 -translate-y-3/4 transform lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-100" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)" />
        </svg>

        <div className="relative    ">
          <div className=" ">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Why Choose Zigment</h2>
          </div>
          <dl className="mt-10 max-w-4xl w-full flex flex-wrap  gap-y-5 gap-x-5 items-center justify-center mx-auto">
            {transferFeatures.map((feature) => (
              <div key={feature.name} className='  w-[400px] bg-white border px-3 py-2 rounded-md'>
                <dt className=''>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl   text-white">
                    <Image src={'/zigment.svg'} alt='' width={10} height={10} className='w-8 h-8'/>
                  </div>
                  <p className="mt-2 text-lg font-semibold leading-8 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
