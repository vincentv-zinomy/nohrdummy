import Image from "next/image";

import ImgPerson1 from "@/assets/images/products/nohr/problemstatement/img-person-1.svg";
import ImgPerson2 from "@/assets/images/products/nohr/problemstatement/img-person-2.svg";
import ImgPerson3 from "@/assets/images/products/nohr/problemstatement/img-person-3.svg";
import ImgPerson4 from "@/assets/images/products/nohr/problemstatement/img-person-4.svg";
import ImgPerson5 from "@/assets/images/products/nohr/problemstatement/img-person-5.svg";
import ImgPerson6 from "@/assets/images/products/nohr/problemstatement/img-person-6.svg";
import IconGreenTitle1 from "@/assets/images/products/nohr/problemstatement/icon-green-title-1.svg";
import IconGreenTitle2 from "@/assets/images/products/nohr/problemstatement/icon-green-title-2.svg";
import IconArrow from "@/assets/images/products/nohr/problemstatement/icon-arrow.svg";
import IconGreenRound from "@/assets/images/shared/icon-green-round.svg";

const ProblemStatement = () => {
  return (
    <section className="relative gradient">
      <div className="max-w-base mx-auto flex flex-col lg:flex-row justify-between gap-y-10 items-center px-5 py-7 md:py-9 lg:py-11">
        <div className="relative w-[13.875rem] min-h-[20.625rem]">
          <Image
            className="absolute left-1/2"
            src={ImgPerson1}
            alt="Person Image"
          />
          <Image
            className="absolute left-0 top-[30%]"
            src={ImgPerson2}
            alt="Person Image"
          />
          <Image
            className="absolute bottom-0 left-1/2"
            src={ImgPerson3}
            alt="Person Image"
          />
          <Image
            className="absolute bottom-0 left-10"
            src={IconGreenRound}
            alt="Icon"
          />
        </div>
        <div>
          <h2 className="relative max-w-2xl text-center text-2xl md:text-35 font-bold md:leading-10 text-brand-dark">
            <Image src={IconGreenTitle1} alt="Icon" />
            Are you tired of the back-and-forth involved in scheduling
            interviews with shortlisted candidates?
            <Image
              className="absolute left-1/4"
              src={IconGreenTitle2}
              alt="Icon"
            />
          </h2>
        </div>
        <div className="relative w-[13.875rem] min-h-[20.625rem]">
          <Image
            className="absolute right-20"
            src={ImgPerson4}
            alt="Person Image"
          />
          <Image
            className="absolute right-0 top-[30%]"
            src={ImgPerson5}
            alt="Person Image"
          />
          <Image
            className="absolute bottom-0 right-1/2"
            src={ImgPerson6}
            alt="Person Image"
          />
          <Image
            className="absolute bottom-1/2 left-[30%]"
            src={IconGreenRound}
            alt="Icon"
          />
          <Image
            className="absolute w-20 h-24 lg:hidden left-[70%] -bottom-[27%]"
            src={IconArrow}
            alt="Arrow Icon"
          />
        </div>
        <Image
          className="absolute hidden lg:block left-[60%] md:-bottom-[20%]"
          src={IconArrow}
          alt="Arrow Icon"
        />
      </div>
    </section>
  );
};

export default ProblemStatement;
