import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import IconGreenTitle from "@/assets/images/products/nohr/TestimonialSection/icon-green-title.svg"; 
import IconQuoteBottom from "@/assets/images/products/nohr/TestimonialSection/icon-quote-bottom.svg";
import IconQuoteTop from "@/assets/images/products/nohr/TestimonialSection/icon-quote-top.svg";
import IconArrowLeft from "@/assets/images/products/nohr/TestimonialSection/icon-arrow-left.svg";
import IconArrowRight from "@/assets/images/products/nohr/TestimonialSection/icon-arrow-right.svg";
import IconStar from "@/assets/images/products/nohr/TestimonialSection/icon-start.svg"; 
import IconGreenRound from "@/assets/images/shared/icon-green-round.svg";
import leftArrow from "@/assets/images/products/leadfix/TestimonialSection/icon-arrow-left.cd6806ed.svg";
import rightArrow from "@/assets/images/products/leadfix/TestimonialSection/icon-arrow-right.ef593212.svg";
import Johndoe from "@/assets/images/products/leadfix/TestimonialSection/Ellipse24.png";
import bluecurve from "@/assets/images/products/leadfix/TestimonialSection/OBJECTS(1).svg";
import iconsQuoteTop from "@/assets/images/products/leadfix/TestimonialSection/icon-quote-top.d7aa55f6.svg";
import iconsQuoteBottom from "@/assets/images/products/leadfix/TestimonialSection/icon-quote-bottom.d839784c.svg";
import star from "@/assets/images/products/leadfix/TestimonialSection/icon-start.7d14c686.svg";

import profilepic2 from '@/assets/images/products/leadfix/TestimonialSection/1balance.svg'
import profilepic3 from '@/assets/images/products/leadfix/TestimonialSection/service_buddy_logo.webp'
import profilepic4 from '@/assets/images/products/leadfix/TestimonialSection/unigage_logo.jpeg'

import titlecircle from '@/assets/images/products/leadfix/TestimonialSection/OBJECTS.svg' 

const data = [
  {
    id: 1,
    img: "/curejoy_logo.jpeg",
    name: "Naveen P",
    position: "COO, CureJoy",
    description:
      "We are seeing that our conversion rates of candidate response and also confirmed interviews improve significantly with NoHR.",
  },
  {
    id: 2,
    img: "/1balance.svg",
    name: "Srini",
    position: "CMO, 1Balance",
    description:
      " We have practically eliminated the role involved in co-ordinating with the candidates. Saving a lot of man-hours! ",
  },
  {
    id: 3,
    img: "/service_buddy_logo.webp",
    name: "Tom S",
    position: "Founder, ServiceBuddy.io",
    description:
      "This is the best solution for a small / medium sized company like ours, we no longer need to hire an expensive full-time resource for the candidate out-reach task.",
  },
  {
    id: 4,
    img: "/unigage_logo.jpeg",
    name: "Caleb",
    position: "CEO, UniGage",
    description:
      "I am blown over by the human-like interactions that NoHR’s AI is able to have with the potential candidates. This is the future.",
  },
];


const TestimonialSection = () => {
  return (
    <section className="relative gradient">
      <div className="max-w-5xl mx-auto text-center px-5 py-14 md:py-20 lg:pt-24 lg:pb-32">
        <h2 className="font-bold text-3xl md:text-40">
          What People
          <span className="inline-flex justify-center items-center ml-2">
            Say
            <Image className="absolute" src={titlecircle} alt="Icon" />
          </span>
        </h2>
        <div className="flex items-center justify-between mt-5 sm:mt-14 md:mt-16">
          <button className="prev relative hidden sm:grid place-items-center w-10 h-10 shrink-0 rounded-full bg-brand-green/10">
            <Image
              className="absolute left-1/3"
              src={leftArrow}
              alt="Left Arrow"
            />
          </button>
          <Swiper
            loop={true}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
            modules={[Navigation]}
            className="mySwiper min-h-[25rem] max-w-3xl mx-auto"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div>
                  <div className="relative flex items-center justify-between">
                    <Image
                      className="absolute top-0 left-0"
                      src={bluecurve}
                      alt="Green Icon"
                    />
                    <img
                      className="mx-auto max-h-24"
                      src={item.img}
                      alt="Image"
                    />
                    <Image
                      className="absolute top-10 right-0"
                      src={bluecurve}
                      alt="Green Icon"
                    />
                  </div>
                  <h3 className="text-xl text-brand-dark md:text-xl font-bold mt-6">
                    {item.name}
                  </h3>
                </div>
                <div className="relative font-outfit">
                  <Image
                    className="absolute w-14 h-14 sm:w-auto sm:h-auto top-12 md:top-5"
                    src={IconQuoteTop}
                    alt="Quote icon"
                  />
                  <p className="md:text-lg text-[#908B8B]">{item.position}</p>
                  <div className="flex items-center justify-center gap-x-2 mt-4">
                    <Image src={IconStar} alt="star" />
                    <Image src={IconStar} alt="star" />
                    <Image src={IconStar} alt="star" />
                    <Image src={IconStar} alt="star" />
                    <Image src={IconStar} alt="star" />
                  </div>
                  <p className="max-w-[39.875rem] mx-auto font-medium text-brand-gray-300 mt-6 sm:mt-8">
                    {item.description}
                  </p>
                  <Image
                    className="absolute w-14 h-14 sm:w-auto sm:h-auto -bottom-5 right-0"
                    src={IconQuoteBottom}
                    alt="Quote icon"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="next relative hidden sm:grid place-items-center w-10 h-10 shrink-0 rounded-full bg-brand-green/10">
            <Image
              className="absolute right-1/3"
              src={rightArrow}
              alt="Right Arrow"
            />
          </button>
        </div>
        <div className="flex sm:hidden items-center space-x-16 justify-center mt-16">
          <button className="prev relative grid place-items-center w-10 h-10 shrink-0 rounded-full bg-brand-green/10">
            <Image
              className="absolute left-1/3"
              src={IconArrowLeft}
              alt="Right Arrow"
            />
          </button>
          <button className="next relative grid place-items-center w-10 h-10 shrink-0 rounded-full bg-brand-green/10">
            <Image
              className="absolute right-1/3"
              src={IconArrowRight}
              alt="Right Arrow"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
