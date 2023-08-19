import React from "react";
import blueIcon from "@/assets/images/products/leadfix/HeroSection/icon-green.svg";
import Image from "next/image";
import Underlinecurve from "@/assets/images/products/leadfix/ProblemStatement/underlinecurve.svg";
import Face1 from "@/assets/images/products/leadfix/ProblemStatement/Face1.svg";
import Face3 from "@/assets/images/products/leadfix/ProblemStatement/face3.svg";
import Face2 from "@/assets/images/products/leadfix/ProblemStatement/Face2.svg";
import Face4 from "@/assets/images/products/leadfix/ProblemStatement/Face4.svg";
import Face5 from "@/assets/images/products/leadfix/ProblemStatement/Face5.svg";
import Face6 from "@/assets/images/products/leadfix/ProblemStatement/Face6.svg";
import curve from "@/assets/images/products/leadfix/ProblemStatement/curve.svg";
import iconGreenRound from "@/assets/images/products/leadfix/ProblemStatement/icon-green-round.ac86d733.svg";
import arrow from "@/assets/images/products/leadfix/ProblemStatement/arrow.svg";

const ProblemStatement = () => {
  return (
    <section className="relative gradient ">
      <div className="max-w-base mx-auto flex flex-col lg:flex-row justify-between gap-y-10 items-center px-5 py-7 md:py-9 lg:py-11">
        <div className="relative w-[13.875rem] min-h-[20.625rem]">
          <Image src={Face1} alt="face1" className="absolute left-1/2" />
          <Image src={Face3} alt="" className="absolute left-0 top-[30%]" />
          <Image src={Face2} alt="" className="absolute bottom-0 left-1/2" />
          <Image src={curve} alt="" className="absolute bottom-0 left-10" />
        </div>

        <h2 className="relative max-w-2xl text-center text-2xl lg:text-4xl md:text-35 font-bold md:leading-10 text-brand-dark">
          <Image
            src={blueIcon}
            alt=""
            className="w-12 h-12 absolute md:-left-10 -top-10 "
          />
          Are you tired of the back-and-forth involved in scheduling calls with
          the prospective customers?
          <Image src={Underlinecurve} alt="" className="ml-36 mt-2" />
        </h2>

        <div className="relative w-[13.875rem] min-h-[20.625rem]">
          <Image src={Face5} alt="face5" className="absolute right-20" />
          <Image
            src={Face4}
            alt="face4"
            className="absolute right-0 top-[30%]"
          />
          <Image
            src={Face6}
            alt="face6"
            className="absolute bottom-0 right-1/2"
          />
          <Image
            src={iconGreenRound}
            alt=""
            className="absolute bottom-1/2 left-[30%]"
          />
        </div>
      </div>
      <div className="absolute -bottom-20 left-1/2 translate-x-1/2">
        <Image src={arrow} alt="" />
      </div>
    </section>
  );
};

export default ProblemStatement;
