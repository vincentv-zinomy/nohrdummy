import Image from 'next/image'
import Link from 'next/link'
import React from 'react'   
import whyImage1 from "@/assets/images/solutions/nohr/why/img-1.svg";
import whyImage2 from "@/assets/images/solutions/nohr/why/img-2.svg";
import whyImage3 from "@/assets/images/solutions/nohr/why/img-3.svg";
import whyImage4 from "@/assets/images/solutions/nohr/why/img-4.svg"



const WhySection = () => {
    const features = [
        {
            image: whyImage1,
            heading: 'Intelligent, Human-like Interactions',
            para: 'NoHR.ai delivers engaging, human-like interactions while staying task-focused to schedule interviews.'
        },
        {
            image: whyImage2,
            heading: 'Smart Scheduling',
            para: 'NoHR.ai integrates with your Google calendar to intelligently schedule interviews within available time slots.'
        },
        {
            image: whyImage3,
            heading: 'Centralized Dashboard',
            para: 'Get a single view of each candidate interaction for each job through a centralized dashboard.'
        },
        {
            image: whyImage4,
            heading: 'Easy Whatsapp Integration',
            para: 'Quickly link your company&apos;s Whatsapp business account, or create a new one to start.'
        }
    ]
  return (
    <section className="bg-brand-blue-100/20">
    <div className="max-w-[56.9375rem] flex flex-col gap-12 md:gap-24 mx-auto px-5 py-14 md:py-28">


      {features.map((x: any, i: number) => (
        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16"
          style={{
            direction: i % 2 === 0 ? 'rtl' : 'ltr'
          }}
        >
          <div className="order-2 md:order-1">
            <Image src={x.image} alt="img" className="w-full h-full" />
          </div>

          <div className="order-1 md:order-2 font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              {x.heading}
            </h3>
            <p className="text-brand-gray-300 mt-3">
              {x.para}
            </p>

            <Link
              href="/signin"
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-inherit hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
              style={{
                direction: i % 2 === 0 ? 'ltr' : 'ltr'
              }}
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default WhySection