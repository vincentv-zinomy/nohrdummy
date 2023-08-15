import Image from "next/image";
import React from "react";
import image from "@/assets/Home/SolutionSection/objects.svg";

const Solution = () => {
  return (
    <section className="relative gradient">
      <div className="max-w-3xl mx-auto px-5 py-14 md:py-28">
        <div className="max-w-xs mx-auto">
          <Image
            alt="img"
            loading="lazy"
            width="309"
            height="221"
            decoding="async"
            data-nimg="1"
            className="w-full h-full"
            src={image}
          />
        </div>
        <div className=" mt-11 text-brand-darkgrey">
          <p className=" font-medium text-lg md:text-2xl text-center">
            Let leadfix coordinate between different parties to find a common
            available time slot for the sales call, the most time consuming part
            of sales process. So that you can spend more time on searching and
            finding those great prospects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;
