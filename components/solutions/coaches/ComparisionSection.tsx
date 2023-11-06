
import img from '@/assets/images/solutions/comparision/img_58.png'
import Image from 'next/image'
import line from '@/assets/images/solutions/hero/line-shape-1.svg'
import circle from '@/assets/images/solutions/circle.svg'
import Feature from '../Feature'
import Comparision from '../Comparision'

const transferFeatures = [
  {
    id: 1,
    name: 'Adaptable Engagement',
    description:
      "Zigment learns; others just respond.",
  },
  {
    id: 2,
    name: 'Budget-Friendly',
    description:
      'No salaries. No training.',
  },
  {
    id: 3,
    name: 'Multi-Channel Support',
    description:
      "From Instagram to Email, we've got it covered.",
  },
  {
    id: 4,
    name: 'Effortless Setup',
    description:
      "Minutes, not hours.",
  },
  {
    id: 5,
    name: 'Content Focus',
    description:
      "More time for what you do best..",
  },
   
]
 

export default function ComparisionSection() {
  return (
    <div className="overflow-hidden  bg-[#fdf3e7] md:m-4 rounded-md  py-16  ">
      <div className="relative mx-auto max-w-xl  pr-6 lg:max-w-7xl lg:pr-8">
        

    

        <div className="relative     lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="relative flex items-center justify-center mt-4 lg:mt-0" aria-hidden="true">
             
             <Image
               
               className="w-[400px] relative z-[10]"
               width={500}
               height={500}
               src={img}
               alt=""
             />
             <Image
               
               className="w-[150px] absolute -bottom-16 left-7"
               width={500}
               height={500}
               src={circle}
               alt=""
             />
           </div>
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              <div>
              Why Zigment Over Others?
              </div>
              <Image src={line} alt='' className='w-[300px]  '/>

              
            </h3>
            {/* <p className="mt-3 text-lg text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi recusandae, porro maiores
              officia assumenda aliquam laborum ab aliquid veritatis impedit odit adipisci optio iste blanditiis facere.
              Totam, velit.
            </p> */}

            <dl className="mt-10 space-y-3">
              {transferFeatures.map((item) => (
                 <Comparision item={item} key={`feature_key_${item.id}`}/>
              ))}
            </dl>
          </div>

         
        </div> 
      </div>
    </div>
  )
}
