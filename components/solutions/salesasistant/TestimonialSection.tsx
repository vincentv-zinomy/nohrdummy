import { classNames } from '@/lib/common'
import { CheckIcon } from '@heroicons/react/24/outline'

const pricing = {
  tiers: [
    {
      title: 'Coaching4Life',
      price: 24,
      frequency: '/month',
      description: "We use Zigment to maintain round-the-clock community engagement. It's like having an extra employee, without the cost.",
      features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
      cta: 'Monthly billing',
      mostPopular: false,
    },
    {
      title: 'WellnessWiz',
      price: 32,
      frequency: '/month',
      description: "Zigment automates our FAQs and even schedules sessions. More time for us to focus on wellness programs.",
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      cta: 'Monthly billing',
      mostPopular: true,
    },
    {
      title: 'Testimonial from Coaching4Life CEO',
      price: 48,
      frequency: '/month',
      description: "Zigment revolutionized how we engage with our community. It's our secret weapon for growth.",
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom integrations',
      ],
      cta: 'Monthly billing',
      mostPopular: false,
    },
  ],
}

 
export default function TestimonialSection() {
  return (
    <div className="mx-auto max-w-7xl bg-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl text-center sm:leading-none lg:text-3xl">
      Real Coaches, Real Results

      </h2>
      

      {/* Tiers */}
      <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.title}
            className="relative flex flex-col rounded-md border border-gray-100 bg-gray-100   p-5 shadow-sm"
          >
            <div className="flex-1 flex-col flex justify-between">
              

                <div className='    text-sm'>
                     <p className="  text-gray-600 inline">" {tier.description} "</p> 
                </div>
                <h3 className="  mt-4 font-semibold text-gray-900">{tier.title}</h3>

              
            </div>

         
          </div>
        ))}
      </div>
    </div>
  )
}
