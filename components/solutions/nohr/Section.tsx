import React from 'react' 
import image1 from '@/assets/images/solutions/nohr/fintech/section2/section1.png'
 
import image2 from '@/assets/images/solutions/nohr/fintech/section2/section2.png'
import image3 from '@/assets/images/solutions/nohr/fintech/section2/section3.png'
import Image from 'next/image'
 

 

function Section2( ) {

    const content = {
        heading: 'From website leads to demos scheduled on calender',
        cards: [
            {
                src: image1,
                heading: 'Create your product pitch',
                para: 'Upload your product collaterals, add product pages from your website or Create a product profile from scratch'
            },
            {
                src: image2,
                heading: 'Connect your lead data',
                para: 'Connect all your leads data sources like website, store visits, webinars, emails, CRMs, etc'
            },
            {
                src: image3,
                heading: 'Automatic reachout to Leads',
                para: 'Sit back and relax as Leadfix starts a unique and personalized engagement channel with each of your leads and interacts with them until conversion'
            }
        ]
    }

    return (
        <section className='px-5'>
            <div className='w-full mx-auto  py-10 lg:py-14 border-y border-gray-100 lg:px-14'>
                <h2 className='font-bold text-2xl lg:text-3xl mb-4 text-center'>Boost your recruitment efficiency</h2>
                <div className='w-full flex flex-col lg:flex-row  gap-4 justify-center items-center lg:items-start		'>
                    {content.cards.map((x: any) =>
                        <div className='w-[350px] p-2 flex flex-col gap-3 '>
                            <div className='md:w-[250px] md:h-[250px] mx-auto flex items-center'>
                                <Image src={x.src} alt='' className='w-full' />
                            </div>
                            <h3 className='font-semibold text-xl xl:text-2xl'>{x.heading}</h3>
                            <p>{x.para}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Section2