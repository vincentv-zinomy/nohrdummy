import img from '@/assets/images/solutions/section2.png'
import Image from 'next/image'

const faqs = [
  {
    question: 'Your 24/7 Community Manager',
    answer:
      "Hey, you're busy creating, coaching, and doing business stuff. Zigment's AI Sales Assistant keeps the community engaged while you focus on what matters. We're not sleeping, even if you are!",
  },
  {
    question: 'Cost-Efficient and Effective',
    answer:
      `Why hire a full-time manager when you can have an AI assistant doing the work round-the-clock? Cut down on human resources, and let technology do the heavy lifting.
      `,
  },
  {
    question: 'Adaptive and Smart',
    answer:
     `Unlike other bots, Zigment learns from interactions to provide a more authentic and personalized engagement. It's not just automated responses; it's conversational intelligence. 
     `,
  },
  {
    question: `Wait, Here's Something to Think About`,
    answer:
     `Engagement doesn't have to be expensive or exhausting. It can be effortless.
 
     `,
  },
  // More questions...
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className=" mx-auto space-y-10 lg:gap-8  "> 

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Three Pillars of Zigment: Why Coaches Love Us
  </h2>
              {/* <p className="mt-4 text-lg text-gray-500">
                Can’t find the answer you’re looking for? Reach out to our{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  customer support
                </a>{' '}
                team.
              </p> */}
            </div>
            <div className="mt-10 lg:col-span-2 flex gap-4 ">
             
              <div>
                <dl className="space-y-12 w-full  max-w-xl">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt className="text-lg font-medium leading-6 text-gray-900">{faq.question}</dt>
                      <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className='w-1/2  flex items-center justify-center'>
                <div className='w-3/4'>
                  <Image src={img} width={1000} className='w-full   object-cover' height={1000} alt="" />
                </div>
              </div>
            </div> 
         
        </div>
      </div>
    </div>
  )
}
