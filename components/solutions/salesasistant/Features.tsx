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

const worksteps = [
  {
    name: "Initial Onboarding, A Breeze",
    description:
      "Just add your business objectives and preferences. Zigment takes care of the rest.",
  },
  {
    name: "Click to Integrate, That’s It",
    description:
      "Zigment easily plugs into your existing CRM, be it Salesforce, Hubspot, or any other.",
  },
  {
    name: "See the Magic, In Real-Time",
    description:
      "Track conversions, engagement, and more through a user-friendly analytics dashboard.",
  },
];

const transferFeatures = [
  {
    id: 1,
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BoltIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 2,
    name: "Reminder emails",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: EnvelopeIcon,
  },
];

export default function Features() {
  return (
    <div className="overflow-hidden   py-16  ">
      <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
        <div className="relative">
          <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Why Zigment is a Game-Changer
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
            Your 24/7 Community Manager
            </h3>
            <p className="mt-3 text-lg text-gray-500">
            Hey, you're busy creating, coaching, and doing business stuff. Zigment's AI Sales Assistant keeps the community engaged while you focus on what matters. We're not sleeping, even if you are!
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
              Cost-Efficient and Effective
              </h3>
              <p className="mt-3 text-lg text-gray-500">
              Why hire a full-time manager when you can have an AI assistant doing the work round-the-clock? Cut down on human resources, and let technology do the heavy lifting.
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
            Adaptive and Smart
            </h3>
            <p className="mt-3 text-lg text-gray-500">
            Unlike other bots, Zigment learns from interactions to provide a more authentic and personalized engagement. It's not just automated responses; it's conversational intelligence.

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
