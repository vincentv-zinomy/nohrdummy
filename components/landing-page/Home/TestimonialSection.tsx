'use client';

import Image from 'next/image'
import React from 'react'
import titlecircle from '@/assets/Home/TestimonialSection/OBJECTS.svg'
import Slider from './Slider'

import "swiper/css";
import "swiper/css/navigation";

const TestimonialSection = () => {
    return (
        <section className='relative gradient'>
            <div className='max-w-5xl mx-auto text-center px-5 py-14 md:py-20 lg:pt-24 lg:pb-32'>
                <h2 className="font-bold text-4xl md:text-40">
                    What People
                    <span className="inline-flex justify-center items-center ml-2">
                        Say
                        <Image alt="Icon" loading="lazy" width="108" height="65" decoding="async" data-nimg="1" className="absolute" src={titlecircle} />
                    </span>
                </h2>
                <div className='mt-5 sm:mt-14 md:mt-16'>

                    <Slider />

                </div>

            </div>
        </section>
    )
}

export default TestimonialSection