import Image from "next/image";

import Img from "@/assets/images/products/nohr/solutions/img-5.svg";

const Solution = () => {
  return (
    <section className="gradient">
      <div className="max-w-3xl mx-auto px-5 py-14 md:py-28">
        <div className="max-w-xs mx-auto">
          <Image src={Img} alt="img" className="w-full h-full" />
        </div>

        <div className="text-brand-green mt-11">
          <p className="font-outfit font-medium text-lg md:text-2xl text-center">
            Let NoHR coordinate between different parties to find a common
            available time slot for the interview, the most time consuming part
            of the recruitment process. So that you can spend more time on
            searching and finding those great candidates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;
