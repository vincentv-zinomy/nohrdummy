import Image from "next/image";

import ImgHello from "@/assets/images/products/nohr/IntrodSection/img-hello.svg";

import IconGreenTitle from "@/assets/images/products/nohr/IntrodSection/icon-green-title.svg";
import IconPlay from "@/assets/images/products/nohr/IntrodSection/icon-play.svg";
import IconLine from "@/assets/images/products/nohr/IntrodSection/icon-line.svg";
import { useRouter } from "next/navigation";
import posthog from 'posthog-js';
import { useRef, useState } from "react";
import thumbnailImage from '@/assets/images/products/nohr/IntrodSection/thumbnail.jpeg'

const IntrodSection = () => {
  const router = useRouter();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageClick = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  

  
  return (
    <section>
      
      <div className="max-w-5xl mx-auto px-5 py-12 md:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center font-outfit">
          <h2 className="font-bold text-3xl md:text-40">
            Say Hello to
            <span className="relative inline-flex justify-center items-center">
              <span className="ml-2">
                No
                <span className="text-brand-green">HR</span>
              </span>

              <div className="absolute w-[140%]">
                <Image
                  src={IconGreenTitle}
                  alt="img"
                  className="w-full h-full"
                />
              </div>
            </span>
          </h2>
          <p className="md:text-lg text-brand-gray-300 mt-3">
            Let NoHR.ai coordinate with your shortlisted candidates to fix up
            interviews. Just enter the job description and feed the resumes. No
            human intervention needed!
          </p>
          <h3 className="text-2xl md:text-28 font-semibold text-brand-gray-300 mt-7">
            See how you can do this in the demo video
          </h3>
        </div>
        <div className="max-w-4xl h-60 sm:h-80 md:h-[30.875rem] mx-auto flex items-center justify-center bg-brand-pure rounded-[0.625rem] mt-5 md:mt-7 rounded-lg overflow-hidden cursor-pointer">
            <Image
              src={IconPlay}
              alt=""
              className={`absolute ${isVideoPlaying ? 'hidden' : 'block'}`}
              onClick={handleImageClick}
            />
            <Image
              className={`${isVideoPlaying ? 'hidden' : 'block'}`}
              src={thumbnailImage}
              alt="Video Thumbnail"
              onClick={handleImageClick}
            />
            <video controls   className={`w-full ${isVideoPlaying ? 'block' : 'hidden'}` } ref={videoRef}>
              <source src="https://drive.google.com/uc?export=download&id=1tCpC4j2irpWPL3GF9u8Vo4dj8MXEDY60" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
        <div className="grid lg:grid-cols-2 gap-y-10 mt-14 md:mt-20">
          <div>
            
            <Image
              className="aspect-square mx-auto lg:mx-0"
              src={ImgHello}
              alt="Image"
            />
          </div>
          <div className="font-outfit">
            <h3 className="text-xl text-brand-dark md:text-xl font-bold">
              Get started in just 2 steps
            </h3>
            <div className="relative space-y-5 sm:space-y-7 md:space-y-10 md:text-lg mt-5 md:mt-7">
              <div className="flex items-center space-x-4">
                <div className="relative bg-white z-30 w-12 h-12 shrink-0 grid place-content-center">
                  <div className="w-[2.125rem] h-[2.125rem] grid place-content-center rounded-full bg-brand-green text-white">
                    1
                  </div>
                </div>
                <p>Link your company website and provide basic details</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative bg-white z-30 w-12 h-12 shrink-0 grid place-content-center">
                  <div className="w-[2.125rem] h-[2.125rem] grid place-content-center rounded-full bg-brand-green text-white">
                    2
                  </div>
                </div>
                <p>
                  Enter the job description & feed the candidate resumes or just
                  the contact details
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative bg-white z-30 w-12 h-12 shrink-0 grid place-content-center">
                  <div className="w-[2.125rem] h-[2.125rem] grid place-content-center rounded-full bg-brand-green text-white">
                    3
                  </div>
                </div>
                <p>
                  NoHR interacts with candidates over whatsapp to schedule
                  interviews
                </p>
              </div>
              <Image
                className="absolute h-40 sm:h-44 md:h-auto left-6 top-3"
                src={IconLine}
                alt="Line"
              />
            </div>
            <button
              className="group mx-auto lg:mx-0 flex items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-full hover:bg-white hover:text-brand-green border border-brand-green transition duration-200 px-4 py-2.5 md:py-3.5 md:px-7 mt-9"
              onClick={() => {
                posthog.capture('my event', { property: 'value' })
                router.push("/signin");
              }}
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-green group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntrodSection;
