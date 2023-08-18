import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import leftArrow from "../../assets/Home/TestimonialSection/icon-arrow-left.cd6806ed.svg";
import rightArrow from "../../assets/Home/TestimonialSection/icon-arrow-right.ef593212.svg";
import Image from "next/image";
import Johndoe from "../../assets/Home/TestimonialSection/Ellipse24.png";
import bluecurve from "../../assets/Home/TestimonialSection/OBJECTS(1).svg";
import iconsQuoteTop from "../../assets/Home/TestimonialSection/icon-quote-top.d7aa55f6.svg";
import iconsQuoteBottom from "../../assets/Home/TestimonialSection/icon-quote-bottom.d839784c.svg";
import star from "../../assets/Home/TestimonialSection/icon-start.7d14c686.svg";

import profilepic2 from '../../assets/Home/TestimonialSection/1balance.svg'
import profilepic3 from '../../assets/Home/TestimonialSection/service_buddy_logo.webp'
import profilepic4 from '../../assets/Home/TestimonialSection/unigage_logo.jpeg'

const testimonials = [

  {
    name: "Srini",
    designation: "CMO, 1Balance",
    rating: 5,
    testimonial:
      " We have practically eliminated the role involved in co-ordinating with the candidates. Saving a lot of man-hours! ",
    profile: profilepic2
  },
  {
    name: "Tom S",
    designation: "Founded, ServiceBuddy.io",
    rating: 5,
    testimonial:
      "This is the best solution for a small / medium sized company like ours, we no longer need to hire an expensive full-time resource for the candidate out-reach task.",
    profile: profilepic3
  },
  {
    name: "Caleb",
    designation: "CEO, UniGage",
    rating: 5,
    testimonial:
      "I am blown over by the human-like interactions that NoHr's Ai is able to have with the potetial candidates. This is the future",
    profile: profilepic4
  },
];

const Slider = () => {
  return (
    <div className="max-w-48 min-h-[25rem] relative ">
      <button className="absolute left-0 top-[45%] pointer-events-none">
        <div className="prev z-30 left-0  relative sm:grid place-items-center w-10 h-10 shrink-0 rounded-full bg-brand-blue-100/10">
          <Image
            alt="Left Arrow"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="w-full h-full object-cover absolute left-1/3"
            src={leftArrow}
          />
        </div>
      </button>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-full min-h-[25rem]"
      >
        {testimonials.map((x) => (
          <SwiperSlide>
            <div>
              <div>
                <div className="relative flex items-center justify-between">
                  <Image
                    alt="Green Icon"
                    loading="lazy"
                    width="19"
                    height="18"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-0 left-0"
                    src={bluecurve}
                  />
                  <div className="relative flex items-center justify-center w-full">
                    <Image
                      className="mx-auto max-h-24 max-w-full" // Added max-w-full class
                      src={x.profile}
                      alt="Image"
                    />
                  </div>
                  <Image
                    alt="Green Icon"
                    loading="lazy"
                    width="19"
                    height="18"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-10 right-0"
                    src={bluecurve}
                  />
                </div>
                <h3 className="text-xl text-brand-dark md:text-xl font-bold mt-6">
                  {x.name}
                </h3>
              </div>
              <div>
                <Image
                  alt="Quote icon"
                  loading="lazy"
                  width="71"
                  height="71"
                  decoding="async"
                  data-nimg="1"
                  className="absolute w-14 h-14 sm:w-auto sm:h-auto top-12 md:top-5"
                  src={iconsQuoteTop}
                />
                <p className="md:text-lg text-[#908B8B]">{x.designation}</p>
                <div className="flex items-center justify-center gap-x-2 mt-4">
                  {[...Array(x.rating)].map((_, index) => (
                    <Image
                      key={index}
                      alt="star"
                      loading="lazy"
                      width="21"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      src={star}
                    />
                  ))}
                </div>
                <p className="max-w-[39.875rem] mx-auto font-medium text-brand-gray-300 mt-6 sm:mt-8">
                  {x.testimonial}.
                </p>
                <Image
                  alt="Quote icon"
                  loading="lazy"
                  width="71"
                  height="71"
                  decoding="async"
                  data-nimg="1"
                  className="absolute w-14 h-14 sm:w-auto sm:h-auto -bottom-5 right-0"
                  src={iconsQuoteBottom}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
      <button className="absolute right-0 top-[45%] pointer-events-none">
        <div className="prev z-30 left-0  relative sm:grid place-items-center w-10 h-10 shrink-0 rounded-full bg-brand-blue-100/10">
          <Image
            alt="Left Arrow"
            loading="lazy"
            width="47"
            height="47"
            decoding="async"
            data-nimg="1"
            className="absolute right-1/3"
            src={rightArrow}
          />
        </div>
      </button>
    </div>
  );
};

export default Slider;