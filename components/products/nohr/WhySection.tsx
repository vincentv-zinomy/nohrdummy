import Image from "next/image";
import whyimage1 from '@/assets/images/products/leadfix/WhySection/whysection1.svg'
import whyimage2 from '@/assets/images/products/leadfix/WhySection/whysection2.svg'
import whyimage3 from '@/assets/images/products/leadfix/WhySection/whysection3.svg'
import whyimage4 from '@/assets/images/products/leadfix/WhySection/whysection4.svg'
import Link from "next/link";

const WhySection = () => {
  
  return (
    <section className="bg-white">
      <div className="max-w-[56.9375rem] flex flex-col gap-12 md:gap-24 mx-auto px-5 py-14 md:py-28">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              Intelligent and Human interactions
            </h3>
            <p className="text-brand-gray-300 mt-3">
              NoHR is trained to deliver magical, human-like interactions with
              the candidates. It is also intelligent - It stays focussed on its
              task, which is to schedule an interview.
            </p>

            <Link
              href="/signin"
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>

          <div className="">
            <Image src={whyimage1} alt="img" className="w-full h-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="order-2 md:order-1">
            <Image src={whyimage2} alt="img" className="w-full h-full" />
          </div>

          <div className="order-1 md:order-2 font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              Smart Scheduling
            </h3>
            <p className="text-brand-gray-300 mt-3">
              NoHR integrates with your google calendar to smartly schedule the
              interviews within the available time slots of the interviewing
              panel members
            </p>

            <Link
              href="/signin"
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              Centralized Dashboard
            </h3>
            <p className="text-brand-gray-300 mt-3">
              Get a complete status of each candidate interaction for each job
              in one single dashboard view
            </p>

            <Link
              href="/signin"
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>

          <div>
            <Image src={whyimage3} alt="img" className="w-full h-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="order-2 md:order-1">
            <Image src={whyimage4} alt="img" className="w-full h-full" />
          </div>

          <div className="order-1 md:order-2 font-outfit text-center md:text-left">
            <h3 className="text-brand-dark font-bold text-2xl md:text-28 md:leading-9">
              Easy Whatsapp Integration
            </h3>
            <p className="text-brand-gray-300 mt-3">
              Just link your company&apos;s whatsapp business account or use a
              new one to get started
            </p>

            <Link
              href="/signin"
              className="group mx-auto lg:mx-0 inline-flex items-center space-x-2.5 bg-brand-blue-100 font-semibold text-white rounded-full hover:bg-white hover:text-brand-blue-100 border border-brand-blue-100 transition duration-200 py-2 px-4 mt-5 md:mt-7"
            >
              <span>Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-blue-100 group-hover:translate-x-2 transition duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
