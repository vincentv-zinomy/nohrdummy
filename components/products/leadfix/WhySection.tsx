import Image from "next/image";
import React from "react";
import whyimage1 from '@/assets/images/products/leadfix/WhySection/whysection1.svg'
import whyimage2 from '@/assets/images/products/leadfix/WhySection/whysection2.svg'
import whyimage3 from '@/assets/images/products/leadfix/WhySection/whysection3.svg'
import whyimage4 from '@/assets/images/products/leadfix/WhySection/whysection4.svg'

type Props = {};

export default function WhySection({}: Props) {
  return (
    <section className="bg-white">
      <div className="max-w-[56.9375rem] flex flex-col gap-12 md:gap-24 mx-auto px-5 py-14 md:py-28">
        <h2 className="font-bold text-4xl md:text-40 text-center w-full">
                Why Leadfix
        </h2>
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
            Intelligent and Humane interactions
            </h3>
            <p className="text-brand-gray-300 mt-3">
            leadfix is trained to deliver magical, human-like interactions with your prospective customers. It is also intelligent - It stays focussed on its task, which is to schedule a call.
            </p>
            <a
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
              href="/signin"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </a>
          </div>
          <div className="">
            <Image
              alt="img"
              loading="lazy"
              width="381"
              height="238"
              decoding="async"
              data-nimg="1"
              className="w-full h-full"
              src={whyimage1}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="order-2 md:order-1">
            <Image
              alt="img"
              loading="lazy"
              width="311"
              height="263"
              decoding="async"
              data-nimg="1"
              className="w-full h-full"
              src={whyimage2}
            />
          </div>
          <div className="order-1 md:order-2 font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              Smart Scheduling
            </h3>
            <p className="text-brand-gray-300 mt-3">
                leadfix integrates with your google calendar to smartly schedule the calls within the available time slots of the assigned sales team members
            </p>
            <a
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
              href="/signin"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              Centralized Dashboard
            </h3>
            <p className="text-brand-gray-300 mt-3">
                Get a complete status of each lead interaction and progress in one single dashboard view 
            </p>
            <a
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
              href="/signin"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </a>
          </div>
          <div>
            <Image
              alt="img"
              loading="lazy"
              width="425"
              height="206"
              decoding="async"
              data-nimg="1"
              className="w-full h-full"
              src={whyimage3}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="order-2 md:order-1">
            <Image
              alt="img"
              loading="lazy"
              width="319"
              height="266"
              decoding="async"
              data-nimg="1"
              className="w-full h-full"
              src={whyimage4}
            />
          </div>
          <div className="order-1 md:order-2 font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
            Easy SMS & Whatsapp Integration
            </h3>
            <p className="text-brand-gray-300 mt-3">
            Just link your company’s whatsapp business account or use a new one to get started
            </p>
            <a
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
              href="/signin"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
