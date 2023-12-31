import Image from "next/image";
import React from "react";
import blueTitle from "@/assets/Home/IntroSection/icon-green-title.d661a043.svg";
import imgHello from "@/assets/Home/IntroSection/img-hello.3c9879c2.svg";
import iconline from '@/assets/Home/IntroSection/icon-line.f1dda700.svg'

const IntrodSection = () => {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-5  py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center font-outfit">
          <h2 className="font-bold text-3xl md:text-40">
            Say Hello to{" "}
            <span className="relative inline-flex justify-center items-center">
              {" "}
              <span className="">Zigment</span>{" "}
              <div className="absolute w-[140%]">
                {" "}
                <Image src={blueTitle} alt="icon-green-title" />{" "}
              </div>{" "}
            </span>
          </h2>
          <p className="md:text-lg text-brand-gray-300 mt-3">
            {" "}
            Let Zigment.ai coordinate with your shortlisted prospects to fix up
            sales calls. Just enter your product or service description and feed
            the leads data. No human intervention needed!
          </p>
        </div>
        <div className="flex flex-col items-center mt-6">
          {/* <h4 className="text-2xl font-semibold text-center">See how you can do this in the demo video</h4> */}
          {/* <div className="bg-[#F4F4EB] w-9/12 h-96 mt-8">

          </div> */}
        </div>
        <div className="grid lg:grid-cols-2 gap-y-10 mt-14 md:mt-20">
          <div>
            <Image src={imgHello} alt="img-hello" />
          </div>
          <div className="font-outfit">
            <h3 className="text-xl text-brand-dark md:text-xl font-bold">
              Get started in just 2 steps
            </h3>
            <div className="relative space-y-5 sm:space-y-7 md:space-y-10 md:text-lg mt-5 md:mt-7">
              <div className="flex items-center space-x-4">
                <div className="relative bg-white z-30 w-12 h-12 shrink-0 grid place-content-center">
                  <div className="w-[2.125rem] h-[2.125rem] grid place-content-center rounded-full bg-brand-blue-100 text-white">
                    1
                  </div>
                </div>
                <p>Link your company website and provide basic details</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative bg-white z-30 w-12 h-12 shrink-0 grid place-content-center">
                  <div className="w-[2.125rem] h-[2.125rem] grid place-content-center rounded-full bg-brand-blue-100 text-white">
                    2
                  </div>
                </div>
                <p>
                  Enter the product description &amp; feed the lead resumes or
                  just the contact details
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative bg-white z-30 w-12 h-12 shrink-0 grid place-content-center">
                  <div className="w-[2.125rem] h-[2.125rem] grid place-content-center rounded-full bg-brand-blue-100 text-white">
                    3
                  </div>
                </div>
                <p> <span className="text-brand-blue-100">Zigment </span> interacts with prospects over whatsapp to schedule calls
                </p>
              </div>
              <Image
                alt="Line"
                loading="lazy"
                width="2"
                height="202"
                decoding="async"
                data-nimg="1"
                className="absolute h-40 sm:h-44 md:h-auto left-6 top-3"
                src={iconline}
              />
            </div>
            <button className="group mx-auto lg:mx-0 flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 px-4 py-2.5 md:py-3.5 md:px-7 mt-9">
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntrodSection;
