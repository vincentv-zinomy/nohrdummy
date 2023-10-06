import React from "react";
import splash from "@/assets/Home/HeroSection/OBJECTS.svg";
import MeetingImage from "@/assets/Home/HeroSection/pana.svg";
import Image from "next/image";
import Arrow from "@/assets/Home/HeroSection/arrow.svg";

const Hero = (): any => {
  return (
    <section className="px-5 g">
      <div className="max-w-5xl mx-auto flex flex-col-reverse justify-between lg:flex-row items-center py-10 lg:py-14 ">
        <div className="overflow-x-clip relative max-w-md lg:max-w-md text-center lg:text-start pt-10 lg:pt-10  ">
          <div className="w-[240px] md:w-[320px] absolute top-8 left-[175px]  md:-right-11">
            <Image src={splash} alt="" />
          </div>
          <h1
            className="relative  z-2 text-3xl md:text-4xl lg:text-[42px] font-bold"
            style={{ lineHeight: "1.3" }}
          >
            Schedule <span className="text-white">Sales Calls</span> Without
            Spending Hours
          </h1>
          <p className="text-[20px] mx-auto lg:mx-0 w-96 mt-5">
            Your AI Sales assistant with superhuman abilities
          </p>
          <button className="group w-fit mx-auto lg:mx-0 flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 px-6 py-2.5 md:py-3.5 md:px-9 mt-6 md:mt-9"
            onClick={() => {
              window.location.href = "/signin";
            }}>
            <p>Get Started</p>
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
          <div className="absolute w-28 h-36 lg:w-auto lg:h-auto left-10 lg:left-1/2 lg:-translate-x-1/2">
            <Image src={Arrow} alt="arrow" />
          </div>
        </div>
        <div className="w-120">
          <Image src={MeetingImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
