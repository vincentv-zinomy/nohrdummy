import Image from 'next/image'
import Hero from '@/components/landing-page/Home/Hero'
import ProblemStatement from '@/components/landing-page/Home/ProblemStatement'
import IntrodSection from '@/components/landing-page/Home/Introduction'
import TestimonialSection from '@/components/landing-page/Home/TestimonialSection'
import WhySection from '@/components/landing-page/Home/WhySection'
import Solution from '@/components/landing-page/Home/Solution'
import PricingSection from '@/components/landing-page/Home/PricingSection'
import Navbar from '@/components/landing-page/Navbar'
import Footer from '@/components/landing-page/Footer'
import { useRouter } from 'next/router'

declare global {
  interface Window {
    launchWhatsAppSignup: () => void;
    FB_SIGNUP_FLOW_COMPLETED: boolean;
    FB_LOGIN_FLOW_COMPLETED: boolean;
    FB_LOGIN_FLOW_ERROR: boolean;
    FB_SIGNUP_FLOW_ERROR: boolean;
    FB_DATA_ACCESS_TOKEN: string;
    launchFacebookLeadsSetup: () => void;
  }
}

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className="relative pt-[80px]">
        <Hero />
        <ProblemStatement />
        <IntrodSection />
        <TestimonialSection />
        <WhySection />
        <Solution />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
