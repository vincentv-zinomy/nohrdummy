import Image from "next/image";

import Face1 from "@/assets/images/products/leadfix/ProblemStatement/Face1.svg";
import Face3 from "@/assets/images/products/leadfix/ProblemStatement/face3.svg";
import Face2 from "@/assets/images/products/leadfix/ProblemStatement/Face2.svg";
import Face4 from "@/assets/images/products/leadfix/ProblemStatement/Face4.svg";
import Face5 from "@/assets/images/products/leadfix/ProblemStatement/Face5.svg";
import Face6 from "@/assets/images/products/leadfix/ProblemStatement/Face6.svg";
import blueIcon from "@/assets/images/products/leadfix/HeroSection/icon-green.svg";
import IconArrow from "@/assets/images/products/leadfix/ProblemStatement/arrow.svg";
import IconGreenRound from "@/assets/images/products/leadfix/ProblemStatement/icon-green-round.ac86d733.svg";
import Underlinecurve from "@/assets/images/products/leadfix/ProblemStatement/underlinecurve.svg";

const ProblemStatement = () => {
  return (
    <section className="relative gradient">
      <div className="max-w-base mx-auto flex flex-col lg:flex-row justify-between gap-y-10 items-center px-5 py-7 md:py-9 lg:py-11">
        <div className="relative w-[13.875rem] min-h-[20.625rem]">
          <Image
            className="absolute left-1/2"
            src={Face1}
            alt="Person Image"
          />
          <Image
            className="absolute left-0 top-[30%]"
            src={Face2}
            alt="Person Image"
          />
          <Image
            className="absolute bottom-0 left-1/2"
            src={Face3}
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
            <Image src={blueIcon} alt="Icon" />
            Are you tired of the back-and-forth involved in scheduling
            interviews with shortlisted candidates?
            <Image
              className="absolute left-1/4"
              src={Underlinecurve}
              alt="Icon"
            />
          </h2>
        </div>
        <div className="relative w-[13.875rem] min-h-[20.625rem]">
          <Image
            className="absolute right-20"
            src={Face4}
            alt="Person Image"
          />
          <Image
            className="absolute right-0 top-[30%]"
            src={Face5}
            alt="Person Image"
          />
          <Image
            className="absolute bottom-0 right-1/2"
            src={Face6}
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
