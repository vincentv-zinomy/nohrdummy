import LandingPageLayout from "@/components/Layout/LandingPageLayout";
import {  WrenchIcon } from "@heroicons/react/24/outline";
import {
  LightBulbIcon,
  MagnifyingGlassIcon, 
} from "@heroicons/react/24/outline";
import Head from "next/head";
import React, { useState,ChangeEvent, useRef } from "react";
import whyimage1 from "@/assets/Home/WhySection/whysection1.svg";
import Image from "next/image";
import ImgHero from "@/assets/images/products/nohr/hero/img-hero.svg";
import SelectCountry from '@/components/SelectCountry'
import { COUNTRIES } from "@/lib/countries";
import ModalVideo1 from "@/components/ModalVideo1";
import videojs from 'video.js';
import { CalendarDaysIcon, ChartBarIcon, ChatBubbleBottomCenterTextIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon } from "@heroicons/react/24/outline"; 

const items = [
  {
    id: 1,
    title: "Keeping a focus on the problem",
    caption: `As builders it is easy to get married to a solution and not the problem`,
    icon: MagnifyingGlassIcon,
  },
  {
    id: 2,
    title: "Using technology as a tool",
    caption: `Keeping the problem and the end use case at the front and center`,
    icon: WrenchIcon ,
  },

  {
    id: 3,
    title: `Solutions need to reach a wider audience`,
    caption:
      "Having a great idea isnt enough, You need to think about how to take it to market",
    icon: LightBulbIcon,
  },
];

const steps = [
    {
      id: 1,
      title: "Intelligent, Human-like Interactions",
      description:
        "NoHR AI delivers engaging, human-like interactions, focusing on its task to schedule an interview.",
      icon:UserGroupIcon
    },
    {
      id: 2,
      title: "Smart Scheduling",
      description:
        "NoHR AI integrates with your Google calendar, scheduling interviews intelligently within the available time slots.",
        icon:CalendarDaysIcon
    },
    {
      id: 3,
      title: "Centralized Dashboard",
      description:
        "Gain a comprehensive overview of each candidate interaction for every job via a single dashboard view.",
        icon:ChartBarIcon
    },
    {
      id: 4,
      title: "Easy Whatsapp Integration",
      description:
        "Quickly connect your company&apos;s Whatsapp business account, or create a new one to get started.",
        icon:ChatBubbleBottomCenterTextIcon 
    },
  ];

 
 
function AboutUs() {

    const playerRef =  useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: "https://drive.google.com/uc?export=download&id=1tCpC4j2irpWPL3GF9u8Vo4dj8MXEDY60",
          type: 'video/mp4'
        }]
      };
    
      const handlePlayerReady = (player:any) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });
      };

  const [formData, setFormData] = useState({
    "first-name":"",
    "last-name":"",
    phone:'',
    email:'',
    company:'',
    country:COUNTRIES[0]
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <>
      <Head>
        <meta name="description" content="About Us | Zigment.ai" />
      </Head>
      <LandingPageLayout>
        <div className="bg-white">
          {/* Hero section */}
          <div className="overflow-hidden   lg:relative  ">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div>
                <div className="mt-20">
                  <div className="mt-6 sm:max-w-xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      Businesses of Future
                    </h1>
                    <p className="mt-6 text-xl text-gray-500">
                      World as we know is changing and changing fast. At Zinomy,
                      we are rebuilding the fundamental blocks of traditional
                      business with AI.
                    </p>
                    <p className="mt-6 text-xl text-gray-500">
                      We are building automation platform that helps businesses
                      automate real actionable tasks that typically require one
                      or more humans to work in sync to accomplish it. Functions
                      that we currently support are Sales, HR and Customer
                      Support.
                    </p>
                  </div>
                  
                </div>
              </div>
              <div className="mt-20 sm:max-w-xl">
                  <Image
                      alt="img"
                      loading="lazy"
                      width="500"
                      height="500"
                      decoding="async"
                      data-nimg="1"
                      src={ImgHero}/>
                </div>
            </div>
          </div>

            {/* Testimonial/stats section */}
            <div className="relative mt-20">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
              <div className="relative sm:py-16 lg:py-0">
                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20">
                  <div>
                    <ul role="list" className="space-y-3">
                      {items.map((item: any, i: number) => (
                        <li
                          key={item.id}
                          className="overflow-hidden   gap-4   bg-white px-6 py-4   border rounded-md"
                        >
                          <div className="p-3 bg-slate-200 w-fit h-fit rounded-md">
                            <item.icon className="w-6 h-6 " />
                          </div>
                          <div className="mt-2">
                            <h4 className="text-xl lg:text-2xl font-semibold">
                              {item.title}
                            </h4>
                            <p className="mt-1">{item.caption}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                {/* Content area */}
                <div className="pt-12 sm:pt-16 lg:pt-20">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    We innovate for better lives
                  </h2>
                  <div className="mt-6 space-y-6 text-gray-500">
                    <p className="text-lg">
                      Zinomy invests in solving real world problems with the
                      right use of latest gen AI and ML developments.
                    </p>
                    <Image
                      alt="img"
                      loading="lazy"
                      width="500"
                      height="500"
                      decoding="async"
                      data-nimg="1"
                      src={whyimage1}
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Contact Section */}
            <div className="relative bg-white">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
          </div>
          
          <div className="relative lg:mt-10 mx-auto max-w-7xl lg:grid lg:grid-cols-4">
            <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="mx-auto max-w-lg">
                <h2 className=" text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl  ">
                  Schedule Interviews Without Spending Hours
                </h2> 
                <div className="py-8">
                  <ul role="list" className="space-y-3">
                    {steps.map((item:any) => (
                      <li
                        key={item.id}
                        className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
                      >
                        <div className="sm:flex items-center">
                          <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                             <div className="w-12 h-12 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-brand-blue-100 ">
                             
                                <item.icon className="w-8 md:h-12 md:w-12 text-white group-hover:text-indigo-600" aria-hidden="true"/>
                             </div>
                          </div>
                          <div>
                            <h4 className="md:text-lg font-bold">{item.title}</h4>
                            <p className="mt-1 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className=" rounded-lg   my-auto pb-10 md:py-16 px-4 sm:px-6 lg:col-span-2 lg:py-24 lg:px-8 xl:pl-12  ">
              <div className="mx-auto max-w-lg lg:max-w-none md:p-10 md:border rounded-lg bg-white md:drop-shadow-md">
                <p className="mb-6 text-2xl font-semibold text-center">See How  NO<span className="text-brand-blue-100">HR</span>  Works</p>
                <form
                  action="#"
                  method="POST"
                  className="grid grid-cols-1 gap-y-6  "
                >
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="First name *"
                      required
                      value={formData["first-name"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Last name"
                      value={formData["last-name"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="sr-only">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company" 
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-brand-blue-100 focus:ring-brand-blue-100"
                      placeholder="Company *"
                      required
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="sr-only">
                      country
                    </label>
                    <SelectCountry formData={formData} setFormData={setFormData}/>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-brand-blue-100 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-brand-blue-100 focus:outline-none focus:ring-2 focus:ring-brand-blue-100 focus:ring-offset-2"
                    >
                      Request Demo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
        </div>
 

           
        </div>
      </LandingPageLayout>
    </>
  );
}

export default AboutUs;
