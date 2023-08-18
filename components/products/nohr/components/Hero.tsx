import Image from "next/image";
import IconArrow from "../assets/hero/icon-arrow.svg";
import ImgHero from "../assets/hero/img-hero.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="px-5">
      <div className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-center py-10 lg:py-14">
        <div className="relative max-w-md lg:max-w-sm font-outfit text-center lg:text-start mt-10 lg:mt-0">
          <h1 className="text-3xl md:text-4xl lg:text-42 font-bold text-brand-dark">
            Schedule
            <span className="relative">
              <span className="z-20 text-black"> Interviews </span>
              {/* <Image
                className="absolute right-0 top-0 -z-10"
                src={ImgGreen}
                alt="Green Image"
              /> */}
            </span>
            Without Spending Hours
          </h1>
          <p className="text-lg md:text-xl text-brand-gray-300 mt-3 md:mt-5">
            Your AI recruitment assistant with superhuman abilities
          </p>
          <Link
            href="/signin"
            className="group w-fit mx-auto lg:mx-0 flex items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-full hover:bg-white hover:text-brand-green border border-brand-green transition duration-200 px-6 py-2.5 md:py-3.5 md:px-9 mt-6 md:mt-9"
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
          </Link>
          <Image
            className="absolute w-28 h-36 lg:w-auto lg:h-auto left-10 lg:left-1/2 lg:-translate-x-1/2"
            src={IconArrow}
            alt="Arrow Icon"
          />
        </div>
        <div>
          <Image src={ImgHero} alt="Meeting Image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
