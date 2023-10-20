import img from '@/assets/images/solutions/section2.png'
import Image from 'next/image'

const faqs = [
  {
    question: 'The Freedom to Create',
    answer:
      "You're a coach. Your art is in your content and courses. Zigment lets you focus on that by taking care of customer engagement, 24/7. Illustration Description: A relaxed coach at a desk, focusing on their laptop with content creation tools, while a digital Zigment assistant takes care of incoming customer messages.",
  },
  {
    question: 'Convert While You Sleep',
    answer:
      `No more waking up to lost opportunities. Zigment converts leads into clients even when you're away. The AI engine adapts to the conversation and clinches the deal.
      Illustration Description: A sleeping coach with a dream bubble, showing the Zigment logo converting a question mark into a dollar sign.
      `,
  },
  {
    question: 'Smart Enough to be Your Second-in-Command',
    answer:
     `Let Zigment handle inquiries, book sessions, and even upsell your additional offerings. It's like having a digital manager, without the HR headaches.
     Illustration Description: Zigment as a digital assistant on a smartphone screen, displaying options for 'Inquiries,' 'Book Session,' and 'Upsell Courses.'
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
