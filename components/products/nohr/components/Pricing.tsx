import Image from "next/image";

import IconGreentitle from "../assets/pricing/icon-green-title.svg";
import IconCheck from "../assets/pricing/icon-check.svg"; 
import Link from "next/link";

const Pricing = () => {
  return (
    <section className="bg-white " id="pricing">
      <div className="max-w-[66.875rem] mx-auto px-0 sm:px-5 py-14 md:py-28">
        <h2 className="relative flex items-center justify-center font-outfit font-bold text-3xl md:text-40">
          Pricing
          <div className="absolute">
            <Image src={IconGreentitle} alt="vector" />
          </div>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 font-outfit gap-5 px-10 sm:px-0 md:gap-8 mt-20">
          <div className="border border-brand-gray-200 rounded-[1.875rem] group hover:border-brand-green">
            <h3 className="text-center font-bold text-brand-dark text-2xl py-4 md:py-5">
              Small Biz
            </h3>

            <div className="border-t border-brand-gray-200"></div>

            <div className="px-5 md:px-9 py-3 md:py-5">
              <h3 className="font-bold text-2xl md:text-35 text-brand-green">
                $49
              </h3>
              <p className="inline-block rounded-full border border-brand-blue text-sm px-3 py-2 mt-4">
                PER MONTH
              </p>
            </div>

            <div className="border-t border-brand-gray-200"></div>

            <div className="px-5 md:px-9 py-3 md:py-5">
              <div className="flex items-start gap-2 shrink-0">
                <div className="w-5 h-5 rounded-full bg-brand-green flex justify-center items-center mt-2">
                  <Image src={IconCheck} alt="check" />
                </div>
                <div className="flex-1">
                  <p className="md:text-lg leading-5">
                    Up to 15 interviews scheduled /Mo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 shrink-0 mt-5">
                <div className="w-5 h-5 rounded-full bg-brand-green flex justify-center items-center mt-2">
                  <Image src={IconCheck} alt="check" />
                </div>
                <div className="flex-1">
                  <p className="md:text-lg leading-5">
                    1000 whatsapp messages credit
                  </p>
                </div>
              </div>
            </div>

            <div className="px-3 md:px-6 pt-4 pb-5 sm:pb-8">
              <Link
                href="/signin"
                className="w-full flex justify-center items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-full group-hover:bg-white group-hover:text-brand-green border border-brand-green transition duration-200 py-3"
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
            </div>
          </div>

          <div className="border border-brand-gray-200 rounded-[1.875rem] group hover:border-brand-green">
            <h3 className="text-center font-bold text-brand-dark text-2xl py-4 md:py-5">
              Medium
            </h3>

            <div className="border-t border-brand-gray-200"></div>

            <div className="px-5 md:px-9 py-3 md:py-5">
              <h3 className="font-bold text-2xl md:text-35 text-brand-green">
                $99
              </h3>
              <p className="inline-block rounded-full border border-brand-blue text-sm px-3 py-2 mt-4">
                PER MONTH
              </p>
            </div>

            <div className="border-t border-brand-gray-200"></div>

            <div className="px-5 md:px-9 py-3 md:py-5">
              <div className="flex items-start gap-2 shrink-0">
                <div className="w-5 h-5 rounded-full bg-brand-green flex justify-center items-center mt-2">
                  <Image src={IconCheck} alt="check" />
                </div>
                <div className="flex-1">
                  <p className="md:text-lg leading-5">
                    Up to 50 interviews scheduled /Mo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 shrink-0 mt-5">
                <div className="w-5 h-5 rounded-full bg-brand-green flex justify-center items-center mt-2">
                  <Image src={IconCheck} alt="check" />
                </div>
                <div className="flex-1">
                  <p className="md:text-lg leading-5">
                    3000 whatsapp messages credit
                  </p>
                </div>
              </div>
            </div>

            <div className="px-3 md:px-6 pt-4 pb-5 sm:pb-8">
              <Link
                href="/signin"
                className="w-full flex justify-center items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-full group-hover:bg-white group-hover:text-brand-green border border-brand-green transition duration-200 py-3"
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
            </div>
          </div>

          <div className="border border-brand-gray-200 rounded-[1.875rem] group hover:border-brand-green">
            <h3 className="text-center font-bold text-brand-dark text-2xl py-4 md:py-5">
              Large
            </h3>

            <div className="border-t border-brand-gray-200"></div>

            <div className="px-5 md:px-9 py-3 md:py-5">
              <h3 className="font-bold text-2xl md:text-35 text-brand-green">
                $149
              </h3>
              <p className="inline-block rounded-full border border-brand-blue text-sm px-3 py-2 mt-4">
                PER MONTH
              </p>
            </div>

            <div className="border-t border-brand-gray-200"></div>

            <div className="px-5 md:px-9 py-3 md:py-5">
              <div className="flex items-start gap-2 shrink-0">
                <div className="w-5 h-5 rounded-full bg-brand-green flex justify-center items-center mt-2">
                  <Image src={IconCheck} alt="check" />
                </div>
                <div className="flex-1">
                  <p className="md:text-lg leading-5">
                    Up to 100 interviews scheduled /Mo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 shrink-0 mt-5">
                <div className="w-5 h-5 rounded-full bg-brand-green flex justify-center items-center mt-2">
                  <Image src={IconCheck} alt="check" />
                </div>
                <div className="flex-1">
                  <p className="md:text-lg leading-5">
                    6000 whatsapp messages credit
                  </p>
                </div>
              </div>
            </div>

            <div className="px-3 md:px-6 pt-4 pb-5 sm:pb-8">
              <Link
                href="/signin"
                className="w-full flex justify-center items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-full group-hover:bg-white group-hover:text-brand-green border border-brand-green transition duration-200 py-3"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
