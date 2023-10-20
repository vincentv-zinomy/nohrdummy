import {
    BoltIcon,
    ChatBubbleBottomCenterTextIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    ScaleIcon,
  } from '@heroicons/react/24/outline'
  
//   const transferFeatures = [
//     {
//       id: 1,
//       name: 'Adaptable Engagement',
//       description:
//         ' Zigment learns; others just respond.',
//     },
//     {
//       id: 2,
//       name: 'Budget-Friendly',
//       description:
//         'No salaries. No training.',
//     },
//     {
//       id: 3,
//       name: 'Multi-Channel Support',
//       description:
//         "From Instagram to Email, we've got it covered.",
//     },
//     {
//       id: 4,
//       name: 'Effortless Setup',
//       description:
//         "Minutes, not hours.",
//     },
//     {
//       id: 5,
//       name: 'Content Focus',
//       description:
//         "More time for what you do best.",
//     },
//   ]

type Porps = {
    title: string,
    comparision: any[]
}
 
  
  export default function ComparisionSection({comparision, title}:Porps) {
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
  
           
  
          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="relative">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h3> 
              <dl className="mt-10 space-y-4">
                {comparision.map((item:any) => (
                  <div key={item.id} className="relative bg-white border px-2 py-2 rounded-md w-full flex gap-2">
                    <img src="/zigment.svg" className='w-6 h-6 mt-2' alt="" />
                    <div className=' '>
  
                    <dt>
                    
                      <p className="  text-lg font-medium leading-6 text-gray-900">{item.name}</p>
                    </dt>
                    <dd className="mt-2   text-base text-gray-500">{item.description}</dd>
                  </div>
                    </div>
                ))}
              </dl>
            </div>
  
            <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
              <svg
                className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
              >
                <defs>
                  <pattern
                    id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
              </svg>
              <img
                className="relative mx-auto"
                width={490}
                src="https://tailwindui.com/img/features/feature-example-1.png"
                alt=""
              />
            </div>
          </div>
  
          
        </div>
      </div>
    )
  }
  