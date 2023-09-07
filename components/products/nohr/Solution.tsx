import Image from "next/image";

import image from "@/assets/images/products/leadfix/SolutionSection/objects.svg";

const Solution = () => {
  return (
    <section className="gradient">
      <div className="max-w-3xl mx-auto px-5 py-14 md:py-28">
        <div className="max-w-xs mx-auto">
          <Image src={image} alt="img" className="w-full h-full" />
        </div>

        <div className="text-brand-blue-100 mt-11">
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
