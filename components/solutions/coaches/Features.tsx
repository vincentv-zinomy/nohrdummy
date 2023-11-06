import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

import img4 from "@/assets/images/solutions/features/feature-img-09.png";
import img5 from "@/assets/images/solutions/features/feature-img-10.png";
import img1 from "@/assets/images/solutions/howworks/ils_10.svg";
import img2 from "@/assets/images/solutions/howworks/ils_11.svg";
import img3 from "@/assets/images/solutions/howworks/ils_12.svg";

import Image from "next/image";
import line from "@/assets/images/solutions/hero/line-shape-1.svg";

 

 
 

export default function Features() {
  return (
    <div className="overflow-hidden   py-16  ">
      <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
        <div className="relative">
          <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Three Pillars of Zigment: Why Coaches Love Us

            <Image
              src={line}
              alt=""
              className="w-[250px] absolute mx-auto inset-x-0 -bottom-4"
            />
          </h2>
        </div>

        <div className="relative     lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative px-2 lg:px-10">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            The Freedom to Create
            </h3>
            <p className="mt-3 text-lg text-gray-500">
            You're a coach. Your art is in your content and courses. Zigment lets you focus on that by taking care of customer engagement, 24/7.
            </p>
            <p className="mt-3 text-lg text-gray-500">
            Illustration Description: A relaxed coach at a desk, focusing on their laptop with content creation tools, while a digital Zigment assistant takes care of incoming customer messages.
            </p>
          </div>

          <div className="relative -mx-4   lg:mt-0" aria-hidden="true">
            <Image className="relative mx-auto" width={490} src={img4} alt="" />
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8 px-2 lg:px-10">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Convert While You Sleep
              </h3>
              <p className="mt-3 text-lg text-gray-500">
              No more waking up to lost opportunities. Zigment converts leads into clients even when you're away. The AI engine adapts to the conversation and clinches the deal.
              </p>
              <p className="mt-3 text-lg text-gray-500">
              Illustration Description: A sleeping coach with a dream bubble, showing the Zigment logo converting a question mark into a dollar sign.
              </p>
            </div>

            <div className="relative -mx-4   lg:col-start-1 lg:mt-0">
              <Image
                className="relative mx-auto"
                width={490}
                src={img5}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="relative mt-12   lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative px-2 lg:px-10">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Smart Enough to be Your Second-in-Command
            </h3>
            <p className="mt-3 text-lg text-gray-500">
            Let Zigment handle inquiries, book sessions, and even upsell your additional offerings. It's like having a digital manager, without the HR headaches.

            </p>
            <p className="mt-3 text-lg text-gray-500">
            Illustration Description: Zigment as a digital assistant on a smartphone screen, displaying options for 'Inquiries,' 'Book Session,' and 'Upsell Courses.'

            </p>
          </div>

          <div className="relative -mx-4   lg:mt-0" aria-hidden="true">
            <Image className="relative mx-auto" width={490} src={img3} alt="" />
          </div>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8 px-2 lg:px-10">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Wait, Here's Something to Think About
              </h3>
              <p className="mt-3 text-lg text-gray-500">
              Engagement doesn't have to be expensive or exhausting. It can be effortless.
              </p>
            </div>

            <div className="relative -mx-4   lg:col-start-1 lg:mt-0">
              <Image
                className="relative mx-auto"
                width={490}
                src={img2}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
