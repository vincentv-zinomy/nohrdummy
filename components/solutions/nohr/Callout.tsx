import Image from "next/image";
import React from "react";
import calloutImage from './assets/callout/calloutimage.png'
import Link from "next/link";

type Props = {};

const Callout = (props: Props) => {
  return (
    <section className="px-5  ">
      <div className="w-full mx-auto flex flex-col gap-10 flex-col-reverse	 lg:flex-row justify-center items-center py-10 lg:py-14 border-y border-gray-100 md:px-12  mx-auto">
        <div className="lg:p-20">
          <h2 className="text-2xl md:text-4xl xl:text-5xl mb-8">Get started for free</h2>
          <p className="  mb-8">
            Get our free 1-month trial to experience the magic for yourself. We
            are constantly evolving and would love to hear from you if have any
            specific request for a feature or any integration.{" "}
          </p>
          <Link href="/signin" className="bg-brand-green text-white py-2 px-4 rounded-lg font-semibold text-lg">Start for free</Link>
        </div>
        <div className="w-full max-w-[300px] lg:max-w-[500px]">
          <Image src={calloutImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Callout;
