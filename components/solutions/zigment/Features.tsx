import { BoltIcon, EnvelopeIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'

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
const features = [
  {
    name: 'Quick as Lightning, Because Time Is Money',
    description: 'Say goodbye to the lag in lead engagement. Zigment minimizes human involvement by 10x, ensuring that leads are serviced almost instantly.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Human-Like, Without the Human',
    description:"Let's face it, staffing is expensive. Zigment provides an automated yet genuinely interactive experience that feels like a real conversation.",
    icon: ScaleIcon,
  },
  {
    name: 'One Dashboard, Multiple Channels ',
    description:
      'Control your engagement across all customer platforms—be it Facebook, WhatsApp, or email—from one single dashboard.',
    icon: BoltIcon,
  },
  {
    name: 'Smarter Over Time, Just Like You ',
    description:
      'The more Zigment engages with your leads, the smarter it gets. Continuous learning means continually improving results. ',
    icon: EnvelopeIcon,
  },
]

export default function Features() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
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

        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">4 Key Aspects of the Product</h2>
          </div>
          <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-lg font-semibold leading-8 text-gray-900">{feature.name}</p>
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
